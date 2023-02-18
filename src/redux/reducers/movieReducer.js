const initialState = {
    movieDetail: {},
    ticketsRoom: {}
}

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {

  case "GET_MOVIE_DETAIL":
    
    state.movieDetail = {...action.movieDetail}
    return { ...state}

  case "GET_TICKETS_ROOM":  
    state.ticketsRoom = {...action.ticketsRoom}
    return {...state}
  default:
    return state
  }
}
