import React from 'react';
import useBookmarks from '../hooks/useBookmarks';
import { UserCard } from '../components/Card';
import { useAppContext } from '../context/AppContext';

export default function Bookmarks() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const { state } = useAppContext();
  const isDark = state.theme === 'dark';
  return (
    <div style={{ padding: 16, maxWidth: 1100, margin: '0 auto', background: isDark ? '#181a1b' : '#f5f6fa', color: isDark ? '#f5f6fa' : '#181a1b', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Bookmarked Employees</h1>
      {bookmarks.length === 0 ? (
        <div style={{ color: '#888', fontSize: 18 }}>No bookmarks yet.</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {bookmarks.map((user, idx) => (
            <UserCard
              key={user.id || idx}
              user={user}
              isDark={isDark}
              aria-label={`Bookmarked employee card for ${user.firstName} ${user.lastName}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
