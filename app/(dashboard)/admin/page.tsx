import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { AdminUserList } from '@/components/admin/AdminUserList';

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient();

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect('/login');
  }

  // Check if user is admin
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || profile?.role !== 'admin') {
    redirect('/dashboard');
  }

  // Fetch all users
  const { data: users, error: usersError } = await supabase
    .from('profiles')
    .select('id, display_name, role, subscription_tier, created_at')
    .order('created_at', { ascending: false });

  if (usersError) {
    console.error('Error fetching users:', usersError);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-500">Error loading users</h1>
        <p className="text-gray-400">{usersError.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Manage user subscriptions and permissions</p>
      </div>

      <AdminUserList users={users || []} />
    </div>
  );
}
