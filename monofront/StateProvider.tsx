// monofront/StateProvider.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, MealEntry, UserProfile } from './AppLogic';

type Action =
  | { type: 'SET_PROFILE'; payload: UserProfile }
  | { type: 'ADD_MEAL'; payload: MealEntry };

const initialState: AppState = {
  userProfile: undefined,
  meals: [],
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, userProfile: action.payload };
    case 'ADD_MEAL':
      return { ...state, meals: [...state.meals, action.payload] };
    default:
      return state;
  }
}

const AppStateContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
};


