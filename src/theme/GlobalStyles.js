import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};
    transition: all 0.50s linear;
  }

  .small-button {
    margin-top: 3px;
    margin-left: 2px;
    margin-right: 2px;
    border: solid;
    border-color: ${({ theme }) => theme.colors.button.border};
    border-radius: 4px;
    border-width: 2px;
    cursor: pointer;
    font-family: Cambria;
    display: inline-block;
    font-family: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
  }

  .taskBoxes {
    margin: 10px;
    border: solid;
    border-radius: 5px;
    border-width: 1px;
    padding: 5px;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.taskBoxes};
  }

  .taskTitle {
    color: ${({ theme }) => theme.colors.text};
    font-size: 18px; 
    font-weight: bold;
  }

  button.btn {
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
  }
`;