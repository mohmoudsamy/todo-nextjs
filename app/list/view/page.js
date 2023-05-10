"use client";
import { useContext, useEffect } from "react";
import { TaskContext } from "@/context/TaskContext";
import { FiCircle } from "react-icons/fi";
import { TbDots } from "react-icons/tb";
import { getAllLists } from "../api/supabase";

const MyLists = () => {
  const { tasks, setTasks } = useContext(TaskContext);

  const retrievedData = async () => {
    try {
      const { data } = await getAllLists();
      setTasks([...data]);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  useEffect(() => {
    retrievedData();
  }, []);

  return (
    <div>
      <ul className="bg-teriary w-4/6 m-auto">
        {tasks.map((task) => {
          return (
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
              <div className="cursor-pointer text-font hover:text-heading">
                <TbDots />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyLists;
