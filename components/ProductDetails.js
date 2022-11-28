import React, { useEffect, useRef, useState } from "react"
import ReactDOM from 'react-dom'
import styles from './../styles/products.module.scss'
import images from '../prerender/image_api.json'
import {StyledPopup, theme, ShakingButton} from './StyledProductComponents'
import DetailPropsView from './DetailPropsView'

const modulo = (n, d) => ((n % d) + d) % d

const Portal = ({children}) => {
    
    return (
        
        ReactDOM.createPortal(
            children,
            document.querySelector('main#main')
        )
    )
}

const ImageBg = ({img, idx}) => {
    const divBgRef = useRef()
    useEffect(() => {
        divBgRef.current.style.setProperty('--bgURL', `url("${img.link}")`)
    })
    return (
        <div ref={divBgRef} id={'img-'+idx} className={`imgLoader${idx === 0 ? ' active' : ''}`}></div>
    )
}
const ImageSlider = () => {
    const imgArr = useRef([...images.items])
    const imgIndx = useRef(0)
    const imagesDiv = useRef()
    const activeArr = useRef()
    
    const handleSlideshow = e => {
        // turn this string value into bool
        let isGoingForward = JSON.parse(e.target.value)
        // exit function, do nothing if on both ends of the slider range
        if (!isGoingForward && imgIndx.current === 0) return null
        if (isGoingForward && imgIndx.current === 9) return null
        // preload next images every two clicks when odd since index starts at 0
        // and we don't increment/decrement until the end of this fn 
        let shouldPreloadNextBatch = modulo(imgIndx.current, 2) == 1
        // cool method to map prev, cur, next elements
        let getItems = (keys) => keys.map(key => {
            let index = key === 'cur' ? imgIndx.current : key === 'prev' ? imgIndx.current - 1: imgIndx.current + 2
            return activeArr.current.item(index)
        })
        let [prev, cur, next] = getItems(['prev', 'cur', 'next'])
        // cool method to toggle an item's class
        let toggle = (item, cls='flip') => item.classList.toggle(cls)
        // toggle flip class on prev/cur if direction -/+
        isGoingForward ? toggle(cur) : toggle(prev)
        // only preload next if not in the first batch and direction is forwards
        // this is so that we keep the items loaded without downloading them again
        // logic for this is inside the css (.imgLoader.active.flip) using sibling selectors
        if (imgIndx.current > 0 && isGoingForward && shouldPreloadNextBatch) {
            next && setTimeout(() => next.classList.add('active'), 755) // use the add method so it doesn't toggle out the active class
        }
        // increment or decremenet the index
        imgIndx.current = isGoingForward ? imgIndx.current + 1 : imgIndx.current - 1
        // access the buttons responsible for direction
        let prevButton = document.querySelector('.page button[value=false]')
        let nextButton = document.querySelector('.page button[value=true]')

        // add disabled classes for aesthetic purposes
        // used classes instead of the button disabled attr in light of annoying ReactDOM quirks
        // https://stackoverflow.com/questions/50024811/default-disabled-button-click-event-is-not-firing-on-reactjs
        imgIndx.current === 0 ? prevButton.classList.add('disabled') : prevButton.classList.remove('disabled')
        imgIndx.current === 9 ? nextButton.classList.add('disabled') : nextButton.classList.remove('disabled')
    }

    useEffect(() => {
        // populate the array once on render
        activeArr.current = document.querySelectorAll('.imgLoader')
    })
    return (
        <>
            <div ref={imagesDiv}className="images">
                {imgArr.current.map((img, indx) =>
                    <ImageBg key={'image'+indx} img={img} idx={indx}/>
                )}
            </div>
            <div className="page">
                <span><button value={false} className="disabled" onClick={handleSlideshow}>&lt;</button></span>
                <span><button value={true} onClick={handleSlideshow}>&gt;</button></span>
            </div>    
        </>
    )
}

const ProductDetails = ({ product, toggleMount }) => {
    const [anim, setAnim] = useState(theme['in'])
    const wrapper = useRef()
    const escEvent = useRef()
    
    const handleUnmount = (e) => {
        setAnim(theme['out'])
        /* finish animation before unmounting */
        setTimeout(() => {
            // updateStyle()
            product.current = null
            toggleMount()
        }, 600)
    }

    useEffect(() => {
        // close component on Esc key, save the listener inside a ref so we can remove later
        escEvent.current = document.addEventListener('keydown', e => {
            if (e.isComposing || e.keyCode === 27) handleUnmount()
        })

        // remove the esc key listener if the button was pressed instead
        return () => document.removeEventListener('keydown', escEvent.current)
    })

    if (product.current) {
        return (
            <Portal>
                <StyledPopup theme={anim} className={`${styles.productDetailsWrapper} ${styles['swing-in-top-fwd']}`} ref={wrapper} >
                    <div className={`closePopupContainer`}><button onClick={handleUnmount}>✖️</button></div>
                    <div className="gallery">
                        <ImageSlider />
                        <div className="infoWrapper">
                            <div className="headerContainer">
                                <div className="header">
                                    <div className="headerItems">
                                        <h1>{product.current.name.replaceAll('_', ' ')}</h1>
                                        <h2>--{product.current.manufacturer.replaceAll('_', ' ')}</h2>
                                        <div className="productRating">☆☆☆☆☆</div>
                                    </div>
                                </div>
                            </div>
                            
                            <DetailPropsView product={product}/>
                        </div>
                    </div>
                    
                </StyledPopup>
            </Portal>
        )
    }
    
    return null
}
export default ProductDetails
