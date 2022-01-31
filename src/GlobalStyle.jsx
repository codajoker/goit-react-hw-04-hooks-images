import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
    background-color: #e7ecf2;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;}
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
    h2 {
        margin: 0;
    }
    p {
        margin: 0;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    img {
  display: block;
  max-width: 100%;
  height: auto;
}
`;
