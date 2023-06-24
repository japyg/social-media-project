import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <nav className="flex bg-blue-300 h-20 justify-between mb-10">
      <div className="flex items-end justify-evenly w-52">
        <Link to={"/"} className="font-bold hover:text-slate-100 mr-5">
          HOME
        </Link>
        {!user ? (
          <Link to={"/login"} className="font-bold hover:text-slate-100 mr-5">
            SIGN IN
          </Link>
        ) : (
          <Link
            to={"/createpost"}
            className="font-bold hover:text-slate-100 mr-5"
          >
            CREATE POST
          </Link>
        )}
      </div>
      <div className="flex items-end place-items-center w-105">
        {user && (
          <div className="flex items-end">
            <p className="">
              Hello, {user.displayName ? user.displayName.split(" ")[0] : ""}!
            </p>
            <img
              className="ml-5"
              src={user?.photoURL || ""}
              width="50"
              height="50"
            />
            <button
              onClick={signUserOut}
              className="font-bold hover:text-slate-100 pl-12 pr-5"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
