import { useReducer, createContext, useEffect } from "react";
import { useRouter } from "next/router";

// initial State
const initialState = {
  user: null,
};

// Register user
const register = async (user) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const res = await fetch(`${NEXT_PUBLIC_CLIENT_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();

  if (res.ok) {
    dispatch({ type: "LOGIN", payload: data.user });
  } else {
  }
};

// Login user
const login = async ({ email, password }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const tokenRes = await fetch(`${NEXT_PUBLIC_CLIENT_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const token = await tokenRes.json();

  if (tokenRes.ok) {
    setUser(token.user);
    router.push("/app");
  } else {
  }
};

// Logout user
const logout = async () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const res = await fetch(`${NEXT_PUBLIC_CLIENT_URL}/logout`, {
    method: "POST",
  });

  if (res.ok) {
    setUser(null);
    router.push("/");
  }
};

// Check if user is logged in
const checkUserLoggedIn = async (dispatch, router) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/me`);
  const data = await res.json();
  if (res.ok) {
    dispatch({ type: "LOGIN", payload: data.user });
  } else {
    dispatch({ type: "LOGOUT" });
    if (router.pathname.includes("/app")) {
      // router.push("/account/login");
    }
  }
};

// create context

const Context = createContext();

// root reducer

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.payload };
    }

    case "LOGOUT": {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const router = useRouter();

  useEffect(async () => {
    checkUserLoggedIn(dispatch, router);
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
