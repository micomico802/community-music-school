
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dummyLessons, dummyUsers } from '../../data/dummyData';
import { format } from 'date-fns';
import { StatsCard } from './StatsCard';
import { Icons } from '../icons';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  const now = new Date();

  const todaysLessons = dummyLessons.filter(l => 
    l.instructorId === user?.id &&
    format(l.startTime, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd') &&
    l.status === 'scheduled'
  );

  const uniqueStudentIds = new Set(dummyLessons.filter(l => l.instructorId === user?.id).map(l => l.studentId));
  const totalStudents = uniqueStudentIds.size;
  const totalCompletedLessons = dummyLessons.filter(l => l.instructorId === user?.id && l.status === 'completed').length;
  // Assuming a fixed rate per lesson for demo
  const estimatedIncome = totalCompletedLessons * 50;

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="今日のレッスン" value={todaysLessons.length.toString()} icon={<Icons.lessons className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-blue-500 to-cyan-400" />
        <StatsCard title="生徒総数" value={totalStudents.toString()} icon={<Icons.students className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-green-500 to-lime-400" />
        <StatsCard title="完了レッスン" value={totalCompletedLessons.toString()} icon={<Icons.clipboard className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-purple-500 to-pink-400" />
        <StatsCard title="推定収入" value={`¥${estimatedIncome * 150}`} icon={<Icons.barchart className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-amber-500 to-orange-400" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>今日のスケジュール</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {todaysLessons.length > 0 ? (
              todaysLessons.map(lesson => {
                const student = dummyUsers.find(u => u.id === lesson.studentId);
                return (
                  <li key={lesson.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center space-x-4">
                      <img src={student?.avatarUrl} alt={student?.name} className="h-10 w-10 rounded-full"/>
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{student?.name}</p>
                        <p className="text-xs text-slate-500">{lesson.instrument}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-700">{format(lesson.startTime, "h:mm a")}</p>
                  </li>
                )
              })
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">今日のレッスンはありません。休日をお楽しみください！</p>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
