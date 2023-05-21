import { getAllLists } from "./user/api/supabase";
import Link from "next/link";
import List from "@/components/List";
import Loading from "@/components/Loading";

export default async function Home() {
  const { data } = await getAllLists();
  console.log(data);
  // const [allLists, setAllLists] = useState([]);
  // const fetchAllLists = async () => {
  //   try {
  //     const { data } = await getAllLists();
  //     setAllLists(data);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchAllLists();
  // }, []);

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

export async function getServerSideProps() {
  try {
    const { data } = await getAllLists();
    return { props: data };
  } catch (error) {
    throw new Error(error);
  }
}
