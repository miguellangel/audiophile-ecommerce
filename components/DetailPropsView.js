import React, {useRef, useState, useEffect} from 'react'
import {ShakingButton} from './StyledProductComponents'
//import * as d3 from 'd3'
import styles from './../styles/products.module.scss'

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
            .then(d => {
                let data = d.data.attributes
                let temp;
                let filteredKeys = Object.keys(data).filter((i, idx) => data[i] !== "unspecified")
                let filteredArr = filteredKeys.map(function(i, idx) {return {[i]: data[i]}})
                setProduct(filteredArr)
            })
    }

    useEffect(() => {
        if (!product) getProduct(data.current.name);
    })

    return (
        <div className="tableItems">
            {product && product.map((i,idx) => (
                <div className="tableField" key={idx}>
                    <div className="fieldKey">{Object.keys(i)[0]}</div>
                    <div className="fieldValue">{Object.values(i)[0]}</div>
                </div>
            ))}
        </div>
    )
}

const DetailPropsView = ({product}) => {
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

    const handleShakyButton = e => {
        e.target.parentNode.classList.toggle('active')
        let el = document.querySelector('div.page')
        
        el.hasAttribute('style') ? el.removeAttribute('style') : el.setAttribute('style', '--zI: -1')
    }

    return (
        <>
            <div className={`${styles.specs} specs`}>
                <div className='closeSpecsContainer'>
                    <ShakingButton onClick={handleShakyButton}>+ details</ShakingButton>
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
