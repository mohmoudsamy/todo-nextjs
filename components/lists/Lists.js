"use client";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SelectList = () => {
  const [open, setOpen] = useState(false);
  const { selected, setSelcted } = useContext(TaskContext);

  const onClickHandler = (e) => {
    setSelcted(e.target.textContent);
    setOpen(false);
  };

  return (
    <div className={`w-4/6 m-auto flex items-start mt-10 text-lg`}>
      <p className="mr-4 col-span-2 w-fit mt-3">Select List: </p>
      <div className="min-w-fit w-64 p-3 rounded-md bg-tertiary col-span-2">
        <p
          className="flex justify-between items-center text-xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span>{selected}</span>
          <span className="ml-">
            {!open ? <FaChevronDown /> : <FaChevronUp />}
          </span>
        </p>
        <ul className={`focus:outline-none ${open ? "block" : "hidden"} pt-4`}>
          {[1, 2, 3, 4, 5, 6].map((item, i) => {
            return (
              <li
                className="p-2 cursor-pointer hover:bg-secondary"
                onClick={(e) => onClickHandler(e)}
                key={i}
              >
                List #{item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SelectList;
