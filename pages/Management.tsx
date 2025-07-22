
import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { useAuth } from '../contexts/AuthContext';
import { dummyUsers } from '../data/dummyData';
import { UserRole } from '../types';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

interface ManagementPageProps {
  role: UserRole.STUDENT | UserRole.INSTRUCTOR;
}

export const ManagementPage: React.FC<ManagementPageProps> = ({ role }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const title = role === UserRole.STUDENT ? '生徒' : '講師';
  const description = `システム内のすべての${title}を管理します。`;
  
  // Only admins can access management pages
  if (user?.role !== UserRole.ADMIN) {
    return (
      <div>
        <PageHeader title={`${title}管理`} description="管理ページは管理者のみアクセス可能です。" />
      </div>
    );
  }

  const users = dummyUsers
    .filter(u => u.role === role)
    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <PageHeader title={`${title}管理`} description={description} />
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <Input 
              placeholder={`${title}を検索...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Mobile view: Cards */}
          <div className="block md:hidden space-y-4">
            {users.map(user => (
              <div key={user.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <img className="h-12 w-12 rounded-full" src={user.avatarUrl} alt={user.name} />
                  <div>
                    <p className="font-semibold text-slate-800">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium text-slate-700">楽器:</span> {user.instrument}</p>
                  {role === UserRole.STUDENT && <p><span className="font-medium text-slate-700">レベル:</span> {user.level}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">名前</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">メール</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">楽器</th>
                  {role === UserRole.STUDENT && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">レベル</th>}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt={user.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.instrument}</td>
                    {role === UserRole.STUDENT && <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.level}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
