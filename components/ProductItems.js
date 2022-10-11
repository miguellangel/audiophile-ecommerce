import React, { useState, useEffect, memo } from 'react'
import ReactDOM from 'react-dom'
import styles from '/styles/products.module.scss'
import styled from 'styled-components'
import Image from 'next/image'
import myImage from "/public/images/product-xx59-headphones/desktop/image-product.jpg"
import heart from '/public/images/icons/heart.png'
import ProductDetails from './ProductDetails'


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

const ProductItems = ({data, router, handlePage}) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState()
    const [mount, setMount] = useState()
    const [curProduct, setCurProduct] = useState()
    const [card, setCard] = useState()

    function handlePopup(product, e) {
        e.stopPropagation()
        console.log(e.currentTarget, product)
        setCurProduct(product)
        setMount(document.querySelector('#main'))
    }
    const handleCard = (e) => {
        const target = e.currentTarget

        // logic to have only one active card
        if (card && card === target) {
            setCard(null)
            target.classList.remove('active')
            setTimeout(() => target.classList.toggle('remove'), 1) // wrapping this in setTimeout removes lil bug
            setTimeout(() => target.classList.remove('remove'), 600)
        } else {
            setCard(prev => {
                if (prev) {
                    prev.classList.remove('active')
                    setTimeout(() => prev.classList.toggle('remove'), 1)
                    setTimeout(() => prev.classList.remove('remove'), 600)
                }
                target.classList.toggle('active')
                return target
            })
        }
    }
    function handleAddtoCart(product, e) {
        e.stopPropagation()
        console.log('add to cart', product)
    }
    function handleAddtoFavs(product, e) {
        e.stopPropagation()
        console.log('add to favs', product)
    }
    const updateData = async () => {
        await handlePage().then(v => setItems(v))
    }
    useEffect(() => {
        updateData()
    }, [router])

    useEffect(() => {
        if (data) {
            setItems(data)
            setLoading(false)

        }
    }, [data])
    return (
        <div className={styles['products-container']}>
            {!loading && items.data.map((product, index) =>
                <React.Fragment key={`productid-${product.name}`}>
                    <StyledCard className={styles.card} onClick={handleCard}>
                        <div className={`${styles.front} ${styles.face}`} >
                            <div className={`${styles['product-container']} ${styles.front} ${styles.face}`} >
                                <div className={styles['img-container']}>
                                    <Image src={myImage} alt="img" />
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
            {mount &&
                ReactDOM.createPortal(
                    <ProductDetails setMount={setMount} product={curProduct} setCurProduct={setCurProduct} />,
                    mount
                )
            }
        </div>
    )
}

export default memo(ProductItems)