import { createContext, useReducer } from "react";

export const UploadPostContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "idle":
      return { status: "idle", error: undefined };
    case "uploading":
      return { status: "uploading", error: undefined };
    case "fetching_link":
      return { status: "fetching_link", error: undefined };
    case "success":
      return { status: "success", error: undefined };
    default:
      throw new Error("invalid action");
  }
};

export const UploadPostProvider = ({ children }) => {
  const initialState = {
    status: "idle",
    error: undefined,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UploadPostContext.Provider value={{ state, dispatch }}>
      {children}
    </UploadPostContext.Provider>
  );
};
