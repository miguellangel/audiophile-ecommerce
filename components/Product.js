import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from '/styles/products.module.scss'
import styled from 'styled-components'
import ProductItems from './ProductItems'
import ProductHeader from './ProductHeader'
import QueryOptions from './QueryOptions'

//const SearchURL = `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_TOKEN}&cx=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID}&searchType=image&q=`

const StyledFilterButton = styled.div`
	display: flex;
	background: white;
	flex-flow: row nowrap;
	cursor: pointer;
	box-shadow: 0px 0px 1em -5px #c9c9c9;
	border-radius: 3em;
	justify-content: space-between;
	align-items: center;
	gap: 3px;
	margin: 3px 0;

	& > * {
		padding: 0.5em 1em;
	}

	p {
		width: 70%;
		flex: 1 1 70%;
		margin: 0;
		height: min-content;
		user-select: none;
		overflow: hidden;
		max-height: 50px;
		white-space: nowrap;
	}
	button {
		border:none;
		width: clamp(5px, 30%, 50px);
		height: 110%;
		background: transparent;
		border-radius: 0 3em 3em 0;
		box-shadow: inset 0px 0px 1px rgba(0,0,0, 0.1);
		transition: 128ms;
		cursor: pointer;
		text-align: center;

		&:hover {
			//background: palevioletred;
			box-shadow: inset 0px 0px 1em 1px palevioletred;
			text-shadow: 0px 0px 1em red;
			color: red;
		}
	}
`

const Sidebar = ({ receiveRef, filters }) => {

    const [mount, setMount] = useState()
    const [selection, setSelection] = useState([])


    let expand = (div) => {
        /* use class-driven transition to rotate the caret */
        var caret = div.previousSibling.lastChild
        caret.classList.toggle(styles.expand)

        /* let the non-styled child's height be used 
        instead of the max-height transition method -- which has a huge delay  */

        if (div.clientHeight) {
            div.style.height = 0;
        } else {
            div.style.height = `${div.firstChild.clientHeight}px`;
        }

    }

    let handleSelection = (e, ref) => {

        var target;
        ref ? (target = ref) : (target = e.target)

        let formFieldsets = document.querySelectorAll(`.${styles['filter-items']} > form > fieldset`)
        formFieldsets.forEach((item, index) => {
            item.setAttribute('disabled', '')
        })

        let fx = function() {
            formFieldsets.forEach((item, index) => {
                item.removeAttribute('disabled')
            })

        }
        setTimeout(fx, 250)

        if (target.checked) setSelection(prev => [...prev, { filter: target.value, ref: target }])
        else setSelection(selection.filter(item => item.filter != target.value))

    }

    let handleRemoveFilter = (e) => {
        let filterName = e.target.previousElementSibling.textContent
        console.log(filterName, selection)
        let ref = selection.filter(item => item.filter === filterName)[0].ref
        ref.checked = false;
        handleSelection(null, ref)
    }
    useEffect(() => {
        receiveRef().then(value => setMount(value.current))

    })
    
    return (
        <aside aria-label="filters-sidebar" className={styles.sidebar}>
            {Object.keys(filters).map(i =>
                // <Filter key={i} item={i} values={filters[i]} />
                <div key={i} className={`${styles.filter}`} id={styles[i]}>
                    <button className={styles['filter-header']} onClick={(e) => expand(e.currentTarget.nextSibling)}>
                        <p>{i.toUpperCase()}</p><span>▼</span>
                    </button>
                    <div className={styles['filter-items']}>
                        <form action="" style={{ display: 'flex', flexDirection: 'column', padding: '0 3%' }}>
                            <fieldset>
                                {filters[i].map((i) =>
                                    <label key={`${i}-label`}>
                                        <input onInput={handleSelection} type="checkbox" key={i} name={i} value={i} />{`${i}\n`}
                                    </label>)
                                }
                            </fieldset>
                        </form>
                    </div>
                </div>
            )}
            {mount &&
                ReactDOM.createPortal(
                    selection.map(item =>
                        <StyledFilterButton key={item.filter} className={styles.btnWrapper}>
                            <p className={styles.btnLabel}>{item.filter}</p>
                            <button onClick={handleRemoveFilter} className={styles['btn-removeFilter']}>x</button>
                        </StyledFilterButton>
                    )
                    , mount)
            }
        </aside>
    )
}

const Main = ({ filterRef, data, router }) => {
    const [type] = router.query.pid
    const limitSelect = useRef()
    const sortSelect = useRef()

    const submitQuery = async e => {
        console.log(e.currentTarget.tagName)
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
        const firstSeenDoc = data['data'][0]
        const lastSeenDocRef = data['data'][data['data'].length - 1] // use the last doc for startAfter query => this introduces problems when user selects non-adjacent pages
        // easiest fix would be to remove selectable pagination and have <first><prev><next><last> buttons
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
        console.log(reqQuery)

        let xx = await fetch(reqQuery).then(v => v.json()).catch(() => null)
        console.log('received', xx)
        
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


export { Sidebar }
export default Main