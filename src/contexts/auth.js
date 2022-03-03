import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { getUser, signIn as sendSignInRequest } from '../api/auth';
import Axios from 'axios'
function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem('isloggedin') === "true") {
      setUser('admin')
    } else {
      setUser()
    }
    setLoading(false);
  }, []);
  const signIn = useCallback(async (email, password) => {
    const result = await sendSignInRequest(email, password);
    if (result.isOk) {
      localStorage.setItem('isloggedin', true);
      setUser(result.data);
      localStorage.setItem('token', result.token);
    }
    return result;
  }, []);

  const signOut = useCallback(() => {
    localStorage.setItem('isloggedin', false);
    setUser()
    localStorage.removeItem('token')
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }} {...props} />
  );
}

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }
