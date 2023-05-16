"use client";
import { ListContext } from "@/context/ListContext";
import { useRef, useState, useContext } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";

const Item = ({ itemNewValue, index }) => {
  const itemRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [editStatus, setEditStatus] = useState(true);
  const { itemInputRef } = useContext(ListContext);

  const handleCompleted = (e) => {
    e.target.parentElement.classList.toggle("text-[#66e153]");
    setChecked(!checked);
  };

  return (
    <>
      <p className="mr-8 w-full flex items-center" ref={itemRef}>
        <span className="mr-2">{index}. </span>
        {/* <input
          disabled={editStatus}
          value={editValue || itemNewValue}
          onChange={(e) => setEditValue(e.target.value)}
          ref={itemInputRef}
          className={`${
            editStatus ? "bg-tertiary/5" : "bg-tertiary"
          } rounded-sm py-2 w-full h-fit px-4 text-heading focus:outline-none`}
        /> */}
        <span>{itemNewValue}</span>
      </p>
      <div className="flex justify-between items-center w-[50px]">
        {/* <p
          className="cursor-pointer text-[#e1ed3c] hover:text-heading"
          onClick={() => setEditStatus(!editStatus)}
        >
          <FaEdit />
        </p> */}
        <p
          className="cursor-pointer hover:text-[#66e153] text-heading ml-4 relative"
          onClick={(e) => handleCompleted(e)}
        >
          {checked ? <BsCheckCircleFill /> : <BsCheckCircle />}
          <span className="absolute w-full h-full cursor-pointer top-0 left-0"></span>
        </p>
      </div>
    </>
  );
};

export default Item;
