import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import '../App.css';
import { addItem } from "../store";
import { useDispatch } from "react-redux";

function Detail(props){

    let [count, setCount] = useState(0);
    let [div, setDiv] = useState(true);
    let [tab, setTab] = useState(0);

    let {id} = useParams();
    let shoe = props.shoes.find(function(num){
        return num.id == id
    });

    let dispatch = useDispatch();

    useEffect(()=>{
        let watch = localStorage.getItem('watched')
        watch = JSON.parse(watch)
        watch.push(shoe.id)
        watch = new Set(watch) // set형태 - 중복 제거 
        watch = Array.from(watch)
        localStorage.setItem('watched', JSON.stringify(watch))
    }, []);

    useEffect(()=>{
        let a = setTimeout(()=>{setDiv(false)}, 2000)
        return() =>{clearTimeout(a);}
    }, []);

    return(
        <>
            <div className="container">
                {   
                    div == true
                    ?
                    <div className="alert alert-warning">
                        2초 이내 구매시 할인
                    </div>
                    : null
                }
                {count}
                <button onClick={()=>{setCount(count+1)}}>버튼</button>
                <div className="row">
                    <div className="col-md-6">
                    <img src={shoe.img} width="100%" />
                    </div>
                    <div className="col-md-6">
                    <h4 className="pt-5">{shoe.title}</h4>
                    <p>{shoe.content}</p>
                    <p>{shoe.price}원</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem({id: 1, name: 'Red Kint', count: 1}))
                    }}>주문하기</button> 
                    </div>
                </div>
                <Nav variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link onClick={()=>{setTab(0)}} eventKey="link-0">버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={()=>{setTab(1)}} eventKey="link-1">버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={()=>{setTab(2)}} eventKey="link-2">버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent tab={tab}></TabContent>
            </div>
        </>
    )
}

function TabContent(props){
    let [fade, setFade] = useState('');

    useEffect(()=>{
        setTimeout(()=>{setFade('end')}, 100)
        return ()=>{
            setFade('')
        }
    }, [props.tab]) 

    if (props.tab == 0){
        return <div className={"start" + fade}>content0</div>
    }
    if (props.tab == 1){
        return <div className={"start" + fade}>content1</div>
    }
    if (props.tab == 2){
        return <div className={"start" + fade}>content2</div>
    }
}

export default Detail;