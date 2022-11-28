import React, {useRef, useState, useEffect} from 'react'
import {ShakingButton} from './StyledProductComponents'
//import * as d3 from 'd3'

const modulo = (n, d) => ((n % d) + d) % d
const prettyKey = [
    'Model',
    'Efficiency (dB SPL/mW)',

]
const TableDetails = ({data}) => {
    const [product, setProduct] = useState()

    const getProduct = async (name) => {
        fetch(`/api/product/${name}`)
            .then(v => v.json())
            .then(d => setProduct(d))
    }

    useEffect(() => {
        if (!product) getProduct(data.current.name);
        if (product) console.log(Object.keys(product.data.attributes).map(i => console.log("hello", i)))
    })

    return (
        <div className="tableItems">
            {product && Object.keys(product.data.attributes).map((i,idx) => (
                <div className="tableField" key={idx}>
                    <div className="fieldKey">{i}</div>
                    <div className="fieldValue">{product.data.attributes[i]}</div>
                </div>
            ))}
        </div>
    )
}

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
        console.log("RENDERS TWICE?")
    }) 
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
                    <TableDetails data={product} />
                </div>
            </div>
        </>
    )
}

export default DetailPropsView
