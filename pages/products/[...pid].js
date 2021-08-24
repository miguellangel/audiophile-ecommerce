import { useRouter } from "next/router"
import Product from './index.js'

const DynamicRouter = ({ filters }) => {

    const router = useRouter()
    const pid = router.query.pid || []

    return (
        <Product type={ pid } filters={ filters }/>
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

    const request = await fetch(`http://localhost:3000/api/products/${params.pid}`)
    const filters = await request.json()
    
    return { props: { filters } }
}
export default DynamicRouter