// src/lib/github.ts
// Client for the Profile page's GitHub integration:
//   fetchGithubRepos   -> POST /github/repos          (a user's public repos)
//   fetchProjectTree   -> POST /github/project/tree   (selectable file list)
//   craftGithubProject -> POST /github/project        (read chosen files -> guarded bullets)
//   refineGithubProject-> POST /github/project/refine (regenerate from a comment, reuse digest)
// The server reads only PUBLIC data, grounds bullets in the real code + README,
// and runs the anti-fabrication guard so numbers must trace to the sources.

import { api } from './api';

export interface GithubRepo {
  name: string;
  full_name: string;        // "owner/repo"
  description: string;
  language: string;
  topics: string[];
  stars: number;
  html_url: string;
  homepage: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

export interface GithubTreeFile {
  path: string;
  size: number;
  suggested: boolean;
}

export interface ProjectTree {
  default_branch: string;
  truncated: boolean;
  files: GithubTreeFile[];
}

/** A ProjectEntry minus its id (the client assigns one when adding). */
export interface CraftedProjectFields {
  name: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;
  bullets: string[];
}

export interface CraftResult {
  project: CraftedProjectFields;
  warnings: string[];
  analyzed_files: string[];
  digest: string;           // pass back to refineGithubProject (no re-fetch)
  rationale: string;
}

export interface RefineResult {
  bullets: string[];
  warnings: string[];
  rationale: string;
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  const res = await api<{ repos: GithubRepo[] }>('/github/repos', {
    method: 'POST',
    body: JSON.stringify({ username }),
  });
  return res.repos ?? [];
}

export async function fetchProjectTree(fullName: string): Promise<ProjectTree> {
  return api<ProjectTree>('/github/project/tree', {
    method: 'POST',
    body: JSON.stringify({ full_name: fullName }),
  });
}

export interface CraftOpts {
  filePaths?: string[];
  instruction?: string;
  notes?: string;
}

export async function craftGithubProject(fullName: string, opts: CraftOpts = {}): Promise<CraftResult> {
  return api<CraftResult>('/github/project', {
    method: 'POST',
    body: JSON.stringify({
      full_name: fullName,
      file_paths: opts.filePaths ?? [],
      instruction: opts.instruction ?? '',
      notes: opts.notes ?? '',
    }),
  });
}

export interface RefineArgs {
  fullName: string;
  digest: string;
  instruction: string;
  notes?: string;
  currentBullets?: string[];
}

export async function refineGithubProject(args: RefineArgs): Promise<RefineResult> {
  return api<RefineResult>('/github/project/refine', {
    method: 'POST',
    body: JSON.stringify({
      full_name: args.fullName,
      digest: args.digest,
      instruction: args.instruction,
      notes: args.notes ?? '',
      current_bullets: args.currentBullets ?? [],
    }),
  });
}
