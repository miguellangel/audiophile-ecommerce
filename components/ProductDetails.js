import { useEffect, useRef, useState } from "react"
import styles from './../styles/products.module.scss'
import styled from 'styled-components'
import { keyframes, css } from "styled-components"

const SwingIn = keyframes`
    0% {
        -webkit-transform: rotateX(-100deg);
        transform: rotateX(-100deg);
        -webkit-transform-origin: top;
        transform-origin: top;
        opacity: 0
    }

    100% {
        -webkit-transform: rotateX(0deg);
        transform: rotateX(0deg);
        -webkit-transform-origin: top;
        transform-origin: top;
        opacity: 1
    }
`
const SwingOut = keyframes`
    0% {
        -webkit-transform: rotateX(0deg);
        transform: rotateX(0deg);
        -webkit-transform-origin: top;
        transform-origin: top;
        opacity: 1
    }

    100% {
        -webkit-transform: rotateX(70deg);
        transform: rotateX(70deg);
        -webkit-transform-origin: top;
        transform-origin: top;
        opacity: 0
    }
`
const AnimMixin = css`
    animation: ${props => props.theme}
`
const StyledPopup = styled.div`
    display: flex;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #191919;
    z-index: 5;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    ${AnimMixin} .5s cubic-bezier(.175, .885, .32, 1.275) both;

    .closePopupContainer {
        position: absolute;
        width: 3%;
        height: 3%;
        translate:0 0;
        top: 80px;

        button {
            width: 100%;
            aspect-ratio: 1/1;
            background: rgba(0,0,0,0.05);
            border-radius: 3em;
            border: 1px solid white;
            color: white;
            
            &:hover {
                background: radial-gradient(palevioletred, transparent)
            }
        }
    }
    .detailsContainer {
        width: 80%;
        height: 80%;
        translate: 0 80px;
        z-index: 2;
    }
`
const theme = {
    "in": SwingIn,
    "out": SwingOut
}

const ProductDetails = ({setMount, product, setCurProduct}) => {
    const [ anim, setAnim ] = useState(theme['in'])
    const wrapper = useRef()

    const handleUnmount = (e) => {
        setAnim(SwingOut)
        /* finish animation before unmounting */
        setTimeout(() => {
            // updateStyle()
            setCurProduct(null)
            setMount(null)
        }, 600)
    }
    
    useEffect(() => {
    })
    return (
        <StyledPopup theme = { anim } className={`productDetailsWrapper .swing-in-top-fwd`} ref = { wrapper }>
            <div className={`closePopupContainer`}><button onClick={ handleUnmount }>x</button></div>
            <div className={`detailsContainer`}>

            </div>
        </StyledPopup>
    )
}
export default ProductDetails