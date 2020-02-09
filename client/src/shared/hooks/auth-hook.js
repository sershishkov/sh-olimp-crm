import { useState, useCallback, useEffect } from 'react';

let logoutTimer;
export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    const tknExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tknExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expirition: tknExpirationDate.toISOString()
      })
    );

    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expirition) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expirition)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainigTIme = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainigTIme);
    } else clearTimeout(logoutTimer);
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, userId };
};
