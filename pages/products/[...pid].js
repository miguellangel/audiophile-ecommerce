import { useRouter } from "next/router"
import { useEffect } from "react"
import Product from '../../components/Product.js'


const DynamicRouter = ({ filters, data}) => {

    const router = useRouter()
    const pid = router.query.pid || []

    return (
        <Product type={ pid[0] } filters={ filters } data = { data }/>
    )

}

export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { pid: [ 'Headphones' ]}},
            { params: { pid: [ 'Earphones' ]}},
            { params: { pid: [ 'Speakers' ]}}
        ],
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {

    const DynamicFilters = await import(`../../prerender/filters/${ params.pid[0] }`)
    const filters = await JSON.parse(JSON.stringify(DynamicFilters.default)) ?? null

    const DynamicData = await import(`../../prerender/products/${ params.pid[0] }`)
    const data =await JSON.parse(JSON.stringify(DynamicData.default)) ?? null

    return { props: { filters, data } }
}
export default DynamicRouter