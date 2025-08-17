import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Dumbbell, Edit, Trash2 } from 'lucide-react';
import { Habit } from '../types';
import { getCurrentWeekDates } from '../utils/dateUtils';

interface HabitItemProps {
  habit: Habit;
  onToggleCompletion: (habitId: string, date: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

const getHabitIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('water') || lowerTitle.includes('drink')) {
    return <Droplets size={20} />;
  }
  if (lowerTitle.includes('workout') || lowerTitle.includes('exercise')) {
    return <Dumbbell size={20} />;
  }
  return <div className="w-5 h-5 rounded-full" style={{ backgroundColor: 'currentColor' }} />;
};

const HabitItem: React.FC<HabitItemProps> = ({ 
  habit, 
  onToggleCompletion, 
  onEdit, 
  onDelete 
}) => {
  const weekDates = getCurrentWeekDates();

  const isHabitScheduledForDay = (dayIndex: number) => {
    if (habit.schedule === 'daily') return true;
    return habit.customDays?.includes(dayIndex) || false;
  };

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div style={{ color: habit.color }}>
            {getHabitIcon(habit.title)}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{habit.title}</h3>
        </div>
        
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(habit)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((day, index) => {
          const isScheduled = isHabitScheduledForDay((index + 1) % 7); // Adjust for Monday start
          const isCompleted = habit.completions[day.date] || false;
          
          return (
            <div key={day.date} className="text-center">
              <div className="text-xs text-gray-500 mb-2">{day.dayName}</div>
              <motion.button
                onClick={() => isScheduled && onToggleCompletion(habit.id, day.date)}
                disabled={!isScheduled}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  !isScheduled
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    : isCompleted
                    ? 'border-green-500 bg-green-500 text-white shadow-lg'
                    : day.isToday
                    ? `border-2 bg-white hover:bg-opacity-10 hover:bg-current`
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                style={!isScheduled ? {} : { 
                  borderColor: isCompleted ? '#10B981' : habit.color,
                  color: isCompleted ? 'white' : habit.color
                }}
                whileHover={{ scale: isScheduled ? 1.1 : 1 }}
                whileTap={{ scale: isScheduled ? 0.95 : 1 }}
              >
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xl"
                  >
                    ✓
                  </motion.div>
                )}
                {!isCompleted && isScheduled && day.isToday && (
                  <div className="w-2 h-2 rounded-full bg-current" />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default HabitItem;