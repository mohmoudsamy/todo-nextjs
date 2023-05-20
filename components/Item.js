"use client";
import { useRef } from "react";

const Item = ({ itemValue, index, item }) => {
  const itemRef = useRef(null);

  return (
    <>
      <div
        className="mr-8 w-full flex justify-between bg-secondary p-3 items-center"
        ref={itemRef}
      >
        <div className={`flex ${item?.status ? "line-through" : ""}`}>
          <h2>
            {index}. {itemValue}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Item;
