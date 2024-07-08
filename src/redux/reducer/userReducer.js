import { INCREMENT, DECREMENT } from "../action/counterAction";
const INITIAL_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        userName: "",
        role: "",
        avatar: "",
    },
    isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
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
                isAuthenticated: true,
            };

        case DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            };
        default:
            return state;
    }
};

export default userReducer;
