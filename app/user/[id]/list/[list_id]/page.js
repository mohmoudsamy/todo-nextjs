"use client";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useContext, useEffect } from "react";
import {
  getSingleList,
  deleteList,
  markCompletedList,
} from "@/app/user/api/supabase";
import { AuthContext } from "@/context/AuthContext";
import { ListContext } from "@/context/ListContext";
import Item from "@/components/Item";
import { FiCircle } from "react-icons/fi";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";

const List = () => {
  const pathname = usePathname();
  const router = useRouter();
  const path = pathname.split("/").at(4);
  const { user } = useContext(AuthContext);
  const { list, setList } = useContext(ListContext);
  const [completedList, setCompletedList] = useState(list.status);

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

  const handleCompletedList = async () => {
    try {
      const { error } = await markCompletedList(!list.status, list.id);
      console.log(error);
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
              <span
                className={`cursor-pointer hover:text-[#66e153] ml-4 relative ${
                  completedList || list.status
                    ? "text-[#66e153]"
                    : "text-heading"
                }`}
              >
                {completedList || list.status ? (
                  <BsCheckCircleFill />
                ) : (
                  <BsCheckCircle />
                )}
                <span
                  className="absolute w-full h-full cursor-pointer top-0 left-0"
                  onClick={handleCompletedList}
                ></span>
              </span>
              <span className="ml-4">{list?.list_name}</span>
            </p>
            <p className="ml-10 text-xs text-font">{list?.selected}</p>
          </div>
          <div className="flex justify-between items-center relative">
            <p className="flex justify-between items-center text-lg">
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
                <Item
                  index={item.id}
                  itemNewValue={item.content}
                  status={item.status}
                />
              </div>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default List;
