import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // register user
  const register = async (email, password) => {
    const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_CLIENT}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const token = await tokenRes.json();

    if (tokenRes.ok) {
      setUser(token.data);
      router.push("/");
      toast.success("Der Account wurde erstellt");
    } else {
      setError(token.error);
      setError(null);
    }
  };

  // login user
  const login = async (email, password) => {
    const tokenRes = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const token = await tokenRes.json();
    console.log(token);

    if (tokenRes.ok) {
      setUser(token.data);
      router.push("/");
    } else {
      setError(token.error);
      setError(null);
    }
  };

  // logout user
  const logout = async () => {
    // const [state, dispatch] = useReducer(rootReducer, initialState);
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT}/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  // check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT}/user`);
    const data = await res.json();

    if (res.status === 200) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, register, checkUserLoggedIn, user, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
