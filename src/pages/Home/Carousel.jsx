import React from 'react'



export default function Carousel() {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src='/img/carousel/1440wx600h-4-1674325136.jpeg' className="d-block w-100" alt="..." /> 
                </div>
                <div className="carousel-item">
                    <img src="/img/carousel/2048wx858h-4-1674400812.jpeg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="/img/carousel/lllll5.jpeg" className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-target="#carouselExampleControls" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-target="#carouselExampleControls" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </button>
        </div>

    )
}
