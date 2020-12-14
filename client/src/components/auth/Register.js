import React, { useContext } from "react";
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
  const { register } = useContext(AuthContext);
  const { pushAlert } = useContext(AlertContext);

  // if user logs in wigh google, register new user
  // falls back to login() if user is already registered
  const onSuccessGoogle = (response) => {
    const { name, googleId } = response.profileObj;
    register({ name, google_id: googleId });
  };

  // show alert if logging in with google didn't go well
  const onFailure = () => {
    pushAlert({
      type: "danger",
      text:
        "Ошибка регистрации через Google. Проверьте логин, пароль и попробуйте снова",
    });
  };

  // if user logs in wigh facebook, register new user
  // uses login() if user is already registered
  // show error message if facebook didn't respond right
  const responseFacebook = (response) => {
    const { name, id } = response;
    if (response.id) {
      register({ name, facebook_id: id });
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
    <RegisterContainer>
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
            <i class="fab fa-google"></i> Зарегистрироваться
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
