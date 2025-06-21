import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';

const Note = () => {
  const context = useContext(noteContext);
  const { notes, addNote, updateNote, getNotes } = context;
  const [data, setData] = useState({ title: "", description: "", tag: "" });
  const [editData, setEditData] = useState({ title: "", description: "", tag: "" });

  const auth = localStorage.getItem('token');
  useEffect(() => {
    if(auth){
      getNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(data.title, data.description, data.tag);
    formRef.current.reset();
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const ref = useRef(null);
  const editNote = (currentNote) => {
    ref.current.click();
    setEditData(currentNote);
  }

  const handleEChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }

  const handleUpdate = (e) => {
    const { _id, title, description, tag } = editData;
    updateNote(_id, title, description, tag);
  }


  return (
    <>
      <div className='my-4'>
        <h2 className='py-1'>Add Note</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={handleChange} placeholder="Enter title" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" id="description" name="description" onChange={handleChange} rows="3"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} placeholder="Enter Tag" />
          </div>
          <button type="submit" disabled={!(data.title.length > 4  && data.description.length > 4)} className="btn btn-primary my-2">Submit</button>
        </form>
      </div>


      {/* edit */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>Lunch modal</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" name="title" onChange={handleEChange} value={editData.title} placeholder="Enter title" />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" id="description" name="description" onChange={handleEChange} value={editData.description} rows="3"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="tag">Tag</label>
                  <input type="text" className="form-control" id="tag" name="tag" onChange={handleEChange} value={editData.tag} placeholder="Enter Tag" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" disabled={!(editData.title.length > 4  && editData.description.length > 4)} className="btn btn-primary" onClick={handleUpdate} data-bs-dismiss='modal'>Save changes</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <h2 className='py-1'>Your Notes</h2>
        <div className="mx-1">{notes.length === 0 && "No notes !!"}</div>
        {notes.map((note) => {
            return <NoteItem key={note._id} editNote={editNote} note={note} />
          })
        }
      </div>
    </>
  )
}

export default Note
