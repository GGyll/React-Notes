import React, {useState, useEffect} from 'react'
// import notes from '../assets/data'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrowleft } from "../assets/arrow-left.svg";

const NotePage = (props) => {
  let [note, setNote] = useState(null)  
  const history = useNavigate();
    let param = useParams();
    let noteid = param.id;
 
    // let note = notes.find(note => note.id === Number(noteid));
  

  useEffect(() => {
    getNote()
  }, [noteid])

  let getNote = async () => {
    if (noteid === 'new') return
    let response = await fetch(`http://localhost:8000/notes/${noteid}`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...note, 'updated': new Date() })
    })
}

  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${noteid}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...note, 'updated': new Date() })
    })
}

  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${noteid}`, {
      method:'DELETE',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(note)
    }
    )
    history('/')
  }

  let handleSubmit = () => {
    
    if(noteid !== 'new' && !note.body) {
      deleteNote()
    }else if(noteid !== 'new') {
      updateNote() 
    }else if(noteid === 'new' && note !== null) {
      createNote()
    }
    
    history('/')
  }

  return (
    <div className='note'>
        <div className='note-header'>
          <h3>
            <Link to='/' >
              <Arrowleft onClick={handleSubmit} />
            </Link>
          </h3>
          <Link to='/' >
            {noteid !== 'new' ? (
              <button onClick={deleteNote}>Delete</button>
            ):  (
              <button onClick={handleSubmit}>Done</button>
            )}
          
          </Link>
        </div>
        {/* ? prevents error from note id not found */}
        <textarea onChange={(e)=> {setNote({...note, 'body':e.target.value})}} value={note?.body}>

        </textarea>
    </div>
  )
}

export default NotePage