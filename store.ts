import { useSyncExternalStore } from 'react';

export type TaskDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface Task {
  id: number;
  title: string;
  status: string;
  progress: string;
  priority: TaskDifficulty;
  xpValue: number;
}

interface GameState {
  currentXp: number;
  nextLevelXp: number;
  level: number;
  tasks: Task[];
}

interface GameActions {
  addXp: (amount: number) => void;
  removeXp: (amount: number) => void;
  toggleTask: (id: number) => void;
  addTask: (taskName: string, difficulty: TaskDifficulty) => boolean;
}

type GameStore = GameState & GameActions;

let state: GameState = {
  currentXp: 0,
  nextLevelXp: 1000,
  level: 1,
  tasks: [
    {
      id: 1,
      title: 'SYSTEM_CALIBRATION',
      status: 'IN_PROGRESS',
      progress: '65%',
      priority: 'HARD',
      xpValue: 150,
    },
  ],
};

const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = (): GameState => state;

const applyXpGain = (amount: number) => {
  const total = state.currentXp + amount;

  if (total >= state.nextLevelXp) {
    state = {
      ...state,
      currentXp: total - state.nextLevelXp,
      level: state.level + 1,
      nextLevelXp: state.nextLevelXp + 500,
    };
    return;
  }

  state = {
    ...state,
    currentXp: total,
  };
};

const applyXpLoss = (amount: number) => {
  state = {
    ...state,
    currentXp: Math.max(0, state.currentXp - amount),
  };
};

const DIFFICULTY_XP: Record<TaskDifficulty, number> = {
  EASY: 30,
  MEDIUM: 50,
  HARD: 100,
};

const actions: GameActions = {
  addXp: (amount) => {
    applyXpGain(amount);
    emit();
  },

  removeXp: (amount) => {
    applyXpLoss(amount);
    emit();
  },

  toggleTask: (id) => {
    const taskToToggle = state.tasks.find((task) => task.id === id);
    if (!taskToToggle) return;

    const isComp = taskToToggle.status === 'COMPLETED';

    state = {
      ...state,
      tasks: state.tasks.map((task) => {
        if (task.id !== id) return task;

        return {
          ...task,
          status: isComp ? 'IN_PROGRESS' : 'COMPLETED',
          progress: isComp ? '50%' : '100%',
        };
      }),
    };

    if (!isComp) {
      applyXpGain(taskToToggle.xpValue);
    } else {
      applyXpLoss(taskToToggle.xpValue);
    }

    emit();
  },

  addTask: (taskName, difficulty) => {
    if (taskName.trim().length === 0) return false;

    const newTask: Task = {
      id: Date.now(),
      title: taskName.toUpperCase().replace(/\s+/g, '_'),
      status: 'PENDING',
      progress: '0%',
      priority: difficulty,
      xpValue: DIFFICULTY_XP[difficulty],
    };

    state = {
      ...state,
      tasks: [newTask, ...state.tasks],
    };

    emit();
    return true;
  },
};

export const useGameStore = (): GameStore => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return {
    ...snapshot,
    ...actions,
  };
};
