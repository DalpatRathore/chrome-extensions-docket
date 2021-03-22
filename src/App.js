import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Todo from "./Todo";
import db from "./Firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setTodos(
          snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, [input]);

  const addTodo = e => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="app">
      <h1>Todo App</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={e => setInput(e.target.value)}></Input>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
          disabled={!input}
        >
          Add Todo
        </Button>
        <ul>
          {todos.map(todo => (
            <Todo todo={todo}></Todo>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
