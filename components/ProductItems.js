import React, { useReducer, useRef, useEffect, memo } from 'react'
import styles from '/styles/products.module.scss'
import styled from 'styled-components'
import Image from 'next/image'
import myImage from "/public/images/product-xx59-headphones/desktop/image-product.jpg"
import heart from '/public/images/icons/heart.png'
import ProductDetails from './ProductDetails'
import { useRouter } from 'next/router'


const StyledCard = styled.div`
	width: 100%;
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	flex: 0 0 32%;
	margin: 1% 0;
	position: relative;
	transition: 500ms;
	transform: var(--rotate, rotateY(0deg));

	&:hover{cursor: pointer;}
	&:hover  .product-name {background: linear-gradient(0deg, rgba(0,0,0,0.05), white)}
  	&.active {
		--rotate: rotateY(180deg);
		--ZI: 0;
		--bg: white;
		box-shadow: 0px 0px 3em -10px #c9c9c9;
		z-index: 2;
	}

        &.remove {
        --opacity: 0;
        }
`
const updateState = (state, action) => {
    switch(action.type) {
        case 'toggle_loading': {
            return {...state, loading: !state.loading}
        }
        case 'set_items': {
            return {...state, items: action.newItems}
        }
        case 'add_items': {
            return {...state, items: {...state.items, data: [...state.items.data, ...action.newItems]} }
        }
        case 'toggle_mounted': {
            return {...state, mounted: !state.mounted}
        }
        default: {console.log("Unknown Action")}
    }
}

const ProductItems = ({ data }) => {
    const initialState = {
        loading: true,
        items: data,
        mounted: false
    }
    const [state, dispatch] = useReducer(updateState, initialState)
    const renderCount = useRef(1)
    const cardQueue = useRef([])
    const cardData = useRef()

    const router = useRouter()

    function handlePopup(product, e) {
        e.stopPropagation()
        cardData.current = product
        dispatch({
            type: 'toggle_mounted'
        })
    }
    const handleCard = (e) => {
        // use array ref reduction and not state to manage cards, this makes logic cleaner

        // append the selected card to queue
        cardQueue.current.push(e.currentTarget)
        // use FIFO queue to access prev card, default to null if queue is less than 2
        let initial = cardQueue.current.length > 1 ? cardQueue.current.shift() : null
        // use a reduce function to easily manage cards, returning only the current card at the end of logic
        // the reduce fn updates the value of the cardQueue
        cardQueue.current = cardQueue.current.reduce((prev, cur) => {
            // always make the current card the active card
            cur.classList.add('active')
            // remove active class if new card selected or if user clicked same card to dismiss
            if (prev !== null || prev === cur) {
                // remove active, give time to animate removal
                prev.classList.remove('active')
                // two timeout calls fixes the bug where 'remove' class is not removed after 500ms
                setTimeout(() => prev.classList.add('remove'), 1) && setTimeout(() => prev.classList.remove('remove'), 500)

            } 
            // the current card will be used as the initial state of the next fn call
            return prev === cur ? [] : [cur]

        }, initial)

    }
    function handleAddtoCart(product, e) {
        e.stopPropagation()
        // console.log('add to cart', product)
    }
    function handleAddtoFavs(product, e) {
        e.stopPropagation()
        // console.log('add to favs', product)
    }
    const getData = async () => {
        const firstSeen = state.items.data[0]
        const lastSeen = state.items.data[state.items.data.length - 1]
        // get the page mode. Options: first | prev | next | last ?? default
        const page = router.query.page ?? "default"
        const diff = router.query.difference
        const type = router.query.pid[0]
        const limit = router.query
        // the sort mode defaults to name-asc
        let [sortBy, direction] = (router.query.sort ?? "name-asc").split('-')
        let startVal

        if (diff >= 0) {
            // since we are using item as startVal query parameter, the query must b
            // of the same type as the current item e.g. query=name-asc state.items.data[<name>, manufacturer, price]
            startVal = ((page === "next") || (page !== "first" || page != "last")) ? lastSeen[sortBy] : page === "previous" ? firstSeen[sortBy] : null 
            sortBy = page === "default" ? `${sortBy}-asc` : `${sortBy}-desc`
            let query = `/api/collections/${type}/${(diff || router.query.limit) ?? 9}/${sortBy}/${startVal}`
            // {data: [...], meta: {...}}
            let data = await fetch(query).then(v => v.json()).catch(() => null)
            data = {...data, meta: {...data.meta, 'type': 'add'}}
            console.log(data)
            return data


        } else {
            //console.log(`Should remove ${-diff} items`)
            //console.log('New data: ', state.items.data.splice(state.items.data.length + diff, -diff))
            // user wants less items per page; delete excess items from data array
            return state.items.data.splice(state.items.data.length + diff, state.items.data.length)
        }



    }
    const updateData = async () => {
        
        await getData().then(v => dispatch({
            type: 'add_items',
            newItems: v.data ?? data.data
        }))
    }
    const onUpdateMount = () => dispatch({type: 'toggle_mounted'})
    /*  update case: on page load */
    /* update case: on query update */
    // prevent rerender after router change
    useEffect(() => {
        if (router.isReady) {
            if (renderCount.current > 1) updateData()
            renderCount.current += 1
        }
    }, [router])

    return (
        <div className={styles['products-container']}>
            {state.items && state.items.data.map((product, index) =>
                <React.Fragment key={`productid-${product.name}-${index}`}>
                    <StyledCard className={styles.card} onClick={handleCard}>
                        <div className={`${styles.front} ${styles.face}`} >
                            <div className={`${styles['product-container']} ${styles.front} ${styles.face}`} >
                                <div className={styles['img-container']}>
                                    <Image src={ myImage} alt="img" />
                                </div>
                                <div className={styles['product-name']}>
                                    <h3 id="description">{`${product.name.replaceAll('_', ' ')}`}</h3>
                                    <p>{`${product.manufacturer.replaceAll('_', ' ')}`}</p>
                                    <p>
                                        {product.price === -1 ? 'see details' : `$${product.price}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.back} ${styles.face}`}>
                            <div className={`${styles.detailsBtnCntr}`}>
                                <button onClick={handlePopup.bind(this, product)}>details +</button>
                            </div>
                            <div className={`${styles.addToCartCntr}`}>
                                <button onClick={handleAddtoCart.bind(this, product)}>Add to Cart</button>
                            </div>
                            <div className={`${styles.addToFvrtCtr}`}>
                                <input onSubmit={handleAddtoFavs.bind(this, product)} type="image" alt="heart" src={heart.src} style={{ width: '50px' }}></input>
                            </div>
                        </div>
                    </StyledCard>

                </React.Fragment>
            )}
            {state.mounted && <ProductDetails product={cardData} toggleMount={onUpdateMount}/>}
        </div>
    )
}

export default memo(ProductItems)
