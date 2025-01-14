import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerWheel = styled.div<{
  initLoading: boolean;
  isLoading: boolean;
}>`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.2);
  border-top: 4px solid #000;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;

  ${({ initLoading }) =>
    initLoading &&
    `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
`;
