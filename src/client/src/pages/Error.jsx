import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../routes.js";

function Error() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(routes.home);
  });
}

export default Error;
