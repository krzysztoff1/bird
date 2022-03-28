import { useEffect, useState, createContext, useReducer } from "react";
import SetProfilePicture from "../components/forms/profile/SetProfilePicture";

export const DataContext = createContext();

// try to preserve data between sections
export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState();

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
