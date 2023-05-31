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

function Product() {
  const { url } = useStore();
  const [posts, setPosts] = useState([]) // 상품 리스트 데이터
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
    axios.get(`${url}/post/all`)
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
      </tr>
    )};
    return cells;
  };
      
  return(
    <Main>
      <div className="title">
        <h2>등록된 상품 리스트</h2>
      </div>
      <table className="contentList">
        <thead>
          <tr className='listName'>
            <th> 번호 </th>  
            <th> 카테고리 </th>  
            <th> 제목 </th>
            <th> 물품명 </th>
            <th> 가격 </th>
            <th> 소속 </th>
            <th> 조회수 </th>
          </tr>
        </thead>
        <tbody>
          {currentPosts && posts.length > 0 ? (
            currentPosts.map((post) => (
              <tr className='listData'>
                <td>{post.post_id}</td>
                <td>{post.category}</td>
                <td>{post.title}</td>
                <td>{post.item_name}</td>
                <td>{post.price}</td>
                <td>{post.department}</td>
                <td>{post.views}</td>
              </tr>
            ))
          ) : (
            <div className="content_none">
              게시물이 없습니다.
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

export default Product;