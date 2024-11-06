const orderUserState = {
    listItemsOrder: [],
    total: 0,
};

const calculateTotal = (listItemsOrder) => {
    return listItemsOrder.reduce((acc, item) => acc + item.sellingprice * item.CountOrder, 0);
};

const orderUserReducer = (state = orderUserState, action) => {
    switch (action.type) {
        case "Update_order_user":
            const updatedItems = action.payload; // sản phẩm mới từ payload
            const updatedItemsMap = new Map(updatedItems.map(item => [item._id, item])); // Tạo map cho stateProduct
            return {
                ...state, // Giữ nguyên các trường hiện tại của state
                listItemsOrder: state.listItemsOrder
                    .filter(orderItem => {
                        // Nếu sản phẩm không có trong updatedItems, xóa khỏi order
                        if (!updatedItemsMap.has(orderItem._id)) {
                            return false;
                        }
                        return true;
                    })
                    .map(orderItem => {
                        // Tìm sản phẩm trong stateProduct để cập nhật thông tin
                        const updatedProduct = updatedItemsMap.get(orderItem._id);

                        if (updatedProduct) {
                            return {
                                ...orderItem,
                                name: updatedProduct.name || orderItem.name, // Cập nhật tên nếu có
                                importprice: updatedProduct.importprice || orderItem.importprice, // Cập nhật giá
                                sellingprice: updatedProduct.sellingprice || orderItem.sellingprice, // Cập nhật giá
                                category: updatedProduct.category || orderItem.category, // Cập nhật giá
                                weight: updatedProduct.weight || orderItem.weight, // Cập nhật giá
                                presentImage: updatedProduct.presentImage || orderItem.presentImage, // Cập nhật giá
                                description: updatedProduct.description || orderItem.description, // Cập nhật giá
                                count: updatedProduct.count || orderItem.count, // Cập nhật giá
                                rate: updatedProduct.rate || orderItem.rate, // Cập nhật giá
                                numberVote: updatedProduct.numberVote || orderItem.numberVote, // Cập nhật giá
                                isDeleted: updatedProduct.isDeleted || orderItem.isDeleted, // Cập nhật giá
                                // Counter giữ nguyên
                            };
                        }
                        return orderItem;
                    })
                    .concat(
                        updatedItems.filter(newItem => 
                            !state.listItemsOrder.some(orderItem => orderItem._id === newItem._id) // Nếu không có trong order
                        ).map(newProduct => ({
                            ...newProduct,
                            CountOrder: 0, // Thêm CountOrder mặc định là 0 khi thêm mới sản phẩm
                        }))
                    ),
                total: calculateTotal(state.listItemsOrder) // Tính lại tổng tiền của đơn hàng
            };

        case "add_product_to_order":
            const { productId, quantity } = action.payload;
            const updatedItemsAdd = state.listItemsOrder.map((item) =>
                item._id === productId ? { ...item, CountOrder: item.CountOrder + quantity } : item
            );
            return {
                ...state,
                listItemsOrder: updatedItemsAdd,
                total: calculateTotal(updatedItemsAdd),
            };

        case "decrement_product_in_order":
            const updatedItemsDecrement = state.listItemsOrder.map((item) =>
                item._id === action.payload && item.CountOrder > 0 ? { ...item, CountOrder: item.CountOrder - 1 } : item
            );
            return {
                ...state,
                listItemsOrder: updatedItemsDecrement,
                total: calculateTotal(updatedItemsDecrement),
            };

        case "remove_product_from_order":
            const updatedItemsRemove = state.listItemsOrder.map((item) =>
                item._id === action.payload ? { ...item, CountOrder: 0 } : item
            );
            return {
                ...state,
                listItemsOrder: updatedItemsRemove,
                total: calculateTotal(updatedItemsRemove),
            };

        case "Clear_order_user":
            const resetProducts = state.listItemsOrder.map((product) => ({
                ...product,
                CountOrder: 0,
            }));
            return {
                ...state,
                listItemsOrder: resetProducts,
                total: 0, 
            };

        default:
            return state;
    }
};

export default orderUserReducer;
