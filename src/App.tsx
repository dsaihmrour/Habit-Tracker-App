import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import WeeklyProgress from './components/WeeklyProgress';
import { useHabits } from './hooks/useHabits';
import { Habit } from './types';

function App() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleCompletion } = useHabits();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const handleFormSubmit = (data: any) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, data);
      setEditingHabit(null);
    } else {
      addHabit(data);
    }
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingHabit(null);
  };

  const handleDelete = (habitId: string) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(habitId);
    }
  };

  return (
    <Layout>
      <motion.div
        className="grid lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
      >
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HabitList
            habits={habits}
            onToggleCompletion={toggleCompletion}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddHabit={() => setIsFormOpen(true)}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <WeeklyProgress habits={habits} />
        </motion.div>
      </motion.div>

      <HabitForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingHabit ? {
          title: editingHabit.title,
          color: editingHabit.color,
          schedule: editingHabit.schedule,
          customDays: editingHabit.customDays || []
        } : undefined}
      />
    </Layout>
  );
}

export default App;