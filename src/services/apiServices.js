import axios from "../utils/axiosCustomize";
const postCreateUser = (email, password, address, phoneNumber, role, avatar) => {
    let data = {
        email: email,
        password: password,
        address: address,
        phoneNumber: phoneNumber,
        role: role,
        avatar: avatar,
    };
    return axios.post("/user", data);
};
const postLogin = (email, password) => {
    let data = {
        email: email,
        password: password,
    };

    return axios.post("/user/login", data);
};

const getAllUsers = () => {
    return axios.get("/user");
};
const putUpdateUser = (_id, address, phoneNumber, role, avatar) => {
    let data = {
        address: address,
        phoneNumber: phoneNumber,
        role: role,
        avatar: avatar,
    };
    return axios.put(`/user/${_id}`, data);
};
const deleteUser = (_id) => {
    return axios.delete(`/user/${_id}`);
};

const postCreateCategory = (name, avatar) => {
    let data = {
        name: name,
        avatar: avatar,
    };
    return axios.post("/category", data);
};
const getAllCategories = () => {
    return axios.get("/category");
};
const putUpdateCategory = (_id, name, avatar) => {
    let data = {
        name: name,
        avatar: avatar,
    };
    return axios.put(`/category/${_id}`, data);
};
const deleteCategory = (_id) => {
    return axios.delete(`/category/${_id}`);
};

const postCreateProduct = (name, category, importprice, sellingprice, weight, presentimage, description, count) => {
    let data = {
        name: name,
        category: category,
        importprice: importprice,
        sellingprice: sellingprice,
        weight: weight,
        presentimage: presentimage,
        description: description,
        count: count,
    };
    return axios.post("/product", data);
};
const getAllProducts = () => {
    return axios.get("/product");
};
const putUpdateProduct = (_id, name, category, importprice, sellingprice, weight, presentimage, description, count) => {
    let data = {
        name: name,
        category: category,
        importprice: importprice,
        sellingprice: sellingprice,
        weight: weight,
        presentimage: presentimage,
        description: description,
        count: count,
    };
    return axios.put(`/product/${_id}`, data);
};
const deleteProduct = (_id) => {
    return axios.delete(`/product/${_id}`);
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
    postCreateUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    postCreateCategory,
    getAllCategories,
    putUpdateCategory,
    deleteCategory,
    postCreateProduct,
    getAllProducts,
    putUpdateProduct,
    deleteProduct,
    postCreateOrder,
    getAllOrders,
    putUpdateOrder,
    deleteOrder,
    postCreateComment,
    getCommentsProduct,
    putUpdateComment,
    deleteComment,
};
