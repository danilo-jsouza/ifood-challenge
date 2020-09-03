import styled from 'styled-components';
import { darken, shade } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  @media (min-width: 700px) {
    max-width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  background: #f5f3f4;
`;

export const HeaderContent = styled.div`
  width: 90%;
  margin: 3.2rem auto;

  h1 {
    color: #000;
    font-family: Helvetica, sans-serif;
    font-size: 5rem;
    margin: 2.5rem 0 auto;
    text-align: center;
  }

  form {
    margin-top: 3.2rem;

    .group {
      display: flex;
      justify-content: space-between;

      div + div {
        margin-left: 20px;
      }
    }

    > label {
      color: #d4c2ff;
    }

    > div {

      & + div {
        margin-top: 1.4rem;
      }

      label {
        font-size: 1.4rem;
        display: block;
        font-weight: bold;
      }
      input {
        width: 100%;
        height: 5.6rem;
        margin-top: 0.8rem;
        border-radius: 0.8rem;
        background: #f8f8fc;
        border: 0;
        outline: 0;
        padding: 0 1.6rem;
        font: 1.6rem Helvetica;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      }

      .DayPicker {
        border: none;
        width: 100px;
        /* background: #e3e3e3; */
        border-radius: 10px;
      }
      .DayPicker-wrapper {
        padding-bottom: 0;
      }
      .DayPicker,
      .DayPicker-Month {
        width: 100%;
      }
      .DayPicker-Month {
        border-collapse: separate;
        border-spacing: 8px;
        margin: 16px;
      }
      .DayPicker-Day {
        width: 40px;
        height: 20px;
      }
      .DayPicker-Day--available:not(.DayPicker-Day--outside) {
        background: #3e3b47;
        border-radius: 10px;
        color: #fff;
      }
    }

    button {
      width: 100%;
      height: 5.6rem;
      background: #ea1d2c;
      color: #fff;
      border: 0;
      border-radius: 0.8rem;
      cursor: pointer;
      font: 700 1.6rem Helvetica;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: background-color 0.2s;
      margin-top: 3.2rem;
      bottom: 16px;
      transition: background 0.2s;

      &:disabled {
        cursor: not-allowed;
        background: ${shade(1.2, '#ea1d2c')};
      }

      &:hover {
        background: ${darken(0.05, '#ea1d2c')};
      }
    }
  }

  @media (min-width: 700px) {
    flex: 1;
    max-width: 740px;
    margin: 0 auto;
    padding-bottom: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    }
  }
`;

export const Table = styled.table`
  margin-top: 3rem;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
  tr:nth-child(even) {
    background-color: #f2f2f2;

    &:hover {
      background-color: ${shade(0.03, '#f2f2f2')};
    }
  }
  th,
  td {
    text-align: center;
    cursor: pointer;
    padding: 8px;
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
  }
`;
