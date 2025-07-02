import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import { getRandomDepartment, getRandomRating, getRandomBio, getRandomPerformanceHistory } from '../lib/mockData';

const initialState = {
  users: [],
  bookmarks: [],
  search: '',
  filter: { department: [], rating: [] },
  theme: 'light',
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'ADD_BOOKMARK':
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case 'REMOVE_BOOKMARK':
      return { ...state, bookmarks: state.bookmarks.filter(id => id !== action.payload) };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Set dark/light mode on body
    document.body.style.background = state.theme === 'dark' ? '#181a1b' : '#f5f6fa';
    document.body.style.color = state.theme === 'dark' ? '#f5f6fa' : '#181a1b';
  }, [state.theme]);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => {
        // Enhance users with department, rating, bio, performance history
        const enhanced = data.users.map(user => ({
          ...user,
          department: getRandomDepartment(),
          rating: getRandomRating(),
          bio: getRandomBio(),
          performanceHistory: getRandomPerformanceHistory(),
        }));
        dispatch({ type: 'SET_USERS', payload: enhanced });
        dispatch({ type: 'SET_LOADING', payload: false });
      })
      .catch(err => {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch users' });
        dispatch({ type: 'SET_LOADING', payload: false });
      });
  }, []);

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });

  const addBookmark = (user) => {
    dispatch({ type: 'ADD_BOOKMARK', payload: user });
  };
  const removeBookmark = (id) => {
    dispatch({ type: 'REMOVE_BOOKMARK', payload: id });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, addBookmark, removeBookmark, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
