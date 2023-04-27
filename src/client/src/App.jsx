import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import theme from "./styles/theme.js";
import GlobalStyle from "./styles/GlobalStyle.js";
import routes from "./routes.js";
import Home from "./pages/Home.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<div>Login</div>} />
        <Route path={routes.register} element={<div>Register</div>} />
        <Route path={routes.myPage} element={<div>my page</div>} />
        <Route path={routes.room} element={<div>Room</div>} />
        <Route path={routes.myRoom} element={<div>My Room</div>} />
        <Route path={routes.attendance} element={<div>Attendance</div>} />
        <Route path={routes.createRoom} element={<div>Create Room</div>} />
        <Route path={routes.manageRoom} element={<div>Manage Room</div>} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRouter />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
