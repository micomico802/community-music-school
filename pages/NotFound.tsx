
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-6xl font-bold text-slate-800">404</h1>
            <p className="text-xl mt-4 text-slate-600">ページが見つかりません</p>
            <p className="mt-2 text-slate-500">申し訳ありません、お探しのページは存在しません。</p>
            <Button asChild className="mt-6">
                <Link to="/dashboard">ダッシュボードへ戻る</Link>
            </Button>
        </div>
    );
};
