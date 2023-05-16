"use client";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useContext, useEffect } from "react";
import { getSingleList, deleteList } from "@/app/user/api/supabase";
import { AuthContext } from "@/context/AuthContext";
import Item from "@/components/Item";
import { FiCircle } from "react-icons/fi";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const List = () => {
  const [list, setList] = useState({});
  const pathname = usePathname();
  const router = useRouter();
  const path = pathname.split("/").at(4);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getSingleList(path).then(({ data }) => {
      setList(data);
    });
  }, []);

  const handleDeleteList = async () => {
    try {
      const { error } = await deleteList(list.id);
      if (!error) {
        router.push("/user/" + user.id);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="container w-5/12 bg-tertiary pb-2 mt-4">
      <ul>
        <li className="my-4 py-3 px-6 rounded-lg text-2xl flex justify-between items-center">
          <div className="">
            <p className="flex items-center">
              <span className="mr-3 cursor-pointer">
                <FiCircle />
              </span>
              <span>{list?.list_name}</span>
            </p>
            <p className="ml-10 text-xs text-font">{list?.selected}</p>
          </div>
          <div className="flex justify-between items-center relative">
            <p className="flex justify-between items-center text-lg">
              <span className="cursor-pointer text-[#e1ed3c] hover:text-heading">
                <FaEdit />
              </span>
              <span
                className="cursor-pointer text-[#f14832] hover:text-heading ml-4"
                onClick={handleDeleteList}
              >
                <FaRegTrashAlt />
              </span>
            </p>
          </div>
        </li>
        <div className="px-20">
          {list?.items?.map((item) => {
            return (
              <div className="flex bg-secondary mb-5 py-2 px-4">
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
