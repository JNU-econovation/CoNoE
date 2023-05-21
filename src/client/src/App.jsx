import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";

import theme from "./styles/theme.js";
import GlobalStyle from "./styles/GlobalStyle.js";
import routes from "./routes.js";

import Home from "./pages/Home.jsx";
import SignUs from "./pages/SignUs.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import SignIn from "./pages/SignIn";
import MyRoom from "./pages/MyRoom.jsx";

function PrivateRouter() {
  return (
    <>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.myPage} element={<div>my page</div>} />
      <Route path={routes.room} element={<div>Room</div>} />
      <Route path={routes.myRoom} element={<MyRoom />} />
      <Route path={routes.attendance} element={<div>Attendance</div>} />
      <Route path={routes.createRoom} element={<CreateRoom />} />
      <Route
        path={`${routes.manageRoom}/:roomId`}
        element={<div>Manage Room</div>}
      />
      <Route path="*" element={<div>error</div>} />
    </>
  );
}

function PublicRouter() {
  return (
    <>
      <Route path={routes.home} element={<SignIn />} />
      <Route path={routes.register} element={<SignUs />} />
      <Route path="*" element={<div>error</div>} />
    </>
  );
}

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <BrowserRouter>
      <Routes>{isLoggedIn ? PrivateRouter() : PublicRouter()}</Routes>
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
