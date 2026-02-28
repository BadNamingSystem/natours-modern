import { useParams } from "react-router"

function Tour() {
    const { slug } = useParams()

    return <div>Tour Details Page: {slug}</div>
}

export default Tour
