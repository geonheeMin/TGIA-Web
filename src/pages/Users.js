import { React, useState, useEffect } from "react";
import axios from "axios"
import styled from "styled-components";
import Paging from "../components/Paging";
import useStore from "../store";
import '../styles/ListStyle.css';

const apiUrl = process.env.REACT_APP_API_URL;

const Main = styled.div`
  display: flex;
  margin-left: 2%;
  margin-Top: 1%;
  width: 80%;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    margin-top: 70px;
    margin-left: -100%;
  }
`

function Users() {
  const { url } = useStore();
  const [users, setUsers] = useState([]); // 유저 리스트 데이터
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentpage, setCurrentPage] = useState(1); // 현재페이지
  const [postPerPage] = useState(10); // 페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);
  const remainingCells = postPerPage - currentPosts.length;

  useEffect(()=>{
    setCount(users.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(users.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, users, postPerPage])

  const setPage = (e) => {
    setCurrentPage(e);
  }

  useEffect(() => {
    axios.get(`${url}/userlist`)
    .then(res => {
      setUsers(res.data)
    })
    .catch(e => {
      console.log(e);
    })
  }, [])
  
  // 빈 셀 생성 함수
  const generateEmptyCells = (count) => {
    const cells = [];
    for (let i = 0; i < count; i++) {
    cells.push(
      <tr className="listData" key={`empty-cell-${i}`}>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    )};
    return cells;
  };
      
  return(
    <Main>
      <div className="title">
        <h2>사용자 리스트</h2>
      </div>
      <table className="contentList">
        <thead>
        <tr className='listName'>
          <th> 멤버 ID </th>  
          <th> 닉네임 </th>
          <th> 단과대</th>  
          <th> 1트랙 </th>
          <th> 2트랙 </th>
          <th> 매너 점수 </th>
        </tr>
        </thead>
        <tbody>
          {currentPosts && users.length > 0 ? (
            currentPosts.map((user) => (
              <tr className='listData'>
                <td>{user.member_id}</td>
                <td>{user.username}</td>
                <td>{user.first_college}</td>
                <td>{user.firstTrack}</td>
                <td>{user.secondTrack}</td>
                <td>{user.mannerscore}</td>
              </tr>
            ))
          ) : (
            <div className="content_none">
              사용자가 없습니다.
            </div>
          )}
          {generateEmptyCells(remainingCells)} 
        </tbody>
      </table>
      <div className="paging">
        <Paging page = {currentpage} count={count} setPage={setPage}/>
      </div>
    </Main>
  );
}

export default Users;