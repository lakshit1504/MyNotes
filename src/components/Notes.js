import React, { useContext, useEffect,useRef,useState } from "react";
import noteContext from "../context/notes/notesContext";
import NoteItem from "./NoteItem";
import { AddNote } from "./AddNote";
import {Navigate, useNavigate} from 'react-router-dom'

export default function Notes() {
  const navigate= useNavigate();
  const context = useContext(noteContext);
  const { notes, getall ,editNote} = context;
  useEffect(() => {
    
    if(localStorage.getItem('token')){
      getall();
      // console.log(localStorage.getItem('token'))
    }
    else{
      navigate('/login')
    }
    
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };

  const handleClick=(e)=>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click()
    }
    const onChange=(e)=>{ 
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <>
      <AddNote />

                
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref }>
            Launch demo modal
            </button>

            
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                        <div className="mb-3">
                        <label htmlFor="title" className="form-label">title</label>
                        <input type="text" className="form-control" name="etitle" id="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="description" className="form-label">description</label>
                        <input type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={onChange} minLength={6} required/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Add Tag</label>
                        <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={onChange} minLength={1} required/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.etitle.length<1 || note.edescription.length<5 } type="button" className="btn btn-dark" onClick={handleClick}>Update Note</button>
                </div>
                </div>
            </div>
            </div>

      <div className="row my-3 ">
        <h1>Your Notes</h1>
        {notes.map((Note) => {
          return (
            <NoteItem key={Note._id} note={Note} updateNote={updateNote}/>
          );
        })}
      </div>
    </>
  );
}
