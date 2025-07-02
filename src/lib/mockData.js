// Utility functions for generating mock data
export const departments = [
  'Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Support', 'Product', 'Design'
];

export function getRandomDepartment() {
  return departments[Math.floor(Math.random() * departments.length)];
}

export function getRandomRating() {
  return Math.floor(Math.random() * 5) + 1;
}

export function getRandomBio() {
  const bios = [
    'A passionate team player.',
    'Results-driven and detail-oriented.',
    'Always eager to learn and grow.',
    'Creative thinker and problem solver.',
    'Dedicated to excellence in every project.'
  ];
  return bios[Math.floor(Math.random() * bios.length)];
}

export function getRandomPerformanceHistory() {
  return Array.from({ length: 5 }, () => getRandomRating());
}
