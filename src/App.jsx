// src/App.js
import "./App.css";
import supabase from "./config/supabase.js";
import Navbar from "./components/Navbar";
import CreateForm from "./components/CreateForm";
import MyForms from "./components/MyForms";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getUser().then((val) => setUser(val.data?.user));
  }, []);
  const router = createBrowserRouter([
    {
      path: "",
      element: !user ? (
        <>
          <Navbar setUser={setUser} />
          <h1>
            {" "}
            You're not signed in. PLease <Link to="signin">Signin</Link>
          </h1>
        </>
      ) : (
        <>
          <Navbar setUser={setUser} />
          <h1>This is an app where users can create custom feedback forms</h1>
        </>
      ),
    },
    {
      path: "create-form",
      element: (
        <>
          <Navbar setUser={setUser} />
          <CreateForm user={user} />
        </>
      ),
    },
    {
      path: "myforms",
      element: (
        <>
          <Navbar setUser={setUser} />
          <MyForms user={user} />
        </>
      ),
    },
    {
      path: "signin",
      element: <SignIn setUser={setUser} />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
