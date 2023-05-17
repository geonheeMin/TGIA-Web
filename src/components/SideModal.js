import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { AiOutlineAppstore } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai"


const Main = styled.div`
  margin-left: -8%;
  margin-right: 5%;
`

function SideModal() {
  return (
    <Main>
      <ul>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? {color: "white", background: "hsla(237, 90%, 15%, 0.877", borderRadius: "7px"} : {})}
            to="/stats"
          >
            <div>
              <AiOutlineAppstore /> 통계
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? {color: "white", background: "hsla(237, 90%, 15%, 0.877", borderRadius: "7px"} : {})}
            to="/product"
          >
            <div>
              <BsCart /> 상품
            </div>
            </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? {color: "white", background: "hsla(237, 90%, 15%, 0.877", borderRadius: "7px"} : {})}
            to="/complited"
          >
            <div>
              <BsCartCheck /> 완료된 거래
            </div>
            </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? {color: "white", background: "hsla(237, 90%, 15%, 0.877", borderRadius: "7px"} : {})}
            to="/user"
          >
            <div>
              <BiUser /> 사용자
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? {color: "white", background: "hsla(237, 90%, 15%, 0.877", borderRadius: "7px"} : {})}
            to="/settings"
          >
            <div>
              <FiSettings /> 설정
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            style={{color: "#8b0404cc"}}
            to="/"
          >
            <div>
              <AiOutlineLogout /> 로그아웃
            </div>
          </NavLink>
        </li>  
      </ul>
    </Main>
  );
}

export default SideModal;