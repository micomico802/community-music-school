import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { useAuth } from '../contexts/AuthContext';
import { dummyUsers } from '../data/dummyData';
import { UserRole } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { format, addDays, setHours, setMinutes, isSameDay, addWeeks } from 'date-fns';
import { Icons } from '../components/icons';

// Mock availability data
const getInstructorAvailability = (instructorId: string, date: Date) => {
  // Simple mock: instructors available Mon-Fri 9:00-18:00, every hour
  const day = date.getDay();
  if (day === 0 || day === 6) return []; // No weekend availability
  
  const slots = [];
  for (let hour = 9; hour < 18; hour++) {
    slots.push({
      time: setMinutes(setHours(date, hour), 0),
      available: Math.random() > 0.3 // 70% chance of availability
    });
  }
  return slots;
};

export const Booking: React.FC = () => {
  const { user } = useAuth();
  const [selectedInstructor, setSelectedInstructor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [bookingStep, setBookingStep] = useState<'instructor' | 'datetime' | 'confirm'>('instructor');
  const [showSuccess, setShowSuccess] = useState(false);

  const instructors = dummyUsers.filter(u => u.role === UserRole.INSTRUCTOR);
  const selectedInstructorData = instructors.find(i => i.id === selectedInstructor);
  
  const availableSlots = selectedInstructor 
    ? getInstructorAvailability(selectedInstructor, selectedDate)
    : [];

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const handleBooking = () => {
    // Mock booking creation
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form
      setSelectedInstructor('');
      setSelectedDate(new Date());
      setSelectedTime(null);
      setBookingStep('instructor');
    }, 3000);
  };

  if (user?.role !== UserRole.STUDENT) {
    return (
      <div>
        <PageHeader title="レッスン予約" description="予約システムは生徒のみ利用可能です。" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="レッスン予約" description="講師を選んでレッスンを予約しましょう。" />
      
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Icons.check className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-green-800">予約が完了しました！確認メールをお送りしました。</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Step 1: Select Instructor */}
        <Card className={bookingStep === 'instructor' ? 'lg:col-span-3' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                1
              </span>
              講師を選択
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {instructors.map(instructor => (
                <div
                  key={instructor.id}
                  onClick={() => {
                    setSelectedInstructor(instructor.id);
                    setBookingStep('datetime');
                  }}
                  className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                    selectedInstructor === instructor.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <img 
                      src={instructor.avatarUrl} 
                      alt={instructor.name} 
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">{instructor.name}</p>
                      <p className="text-sm text-slate-500">{instructor.instrument}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Select Date & Time */}
        {bookingStep !== 'instructor' && (
          <Card className={bookingStep === 'datetime' ? 'lg:col-span-3' : 'lg:col-span-2'}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  2
                </span>
                日時を選択
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Date Selection */}
              <div className="mb-6">
                <p className="mb-3 text-sm font-medium text-slate-700">日付を選択</p>
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {weekDays.map(day => (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`rounded-lg p-1 sm:p-2 text-center transition-colors min-h-[60px] sm:min-h-[70px] ${
                        isSameDay(selectedDate, day)
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 hover:bg-slate-200'
                      }`}
                    >
                      <p className="text-[10px] sm:text-xs">{['日', '月', '火', '水', '木', '金', '土'][day.getDay()]}</p>
                      <p className="text-sm sm:text-lg font-semibold">{format(day, 'd')}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <p className="mb-3 text-sm font-medium text-slate-700">時間を選択</p>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                  {availableSlots.map(slot => (
                    <button
                      key={slot.time.toISOString()}
                      onClick={() => {
                        if (slot.available) {
                          setSelectedTime(slot.time);
                          setBookingStep('confirm');
                        }
                      }}
                      disabled={!slot.available}
                      className={`rounded-lg p-2 text-sm transition-colors ${
                        selectedTime && isSameDay(selectedTime, slot.time) && 
                        selectedTime.getHours() === slot.time.getHours()
                          ? 'bg-blue-500 text-white'
                          : slot.available
                          ? 'bg-slate-100 hover:bg-slate-200'
                          : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                      }`}
                    >
                      {format(slot.time, 'HH:mm')}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Confirm Booking */}
        {bookingStep === 'confirm' && selectedTime && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  3
                </span>
                予約確認
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">講師</p>
                  <p className="font-semibold">{selectedInstructorData?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">楽器</p>
                  <p className="font-semibold">{selectedInstructorData?.instrument}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">日時</p>
                  <p className="font-semibold">
                    {format(selectedTime, 'yyyy年M月d日')} ({['日', '月', '火', '水', '木', '金', '土'][selectedTime.getDay()]})
                  </p>
                  <p className="font-semibold">
                    {format(selectedTime, 'HH:mm')} - {format(setHours(selectedTime, selectedTime.getHours() + 1), 'HH:mm')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">料金</p>
                  <p className="font-semibold">¥5,000</p>
                </div>
                
                <Button 
                  onClick={handleBooking}
                  className="w-full"
                >
                  予約を確定する
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setBookingStep('datetime')}
                  className="w-full"
                >
                  日時を変更
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};