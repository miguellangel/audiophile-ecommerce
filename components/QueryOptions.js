import styles from './../styles/products.module.scss'
import {memo, useRef} from 'react'
import {useRouter} from 'next/router'
const QueryOptions = ({children}) => {
    const sortSelect = useRef()
    const limitSelect = useRef()
    const prevLimit = useRef(9)
    const router = useRouter()
    const [type] = router.query.pid

    const submitQuery = async e => {
        const page = e.currentTarget.tagName === "SELECT" ? null : e.currentTarget.value

        const limitOptions = limitSelect.current?.options
        const limitValue = parseInt(limitOptions[limitOptions.selectedIndex].value)
        const difference = prevLimit.current != limitValue ? limitValue - prevLimit.current : null
        prevLimit.current = limitValue

        const sortOptions = sortSelect.current?.options
        const sortValue = sortOptions[sortOptions.selectedIndex].value

        router.replace(
            `/products/${type}?limit=${limitValue}&difference=${difference}&sort=${sortValue}${page === null ? '' : `&page=${page}` }`,
            undefined,
            {shallow: true}
        )
    }
    

    return (
        <>
            <div id={styles.QModifiers}>
                <form id={styles.itemsPerPage}>
                    <label htmlFor="limit">Items per Page</label>
                    <select ref={limitSelect} id="limit" name="limit" onChange={submitQuery}>
                        <option value="9">9</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </form>
                <form id={styles.sort}>
                    <label htmlFor="sortBy"></label>
                    <select ref={sortSelect} id="sort" name="sort" onChange={submitQuery}>
                        <option value="name-asc">Name Ascending</option>
                        <option value="name-desc">Name Descending</option>
                        <option value="manufacturer-asc">Manufacturer Ascending</option>
                        <option value="manufacturer-desc">Manufacturer Descending</option>
                        <option value="price-asc">Price Ascending</option>
                        <option value="price-desc">Price Descending</option>
                    </select>
                </form>
            </div>
            {children}
            <div className={styles['paginationContainer']}>
                <span><button value="first" onClick={submitQuery}>FIRST</button></span>
                <span><button value="previous" onClick={submitQuery}>PREVIOUS</button></span>
                <span><button value="next" onClick={submitQuery}>NEXT</button></span>
                <span><button value="last" onClick={submitQuery}>LAST</button></span>
            </div>
        </>
    )
}

export default memo(QueryOptions)
