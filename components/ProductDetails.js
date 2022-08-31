import { useEffect, useRef, useState } from "react"
import styles from './../styles/products.module.scss'
import styled from 'styled-components'
import { keyframes, css } from "styled-components"
//import { urlObjectKeys } from "next/dist/next-server/lib/utils"
import images from '../prerender/image_api.json'

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
        opacity: 1;


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
    ${AnimMixin} .5s cubic-bezier(.175, .885, .32, 1.275) normal both;

    .closePopupContainer {
        position: absolute;
        width: 3%;
        height: 3%;
        translate:0 0;
        top: 80px;
        z-index: 3;

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
    .gallery {
        width: 100%;
        height: 100%;
        background: url('https://cdn.shopify.com/s/files/1/1140/4626/files/firmware_blog.jpg?v=1584993513') center no-repeat;
        background-size: cover;
        transform-origin: left;
        transition: 750ms cubic-bezier(0.5, 0, 0.75, 0);;

        &.flip {
            transform: rotateY(-90deg)
        }
        .productOptions {
            position: absolute;
            top: 20%;
            left: 8%;
            background-color: rgba(255,255,255,0.5);
            backdrop-filter: blur(4px);
            
            .header {
                
            }
        }
        .specs {
            position: absolute;
            top: 20%;
            right: 15%;
            background: rgba(255,255,255,0.55);
            padding: 2em;
            border-radius: 0.5em;
            backdrop-filter: blur(5px);
    
            
        }


    }
    .page {
        
        background: white;
        width: max-content;
        position: absolute;
        bottom: 0;
        left: 35%;
        padding: 1.5em 3em;
        
        
        button {
            
            background: transparent;
            border: 1px solid white;
            font-weight: 700;
            border-radius: 3em;
            padding: 1em;
            cursor: pointer;
            font-size: 22px;
            transition: 250ms;
            aspect-ratio: unset;
            
            &:hover {
                scale: 1.5;
            }
        }
        
    }
`
const theme = {
    "in": SwingIn,
    "out": SwingOut
}

const Shake = keyframes`
	0%, 20% {transform: translate(0);}
	2%, 6%, 10%, 14% {transform: translateX(-10px)}
	4%, 8%, 12% {transform: translateX(10px)}
	16% {transform: translate(8px)}
	18% {transform: translate(-8px)}

`
const ShakingButton = styled.button`
	border: 1px solid #191919;
	color: #0f0f0f;
	background: transparent;
	border-radius: 3em;
	padding: 0.5em 1em;
	cursor: pointer;
	transition: 250ms;
	animation: ${Shake} 5s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both;

	&:hover {
		border: 1px solid #fff;
		text-shadow: 0 0 1em #191919, 0 0 2em #191919, 0 0 3em #191919, 0 0 4em #191919;
		color: #fff;
		animation-play-state: paused;
	}
`


const ProductDetails = ({setMount, product, setCurProduct}) => {
    const [ anim, setAnim ] = useState(theme['in'])
    const wrapper = useRef()
    const [ image, setImage ] = useState(images.items[1].link)
    const handleShowDetails = (e) => {
        document.querySelector('.gallery').classList.toggle('flip')
    }

    const handleUnmount = (e) => {
        setAnim(SwingOut)
        /* finish animation before unmounting */
        setTimeout(() => {
            // updateStyle()
            setMount(null)
            setCurProduct(null)
        }, 600)
    }
    
    useEffect(() => {
    })
    return (
        <StyledPopup theme = { anim } className={`${styles.productDetailsWrapper} ${styles['swing-in-top-fwd']}`} ref = { wrapper } >
            <div className={`closePopupContainer`}><button onClick={ handleUnmount }>x</button></div>
            <div className="gallery">
                <div className="productOptions">
                    <div className="header"><h1>{ `${product.attributes.Manufacturer} ${product.attributes.Model}` }</h1></div>
                    <div>☆☆☆☆☆</div>
                </div>
                <div className="specs">
                    <ShakingButton>+ details</ShakingButton>
                </div>

            </div>
			<div className="page">
				<span><button>&lt;</button></span>
				<span><button onClick={handleShowDetails}>&gt;</button></span>
			</div>
        </StyledPopup>
    )
}
export default ProductDetails