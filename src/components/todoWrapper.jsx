import React, { useState, useEffect } from "react";
import AddTodoForm from "./addTodoForm";
import axios from "axios";
import Todo from "./todos";

const TodoList = () => {
  const [todos, setTodo] = useState([]); //set todos
  const url = `https://australia-southeast1-morgan-business.cloudfunctions.net/api/todo`;

  //fetch initial todo
  useEffect(() => {
    fetchTodos();
  }, []);

  //get todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(url);
      // console.log(res.data.data.items.data);
      const todos = res.data.data.items.data;
      setTodo(todos);
      // setIsLoading(false);
      //   console.log(todos[0].data.title);
    } catch (error) {
      console.log("Error fetching todos:", error);
      // setIsLoading(false);
    }
  };

  //add todos
  const addTodo = async (value) => {
    //init a new todo
    try {
      const newTask = {
        content: value,
        completed: false,
      };
      await axios.post(url, newTask);
      fetchTodos();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //update todo
  const updateTodo = async (id, newContent, complete) => {
    try {
      await axios.put(`${url}/${id}`, {
        content: newContent,
        complete: complete,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //delete todo
  const deleteTodo = async (id) => {
    try {
      //delete request
      await axios.delete(`${url}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AddTodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={() => deleteTodo(todo.id)}
          updateTodo={updateTodo}
        />
      ))}
    </>
  );
};
export default TodoList;
