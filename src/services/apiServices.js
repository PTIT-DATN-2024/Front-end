import axios from "../utils/axiosCustomize";

// USER, AUTHOR
const postCreateUser = (formData, config) => {
    return axios.post("/auth/signup", formData, config);
};
const getAllUsers = (config) => {
    return axios.get("/customer", config);
};
const putUpdateUser = (_id, formData, config) => {

    return axios.put(`/user/${_id}`, formData, config);
};
const deleteUser = (_id, config) => {
    return axios.delete(`/customer/customer/${_id}`, config);
};
const deleteStaff = (_id, config) => {
    return axios.delete(`/customer/staff/${_id}`, config);
};
const postLogin = (dataLogin) => {
    return axios.post("/auth/login", dataLogin);
};
const postSignUp = (formData, config) => {
    return axios.post("/auth/signup", formData, config);
};


// CATEGORY 
const postCreateCategory = (formData, config) => {
    return axios.post("/category", formData, config);
};
const getAllCategories = () => {
    return axios.get("/category");
};
const putUpdateCategory = (categoryId, data, config) => {
    return axios.put(`/category/${categoryId}`, data);
};
const deleteCategory = (categoryId, config) => {
    return axios.delete(`/category/${categoryId}`);
};



// IMAGE SHOP
const postCreateBgImage = (formData, config) => {
    return axios.post("/bgImage", formData, config);
};
const getAllBgImages = () => {
    return axios.get("/bgImage");
};
const putUpdateBgImage = (_id, formData, config) => {
    return axios.put(`/bgImage/${_id}`, formData, config);
};
const deleteBgImage = (_id, config) => {
    return axios.delete(`/bgImage/${_id}`, config);
};



// PRODUCT 
const postCreateProduct = (formData, config) => {
    return axios.post("/product", formData, config);
};
const postVote = (productId, formData, config) => {
    return axios.post(`/product/rateProduct/${productId}`, formData, config);
};
const deleteVote = (productId, formData, config) => {
    return axios.delete(`/product/removeRating/${productId}`, formData, config);
};
const getAllProducts = () => {
    return axios.get("/product");
};
const putUpdateProduct = (_id, formData, config) => {
    return axios.put(`/product/${_id}`, formData, config);
};
const deleteProduct = (_id, config) => {
    return axios.delete(`/product/${_id}`, config);
};
const getSearchProduct = (query) => {
    return axios.get(`/product/search?query=${query}`);
};
// cart 
const getCartbyUserid = (customerId) => {
    return axios.get(`/cart/customer/${customerId}`);
};
const postProductToCart = (data) => {
    return axios.put(`/cart`, data);
};
const removeProductToCart = (cartDetailId) => {
    return axios.delete(`/cart/cartDetail/${cartDetailId}`);
};
const changeQuantityOfProductToCart = (cartDetailId, quantity) => {
    return axios.put(`/cart/cartDetail/${cartDetailId}?quantity=${quantity}`);
};


// ORDER 
const postCreateOrder = (user, listItem, Total, createdAt) => {
    let data = {
        user: user,
        listItem: listItem,
        Total: Total,
        createdAt: createdAt,
    };
    return axios.post("/order", data);
};
const postCreateUserOrder = (formData, config) => {
    return axios.post("/order", formData);
};
const getAllOrders = () => {
    return axios.get("/order");
};
const getOrdersByUserId = (userId) => {
    return axios.get(`/order/user/${userId}`);
};
const putUpdateOrder = (_id, user, listItem, Total, createdAt) => {
    let data = {
        user: user,
        listItem: listItem,
        Total: Total,
        createdAt: createdAt,
    };
    return axios.put(`/order/${_id}`, data);
};
const putEditStatusOrder = (_id, data) => {
    return axios.put(`/order/${_id}`,data);
};
const deleteOrder = (_id) => {
    return axios.delete(`/order/${_id}`);
};

// CMT 
const postCreateComment = (idProduct, idUser, content, rating) => {
    let data = {
        idProduct: idProduct,
        idUser: idUser,
        content: content,
        rating: rating,
    };
    return axios.post("/comment", data);
};
const getCommentsProduct = (_idProduct) => {
    return axios.get(`/comment/product/${_idProduct}`);
};
const putUpdateComment = (_id, user, listItem, Total, createdAt) => {
    let data = {
        user: user,
        listItem: listItem,
        Total: Total,
        createdAt: createdAt,
    };
    return axios.put(`/comment/${_id}`, data);
};
const deleteComment = (_id) => {
    return axios.delete(`/comment/${_id}`);
};
// dashboard 
const getDataEcommerce = () => {
    return axios.get("/dashboard/ecommerce");
};
// pay
const postCreatePayment = (formData, config) => {
    return axios.post("/payment/create_payment", formData);
};

export {
    postLogin,
    postSignUp,
    postCreateUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    deleteStaff,

    postCreateCategory,
    getAllCategories,
    putUpdateCategory,
    deleteCategory,

    postCreateBgImage,
    getAllBgImages,
    putUpdateBgImage,
    deleteBgImage,

    postCreateProduct,
    getAllProducts,
    getSearchProduct,
    putUpdateProduct,
    deleteProduct,
    postVote,
    deleteVote,

    changeQuantityOfProductToCart,
    postProductToCart,
    removeProductToCart,
    getCartbyUserid,

    postCreateOrder,
    postCreateUserOrder,
    getAllOrders,
    getOrdersByUserId,
    putUpdateOrder,
    deleteOrder,
    putEditStatusOrder,

    postCreateComment,
    getCommentsProduct,
    putUpdateComment,
    deleteComment,

    getDataEcommerce,

    postCreatePayment,
};
