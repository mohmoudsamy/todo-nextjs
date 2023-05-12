import { useRef, useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const Item = ({ itemNewValue, index }) => {
  const itemRef = useRef(null);
  const [editValue, setEditValue] = useState("");
  const [editStatus, setEditStatus] = useState(true);
  const deleteItem = (e) => {
    if (itemRef?.current?.parentElement.contains(e.target)) {
      itemRef?.current?.parentElement.remove();
    }
  };

  return (
    <>
      <p className="mr-8 w-full flex items-center" ref={itemRef}>
        <span className="mr-2">{index}. </span>
        <input
          disabled={editStatus}
          value={editValue || itemNewValue}
          onChange={(e) => setEditValue(e.target.value)}
          className={`${
            editStatus ? "bg-tertiary/5" : "bg-tertiary"
          } rounded-sm py-2 w-full h-fit px-4 text-heading focus:outline-none`}
        />
      </p>
      <div className="flex justify-between items-center w-[50px]">
        <p
          className="cursor-pointer text-[#e1ed3c] hover:text-heading"
          onClick={() => setEditStatus(!editStatus)}
        >
          <FaEdit />
        </p>
        <p
          className="cursor-pointer text-[#f14832] hover:text-heading ml-4 relative"
          onClick={(e) => deleteItem(e)}
        >
          <FaRegTrashAlt />
          <span className="absolute w-full h-full cursor-pointer top-0 left-0"></span>
        </p>
      </div>
    </>
  );
};

export default Item;
