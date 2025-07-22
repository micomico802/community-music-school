
import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { useAuth } from '../contexts/AuthContext';
import { dummyPracticeLogs } from '../data/dummyData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PracticeIdeaGenerator } from '../components/PracticeIdeaGenerator';

export const Practice: React.FC = () => {
    const { user } = useAuth();
    
    // Only students can access practice log
    if (user?.role !== 'student') {
        return (
            <div>
                <PageHeader title="練習記録" description="練習記録は生徒のみ利用可能です。" />
            </div>
        );
    }
    
    const userLogs = dummyPracticeLogs.filter(log => log.studentId === user?.id);

    const practiceData = userLogs.slice(0, 10).map(log => ({
        date: format(log.date, 'MM/dd'),
        duration: log.durationMinutes,
    })).reverse();

    return (
        <div>
            <PageHeader title="練習記録" description="進歩を追跡し、モチベーションを維持しましょう。" />
            
            <div className="space-y-8">
                <PracticeIdeaGenerator />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>練習履歴（直近10セッション）</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={practiceData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                                    <YAxis label={{ value: '分', angle: -90, position: 'insideLeft', fill: '#64748b' }} stroke="#64748b" fontSize={12} />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                                    <Bar dataKey="duration" name="練習時間（分）" fill="#16a34a" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>最近の記録</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {userLogs.slice(0, 5).map(log => (
                                    <li key={log.id} className="p-3 bg-slate-50 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-slate-800">{log.instrument}</p>
                                            <p className="text-sm font-bold text-green-600">{log.durationMinutes} 分</p>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">{format(log.date, 'PPPP')}</p>
                                        <p className="text-sm text-slate-600 mt-2 italic">"{log.notes}"</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
