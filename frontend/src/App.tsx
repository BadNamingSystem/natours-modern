import { Route, Routes } from "react-router"
import { lazy, Suspense } from "react"
import FullPage from "./components/FullPage.tsx"
import BaseLayout from "./components/BaseLayout.tsx"
import Spinner from "./components/Spinner.tsx"
import { Toaster } from "react-hot-toast"

const Home = lazy(() => import("./pages/Home.tsx"))
const Tour = lazy(() => import("./pages/Tour.tsx"))
const Login = lazy(() => import("./pages/Login.tsx"))
const Signup = lazy(() => import("./pages/Signup.tsx"))
const Account = lazy(() => import("./pages/Account.tsx"))
const PageNotFound = lazy(() => import("./pages/PageNotFound.tsx"))

function App() {
    return (
        <>
            <Suspense
                fallback={
                    <FullPage>
                        <Spinner />
                    </FullPage>
                }
            >
                <Routes>
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
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: { duration: 3000 },
                    error: { duration: 5000 },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "#F4F4F6",
                        color: "#84849A",
                    },
                }}
            />
        </>
    )
}

export default App
