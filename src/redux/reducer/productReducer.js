const productState = {
    listProducts: [],
    total: 0,
};

const calculateTotal = (listProducts) => {
    return listProducts.reduce((acc, product) => acc + product.sellingprice * product.CountOrder, 0);
};

const productReducer = (state = productState, action) => {
    switch (action.type) {
        case "fetch_all_product":
            const productsWithCountOrder = action.payload.map((product) => ({
                ...product,
                CountOrder: 0, // Thêm thuộc tính CountOrder với giá trị ban đầu là 0 cho mỗi sản phẩm
            }));
            return {
                ...state,
                listProducts: productsWithCountOrder,
                total: calculateTotal(productsWithCountOrder),
            };
        case "reset_order_counts":
            const resetProducts = state.listProducts.map((product) => ({
                ...product,
                CountOrder: 0,
            }));
            return {
                ...state,
                listProducts: resetProducts,
                total: 0, // Reset total khi reset CountOrder
            };
        case "add_product":
            const { productId, quantity } = action.payload;
            const updatedProductsAdd = state.listProducts.map((product) => (product._id === productId ? { ...product, CountOrder: product.CountOrder + quantity } : product));
            return {
                ...state,
                listProducts: updatedProductsAdd,
                total: calculateTotal(updatedProductsAdd),
            };

        case "remove_product":
            const updatedProductsRemove = state.listProducts.map((product) => (product._id === action.payload && product.CountOrder > 0 ? { ...product, CountOrder: product.CountOrder - 1 } : product));
            return {
                ...state,
                listProducts: updatedProductsRemove,
                total: calculateTotal(updatedProductsRemove),
            };

        default:
            return state;
    }
};

export default productReducer;
