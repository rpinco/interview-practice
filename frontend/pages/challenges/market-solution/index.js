import { useState } from 'react';

export default function MarketSolution() {
  const initialState = {id: '', quantity: 0, type: 'SELL', status: 'OPEN'}

  const [newOrder, setNewOrder] = useState({...initialState});
  const [ordersList,  setOrdersList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const setType = (val) => {
    setNewOrder((previous) => {return {...previous, type: val}})
  }

  const recaluculateOrdersList = (orderType) => {
    setOrdersList((prevOrdersList) => {
      let updatedOrdersList = [...prevOrdersList];
      let currentOrder;
  
      updatedOrdersList.push(newOrder);
  
        while ((currentOrder = updatedOrdersList.find((order) => order.type === orderType && order.status !== 'FULLFILLED' && order.status !== 'CANCELLED'))) {
          const orderQuant = parseInt(newOrder.quantity);
          const currentOrderQuant = parseInt(currentOrder.quantity);
  
          if (orderQuant < currentOrderQuant) {   
            // Im trying to sell LESS than the current order has for buying, so I grab the first BUY order available, reduce the ammount by how much i want to sell,
            // and mark the SELL order as fullfilled
            const newQuantity = currentOrderQuant - orderQuant;
            updatedOrdersList = updatedOrdersList.map((order) => {
              if (order.id === currentOrder.id) {
                order.quantity = newQuantity.toString();
              }
              return order;
            });
            updatedOrdersList = updatedOrdersList.map((order) => {
              if (order.id === newOrder.id) {
                order.status = 'FULLFILLED';
                order.quantity = 0;
              }
              return order;
            });
            break;
          } else {    
            // im tring to sell MORE than the current order has for buying, so I have to mark the current order as fullfilled, 
            // then substract the remaining from the current order and iterate
            updatedOrdersList = updatedOrdersList.map((order) => {
              if (order.id === currentOrder.id) {
                order.status = 'FULLFILLED';
                order.quantity = 0;
              }
              return order;
            });

            const newQuantity = orderQuant - currentOrderQuant;
            updatedOrdersList = updatedOrdersList.map((order) => {
              if (order.id === newOrder.id) {
                order.status = 'FULLFILLED';
                order.quantity = newQuantity.toString();
              }
              return order;
            });
          }
          
        }
  
      return updatedOrdersList;
    });
  }

  const addOrder = () => {
    const orderNameExists = ordersList.find(order=>order.id === newOrder.id);
    if (orderNameExists) {
      // I know i could generate unique order Ids myself, but this is faster for this excercise
      setErrorMessage('Order Ids must be unique');
    } else {
      setErrorMessage('')
      if (newOrder.type === 'SELL') recaluculateOrdersList('BUY')
      if (newOrder.type === 'BUY') recaluculateOrdersList('SELL')
    }

  };

  const cancelOrder = (orderId) => {
    setOrdersList(ordersList.map( (order) => {
      if (orderId === order.id) {
        order.status = 'CANCELLED'
      }
      return order;
    }
    ))
  }

  const showordersList = () => {
    return ordersList.map((order, idx)=> {
      return (
      <tr key={idx}>
        <td>{order.id}</td>
        <td>{order.quantity}</td>
        <td>{order.type}</td>
        <td>{order.status}</td>
        <td>{order.status !== 'FULLFILLED' && order.status !== 'CANCELLED' && <button onClick={()=>cancelOrder(order.id)}>Cancel</button>}</td>
      </tr>)
    })
  }

  return (
    <>
    <div style={{margin: '20px', display: 'flex', flexDirection: 'column'}}>
      <div style={{marginBottom: '20px'}}>
        I took a couple of liberties here, for the sake of brevity:
        <br />
        {'1- I did not include the price, but doing so is just another field, and another check on the logic (to see if the newOrder.price < currentOrder.price)'}
        <br />
        {'2- I did not include the symbol, (assuming buy and sell orders are only for the same symbol), this can be , again, easily extended by another field and another check'}
      </div>
        <div>
          <label htmlFor="id">Name</label>
          <input type="text" id="id" value={newOrder.id} onChange={(e)=> setNewOrder({...newOrder, id: e.target.value})}/>
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input type="text" id="quantity" value={newOrder.quantity} onChange={(e)=> setNewOrder({...newOrder, quantity: e.target.value})} />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select name="type" id="type" value={newOrder.type} onChange={(e)=> setType(e.target.value)}>
            <option value={'SELL'}>SELL</option>
            <option value={'BUY'}>BUY</option>
          </select>
        </div>

        <div style={{marginTop: '20px'}}>
        <button onClick={addOrder}> Add order</button>
        {errorMessage != '' && <span>{errorMessage}</span>}
        </div>
    </div>
    <table border={1}>
      <thead>
        <tr>
        <th>ID</th>
        <th>quantity</th>
        <th>type</th>
        <th>status</th>
        <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {showordersList()}
      </tbody>
    </table>
    </>
  );

}
