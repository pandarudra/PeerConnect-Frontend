import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setLoading(false);
  }, []);

  return { isAuth, loading };
};
