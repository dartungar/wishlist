import { keyframes } from "styled-components";

const fadein = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 100%;
  }
`;

const fadeout = keyframes`
  from {
    opacity: 100%;
  }

  to {
    opacity: 0;
  }
`;

export { fadein, fadeout };
