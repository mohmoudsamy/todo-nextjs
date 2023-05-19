"use client";
import { useEffect, useState } from "react";
import { getUserLists } from "../api/supabase";
import { getCurrentUser } from "@/app/auth/api/supabase";
import Link from "next/link";
import List from "@/components/List";

const MyLists = () => {
  const [userLists, setUserLists] = useState();

  const fetchUserLists = async () => {
    try {
      const { user } = await getCurrentUser();
      const { data } = await getUserLists(user?.id);
      setUserLists(data);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchUserLists();
  }, []);

  return (
    <div>
      <div className="bg-teriary w-4/6 m-auto">
        {userLists?.length <= 0 ? (
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
          <List lists={userLists} />
        )}
      </div>
    </div>
  );
};

export default MyLists;
