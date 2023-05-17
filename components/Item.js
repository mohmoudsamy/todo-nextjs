"use client";
import { useEffect } from "react";
import { ListContext } from "@/context/ListContext";
import { useRef, useState, useContext } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
// import { markCompleted } from "@/app/user/api/supabase";
import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";

const Item = ({ itemNewValue, index, status }) => {
  const itemRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [editStatus, setEditStatus] = useState(true);
  const { list, itemInputRef } = useContext(ListContext);

  // console.log(checked);

  // const handleCompleted = async (e) => {
  //   setChecked(!checked);
  //   const data = await markCompleted(checked, list.id, index);
  // };

  return (
    <>
      <p className="mr-8 w-full flex items-center" ref={itemRef}>
        <span className="mr-2">{index}. </span>
        <span className={status ? "line-through" : ""}>{itemNewValue}</span>
      </p>
      <div className="flex justify-between items-center w-[50px]">
        <p
          className={`cursor-pointer hover:text-[#66e153] ml-4 relative ${
            status ? "text-[#66e153]" : "text-heading"
          }`}
          // onClick={(e) => handleCompleted(e)}
        >
          {status ? <BsCheckCircleFill /> : <BsCheckCircle />}
          <span className="absolute w-full h-full cursor-pointer top-0 left-0"></span>
        </p>
      </div>
    </>
  );
};

export default Item;
