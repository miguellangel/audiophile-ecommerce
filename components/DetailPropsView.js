import {useRef, useState, useEffect} from 'react'
import {ShakingButton} from './StyledProductComponents'
import * as d3 from 'd3'
import {dim} from 'colorette'

const modulo = (n, d) => ((n % d) + d) % d

const DetailPropsView = ({product}) => {
    const [dimensions, setDimensions] = useState()
    const productSpecs = useRef()
    const groupRef = useRef()

    const getDimensions = () => {
        /* [page, productOptions, specs]*/
        let items = document.querySelectorAll('.gallery>*:not(.images)')
        let itemBounds = {}

        items = items.forEach(i => {itemBounds[i.className] = i.getBoundingClientRect()})

        return {
            top: itemBounds.specs?.bottom,
            right: itemBounds.specs?.right,
            bottom: itemBounds.page?.top,
            left: itemBounds.productOptions?.right,
            getWidth: function() {return this.right - this.left},
            getHeight: function() {return this.bottom - this.top},
            lineOrigin: function() {return this.getWidth() - (itemBounds.specs.width / 2)},
        }
    }

 

    
    useEffect(() => {
        if (!dimensions) setTimeout(() => {
            setDimensions(getDimensions())
        }, 750) // wait for the end of css transition
        if (dimensions && !productSpecs.current) { 
            //renderd3Group()
        }
    }, [dimensions])
    return (
        <>
            <div className="specs">
                <div className='closeSpecsContainer'>
                    <ShakingButton onClick={e => e.target.parentNode.classList.toggle('active')}>+ details</ShakingButton>
                </div>
                <div className='specsContainer'>
                    <h1>Product Specifications</h1>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default DetailPropsView
