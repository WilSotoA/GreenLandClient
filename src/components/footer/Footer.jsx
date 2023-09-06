import styled from "./Footer.module.css"
import { Link } from "react-router-dom";
import image from "../../assets/index"

export const Footer = () => {

    return (
        <footer className={styled.container}>
            {/* <div className={styled.grupo1}>
                <img className={styled.logo_greenland} src={image.logo_greenland} alt="logo" />
            </div> */}
            <div className={styled.grupo2}>
                <div className={styled.left}>
                    <h3>© 2023 Green Landº</h3>
                </div>
                <div className={styled.center}>
                    <Link className={styled.links} to="/about">About</Link>
                    <Link className={styled.links} to="/#">Privacy Policy</Link>
                    <Link className={styled.links} to="/#">License</Link>
                    <Link className={styled.links} to="/contact">Contact</Link>
                    <Link className={styled.links} to="/undo-purchase">⇄Purchase regret</Link> {/* Nuevo botón de arrepentimiento */}
                </div>
                <div className={styled.right}>
                    <Link className={styled.icon_image} to="https://youtube.com/" target="_blank">
                        <img src={image.logo_youtube} />
                    </Link>
                    <Link className={styled.icon_image} to="https://www.instagram.com/" target="_blank">
                        <img src={image.logo_instagram} />
                    </Link>
                    <Link className={styled.icon_image} to="https://twitter.com/" target="_blank">
                        <img src={image.logo_twitter} />
                    </Link>
                    <Link className={styled.icon_image} to="https://www.facebook.com/" target="_blank">
                        <img src={image.logo_facebook} />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

