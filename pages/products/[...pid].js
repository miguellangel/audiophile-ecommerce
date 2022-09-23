import Head from 'next/head'
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { Main, Sidebar } from '../../components/Product.js'
import styles from '/styles/products.module.scss'

import { db } from '../../firebase/config'
import { query, collection, limit, getDoc, getDocs, doc } from "firebase/firestore"
import getData from '../../firebase/getStaticData'


const DynamicRouter = ({filters, response}) => {
	const router = useRouter()
	const query = router.query
	const [ data, setData ] = useState(response)
	
	useEffect(() => {setData(response);console.log(router.asPath, data)}, [router.asPath]) // reset data every time route changes
	// useEffect(() => console.log('rerender', router.asPath, data))
	
	const productsContainer = useRef(null)
	const filtersApplied = useRef(null)

	async function getRef() {
		try {
			let value = await filtersApplied
			return value
		} catch (e) {
			console.log(e)
		}
	}
	
	return (
		<>
			<Head>
				<title>{query.pid[0]}</title>
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
			<div ref={productsContainer} className={styles.container}>
				<Sidebar onGetRef={getRef} filters={filters} />
				{data?<Main ref={filtersApplied} data={data} type={query.pid[0]} />:null}
			</div>
		
		</>
	)

}

export const getStaticPaths = async () => {
	return {
		paths: [
			{ params: { pid: ['Headphones'], page: 1 } },
			{ params: { pid: ['Earphones'], page: 1 } },
			{ params: { pid: ['Speakers'], page: 1 } }
		],
		fallback: false
	}
}

export const getStaticProps = async ({ params }) => {
	const DynamicFilters = await import(`../../prerender/filters/${params.pid[0]}`)
	const filters = await JSON.parse(JSON.stringify(DynamicFilters.default)) ?? null

	const DynamicData = await import(`../../prerender/products/${params.pid[0]}`)
	const data = await JSON.parse(JSON.stringify(DynamicData.default)) ?? null

	const response = await getData(params)
	// console.log(response.json())

	return {
		props: {
			filters,
			response: JSON.parse(JSON.stringify(response))
		} 
	}
}
export default DynamicRouter