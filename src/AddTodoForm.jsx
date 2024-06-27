import React from "react";

export default function AddTodoForm(){
return(
  <div>
    <form>
      <label for="todoTitle">Title</label>
      <input type="text" id="todoTitle" />
      <button className="submit-btn">Add</button>
    </form>
  </div>
)
}