import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const noteContext = useContext(NoteContext);
    const {notes, getNotes, updateNote} = noteContext;
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({_id: '', title: '', description: '', tag: ''});
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const updateCurrentNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote); 
    }

    const handleClick = () => {
        refClose.current.click();
        updateNote(note._id, note.title, note.description, note.tag);
    };

    const handleChange = (event) => {
        setNote({...note, [event.target.name]: event.target.value});
    };

    return (
        <>
            <AddNote />
            <button hidden type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange} minLength={3} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} />
                        </div>
                    </form>
                    </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length < 3 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">{notes.length === 0 && 'No Notes to display'}</div>
                {notes.map(note => <NoteItem key={note._id} note={note} updateNote={updateCurrentNote} />)}
            </div>
        </>
    );
};

export default Notes;
