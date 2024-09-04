import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, editTask, important } from './redux/reducer';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';

function App() {
  const [taskText, setTaskText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [newText, setNewText] = useState('');
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText('');
    }
  };

  const handleSaveEdit = () => {
    if (newText.trim()) {
      dispatch(editTask(editingIndex, newText));
      setEditingIndex(null);
      setNewText('');
    }
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Tasks</h1>
                <input
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  placeholder="New task"
                />
                <button onClick={handleAddTask}>Add</button>
                <ul>
                  {tasks.map((task, index) => (
                    <li key={index} className={task.important ? 'important' : ''}>
                      {editingIndex === index ? (
                        <>
                          <input
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                          />
                          <button onClick={handleSaveEdit}>Save</button>
                          <button onClick={() => setEditingIndex(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <span>{task.text}</span>
                          <input
                            type="checkbox"
                            className={`important-checkbox ${task.important ? 'checked' : ''}`}
                            onChange={() => dispatch(important(index))}
                            checked={task.important}
                          />
                          <button onClick={() => dispatch(deleteTask(index))}>x</button>
                          <button onClick={() => { setEditingIndex(index); setNewText(task.text); }}>Edit</button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            }
          />
          <Route path="/about" element={<h2>About this app</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
