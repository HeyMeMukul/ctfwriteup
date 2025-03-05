import { login } from './authSlice';
import authService from '../appwrite/auth';

export const persistAuth = (store) => (next) => async (action) => {
  const result = next(action);
  
  // Check if there's user data in localStorage on app initialization
  if (action.type === 'persist/REHYDRATE') {
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        
        // Verify the stored user is still valid
        const currentUser = await authService.getCurrentUser();
        
        if (currentUser) {
          store.dispatch(login(currentUser));
        }
      } catch (error) {
        console.error('Error persisting auth:', error);
      }
    }
  }
  
  return result;
};