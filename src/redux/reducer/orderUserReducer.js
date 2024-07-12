const orderUserState = {
    listItemsOder: [0],
    total: 0,
};
const orderUserReducer = (state = orderUserState, action) => {
    switch (action.type) {
        case 'Update_order_user':
            const newItems = action.payload;
            const newTotal = newItems.reduce((acc, item) => acc + item.sellingprice * item.CountOrder, 0);
            return {
                ...state,
                listItemsOder: newItems,
                total: newTotal,
            };


        case "Clear_order_user":
            return {
                ...state,
                listItemsOder: [],
                total: 0,
            };
        default:
            return state;
    }
};

export default orderUserReducer;
