import React, {useEffect, useState} from 'react';
import './App.css';



const Todo = ({todo, todos, setTodos})=>{


const handleDelete =()=>{
setTodos(todos.filter((el) => el.id !== todo.id));
};

const handleDone = ()=>{
  setTodos(todos.map((el)=> {
    if(el.id === todo.id){
      return {...el, done: !el.done};
    }
    return el;
  }))
};
  return(
    <div id="todo_item" className={todo.done? "cross": ""}>
    <li>{todo.text}</li>
    <div id="control_buttons">
    <button id="mark" onClick={handleDone}>Mark As Done</button>
    <button id="delete" onClick={handleDelete}>Delete</button>
    </div>
    </div>
  );
};

function App() {


//STATE
const [input, setInput] = useState("");
const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState("all");
const [filtered, setFiltered] = useState([]);


//HANDLERS
const handleInput = (e)=>{
  setInput(e.target.value);
};



const handleSubmit = (e)=>{
  e.preventDefault();
  if(input === ""){
window.alert("Input is empty. Please enter a todo");
  }else{
  setTodos([
    ...todos,
    {id: Math.floor(Math.random()*1001), text: input, done: false}
  ]);

  setInput("");
}
};

  const handleFilter = (e)=>{
  setFilter(e.target.value);
};



  //SAVE AND RETRIEVE FROM LOCAL STORAGE


  useEffect(() => {
    const filterItems = () => {
  switch(filter){
    case "completed":
      setFiltered(todos.filter(el => el.done === true));
      break;
    case "uncompleted":
      setFiltered(todos.filter(el => el.done === false));
      break;
    default:
      setFiltered(todos);
      break;
  }
}
    filterItems();

  }, [ filter, todos]);


  return (
    <div className="App">
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo_text">Enter a todo: </label>
      <input type="text" name="todo_text" value={input} onChange={handleInput}/>
      <input type="submit" value="Add" />

      <select id="filters" name="filters" onChange={handleFilter}>
        <option value="all" defaultValue>All</option>
        <option value="completed" >Completed</option>
        <option value="uncompleted" >Uncompleted</option>
      </select>
    </form>

    <ul>
      {filtered.map((todo, i) => <Todo key={todo.id.toString()} todo={todo} todos= {todos} setTodos={setTodos}/>)}
    </ul>
    </div>
  );
}

export default App;
