
export const registerUser = (user) => ({
    type: 'REGISTER_USER',
    payload: user,
  });
  
  export const loginUser = (user) => ({
    type: 'LOGIN_USER_SUCCESS',
    payload: user,
  });
  
  export const login = (user) => ({
    type: 'LOGIN_USER',
    payload: user,
  });
  
  export const loginUserFailure = (error) => ({
    type: 'LOGIN_USER_FAILURE',
    payload: error,
  });
  
  export const logoutUser = () => ({
    type: 'LOGOUT_USER',
  });

  export const setNotes = (notes) => ({
    type: 'SET_NOTES',
    payload: notes,
  });
  
  export const deleteNote = (noteId) => ({
    type: 'DELETE_NOTE',
    payload: noteId,
  });

  export const addNote = (note) => ({
    type: 'ADD_NOTE',
    payload: note,
  });

export const updateNote = (note) => ({
    type: 'UPDATE_NOTE',
    payload: note,
  });

  export const setNote = (note) => ({
    type: 'SET_NOTE',
    payload: note,
  });