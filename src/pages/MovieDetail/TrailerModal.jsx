import React from 'react'
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';

export default function TrailerModal(props) {
    let movieDetail = useSelector(state => state.movieReducer.movieDetail)
  return (
    <div>
         {/* Modal */}
         <div className="modal fade" onClick={() => {
          props.setPlayingVideo(false);
        }} id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{movieDetail.tenPhim}</h5>
                <button onClick={() => {
                  props.setPlayingVideo(false);
                }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <ReactPlayer
                  url={movieDetail.trailer}
                  width="100%"
                  height="480px"
                  playing={props.playingVideo}
                  controls={true}
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
