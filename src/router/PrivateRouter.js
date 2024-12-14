import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

const PrivateRouter = ({ children, allowedRoles = [] }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const roleUser = useSelector((state) => state.user.account?.role);

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Bạn chưa đăng nhập");
        } else if (!allowedRoles.includes(roleUser)) {
            toast.error("Bạn chưa được cấp quyền truy cập");
        }
    }, [isAuthenticated, roleUser, allowedRoles]);

    // Kiểm tra nếu chưa đăng nhập
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Kiểm tra nếu không có quyền
    if (!allowedRoles.includes(roleUser)) {
        return <Navigate to="/" replace />;
    }

    // Render nội dung nếu đủ điều kiện
    return <>{children}</>;
};

export default PrivateRouter;
