"""Thin wrapper around the Nebius LLM (OpenAI-compatible Chat Completions API).

Used by the resume "Upload" feature to parse and verify uploaded documents.

Error contract (mapped to HTTP status codes by the router):
- ``LLMNotConfigured`` → 503 (no API key set; AI import is simply disabled)
- ``LLMError``         → 502 (upstream failure or unparseable model output)
"""

import json
from typing import Any

from openai import BadRequestError, OpenAI

from .config import settings


class LLMNotConfigured(RuntimeError):
    """Raised when no Nebius API key is configured (maps to HTTP 503)."""


class LLMError(RuntimeError):
    """Raised on an upstream failure or unparseable output (maps to HTTP 502)."""


def nebius_client() -> OpenAI:
    """Build an OpenAI SDK client pointed at the Nebius endpoint."""
    if not settings.nebius_api_key:
        raise LLMNotConfigured("AI import is not configured on the server.")
    return OpenAI(
        api_key=settings.nebius_api_key,
        base_url=settings.nebius_base_url,
        timeout=60.0,
    )


def _strip_fences(text: str) -> str:
    """Remove a ```json ... ``` / ``` ... ``` wrapper that some models emit."""
    s = text.strip()
    if s.startswith("```"):
        s = s.split("\n", 1)[1] if "\n" in s else s[3:]
        if s.rstrip().endswith("```"):
            s = s.rstrip()[:-3]
    return s.strip()


def _extract_json(text: str) -> dict[str, Any]:
    """Parse a JSON object out of the model's text, tolerating stray prose."""
    s = _strip_fences(text)
    try:
        obj = json.loads(s)
    except json.JSONDecodeError:
        # Last resort: grab the outermost {...} block and try again.
        start, end = s.find("{"), s.rfind("}")
        if start != -1 and end > start:
            try:
                obj = json.loads(s[start : end + 1])
            except json.JSONDecodeError as exc:
                raise LLMError("Model did not return valid JSON.") from exc
        else:
            raise LLMError("Model did not return valid JSON.")
    if not isinstance(obj, dict):
        raise LLMError("Model returned JSON that is not an object.")
    return obj


def chat_json(system: str, user: str) -> dict[str, Any]:
    """Run a chat completion that must return a JSON object.

    OpenAI-compatible endpoints vary: some quietly return an **empty** message
    (or a 400) for ``response_format=json_object``, others reject ``max_tokens``.
    So we try progressively simpler requests and take the first that yields
    non-empty content:
        1. JSON mode + max_tokens
        2. plain      + max_tokens
        3. plain      (no max_tokens)
    """
    client = nebius_client()  # LLMNotConfigured propagates as-is.
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]
    mt = settings.nebius_max_tokens
    attempts: list[dict[str, Any]] = [
        {"response_format": {"type": "json_object"}, "max_tokens": mt},
        {"max_tokens": mt},
        {},
    ]

    content = ""
    last_error: Exception | None = None
    for opts in attempts:
        kwargs: dict[str, Any] = {"model": settings.nebius_model, "temperature": 0, "messages": messages}
        if opts.get("max_tokens"):
            kwargs["max_tokens"] = opts["max_tokens"]
        if opts.get("response_format"):
            kwargs["response_format"] = opts["response_format"]
        try:
            resp = client.chat.completions.create(**kwargs)
        except BadRequestError as exc:
            last_error = exc      # bad arg for this endpoint — try a simpler call
            continue
        except Exception as exc:  # noqa: BLE001 — network/auth/rate-limit: don't retry
            raise LLMError(f"LLM request failed: {exc}") from exc
        choice = resp.choices[0] if resp.choices else None
        content = (getattr(choice.message, "content", None) or "") if choice else ""
        if content.strip():
            break

    if not content.strip():
        if last_error is not None:
            raise LLMError(f"LLM request failed: {last_error}") from last_error
        raise LLMError("LLM returned an empty response.")
    return _extract_json(content)
