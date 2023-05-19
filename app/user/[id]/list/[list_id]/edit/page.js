"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getSingleList,
  deleteList,
  deleteItem,
  updateList,
  markCompletedItem,
} from "@/app/user/api/supabase";
import { getCurrentUser } from "@/app/auth/api/supabase";
import { FaRegTrashAlt } from "react-icons/fa";
import Item from "@/components/Item";

const EditList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const path = pathname.split("/").at(4);
  const [completedItem, setCompletedItem] = useState(false);
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [updateValue, setUpdateValue] = useState("");
  const [item, setItem] = useState(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
    getSingleList(path).then(({ data }) => {
      setList(data);
      setUpdateValue(data?.list_name);
    });
  }, []);

  // Invoke Delete List
  const handleDeleteList = async () => {
    try {
      const { error } = await deleteList(list?.id);
      if (!error) {
        router.push("/");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Invoke Update List
  const handleUpdateList = async () => {
    try {
      const { data, error } = await updateList(list?.id, updateValue);
      if (error) console.log(error);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    handleUpdateList();
  }, [updateValue]);
  // Invoke Update Item
  const handleMarkCompleteItem = async (item) => {
    console.log(item);
    try {
      const { data, error } = await markCompletedItem(
        list.items,
        list.id,
        item?.id
      );
      setCompletedItem(!completedItem);
      console.log(data);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  // invoke Delete Item
  const handleDeleteItem = async () => {
    try {
      const { data, error } = await deleteItem(list?.id, list?.items, item?.id);
      if (error) console.log(error);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    handleDeleteItem();
  }, [item]);

  return (
    <div>
      <h1 className="text-center text-5xl my-8 text-primary">Edit Your List</h1>
      <div className="container w-5/12 bg-tertiary pb-2 mt-4">
        <div className="mb-8 py-3 px-6 rounded-lg text-2xl flex justify-between items-center">
          <div className="w-11/12 mr-4">
            <input
              className="w-full text-font focus:text-heading  bg-secondary py-1 px-3 rounded-sm focus:outline-none"
              type="text"
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
            />
          </div>
          <div className="w-1/12 flex justify-between items-center text-lg">
            <span
              className="cursor-pointer text-[#f14832] hover:text-heading ml-4"
              onClick={handleDeleteList}
            >
              <FaRegTrashAlt />
            </span>
          </div>
        </div>
        <div className="px-20">
          {list?.items?.length > 0 ? (
            list?.items?.map((item) => {
              return (
                <div
                  className="mb-5 flex justify-between items-center"
                  key={item.id}
                >
                  <Item
                    itemValue={item.content}
                    index={item.id}
                    user={user}
                    list={list}
                    item={item}
                    setItem={setItem}
                    handleMarkCompleteItem={handleMarkCompleteItem}
                    handleDeleteItem={handleDeleteItem}
                    completedItem={completedItem}
                  />
                </div>
              );
            })
          ) : (
            <div className="text-center text-xl text-font">No Items</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditList;
