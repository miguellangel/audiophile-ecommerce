import Head from 'next/head'
import { useRouter } from "next/router"
import { useEffect, useRef, useCallback } from "react"
import Main from '../../components/Product.js'
import Sidebar from '../../components/Sidebar'
import styles from '/styles/products.module.scss'

import getData from '/firebase/getStaticData.js'



const DynamicRouter = ({ filters, type, response }) => {
    const filtersApplied = useRef(null)
    const sendRef = useCallback(async () => filtersApplied, [])

    return (
        <>
            <Head>
                <title>{type}</title>
                <meta name="description" content="A mock audiophile e-commerce site!" />
                <link rel="icon" href="/favicon.ico" />

                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
                {/* Chrome, Firefox OS and Opera */}
                <meta name="theme-color" content="#161616" />
                {/* Windows Phone */}
                <meta name="msapplication-navbutton-color" content="#161616" />
                {/* iOS Safari */}
                <meta name="apple-mobile-web-app-status-bar-style" content="#161616" />
            </Head>
            <div className={styles.container}>
                <Sidebar receiveRef={sendRef} filters={filters} />
                <Main filterRef = {div => filtersApplied.current = div} data={response} />
            </div>

        </>
    )

}

export const getStaticPaths = async () => {
    // get # of pages in each page id
    // map each path

    return {
        paths: [
            { params: { pid: ['Headphones'] } },
            { params: { pid: ['Earphones'] } },
        ],
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {

    // for each static path generated, feed it the subset depending on which page it is at
    // this means either call from db the whole payload, separate and feed the items_per_page into each page #
    // or feed the entire payload to the

    const DynamicFilters = await import(`../../prerender/filters/${params.pid[0]}`)
    const filters = await JSON.parse(JSON.stringify(DynamicFilters.default)) ?? null

    const DynamicData = await import(`../../prerender/products/${params.pid[0]}`)
    const data = await JSON.parse(JSON.stringify(DynamicData.default)) ?? null

    const response = await getData(params)

    return {
        props: {
            filters,
            type: params.pid[0],
            response: JSON.parse(JSON.stringify(response))
        }
    }
}
export default DynamicRouter
