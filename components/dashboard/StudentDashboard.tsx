
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dummyLessons, dummyPracticeLogs, dummyUsers } from '../../data/dummyData';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatsCard } from './StatsCard';
import { Icons } from '../icons';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const upcomingLessons = dummyLessons.filter(l => l.studentId === user?.id && l.status === 'scheduled' && l.startTime > new Date()).slice(0, 3);
  const totalPracticeTime = dummyPracticeLogs.filter(p => p.studentId === user?.id).reduce((sum, log) => sum + log.durationMinutes, 0);

  const practiceData = dummyPracticeLogs
    .filter(p => p.studentId === user?.id)
    .slice(0, 7)
    .map(p => ({
        name: format(p.date, 'M/d'),
        minutes: p.durationMinutes,
    })).reverse();


  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="予定のレッスン" value={upcomingLessons.length.toString()} icon={<Icons.lessons className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-blue-500 to-cyan-400" />
        <StatsCard title="総練習時間（分）" value={totalPracticeTime.toString()} icon={<Icons.practice className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-green-500 to-lime-400" />
        <StatsCard title="完了レッスン" value={dummyLessons.filter(l => l.studentId === user?.id && l.status === 'completed').length.toString()} icon={<Icons.clipboard className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-purple-500 to-pink-400" />
        <StatsCard title="レベル" value={user?.level || 'N/A'} icon={<Icons.barchart className="h-5 w-5 text-slate-400" />} colorClass="bg-gradient-to-r from-amber-500 to-orange-400" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>最近の練習</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={practiceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip wrapperClassName="!bg-white !border-slate-200 rounded-lg" />
                <Legend />
                <Bar dataKey="minutes" fill="#2563eb" name="練習時間（分）" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>次のレッスン</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingLessons.length > 0 ? (
                upcomingLessons.map(lesson => {
                  const instructor = dummyUsers.find(u => u.id === lesson.instructorId);
                  return (
                    <li key={lesson.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                        <Icons.guitar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{lesson.instrument} レッスン 講師: {instructor?.name}</p>
                        <p className="text-xs text-slate-500">{format(lesson.startTime, "EEEE, MMM d 'at' h:mm a")}</p>
                      </div>
                    </li>
                  )
                })
              ) : (
                <p className="text-sm text-slate-500">予定されているレッスンはありません。予約しましょう！</p>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
