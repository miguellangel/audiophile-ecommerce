import {useEffect, useRef, useState} from 'react'
import styles from '/styles/products.module.scss'
import myImage from '/public/images/product-xx59-headphones/desktop/image-product.jpg'
import Image from 'next/image'
//const modulo = (n, d) => ((n % d) + d) % d

const style = {
    maxWidth: '100%',
    minWidth: '100%',
    //height: '300px',
    objectFit: 'cover',
    boxShadow:'0px 35px 12px -34px var(--accent, #e9e9e9)',
    borderRadius: '1em 1em 0 0',
    transform: 'translate(0, -10px)',
    transition: '1s'
}

const ProductImage = ({index, name, manufacturer}) => {
    const [image, setImage] = useState()
    const qty = useRef(1)
    const el = useRef()

    const getImage = async () => {
        const encode = item => encodeURI(item.replaceAll('_', '\s'))
        //let res= await fetch(`/api/imagesearch/${encode(name)}/${encode(manufacturer)}/1`).then(v => v.json())
        let res = await fetch('/api/imagesearch/mockimages').then(v => v.json())
        let img = res[index] ?? res.value?.shift()
        let thumbnail = img?.thumbnailUrl
        let accent = img?.accentColor
        
        let grandparent = el.current?.parentNode
        grandparent?.style.setProperty('--accent', `#${accent}`)
        grandparent?.style.setProperty('--productImg', `url("${thumbnail})"` )
        //setImage(thumbnail)
//        setImage(img.items?.[0].image.thumbnailLink)
    }

    useEffect(() => {
        if (!image) setTimeout(() => getImage(), index * 1000)
        //getImage()
    })
    return (
        <>
            <div ref={el} className={styles['img-container']} style={style}>
                <img src = {myImage.src} style={{...style, visibility: 'hidden'}} alt="image"/>
            </div>            
        </>
    )
}

export default ProductImage

