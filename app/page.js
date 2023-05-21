import { getAllLists } from "./user/api/supabase";
import Link from "next/link";
import List from "@/components/List";
import Loading from "@/components/Loading";

export default async function Home() {
  const { data } = await getAllLists();

  return (
    <div className="bg-teriary w-4/6 m-auto">
      {data ? (
        data?.length <= 0 ? (
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
          <List lists={data} />
        )
      ) : (
        <Loading />
      )}
      asdsad
    </div>
  );
}
