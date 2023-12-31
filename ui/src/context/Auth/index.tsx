import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  clearAuthToken,
  firebaseClient,
  setAuthToken,
} from "@src/helpers/auth";
import {
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  User,
} from "@firebase/auth";

type AuthContextType = {
  user?: User;
  loading?: boolean;
  signInWithGoogle?: () => void;
  signOut?: () => void;
};
export const AuthContext = createContext<AuthContextType>({});

type AuthManagerType = {
  children: React.ReactNode | JSX.Element;
};
const AuthManager = ({ children }: AuthManagerType) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { next } = router.query;

  const handleRouteChange = async (url: string) => {
    setLoading(true);
    await router.push(url);
    setLoading(false);
  };

  const handleUser = async (newUser: User | null) => {
    if (newUser) {
      const authToken = await newUser.getIdToken();
      setAuthToken(authToken);
      // TODO: Fetch user from DB to get roles
      setUser(newUser);
      setLoading(false);
      return true;
    }
    setUser(undefined);
    clearAuthToken();
    setLoading(false);
    return false;
  };

  useEffect(() => {
    if (next && user) {
      handleRouteChange(Array.isArray(next) ? next[0] : next).then();
      return;
    }
  }, [user]);

  useEffect(() => {
    const auth = getAuth(firebaseClient);
    const unsubscribe = onIdTokenChanged(auth, (user) => handleUser(user));
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => handleUser(result.user))
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    setLoading(true);
    await handleUser(null);
    await handleRouteChange("/signin?next=/");
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthManager;
