import { useAppContext } from "../context/AppContext";
import { useState } from "react";

function useSearch() {
  const { state } = useAppContext();
  const users = state?.users || [];
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState([]);
  const [rating, setRating] = useState([]);

  const filtered = users.filter(user => {
    const matchesQuery =
      user.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.lastName.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.department.toLowerCase().includes(query.toLowerCase());
    const matchesDept = department.length === 0 || department.includes(user.department);
    const matchesRating = rating.length === 0 || rating.includes(user.rating);
    return matchesQuery && matchesDept && matchesRating;
  });

  // Add a function to filter users by query
  const filterUsers = (usersList) => {
    if (!query) return usersList;
    const q = query.toLowerCase();
    return usersList.filter(user =>
      (user.firstName && user.firstName.toLowerCase().includes(q)) ||
      (user.lastName && user.lastName.toLowerCase().includes(q)) ||
      (user.email && user.email.toLowerCase().includes(q)) ||
      (user.department && user.department.toLowerCase().includes(q))
    );
  };

  return {
    query,
    setQuery,
    department,
    setDepartment,
    rating,
    setRating,
    filtered,
    filterUsers,
  };
}

export default useSearch;
