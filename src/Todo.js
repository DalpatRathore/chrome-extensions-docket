import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Button, Modal, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import db from "./Firebase";
import "./index.css";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={e => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Modal</h1>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={props.todo.todo}
          ></Input>
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>

      <List className="todo">
        <ListItem>
          <ListItemText primary={props.todo.todo} secondary="Dummy DeadlLine" />
        </ListItem>
        <Button onClick={e => setOpen(true)}>Edit</Button>
        <Button
          color="danger"
          onClick={e => db.collection("todos").doc(props.todo.id).delete()}
        >
          Delete
        </Button>
      </List>
    </>
  );
}

export default Todo;
