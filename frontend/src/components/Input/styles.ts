import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isField: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      color: red;
      input {
        border: 1px solid #c53030;
      }
    `}

  ${props =>
    props.isFocused &&
    css`
      &:focus-within::after {
        width: cal(100% - 3.2rem);
        height: 2px;
        content: '';
        background: #ea1d2c;
        position: absolute;
        left: 1.6rem;
        right: 1.6rem;
        bottom: 0;
      }
    `}

  input {
    width: 100%;
    height: 5.6rem;
    margin-top: 0.8rem;
    border-radius: 0.8rem;
    background: #f8f8fc;
    /* border: 0; */
    outline: 0;
    padding: 0 1.6rem;
    font: 1.6rem Helvetica;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
`;

export const Error = styled.div`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #000;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
