"use client";
import { useRef, useState, useContext, useEffect } from "react";
import { FiCircle } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import { getCurrentUser } from "@/app/auth/api/supabase";
import Item from "./Item";
import Link from "next/link";

const Lists = ({ lists }) => {
  const [clicked, setClicked] = useState("0");
  const listRef = useRef();
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    getCurrentUser().then(({ user }) => {
      setUser(user);
    });
  }, []);

  const handleOnClick = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  return (
    <div ref={listRef}>
      {lists.map((list, i) => {
        return (
          <ul>
            <li
              className="bg-tertiary my-4 py-3 px-6 rounded-lg text-2xl flex justify-between items-center"
              onClick={() => handleOnClick(i)}
            >
              <div className="">
                <p className="flex items-center">
                  <span className="mr-3 cursor-pointer">
                    <FiCircle />
                  </span>
                  <Link href={`/user/${user?.id}/list/${list?.id}`}>
                    {list.list_name}
                  </Link>
                </p>
                <p className="ml-10 text-xs text-font">{list.selected}</p>
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
                  className="relative cursor-pointer bg-secondary text-font rounded-full ml-4 hover:text-heading"
                  onClick={(e) => {}}
                >
                  <span className="absolute top-0 left-0 w-full h-full cursor-pointer"></span>
                  <BiChevronDown />
                </p>
              </div>
            </li>
            {clicked === i &&
              list.items.map((item) => {
                return (
                  <div className="flex">
                    <Item index={item.id} itemNewValue={item.content} />
                  </div>
                );
              })}
          </ul>
        );
      })}
    </div>
  );
};

export default Lists;
