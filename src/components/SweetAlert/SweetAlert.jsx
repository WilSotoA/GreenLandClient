import Swal from 'sweetalert2'
import styled from '../SweetAlert/SweetAlert.module.css'

// background: 'var(--verdePrincipal)'
export const alertConfirm = (icon, title, text, html, footer) => {

    return (
        Swal.fire({
            icon: icon, // tipo de imagen warning, succes,error,info
            title: title, // nombre del titulo 'warning!',
            text: text, // nombre del contenido 'you want to remove the product from your wish list',
            html: html,
            footer: footer,
            color: 'black',
            iconColor: 'green',
            background: 'var(--verdeClaro)',
            confirmButtonText: 'Accept',
            confirmButtonColor: 'var(--verdePrincipal)',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'var(--verdePrincipal)',
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            stopKeydownPropagation: false,

            customClass: {
                popup: 'popupClass'
            },
        })
            .then(res => {
                return res.isConfirmed;
            })
    )
}

export const alertAcept = (icon, title, text, html, footer) => {

    return (
        Swal.fire({
            icon: icon, // tipo de imagen warning, succes,error,info
            title: title, // nombre del titulo 'warning!',
            text: text, // nombre del contenido 'you want to remove the product from your wish list',
            html: html,
            footer: footer,
            color: 'black',
            iconColor: 'green',
            background: 'var(--verdeClaro)',
            confirmButtonText: 'Accept',
            confirmButtonColor: 'var(--verdePrincipal)',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            stopKeydownPropagation: false,
        })
    )
}
