import { Route, Routes } from "react-router"
import { lazy, Suspense } from "react"
import FullPage from "./components/FullPage.tsx"
import BaseLayout from "./components/BaseLayout.tsx"
import Spinner from "./components/Spinner.tsx"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./pages/ProtectedRoute.tsx"

const Home = lazy(() => import("./pages/Home.tsx"))
const Tour = lazy(() => import("./pages/Tour.tsx"))
const Login = lazy(() => import("./pages/Login.tsx"))
const Signup = lazy(() => import("./pages/Signup.tsx"))
const Account = lazy(() => import("./pages/Account.tsx"))
const AccountSettings = lazy(() => import("./features/user/AccountSettings.tsx"))
const MyBookings = lazy(() => import("./features/bookings/MyBookings.tsx"))
const MyReviews = lazy(() => import("./features/reviews/MyReviews.tsx"))
const ForgotPassword = lazy(() => import("./features/user/ForgotPasswordForm.tsx"))
const ResetPassword = lazy(() => import("./features/user/ResetPasswordForm.tsx"))
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
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                        <Route
                            path="/me"
                            element={
                                <ProtectedRoute>
                                    <Account />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<AccountSettings />} />
                            <Route path="bookings" element={<MyBookings />} />
                            <Route path="reviews" element={<MyReviews />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
            <Toaster
                position="top-center"
                gutter={20}
                containerStyle={{ margin: "16px" }}
                toastOptions={{
                    success: { duration: 3000 },
                    error: { duration: 5000 },
                    style: {
                        fontSize: "24px",
                        maxWidth: "600px",
                        padding: "22px 26px",
                        backgroundColor: "#e5e3e3",
                        color: "#555050",
                    },
                }}
            />
        </>
    )
}

export default App
