import React, { useState } from 'react';

const Tabs = ({ tabs = [], children = [], activeTab, onTabChange }) => {
  const [active, setActive] = useState(0);
  // Use controlled tab if provided, else internal state
  const current = typeof activeTab === 'string' ? tabs.indexOf(activeTab) : active;
  const handleTabClick = idx => {
    if (onTabChange) onTabChange(tabs[idx]);
    setActive(idx);
  };
  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc', marginBottom: 16 }}>
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            style={{
              padding: '8px 20px',
              border: 'none',
              borderBottom: idx === current ? '3px solid #1976d2' : '3px solid transparent',
              background: 'none',
              color: idx === current ? '#1976d2' : '#888',
              fontWeight: idx === current ? 600 : 400,
              fontSize: 16,
              cursor: 'pointer',
              outline: 'none',
              marginRight: 8
            }}
            onClick={() => handleTabClick(idx)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{children && children[current]}</div>
    </div>
  );
};

export default Tabs;
