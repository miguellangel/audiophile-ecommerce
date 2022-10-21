import React, { useEffect, useRef, useState, useCallback } from 'react'
import styles from '/styles/products.module.scss'
import ProductItems from './ProductItems'
import ProductHeader from './ProductHeader'
import QueryOptions from './QueryOptions'

const Main = ({ filterRef, data, router }) => {

    useEffect(() => {
        console.log("since router is shallow i should not render")
    })
    return (
        <div className={styles.wrapper}>
            <ProductHeader>
                <div ref={filterRef} className={styles.filtersApplied}></div>
            </ProductHeader>
            <QueryOptions>
                <ProductItems data = {data} />
            </QueryOptions>
        </div>
    )
}

export default Main
