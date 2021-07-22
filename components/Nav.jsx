import React from 'react'
import Throttle from './Throttle'

/* nav is rendered throughout app, so styling is applied globally */

const Nav = () => {

    var navElement = React.useRef()
    
    /* client-side rendering only */
    if (process.browser) {
        var prevYScrollOffset = React.useRef(window.scrollY)

        /* detect scroll direction to hide nav*/
        window.addEventListener("scroll", Throttle( () => {
            var scrollTop = window.scrollY;
            var previousScroll = prevYScrollOffset.current;
            let delta = 1;
            var passedThreshold = Math.abs(previousScroll - scrollTop) >= delta;

            if (navElement.current && passedThreshold) {
                if (previousScroll < window.scrollY) {
                    console.log(`${previousScroll}, ${scrollTop}. scroll down`)
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

    }

    function handleExpand () {

        let target = navElement.current.parentNode.classList

        /* name the function to be able to remove the listener*/
        function handleClick (e) {
            return target.toggle("expand")

        }

        if (!target.contains("expand")) {
            target.toggle("expand")
            /* on next tick - add click event listener */
            setTimeout(() => {
                window.addEventListener("click", handleClick, {once: true})
            }, 1)
        } else window.removeEventListener("click", handleClick)
    }



    React.useEffect(() => {

        prevYScrollOffset.current = window.scrollY

    })

    return (
        <header className='nav-container'>
            <nav id='nav' ref = {navElement} role="navigation" aria-label="Main" >
                <div id='navStart'>
                    <a href="#h" className='navItem'>audiophile</a>
                </div>
                <div className='navCenter'>
                    audiophile
                    <button id='togglepullDownBar' onClick = { handleExpand } ></button>
                    <div id='links'>
                        <a href="#home" className='navItem' >HOME</a>
                        <a href="#headphones" className='navItem' >HEADPHONES</a>
                        <a href="#speakers" className='navItem' >SPEAKERS</a>
                        <a href="#earphones" className='navItem' >EARPHONES</a>
                    </div>
                </div>
                <div id='navEnd'>
                    audiophile
                    {/*eslint-disable-next-line*/}
                    <a href="#cart" className='navItem'></a>
                </div>
            </nav>
        </header>
    )
}

export default Nav