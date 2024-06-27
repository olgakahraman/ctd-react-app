import React from "react";
import TodoListItem from "./TodoListItem";


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
      return  <TodoListItem item={item} key = {item.id}/>
    })}
  </ul>
  </div>
  )
}