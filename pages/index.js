import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import ProductView from '../components/ProductView'
import Link from 'next/link'



const Home = () => {

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

	return (
		<>
			<Head>
				<title>Audiophile</title>
				<meta name="description" content="A mock audiophile e-commerce site!"/>
				<link rel="icon" href="/favicon.ico" />
				
				<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"/>
				{/* Chrome, Firefox OS and Opera */}
				<meta name="theme-color" content="#161616" />
				{/* Windows Phone */}
				<meta name="msapplication-navbutton-color" content="#161616" />
				{/* iOS Safari */}
				<meta name="apple-mobile-web-app-status-bar-style" content="#161616" />
			</Head>

			<div id={styles.showcase} className={styles.vh100}>
					{/* <ProductView type="main" imgAlign="right" data={data.products.headphones[0]} /> */}
				<div className={styles.productItem}>
					<h6>NEW PRODUCT</h6>
					<h1>XX99 MARK II HEADPHONES</h1>
					<p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
					<button id={styles.productItemButton}>SEE PRODUCT</button>
				</div>
			</div>
				
			<div id={styles.content}>
				<div id={styles.content__categoriesContainer}>
					<div className={styles.content__categories}>
						<img src={'images/shared/desktop/image-earphones.png'} alt="EARPHONES" style={{translate: "0 5%"}}/>
						<h6>EARPHONES</h6>
						<Link href='/products/Earphones?page=1'>
							<a>SHOP</a>
						</Link>
					</div>
					<div className={styles.content__categories}>
						<img src={'images/shared/desktop/image-headphones.png'} alt="HEADPHONES" />
						<h6>HEADPHONES</h6>
						<Link href='/products/Headphones?page=1'>
							<a>SHOP</a>
						</Link>
					</div>
				</div>
				<div id={styles.content__featured}>
					<ProductView type="main" imgAlign="left" data={data.products.speakers[0]} />
					<ProductView type="asBackground" imgAlign="right" data={data.products.speakers[1]} />
					<ProductView type="split" imgAlign="left" data={data.products.earphones[0]}/>
				</div>
				<div id={styles.content__about}>
					<div><h1>BRINGING YOU <br></br>THE<span> BEST </span>AUDIO GEAR</h1><p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p></div>
					<div><img src="images/home/desktop/image-best-gear.jpg" alt="The best audio gear" /></div>
				</div>
				<div id="showData">
					
				</div>
			</div>
		</>
	)
}

export default Home