import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = ({ isAuthenticate }) => {
    return (
        <div>{isAuthenticate ? <Navigate to={"/profile"} /> : <Outlet />}</div>
    )
}

export default PublicRouter;