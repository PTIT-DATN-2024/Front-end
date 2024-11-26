import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PrivateRouter = (props) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const roleUser = useSelector((state) => state.user.account.role);
    console.log(isAuthenticated, roleUser);
    if (!isAuthenticated) {
        toast.error("Bạn chưa đăng nhập");
        return <Navigate to="/login"></Navigate>;
    }
    if (roleUser !== "ADMIN") {
        toast.error("Bạn chưa được cấp quyền truy cập");
        return <Navigate to="/"></Navigate>;
    }
    return <>{props.children}</>;
};
export default PrivateRouter;
