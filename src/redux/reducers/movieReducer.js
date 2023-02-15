const initialState = {
    movieDetail: {}
}

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {

  case "GET_MOVIE_DETAIL":
    state.movieDetail = {...action.movieDetail}
    return { ...state}

  default:
    return state
  }
}
