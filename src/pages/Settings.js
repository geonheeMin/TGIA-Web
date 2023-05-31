import { React, useState, useEffect } from "react";
import axios from "axios"
import styled from "styled-components";
import useStore from "../store";

const Main = styled.div`
  display: block;
  @media screen and (max-width: 767px) {
    margin-top: 70px;
    margin-left: -100%;
  }
`

function Settings() {
  const { url } = useStore();

  return(
    <Main>
      Settings
    </Main>
  );
}

export default Settings;