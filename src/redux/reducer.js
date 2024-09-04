const ADD_TASK = 'tasks/add';
const DELETE_TASK = 'tasks/delete';
const EDIT_TASK = 'tasks/edit';
const IMPORTANT = 'tasks/important';

export const addTask = (text) => ({ type: ADD_TASK, text });
export const deleteTask = (index) => ({ type: DELETE_TASK, index });
export const editTask = (index, newText) => ({ type: EDIT_TASK, index, newText });
export const important = (index) => ({ type: IMPORTANT, index });

export default function tasksReducer(state = [], action) {
  switch (action.type) {
    case ADD_TASK:
      return [...state, { text: action.text, important: false, completed: false }];
    case DELETE_TASK:
      return state.filter((_, index) => index !== action.index);
    case EDIT_TASK:
      return state.map((task, index) => 
        index === action.index ? { ...task, text: action.newText } : task
      );
    case IMPORTANT:
      return state.map((task, index) => 
        index === action.index ? { ...task, important: !task.important } : task
      );
    default:
      return state;
  }
}
