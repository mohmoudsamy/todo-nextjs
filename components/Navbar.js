"use client";
import { usePathname } from "next/navigation";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import Button from "./Button";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getCurrentUser, logOutUser } from "@/app/auth/api/supabase";

const dancingScript = Dancing_Script({
  weight: "400",
  subsets: ["latin"],
});

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const pathname = usePathname();
  const path = pathname.split("/").at(2);
  const routes = ["view", "new"];
  const links = ["Home", "My Lists", "New List"];
  useEffect(() => {
    getCurrentUser().then(({ user }) => {
      setUser(user);
    });
  }, []);

  return (
    <nav className="border-b-2 border-font/10 py-3 ">
      <div className="container grid grid-cols-5 justify-between items-center">
        <Link href="/">
          <div className="flex flex-col items-center col-span-1 w-fit cursor-pointer">
            <span className={`ml-2 text-4xl ${dancingScript.className}`}>
              Todo
            </span>
          </div>
        </Link>
        <ul className="flex justify-between items-center col-span-1 text-lg">
          {user !== null ? (
            links.map((link, i) => {
              return (
                <li
                  key={i}
                  className={path !== routes[i - 1] ? "" : "text-font"}
                >
                  <Link href={link !== "Home" ? "/list/" + routes[i - 1] : "/"}>
                    {link}
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="text-font">
              <Link href="/">Home</Link>
            </li>
          )}
        </ul>
        <div className="col-span-3 text-right flex justify-self-end">
          {console.log()}
          {user === null ? (
            <>
              <Link href="/auth/login" className="mr-4">
                <Button btnName="login" customStyle="bg-tertiary w-fit px-6" />
              </Link>
              <Link href="/auth/signup">
                <Button btnName="Signup" customStyle="w-fit px-6" />
              </Link>
            </>
          ) : (
            <Button
              btnName="Logout"
              customStyle="bg-tertiary w-fit px-6"
              onClickHandler={() => {
                logOutUser();
                setUser(null);
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
