const CHATBOX_STATE = {
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

const chatBoxReducer = (state = CHATBOX_STATE, action) => {
    switch (action.type) {
        case "PUSH_NEW_MESSAGE":
            return {
                ...state,
                
            };
        default:
            return state;
    }
};

export default chatBoxReducer;
