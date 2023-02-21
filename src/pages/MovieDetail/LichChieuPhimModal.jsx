import React from 'react'
import LichChieuPhim from './LichChieuPhim'
import { Button, Modal } from 'antd'

export default function LichChieuPhimModal(props) {

    let heThongRapChieuPhim = props.movieDetail.heThongRapChieu ? props.movieDetail.heThongRapChieu : [];
    
  return (
    <div>
         {/* Modal */}
        <Modal
        title= {heThongRapChieuPhim != 0 ? "Vui lòng chọn giờ chiếu bên dưới (Choose the movie time)" : "Phim sắp chiếu hoặc chưa có lịch chiếu"}
        centered
        open={props.open}
        onOk={() => props.setOpen(false)}
        onCancel={() => props.setOpen(false)}
        width={800}
      >
        <LichChieuPhim movieDetail={props.movieDetail}/>
      </Modal>
    </div>
  )
}
