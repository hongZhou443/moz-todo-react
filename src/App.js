import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid"; // npm install nanoid
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same id as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose 'completed' prop has been inverted
        return { ...task, completed: !task.completed }
      }

      return task;
    })
    setTasks(updatedTasks);
  }

  function addTask(name, description) {
    const newTask = { id: `todo-${nanoid()}`, name: name, description: description, completed: false };
    setTasks([...tasks, newTask]);
  }

  function editTask(id, newName, newDescription) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same id as the edited task
      if (id === task.id) {
        return { ...task, name: newName, description: newDescription }
      }
      return task
    })
    setTasks(editedTaskList)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
    // console.log(`removed task ${id}`);
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      description={task.description}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
      deleteTask={deleteTask}
    />
  ));

  const filterList = FILTER_NAMES.map((name) =>
  (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const taskNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  const listHeadingRef = useRef(null);
  const previousTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if(tasks.length - previousTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, previousTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}


export default App;
