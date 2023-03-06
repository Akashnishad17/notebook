import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const HOST = 'http://localhost:5000';
    const [notes, setNotes] = useState([]);
    const {showAlert} = props;

    const getNotes = async() => {
        const response = await fetch(`${HOST}/api/notes/getnotes`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
        );
        const json = await response.json();

        if(json.success) {
            setNotes(json.notes);
        }
    };

    const addNote = async(title, description, tag) => {
        const response = await fetch(`${HOST}/api/notes/addnote`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({title, description, tag})
            }
        );
        const json = await response.json();

        if(json.success) {
            setNotes(notes.concat(json.note));
            showAlert('success', 'Note Added successfully');
        } else {
            showAlert('danger', 'Unable to add Note');
        }
    };

    const deleteNote = async(id) => {
        const response = await fetch(`${HOST}/api/notes/deletenote/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
        );
        const json = await response.json();

        if(json.success) {
            setNotes(notes.filter(note => note._id !== id));
            showAlert('success', 'Note Deleted Successfully');
        } else {
            showAlert('danger', 'Unable to delete Note');
        }
    };
    
    const updateNote = async(id, title, description, tag) => {
        const response = await fetch(`${HOST}/api/notes/updatenote/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({title, description, tag})
            }
        );
        const json = await response.json();

        if(json.success) {
            let clonedNotes = JSON.parse(JSON.stringify(notes));
            
            for(let i = 0; i < clonedNotes.length; i++) {
                if(json.note._id === clonedNotes[i]._id) {
                    clonedNotes[i].title = json.note.title;
                    clonedNotes[i].description = json.note.description;
                    clonedNotes[i].tag = json.note.tag;
                    break;
                }
            }
            setNotes(clonedNotes);
            showAlert('success', 'Note Updated Successfully');
        } else {
            showAlert('danger', 'Unable to update Note');
        }
    };

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;