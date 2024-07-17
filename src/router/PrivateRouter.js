import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = (props) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const roleUser = useSelector((state) => state.user.account.role);
    console.log(isAuthenticated,roleUser);
    if (!isAuthenticated ) {
        return <Navigate to="/login"></Navigate>;
    }
    return <>{props.children}</>;
};
export default PrivateRouter;
