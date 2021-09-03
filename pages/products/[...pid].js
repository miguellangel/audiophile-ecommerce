import { useRouter } from "next/router"
import { useEffect } from "react"
import Product from './index.js'

const DynamicRouter = ({ filters, data }) => {

    const router = useRouter()
    const pid = router.query.pid || []


    return (
        <Product type={ pid } filters={ filters } data = { data }/>
    )

}

export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { pid: [ 'Headphones' ]}},
            { params: { pid: [ 'Earphones' ]}},
            { params: { pid: [ 'Featured' ]}}
        ],
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {

    const reqFilters = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/${ params.pid }`)
    const reqData = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/collections/${ params.pid[0] }/page/1`)
    const filters = await reqFilters.json()
    const data = await reqData.json()
    
    return { props: { filters, data} }
}
export default DynamicRouter