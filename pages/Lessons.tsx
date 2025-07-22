
import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { useAuth } from '../contexts/AuthContext';
import { dummyLessons, dummyUsers } from '../data/dummyData';
import { UserRole } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { format } from 'date-fns';
import { Badge } from '../components/ui/Badge';
import { Icons } from '../components/icons';

const getBadgeVariant = (status: 'scheduled' | 'completed' | 'cancelled') => {
  switch (status) {
    case 'scheduled': return 'info';
    case 'completed': return 'success';
    case 'cancelled': return 'danger';
  }
};

export const Lessons: React.FC = () => {
    const { user } = useAuth();

    const lessons = user?.role === UserRole.ADMIN 
        ? dummyLessons 
        : user?.role === UserRole.INSTRUCTOR
        ? dummyLessons.filter(l => l.instructorId === user.id)
        : dummyLessons.filter(l => l.studentId === user?.id);

    return (
        <div>
            <PageHeader title="レッスン" description="レッスンスケジュールを表示・管理します。" />
            <Card>
                <CardHeader>
                    <CardTitle>あなたのレッスン</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {lessons.length > 0 ? lessons.sort((a, b) => b.startTime.getTime() - a.startTime.getTime()).map(lesson => {
                            const student = dummyUsers.find(u => u.id === lesson.studentId);
                            const instructor = dummyUsers.find(u => u.id === lesson.instructorId);

                            return (
                                <div key={lesson.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                                            <Icons.guitar className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{lesson.instrument} レッスン</p>
                                            <p className="text-sm text-slate-500">
                                                {user?.role === UserRole.STUDENT && `講師: ${instructor?.name}`}
                                                {user?.role === UserRole.INSTRUCTOR && `生徒: ${student?.name}`}
                                                {user?.role === UserRole.ADMIN && `生徒: ${student?.name} / 講師: ${instructor?.name}`}
                                            </p>
                                            <p className="text-xs text-slate-400">{format(lesson.startTime, "PPPP p")}</p>
                                        </div>
                                    </div>
                                    <Badge variant={getBadgeVariant(lesson.status)}>
                                        {lesson.status === 'scheduled' ? '予定' : 
                                         lesson.status === 'completed' ? '完了' : 
                                         lesson.status === 'cancelled' ? 'キャンセル' : lesson.status}
                                    </Badge>
                                </div>
                            )
                        }) : (
                             <p className="text-center text-slate-500 py-8">レッスンが見つかりません。</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
