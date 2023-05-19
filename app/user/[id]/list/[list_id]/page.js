"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import {
  getSingleList,
  deleteList,
  markCompletedList,
} from "@/app/user/api/supabase";
import { getCurrentUser } from "@/app/auth/api/supabase";
import { AuthContext } from "@/context/AuthContext";
import { ListContext } from "@/context/ListContext";
import Item from "@/components/Item";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";

const List = () => {
  const pathname = usePathname();
  const router = useRouter();
  const path = pathname.split("/").at(4);
  const { user, setUser } = useContext(AuthContext);
  const { list, setList } = useContext(ListContext);
  const [completedList, setCompletedList] = useState(false);
  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
    getSingleList(path).then(({ data }) => {
      setList(data);
    });
  }, []);

  const handleDeleteList = async () => {
    try {
      const { error } = await deleteList(list?.id);
      if (!error) {
        router.push("/user/" + user?.id);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="container w-5/12 bg-tertiary pb-2 mt-4">
      <ul>
        <li className="my-4 py-3 px-6 rounded-lg text-2xl flex justify-between items-center">
          <div>
            <p className="flex items-center">
              <span
                className={`cursor-pointer hover:text-[#66e153] ml-4 relative ${
                  list?.status ? "text-[#66e153]" : "text-heading"
                }`}
              >
                {list?.status ? <BsCheckCircleFill /> : <BsCheckCircle />}
              </span>
              <span className={`ml-4 ${list?.status ? "line-through" : ""}`}>
                {list?.list_name}
              </span>
            </p>
            <p className="ml-10 text-xs text-font">{list?.selected}</p>
          </div>
        </li>
        <div className="px-20">
          {list?.items?.map((item) => {
            return (
              <div className="flex bg-secondary mb-5 py-2 px-4" key={item.id}>
                <Item index={item.id} itemNewValue={item.content} />
              </div>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default List;
