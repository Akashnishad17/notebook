import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

const AddNote = () => {
    const noteContext = useContext(NoteContext);
    const {addNote} = noteContext;
    const [note, setNote] = useState({title: '', description: '', tag: 'General'});

    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
    };

    const handleChange = (event) => {
        setNote({...note, [event.target.name]: event.target.value});
    };

    return (
        <>
            <div className="container my-3">
                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
                </form>
            </div>
        </>
    );
};

export default AddNote;
