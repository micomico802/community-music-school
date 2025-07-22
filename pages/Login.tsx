
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Icons } from '../components/icons';

const demoAccounts = [
    { email: 'misaki@example.com', role: '生徒' },
    { email: 'instructor@example.com', role: '講師' },
    { email: 'tanaka@example.com', role: '管理者' },
];

export const Login: React.FC = () => {
    const { login, user, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!login(email)) {
            setError('無効なメールアドレスです。デモアカウントのいずれかをお試しください。');
        }
    };
    
    const handleDemoLogin = (demoEmail: string) => {
        setEmail(demoEmail);
        if (!login(demoEmail)) {
             setError('デモログインに失敗しました。');
        }
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md">
                 <div className="text-center mb-6">
                    <Icons.guitar className="mx-auto h-12 w-12 text-black" />
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">コミュニティ音楽教室</h1>
                    <p className="mt-2 text-slate-500">続けるにはサインインしてください</p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>ログイン</CardTitle>
                        <CardDescription>アカウントにサインインするにはメールアドレスを入力してください。</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="例: misaki@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <Button type="submit" className="w-full" isLoading={isLoading}>
                                {isLoading ? 'サインイン中...' : 'サインイン'}
                            </Button>
                        </form>
                         <div className="mt-6">
                            <p className="text-center text-sm text-slate-500 mb-2">またはデモアカウントを使用:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {demoAccounts.map(acc => (
                                    <Button key={acc.email} variant="outline" size="sm" onClick={() => handleDemoLogin(acc.email)}>
                                        {acc.role}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
