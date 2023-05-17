"use client";
import { useContext, useEffect } from "react";
import { getAllLists } from "./user/api/supabase";
import { getCurrentUser } from "./auth/api/supabase";
import { ListContext } from "@/context/ListContext";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import List from "@/components/List";

export default function Home() {
  const { lists, setLists } = useContext(ListContext);
  const { user } = useContext(AuthContext);
  const userLists = async () => {
    try {
      const { data } = await getAllLists();
      const { user } = await getCurrentUser();
      if (user?.aud === "authenticated") {
        setLists(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    userLists();
  }, []);

  return (
    <div className="bg-teriary w-4/6 m-auto">
      {lists?.length <= 0 ? (
        <div className="text-5xl text-center text-font mt-10">
          <p>No Lists to show</p>
          <Link
            href="/list/new"
            className="text-lg text-primary hover:underline"
          >
            Click to add
          </Link>
        </div>
      ) : (
        <>
          <List lists={lists} />
        </>
      )}
    </div>
  );
}
