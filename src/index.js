import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const DATA = [
    { id: "todo-0", name: "Eat", description: "Dinner", completed: false },
    { id: "todo-1", name: "Sleep", description: "8 hours", completed: false },
    { id: "todo-2", name: "Repeat", description: "Every day", completed: false }
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App tasks={DATA} />
);

// ReactDOM.render(<App tasks={DATA} />, document.getElementById("root"));
