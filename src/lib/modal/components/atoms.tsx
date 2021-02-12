import React from "react";
import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`

export const ModalContent = styled.div`
  width: 60%;
  min-height: 400px;
  background-color: white;
  overflow: scroll;
  padding: 25px;
  height: 400px;
`
