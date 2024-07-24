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
        default:
            return state;
    }
};

export default managerUserReducer;
