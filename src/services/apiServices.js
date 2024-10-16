import axios from "../utils/axiosCustomize";
const postCreateUser = (formData, config) => {
    return axios.post("/user", formData, config);
};

const getAllUsers = (config) => {
    return axios.get("/user",config);
};
const putUpdateUser = (_id, formData,config) => {

    return axios.put(`/user/${_id}`, formData, config);
};
const deleteUser = (_id,config) => {
    return axios.delete(`/user/${_id}`,config);
};
const postLogin = (dataLogin) => {
    return axios.post("/user/login", dataLogin);
};
const postSignUp = (formData,config) => {
    return axios.post("/user/signup", formData,config);
};

const postCreateCategory = (formData, config) => {
    return axios.post("/category", formData, config);
};
const getAllCategories = () => {
    return axios.get("/category");
};
const putUpdateCategory = (_id, formData, config) => {
    return axios.put(`/category/${_id}`, formData, config);
};
const deleteCategory = (_id,config) => {
    return axios.delete(`/category/${_id}`,config);
};
const postCreateBgImage = (formData, config) => {
    return axios.post("/bgImage", formData, config);
};
const getAllBgImages = () => {
    return axios.get("/bgImage");
};
const putUpdateBgImage = (_id, formData, config) => {
    return axios.put(`/bgImage/${_id}`, formData, config);
};
const deleteBgImage = (_id,config) => {
    return axios.delete(`/bgImage/${_id}`,config);
};



const postCreateProduct = (formData, config) => {
    return axios.post("/product", formData, config);
};
const postVote = (productId, formData, config) => {
    return axios.post(`/product/rateProduct/${productId}`, formData, config);
};
const getAllProducts = () => {
    return axios.get("/product");
};
const putUpdateProduct = (_id, formData, config) => {
    return axios.put(`/product/${_id}`, formData, config);
};
const deleteProduct = (_id,config) => {
    return axios.delete(`/product/${_id}`,config);
};


// user
// listItem
// Total
// createdAt

const postCreateOrder = (user, listItem, Total, createdAt) => {
    let data = {
        user: user,
        listItem: listItem,
        Total: Total,
        createdAt: createdAt,
    };
    return axios.post("/order", data);
};
const postCreateUserOrder = (formData,config) => {

    return axios.post("/order", formData);
};
const getAllOrders = () => {
    return axios.get("/order");
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
const deleteOrder = (_id) => {
    return axios.delete(`/order/${_id}`);
};
// commentapi
// "idProduct": "6683994c1fb0f44c34b608a2",
// "idUser": "668390ef6954eb2c817d4d84",
// "content": "cmt2"
// // "replyFor": "6690af22950012ba9728b913"
const postCreateComment = (idProduct, idUser, content, replyFor = null) => {
    let data = {
        idProduct: idProduct,
        idUser: idUser,
        content: content,
    };

    if (replyFor !== null) {
        data.replyFor = replyFor;
    }

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

export {
    postLogin,
    postSignUp,
    postCreateUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
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
    putUpdateProduct,
    deleteProduct,
    postVote,
    postCreateOrder,
    postCreateUserOrder,
    getAllOrders,
    putUpdateOrder,
    deleteOrder,
    postCreateComment,
    getCommentsProduct,
    putUpdateComment,
    deleteComment,
};
