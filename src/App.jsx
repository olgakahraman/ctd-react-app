import React from 'react';
import './App.css';

let todoList=[
  {
    id: 1,
    title: "clean"
  },
  {
    id: 2,
    title: "cook"
  },
  {
    id: 3,
    title: "wash"
  }
];

function App() {
  return (
   <div>
    <h1>Todo List</h1>
    <ul>
      {todoList.map(function(item){
        return <li key={item.id}>{item.title}</li>
      })}
    </ul>
   </div>
  )
}
export default App
