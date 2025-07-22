
import { User, Lesson, PracticeLog, CommunityPost, UserRole } from '../types';
import { subDays, addHours, addMinutes } from 'date-fns';

export const dummyUsers: User[] = [
  { id: 'user-1', name: '佐藤美咲', email: 'misaki@example.com', role: UserRole.STUDENT, instrument: 'ギター', level: '初級者', avatarUrl: 'https://picsum.photos/seed/misaki/100' },
  { id: 'user-2', name: '山田健太', email: 'kenta@example.com', role: UserRole.STUDENT, instrument: 'ベース', level: '初級者', avatarUrl: 'https://picsum.photos/seed/kenta/100' },
  { id: 'user-3', name: '高橋あかり', email: 'akari@example.com', role: UserRole.STUDENT, instrument: 'ピアノ', level: '中級者', avatarUrl: 'https://picsum.photos/seed/akari/100' },
  { id: 'user-4', name: '伊藤大輔', email: 'daisuke@example.com', role: UserRole.STUDENT, instrument: 'ドラム', level: '上級者', avatarUrl: 'https://picsum.photos/seed/daisuke/100' },
  { id: 'user-5', name: '鈴木講師', email: 'instructor@example.com', role: UserRole.INSTRUCTOR, instrument: 'ギター', avatarUrl: 'https://picsum.photos/seed/suzuki/100' },
  { id: 'user-6', name: '渡辺講師', email: 'watanabe@example.com', role: UserRole.INSTRUCTOR, instrument: 'ピアノ', avatarUrl: 'https://picsum.photos/seed/watanabe/100' },
  { id: 'user-7', name: '田中雄一', email: 'tanaka@example.com', role: UserRole.ADMIN, avatarUrl: 'https://picsum.photos/seed/tanaka/100' },
];

const now = new Date();

export const dummyLessons: Lesson[] = [
  { id: 'lesson-1', studentId: 'user-1', instructorId: 'user-5', instrument: 'ギター', startTime: addHours(now, 2), endTime: addHours(now, 3), status: 'scheduled' },
  { id: 'lesson-2', studentId: 'user-2', instructorId: 'user-5', instrument: 'ベース', startTime: addHours(now, 4), endTime: addHours(now, 5), status: 'scheduled' },
  { id: 'lesson-3', studentId: 'user-3', instructorId: 'user-6', instrument: 'ピアノ', startTime: addHours(now, 2.5), endTime: addHours(now, 3.5), status: 'scheduled' },
  { id: 'lesson-4', studentId: 'user-1', instructorId: 'user-5', instrument: 'ギター', startTime: subDays(now, 2), endTime: addHours(subDays(now, 2), 1), status: 'completed' },
  { id: 'lesson-5', studentId: 'user-4', instructorId: 'user-5', instrument: 'ドラム', startTime: subDays(now, 1), endTime: addHours(subDays(now, 1), 1), status: 'completed' },
  { id: 'lesson-6', studentId: 'user-2', instructorId: 'user-5', instrument: 'ベース', startTime: subDays(now, 3), endTime: addHours(subDays(now, 3), 1), status: 'cancelled' },
];

export const dummyPracticeLogs: PracticeLog[] = [
  { id: 'log-1', studentId: 'user-1', date: subDays(now, 1), durationMinutes: 30, instrument: 'ギター', notes: 'C、G、Amコードを練習しました。' },
  { id: 'log-2', studentId: 'user-1', date: subDays(now, 2), durationMinutes: 45, instrument: 'ギター', notes: 'Fコードに苦戦しました。' },
  { id: 'log-3', studentId: 'user-2', date: subDays(now, 1), durationMinutes: 60, instrument: 'ベース', notes: 'スケール練習をしました。' },
  { id: 'log-4', studentId: 'user-3', date: subDays(now, 3), durationMinutes: 20, instrument: 'ピアノ', notes: '初見演奏の練習をしました。' },
  { id: 'log-5', studentId: 'user-1', date: subDays(now, 4), durationMinutes: 35, instrument: 'ギター', notes: '新しい曲のリフを覚えました。' },
];

export const dummyCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user-2',
    group: '一般',
    title: 'バンドメンバー募集！',
    content: 'みなさん、こんにちは！ベーシストとしてロックバンドを結成したいと思っています。ギタリストとドラマーを探しています。興味のある方はいませんか？',
    createdAt: subDays(now, 1),
    comments: [
      { id: 'comment-1', authorId: 'user-1', content: 'ギター弾いてます、興味あります！', createdAt: addMinutes(subDays(now, 1), 30) },
    ],
  },
  {
    id: 'post-2',
    authorId: 'user-1',
    group: '初級者',
    title: 'Fコードのコツを教えてください',
    content: 'Fのバレーコードできれいな音を出すのに本当に苦労しています。初心者仲間や講師の方からアドバイスをいただけませんか？',
    createdAt: subDays(now, 2),
    comments: [
      { id: 'comment-2', authorId: 'user-5', content: '良い質問ですね、美咲さん！人差し指の側面を使うことと、親指をネックの後ろに置いてサポートすることに集中してみてください。次のレッスンで一緒に練習しましょう！', createdAt: addHours(subDays(now, 2), 2) },
    ],
  },
  {
    id: 'post-3',
    authorId: 'user-3',
    group: 'ピアノ',
    title: '中級者向けのおすすめ曲は？',
    content: 'ピアノで新しく楽しい曲を学びたいと思っています。みなさんのお気に入りは何ですか？',
    createdAt: subDays(now, 4),
    comments: [],
  },
];
