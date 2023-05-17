import React from "react";
import styled from "styled-components";


const Main = styled.div`
  display: block;
  @media screen and (max-width: 767px) {
    margin-top: 70px;
    margin-left: -100%;
  }
`

function Home() {
  return(
    <Main>
      Home
    </Main>
  );
}

export default Home;