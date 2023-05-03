import React, { useState } from "react";
import Layout from "../components/common/Layout.jsx";
import Main from "../components/home/Main.jsx";
import SignIn from "../components/home/SignIn.jsx";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <Layout isLoggedIn={isLoggedIn}>
        <SignIn />
      </Layout>
    );
  } else {
    return (
      <Layout isLoggedIn={isLoggedIn}>
        <Main />
      </Layout>
    );
  }
}

export default Home;
