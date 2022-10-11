import styles from './../styles/products.module.scss'
import {memo} from 'react'
const QueryOptions = ({limitSelect, sortSelect, submitQuery}) => {
    return (
        <div id={styles.QModifiers}>
            <form id={styles.itemsPerPage}>
                <label htmlFor="limit">Items per Page</label>
                <select ref={select => limitSelect.current = select} id="limit" name="limit" onChange={submitQuery}>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </form>
            <form id={styles.sort}>
                <label htmlFor="sortBy"></label>
                <select ref={select => sortSelect.current = select} id="sort" name="sort" onChange={submitQuery}>
                    <option value="name-asc">Name Ascending</option>
                    <option value="name-desc">Name Descending</option>
                    <option value="manufacturer-asc">Manufacturer Ascending</option>
                    <option value="manufacturer-desc">Manufacturer Descending</option>
                    <option value="price-asc">Price Ascending</option>
                    <option value="price-desc">Price Descending</option>
                </select>
            </form>
        </div>
    )
}

export default memo(QueryOptions)