import React, { useState } from "react";

function Form(props) {

    const [name, setName] = useState('New Task');
    const [description, setDescription] = useState('New description');

    function handleSubmit(event) {
        event.preventDefault();
        props.addTask(name, description);
        setName('New Task');
        setDescription('New description');
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input-name"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleNameChange}
            />

            <input
                type="text"
                id="new-todo-input-description"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={description}
                onChange={handleDescriptionChange}
            />

            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

export default Form;