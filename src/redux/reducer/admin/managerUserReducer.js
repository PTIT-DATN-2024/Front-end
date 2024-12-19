const USER_STATE = {
    users: [],
};
const managerUserReducer = (state = USER_STATE, action) => {
    switch (action.type) {
        case "fetch_all_users":
            return {
                ...state,
                users: action?.payload, 
            };
        case "reset_list_user":
            return {
                ...state,
                users: [], 
            };

        default:
            return state;
    }
};

export default managerUserReducer;
