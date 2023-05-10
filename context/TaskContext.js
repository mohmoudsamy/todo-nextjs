"use client";
import { createContext, useState } from "react";

export const TaskContext = createContext();
const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [listValue, setListValue] = useState("");
  const [selected, setSelcted] = useState("Click to select");

  return (
    <TaskContext.Provider
      value={{ listValue, setListValue, tasks, setTasks, selected, setSelcted }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;