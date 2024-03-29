import React,{useContext, useEffect, useRef, useState} from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
function Notes(props) {
    const context = useContext(noteContext);
    const {notes, getNote, editNote} = context;
    let navigate = useNavigate()
    useEffect(() => {
      if(localStorage.getItem('token')){
      getNote()}
      else{
        navigate("/login")
      }
      // eslint-disable-next-line
    }, [])
  
    const ref = useRef()
    const refclose = useRef()
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "default" })
    const updateNote = (currentNote) =>{
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
   }
   const handleClick = (e) => {
    
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click()
    props.showAlert("Updated Successfully","success")
    
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
<button  ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange}  minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange}  required/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled= {note.etitle.length<5|| note.edescription.length<5 } type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>

<div className="row my-3">
    <h1>Your Notes</h1>
    {Array.isArray(notes) && notes.length === 0 && 'no notes to display'}
    {Array.isArray(notes) && notes.map((note) => (
        <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
    ))}
</div>
      </>
  )
}

export default Notes