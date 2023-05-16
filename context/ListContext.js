"use client";
import { createContext, useState, useRef } from "react";

export const ListContext = createContext();
const ListContextProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [listValue, setListValue] = useState("");
  const [listCreatedVisible, setListCreatedVisible] = useState(false);
  const [selected, setSelcted] = useState("Click to select");
  const itemInputRef = useRef(null);

  return (
    <ListContext.Provider
      value={{
        listValue,
        setListValue,
        lists,
        setLists,
        selected,
        setSelcted,
        listCreatedVisible,
        setListCreatedVisible,
        itemInputRef,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
