
const initialState = {
    users: [],
    loggedInUser: null,
    error: null,
    notes: [], 
    currentUser: null,
    isLoggedIn: false,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_USER':
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      case 'LOGIN_USER_SUCCESS':
        return {
          ...state,
          loggedInUser: action.payload,
          error: null,
        };
      case 'LOGIN_USER_FAILURE':
        return {
          ...state,
          loggedInUser: null,
          error: action.payload,
        };
      case 'SET_NOTES':
        return {
          ...state,
          notes: action.payload,
        };
      case 'DELETE_NOTE':
        return {
          ...state,
          notes: state.notes.filter((note) => note.id !== action.payload),
        };
        case 'ADD_NOTE':
  return {
    ...state,
    notes: [...state.notes, action.payload],
  };

  case 'UPDATE_NOTE':
  return {
    ...state,
    notes: state.notes.map((note) =>
      note.id === action.payload.id ? { ...action.payload, createdAt: note.createdAt } : note
    ),
  };
 
      case 'LOGIN_USER':
        return {
          ...state,
          currentUser: action.payload,
          isLoggedIn: true,
        };
      case 'LOGOUT_USER':
        return {
          ...state,
          currentUser: null,
          isLoggedIn: false,
        };

      default:
        return state;
    }
  };
  
  export default rootReducer;
  