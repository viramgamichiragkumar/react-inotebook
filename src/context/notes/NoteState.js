import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const host = 'http://localhost:5000/';
  

  const getNotes = async () => {
    if(localStorage.getItem('token')){
      setNotes([]);
      const response = await fetch(`${host}api/notes/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      if(json.success){
        setNotes(json.notes);
      }
    }
  }

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}api/notes/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}), 
    });
    const note = await response.json();
    console.log(note);
    getNotes();
  }

  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}), 
    });
    const json = await response.json();
    console.log(json);
    getNotes();
  }
  
  const deleteNote = async (id) => {
    const response = await fetch(`${host}api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    await response.json();

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  }
  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, updateNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;