import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const HOST = 'http://localhost:5000';
    const [notes, setNotes] = useState([]);

    const getNotes = async() => {
        const response = await fetch(`${HOST}/api/notes/getnotes`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzc5MjRhOGM0OTQyNjE0MTUzMjE0In0sImlhdCI6MTY3Nzk5OTE0N30.bpuRL9hhsem2v0M-iiNt1zGjdejuHEaUu85OcoEBAhM'
                }
            }
        );
        const notes = await response.json();
        setNotes(notes);
    };

    const addNote = async(title, description, tag) => {
        const response = await fetch(`${HOST}/api/notes/addnote`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzc5MjRhOGM0OTQyNjE0MTUzMjE0In0sImlhdCI6MTY3Nzk5OTE0N30.bpuRL9hhsem2v0M-iiNt1zGjdejuHEaUu85OcoEBAhM'
                },
                body: JSON.stringify({title, description, tag})
            }
        );
        const note = await response.json();
        setNotes(notes.concat(note));
    };

    const deleteNote = async(id) => {
        const response = await fetch(`${HOST}/api/notes/deletenote/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzc5MjRhOGM0OTQyNjE0MTUzMjE0In0sImlhdCI6MTY3Nzk5OTE0N30.bpuRL9hhsem2v0M-iiNt1zGjdejuHEaUu85OcoEBAhM'
                }
            }
        );
        await response.json();
        setNotes(notes.filter(note => note._id !== id));
    };
    
    const updateNote = async(id, title, description, tag) => {
        const response = await fetch(`${HOST}/api/notes/updatenote/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzc5MjRhOGM0OTQyNjE0MTUzMjE0In0sImlhdCI6MTY3Nzk5OTE0N30.bpuRL9hhsem2v0M-iiNt1zGjdejuHEaUu85OcoEBAhM'
                },
                body: JSON.stringify({title, description, tag})
            }
        );
        const note = await response.json();
        const element = notes.filter(note => note._id === id)[0];
        element.title = note.title;
        element.description = note.description;
        element.tag = note.tag;
    };

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;