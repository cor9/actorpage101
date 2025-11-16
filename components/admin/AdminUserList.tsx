'use client';

import { useState } from 'react';

interface User {
  id: string;
  display_name: string | null;
  role: string;
  subscription_tier: string;
  created_at: string;
}

interface Props {
  users: User[];
}

export function AdminUserList({ users: initialUsers }: Props) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [updating, setUpdating] = useState<Record<string, boolean>>({});

  const updateSubscription = async (userId: string, newTier: string) => {
    setUpdating({ ...updating, [userId]: true });

    try {
      const response = await fetch('/api/admin/update-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, subscriptionTier: newTier }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update subscription');
      }

      const result = await response.json();

      // Update local state
      setUsers(users.map(u =>
        u.id === userId ? { ...u, subscription_tier: newTier } : u
      ));

      alert(`✓ User upgraded to ${newTier}`);
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to update subscription'}`);
    } finally {
      setUpdating({ ...updating, [userId]: false });
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'free':
        return 'bg-gray-600 text-gray-100';
      case 'standard':
        return 'bg-blue-600 text-white';
      case 'premium':
        return 'bg-gradient-to-r from-neon-pink to-neon-cyan text-white';
      default:
        return 'bg-gray-600 text-gray-100';
    }
  };

  return (
    <div className="bg-dark-purple/50 backdrop-blur-sm border border-neon-pink/30 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-dark-purple/80">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Current Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neon-pink/20">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-dark-purple/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {user.display_name || 'Unnamed User'}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    {user.id.substring(0, 8)}...
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getTierBadgeColor(user.subscription_tier)}`}>
                    {user.subscription_tier.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    {user.subscription_tier !== 'free' && (
                      <button
                        onClick={() => updateSubscription(user.id, 'free')}
                        disabled={updating[user.id]}
                        className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors disabled:opacity-50"
                      >
                        → Free
                      </button>
                    )}
                    {user.subscription_tier !== 'standard' && (
                      <button
                        onClick={() => updateSubscription(user.id, 'standard')}
                        disabled={updating[user.id]}
                        className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors disabled:opacity-50"
                      >
                        → Standard
                      </button>
                    )}
                    {user.subscription_tier !== 'premium' && (
                      <button
                        onClick={() => updateSubscription(user.id, 'premium')}
                        disabled={updating[user.id]}
                        className="px-3 py-1 text-xs bg-gradient-to-r from-neon-pink to-neon-cyan hover:opacity-90 text-white rounded transition-opacity disabled:opacity-50"
                      >
                        → Premium
                      </button>
                    )}
                    {updating[user.id] && (
                      <span className="text-xs text-neon-cyan">Updating...</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="p-8 text-center text-gray-400">
          No users found
        </div>
      )}

      <div className="px-6 py-4 bg-dark-purple/80 border-t border-neon-pink/20">
        <p className="text-sm text-gray-400">
          Total users: <span className="text-white font-semibold">{users.length}</span>
          {' • '}
          Free: <span className="text-white">{users.filter(u => u.subscription_tier === 'free').length}</span>
          {' • '}
          Standard: <span className="text-blue-400">{users.filter(u => u.subscription_tier === 'standard').length}</span>
          {' • '}
          Premium: <span className="text-neon-pink">{users.filter(u => u.subscription_tier === 'premium').length}</span>
        </p>
      </div>
    </div>
  );
}
