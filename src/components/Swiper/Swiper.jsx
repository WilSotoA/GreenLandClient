import React from "react";
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

//lo saque de aqui https://codesandbox.io/s/ecstatic-curran-cr2g90?file=/src/App.js&resolutionWidth=748&resolutionHeight=675
export const SimpleSlider = () => {
    const allProducts = useSelector((state) => state.allProducts);
    
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "10px",
      slidesToShow: 3,
      speed: 2000,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 740, // Cambiar el número aquí según el punto de quiebre deseado
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480, // Cambiar el número aquí según el punto de quiebre deseado
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 1630, // Puedes agregar más puntos de quiebre según sea necesario
          settings: {
            slidesToShow: 3
          }
        }
      ]
    };
    
    return (
      <div className="container">
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <style>{cssstyle}</style>
        <h2>New Arrivals</h2>
        <Slider {...settings}>
          {allProducts.map((product, index) => (
            <div key={index}>
              <h3>
                <img
                    src={product.image}
                    alt={`Imagen ${index + 1}`}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
                />
                <NavLink to={`/detail/${product.id}`}>
                    <div className="link"><p>{product.name}</p></div>
                </NavLink>
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    );
};

const cssstyle = `
.container {
  margin: 0 auto;
  padding: 0px 40px 0px 40px;
  width: 900px;
}

.container h3 {
    height: 100%;
    background: #D0E1D6;
    color: #fff;
    font-size: 36px;
    line-height: 100px;
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
    display:flex;
    justify-content:center;
    flex-direction:column;
}

.link {
    margin: 0;
    padding: 0;
    font-size: 10px;
    height: 25px;
    background: #8CB799;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    text-decoration: none;
    color: black;
    font-family: var(--fontGlobal);
    border: none;
    position: relative; /* Agrega position para permitir el ajuste de altura */
}

.link p {
    margin: 0;
    height: 100%; /* Establece la altura del párrafo al 100% */
    display: flex;
    align-items: center; /* Centra verticalmente el contenido del párrafo */
    justify-content: center; /* Centra horizontalmente el contenido del párrafo */
}

.slick-next:before, .slick-prev:before {
    color: #8CB799;
}

.center .slick-center h3 {
    color: #e67e22;
    opacity: 1;
    -ms-transform: scale(1.08);
    transform: scale(1.08);
}

.center h3 {
    transition: all .10s ease;
}

@media (min-width: 741px) and (max-width: 1630px) {
  .container {
    width: 700px; /* Cambia el ancho para pantallas más pequeñas */
  }
}

@media (min-width: 481px) and (max-width: 740px) {
  .container {
    width: 400px; /* Cambia el ancho para pantallas aún más pequeñas */
  }
}

@media (max-width: 480px) {
  .container {
    width: 290px; /* Cambia el ancho para pantallas muy pequeñas */
  }
}
`;