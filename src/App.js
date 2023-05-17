import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Complited from './pages/Completed';
import Product from './pages/Product';
import Stats from './pages/Stats';
import Users from './pages/Users';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Center>
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/product' element={<Product />} />
          <Route path='/complited' element={<Complited />} />
          <Route path='/user' element={<Users />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </Center>
    </BrowserRouter>
  );
}

const Center = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`
export default App;