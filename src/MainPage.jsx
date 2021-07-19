import React from 'react'
import Headphones from './assets/shared/desktop/image-headphones.png'
import Speakers from './assets/shared/desktop/image-speakers.png'
import Earphones from './assets/shared/desktop/image-earphones.png'

import ProductView from './ProductView'
let data = {
	products: {
		headphones: {
			0: {
				name: "XX99 MARK II",
				type: 'headphones',
				description: "Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.",
				image: "images/home/tablet/image-header.jpg",
				isNewProduct: true,
			},
			1: {
				name: "XX59",
				type: 'headphones',
				description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, ad`,
				image: "images/category-headphones/desktop/image-xx59.jpg",
				isNewProduct: false,
			}
		},
		earphones: {
			0: {
				name: "YX1",
				type: 'earphones',
				description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptates corrupti enim.`,
				image: "images/home/desktop/image-earphones-yx1.jpg",
				isNewProduct: false,
			}
		},
		speakers: {
			0: {
				name: "ZX9",
				type: 'speakers',
				description: "Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.",
				image: "images/home/desktop/image-speaker-zx9.png",
				isNewProduct: false,
			},
			1: {
				name: "ZX7",
				type: 'speakers',
				description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, nisi saepe.`,
				image: 'images/home/desktop/image-speaker-zx7.jpg',
				isNewProduct: false
			}
			
		},
	}
}

const MainPage = () => {
    return (
		<>
			<main>
				<div id="showcase" className="vh100">
					{/* <ProductView type="main" imgAlign="right" data={data.products.headphones[0]} /> */}
					<div className="productItem">
						<h6>NEW PRODUCT</h6>
						<h1>XX99 MARK II HEADPHONES</h1>
						<p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
						<button id="productItemButton">SEE PRODUCT</button>
					</div>
				</div>
				<div id="content">
					<div id="content__categories-container">
						<div className="content__categories">
							<img src={Earphones} alt="EARPHONES" style={{translate: "0 5%"}}/>
							<h6>EARPHONES</h6>
							<a href="EARPHONES">SHOP</a>
						</div>
						<div className="content__categories">
							<img src={Speakers} alt="SPEAKERS" />
							<h6>SPEAKERS</h6>
							<a href="#SPEAKERS">SHOP</a>
						</div>
						<div className="content__categories">
							<img src={Headphones} alt="HEADPHONES" />
							<h6>HEADPHONES</h6>
							<a href="#headphones">SHOP</a>
						</div>
					</div>
					<div id="content__featured">
						<ProductView type="main" imgAlign="left" data={data.products.speakers[0]} />
						<ProductView type="asBackground" imgAlign="right" data={data.products.speakers[1]} />
						<ProductView type="split" imgAlign="left" data={data.products.earphones[0]}/>
					</div>
					<div id="content__about">
						<div><h1>BRINGING YOU <br></br>THE<span> BEST </span>AUDIO GEAR</h1><p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p></div>
						<div><img src="images/home/desktop/image-best-gear.jpg" alt="The best audio gear" /></div>
					</div>
				</div>
			</main>
			<footer id="footer" role="contentinfo">
				<div className="columns-2-flex">
					<div className="col">
						<p>Audiophile is an all-in-one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of your personal audio. Come and visit our demo facility. We're open 7 days a week.</p>
						<p>Copyright 2021. All rights reserved</p>
					</div>
					<div className="col">
						<h3>audiophile</h3>
						<div id="link-icons">
							<a href="#facebook-link" style={{background: "url('images/shared/desktop/icon-facebook.svg') no-repeat"}}> </a>
							<a href="#twitter-link" style={{background: "url('images/shared/desktop/icon-twitter.svg') no-repeat"}}> </a>
							<a href="instagram-link" style={{background: "url('images/shared/desktop/icon-instagram.svg') no-repeat"}}> </a>
						</div>
					</div>
				</div>

			</footer>
		</>

    )
}

export default MainPage