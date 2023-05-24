import React,{useContext} from 'react'
import noteContext from '../context/notes/notesContext';

export default function NoteItem(props) {
    const {note,updateNote}=props;
    const  context = useContext(noteContext)
    const {deleteNote}=context;

  return (
    <div className="my-3 col-md-4">
        <div className="card" >
        <div className="card-body">
            <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>

            <i className="fa-regular fa-pen-to-square ms-2" onClick={()=>{updateNote(note)}}></i>
            
            </div>
            <p className="card-text">{note.description}</p>
            
        </div>
        </div>

        </div>
    
  )
}
