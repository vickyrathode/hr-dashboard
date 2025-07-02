import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Tabs from '../components/Tabs';
import RatingStars from '../components/RatingStars';

const tabList = ['Overview', 'Projects', 'Feedback'];

function getMockBio(name) {
  return `${name} is a dedicated employee with a passion for excellence and teamwork. Always striving for growth and innovation.`;
}
function getMockProjects() {
  return [
    { name: 'Onboarding Portal', year: 2024 },
    { name: 'Performance Review System', year: 2023 },
    { name: 'Employee Wellness App', year: 2022 },
  ];
}
function getMockFeedback() {
  return [
    { from: 'Manager', text: 'Consistently exceeds expectations!', date: '2025-05-10' },
    { from: 'Peer', text: 'Great team player and communicator.', date: '2025-03-22' },
  ];
}
function getMockPerformance() {
  return [
    { year: 2025, rating: Math.round(Math.random() * 2 + 3) },
    { year: 2024, rating: Math.round(Math.random() * 2 + 3) },
    { year: 2023, rating: Math.round(Math.random() * 2 + 3) },
  ];
}

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const user = (state.users || []).find(u => String(u.id) === String(id));
  const [tab, setTab] = useState('Overview');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackList, setFeedbackList] = useState(getMockFeedback());
  const projects = getMockProjects();
  const performance = getMockPerformance();
  const isDark = state.theme === 'dark';

  if (!user) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: isDark ? '#f5f6fa' : '#181a1b', background: isDark ? '#181a1b' : '#f5f6fa', minHeight: '100vh' }}>
        <div style={{ fontSize: 20, color: '#888' }}>User not found.</div>
        <button style={{ marginTop: 24 }} onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{
      background: isDark ? '#23272f' : '#fff',
      borderRadius: 18,
      boxShadow: '0 6px 32px 0 rgba(25,118,210,0.13)',
      padding: 32,
      margin: '32px auto',
      maxWidth: 500,
      minWidth: 320,
      border: '1.5px solid #e3eafc',
      transition: 'box-shadow 0.2s',
      color: isDark ? '#f5f6fa' : '#181a1b',
    }} aria-label={`Employee details for ${user.firstName} ${user.lastName}`}>
      <button 
        style={{ 
          marginBottom: 16, 
          color: '#fff', 
          background: 'linear-gradient(90deg, #1976d2 60%, #43a047 100%)', 
          border: 'none', 
          borderRadius: 8, 
          cursor: 'pointer', 
          fontSize: 16, 
          fontWeight: 600, 
          padding: '8px 24px', 
          boxShadow: '0 2px 8px #1976d233', 
          transition: 'background 0.2s, transform 0.15s',
          outline: 'none',
        }} 
        onClick={() => navigate(-1)} 
        aria-label="Go back to previous page"
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        ← Back
      </button>
      <div style={{
        textAlign: 'center',
        marginBottom: 24,
        background: isDark ? 'linear-gradient(135deg, #23272f 60%, #2d3140 100%)' : 'linear-gradient(135deg, #e3f0ff 60%, #f8fafc 100%)',
        borderRadius: 16,
        boxShadow: isDark ? '0 2px 12px #1118' : '0 2px 12px #b6d0f733',
        padding: 24,
        position: 'relative',
      }}>
        <img src={user.avatar} alt={user.firstName} style={{
          width: 90,
          height: 90,
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: 16,
          boxShadow: '0 4px 16px #1976d233',
          border: '3px solid #FFD600',
          background: '#fff',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }} />
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4, textAlign: 'center', color: '#1976d2', letterSpacing: 1 }}>{user.firstName} {user.lastName}</h1>
        <div style={{
          display: 'inline-block',
          background: '#FFD600',
          color: '#23272f',
          borderRadius: 8,
          padding: '2px 12px',
          fontWeight: 600,
          fontSize: 15,
          marginBottom: 8,
          marginTop: 4,
          letterSpacing: 0.5,
        }}>{user.department}</div>
        <div style={{ marginTop: 8, marginBottom: 8 }}>
          <span style={{ color: '#FFD600', fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>
            {'★'.repeat(Math.round(user.rating))}{' '}{user.rating}
          </span>
        </div>
        <div style={{
          marginTop: 16,
          marginBottom: 16,
          color: isDark ? '#bbb' : '#444',
          fontSize: 15,
          lineHeight: 1.7,
          textAlign: 'center',
          background: isDark ? '#23272f' : '#f5f6fa',
          borderRadius: 10,
          padding: 12,
          boxShadow: isDark ? '0 1px 4px #1116' : '0 1px 4px #b6d0f722',
        }}>
          <span style={{ fontWeight: 600 }}>Email:</span> {user.email}<br />
          <span style={{ fontWeight: 600 }}>Phone:</span> {user.phone}<br />
          <span style={{ fontWeight: 600 }}>Address:</span> {user.address?.address}, {user.address?.city}
        </div>
      </div>
      <Tabs tabs={tabList} activeTab={tab} onTabChange={setTab}>
        {/* Overview Tab */}
        <div style={{ padding: 16, background: isDark ? '#23272f' : '#f8fafc', borderRadius: 12, boxShadow: isDark ? '0 1px 4px #1116' : '0 1px 4px #b6d0f722', marginBottom: 18 }}>
          <div style={{ marginBottom: 18, fontSize: 16, color: isDark ? '#FFD600' : '#1976d2', fontWeight: 700, letterSpacing: 0.5 }}>
            <span style={{ fontSize: 18, marginRight: 8 }}>📝</span>Bio
          </div>
          <div style={{ marginBottom: 18, color: isDark ? '#eee' : '#222', fontSize: 15, lineHeight: 1.7, paddingLeft: 8 }}>
            {getMockBio(user.firstName)}
          </div>
          <div style={{ marginBottom: 10, fontSize: 16, color: isDark ? '#FFD600' : '#1976d2', fontWeight: 700, letterSpacing: 0.5 }}>
            <span style={{ fontSize: 18, marginRight: 8 }}>📈</span>Performance History
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap', paddingLeft: 8 }}>
            {performance.map((p, i) => (
              <div key={i} style={{ background: isDark ? '#181a1b' : '#fff', borderRadius: 8, padding: '8px 14px', boxShadow: isDark ? '0 1px 4px #1116' : '0 1px 4px #b6d0f722', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600, minWidth: 48 }}>{p.year}:</span>
                <RatingStars rating={p.rating} size={16} color="#FFD600" />
                <span style={{ color: '#FFD600', fontWeight: 600 }}>{p.rating} stars</span>
              </div>
            ))}
          </div>
        </div>
        {/* Projects Tab */}
        <div style={{ padding: 16, background: isDark ? '#23272f' : '#f8fafc', borderRadius: 12, boxShadow: isDark ? '0 1px 4px #1116' : '0 1px 4px #b6d0f722', marginBottom: 18 }}>
          <div style={{ marginBottom: 12, fontSize: 16, color: isDark ? '#FFD600' : '#1976d2', fontWeight: 700, letterSpacing: 0.5 }}>
            <span style={{ fontSize: 18, marginRight: 8 }}>💼</span>Projects
          </div>
          <ul style={{ paddingLeft: 18, color: isDark ? '#eee' : '#222', fontSize: 15 }}>
            {projects.map(p => (
              <li key={p.name} style={{ marginBottom: 4 }}>{p.name} <span style={{ color: '#888', fontSize: 13 }}>({p.year})</span></li>
            ))}
          </ul>
        </div>
        {/* Feedback Tab */}
        <div style={{ padding: 16, background: isDark ? '#23272f' : '#f8fafc', borderRadius: 12, boxShadow: isDark ? '0 1px 4px #1116' : '0 1px 4px #b6d0f722' }}>
          <div style={{ marginBottom: 12, fontSize: 16, color: isDark ? '#FFD600' : '#1976d2', fontWeight: 700, letterSpacing: 0.5 }}>
            <span style={{ fontSize: 18, marginRight: 8 }}>💬</span>Feedback
          </div>
          <ul style={{ paddingLeft: 18, color: isDark ? '#eee' : '#222', fontSize: 15 }}>
            {feedbackList.map((f, i) => (
              <li key={i} style={{ marginBottom: 4 }}><b>{f.from}:</b> {f.text} <span style={{ color: isDark ? '#bbb' : '#888', fontSize: 13 }}>({f.date})</span></li>
            ))}
          </ul>
          <div style={{ marginTop: 16 }}>
            <b>Submit Feedback:</b>
            <textarea
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: isDark ? '1px solid #444' : '1px solid #ccc',
                background: isDark ? '#181a1b' : '#fff',
                color: isDark ? '#f5f6fa' : '#181a1b',
                fontSize: 15,
                marginBottom: 8,
                resize: 'vertical',
              }}
              rows={3}
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
              placeholder="Write feedback..."
            />
            <button
              style={{
                background: 'linear-gradient(90deg, #1976d2 60%, #43a047 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 20px',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #1976d233',
                transition: 'background 0.2s, transform 0.15s',
                outline: 'none',
              }}
              onClick={() => {
                if (feedbackText.trim()) {
                  setFeedbackList([{ from: 'You', text: feedbackText, date: new Date().toISOString().slice(0, 10) }, ...feedbackList]);
                  setFeedbackText('');
                }
              }}
            >Submit</button>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default EmployeeDetails;
