import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
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

const Button = styled.button`
  width: 30ch;
  padding: 1rem;
  margin: 0.5rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.PRIMARY};
  }

  i {
    font-size: 1rem;
    margin-right: 0.5rem;
  }
`;

const Login = () => {
  const { googleLogin, facebookLogin, authError, setAuthError } = useContext(
    AuthContext
  );
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

  const responseFacebook = (response) => {
    console.log(response);
    facebookLogin(response.id);
  };

  const onFailure = (response) => {
    setAuthError("Error authenticating", response);
  };

  return (
    <LoginContainer>
      <GoogleLogin
        onSuccess={onSuccessGoogle}
        onFailure={onFailure}
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        cookiePolicy="single_host_origin"
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <i class="fab fa-google"></i> Войти
          </Button>
        )}
      />
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        fields="name"
        callback={responseFacebook}
        size="small"
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <i class="fab fa-facebook"></i> Войти
          </Button>
        )}
      />
    </LoginContainer>
  );
};

export default Login;
