
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  role: 'player' | 'organizer';
  avatar_url?: string;
  created_at: string;
  numero_documento: string;
  data_nascita: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  nome: string;
  cognome: string;
  numero_documento: string;
  data_nascita: string;
  email: string;
  telefono: string;
  role: 'player' | 'organizer';
  avatar?: File;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('futsapp_token');
    if (token) {
      // In a real app, verify token with backend
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Mock API call - replace with actual Supabase call
      const mockUser: User = {
        id: '1',
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mario.rossi@example.com',
        telefono: '+39 123 456 7890',
        role: 'player',
        created_at: new Date().toISOString(),
        numero_documento: 'RSSMRA85A01H501X',
        data_nascita: '1985-01-01'
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual Supabase auth
      console.log('Login attempt:', { email, password });
      
      // Simulate API response
      const mockResponse = {
        token: 'mock_jwt_token',
        user: {
          id: '1',
          nome: 'Mario',
          cognome: 'Rossi',
          email,
          telefone: '+39 123 456 7890',
          role: email.includes('organizer') ? 'organizer' : 'player',
          created_at: new Date().toISOString(),
          numero_documento: 'RSSMRA85A01H501X',
          data_nascita: '1985-01-01'
        } as User
      };

      localStorage.setItem('futsapp_token', mockResponse.token);
      setUser(mockResponse.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual Supabase registration
      console.log('Register attempt:', userData);
      
      const mockUser: User = {
        id: Date.now().toString(),
        ...userData,
        created_at: new Date().toISOString()
      };

      localStorage.setItem('futsapp_token', 'mock_jwt_token');
      setUser(mockUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('futsapp_token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
