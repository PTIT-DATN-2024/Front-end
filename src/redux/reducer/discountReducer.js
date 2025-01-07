
const discountState = {
    listDiscount:[],
};
const discountReducer = (state = discountState, action) => {
    switch (action.type) {
        case "fetch_all_discount":
            return {
                ...state,
                listDiscount: action?.payload,  
            };

        default:
            return state;
    }
};

export default discountReducer;
