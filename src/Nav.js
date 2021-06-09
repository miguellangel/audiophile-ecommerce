import React from 'react'
import Throttle from './Throttle.js'

const Nav = ({notNav}) => {

    var navElement = React.useRef()

    var prevYScrollOffset = React.useRef(window.scrollY)

    function handleExpand () {

        let target = navElement.current.parentNode.classList

        target.toggle("expand")
    
        document.querySelector("#root").addEventListener("click", (e) => target.toggle("expand"), {once: true})




    }

    /* detect scroll direction to hide nav*/
    window.addEventListener("scroll", Throttle( () => {
        var scrollTop = window.scrollY;
        var previousScroll = prevYScrollOffset.current;
        let delta = 1;
        var passedThreshold = Math.abs(previousScroll - scrollTop) >= delta;
        
        if (navElement.current && passedThreshold) {
            if (previousScroll < window.scrollY) {
                /*console.log(`${previousScroll}, ${scrollTop}. scroll down`)*/
                navElement.current.parentNode.classList.add("hide")
            } else if (previousScroll > window.scrollY) {
                /*console.log(`${previousScroll}, ${scrollTop}. scroll up`)*/
                navElement.current.parentNode.classList.remove("hide")
            } else {
                /*console.log(`${previousScroll}, ${scrollTop}. no change`)*/
            }
            prevYScrollOffset.current = scrollTop;
        }
    }, 50), {useCapture: true})



    React.useEffect(() => {
        prevYScrollOffset.current = window.scrollY


    })

    return (
        <div className="nav-container">
            <div id="nav" ref = {navElement} >
                <div id="navStart">
                    <a href="#h" className="navItem">audiophile</a>
                </div>
                <div className="navCenter">
                    <button id="togglepullDownBar" onClick = { handleExpand } ></button>
                    <div id="links">
                        <a href="#home" className="navItem" onClick = { handleExpand }>HOME</a>
                        <a href="#headphones" className="navItem" onClick = { handleExpand } >HEADPHONES</a>
                        <a href="#speakers" className="navItem" onClick = { handleExpand } >SPEAKERS</a>
                        <a href="#earphones" className="navItem" onClick = { handleExpand } >EARPHONES</a>
                    </div>
                </div>
                <div id="navEnd">
                    {/*eslint-disable-next-line*/}
                    <a href="#cart" className="navItem"></a>
                </div>
            </div>
        </div>
    )
}

export default Nav