import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the session on initial load
  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const { data: session } = await api.get('/auth/session');
        if (session && session.user) {
          // Fetch full user profile from DB (includes avatar, phoneNumber, etc.)
          try {
            const { data: fullUser } = await api.get('/users/me');
            setUser({ ...session.user, ...fullUser });
          } catch {
            // Fallback: use session data only
            setUser({ ...session.user, avatar: session.user.image || session.user.avatar });
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  // Use the standard NextAuth endpoints for credentials login
  const login = async (email, password) => {
    try {
      // 1. Get CSRF token
      const { data: { csrfToken } } = await api.get('/auth/csrf');
      
      // 2. Submit credentials
      const res = await api.post(
        '/auth/callback/credentials',
        new URLSearchParams({ 
          email, 
          password, 
          csrfToken,
          json: true
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      if (res.data?.url?.includes('error')) {
        throw new Error('Invalid email or password');
      }

      // 3. Refresh session state
      const { data: session } = await api.get('/auth/session');
      if (session && session.user) {
        // Fetch full user profile from DB (includes avatar, phoneNumber, bio, etc.)
        try {
          const { data: fullUser } = await api.get('/users/me');
          setUser({ ...session.user, ...fullUser });
          return { ...session.user, ...fullUser };
        } catch {
          setUser({ ...session.user, avatar: session.user.image || session.user.avatar });
          return session.user;
        }
      }
      throw new Error('Failed to get session after login');
    } catch (error) {
      throw error;
    }
  };

  const sendOtp = async (email, phoneNumber) => {
    const res = await api.post('/auth/send-otp', { email, phoneNumber });
    return res.data;
  };

  const register = async ({ firstName, lastName, email, phoneNumber, password, otp }) => {
    try {
      const name = `${firstName} ${lastName}`.trim();
      await api.post('/auth/register', { name, email, password, phoneNumber, otp });
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { data: { csrfToken } } = await api.get('/auth/csrf');
      await api.post('/auth/signout', 
        { csrfToken, json: true }, 
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshUser = async () => {
    try {
      const { data } = await api.get('/users/me');
      setUser(prev => ({ ...prev, ...data }));
      return data;
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, setUser, sendOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
