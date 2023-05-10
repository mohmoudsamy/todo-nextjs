"use client";
import React, { useContext, useRef } from "react";
import { TaskContext } from "@/context/TaskContext";
import Lists from "@/components/lists/Lists";
import { insertNewList } from "../api/supabase";

const NewList = () => {
  const { selected, tasks, setTasks, listValue, setListValue } =
    useContext(TaskContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { error } = await insertNewList(listValue);
      if (!error) {
        console.log("New list inserted");
        setListValue("");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <div className="container pt-10">
      <div>
        <form
          className="flex justify-center items-center text-2xl"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <input
            className="w-4/6 bg-tertiary py-3 px-6 rounded-md focus:outline-none"
            type="text"
            placeholder="New List"
            value={listValue}
            onChange={(e) => setListValue(e.target.value)}
          />
        </form>
      </div>
      <div>
        <Lists />
      </div>
    </div>
  );
};

export default NewList;
