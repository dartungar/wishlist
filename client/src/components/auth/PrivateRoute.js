import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

// redirect to /login if user is not authorized
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthorized, isLoadingAuth } = useContext(AuthContext);
  return (
    !isLoadingAuth && (
      <Route
        {...rest}
        render={(props) =>
          isAuthorized ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    )
  );
};

export default PrivateRoute;
