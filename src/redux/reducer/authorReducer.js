const USER_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        id: "",
        email: "",
        username: "",
        fullName: "",
        address: "",
        phone: "",
        role: "",
        avatar: "",
        isDelete: "",
        createdAt: "",
        updatedAt: "",
    },
    isAuthenticated: false,
};

const userReducer = (state = USER_STATE, action) => {
    switch (action.type) {
        case "fetch_user_login_success":
            return {
                ...state,
                account: {
                    username: action?.payload?.user?.user?.username || "",
                    fullName: action?.payload?.user?.user?.fullName || "",
                    address: action?.payload?.user?.user?.address || "",
                    phone: action?.payload?.user?.user?.phone || "",
                    isDelete: action?.payload?.user?.user?.isDelete || "",
                    createdAt: action?.payload?.user?.user?.createdAt || "",
                    updatedAt: action?.payload?.user?.user?.updatedAt || "",
                    refresh_token: "",
                    access_token: action?.payload?.user?.token || "",
                    email: action?.payload?.user?.email || "",
                    role: action?.payload?.user?.role || "",
                    avatar: action?.payload?.user?.avatar || "",
                    id: action?.payload?.user?.id || "",
                },
                isAuthenticated: true,
            };
        case "user_logout":
            return {
                ...state,
                account: {
                    access_token: "",
                    refresh_token: "",
                    email: "",
                    username: "",
                    fullName: "",
                    address: "",
                    phone: "",
                    role: "",
                    avatar: "",
                    isDelete: "",
                    createdAt: "",
                    updatedAt: "",
                    id: "",
                },
                isAuthenticated: false,
            };

        default:
            return state;
    }
};

export default userReducer;
