import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addCount } from '../store';

function Cart(){
    let state = useSelector((state)=>{ return state })
    let dispatch = useDispatch()
    console.log(state.user)

    let cart = [...state.cart]
    
    return(
        <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                {
                  cart.map((a, num)=>{
                    return(
                        <tr key={num}>
                            <td>{state.cart[num].id}</td>
                            <td>{state.cart[num].name}</td>
                            <td>{state.cart[num].count}</td>
                            <td>
                            <button onClick={()=>{
                                dispatch(addCount(num))
                            }}>+</button>
                            </td>
                        </tr>
                    )
                  })
                }
            </tbody>
        </Table> 
    )
}

// function Tbody(props){
//     let dispatch = useDispatch()

//     return(
//         <tr key={props.cart.id}>
//         <td>{props.cart.id}</td>
//         <td>{props.cart.name}</td>
//         <td>{props.cart.count}</td>
//         <td>
//             <button onClick={()=>{
//                 dispatch(addCount(props.car.id))
//             }}></button>
//         </td>
//         </tr>
//     )
// }

export default Cart;