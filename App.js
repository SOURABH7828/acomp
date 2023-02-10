
import './App.css';
import { useEffect, useState } from 'react';


function App() {
const[data,setData] =useState([]);
  const[vendor_id,setvendor_id] = useState("")
  const[order_date,setDate]=useState('');
  const[complete_address,setAddress]=useState('');

  const[order_location,setLocation] =useState('');
  const[vendor_name,setVender]=useState('');
  
  const[material_name,setMaterial] = useState("");
  const[uom,setRole] = useState("uom");
  const[quantity,setQty] = useState("Qty");
  const[gst_percentage,setGST] = useState("GST%");
  

  useEffect(()=>{
    getList();
  },[]);
  function getList(){
    fetch("https://testapi.acolabz.com/api/v1/orders").then((result)=>{
      result.json().then((resp)=>{
          setData(resp);
          console.log(resp);
      })
    })
  }
  function AddNew(){
    console.log(vendor_id, order_date,complete_address, order_location,vendor_name, material_name, uom, quantity, gst_percentage)
    let item={order_date,complete_address, order_location,vendor_name, material_name, uom, quantity, gst_percentage};
    fetch("https://testapi.acolabz.com/api/v1/orders/",{
      method:"POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result)=>{
      result.json().then((resp)=>{
        getList();
      })
    })
  }

  function deleteUser(id){}
  return (
    <div className="App">
      <h3>Create Order</h3>
        <div className='one'>
          <span><h5>Order No*</h5><input type="number"value={vendor_id} onChange={(e)=>{setvendor_id(e.target.value)}} /></span>
          <span><h5>Order Date*</h5><input type="date"value={order_date} onChange={(e)=>{setDate(e.target.value)}}/></span>
          <span><h5>Vandor*</h5><select name="" id="" value={vendor_name} onChange= {(e)=>{setVender(e.target.value)}}><option value="" ></option></select></span>

        </div>
        <div className='two'>
          <span><h5>Order for Location*</h5><select name="" id="" value={order_location}  onChange= {(e)=>{setLocation(e.target.value)}}>
          <option value="">bhopal</option>
          <option value="">itarsi</option>
            <option value="">Indor</option></select></span>
          <span><h5>Complete Address*</h5><input type="text"value={complete_address} onChange={(e)=>{setAddress(e.target.value)}} /></span>
        </div>
        <div className='three'>
          <span><h5>Materials*</h5><select value={material_name}onChange= {(e)=>{setMaterial(e.target.value)}}>
          <option value="">sand</option>
          <option value="">Cement</option>
          <option value="">sand</option>
            </select></span>
          <span><input type="text" onChange= {(e)=>{setRole(e.target.value)}} value={uom}/></span>
          <span><input type="text" onChange= {(e)=>{setQty(e.target.value)}} value={quantity}/></span>
          <span><input type="text" onChange= {(e)=>{setGST(e.target.value)}} value={gst_percentage}/></span>
          <button onClick={AddNew}>+Add</button>         
        </div>


        <table border={1}>
          <tr>
            <th>Material</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>GST%</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
          {
          data.map((item,index)=><tr>
           
            
            <td>{item.material_name}</td>
            <td>{item.quantity}</td>
            <td>{item.uom}</td>
            <td>{item.gst_percentage}</td> 
            <td>{item.amount}</td>
            

            <td><button onClick={(()=>deleteUser(item.id))}>Delete</button></td>
            
          </tr>
          )
        } 
        </table>

        <div>
         <h5>Description</h5>
         <input type="textarea" />
        </div>
        <div>
          <button onClick={AddNew}>Create Order</button>
        </div>
           


        </div>
  );
}

export default App;






