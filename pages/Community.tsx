
import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { dummyCommunityPosts, dummyUsers } from '../data/dummyData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { formatDistanceToNowJa } from '../utils/dateHelpers';
import { Button } from '../components/ui/Button';
import { Icons } from '../components/icons';
import { Badge } from '../components/ui/Badge';

const allGroups = ['すべて', '一般', '初級者', '中級者', '上級者', 'ギター', 'ピアノ', 'ベース', 'ドラム'];

export const Community: React.FC = () => {
    const [activeGroup, setActiveGroup] = useState('すべて');

    const filteredPosts = activeGroup === 'すべて'
        ? dummyCommunityPosts
        : dummyCommunityPosts.filter(p => p.group === activeGroup);

    return (
        <div>
            <PageHeader title="コミュニティハブ" description="他のミュージシャンとつながり、質問したり、バンドメンバーを見つけたりしましょう。" />
            
            <div className="mb-6 flex flex-wrap gap-2">
                {allGroups.map(group => (
                    <Button 
                        key={group} 
                        variant={activeGroup === group ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setActiveGroup(group)}
                    >
                        {group}
                    </Button>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {filteredPosts.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()).map(post => {
                    const author = dummyUsers.find(u => u.id === post.authorId);
                    return (
                        <Card key={post.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle>{post.title}</CardTitle>
                                        <CardDescription className="mt-1">グループ: <Badge variant="info">{post.group}</Badge></CardDescription>
                                    </div>
                                     <img src={author?.avatarUrl} alt={author?.name} className="h-10 w-10 rounded-full"/>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-slate-600">{post.content}</p>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start gap-4">
                                <div className="text-xs text-slate-500">
                                    {author?.name} が投稿 • {formatDistanceToNowJa(post.createdAt)}
                                </div>
                                {post.comments.length > 0 && (
                                     <div className="w-full space-y-3 pt-4 border-t border-slate-200">
                                         {post.comments.map(comment => {
                                             const commentAuthor = dummyUsers.find(u => u.id === comment.authorId);
                                             return (
                                                 <div key={comment.id} className="flex items-start space-x-3">
                                                     <img src={commentAuthor?.avatarUrl} alt={commentAuthor?.name} className="h-8 w-8 rounded-full"/>
                                                     <div className="flex-1 bg-slate-100 rounded-lg p-2">
                                                        <p className="text-sm font-semibold text-slate-800">{commentAuthor?.name}</p>
                                                        <p className="text-sm text-slate-600">{comment.content}</p>
                                                     </div>
                                                 </div>
                                             )
                                         })}
                                     </div>
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
