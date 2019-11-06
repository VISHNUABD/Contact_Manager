import React,{useState,useEffect} from 'react';
import axios from 'axios';



const App=()=> {
  return <Contacts />
}

const Contacts=()=>{
  const[name,changename]=useState("");
  const[num,setnum]=useState("")
  const[lst,changelst]=useState([]);

const newname=(event)=>{
changename(event.target.value);
}
const newnum=(e)=>{
  setnum(e.target.value)
}

const handleSubmit=()=>{
  axios.post("http://localhost:8000/userslist",{name:name,num:num}).then(success=>{
    console.log(success.data);
    changelst([...lst,success.data]);
    changename("");
  })

}

useEffect(()=>{
  axios.get("http://localhost:8000/userslist").then(success=>{
    changelst(success.data)
  }).catch(error=>{
    console.log(error)
  })
},[])

const buttonaction=(deleteid)=>{
    axios.delete("http://localhost:8000/userslist/"+deleteid).then(success=>{
if(success.Status===200 && success.Text==="OK")
{
    changename([name.filter(i=>i.id!==deleteid)])
}
})
}

const updateaction=(updateid)=>{
  
  axios.put("http://localhost:8000/userslist/"+updateid).then
}

return (
  <div>
    <form>
    <input type='text' id='t1' value={ name} onChange={newname}></input>
    <input type="text" onChange={newnum}></input>
     {/* <input type='submit' id='b1' value='submit' onClick={fun}></input>  */}
     <button onClick={handleSubmit}>submit</button>
     {/* <button onClick={handleUpdate}>update</button> */}
     </form>

     <ul>{
       lst.map((i=>
        {
        return(<li
key={i.id}><span>Name:{i.name}</span><br></br><span>Number:{i.num}</span>
<span><button onClick={()=>buttonaction(i.id)}>DELETE</button></span>
<span><button onClick={()=>updateaction(i.id)}>UPDATE</button></span>
</li>)
       }))
     }
   </ul>


  </div>
)
}
export default App;
