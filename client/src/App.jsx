import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import Submissions from "./pages/Submissions";
import PendingRequests from "./pages/PendingRequests";
import Home from "./pages/Home";

function App() {
    const isUserLoggedIn =
        useSelector((state) => state.auth.status) ||
        localStorage.getItem("isLoggedIn");

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path="/auth"
                    element={<AuthPage />}
                    errorElement={<NotFound />}
                ></Route>
                <Route
                    path="/"
                    element={
                        isUserLoggedIn ? <Home /> : <Navigate to="/auth" />
                    }
                    errorElement={<NotFound />}
                >
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                        errorElement={<NotFound />}
                    ></Route>
                    <Route
                        path="/product/:productId"
                        element={<ProductPage />}
                        errorElement={<NotFound />}
                    ></Route>
                    <Route
                        path="/profile"
                        element={<ProfilePage />}
                        errorElement={<NotFound />}
                    ></Route>
                    <Route
                        path="/submissions"
                        element={<Submissions />}
                        errorElement={<NotFound />}
                    ></Route>
                    <Route
                        path="/pending-requests"
                        element={<PendingRequests />}
                        errorElement={<NotFound />}
                    ></Route>
                </Route>
                <Route
                    path="/broken"
                    element={<NotFound />}
                    errorElement={<NotFound />}
                ></Route>
            </>
        )
    );

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
