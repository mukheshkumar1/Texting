import { format, isToday, isYesterday } from 'date-fns';

export const formatChatDate = (date) => {
  const messageDate = new Date(date);
  if (isToday(messageDate)) {
    return "Today";
  } else if (isYesterday(messageDate)) {
    return "Yesterday";
  } else {
    return format(messageDate, 'MMMM dd, yyyy'); // e.g., October 03, 2024
  }
};

export const isSameDay = (date1, date2) => {
  return format(new Date(date1), 'yyyy-MM-dd') === format(new Date(date2), 'yyyy-MM-dd');
};
