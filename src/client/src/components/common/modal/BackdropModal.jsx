import React, { useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import styled from "styled-components";
import useOutsideClick from "../../../hooks/useOutsideClick.js";
import ModalPortal from "./ModalPortal.jsx";

const ModalContainer = styled.article`
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0.5rem;
`;

function BackdropModal({ open, setOpen, children, sx }) {
  const modalRef = useRef();
  useOutsideClick(modalRef, () => setOpen(false));
  return (
    <ModalPortal>
      <Backdrop open={open} sx={{ color: "#fff" }}>
        <ModalContainer ref={modalRef} style={sx}>
          {children}
        </ModalContainer>
      </Backdrop>
    </ModalPortal>
  );
}

export default BackdropModal;
