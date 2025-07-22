
import React, { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { generatePracticeIdea } from '../services/geminiService';
import { Button } from './ui/Button';
import { Icons } from './icons';
import { Card, CardContent } from './ui/Card';

export const PracticeIdeaGenerator: React.FC = () => {
  const { user } = useAuth();
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = useCallback(async () => {
    if (!user || !user.instrument || !user.level) return;
    
    setIsLoading(true);
    setError('');
    setIdea('');

    try {
      const generatedIdea = await generatePracticeIdea(user.instrument, user.level);
      setIdea(generatedIdea);
    } catch (err: any) {
      setError(err.message || '予期しないエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  if (!user || !user.instrument || !user.level) {
    return null;
  }
  
  // Do not render if API_KEY is not available.
  if (!process.env.API_KEY) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">練習アイデアジェネレーター</h3>
            <p className="text-sm text-slate-600">行き詰まった？AIが練習アイデアを提供します！</p>
          </div>
          <Button onClick={handleGenerate} disabled={isLoading} size="sm" variant="accent">
            {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.idea className="mr-2 h-4 w-4" />}
            新しいアイデア
          </Button>
        </div>
        
        {idea && (
          <div className="mt-4 p-4 bg-white/70 rounded-lg border border-blue-200">
            <p className="text-sm text-slate-700 font-medium">{idea}</p>
          </div>
        )}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </CardContent>
    </Card>
  );
};
