import React, { useEffect, useState } from "react";
import "./NamesListComponent.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useLocalStorage from "./useLocalStorage";

function NamesListComponent() {
  const styles = {
    mrg: { marginTop: "40px" },
  };

  const [names, setNames] = useLocalStorage("names", []);
  const [input, setInput] = useState("");

  const inputValue = (e) => {
    setInput(e.target.value);
  };

  const addNames = () => {
    const now = new Date();
    const formatted = now.toLocaleString();
    setNames([...names, { id: uuidv4(), name: input, date: formatted }]);
    setInput("");
  };

  const onEnterClick = (e) => {
    if (e.key === "Enter") {
      const now = new Date();
      const formatted = now.toLocaleString();
      setNames([...names, { id: uuidv4(), name: input, date: formatted }]);
      setInput("");
    }
  };

  const deleteUser = (id) => {
    setNames(names.filter((name) => name.id !== id));
  };

  return (
    <div>
      <div className="elmenets_list">
        <TextField
          label="Add a new user"
          value={input}
          onChange={inputValue}
          onKeyDown={onEnterClick}
        />
        <Button variant="contained" color="primary" onClick={addNames}>
          <AddIcon fontSize="large" />
        </Button>
      </div>
      <TableContainer component={Paper} style={styles.mrg}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Names</TableCell>
              <TableCell>Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {names.map((element) => (
              <TableRow key={element.id}>
                <TableCell>{element.id}</TableCell>
                <TableCell>{element.name}</TableCell>
                <TableCell>{element.date}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    color="error"
                    onClick={() => deleteUser(element.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default NamesListComponent;
