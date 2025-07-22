import { formatDistanceToNow as fnsFormatDistanceToNow } from 'date-fns';

export const formatDistanceToNowJa = (date: Date): string => {
  const distance = fnsFormatDistanceToNow(date, { addSuffix: false });
  
  // Simple Japanese conversion
  const conversions: { [key: string]: string } = {
    'less than a minute': '1分以内',
    'about 1 hour': '約1時間',
    'about 2 hours': '約2時間',
    'about 3 hours': '約3時間',
    'about 4 hours': '約4時間',
    'about 5 hours': '約5時間',
    'about 6 hours': '約6時間',
    'about 7 hours': '約7時間',
    'about 8 hours': '約8時間',
    'about 9 hours': '約9時間',
    'about 10 hours': '約10時間',
    'about 11 hours': '約11時間',
    'about 12 hours': '約12時間',
    '1 day': '1日',
    '2 days': '2日',
    '3 days': '3日',
    '4 days': '4日',
    '5 days': '5日',
    '6 days': '6日',
    '7 days': '7日',
  };
  
  // Check for common patterns
  for (const [eng, ja] of Object.entries(conversions)) {
    if (distance.includes(eng)) {
      return ja + '前';
    }
  }
  
  // Handle minutes
  const minuteMatch = distance.match(/(\d+) minutes?/);
  if (minuteMatch) {
    return `${minuteMatch[1]}分前`;
  }
  
  // Handle hours
  const hourMatch = distance.match(/(\d+) hours?/);
  if (hourMatch) {
    return `${hourMatch[1]}時間前`;
  }
  
  // Handle days
  const dayMatch = distance.match(/(\d+) days?/);
  if (dayMatch) {
    return `${dayMatch[1]}日前`;
  }
  
  // Default fallback
  return distance + '前';
};