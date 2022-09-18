import {createGlobalStyle} from "styled-components";
import reset from "react-style-reset";

const Global = createGlobalStyle`
  ${reset};

  body {
    color: ${({theme}) => theme.palette.text};
    background: ${({theme}) => theme.palette.background};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

export default Global;
