import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import AlertContext from "../../context/alert/alertContext";
import { fadein, fadeout } from "../../style/animations";

const AlertWrapperContainer = styled.div`
  position: fixed;
  z-index: 100;
  display: inline-block;
  top: 100px;
  line-height: 2rem;
  min-height: 2rem;

  @media (min-width: 880px) {
    min-width: 100ch;
  }

  @media (min-width: 200px) and (max-width: 880px) {
    left: 5%;
    right: 5%;
  }
`;

const AlertContainer = styled.div`
  border-radius: 3px;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  box-shadow: 1px 1px 4px ${(props) => props.theme.BOX_SHADOW};

  animation: 0.2s ${(props) => (props.display ? fadein : fadeout)} linear;
  opacity: 1;
  transition: opacity 0.1s;

  background-color: ${(props) => {
    if (props.alertColor === "success") {
      return props.theme.SUCCESS;
    } else if (props.alertColor === "danger") {
      return props.theme.DANGER;
    } else return props.theme.INFO;
  }};

  color: ${(props) => props.theme.BASIC_BACKGROUND};
  a {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
  }

  a i {
    color: ${(props) => props.theme.BASIC_BACKGROUND};
  }

  a i:hover {
    color: ${(props) => props.theme.DANGER_DARK};
  }
`;

const Alert = () => {
  const { alerts, removeAlert } = useContext(AlertContext);
  const [currentAlert, setCurrentAlert] = useState();

  // show the newest alert
  useEffect(() => {
    const [alert] = alerts.slice(-1);
    setCurrentAlert(alert);
  }, [alerts]);

  // remove the newest alert from alerts stack
  const onCloseAlert = (e) => {
    e.preventDefault();
    removeAlert(currentAlert);
  };

  return currentAlert ? (
    <AlertWrapperContainer>
      <AlertContainer
        alertColor={currentAlert.type}
        display={currentAlert.display}
      >
        {currentAlert.text}
        <a href="" onClick={onCloseAlert} title="Закрыть">
          <i className="fas fa-times"></i>
        </a>
      </AlertContainer>
    </AlertWrapperContainer>
  ) : null;
};

export default Alert;
