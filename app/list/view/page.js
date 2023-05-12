"use client";
import { useContext, useEffect, useState } from "react";
import { getAllLists } from "../api/supabase";
import { TaskContext } from "@/context/TaskContext";
import Link from "next/link";
import { FiCircle } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const MyLists = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [visibleItems, setVisibleItems] = useState(true);

  const userLists = async () => {
    try {
      const { data } = await getAllLists();
      setTasks([...data]);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    userLists();
  }, []);

  return (
    <div>
      <ul className="bg-teriary w-4/6 m-auto">
        {tasks.length <= 0 ? (
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
          tasks?.map((task, i) => {
            return (
              <>
                <li className="bg-tertiary my-4 py-3 px-6 rounded-lg text-2xl flex justify-between items-center">
                  <div className="">
                    <p className="flex items-center">
                      <span className="mr-3 cursor-pointer">
                        <FiCircle />
                      </span>
                      <span>{task.list_name}</span>
                    </p>
                    <p className="ml-10 text-xs text-font">{task.selected}</p>
                  </div>
                  <div className="flex justify-between items-center relative">
                    <p className="flex justify-between items-center text-lg">
                      <span className="cursor-pointer text-[#e1ed3c] hover:text-heading">
                        <FaEdit />
                      </span>
                      <span className="cursor-pointer text-[#f14832] hover:text-heading ml-4">
                        <FaRegTrashAlt />
                      </span>
                    </p>
                    <p
                      className="cursor-pointer bg-secondary text-font rounded-full ml-4 hover:text-heading"
                      onClick={() => setVisibleItems(!visibleItems)}
                    >
                      <BiChevronDown />
                    </p>
                  </div>
                </li>
                <ul
                  className={`bg-tertiary px-4 overflow-hidden py-4 ${
                    visibleItems ? "block" : "hidden"
                  }`}
                >
                  {task.items.map((item, i) => {
                    return (
                      <li className="flex border-b-2 border-secondary py-2">
                        <p className="w-full flex items-center">
                          <span className="mr-1">{item.id}. </span>
                          <input
                            // disabled={editStatus}
                            value={item.content}
                            // onChange={(e) => setEditValue(e.target.value)}
                            className={`${
                              true ? "bg-tertiary/5" : "bg-tertiary"
                            } rounded-sm py-2 w-full h-fit px-4 text-heading focus:outline-none`}
                          />
                        </p>
                        <div className="flex justify-between items-center w-[50px]">
                          <p
                            className="cursor-pointer text-[#e1ed3c] hover:text-heading"
                            // onClick={() => setEditStatus(!editStatus)}
                          >
                            <FaEdit />
                          </p>
                          <p
                            className="cursor-pointer text-[#f14832] hover:text-heading ml-4 relative"
                            // onClick={(e) => deleteItem(e)}
                          >
                            <FaRegTrashAlt />
                            <span className="absolute w-full h-full cursor-pointer top-0 left-0"></span>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default MyLists;
