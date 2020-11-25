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

const slideDown = keyframes`
  from {
    height: 0;
  }

  to { 
    height: 100%
    }
`;

const slideUp = keyframes`
from {
  height: 100%;
}

to { 
  height: 0
  }
`;

const rotateClockwise = keyframes`
from {
  transform: rotate(0deg)
}

to { 
  transform: rotate(90deg)
  }
`;

const rotateCounterClockwise = keyframes`
from {
  transform: rotate(0deg)
}

to { 
  transform: rotate(-90deg)
  }
`;

export {
  fadein,
  fadeout,
  slideDown,
  slideUp,
  rotateClockwise,
  rotateCounterClockwise,
};
