import React from "react";

export default function AddTodoForm(){
  function handleAddTodo(event){
event.preventDefault();
let todoTitle = document.querySelector("#todoTitle").value;
console.log(todoTitle);
event.target.reset();
  }
return(
  <div>
    <form onSubmit = {handleAddTodo}> 
      <label htmlFor="todoTitle" >Title</label>
      <input type="text" id="todoTitle" name="title"/>
      <button className="submit-btn">Add</button>
    </form>
  </div>
)

}