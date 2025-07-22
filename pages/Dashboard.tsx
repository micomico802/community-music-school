
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { StudentDashboard } from '../components/dashboard/StudentDashboard';
import { InstructorDashboard } from '../components/dashboard/InstructorDashboard';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';
import { PageHeader } from '../components/ui/PageHeader';

const renderDashboard = (role: UserRole) => {
  switch (role) {
    case UserRole.STUDENT:
      return <StudentDashboard />;
    case UserRole.INSTRUCTOR:
      return <InstructorDashboard />;
    case UserRole.ADMIN:
      return <AdminDashboard />;
    default:
      return <div>無効なユーザーロールです。</div>;
  }
};

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>読み込み中...</div>;
  }
  
  const welcomeMessage = `おかえりなさい、${user.name}さん！`;
  const description = "今日の教室の情報です。";

  return (
    <div>
      <PageHeader title="ダッシュボード" description={welcomeMessage} />
      {renderDashboard(user.role)}
    </div>
  );
};
