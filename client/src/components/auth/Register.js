import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const RegisterContainer = styled.div`
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

const Register = () => {
  const { register, authError, setAuthError } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (authError) {
      setAlert({ text: authError, type: "danger" });
    }
  }, [authError]);

  const onSuccessGoogle = (response) => {
    console.log(response);
    const { name, googleId } = response.profileObj;
    register({ name, google_id: googleId });
  };

  const onFailure = (response) => {
    setAuthError("Error registering", response);
  };

  // TODO: handle errors
  const responseFacebook = (response) => {
    console.log(response);
    const { name, id } = response;
    register({ name, facebook_id: id });
  };

  return (
    <RegisterContainer>
      <GoogleLogin
        onSuccess={onSuccessGoogle}
        onFailure={onFailure}
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        cookiePolicy="single_host_origin"
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <i class="fab fa-google"></i> Зарегистрироваться
          </Button>
        )}
      />
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        fields="name"
        callback={responseFacebook}
        size="small"
        icon="fa-facebook"
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <i class="fab fa-facebook-f"></i> Зарегистрироваться
          </Button>
        )}
      />
    </RegisterContainer>
  );
};

export default Register;
