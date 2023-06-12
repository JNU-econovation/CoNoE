import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { useRecoilState } from "recoil";

import theme from "./styles/theme.js";
import GlobalStyle from "./styles/GlobalStyle.js";
import routes from "./routes.js";
import isLoggedInState from "./recoil/atoms/isLoggedInState.js";

import Home from "./pages/Home.jsx";
import SignUs from "./pages/SignUs.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import SignIn from "./pages/SignIn";
import MyRoom from "./pages/MyRoom.jsx";
import ManageRoom from "./pages/ManageRoom.jsx";
import Attendance from "./pages/Attendance.jsx";
import VideoCall from "./pages/VideoCall.jsx";
import Error from "./pages/Error";
import MyPage from "./pages/MyPage.jsx";

function PrivateRouter() {
  return (
    <>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.myPage} element={<MyPage />} />
      <Route path={`${routes.room}/:roomId`} element={<VideoCall />} />
      <Route path={routes.myRoom} element={<MyRoom />} />
      <Route path={`${routes.attendance}/:roomId`} element={<Attendance />} />
      <Route path={routes.createRoom} element={<CreateRoom />} />
      <Route path={`${routes.manageRoom}/:roomId`} element={<ManageRoom />} />
      <Route path="*" element={<Error />} />
    </>
  );
}

function PublicRouter() {
  return (
    <>
      <Route path={routes.home} element={<SignIn />} />
      <Route path={routes.register} element={<SignUs />} />
      <Route path="*" element={<Error />} />
    </>
  );
}

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) return;
    setIsLoggedIn(true);
  }, [localStorage.getItem("accessToken")]);

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
