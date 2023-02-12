import React from 'react'
import { useParams } from 'react-router-dom'

export default function ChiTietPhim() {
    let {maphim} = useParams();
    console.log(maphim)
  return (
    <div>Mã Phim: {maphim}</div>
  )
}
