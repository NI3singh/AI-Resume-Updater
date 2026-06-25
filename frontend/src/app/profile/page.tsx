// src/app/profile/page.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Github, Star, ExternalLink, Plus, Check, Trash2, RefreshCw, ArrowRight,
  GitFork, Archive, AlertTriangle, Award, FolderGit2,
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Spinner, PageLoader } from '@/components/ui/Spinner';
import { useAuth } from '@/context/AuthContext';
import { useMaster } from '@/hooks/useMaster';
import { ApiError } from '@/lib/api';
import { fetchGithubRepos, GithubRepo } from '@/lib/github';
import ProjectCraftDialog from '@/components/profile/ProjectCraftDialog';

type ReposState = 'idle' | 'loading' | 'error';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, updateProfile } = useAuth();
  const {
    master, addProject, removeProjectByUrl, removeProjectById,
    addCertification, removeCertification,
  } = useMaster();

  const [ghInput, setGhInput]       = useState('');
  const [connecting, setConnecting] = useState(false);
  const [repos, setRepos]           = useState<GithubRepo[]>([]);
  const [reposState, setReposState] = useState<ReposState>('idle');
  const [reposError, setReposError] = useState('');
  const [hideForks, setHideForks]   = useState(true);

  const [craftRepo, setCraftRepo] = useState<GithubRepo | null>(null);  // repo open in the craft dialog
  const [removing, setRemoving]   = useState('');   // githubUrl OR project id currently being removed
  const [showNewOnly, setShowNewOnly] = useState(false);

  // Certifications manager
  const [certTitle, setCertTitle]   = useState('');
  const [certUrl, setCertUrl]       = useState('');
  const [addingCert, setAddingCert] = useState(false);
  const [certError, setCertError]   = useState('');
  const [removingCert, setRemovingCert] = useState('');

  useEffect(() => { if (!authLoading && !user) router.replace('/login'); }, [authLoading, user, router]);
  useEffect(() => { setGhInput(user?.github_username ?? ''); }, [user?.github_username]);

  const loadRepos = useCallback(async (username: string) => {
    setReposState('loading'); setReposError('');
    try {
      setRepos(await fetchGithubRepos(username));
      setReposState('idle');
    } catch (err) {
      setReposError(err instanceof ApiError ? err.message : 'Could not load repositories.');
      setReposState('error');
    }
  }, []);

  // Auto-load repos once a handle is connected.
  useEffect(() => {
    if (user?.github_username) loadRepos(user.github_username);
  }, [user?.github_username, loadRepos]);

  const connect = async () => {
    const handle = ghInput.trim();
    if (!handle || connecting) return;
    setConnecting(true); setReposError('');
    try {
      const updated = await updateProfile({ github_username: handle });
      if (updated.github_username) await loadRepos(updated.github_username);
    } catch (err) {
      setReposError(err instanceof ApiError ? err.message : 'Could not save your GitHub username.');
    } finally {
      setConnecting(false);
    }
  };

  const addedUrls = useMemo(
    () => new Set((master?.resume_data.projects ?? []).map((p) => p.githubUrl).filter(Boolean)),
    [master],
  );

  const startAdd = (repo: GithubRepo) => setCraftRepo(repo);

  const remove = async (githubUrl: string) => {
    setRemoving(githubUrl);
    try { await removeProjectByUrl(githubUrl); }
    finally { setRemoving(''); }
  };

  const removeMasterProject = async (id: string) => {
    setRemoving(id);
    try { await removeProjectById(id); }
    finally { setRemoving(''); }
  };

  const submitCert = async () => {
    const title = certTitle.trim();
    if (!title || addingCert) return;
    setAddingCert(true); setCertError('');
    try {
      await addCertification(title, certUrl.trim());
      setCertTitle(''); setCertUrl('');
    } catch {
      setCertError('Could not add the certification. Please try again.');
    } finally {
      setAddingCert(false);
    }
  };

  const removeCert = async (id: string) => {
    setRemovingCert(id);
    try { await removeCertification(id); }
    finally { setRemovingCert(''); }
  };

  if (authLoading || !user) return <PageLoader label="Loading your profile…" />;

  const newRepoCount = repos.filter((r) => !(r.fork || r.archived) && !addedUrls.has(r.html_url)).length;
  const visibleRepos = repos.filter((r) => {
    if (hideForks && (r.fork || r.archived)) return false;
    if (showNewOnly && addedUrls.has(r.html_url)) return false;
    return true;
  });
  const masterProjects = master?.resume_data.projects ?? [];
  const masterCerts = master?.resume_data.certifications ?? [];
  const connected = !!user.github_username;

  return (
    <div className="min-h-screen bg-ink-950 text-ivory">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 border-b border-ink-800/80 bg-ink-900/80 backdrop-blur-md">
        <Link href="/" title="Home" className="flex items-center min-w-0 hover:opacity-90 transition-opacity">
          <Logo size={24} />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/builder"
            className="flex items-center gap-1.5 text-xs font-medium text-ivory-muted hover:text-ivory transition-colors px-2.5 py-1.5 rounded-lg hover:bg-ink-800/60"
          >
            Open Builder <ArrowRight size={13} />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Title */}
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">Profile</h1>
          <p className="text-ivory/50 text-sm mt-1.5 max-w-2xl">
            Keep one <span className="text-ivory-muted font-medium">Master résumé</span> with everything you&apos;ve built.
            Pull projects in from GitHub — AI drafts the bullets, you review them, and nothing is invented. Then use
            <span className="text-gold"> Transform</span> to tailor it to any job.
          </p>
        </div>

        {/* Connect GitHub */}
        <section className="card">
          <div className="flex items-center gap-2 mb-3">
            <Github size={16} className="text-gold" />
            <h2 className="font-display font-bold text-sm">Connect GitHub</h2>
            {connected && <span className="text-[10px] font-mono text-jade ml-1">· @{user.github_username}</span>}
          </div>
          <p className="text-ivory/50 text-xs mb-3">Enter your GitHub username (public repositories only).</p>
          <div className="flex items-center gap-2 max-w-md">
            <input
              value={ghInput}
              onChange={(e) => setGhInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && connect()}
              placeholder="e.g. torvalds"
              className="input-base flex-1 !text-sm"
            />
            <button
              onClick={connect}
              disabled={!ghInput.trim() || connecting}
              className="btn-primary !px-4 !py-2.5 !text-xs disabled:opacity-50"
            >
              {connecting ? <Spinner size={13} tone="current" /> : <RefreshCw size={13} />}
              {connected ? 'Refresh' : 'Connect'}
            </button>
          </div>
        </section>

        {/* Repos */}
        {connected && (
          <section>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h2 className="font-display font-bold text-sm flex items-center gap-2">
                Your repositories
                {reposState === 'idle' && <span className="text-[10px] font-mono text-ivory-dim">({visibleRepos.length})</span>}
                {reposState === 'idle' && newRepoCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-gold/10 text-gold border border-gold/25">
                    {newRepoCount} new
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-3">
                {newRepoCount > 0 && (
                  <label className="flex items-center gap-1.5 text-[11px] text-ivory-muted cursor-pointer select-none">
                    <input type="checkbox" checked={showNewOnly} onChange={(e) => setShowNewOnly(e.target.checked)} className="accent-gold" />
                    New only
                  </label>
                )}
                <label className="flex items-center gap-1.5 text-[11px] text-ivory-muted cursor-pointer select-none">
                  <input type="checkbox" checked={hideForks} onChange={(e) => setHideForks(e.target.checked)} className="accent-gold" />
                  Hide forks &amp; archived
                </label>
              </div>
            </div>

            {reposState === 'loading' && (
              <div className="py-16 text-center"><Spinner size={32} /><p className="text-ivory/50 text-xs mt-2.5">Loading your repositories…</p></div>
            )}
            {reposState === 'error' && (
              <div className="rounded-lg border border-crimson/30 bg-crimson/[0.07] p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={14} className="text-crimson flex-shrink-0 mt-0.5" />
                  <p className="text-crimson/90 text-xs flex-1">{reposError}</p>
                </div>
                <button onClick={() => user.github_username && loadRepos(user.github_username)} className="btn-primary !px-3 !py-1.5 !text-xs mt-3">
                  <RefreshCw size={12} /> Retry
                </button>
              </div>
            )}

            {reposState === 'idle' && visibleRepos.length === 0 && (
              <p className="text-ivory/40 text-sm py-10 text-center">No repositories to show.</p>
            )}

            {reposState === 'idle' && visibleRepos.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {visibleRepos.map((repo) => {
                  const added = addedUrls.has(repo.html_url);
                  const isRemoving = removing === repo.html_url;
                  return (
                    <div key={repo.full_name} className="card flex flex-col gap-2 !p-4">
                      <div className="flex items-start justify-between gap-2">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                          className="font-display font-bold text-sm text-ivory hover:text-gold transition-colors truncate flex items-center gap-1.5">
                          {repo.name}
                          <ExternalLink size={11} className="opacity-40 flex-shrink-0" />
                        </a>
                        <span className="flex items-center gap-2 flex-shrink-0 text-[10px] text-ivory-dim font-mono">
                          {repo.fork && <span title="Fork"><GitFork size={11} /></span>}
                          {repo.archived && <span title="Archived"><Archive size={11} /></span>}
                          {repo.stars > 0 && <span className="flex items-center gap-0.5"><Star size={11} className="text-gold/70" />{repo.stars}</span>}
                        </span>
                      </div>

                      <p className="text-ivory/50 text-xs leading-relaxed line-clamp-2 min-h-[2rem]">
                        {repo.description || <span className="italic text-ivory-dim">No GitHub description — bullets are drafted from the README on add.</span>}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {repo.language && <span className="px-1.5 py-0.5 rounded text-[9px] bg-gold/10 text-gold border border-gold/20">{repo.language}</span>}
                        {repo.topics.slice(0, 3).map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded text-[9px] bg-ink-700/60 text-ivory-dim border border-ink-600/50">{t}</span>
                        ))}
                      </div>

                      <div className="mt-auto pt-1">
                        {added ? (
                          <div className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-1 text-[11px] text-jade font-medium"><Check size={13} /> In Master</span>
                            <button
                              onClick={() => remove(repo.html_url)}
                              disabled={isRemoving}
                              className="flex items-center gap-1 text-[11px] text-ivory-dim hover:text-crimson transition-colors disabled:opacity-50"
                            >
                              {isRemoving ? <Spinner size={11} tone="current" /> : <Trash2 size={11} />} Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startAdd(repo)}
                            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] rounded-lg border border-gold/40 text-gold hover:bg-gold/10 transition-colors cursor-pointer"
                          >
                            <Plus size={12} /> Add to Master
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Certifications */}
        <section className="card">
          <div className="flex items-center gap-2 mb-3">
            <Award size={16} className="text-gold" />
            <h2 className="font-display font-bold text-sm">Certifications</h2>
            {masterCerts.length > 0 && <span className="text-[10px] font-mono text-ivory-dim">({masterCerts.length})</span>}
          </div>
          <p className="text-ivory/50 text-xs mb-3">
            Add a certification by title and credential link — it goes straight into your Master résumé.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch gap-2 max-w-2xl">
            <input
              value={certTitle}
              onChange={(e) => setCertTitle(e.target.value)}
              placeholder="Title — e.g. AWS Certified Solutions Architect"
              className="input-base flex-1 !text-sm"
            />
            <input
              value={certUrl}
              onChange={(e) => setCertUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitCert()}
              placeholder="Credential URL (optional)"
              className="input-base flex-1 !text-sm"
            />
            <button
              onClick={submitCert}
              disabled={!certTitle.trim() || addingCert}
              className="btn-primary !px-4 !py-2.5 !text-xs disabled:opacity-50 sm:flex-shrink-0"
            >
              {addingCert ? <Spinner size={13} tone="current" /> : <Plus size={13} />} Add
            </button>
          </div>
          {certError && <p className="text-[11px] text-crimson mt-2">{certError}</p>}

          {masterCerts.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {masterCerts.map((c) => (
                <li key={c.id} className="flex items-center gap-2 rounded-lg border border-ink-700/60 bg-ink-800/40 px-3 py-2">
                  <Award size={13} className="text-gold/70 flex-shrink-0" />
                  <span className="text-xs text-ivory flex-1 min-w-0 truncate">{c.text}</span>
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer"
                      className="text-ivory-dim hover:text-gold transition-colors" title="Open credential">
                      <ExternalLink size={12} />
                    </a>
                  )}
                  <button
                    onClick={() => removeCert(c.id)}
                    disabled={removingCert === c.id}
                    className="text-ivory-dim hover:text-crimson transition-colors disabled:opacity-50"
                    title="Remove"
                  >
                    {removingCert === c.id ? <Spinner size={11} tone="current" /> : <Trash2 size={12} />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Projects currently in the Master (incl. non-GitHub ones) */}
        {masterProjects.length > 0 && (
          <section className="card">
            <div className="flex items-center gap-2 mb-3">
              <FolderGit2 size={16} className="text-gold" />
              <h2 className="font-display font-bold text-sm">Projects in your Master</h2>
              <span className="text-[10px] font-mono text-ivory-dim">({masterProjects.length})</span>
            </div>
            <ul className="space-y-1.5">
              {masterProjects.map((p) => (
                <li key={p.id} className="flex items-center gap-2 rounded-lg border border-ink-700/60 bg-ink-800/40 px-3 py-2">
                  <FolderGit2 size={13} className="text-gold/70 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-ivory truncate">{p.name || 'Untitled project'}</p>
                    {p.techStack && <p className="text-[10px] text-ivory-dim truncate">{p.techStack}</p>}
                  </div>
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="text-ivory-dim hover:text-gold transition-colors" title="Open repo">
                      <ExternalLink size={12} />
                    </a>
                  )}
                  <button
                    onClick={() => removeMasterProject(p.id)}
                    disabled={removing === p.id}
                    className="text-ivory-dim hover:text-crimson transition-colors disabled:opacity-50"
                    title="Remove from Master"
                  >
                    {removing === p.id ? <Spinner size={11} tone="current" /> : <Trash2 size={12} />}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {craftRepo && (
        <ProjectCraftDialog
          repo={craftRepo}
          onAdd={addProject}
          onClose={() => setCraftRepo(null)}
        />
      )}
    </div>
  );
}
