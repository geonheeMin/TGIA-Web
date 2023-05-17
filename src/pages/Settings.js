import { React, useState, useEffect } from "react";
import axios from "axios"
import styled from "styled-components";

const apiUrl = process.env.REACT_APP_API_URL;

const Main = styled.div`
  display: block;
  @media screen and (max-width: 767px) {
    margin-top: 70px;
    margin-left: -100%;
  }
`

function Settings() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://43.201.38.196:8080/post/all")
    .then(res => {
    setData(res.data);
    console.log(res.data);
    })
    .catch(e => {
        console.log(e);
    })
  }, [])

  return(
    <Main>
      Settings
    </Main>
  );
}

export default Settings;