
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  password: string;
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
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // Defer the user profile fetch to avoid deadlock
        setTimeout(() => {
          fetchUserProfile(session.user.id);
        }, 0);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        toast({
          title: "Errore",
          description: "Impossibile caricare il profilo utente",
          variant: "destructive"
        });
      } else if (data) {
        const userProfile = {
          id: data.id,
          nome: data.nome,
          cognome: data.cognome,
          email: data.email,
          telefono: data.telefono,
          role: data.role,
          avatar_url: data.avatar_url,
          created_at: data.created_at,
          numero_documento: data.documento,
          data_nascita: data.dob
        };
        setUser(userProfile);
        
        // Auto-redirect after successful login/register
        if (window.location.pathname === '/login' || window.location.pathname === '/register') {
          navigate(userProfile.role === 'player' ? '/home/player' : '/home/organizer');
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Email o password non corretti');
        }
        throw error;
      }

      if (data.user) {
        await fetchUserProfile(data.user.id);
        toast({
          title: "Accesso effettuato",
          description: "Benvenuto su FutsApp!",
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setLoading(false);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      // First, create the user in Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            nome: userData.nome,
            cognome: userData.cognome,
            documento: userData.numero_documento,
            dob: userData.data_nascita,
            telefono: userData.telefono,
            role: userData.role
          }
        }
      });

      if (authError) {
        if (authError.message.includes('User already registered')) {
          throw new Error('Questo indirizzo email è già registrato');
        }
        throw authError;
      }

      if (authData.user) {
        // The trigger will automatically create the user profile
        await fetchUserProfile(authData.user.id);
        toast({
          title: "Registrazione completata",
          description: "Benvenuto su FutsApp! Il tuo account è stato creato con successo.",
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
    toast({
      title: "Logout effettuato",
      description: "Arrivederci!",
    });
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
