import { Route, Routes } from "react-router"
import { lazy, Suspense } from "react"
import FullPage from "./components/FullPage.tsx"
import BaseLayout from "./components/BaseLayout.tsx"
import Spinner from "./components/Spinner.tsx"
import TestSpinner from "./pages/TestSpinner.tsx"

const Home = lazy(() => import("./pages/Home.tsx"))
const Tour = lazy(() => import("./pages/Tour.tsx"))
const Login = lazy(() => import("./pages/Login.tsx"))
const Signup = lazy(() => import("./pages/Signup.tsx"))
const Account = lazy(() => import("./pages/Account.tsx"))
const PageNotFound = lazy(() => import("./pages/PageNotFound.tsx"))

function App() {
    return (
        <Suspense
            fallback={
                <FullPage>
                    <Spinner />
                </FullPage>
            }
        >
            <Routes>
                <Route path="/test-spinner" element={<TestSpinner />} />
                <Route element={<BaseLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/tours/:slug" element={<Tour />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="account" element={<Account />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    )
}

export default App
