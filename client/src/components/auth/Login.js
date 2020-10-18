import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Login = () => {
  const { googleLogin, authError, setAuthError } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (authError) {
      setAlert({ text: authError, type: "danger" });
    }
  }, [authError]);

  const onSuccessGoogle = (response) => {
    console.log(response);
    googleLogin(response.googleId);
  };

  const onFailure = (response) => {
    setAuthError("Error authenticating", response);
  };

  return (
    <LoginContainer>
      <GoogleLogin
        buttonText="Войти"
        onSuccess={onSuccessGoogle}
        onFailure={onFailure}
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        cookiePolicy="single_host_origin"
      />
    </LoginContainer>
  );
};

export default Login;
