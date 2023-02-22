import axios from "axios"
import { history } from "../../App"
import { token } from "../../types/globalConst"

const initialState = {
  movieDetail: {},
  ticketsRoom: {},
  mangGheDangChon: []
}

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {

    case "GET_MOVIE_DETAIL":

      state.movieDetail = { ...action.movieDetail }
      return { ...state }

    case "GET_TICKETS_ROOM":
      state.ticketsRoom = { ...action.ticketsRoom }
      return { ...state }

    case "CHON_GHE":
      let gheTK = state.mangGheDangChon.find(gheDangChon => gheDangChon.maGhe == action.maGhe)
      if (gheTK) {
        state.mangGheDangChon = state.mangGheDangChon.filter(gheDangChonFilter => gheDangChonFilter.maGhe != action.maGhe)
      } else {
        let gheChon = {
          maGhe: action.maGhe,
          giaVe: action.giaVe
        }
        state.mangGheDangChon = [...state.mangGheDangChon, gheChon]
      }
      return { ...state }

    case "DAT_GHE_THANH_CONG":
      state.mangGheDangChon = []
      // history.goBack();
      window.location.reload(false);
      return { ...state }

    case "RESET_GHE":
      state.mangGheDangChon = []
      return { ...state }
    default:
      return state
  }
}
