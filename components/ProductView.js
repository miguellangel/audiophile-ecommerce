import styles from '../styles/Home.module.scss'

const ProductView = ({type, imgAlign, data}) => {
    return (
        <div className={`${styles.product} ${styles[`${type}`]}`}> {/* help from https://stackoverflow.com/questions/33949469/using-css-modules-how-do-i-define-more-than-one-style-name/33949534 */}
            {type !== 'asBackground' &&
                <div id={styles.imgContainer}> 
                    <img src={`${data.image}`} alt={`${data.name}`} height={type === 'main' ? '75%' : 'initial'}/>
                </div>
            }
            <div id={styles.descriptionContainer}>
                <h1 id={styles.productName}>{`${data.name} ${data.type.toUpperCase()}`}</h1>
                {type === 'main' &&
                    <p id={styles.description}>{`${data.description}`}</p>
                }
                <button id={styles.seeProduct}>SEE PRODUCT</button>
            </div>

        </div>
    )

}

export default ProductView