import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const noteContext = useContext(NoteContext);
    const {deleteNote } = noteContext;
    const {note} = props;
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-alt mx-2" onClick={() => deleteNote(note._id)}></i>
                        <i className="fa-solid fa-edit mx-2"></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
                </div>
            </div>
        </>
    );
};

export default NoteItem;