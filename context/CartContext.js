import { createContext, useContext, useEffect, useMemo, useState, useReducer } from 'react';
import { AppReducer, initialState } from './AppReducer';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const sharedState = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('mg-items'))) {
      dispatch({
        type: "load_items",
        value: JSON.parse(localStorage.getItem('mg-items'))
      })
    }
  }, [])

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('mg-items', JSON.stringify(state))
    }
  }, [state])

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}