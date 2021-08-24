import { useEffect } from "react"
import { useRouter } from 'next/router'

const Pid = (query) => {
    const router = useRouter()
    const pid = router.query.pid || []
    console.log(pid)
    useEffect(() => {
    })

    return (
        <div>Hellooo</div>
    )
}

export default Pid