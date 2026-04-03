import { useEffect } from "react"
import CardContainer from "../features/tours/card/CardContainer.tsx"

function Home() {
    useEffect(() => {
        document.title = "Natours Reloaded | All Tours"
    }, [])

    return (
        <main className="flex items-center justify-center px-32 py-24">
            <CardContainer />
        </main>
    )
}

export default Home
