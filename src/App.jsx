import Navbar from "./components/Navbar"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")

  useEffect(() => {
    let tdString = localStorage.getItem("todos")
    if(tdString){
    let todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos)
    }
  }, [])
  

  const savetoLS=(e)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleAdd = () => {
    if(todo == ""){
      alert("Enter A Task Plz...")
    }
    else{

      setTodos([...todos, { id: uuidv4() ,todo, isCompleted: false }])
      setTodo("")
      console.log({todos})
      savetoLS()
    }
  }

  const handleDelete = (e,id) => {
    let newTodos =todos.filter(item=>{
      return item.id != id
    })
    setTodos(newTodos)
    savetoLS()
  }

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos =todos.filter(item=>{
      return item.id != id
    })
    setTodos(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id ===id
    })
    let newTodos =[...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetoLS()
  }


  return (
    <>

      <Navbar />
      <div className="container mx-auto bg-slate-500 rounded-2xl p-5 my-5 min-h-[80vh]">
        <h2 className="font-bold text-lg">Add Todo</h2>
        <div className="inputs flex gap-5">
          <input placeholder="Enter Task here" onChange={handleChange} value={todo} className="px-5 py-2 rounded-lg border-blue-500 w-1/2" type="text" />
          <button onClick={handleAdd} className="bg-blue-500 font-bold px-5 py-2 rounded-lg text-white hover:bg-blue-600">Save</button>
        </div>
        <h2 className="font-bold text-lg mt-5">Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className="text-xl m-5">No Todo's To display</div>}
          {todos.map(item => {
            return <div key={item} className="todo flex justify-between items-center w-full md:w-1/4 my-3">
              <div className="text flex items-center gap-5">
                <input type="checkbox" value={item.isCompleted} name={item.id} id="" onChange={handleCheck}/>
                <p className={item.isCompleted ? "line-through" : ""}>{item.todo}</p>
              </div>
              <div className="buttons flex gap-6">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className="bg-slate-400 px-3 font-bold rounded-lg hover:bg-slate-600 hover:text-white py-1">Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className="bg-slate-400 px-3 font-bold rounded-lg hover:bg-slate-600 hover:text-white py-1">Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
