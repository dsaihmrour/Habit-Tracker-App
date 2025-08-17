import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Habit } from '../types';
import HabitItem from './HabitItem';

interface HabitListProps {
  habits: Habit[];
  onToggleCompletion: (habitId: string, date: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
  onAddHabit: () => void;
}

const HabitList: React.FC<HabitListProps> = ({
  habits,
  onToggleCompletion,
  onEdit,
  onDelete,
  onAddHabit
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Habits</h2>
        <motion.button
          onClick={onAddHabit}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-blue-600 transition-colors shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          <span>Add Habit</span>
        </motion.button>
      </div>

      {habits.length === 0 ? (
        <motion.div
          className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-gray-400 mb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus size={24} />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No habits yet</h3>
          <p className="text-gray-500 mb-6">Start building better habits by adding your first one!</p>
          <button
            onClick={onAddHabit}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
          >
            Add Your First Habit
          </button>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {habits.map(habit => (
              <HabitItem
                key={habit.id}
                habit={habit}
                onToggleCompletion={onToggleCompletion}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default HabitList;