import React, { useEffect, useRef, useState } from 'react'
import styles from '/styles/products.module.scss'
import ProductItems from './ProductItems'
import ProductHeader from './ProductHeader'
import QueryOptions from './QueryOptions'

const Main = ({ filterRef, data, router }) => {
    const [type] = router.query.pid
    const limitSelect = useRef()
    const sortSelect = useRef()

    const submitQuery = async e => {

        const page = e.currentTarget.tagName === "SELECT" ? null : e.currentTarget.value

        const limitOptions = limitSelect.current?.options
        const limitValue = limitOptions[limitOptions.selectedIndex].value
        const sortOptions = sortSelect.current?.options
        const sortValue = sortOptions[sortOptions.selectedIndex].value

        await router.replace(
            encodeURI(`/products/${type}?limit=${limitValue}&sort=${sortValue}${page === null ? '':`&page=${page}`}`),
            undefined,
            {shallow: true}
        )

    }


    const handlePage = async e => {
        // const rQ = async () => await router.query
        // rQ.then(x => console.log(x))
        // if it's not query.limit that changed, send the entire payload, else only get diff in limit
        const firstSeenDoc = data['data'][0]
        const lastSeenDocRef = data['data'][data['data'].length - 1] // use the last doc for startAfter query => this introduces problems when user selects non-adjacent pages
        // easiest fix would be to remove selectable pagination and have <first><prev><next><last> buttons
        const limit = router.query.limit
        const page = router.query.page ?? "first-reset"
        let sortVals = router.query.sort ?? 'name-asc'
        var orderVal;
        var startVal;

        if (page === "next" || page === "previous") {
            startVal = page === "next"
                ? lastSeenDocRef[`${sortVals.split('-')[0]}`]
                : firstSeenDoc[`${sortVals.split('-')[0]}`]
            orderVal = sortVals
        } else {
            startVal = null


            orderVal = page === "first-reset"
                ? sortVals
                : page === "first" // reset traversal direction asc
                    ? `${sortVals.split('-')[0]}-asc`
                    : `${sortVals.split('-')[0]}-desc` // reset traversal direction desc
        }

        // disable previous/next if on first/last respectively 
        let reqQuery = `/api/collections/${type}/${router.query.limit ?? 9}/${orderVal}/${startVal}`

        let xx = await fetch(reqQuery).then(v => v.json()).catch(() => null)

        return xx
    }

    return (
        <div className={styles.wrapper}>
            <ProductHeader type = {type}>
                <div ref={filterRef} className={styles.filtersApplied}></div>
            </ProductHeader>
            <QueryOptions limitSelect={limitSelect} sortSelect={sortSelect} submitQuery={submitQuery}/>
            <ProductItems data = {data} router = {router} handlePage={handlePage}/>
            <div className={styles["paginationContainer"]}>
                <span><button value="first" onClick={submitQuery}>FIRST</button></span>
                <span><button value="previous" onClick={submitQuery}>PREVIOUS</button></span>
                <span><button value="next" onClick={submitQuery}>NEXT</button></span>
                <span><button value="last" onClick={submitQuery}>LAST</button></span>

            </div>
        </div>
    )
}

export default Main