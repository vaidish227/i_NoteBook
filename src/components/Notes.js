import React,{useContext, useEffect} from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
function Notes() {
    const context = useContext(noteContext);
    const {notes, getNote} = context;
    useEffect(() => {
      getNote()
    }, [ ])
    
  return (
    <>
    <AddNote/>
    <div className="row my-3">
      <h1>Your Notes</h1>
      {notes.map((note)=>{
        return <Noteitem key={note._id} note={note}/>
      })}
      </div>
      </>
  )
}

export default Notes