import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Home from "../pages/Home";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log("====================================");
  console.log(currentUser);
  console.log("====================================");
  return (
    <Route
      component={(props) =>
        currentUser ? (
          <Home />
        ) : (
          <Navigate
            to={{ pathname: "/singin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
