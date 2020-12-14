import React, { useContext } from "react";
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
  const { login } = useContext(AuthContext);
  const { pushAlert } = useContext(AlertContext);

  // if user logged in with google, log them into the app
  const onSuccessGoogle = (response) => {
    login({ google_id: response.googleId });
  };

  // if logging in with google failed, show error message
  const onFailure = (response) => {
    if (response.error !== "popup_closed_by_user") {
      pushAlert({
        type: "danger",
        text:
          "Ошибка авторизации через Google. Проверьте логин, пароль и попробуйте снова",
      });
    }

    console.log(response);
  };

  // if user logged in with facebook, log them into the app
  // if facebook didnt respond with user ID, log in was unsuccessful
  // => show error message
  const responseFacebook = (response) => {
    const { name, id } = response;
    if (response.id) {
      login({ name, facebook_id: id });
    } else if (response.status === "unknown") {
    } else {
      pushAlert({
        type: "danger",
        text:
          "Ошибка авторизации через Facebook. Проверьте логин, пароль и попробуйте снова",
      });
    }
  };

  return (
    <LoginContainer>
      <GoogleLogin
        onSuccess={onSuccessGoogle}
        onFailure={onFailure}
        clientId={
          process.env.NODE_ENV === "production"
            ? "917180155454-0a7fpfkdrir4naoav2vf35eftopihain.apps.googleusercontent.com"
            : "917180155454-0pnj9a30f6v15qkukbgumqcv4phbskhd.apps.googleusercontent.com"
        }
        cookiePolicy="single_host_origin"
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <i className="fab fa-google"></i> Войти
          </Button>
        )}
      />
      <FacebookLogin
        appId={
          process.env.NODE_ENV === "production"
            ? "1038415999953068"
            : "1036054240194241"
        }
        isMobile={false}
        fields="name"
        callback={responseFacebook}
        size="small"
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <i className="fab fa-facebook"></i> Войти
          </Button>
        )}
      />
    </LoginContainer>
  );
};

export default Login;
