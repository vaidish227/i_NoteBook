import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) =>{
  const host  = "http://localhost:5000"
  const notesInitial = [
      ]
    const [notes,setNotes] = useState(notesInitial)

     //Get all note
     const getNote = async() =>{

      //Api call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmZmM3ZjBkZDkzN2FkZDZjOTIzYTgzIn0sImlhdCI6MTcxMTI2MjkxM30.0rl_0OoR0yztbIEk7efgF6x3IVBcK3cXHKFx9DfPStA"
        },
        
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }

    //Add note
    const addNote = async(title, description , tag) =>{
      ///todo api call
      //Api call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmZmM3ZjBkZDkzN2FkZDZjOTIzYTgzIn0sImlhdCI6MTcxMTI2MjkxM30.0rl_0OoR0yztbIEk7efgF6x3IVBcK3cXHKFx9DfPStA"
        },
    
        body: JSON.stringify({title, description, tag}),   
      });
     

      const note = {
        "_id": "66003a36f7988aeec5bc1528d11",
        "user": "65ffc7f0dd937add6c923a83",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-03-24T14:35:34.272Z",
        "__v": 0
      };
      setNotes(notes.concat(note))
    }
    //delete note
    const deleteNote = (id) =>{
      //todo api call
      console.log("Deleting the note with id " + id);
      const newNotes = notes.filter((note)=> {return note._id!==id})
      setNotes(newNotes)
    }
    //edit note
    const editNote = async (id, title, description,tag) =>{
      //Api call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmZmM3ZjBkZDkzN2FkZDZjOTIzYTgzIn0sImlhdCI6MTcxMTI2MjkxM30.0rl_0OoR0yztbIEk7efgF6x3IVBcK3cXHKFx9DfPStA"
        },
    
        body: JSON.stringify({title, description, tag}),   
      });
     const json = response.json();
    
      //Logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id===id){
          element.title = title;
          element.description =description;
          element.tag = tag;

        }
      }
    }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote ,editNote , getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState