import { format, startOfWeek, addDays } from 'date-fns';

export const getCurrentWeekDates = () => {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    return {
      date: format(date, 'yyyy-MM-dd'),
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd'),
      isToday: format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
    };
  });
};

export const getWeeklyProgress = (habits: any[]) => {
  const weekDates = getCurrentWeekDates();
  
  return weekDates.map(day => {
    const totalHabits = habits.length;
    const completedHabits = habits.filter(habit => 
      habit.completions[day.date] === true
    ).length;
    
    const percentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
    
    return {
      day: day.dayName,
      percentage: Math.round(percentage),
      completed: completedHabits,
      total: totalHabits
    };
  });
};