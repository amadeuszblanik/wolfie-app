import { createGlobalStyle } from "styled-components";
import reset from "react-style-reset";
import { isDarkMixin } from "../../ui-components/mixins";

const Global = createGlobalStyle`
  ${reset};

  body {
    color: ${({ theme }) => theme.palette.text};
    background: ${({ theme }) => theme.palette.background};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  :root {
    --color-text: ${({ theme }) => theme.palette.text};
    --color-background: ${({ theme }) => theme.palette.background};
    --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  
  * {
    user-select: none;
    box-sizing: border-box;
    color-scheme: ${({ theme }) => (isDarkMixin(theme.palette.dark) ? "dark" : "light")};
  }
  
   a {
     text-decoration: none;
   }
`;

export default Global;
