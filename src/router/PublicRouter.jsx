import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = ({ isAuthenticate }) => {
    return (
        <div>{isAuthenticate ? <Navigate to={"/"} /> : <Outlet />}</div>
    )
}

export default PublicRouter;