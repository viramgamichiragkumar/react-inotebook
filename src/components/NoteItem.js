import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const {note} = props;
    return (
        <>
        <div className='col-3 my-2'>
            <div className="card" style={{ minHeight:'100%' }}>
                <div className="card-header d-flex align-items-center justify-content-between">
                    {note.title}
                    <div>
                     <i className="fa-solid fa-edit btn btn-primary mx-1" onClick={()=>{props.editNote(note)}}></i>
                     <i className="fa-solid fa-trash btn btn-danger mx-1" onClick={()=>{deleteNote(note._id)}}></i>
                    </div>
                </div>
                <div className="card-body">
                    <div>{note.description}</div>
                    <div className="badge bg-danger">{note.tag}</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default NoteItem
