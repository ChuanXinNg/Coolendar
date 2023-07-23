import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};
    transition: all 0.50s linear;
  }

  .mode {
    border: solid;
    border-width: 1px;
    background-color:  ${({ theme }) => theme.colors.navbar.color};
    color: ${({ theme }) => theme.colors.text};
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

  .noteList {
    width: 380px;
    margin: 5px;
    border: solid;
    border-radius: 5px;
    border-width: 1px;
    background-color: ${({ theme }) => theme.colors.bookmarked};
  }

  .taskBoxes {
    width: 300px;
    margin: auto;
    border: solid;
    border-radius: 5px;
    border-width: 1px;
    padding: 5px;
    font-family: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.taskBoxes};
  }

  .taskTitle {
    color: ${({ theme }) => theme.colors.text};
    font-size: 18px; 
    font-weight: bold;
    font-family: ${({ theme }) => theme.font};
  }

  .noteBoxes {
    width: 340px;
    margin: auto;
    margin-bottom: 10px;
    border: solid;
    border-radius: 5px;
    border-width: 1px;
    padding: 5px;
    font-family: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.noteBoxes};
  }

  .react-calendar .highlight {
    background-color: ${({ theme }) => theme.colors.calendar.highlight};
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    background-color: ${({ theme }) => theme.colors.calendar.title};
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
    background-color: ${({ theme }) => theme.colors.calendar.title};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${({ theme }) => theme.colors.calendar.title};
  }

  .react-calendar__tile--active {
    background: rgb(255, 0, 43);
    color: ${({ theme }) => theme.colors.calendar.text};
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    background-color: ${({ theme }) => theme.colors.calendar.day};
    color: ${({ theme }) => theme.colors.calendar.text};
  }
  
  nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 5px;
    z-index: 999;
    background-color: ${({ theme }) => theme.colors.navbar.color};
  }

  .navbutton {
    flex: 1;
    border: none;
    color: ${({ theme }) => theme.colors.navbar.color};
    background-color: ${({ theme }) => theme.colors.navbar.color};
    font-size: 16px;
  }

  .logo {
    background-color: ${({ theme }) => theme.colors.navbar.color};
    position: fixed;
    float: left;
    z-index: 999;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: row;
    top:0%;
  }

  button.btn {
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
  }
`;