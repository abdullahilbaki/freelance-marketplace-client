import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { useEffect, useState, useCallback } from "react";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "../contexts/authContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper wrapper to handle action loading state & errors
  const withLoading = useCallback(async (authFunction) => {
    setActionLoading(true);
    try {
      const result = await authFunction();
      setActionLoading(false);
      return result;
    } catch (error) {
      setActionLoading(false);
      throw error; // Let caller handle the error
    }
  }, []);

  const createUser = (email, password) => {
    return withLoading(() =>
      createUserWithEmailAndPassword(auth, email, password)
    );
  };

  const updateUser = (updatedData) => {
    return withLoading(() => updateProfile(auth.currentUser, updatedData));
  };

  const logIn = (email, password) => {
    return withLoading(() => signInWithEmailAndPassword(auth, email, password));
  };

  const resetPassword = (email) => {
    return withLoading(() => sendPasswordResetEmail(auth, email));
  };

  const logOut = () => {
    return withLoading(() => signOut(auth));
  };

  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    return withLoading(() => signInWithPopup(auth, googleProvider));
  };

  const getIdToken = async () => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return null;
  };

  const authData = {
    user,
    setUser,
    initialLoading,
    actionLoading,
    createUser,
    updateUser,
    logIn,
    resetPassword,
    logOut,
    googleLogin,
    getIdToken,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
