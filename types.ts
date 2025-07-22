
export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  instrument?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  avatarUrl: string;
}

export interface Lesson {
  id: string;
  studentId: string;
  instructorId: string;
  instrument: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface PracticeLog {
  id: string;
  studentId: string;
  date: Date;
  durationMinutes: number;
  instrument: string;
  notes: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  group: 'Beginner' | 'Intermediate' | 'Advanced' | 'Guitar' | 'Piano' | 'Bass' | 'Drums' | 'General';
  title: string;
  content: string;
  createdAt: Date;
  comments: {
    id: string;
    authorId: string;
    content: string;
    createdAt: Date;
  }[];
}
