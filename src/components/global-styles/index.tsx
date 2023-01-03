import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  body {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.colors.text};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background: ${({ theme }) => theme.colors.background};
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:link, &:visited {
      color: ${({ theme }) => theme.colors.primary};
    }
    
    &:hover, &:active {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default GlobalStyle;
