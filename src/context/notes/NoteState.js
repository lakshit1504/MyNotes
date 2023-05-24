import React ,{useState} from "react";
import NoteContext from "./notesContext";
import { json } from "react-router-dom";

const NoteState=(props)=>{
    let host="http://localhost:8080"
    const notesinitial=[]
      const [notes, setNotes] = useState(notesinitial)


      //get all notes
      const getall=async ()=>{

        const response = await fetch(`${host}/api/notes/allnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            // mode: "cors", // no-cors, *cors, same-origin
            
           
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token'),
            } 
          });
          let json=await response.json()
          console.log(json)
          setNotes(json)
        
      }


      //adding a note
      const addNote=async (title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/createnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            
           
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token'),
            } ,
            body: JSON.stringify({title,description,tag}),
          });
          const note= await response.json()
          setNotes(notes.concat(note));
          
      }
      //deleting a note
      const deleteNote=async (id)=>{

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            
           
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
          });
          let json= await response.json()
          console.log(json)
        
        const newNotes=notes.filter((notes)=>{return notes._id!==id})
        setNotes(newNotes)
        
      }
      //edit a note
      const editNote=async (id,title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            
           
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({title,description,tag}), 
          });

          let newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
           

            if(newNotes[index]._id===id){
                newNotes[index].title=title;
                newNotes[index].description=description;
                newNotes[index].tag=tag;
                break;
            }
            
        }
        setNotes(newNotes)
      }

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getall}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;