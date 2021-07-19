import React from 'react'
// import Speakers from "./assets/home/desktop/image-speaker-zx9.png"

const ProductView = ({type, imgAlign, data}) => {

    let overFlowElement = React.useRef(null)
    // overFlowElement 
    //     : console.log("not")

    React.useEffect(() => {
    })

    return (
        <div className={`product ${type}`} style={(type === 'asBackground') ? {'--asBGImage': `url('${data.image}')`} : {}}>
            {type !== 'asBackground' &&
                <div id="imgContainer" className={`align-${imgAlign}`}>
                    <img src={`${data.image}`} alt={`${data.name}`} />
                </div>
            }
            <div id="descriptionContainer" ref={overFlowElement}>
                <h1 id="productName">{`${data.name} ${data.type.toUpperCase()}`}</h1>
                {type === 'main' &&
                    <p id="description">{`${data.description}`}</p>
                }
                <button id="seeProduct">SEE PRODUCT</button>
            </div>

        </div>
    )

}

export default ProductView