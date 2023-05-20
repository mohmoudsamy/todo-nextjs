"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getSingleList,
  deleteList,
  deleteItem,
  updateList,
  markCompletedItem,
  addNewItem,
} from "@/app/user/api/supabase";
import { getCurrentUser } from "@/app/auth/api/supabase";
import { FaRegTrashAlt } from "react-icons/fa";
import EditItem from "@/components/EditItem";

const EditList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const path = pathname.split("/").at(4);
  const [completedItem, setCompletedItem] = useState(false);
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [updateValue, setUpdateValue] = useState("");
  const [item, setItem] = useState({});
  const [newItemValue, setNewItemValue] = useState("");
  const [items, setItems] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
    if (!user) {
      router.push("/");
    }
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
    try {
      const { data, error } = await markCompletedItem(
        list.items,
        list.id,
        item?.id
      );
      setCompletedItem(!completedItem);
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

  // Add New Item

  const handleAddNewItem = (e) => {
    e.preventDefault();
    if (newItemValue.length <= 0) {
      return null;
    }
    setId(id + 1);
    setItem({ id: id, content: newItemValue, status: false });
    // setNewItemValue("");
  };

  const AddItem = async () => {
    try {
      const { data, error } = await addNewItem(list?.items, item, list?.id);
      console.log(data);
      if (error) console.log(error);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    AddItem();
  }, [item]);

  console.log(item);

  return (
    <>
      {!user ? (
        <div className="text-center text-4xl text-[#f52e2e]">
          You are not allowed to show this page
        </div>
      ) : (
        <div>
          <h1 className="text-center text-5xl my-8 text-primary">
            Edit Your List
          </h1>
          <div className="container w-6/12 bg-tertiary pb-2 mt-4">
            <div className="mb-8 pt-4 px-6 pb-8 text-2xl flex justify-between items-center border-b-[1px] border-font">
              <div className="flex justify-between items-center w-full mr-4">
                <label className="text-lg mr-2" htmlFor="list">
                  List
                </label>
                <input
                  id="list"
                  className="w-full text-font focus:text-heading bg-secondary py-1 px-3 rounded-sm focus:outline-none"
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
            {/*  */}
            <form className="my-4 flex items-center w-full px-6">
              <label className="mr-4" htmlFor="item">
                Item
              </label>
              <input
                id="item"
                className="w-5/6 bg-secondary/60 py-1 px-4 rounded-sm focus:outline-none"
                type="text"
                value={newItemValue}
                onChange={(e) => setNewItemValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary px-4 py-1 rounded-sm"
                title="Add Item"
                onClick={(e) => handleAddNewItem(e)}
              >
                +
              </button>
            </form>
            {/*  */}
            <div className="px-20 mt-10">
              {list?.items?.length > 0 ? (
                list?.items?.map((item) => {
                  return (
                    <div
                      className="mb-5 flex justify-between items-center"
                      key={item.id}
                    >
                      <EditItem
                        itemValue={item.content}
                        index={item.id}
                        user={user}
                        list={list}
                        item={item}
                        setItem={setItem}
                        handleMarkCompleteItem={handleMarkCompleteItem}
                        handleDeleteItem={handleDeleteItem}
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
      )}
    </>
  );
};

export default EditList;
