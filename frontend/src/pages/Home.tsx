import { useEffect } from "react"
import CardContainer from "../features/tours/card/CardContainer.tsx"

function Home() {
    useEffect(() => {
        document.title = "Natours Reloaded | All Tours"
    }, [])

    return (
        <main className="flex justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
            <CardContainer />
        </main>
    )
}

export default Home
