const cartState = {
    cartItems: [], // Danh sách sản phẩm trong giỏ hàng
    message: "",   // Thông báo từ API
    errorCode: null, // Mã lỗi nếu có
};

const cartReducer = (state = cartState, action) => {
    switch (action.type) {
        case "FETCH_CART_SUCCESS":
            return {
                ...state,
                cartItems: action.payload.cart || [], // Lấy danh sách sản phẩm từ API
                message: action.payload.MS,         // Lấy thông báo từ API
                errorCode: action.payload.EC,       // Lấy mã lỗi từ API
            };
        case "CLEAR_CART":
            return {
                ...state,
                cartItems: [], // Xóa toàn bộ giỏ hàng
                message: "Cart cleared.",
                errorCode: null,
            };
        case "UPDATE_CART_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.cartDetailId === action.payload.cartDetailId
                        ? { ...item, quantity: action.payload.quantity, totalPrice: action.payload.totalPrice }
                        : item
                ),
            };
        case "REMOVE_CART_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.cartDetailId !== action.payload.cartDetailId
                ),
            };
        case "RESET_CART":
            return {
                ...state,
                cartItems: [], // Danh sách sản phẩm trong giỏ hàng
                message: "",   // Thông báo từ API
                errorCode: null, // Mã lỗi nếu có
            }
        default:
            return state;
    }
};

export default cartReducer;
