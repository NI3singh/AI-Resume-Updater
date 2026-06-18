"""pytest bootstrap.

Ensures ``app`` and ``eval`` are importable when pytest runs from ``backend/``,
regardless of the invoking working directory.
"""

import os
import sys

_BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
if _BACKEND_DIR not in sys.path:
    sys.path.insert(0, _BACKEND_DIR)
