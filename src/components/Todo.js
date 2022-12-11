import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

function Todo(props) {

    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.name);
    const [newDescription, setNewDescription] = useState(props.description);

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const wasEditing = usePrevious(isEditing);

    function handleNameChange(event) {
        setNewName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setNewDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(`submit ${props.id}: ${props.name}`)
        props.editTask(props.id, newName, newDescription);
        setNewName(newName);
        setNewDescription(newDescription);
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                    ref={editFieldRef}
                />

                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newDescription}
                    onChange={handleDescriptionChange}
                    ref={editFieldRef}
                />

            </div>

            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
                    Cancel
                    <span className="visually-hidden">
                        renaming {props.name}
                    </span>
                </button>
                <button type="submit" className="btn btn-primary todo-edit">
                    Save
                    <span className="visually-hidden">
                        new name for {props.name}
                    </span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() =>
                        props.toggleTaskCompleted(props.id)
                    }
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>

            </div>

            <div className="cu-text">
                {props.description}
            </div>

            <div className="btn-group">
                <button type="button" className="btn" onClick={() => setEditing(true)} ref={editButtonRef}>
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() =>
                        props.deleteTask(props.id)
                    }
                >
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }

    }, [wasEditing, isEditing]);

    console.log("main render");

    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;