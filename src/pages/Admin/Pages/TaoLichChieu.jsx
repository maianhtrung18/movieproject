import React, { useEffect, useState } from 'react'
import { history } from '../../../App';
import { taoLichChieuAPI, thongTinCumRapTheoHeThongAPI, thongTinHeThongRapAPI } from '../../../API/api';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { TOKEN } from '../../../ulti/setting';


export default function TaoLichChieu() {

    let { maphim } = useParams();
    let [heThongRap, setHeThongRap] = useState([])
    let [cumRap, setCumRap] = useState([])
    let [values, setValues] = useState({
        heThongRap: "",
        maRap: "",
        ngayChieuGioChieu: "",
        giaVe: ""
    })


    useEffect(() => {
        getThongTinHeThongRap()
    }, []);

    useEffect(() => {
        console.log("updating")
        getThongTinCumRapTheoHeThong()
    }, [values.heThongRap]);


    const handleOnChange = (event) => {
        let { value, name } = event.target;
        let newValues = { ...values }
        newValues[name] = value;

        let typeform = event.target.getAttribute("typeform")
        if (typeform == "ngayChieuGioChieu") {
            newValues[name] = moment(value).format('DD/MM/YYYY HH:mm:ss')
        }

        setValues(newValues)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        let accessToken =''
        let lichChieu = {
            maphim: maphim,
            maRap: values.maRap,
            ngayChieuGioChieu: values.ngayChieuGioChieu,
            giaVe: values.giaVe
        }
    if(lichChieu.giaVe < 75000 || lichChieu.giaVe > 90000){
        alert("Tạo lịch không thành công, giá vé phải từ 75.000 -> 90.000")
    } else{
        if(localStorage.getItem(TOKEN)){
            accessToken = localStorage.getItem(TOKEN)  
   }
       let promise = taoLichChieuAPI(lichChieu,accessToken)
       promise.then((result) => { 
           console.log(result);
           alert("Tạo lịch chiếu thành công!")
        })
        .catch((error) => { 
           console.log(error);
         })
    }   
    }

    const getThongTinHeThongRap = () => {
        let promise = thongTinHeThongRapAPI();
        promise.then((result) => {
            console.log(result.data.content)
            setHeThongRap(result.data.content)
            setValues({
                ...values,
                heThongRap: result.data.content[0].maHeThongRap 
            })
        })
            .catch((error) => {
                console.log(error)
            })
    }

    const getThongTinCumRapTheoHeThong = () => {
        if (values.heThongRap != "") {
            let promise = thongTinCumRapTheoHeThongAPI(values.heThongRap);
            promise.then((result) => {
                setCumRap(result.data.content);
                setValues({
                    ...values,
                    maRap: result.data.content[0].maCumRap
                })
            })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    const renderHeThongRap = () => {
        return heThongRap.map((heThongRapChieu) => {
            return <>
                <option value={heThongRapChieu.maHeThongRap}>{heThongRapChieu.tenHeThongRap}</option>
            </>
        })
    }

    const renderCumRap = () => {
        return cumRap.map((cumRapChieu) => {
            return <>
                <option value={cumRapChieu.maCumRap}>{cumRapChieu.tenCumRap}</option>
            </>
        })
    }

    console.log(values);
    console.log(maphim)
    return (
        <div>
            <div className="container">
                <div className="taoLichChieu__formTable">
                    <form onSubmit={handleOnSubmit}>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Hệ thống rạp</td>
                                    <td>
                                        <select className="form-control" onChange={handleOnChange} name="heThongRap">
                                            {renderHeThongRap()}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Cụm rạp</td>
                                    <td>
                                        <select className="form-control" onChange={handleOnChange} name="maRap">
                                            {renderCumRap()}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ngày chiếu giờ chiếu</td>
                                    <td>
                                        <input className="form-control" typeform="ngayChieuGioChieu" onChange={handleOnChange} type="datetime-local" name='ngayChieuGioChieu' />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Giá vé</td>
                                    <td>
                                        <input className="form-control" onChange={handleOnChange} name="giaVe" type="text" placeholder='Giá vé' />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Chức năng</td>
                                    <td>
                                        <button className='btn btn-primary'>Click</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>

        </div>
    )
}
