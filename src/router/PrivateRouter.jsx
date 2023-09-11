import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = ({ isAuthenticate }) => {
    return (
        <div>{isAuthenticate ? <Outlet /> : <Navigate to={"/profile"} />}</div>
    )
}

export default PrivateRouter;