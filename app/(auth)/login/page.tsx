'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      if (data.user) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #1c1c3e 0%, #5a347b 100%)' }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white" style={{ textShadow: '0 0 20px rgba(50, 240, 255, 0.5)' }}>
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Or{' '}
          <Link href="/signup" className="font-medium transition-all" style={{ color: '#ff49db', textShadow: '0 0 10px rgba(255, 73, 219, 0.5)' }}>
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10" style={{
          backgroundColor: 'rgba(28, 28, 62, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(50, 240, 255, 0.3)',
          boxShadow: '0 0 30px rgba(50, 240, 255, 0.2)'
        }}>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none sm:text-sm transition-all"
                  style={{
                    backgroundColor: 'rgba(90, 52, 123, 0.3)',
                    border: '1px solid rgba(50, 240, 255, 0.3)',
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid #32f0ff';
                    e.target.style.boxShadow = '0 0 15px rgba(50, 240, 255, 0.4)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(50, 240, 255, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none sm:text-sm transition-all"
                  style={{
                    backgroundColor: 'rgba(90, 52, 123, 0.3)',
                    border: '1px solid rgba(50, 240, 255, 0.3)',
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid #32f0ff';
                    e.target.style.boxShadow = '0 0 15px rgba(50, 240, 255, 0.4)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(50, 240, 255, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Your password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md p-4" style={{
                backgroundColor: 'rgba(255, 129, 50, 0.1)',
                border: '1px solid #ff8132',
                boxShadow: '0 0 10px rgba(255, 129, 50, 0.3)'
              }}>
                <div className="text-sm" style={{ color: '#ff8132' }}>{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                style={{
                  background: 'linear-gradient(135deg, #32f0ff 0%, #ff49db 100%)',
                  boxShadow: '0 0 20px rgba(50, 240, 255, 0.4)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(50, 240, 255, 0.6)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(50, 240, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
