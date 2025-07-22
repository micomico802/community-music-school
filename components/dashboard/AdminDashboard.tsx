import React from 'react';
import { dummyLessons, dummyUsers } from '../../data/dummyData';
import { UserRole } from '../../types';
import { StatsCard } from './StatsCard';
import { Icons } from '../icons';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const AdminDashboard: React.FC = () => {
  const totalStudents = dummyUsers.filter(u => u.role === UserRole.STUDENT).length;
  const totalInstructors = dummyUsers.filter(u => u.role === UserRole.INSTRUCTOR).length;
  const activeLessons = dummyLessons.filter(l => l.status === 'scheduled').length;
  const totalCompletedLessons = dummyLessons.filter(l => l.status === 'completed').length;
  const estimatedTotalRevenue = totalCompletedLessons * 50;

  const recentUsers = dummyUsers.slice(0, 5);

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="生徒総数" value={totalStudents.toString()} icon={<Icons.students className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-blue-500 to-cyan-400" />
        <StatsCard title="講師総数" value={totalInstructors.toString()} icon={<Icons.instructors className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-green-500 to-lime-400" />
        <StatsCard title="アクティブレッスン" value={activeLessons.toString()} icon={<Icons.lessons className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-purple-500 to-pink-400" />
        <StatsCard title="総収入" value={`¥${estimatedTotalRevenue * 150}`} icon={<Icons.barchart className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-amber-500 to-orange-400" />
      </div>

       <Card>
        <CardHeader>
          <CardTitle>最近のアクティビティ</CardTitle>
        </CardHeader>
        <CardContent>
           <ul className="space-y-2">
            {recentUsers.map(user => (
              <li key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                <div className="flex items-center space-x-4">
                  <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full"/>
                  <div>
                    <p className="font-semibold text-sm text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                 <Badge variant={user.role === 'admin' ? 'danger' : user.role === 'instructor' ? 'info' : 'success'}>{user.role === 'admin' ? '管理者' : user.role === 'instructor' ? '講師' : '生徒'}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};