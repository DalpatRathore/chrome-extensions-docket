import React, { useState } from "react";
import { FormControl, List, ListItem, ListItemText } from "@material-ui/core";
import { Button, Modal, Input, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CancelIcon from "@material-ui/icons/Cancel";

import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord";

import db from "./Firebase";
import "./index.css";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%,-50%)`,
    width: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,250,.5)",
    backdropFilter: "blur(2px)",
    // backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
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
    if (input.length !== 0) {
      db.collection("todos").doc(props.todo.id).set(
        {
          todo: input,
        },
        { merge: true }
      );
    }

    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={e => setOpen(false)}>
        <div className={classes.paper}>
          <div>
            <h1>Modal</h1>
            <CancelIcon onClick={e => setOpen(false)} />
          </div>

          <form>
            <FormControl>
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={props.todo.todo}
              ></Input>

              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!input}
                onClick={updateTodo}
              >
                Update Todo
              </Button>
            </FormControl>
          </form>
        </div>
      </Modal>

      <List className="todo">
        <ListItem alignItems="flex-start" className="todo_item">
          <ListItemIcon alignItems="flex-start">
            <FiberSmartRecordIcon />
          </ListItemIcon>
          <ListItemText primary={props.todo.todo} secondary="1st April 2021" />
          <EditIcon onClick={e => setOpen(true)} />
          <DeleteForeverIcon
            onClick={e => db.collection("todos").doc(props.todo.id).delete()}
          />
        </ListItem>
      </List>
    </>
  );
}

export default Todo;
