import React from "react";


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

export default function TodoList(){
  return(
    <div>
    <ul>
    {todoList.map(function(item){
      return <li key={item.id}>{item.title}</li>
    })}
  </ul>
  </div>
  )
}