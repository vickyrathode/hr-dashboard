import { useAppContext } from '../context/AppContext';

export default function useBookmarks() {
  const { state, addBookmark, removeBookmark } = useAppContext();
  // bookmarks is an array of user objects
  const bookmarks = Array.isArray(state.bookmarks) ? state.bookmarks : [];
  return { bookmarks, addBookmark, removeBookmark };
}
