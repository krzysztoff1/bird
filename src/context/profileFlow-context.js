import { useEffect, useState, createContext, useReducer } from "react";
import SetProfilePicture from "../components/forms/profile/SetProfilePicture";

export const ProfileFlowContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 0:
      return { status: 0, data: action.payload, error: undefined };
    case 1:
      return { status: 1, data: action.payload, error: undefined };
    case 2:
      return { status: 2, data: action.payload, error: undefined };
    case 3:
      return { status: 3, data: action.payload, error: undefined };
    case 4:
      return { status: 4, data: action.payload, error: undefined };
    default:
      throw new Error("invalid action");
  }
};

export const ProfileFlowProvider = ({ children }) => {
  const initialState = {
    status: 0,
    data: { ready: false, progress: 0 },
    error: undefined,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const prev = () => {
    dispatch({
      type: state.status - 1,
      payload: { ready: true, progress: state.data.progress - 25 },
    });
  };

  const next = () => {
    dispatch({
      type: state.status + 1,
      payload: { ready: true, progress: state.data.progress + 25 },
    });
  };

  return (
    <ProfileFlowContext.Provider value={{ state, dispatch, prev, next }}>
      {children}
    </ProfileFlowContext.Provider>
  );
};
