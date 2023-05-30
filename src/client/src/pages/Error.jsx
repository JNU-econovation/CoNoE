import React from "react";
import Layout from "../components/common/layout/Layout.jsx";
import { useRecoilValue } from "recoil";
import isLoggedInState from "../recoil/atoms/isLoggedInState.js";

function Error() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div>404 not found</div>
    </Layout>
  );
}

export default Error;
