import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  });

  return <Container>{time.toLocaleTimeString()}</Container>;
}

export default Clock;
