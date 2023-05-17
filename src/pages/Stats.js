import { React, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import axios from "axios";
import styled from "styled-components";
import '../styles/Stats.css';

const apiUrl = process.env.REACT_APP_API_URL;

const RADIAN = Math.PI / 180;

const COLORS = [
  "hsla(218, 93%, 16%, 1.00)",
  "hsla(218, 92%, 20%, 0.95)",
  "hsla(218, 89%, 24%, 0.90)",
  "hsla(218, 86%, 28%, 0.90)",
  "hsla(218, 83%, 32%, 0.89)",
  "hsla(218, 80%, 36%, 0.88)",
  "hsla(218, 77%, 40%, 0.88)",
];

const COLORS_transaction = [
  "hsla(207, 93%, 20%, 1.00)",
  "hsla(207, 92%, 24%, 0.95)",
  "hsla(207, 89%, 28%, 0.90)",
  "hsla(207, 86%, 32%, 0.90)",
  "hsla(207, 83%, 36%, 0.89)",
  "hsla(207, 80%, 40%, 0.88)",
  "hsla(207, 77%, 44%, 0.88)",
];


const Main = styled.div`
    display: row;
    margin-left: 2%;
    @media screen and (max-width: 767px) {
        margin-top: 70px;
        margin-left: -100%;
    }
`

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent === 0) {
    return null;
  }

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function Stats() {
  const [monthlyPostCounts, setMonthlyPostCounts] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [categoryData2, setCategoryData2] = useState([]);

  const [posts, setPosts] = useState([])
  const [totalPost, setTotalPost] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [dailyTransactions, setDailyTransactions] = useState(0);
  const [weeklyTransactions, setWeeklyTransactions] = useState(0);
  const [totalTransactionsPrice, setTotalTransactionsPrice] = useState(0);

  const [chartData, setChartData] = useState([]);
  const [chartData_transaction,setChartData_transaction] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 선택된 카테고리 상태

  const categories = [
    '전체',
    '도서',
    '필기구',
    '생활가전',
    '의류',
    '전자기기',
    '뷰티미용',
    '부기굿즈'
  ];

  useEffect(() => {
    axios.get("http://223.194.129.94:8080/transaction")
    //axios.get("http://13.209.65.73:8080/transaction")
      .then(res => {
        const monthlyPostCountsByCategory = res.data.monthlyPostCountsByCategory;
        const monthlyTransactionCountsByCategory = res.data.monthlyTransactionCountsByCategory;

        const newChartData = [
          { name: '도서', value: res.data.totalPost_도서 },
          { name: '필기구', value: res.data.totalPost_필기구 },
          { name: '생활가전', value: res.data.totalPost_생활가전 },
          { name: '의류', value: res.data.totalPost_의류 },
          { name: '전자기기', value: res.data.totalPost_전자기기 },
          { name: '부기굿즈', value: res.data.totalPost_부기굿즈 },
          { name: '뷰티미용', value: res.data.totalPost_뷰티미용 },
        ];
        newChartData.sort((a, b) => b.value - a.value);
        setChartData(newChartData);
  
        const newChartData_transaction = [
          { name: '도서', value: res.data.totalTransactions_도서 },
          { name: '필기구', value: res.data.totalTransactions_필기구 },
          { name: '생활가전', value: res.data.totalTransactions_생활가전 },
          { name: '의류', value: res.data.totalTransactions_의류 },
          { name: '전자기기', value: res.data.totalTransactions_전자기기 },
          { name: '부기굿즈', value: res.data.totalTransactions_부기굿즈 },
          { name: '뷰티미용', value: res.data.totalTransactions_뷰티미용 },
        ];
        newChartData_transaction.sort((a, b) => b.value - a.value);
        setChartData_transaction(newChartData_transaction);

        const categoriesData = Object.entries(monthlyPostCountsByCategory).map(([category, data]) => {
          const categoryData = Object.entries(data).map(([date, count]) => ({
            month: new Date(date).toLocaleString('default', { month: 'long' }),
            등록건수: count,
          }));
          return { category, data: categoryData };
        });
        setCategoryData(categoriesData);
        

        const categoriesData2 = Object.entries(monthlyTransactionCountsByCategory).map(([category, data]) => {
          const categoryData = Object.entries(data).map(([date, count]) => ({
            month: new Date(date).toLocaleString('default', { month: 'long' }),
            거래완료: count,
          }));
          return { category, data: categoryData };
        });
        setCategoryData2(categoriesData2);

        setTotalPost(res.data.totalPosts);
        setTotalTransactions(res.data.totalTransactions);
        setDailyTransactions(res.data.dailyTransactions);
        setWeeklyTransactions(res.data.weeklyTransactions);
        setTotalTransactionsPrice(res.data.totalTransactionsPrice_도서);
      })
      .catch(e => {
        console.log("에러" + e);
      });
  }, []);

  // 카테고리 버튼을 클릭했을 때 호출되는 함수
  const handleCategoryButtonClick = (category) => {
    setSelectedCategory(category);
  };

  // 선택된 카테고리에 해당하는 데이터 필터링
  const filteredData = chartData.filter((item) =>
    selectedCategory === '전체' ? true : item.name === selectedCategory
  );

  return(
    <Main>
      {/* 각종 통계 */}
      <div className="analytics">
        <div className="analytics_div">
          <p className="analytics_data">{totalPost}</p>
          <p className="analytics_category">총 매물</p>
        </div>
        <div className="analytics_div_add">
          <p className="analytics_data">{totalTransactions}</p>
          <p className="analytics_category">완료된 거래</p>
        </div>
        <div className="analytics_div_add">
          <p className="analytics_data">{dailyTransactions}</p>
          <p className="analytics_category">오늘 거래 건수</p>
        </div>
        <div className="analytics_div_add">
          <p className="analytics_data">{weeklyTransactions}</p>
          <p className="analytics_category">주간 거래 건수</p>
        </div>
        <div className="analytics_div_add">
          <p className="analytics_data">₩{totalTransactionsPrice.toLocaleString()}</p>
          <p className="analytics_category">거래된 금액</p>
        </div>
      </div>
      {/* 카테고리별 거래 및 완료 비율 */}
      <div className="cateogy_analytics_title">
        <h2>카테고리별 거래 비율</h2>
        <h2>카테고리별 완료 비율</h2>
      </div>
      {/* 카테고리별 거래 비율 파이 차트 */}
      <div className="category_analytics_piechart">
        <PieChart width={280} height={280}>
          <Pie
            isAnimationActive={false}
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={135}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <ul className="category_ranking">
          {chartData.map((item, index) => (
            <li key={index} style={{ color: COLORS[index % COLORS.length] }}>
              {item.name} : {item.value}
            </li>
          ))}
        </ul>
        {/* 카테고리별 거래 완료 비율 파이 차트 */}
        <PieChart width={280} height={280}>
          <Pie
            isAnimationActive={false}
            data={chartData_transaction}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={135}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_transaction[index % COLORS_transaction.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <ul className="category_ranking">
          {chartData_transaction.map((item, index) => (
            <li key={index} style={{ color: COLORS_transaction[index % COLORS_transaction.length] }}>
              {/* [{index + 1}] */} {item.name} : {item.value}
            </li>
          ))}
        </ul>
      </div>
      
      {/* 월별 카테고리 라인 차트 */}
      <div className="lineChart">
        {/* 카테고리 선택 버튼 */}
        <div className="chartButton_grid">
          {categories.map((category) => (
            <button
              key={category}
              className={`chart_button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryButtonClick(category)}
            >
              <span className="button_text">{category}</span>
            </button>
          ))}
        </div>
        {/* 카테고리 등록건수 라인 차트 */}
        <div className="categoryLineChart">  
          {categoryData.map((category) => (
            selectedCategory === category.category && (
              <div key={category.category}>
                <h2 className="category_selected">{category.category}</h2>
                <LineChart
                  width={570}
                  height={180}
                  data={category.data}
                  className="lineChart_registerd"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="등록건수" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </div>
            )
          ))}
        </div>
        {/* 카테고리 거래완료 라인 차트 */}      
        <div className="categoryLineChart_transaction">
          {categoryData.map((category) => (
              selectedCategory === category.category && (
                <div key={category.category}>
                  <LineChart
                    width={570}
                    height={180}
                    data={categoryData2.find(item => item.category === category.category).data}
                    className="lineChart_transaction"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="거래완료" stroke="#0084d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </div>
              )
            ))}
        </div>
      </div>
    </Main>
  );
}

export default Stats;