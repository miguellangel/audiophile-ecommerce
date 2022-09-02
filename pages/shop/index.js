import React from 'react'
import styles from '../../styles/shop.module.scss'
import Image from "next/image"

// import Item1 from '../../public/images/cart/image-xx99-mark-one-headphones.jpg'

const Shop = () => {
    const s = {maxWidth: '100%'}
    React.useEffect(() => {
    })
    return (
        <>
            <div id={styles.shopWrapper}>
                <button id={styles.backButton} onClick={() => history.back()}>go back</button>
                <div id={styles.shopContainer}>
                    <div id={styles.formContainer}>
                        <h1 className={styles[`padding-small`]}>CHECKOUT</h1>
                        <form>
                            <fieldset>
                                <legend>BILLING DETAILS</legend>
                                <fieldset>
                                    <legend>Name</legend>
                                    <input type="text"></input>
                                </fieldset>
                                <fieldset>
                                    <legend>Email Address</legend>
                                    <input type="text" style={s}></input>
                                </fieldset>
                                <fieldset>
                                    <legend>Phone Number</legend>
                                    <input type="text"></input>
                                </fieldset>
                                

                            </fieldset>
                            <fieldset>
                                <legend>SHIPPING INFO</legend>
                                

                                <fieldset>
                                    <legend>Street Address</legend>
                                    <input type="text" id="street" name="street" style={s}/>
                                </fieldset>
                                <fieldset>
                                    <legend>City</legend>
                                    <input type="text" id="city" name="city" />
                                </fieldset>
                                <fieldset>
                                    <legend>State</legend>
                                    <input type="text" id="state" name="state" />
                                </fieldset>
                                <fieldset>
                                    <legend>Zip</legend>
                                    <input type="text" id="zip" name="zip" />
                                </fieldset>

                            </fieldset>
                            <fieldset>
                                <legend>PAYMENT DETAILS</legend>

                                <fieldset>
                                    <legend>Payment Method</legend>
                                    <input type="text" id="method" name="method" />
                                </fieldset>
                                <fieldset>
                                    <legend>Name on Card</legend>
                                    <input type="text" id="cardname" name="cardname" style={s}/>
                                </fieldset>
                                <fieldset>
                                    <legend>Card Number</legend>
                                    <input type="text" id="cardnum" name="cardnum" style={s}/>
                                </fieldset>
                                <fieldset>
                                    <legend>EXPIRY</legend>
                                    <input type="text" id="expiry" name="expiry" />
                                </fieldset>
                                <fieldset>
                                    <legend>PIN</legend>
                                    <input type="text" id="pin" name="pin" />
                                </fieldset>

                            </fieldset>
                        </form>

                    </div>
                    <div id={styles.checkoutContainer}>
                        <h3 style={{alignSelf: 'start'}}>Summary</h3>
                        <div id={styles.checkoutCart}>
                            <Item src='images/cart/image-xx99-mark-one-headphones.jpg' name='XX99 MK II' price='2,999' qty={1} />
                            <Item src='images/cart/image-xx59-headphones.jpg' name='XX59' price='899' qty={2} />
                            <Item src='images/cart/image-yx1-earphones.jpg' name='YX1' price='599' qty={1} />
                        </div>
                        <div id={styles.checkoutBill}>
                            <div className={styles.billItem}><span>TOTAL</span><span>$5,396</span></div>
                            <div className={styles.billItem}><span>SHIPPING</span><span>$50</span></div>
                            <div className={styles.billItem}><span>VAT (INCLUDED)</span><span>$1,079</span></div>
                            <div className={styles.billItem}><span>GRAND TOTAL</span><span><mark><h2>$5,446</h2></mark></span></div>
                        </div>
                        <button id={styles.formSubmit}>Continue & Pay</button>

                    </div>
                </div>
            </div>
        </>
    )
}

const Item = ({src, name, price, qty}) => {
    return (
        <div className={styles.checkoutItem}>
            <div id={styles.itemImg}>
                <img src={src} width='50px' height='50px' />
            </div>
            <div id={styles.itemName}>
                <span>{name}</span>
                <span>{`$${price}`}</span>
            </div>
            <div id={styles.itemQty}>
                <h6>x{qty}</h6>
            </div>
        </div>
    )
}

export default Shop