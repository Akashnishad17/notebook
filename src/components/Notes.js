import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const noteContext = useContext(NoteContext);
    const {notes, getNotes} = noteContext;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map(note => <NoteItem key={note._id} note={note} />)}
            </div>
        </>
    );
};

export default Notes;
