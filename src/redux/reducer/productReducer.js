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
        default:
            return state;
    }
};

export default productReducer;
