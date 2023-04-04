import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import Theme from "./styles/Theme.js";
import GlobalStyle from "./styles/GlobalStyle.js";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<div>This is Home</div>} />
        <Route path={"/hello"} element={<div>Hello</div>} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <AppRouter />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
