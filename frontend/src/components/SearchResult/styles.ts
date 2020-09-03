import styled from 'styled-components';
import { shade, darken } from 'polished';

export const Container = styled.div`
  margin: 2rem 3rem;
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
    tr:nth-child(even) {
      background-color: ${shade(0.03, '#f2f2f2')};

      &:hover {
        background-color: ${shade(0.01, '#f2f2f2')};
      }
    }
    th,
    td {
      text-align: center;
      cursor: pointer;
      padding: 8px;
      tr:nth-child(even) {
        background-color: ${shade(0.03, '#f2f2f2')};
      }
    }
  }
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  overflow: auto;
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
    button {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      border: 0;
      background: none;

      &:hover,
      &:focus {
        color: ${darken(0.1, '#aaaaaa')};
        text-decoration: none;
        cursor: pointer;
      }
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
    overflow: auto;
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    th,
    td {
      text-align: center;
      padding: 8px;
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    }
  }
`;

export const ClientInfo = styled.div`
  display: flex;
`;

export const NoContent = styled.h1`
  text-align: center;
  margin-top: 15rem;
`;
