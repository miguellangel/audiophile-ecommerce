import {useEffect, useRef, useState} from 'react'
import myImage from '/public/images/product-xx59-headphones/desktop/image-product.jpg'
import Image from 'next/image'
//const modulo = (n, d) => ((n % d) + d) % d

const style = {
    maxWidth: '100%',
    height: '100%',
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
        let res= await fetch(`/api/imagesearch/${encode(name)}/${encode(manufacturer)}/1`).then(v => v.json())
        let img = res.value?.shift()
        let thumbnail = img?.thumbnailUrl
        let accent = img?.accentColor
        
        let grandparent = el.current?.parentNode?.parentNode
        grandparent?.style.setProperty('--accent', `#${accent}`)
        setImage(thumbnail)
//        setImage(img.items?.[0].image.thumbnailLink)
    }

    useEffect(() => {
        if (!image) setTimeout(() => getImage(), index * 1000)
        //getImage()
    })
    return (
        <>
            <img ref = {el} src = {image ? image : myImage.src} style={style} alt="image" layout="fill"/>
        </>
    )
}

export default ProductImage

