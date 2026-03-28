import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  onboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on boot
    const savedUser = localStorage.getItem('ml_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = async (name: string, email: string, pass: string) => {
    // Mock signup - save to users list in localStorage
    const users = JSON.parse(localStorage.getItem('ml_users') || '[]');
    if (users.find((u: any) => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser = { id: Date.now().toString(), name, email, pass, onboarded: false };
    users.push(newUser);
    localStorage.setItem('ml_users', JSON.stringify(users));

    // Log the user in immediately
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, onboarded: false };
    setUser(sessionUser);
    localStorage.setItem('ml_current_user', JSON.stringify(sessionUser));
  };

  const login = async (email: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem('ml_users') || '[]');
    const found = users.find((u: any) => (u.email === email || u.phone === email) && u.pass === pass);

    if (!found) {
      throw new Error('Invalid email or password');
    }

    const sessionUser = { id: found.id, name: found.name, email: found.email, onboarded: found.onboarded };
    setUser(sessionUser);
    localStorage.setItem('ml_current_user', JSON.stringify(sessionUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ml_current_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    // Update session
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('ml_current_user', JSON.stringify(updatedUser));

    // Update persistent list
    const users = JSON.parse(localStorage.getItem('ml_users') || '[]');
    const index = users.findIndex((u: any) => u.id === user.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      localStorage.setItem('ml_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
