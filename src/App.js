import logo from './logo.svg';
import './App.css';
import {EmployeeData} from'./EmployeeData'
import { useState,useEffect } from 'react';

function App() {
  const[data,setData]=useState([]);
  const[firstName,setFirstName]=useState('')
  const[lastName,setLastName]=useState('')
  const[age,setAge]=useState(0)
  const[id,setId]=useState(0)
  const[isUpdate,setUpdate]=useState(false)
  useEffect(()=>{
    setData(EmployeeData)
  },[]);

  const HandleEdit=(id)=>{
    const dt=data.filter(item=>item.id===id)
    if(dt!==undefined){
      setUpdate(true)
      setId(id)
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }
  const HandleUpdate=()=>{
    if(isUpdate === true){
      const index=data.map((item)=>{
        return item.id;
       }).indexOf(id);
    
       const dt=[...data];
       dt[index].firstName=firstName;
       dt[index].lastName=lastName;
       dt[index].age=age;
    
       setData(dt);
       HandleClear();
    }
   const dt=[...data];
   const newObject={
    id:EmployeeData.length+1,
    firstName:firstName,
    lastName:lastName,
    age:age,
   }
   dt.push(newObject)
   setData(dt);
   HandleClear();
   
  }
  const HandleClear=()=>{
      setAge(0)
      setFirstName('');
      setLastName('');
      setAge('');
      setUpdate(false)
  }
  const HandleDelete=(id)=>{
    if(window.confirm("Are you Sure you want to delete")){
      const dt=data.filter(item=>item.id!==id)
      setData(dt);
    }

  }
 
  return (
    <div className="App">

      <div style={{display:'flex', justifyContent:'center', marginTop:'10px', marginBottom:'10px'}}>
        <div>
          <label> First Name:
            <input type="text" placeholder='Enter Your First Name' onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
          </label>
        </div>
        <div>
          <label> Last Name:
            <input type="text" placeholder='Enter Your Last Name' onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
          </label>
        </div>
        <div>
          <label> Age:
            <input type="text" placeholder='Enter Your Age' onChange={(e)=>setAge(e.target.value)} value={
              age
            }/>
          </label>
        </div>
        <div>
          
            <button className='btn btn-primary' onClick={()=>HandleUpdate()}>
              {isUpdate === true ? "Update" : "Save"}
            </button>
            
        </div>
        <button className='btn btn-danger' onClick={()=>HandleClear()}>Clear</button>
      </div>
      
      <table className='table table-hover'>
        <thead>
          <tr>
          <td>Sr.No</td>
          <td>Id</td>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Age</td>
          <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item,i)=>{
              return(
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className='btn btn-primary'  onClick={()=>HandleEdit(item.id)}>Edit</button>&nbsp;
                    <button className='btn btn-danger' onClick={()=>HandleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
