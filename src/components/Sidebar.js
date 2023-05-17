import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from 'react-modal';
import styled from "styled-components";
import '../styles/Sidebar.css';
import bugi from "../assets/bugi.png";
import SideModal from "./SideModal";
import { BsCart } from "react-icons/bs";
import { AiOutlineAppstore } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai"
import { IoIosMenu } from "react-icons/io";


// 상상부기 이미지
const Profile = styled.img`
  width: 80px;
  height: 80px;
  @media screen and (max-width: 767px) {
    width: 60px;
    height: 60px;
  }
`

// 사이드바 상단 라인
const Title = styled.div`
  margin-top: 0%;
  margin-left: 1%;
  width: 90%;
  display: flex;
  @media screen and (max-width: 767px) {
    display: flex;
    margin-left: 5%;
    margin-top: -15px;
  }
`

// 부기 마켓 제목
const Title_text = styled.div`
  display: flex;
  width: 100%;
  margin-top: 25px;
  margin-left: 2.5%;
  font-size: 25px;
  font-weight: 900;    
  background: linear-gradient(to right, #1853e9, #93a8dd);
  color: transparent;
  -webkit-background-clip: text;    

  @media screen and (max-width: 767px) {
    margin-left: 2%;
    margin-top: 15px;
  }
`

// 사이드바
const Side = styled.div`
  display: block;
  width: 235px;
  height: 100vh;
  background-color: #EFEFEF;
  transition: all 0.5s ease;
  padding: 20px;
  box-sizing: border-box;
  top: 10px; /* 사이드바 상단의 높이만큼 내림 */
  
  // 모바일 사이즈 적용
  @media screen and (max-width: 767px) {
    display: block;
    //overflow: hidden;
    width: 100%;
    height: 70px;
    //height: auto;
    background-color: #EEEEEE;
    transition: all 0.5s ease;
    box-sizing: border-box;
    position: sticky;
    top: 0;  
  }
`

// 모바일 버전에서 숨기기
const MenuBox = styled.div`
  @media screen and (max-width: 767px) {        
    flex-direction: column;
    align-items:flex-end;
    display: none;
  }
`

// 사이드바 상단 메뉴
const Menu_Top = styled.div`
  margin-top: 15%;
  width: 200px;
  display: flex;
  flex-direction: column;
  @media screen and (max-height: 800px) {
    margin-top: 0%;        
  }
`

// 사이드바 하단 메뉴
const Menu_bottom = styled.div`
  margin-top: 30%;
  width: 200px;
  display: flex;
  flex-direction: column;
  @media screen and (max-height: 800px) {
    margin-top: 0%;        
  }
`

// 모바일 버전에서 메뉴 버튼
const Menubar = styled.a`
  display: flex;
  align-items:center;
  font-size: 30px;
  position: absolute;
  left: 0%;
  height: 0%;
  margin-top: 1%;
  @media screen and (min-width: 767px) {
    flex-direction: column;    
  }
`


function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  return(
    <Side className="sidebar" >
      <Menubar className="sidebar" onClick={() => setSidebar(!sidebar)}>
        <IoIosMenu />
        <Modal className="sidebar" isOpen={sidebar}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              top: "0%",
              left: "0%",
              right: "5%",
              width: "35%",
              height: "100%",
              background: "#e0e0e0",
              borderRadius: "4px",
              outline: "none",
              transition : "all 1s",
            }                 
          }}
        >
          <div style={{textAlign:'right'}}>
            <button onClick={()=> setSidebar(false) }>✖</button>
          </div>
          <SideModal className="sidebar"/>                                       
        </Modal>
      </Menubar>
      <Title className="sidebar">
        <Profile src={bugi}></Profile>
        <Title_text>부기마켓</Title_text>
      </Title>
      <MenuBox className="sidebar">
        <Menu_Top className="sidebar">
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
        </ul>
        </Menu_Top>
        <Menu_bottom className="sidebar">
          <ul>
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
        </Menu_bottom>
      </MenuBox>
    </Side>
  );
}


export default Sidebar;