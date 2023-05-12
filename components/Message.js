import React, { useContext, useEffect } from "react";
import { TaskContext } from "@/context/TaskContext";
const Message = () => {
  const { listCreatedVisible, setListCreatedVisible } = useContext(TaskContext);
  useEffect(() => {
    if (listCreatedVisible) {
      setTimeout(() => {
        setListCreatedVisible(false);
      }, 3000);
    }
  }, [listCreatedVisible]);
  return (
    <div
      className={`text-[#52e850] text-xl text-center mb-8 ${
        listCreatedVisible ? "" : "invisible"
      }`}
    >
      New List Added
    </div>
  );
};

export default Message;
