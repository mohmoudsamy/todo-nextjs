"use client";
import React, { useContext, useState } from "react";
import { TaskContext } from "@/context/TaskContext";
import { insertNewList } from "../api/supabase";
import Message from "@/components/Message";
import Item from "@/components/Item";

const NewList = () => {
  const { listValue, setListValue, setListCreatedVisible } =
    useContext(TaskContext);
  let [itemValue, setItemValue] = useState(null);
  const [id, setId] = useState(1);
  const [items, setItems] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(listValue, ...items);
    try {
      const { error } = await insertNewList(listValue, items);
      if (!error) {
        setListValue("");
        setListCreatedVisible(true);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <div className="container pt-10">
      <Message />
      <div>
        <form
          className="flex flex-col justify-center items-center text-2xl"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <div className="w-4/6">
            <input
              className="w-full bg-tertiary py-3 px-6 rounded-md focus:outline-none"
              type="text"
              placeholder="New List"
              value={listValue}
              onChange={(e) => setListValue(e.target.value)}
            />
          </div>
        </form>
        <div className="m-auto mt-6 w-4/6 flex flex-col items-start text-lg">
          <div className="w-full flex items-start">
            <div className="mr-4">
              <input
                className="w-full bg-tertiary/40 py-1 px-4 rounded-sm focus:outline-none"
                type="text"
                placeholder="What is your plan?"
                value={itemValue}
                onChange={(e) => setItemValue(e.target.value)}
              />
            </div>
            <div>
              <button
                type="button"
                className="bg-primary px-4 py-1 rounded-sm"
                title="Add Item"
                onClick={() => {
                  if (itemValue.length <= 0) {
                    return null;
                  }
                  setId(id + 1);
                  setItems((oldArray) => [
                    ...oldArray,
                    { id: id, content: itemValue },
                  ]);
                  setItemValue("");
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-6 w-4/6 text-font">
            {items?.map((item, i) => {
              return (
                <div
                  className="bg-tertiary/40 w-full rounded-sm py-2 px-4 flex justify-between items-center mb-4"
                  key={i * Math.random() * 5454545}
                >
                  <Item itemNewValue={item.content} index={i + 1} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewList;
