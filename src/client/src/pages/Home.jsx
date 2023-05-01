import React, { useState } from "react";
import Layout from "../components/common/Layout.jsx";
import Main from "../components/home/Main.jsx";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return <Layout isLoggedIn={isLoggedIn} />;
  } else {
    return (
      <Layout isLoggedIn={isLoggedIn}>
        <Main />
      </Layout>
    );
  }
}

export default Home;
