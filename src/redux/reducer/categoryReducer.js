
const categoryState = {
    listCategories:[],
};
const categoryReducer = (state = categoryState, action) => {
    switch (action.type) {
        case "fetch_all_category":
            return {
                ...state,
                listCategories: action?.payload,  
            };
        case "reset_category":
            return {
                ...state,
                listCategories: [],  
            };

        default:
            return state;
    }
};

export default categoryReducer;
