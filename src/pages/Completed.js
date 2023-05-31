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

function Completed() {  
  const { url } = useStore();
  const [posts, setPosts] = useState([]); // 완료된 리스트 데이터
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentpage, setCurrentPage] = useState(1); // 현재페이지
  const [postPerPage] = useState(10); // 페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);
  const remainingCells = postPerPage - currentPosts.length;

  useEffect(()=>{
    setCount(posts.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, posts, postPerPage])

  const setPage = (e) => {
    setCurrentPage(e);
  }

  useEffect(() => {
    axios.get(`${url}/purchasedlistV2`)
    .then(res => {
      setPosts(res.data)
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
        <td></td>
        <td></td>
      </tr>
    )};
    return cells;
  };
      
  return(
    <Main>
      <div className="title">
        <h2>완료된 거래 리스트</h2>
      </div>
      <table className="contentList">
        <thead>
        <tr className='listName'> 
          <th> 글 번호 </th>       
          <th> 제목 </th>  
          <th> 물품명 </th>  
          <th> 가격 </th>
          <th> 판매자 </th>
          <th> 구매자 </th>
          <th> 지불 수단 </th>
          <th> 구매 고유 번호 </th>
        </tr>
        </thead>
        <tbody>
        {currentPosts && posts.length > 0 ? (
          currentPosts.map((post, index) => {
            const sequentialNumber = indexOfFirstPost + index + 1;
            return (
              <tr className="listData" key={`post-${post.id}`}>
                <td>{sequentialNumber}</td>
                <td>{post.post_title}</td>
                <td>{post.item_name}</td>
                <td>{post.price}</td>
                <td>{post.seller_username}</td>
                <td>{post.buyer_username}</td>
                <td>신용카드</td>
                <td>{post.tid}</td>
              </tr>
            );
          })
        ) : (
          <div className="content_none">완료된 거래가 없습니다.</div>
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

export default Completed;