import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  addUserToUserList,
  getUserFromStorage,
  getUserListFromStorage,
  removeUserFromStorage,
  setUserInStorage,
} from '../utils/Storage';

export type User = {
  email: string;
  name: string;
};

type LoginData = {
  email: string;
  password: string;
};

export type SignUpData = User & {
  password: string;
};

type ReturnData = {
  status: boolean;
  error: string | null;
};

type AuthContextType = {
  user: User | null;
  login: (user: LoginData) => Promise<ReturnData>;
  signup: (user: SignUpData) => Promise<ReturnData>;
  logout: () => void;
  isLogin: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [userList, setUserList] = useState<SignUpData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedUser = await getUserFromStorage();
      if (storedUser) {
        console.log('Loaded user from storage:', storedUser);
        setUser(storedUser);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    const loadUserListFromStorage = async () => {
      const storedUser = await getUserListFromStorage();
      if (storedUser) {
        console.log('Loaded user list from storage:', storedUser);
        setUserList(storedUser);
      }
    };

    loadUserListFromStorage();
    loadUserFromStorage();
  }, []);

  const login = async ({ email, password }: LoginData): Promise<ReturnData> => {
    const user = userList.find(
      u => u.email === email && u.password === password,
    );

    if (user === undefined) {
      return { status: false, error: 'Invalid email or password' };
    } else {
      setUser(user);
      await setUserInStorage(user);
      return { status: true, error: null };
    }
  };

  const logout = async () => {
    setUser(null);
    await removeUserFromStorage();
  };

  const signup = async (user: SignUpData): Promise<ReturnData> => {
    const existingUser = userList.find(u => u.email === user.email);
    if (existingUser) {
      return { status: false, error: 'User already exists' };
    } else {
      setUserList([...userList, user]);
      setUser(user);
      await addUserToUserList(user);
      await setUserInStorage(user);
      return { status: true, error: null };
    }
  };

  const isLogin = !!user;

  const value = useMemo(
    () => ({ user, login, logout, signup, isLogin, loading }),
    [user, isLogin, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
