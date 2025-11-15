'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser';
import type { Tier } from '@/components/actor-page/types';

type DomainStatus = 'unverified' | 'pending' | 'verified' | 'error' | null;

type ActorPageDomainRow = {
  id: string;
  slug: string;
  tier: Tier;
  custom_domain: string | null;
  domain_status: DomainStatus;
};

const NAMECHEAP_URL =
  process.env.NEXT_PUBLIC_NAMECHEAP_AFFILIATE_URL || 'https://www.namecheap.com/';

const tierLabel = (tier: Tier) => tier.toUpperCase();

const statusLabel = (status: DomainStatus) => {
  switch (status) {
    case 'verified':
      return 'Verified';
    case 'pending':
      return 'Pending verification';
    case 'error':
      return 'Error';
    case 'unverified':
    default:
      return 'Not set up';
  }
};

const statusClass = (status: DomainStatus) => {
  switch (status) {
    case 'verified':
      return 'border-neon-cyan/70 text-neon-cyan bg-neon-cyan/10';
    case 'pending':
      return 'border-neon-orange/70 text-neon-orange bg-neon-orange/10';
    case 'error':
      return 'border-red-500/70 text-red-200 bg-red-950/40';
    case 'unverified':
    default:
      return 'border-gray-600 text-gray-300 bg-dark-purple/60';
  }
};

export default function PageDomainSettings() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const pageId = params?.id;

  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [page, setPage] = useState<ActorPageDomainRow | null>(null);
  const [domainInput, setDomainInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!pageId) return;

    const load = async () => {
      setAuthChecking(true);
      setLoading(true);
      setError(null);

      const supabase = createBrowserSupabaseClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(userError);
        setError('Error checking your account.');
        setAuthChecking(false);
        setLoading(false);
        return;
      }

      if (!user) {
        setAuthChecking(false);
        setLoading(false);
        router.push('/login');
        return;
      }

      setUserEmail(user.email ?? null);
      setAuthChecking(false);

      const { data, error: pageError } = await supabase
        .from('actor_pages')
        .select('id, slug, tier, custom_domain, domain_status')
        .eq('id', pageId)
        .eq('user_id', user.id)
        .single();

      if (pageError) {
        console.error(pageError);
        setError('Could not load this actor page.');
        setLoading(false);
        return;
      }

      const row = data as ActorPageDomainRow;
      setPage(row);
      setDomainInput(row.custom_domain || '');
      setLoading(false);
    };

    load();
  }, [pageId, router]);

  const handleSaveDomain = async () => {
    if (!page) return;
    const trimmed = domainInput.trim();

    if (!trimmed) {
      setError('Please enter a domain name (e.g., yourkidname.com).');
      return;
    }

    setSaving(true);
    setError(null);
    setSaveMessage(null);

    try {
      const supabase = createBrowserSupabaseClient();

      const { error: updateError } = await supabase
        .from('actor_pages')
        .update({
          custom_domain: trimmed,
          domain_status: 'pending',
        })
        .eq('id', page.id);

      if (updateError) {
        console.error(updateError);
        setError('Error saving domain. Please try again.');
        setSaving(false);
        return;
      }

      setPage((prev) =>
        prev
          ? {
              ...prev,
              custom_domain: trimmed,
              domain_status: 'pending',
            }
          : prev
      );
      setSaveMessage('Domain saved. Once DNS is updated, it will be verified.');
    } catch (e) {
      console.error(e);
      setError('Unexpected error when saving domain.');
    } finally {
      setSaving(false);
    }
  };

  const canUseCustomDomain =
    page?.tier === 'standard' || page?.tier === 'premium';

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white" style={{ textShadow: '0 0 15px rgba(255, 73, 219, 0.5)' }}>
              Custom Domain Settings
            </h1>
            <p className="mt-1 text-xs text-gray-400 max-w-xl">
              Connect this actor page to a personal domain like{' '}
              <span className="text-neon-cyan">YourKidName.com</span> or{' '}
              <span className="text-neon-cyan">FirstnameLastnameActor.com</span>.
            </p>
          </div>
          <div className="text-right text-[11px] text-gray-400">
            {userEmail && (
              <p className="mb-1">
                Signed in as <span className="text-white">{userEmail}</span>
              </p>
            )}
            {page && (
              <p>
                Plan:{' '}
                <span className="font-semibold text-neon-pink">
                  {tierLabel(page.tier)}
                </span>
              </p>
            )}
          </div>
        </header>

        {authChecking && (
          <p className="text-xs text-gray-400">Checking your account…</p>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-neon-orange/60 bg-neon-orange/10 p-4 text-xs text-neon-orange">
            {error}
          </div>
        )}

        {!authChecking && !loading && !page && !error && (
          <div className="rounded-2xl border border-neon-pink/30 bg-dark-purple/70 p-6 text-sm text-white">
            <p className="font-medium mb-2">Page not found.</p>
            <p className="text-xs text-gray-400 mb-4">
              We couldn&apos;t find this actor page. It may have been deleted or you
              may not have access.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan px-4 py-2 text-xs font-semibold hover:opacity-90"
              style={{ boxShadow: '0 0 15px rgba(255, 73, 219, 0.4)' }}
            >
              Back to Dashboard
            </Link>
          </div>
        )}

        {page && (
          <>
            {/* Tier gating */}
            {!canUseCustomDomain && (
              <div className="rounded-2xl border border-neon-orange/60 bg-neon-orange/10 p-5 text-sm text-white">
                <p className="font-semibold mb-1">
                  Custom domains are a Standard & Premium feature.
                </p>
                <p className="text-xs text-gray-300 mb-3">
                  Upgrade this page to Standard or Premium to connect a personal
                  domain like <span className="underline text-neon-cyan">YourKidName.com</span>.
                  You&apos;ll get hands-on DNS guidance and a clean professional link
                  for casting.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/dashboard/billing"
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-neon-orange to-neon-pink px-4 py-2 font-semibold text-white hover:opacity-90"
                    style={{ boxShadow: '0 0 15px rgba(255, 129, 50, 0.4)' }}
                  >
                    View Plans & Upgrade
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center rounded-full border border-neon-orange/70 px-3 py-2 text-white hover:bg-neon-orange/10"
                  >
                    Back to Dashboard
                  </Link>
                </div>
              </div>
            )}

            {canUseCustomDomain && (
              <div className="space-y-8">
                {/* Step 1: Buy a Domain */}
                <section className="space-y-3 rounded-2xl border border-neon-pink/30 bg-dark-purple/50 backdrop-blur-sm p-5" style={{ boxShadow: '0 0 15px rgba(255, 73, 219, 0.2)' }}>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">
                    Step 1 – Buy a domain
                  </h2>
                  <p className="text-xs text-gray-300">
                    You can register a domain with any registrar. For most parents, I
                    recommend Namecheap: it&apos;s inexpensive, straightforward, and
                    easy to manage.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <a
                      href={NAMECHEAP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan px-4 py-2 font-semibold hover:opacity-90 text-white"
                      style={{ boxShadow: '0 0 15px rgba(255, 73, 219, 0.4)' }}
                    >
                      Buy a Domain on Namecheap
                    </a>
                    <p className="text-[11px] text-gray-500">
                      I may earn a small commission if you use this link—at no extra
                      cost to you. Use any registrar you like.
                    </p>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Good examples:{' '}
                    <span className="text-neon-cyan">
                      firstname-lastname.com, firstnameactor.com,
                      firstname-lastname-actor.com
                    </span>
                  </p>
                </section>

                {/* Step 2: Enter Domain */}
                <section className="space-y-3 rounded-2xl border border-neon-cyan/30 bg-dark-purple/50 backdrop-blur-sm p-5" style={{ boxShadow: '0 0 15px rgba(50, 240, 255, 0.2)' }}>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">
                    Step 2 – Tell us your domain
                  </h2>
                  <p className="text-xs text-gray-300 mb-2">
                    Paste the domain you purchased. Don&apos;t include{' '}
                    <span className="text-white">http://</span> or{' '}
                    <span className="text-white">https://</span> — just the raw
                    domain.
                  </p>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    <div className="flex-1">
                      <label className="block text-[11px] text-gray-400 mb-1">
                        Domain name
                      </label>
                      <input
                        type="text"
                        value={domainInput}
                        onChange={(e) => setDomainInput(e.target.value)}
                        placeholder="yourkidname.com"
                        className="w-full rounded-lg bg-deep-purple border border-neon-cyan/30 px-3 py-2 text-sm text-white focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveDomain}
                      disabled={saving}
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink px-4 py-2 text-xs font-semibold hover:opacity-90 disabled:opacity-60 text-white"
                      style={{ boxShadow: '0 0 15px rgba(50, 240, 255, 0.4)' }}
                    >
                      {saving ? 'Saving…' : 'Save Domain'}
                    </button>
                  </div>

                  {page.custom_domain && (
                    <p className="text-[11px] text-gray-400 mt-1">
                      This page will be reachable at{' '}
                      <span className="text-neon-cyan">{page.custom_domain}</span>{' '}
                      once DNS is configured.
                    </p>
                  )}

                  {saveMessage && (
                    <p className="mt-2 text-[11px] text-neon-cyan">
                      {saveMessage}
                    </p>
                  )}

                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] border-neon-cyan/30 bg-deep-purple/80 text-gray-300">
                    <span className="uppercase tracking-[0.18em] text-[10px] text-gray-500">
                      Status
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-[2px] text-[10px] ${statusClass(
                        page.domain_status
                      )}`}
                    >
                      {statusLabel(page.domain_status)}
                    </span>
                  </div>
                </section>

                {/* Step 3: DNS Instructions */}
                <section className="space-y-3 rounded-2xl border border-neon-orange/30 bg-dark-purple/50 backdrop-blur-sm p-5" style={{ boxShadow: '0 0 15px rgba(255, 129, 50, 0.2)' }}>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">
                    Step 3 – Update your DNS
                  </h2>
                  <p className="text-xs text-gray-300">
                    Once you own the domain, you&apos;ll point it at Actor Page 101
                    using DNS records. The exact values depend on how you deploy
                    (Vercel, Netlify, etc.), but the pattern is:
                  </p>

                  <div className="mt-2 grid gap-3 text-[11px] text-white md:grid-cols-2">
                    <div className="rounded-xl bg-deep-purple/80 border border-neon-cyan/30 p-3">
                      <p className="font-semibold mb-1">Option A – Use a CNAME</p>
                      <p className="mb-2 text-gray-400">
                        Common if you&apos;re pointing a subdomain like{' '}
                        <span className="text-neon-cyan">actor.yourkidname.com</span>.
                      </p>
                      <div className="space-y-1 font-mono text-[10px] text-gray-300">
                        <p>Type: CNAME</p>
                        <p>Name/Host: actor (or www)</p>
                        <p>Target: cname.vercel-dns.com</p>
                      </div>
                    </div>
                    <div className="rounded-xl bg-deep-purple/80 border border-neon-pink/30 p-3">
                      <p className="font-semibold mb-1">Option B – A records</p>
                      <p className="mb-2 text-gray-400">
                        Often used for the root domain like{' '}
                        <span className="text-neon-pink">yourkidname.com</span>.
                      </p>
                      <div className="space-y-1 font-mono text-[10px] text-gray-300">
                        <p>Type: A</p>
                        <p>Name/Host: @</p>
                        <p>Value: 76.76.21.21 (Vercel)</p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] text-gray-400">
                    When you&apos;re ready, add these DNS records in your
                    registrar&apos;s DNS settings. If you get stuck, contact support
                    with a screenshot of your DNS page for help.
                  </p>
                </section>

                {/* Footer */}
                <section className="text-[11px] text-gray-500 bg-dark-purple/30 border border-neon-pink/20 rounded-lg p-4">
                  <p>
                    This page stores your domain and its status. Automatic DNS
                    verification can be added later via a serverless function if needed.
                    For now, contact support once DNS is configured to mark as verified.
                  </p>
                </section>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
