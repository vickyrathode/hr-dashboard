import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import useBookmarks from '../hooks/useBookmarks';
import useSearch from '../hooks/useSearch';
import { useAppContext } from '../context/AppContext';

const departments = ['Engineering', 'HR', 'Design', 'Marketing', 'Sales', 'Finance'];
function getRandomDepartment() {
  return departments[Math.floor(Math.random() * departments.length)];
}
function getRandomRating() {
  return (Math.random() * 2 + 3).toFixed(1); // 3.0 - 5.0
}

const Dashboard = () => {
  const { state, dispatch } = useAppContext();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const { query, setQuery, filterUsers } = useSearch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterDept, setFilterDept] = useState(''); // single-select for department
  const [filterRating, setFilterRating] = useState(''); // single-select for rating
  const isDark = state.theme === 'dark';

  // Fetch users from API
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://dummyjson.com/users?limit=20');
        const data = await res.json();
        // Enhance users with department, rating, avatar
        const enhanced = data.users.map(u => ({
          ...u,
          department: getRandomDepartment(),
          rating: Number(getRandomRating()),
          avatar: u.image || `https://randomuser.me/api/portraits/${u.gender === 'male' ? 'men' : 'women'}/${u.id}.jpg`,
        }));
        dispatch({ type: 'SET_USERS', payload: enhanced });
      } catch (e) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    }
    if (!state.users || state.users.length === 0) fetchUsers();
  }, [dispatch, state.users]);

  // Unique departments and ratings for dropdowns
  const allDepartments = Array.from(new Set((state.users || []).map(u => u.department)));
  const allRatings = [3, 4, 5];

  // Filter logic
  let filteredUsers = (state.users || []);
  if (filterDept) {
    filteredUsers = filteredUsers.filter(u => u.department === filterDept);
  }
  if (filterRating) {
    filteredUsers = filteredUsers.filter(u => Math.round(u.rating) === Number(filterRating));
  }
  filteredUsers = filterUsers(filteredUsers);

  if (loading) return <div style={{ padding: 32, textAlign: 'center', color: isDark ? '#fff' : '#222' }}>Loading...</div>;
  if (error) return <div style={{ padding: 32, textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 32, background: isDark ? '#181a1b' : '#f5f6fa', color: isDark ? '#f5f6fa' : '#181a1b', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Employee Directory</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          type="text"
          aria-label="Search employees by name, email, or department"
          placeholder="Search by name, email, or department..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 6,
            border: isDark ? '1px solid #444' : '1px solid #ccc',
            width: 260,
            fontSize: 16,
            background: isDark ? '#23272f' : '#fff',
            color: isDark ? '#f5f6fa' : '#181a1b',
          }}
        />
        {/* Department single-select */}
        <select
          value={filterDept}
          onChange={e => setFilterDept(e.target.value)}
          aria-label="Filter by department"
          style={{ minWidth: 160, padding: 8, borderRadius: 6, background: isDark ? '#23272f' : '#fff', color: isDark ? '#f5f6fa' : '#181a1b', border: isDark ? '1px solid #444' : '1px solid #ccc' }}
        >
          <option value="">All Departments</option>
          {departments.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
        {/* Rating single-select */}
        <select
          value={filterRating}
          onChange={e => setFilterRating(e.target.value)}
          aria-label="Filter by rating"
          style={{ minWidth: 120, padding: 8, borderRadius: 6, background: isDark ? '#23272f' : '#fff', color: isDark ? '#f5f6fa' : '#181a1b', border: isDark ? '1px solid #444' : '1px solid #ccc' }}
        >
          <option value="">All Ratings</option>
          {[3, 4, 5].map(r => (
            <option key={r} value={r}>{r} Stars</option>
          ))}
        </select>
      </div>
      {loading && <div style={{ textAlign: 'center', color: isDark ? '#fff' : '#1976d2' }}>Loading users...</div>}
      {error && <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        {filteredUsers.length === 0 && !loading ? (
          <div style={{ fontSize: 18, color: '#888' }}>No employees found.</div>
        ) : (
          filteredUsers.map((user, idx) => (
            <Card key={user.id} style={{ width: 270, position: 'relative', opacity: 0, animation: `fadeIn 0.5s ${idx * 0.07}s forwards`, background: isDark ? '#23272f' : '#fff', color: isDark ? '#f5f6fa' : '#181a1b' }}>
              <img
                src={user.avatar && user.avatar.startsWith('http') ? user.avatar : `https://randomuser.me/api/portraits/${user.gender === 'male' ? 'men' : 'women'}/${user.id}.jpg`}
                alt={user.firstName || 'User'}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: 14,
                  boxShadow: '0 4px 16px rgba(25,118,210,0.13)',
                  border: '3px solid #fff',
                  background: '#e3eafc',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  transition: 'box-shadow 0.2s',
                  zIndex: 2
                }}
                onError={e => { e.target.onerror = null; e.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg'; }}
              />
              <div style={{ fontWeight: 600, fontSize: 18 }}>{user.firstName} {user.lastName}</div>
              <div style={{ color: '#555', marginBottom: 6 }}>{user.email}</div>
              <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>Age: {user.age}</div>
              <Badge label={user.department} color="#1976d2" style={{ marginBottom: 8 }} />
              <div style={{ margin: '8px 0', fontSize: 15 }}>
                Rating: {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} style={{ color: i < Math.round(user.rating) ? '#FFD600' : '#ccc', fontSize: 18 }}>★</span>
                ))} <b>{user.rating}</b>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                <Button style={{ background: '#1976d2' }} onClick={() => {
                  window.history.pushState({}, '', `/employee/${user.id}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}>View</Button>
                {bookmarks.some(b => b.id === user.id) ? (
                  <Button style={{ background: '#e53935' }} onClick={() => removeBookmark(user.id)}>Remove Bookmark</Button>
                ) : (
                  <Button onClick={() => {
                    // Find the full user object from state.users
                    const fullUser = (state.users || []).find(u => u.id === user.id);
                    if (fullUser) addBookmark(fullUser);
                  }}>Bookmark</Button>
                )}
                <Button style={{ background: '#43a047' }} onClick={() => alert('Promoted!')}>Promote</Button>
                <Button style={{ background: '#ffb300' }} onClick={() => alert('Assigned to Project!')}>Assign to Project</Button>
                
              </div>
            </Card>
          ))
        )}
      </div>
      {/* Add fadeIn animation keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: none; }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
