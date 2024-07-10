
const USER_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        userName: "",
        role: "",
        avatar: "",
    },
    isAuthenticated: false,
};
const userReducer = (state = USER_STATE, action) => {
    switch (action.type) {
        case "fetch_user_login_success":
            return {
                ...state,
                account: {
                    access_token: action?.payload?.user?.token,
                    refresh_token: "",
                    userName: action?.payload?.user?.email,
                    role: action?.payload?.user?.role,
                    avatar: action?.payload?.user?.avatar,
                },
                isAuthenticated: false,
            };

        default:
            return state;
    }
};

export default userReducer;
