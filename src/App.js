import React,{useState,useEffect} from 'react'
import {db} from './config/firebase'
import {Button,FormControl, Input,InputLabel} from '@material-ui/core'
import firebase from 'firebase'
import ToDo from './components/ToDo'
import './App.css'

function App() {
  const [todos,setTodos] = useState([]);
  const [input, setInput] = useState('')

  const addTodo =(e) =>{
    e.preventDefault()
    // setTodos([...todos,input])
    db.collection('todos').add({
      todo: input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      // setTodos(snapshot.docs.map(m=>m.data().todo))
      setTodos(snapshot.docs.map(doc=>({id: doc.id, todo: doc.data().todo})))
    })
  },[input])

  return (
    <div>
        <h1 className="todo_header">Firebase Todo CRUD App</h1>
        <form className="todo_form">
        <FormControl>
            <InputLabel>Write a ToDo</InputLabel>
            <Input value={input} onChange={e=> setInput(e.target.value)}/>
        </FormControl>
        <Button disabled ={!input} type="submit" onClick={addTodo} variant="contained">Add ToDo</Button>
        </form>
        <br/>
        <ul>
        {/* {todos.map((m,idx)=><li key={idx}>{m}</li>)} */}
        {todos.map((m,idx)=><ToDo key={idx} text={m}/>)}
        </ul>  
    </div>
  )
}


export default App


{/* <input value={input} onChange={e=> setInput(e.target.value)}/>
<button onClick={addTodo}>Add</button>     */}
