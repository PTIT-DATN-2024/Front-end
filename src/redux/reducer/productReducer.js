const productState = {
    listProducts: [],
};

const productReducer = (state = productState, action) => {
    switch (action.type) {
        case "fetch_all_product":
            return {
                ...state,
                listProducts: action.payload,
            };
        case "reset_product":
            return {
                ...state,
                listProducts: [],
            };

        default:
            return state;
    }
};

export default productReducer;
