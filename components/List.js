"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getCurrentUser } from "@/app/auth/api/supabase";
import Link from "next/link";

const Lists = ({ lists }) => {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    getCurrentUser().then(({ user }) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mt-10">
      {lists?.map((list, i) => {
        return (
          <div
            className="bg-tertiary p-4 rounded-sm"
            key={i * Math.random() * 21215}
          >
            <h2 className="mb-4">
              <Link
                className="text-4xl text-font hover:text-heading"
                href={`/user/${user?.id}/list/${list?.id}`}
              >
                {list.list_name}
              </Link>
            </h2>
            <ul>
              {list?.items?.map((item, i) => {
                return item.id <= 3 ? (
                  <li className="hover:bg-secondary p-2" key={item.id}>
                    <span>{item.id}. </span>
                    <span>{item.content}</span>
                  </li>
                ) : i === 3 ? (
                  <Link
                    className="text-primary text-center border-t-[1px] border-font text-xl hover:text-font block"
                    href={`/user/${user?.id}/list/${list?.id}`}
                  >
                    See more
                  </Link>
                ) : (
                  ""
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Lists;
