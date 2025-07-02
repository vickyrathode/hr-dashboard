import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import Chart from 'chart.js/auto';

const Analytics = () => {
  const { state } = useAppContext();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const isDark = state.theme === 'dark';

  // Calculate department-wise average ratings
  const deptRatings = {};
  (state.users || []).forEach(u => {
    if (!deptRatings[u.department]) deptRatings[u.department] = [];
    deptRatings[u.department].push(Number(u.rating));
  });
  const deptLabels = Object.keys(deptRatings);
  const deptAverages = deptLabels.map(dep => {
    const arr = deptRatings[dep];
    return arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0;
  });

  // Bookmark trends (mocked: just show count of bookmarks per department)
  const bookmarkCounts = {};
  (state.users || []).forEach(u => {
    if (!bookmarkCounts[u.department]) bookmarkCounts[u.department] = 0;
    if ((state.bookmarks || []).find(b => b.id ? b.id === u.id : b === u.id)) bookmarkCounts[u.department]++;
  });
  const bookmarkData = deptLabels.map(dep => bookmarkCounts[dep] || 0);

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: deptLabels,
        datasets: [
          {
            label: 'Avg Rating',
            data: deptAverages,
            backgroundColor: '#1976d2',
            yAxisID: 'y',
          },
          {
            label: 'Bookmarks',
            data: bookmarkData,
            backgroundColor: '#ffb300',
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top', labels: { color: isDark ? '#f5f6fa' : '#181a1b' } },
          title: { display: true, text: 'Department Analytics', color: isDark ? '#f5f6fa' : '#181a1b' },
        },
        scales: {
          x: { ticks: { color: isDark ? '#f5f6fa' : '#181a1b' } },
          y: {
            type: 'linear',
            position: 'left',
            min: 0,
            max: 5,
            title: { display: true, text: 'Avg Rating', color: isDark ? '#f5f6fa' : '#181a1b' },
            ticks: { color: isDark ? '#f5f6fa' : '#181a1b' },
          },
          y1: {
            type: 'linear',
            position: 'right',
            min: 0,
            title: { display: true, text: 'Bookmarks', color: isDark ? '#f5f6fa' : '#181a1b' },
            grid: { drawOnChartArea: false },
            ticks: { color: isDark ? '#f5f6fa' : '#181a1b' },
          },
        },
      },
    });
    // Cleanup
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [state.users, state.bookmarks, isDark]);

  return (
    <div style={{ padding: 32, maxWidth: 700, margin: '0 auto', background: isDark ? '#181a1b' : '#f5f6fa', color: isDark ? '#f5f6fa' : '#181a1b', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Analytics</h1>
      <div style={{ background: isDark ? '#23272f' : '#fff', borderRadius: 18, boxShadow: '0 6px 32px 0 rgba(25,118,210,0.13)', padding: 32, textAlign: 'center' }}>
        <canvas ref={chartRef} height={350} aria-label="Department analytics chart" role="img" style={{ background: isDark ? '#23272f' : '#fff' }} />
        <p style={{ marginTop: 24, color: isDark ? '#bbb' : '#888' }}>Department-wise average ratings and bookmark trends.</p>
      </div>
    </div>
  );
};

export default Analytics;
