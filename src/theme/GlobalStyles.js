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

  .noteList {
    margin: 5px;
    border: solid;
    border-radius: 5px;
    border-width: 1px;
    background-color: ${({ theme }) => theme.colors.bookmarked};
  }

  .taskBoxes {
    margin: 10px;
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
    margin: 10px;
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
    background-color: #00ffff;
  }

  .react-calendar__tile--active {
    background: rgb(255, 0, 43);
    color: ${({ theme }) => theme.colors.calendar.text};
  }
  
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: rgb(0, 204, 255);
  }

  .react-calendar__tile--now {
    background: #b4ff76;
  }
  
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ff00ea;
  }

  .react-calendar__navigation__label {
    font-size: 30px;
    color: white;
    font-weight: bold;
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

  .react-calendar__month-view__days__day--neighboringMonth {
    color: grey;
  }
  

  button.btn {
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
  }
`;