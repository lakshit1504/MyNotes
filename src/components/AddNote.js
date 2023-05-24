import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/notesContext';

export const AddNote = () => {
    const  context = useContext(noteContext)
    const {addNote}=context;

    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div>
        <div className="container my-3">
        <h1>ADD NOTE-NoteBook</h1>
        <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">title</label>
              <input type="text" className="form-control" name="title" id="title" aria-describedby="emailHelp" onChange={onChange} value={note.title}/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">description</label>
              <textarea type="text" className="form-control" name="description" id="description" onChange={onChange} rows="4" value={note.description}/>
            </div>

            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Add Tag</label>
              <input type="text" className="form-control" name="tag" id="tag" onChange={onChange} value={note.tag}/>
            </div>
           
            <button disabled={note.title.length<1 || note.description.length<5 }  type="submit" className="btn btn-dark"onClick={handleClick}>Add to Notes</button>
          </form>
          </div>
    </div>
  )
}
