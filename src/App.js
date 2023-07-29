import { lazy, Suspense, useEffect, useState } from "react";
import './App.css';
import {Container, Nav, Navbar} from 'react-bootstrap';
import img from './kream.jpg';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from 'axios';

const Detail = lazy(()=> import('./routes/Detail'));
const Cart = lazy(()=> import('./routes/Cart'));

function App() {
  let obj = {name : 'kim'};
  localStorage.setItem('data', JSON.stringify(obj));

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify( [] ));
  }, []);

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">MALL</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"><Link to="/">Home</Link></Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg" style={{backgroundImage: 'url('+ img +')'}}></div>

      <Routes>
        <Route path="/" element={
          <>
            <div className="container">
              <div className="row">
                {
                  shoes.map((a, num)=>{
                    return(
                      <Card shoes={shoes[num]}></Card>
                    )
                  })
                }
              </div>
            </div>
            <button onClick={()=>{
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                console.log(result.data)
                let copy = [...shoes, ...result.data];
                setShoes(copy);
              })
              .catch(()=>{console.log('error')})
            }}>버튼</button>
          </>
        }>메인페이지</Route>
        <Route path="/detail/:id" element={
          <Suspense fallback={<div>로딩중..</div>}>
            <Detail shoes={shoes}/>
          </Suspense>
        }>상세페이지</Route>
        <Route path='*' element={<div>404</div>}></Route>
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>상세-회원정보</div>}></Route>
          <Route path='location' element={<div>상세-지역정보</div>}></Route>
        </Route>
        <Route path='/event' element={<Event/>}>
          <Route path='one' element={<div>첫주문시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>
        <Route path='/cart' element={
          <Suspense fallback={<div>로딩중..</div>}>
            <Cart/>
          </Suspense>
        }></Route>
      </Routes>
      
    </div>
  );
}

function About(){
  return(
    <>
      <h4>상세정보</h4>
      <Outlet></Outlet>
    </>
  )
}

function Event(){
  return(
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </>
  )
}

function Card(props){
  return(
    <div className="col-md-4">
      <img src= {props.shoes.img}
      width="80%"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </div>
  )
}

export default App;
