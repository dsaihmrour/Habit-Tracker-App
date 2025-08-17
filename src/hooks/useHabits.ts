import { useState, useEffect } from 'react';
import { Habit, HabitFormData } from '../types';

const STORAGE_KEY = 'habit-tracker-data';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHabits(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored habits:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habitData: HabitFormData) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      title: habitData.title,
      color: habitData.color,
      schedule: habitData.schedule,
      customDays: habitData.customDays,
      createdAt: new Date().toISOString(),
      completions: {}
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const toggleCompletion = (habitId: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        return {
          ...habit,
          completions: {
            ...habit.completions,
            [date]: !habit.completions[date]
          }
        };
      }
      return habit;
    }));
  };

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion
  };
};