import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars';

const Card = ({ children, style, ...props }) => {
  const cardRef = useRef(null);
  return (
    <div
      ref={cardRef}
      style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 6px 32px 0 rgba(25,118,210,0.13)",
        padding: 32,
        margin: 16,
        border: "1.5px solid #e3eafc",
        transition:
          "transform 0.22s cubic-bezier(.4,2,.6,1), box-shadow 0.22s, background 0.3s, border 0.2s",
        willChange: "transform, box-shadow, background, border",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.045)";
        e.currentTarget.style.boxShadow = "0 12px 40px 0 rgba(25,118,210,0.18)";
        e.currentTarget.style.background =
          "linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%)";
        e.currentTarget.style.border = "1.5px solid #b6d0f7";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 32px 0 rgba(25,118,210,0.13)";
        e.currentTarget.style.background = "#fff";
        e.currentTarget.style.border = "1.5px solid #e3eafc";
      }}
      {...props}
    >
      {/* Animated shine effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.0) 60%, rgba(255,255,255,0.18) 80%, rgba(255,255,255,0.0) 100%)",
          animation: "shine 2.5s infinite linear",
        }}
      />
      {children}
      {/* Keyframes for shine animation */}
      <style>{`
        @keyframes shine {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
      `}</style>
    </div>
  );
};

// Card for user display in dashboard/bookmarks
const UserCard = ({ user, onBookmark, onRemoveBookmark, showRemove, onPromote, onAssignProject, isDark, simple }) => {
  const navigate = useNavigate();
  if (simple) {
    return (
      <Card style={{
        padding: 18,
        margin: 8,
        minWidth: 260,
        maxWidth: 320,
        background: isDark ? '#23272f' : '#fff',
        color: isDark ? '#f5f6fa' : '#181a1b',
        border: isDark ? '1.5px solid #333' : '1.5px solid #e3eafc',
        boxShadow: isDark ? '0 6px 32px 0 rgba(25,118,210,0.08)' : '0 6px 32px 0 rgba(25,118,210,0.13)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        transition: 'box-shadow 0.2s, background 0.2s',
      }}>
        {user.avatar && (
          <img
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName} avatar`}
            style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', marginBottom: 10, border: isDark ? '2px solid #FFD600' : '2px solid #FFD600', boxShadow: '0 2px 8px #ffd60033' }}
          />
        )}
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 2 }}>{user.firstName} {user.lastName}</div>
        <div style={{ color: isDark ? '#bbb' : '#555', fontSize: 14, marginBottom: 2 }}>{user.email}</div>
        <div style={{ color: '#1976d2', fontWeight: 500, fontSize: 14, marginBottom: 2 }}>{user.department}</div>
        <div style={{ margin: '6px 0 0 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <RatingStars rating={user.rating} size={16} color="#FFD600" />
          <button
            style={{
              padding: '4px 12px',
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 13,
              marginLeft: 6
            }}
            onClick={() => navigate(`/employee/${user.id}`)}
            aria-label={`View details for ${user.firstName} ${user.lastName}`}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/employee/${user.id}`); }}
          >View</button>
        </div>
      </Card>
    );
  }

  return (
    <Card style={{
      padding: 20,
      margin: 8,
      background: isDark ? '#23272f' : '#fff',
      color: isDark ? '#f5f6fa' : '#181a1b',
      border: isDark ? '1.5px solid #333' : '1.5px solid #e3eafc',
      boxShadow: isDark ? '0 6px 32px 0 rgba(25,118,210,0.08)' : '0 6px 32px 0 rgba(25,118,210,0.13)',
      transition: 'box-shadow 0.2s, background 0.2s',
    }}>
      {(
        user.avatar || user.image || user.gender
      ) && (
        <img
          src={
            user.avatar
              ? user.avatar
              : user.image
                ? user.image
                : `https://randomuser.me/api/portraits/${user.gender === 'male' ? 'men' : 'women'}/${user.id}.jpg`
          }
          alt={`${user.firstName} ${user.lastName} avatar`}
          style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', marginBottom: 8, alignSelf: 'center', border: isDark ? '2px solid #333' : '2px solid #e3eafc' }}
        />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>{user.firstName} {user.lastName}</div>
        <div style={{ color: isDark ? '#bbb' : '#555', fontSize: 14 }}>{user.email}</div>
        {user.age !== undefined && user.age !== null && (
          <div style={{ color: isDark ? '#aaa' : '#888', fontSize: 15 }}>Age: {user.age}</div>
        )}
        {user.department && (
          <div style={{ color: '#1976d2', fontWeight: 500, fontSize: 14 }}>{user.department}</div>
        )}
        {user.phone && <div style={{ color: isDark ? '#aaa' : '#888', fontSize: 15 }}>Phone: {user.phone}</div>}
        {user.address && (user.address.address || user.address.city) && (
          <div style={{ color: isDark ? '#aaa' : '#888', fontSize: 15 }}>Address: {user.address.address || ''}{user.address.address && user.address.city ? ', ' : ''}{user.address.city || ''}</div>
        )}
        {user.rating !== undefined && user.rating !== null && (
          <div style={{ color: isDark ? '#aaa' : '#888', fontSize: 15 }}>Rating: <span style={{ color: '#FFD600', fontWeight: 600 }}>{user.rating}</span></div>
        )}
        {user.rating !== undefined && user.rating !== null && <RatingStars rating={user.rating} size={14} color="#FFD600" />}
        {user.bio && <div style={{ color: isDark ? '#aaa' : '#888', fontSize: 15 }}><b>Bio:</b> {user.bio}</div>}
        {user.performanceHistory && Array.isArray(user.performanceHistory) && user.performanceHistory.length > 0 && (
          <div style={{ color: isDark ? '#aaa' : '#888', fontSize: 15 }}>
            <b>Performance History:</b>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {user.performanceHistory.map((p, i) => (
                <li key={i}>
                  {typeof p === 'object' && p.year ? `${p.year}: ` : ''}<span style={{ color: '#FFD600' }}>{'★'.repeat(p.rating || p)}</span>{typeof p === 'object' && p.year ? ` (${p.rating || p} stars)` : ` (${p} stars)`}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          <button
            style={{ padding: '6px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, outline: 'none' }}
            onClick={() => navigate(`/employee/${user.id}`)}
            aria-label={`View details for ${user.firstName} ${user.lastName}`}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/employee/${user.id}`); }}
          >View</button>
          {onBookmark && <button style={{ padding: '6px 16px', background: '#FFD600', color: '#333', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }} onClick={onBookmark}>Bookmark</button>}
          <button style={{ padding: '6px 16px', background: '#43a047', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }} onClick={onPromote}>Promote</button>
          {showRemove && <button style={{ padding: '6px 16px', background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }} onClick={onRemoveBookmark}>Remove</button>}
          <button style={{ padding: '6px 16px', background: '#ffb300', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }} onClick={onAssignProject}>Assign to Project</button>
        </div>
      </div>
    </Card>
  );
};

export default Card;
export { UserCard };
