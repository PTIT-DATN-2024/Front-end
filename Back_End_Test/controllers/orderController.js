const {  Order } = require("../model/model");

const orderController = {
    //ADD Order
    addOrder: async (req, res) => {
        try {
            const newOrder = new Order(req.body);
            const saveOrder = await newOrder.save();
            res.status(200).json({ EC: 0, MS: "Add Order success!", saveOrder });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Add Order error!", err }); //HTTP REQUEST CODE
        }
    },
    //GET ALL Order

    getAllOrders: async (req, res) => {
        try {
            const ordersOld = await Order.find()
                .populate("listItem.idProduct", "name presentImage sellingprice") // Populate product fields
                .populate("user", "email avatar"); 
            if (!ordersOld) {
                return res.status(404).json({ message: "Không tìm thấy đơn hàng nào." });
            }
            const orders = ordersOld.map((order) => ({
                _id: order._id,
                user: {
                    idUser: order.user._id,
                    emailUser: order.user.email,
                    avatarUser: order.user.avatar ? `/v1/uploads/users/${order.user.avatar.replace("uploads\\users\\", "")}` : null,
                },
                listItem: order.listItem.map((item) => ({
                    idProduct: item.idProduct._id,
                    nameProduct: item.idProduct.name,
                    presentImageProduct: item.idProduct.presentImage? `/v1/uploads/products/${item.idProduct.presentImage.replace("uploads\\products\\", "")}` : null,
                    sellingpriceProduct: item.idProduct.sellingprice,
                    quantity: item.quantity,
                    sum: item.sum,
                })),
                total: order.total,
                createdAt: order.createdAt,
            }));
            res.json({ EC: 0, MS: "Get all Order success!", orders });
        } catch (err) {
            res.status(500).json({ EC: 0, MS: "Get all Order success!", err });
        }
    },

    //GET AN Order
    getAnOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id)
                .populate("listItem.idProduct", "name presentimage sellingprice") // Populate product fields
                .populate("user", "email avatar"); // Populate user field

            if (!order) {
                return res.status(404).json({ EC: 1, MS: "Order not found" });
            }
            const formattedOrder = {
                _id: order._id,
                user: {
                    idUser: order.user._id,
                    emailUser: order.user.email,
                    avatarUser: order.user.avatar,
                },
                listItem: order.listItem.map((item) => ({
                    idProduct: item.idProduct._id,
                    nameProduct: item.idProduct.name,
                    presentimageProduct: item.idProduct.presentimage,
                    sellingPriceProduct: item.idProduct.sellingprice,
                    quantity: item.quantity,
                    sum: item.sum,
                })),
                total: order.total,
                createdAt: order.createdAt,
            };
            res.status(200).json({ EC: 0, MS: "Get an Order success!", order: formattedOrder });
        } catch (err) {
            res.status(500).json({ EC: 2, MS: "Get an Order error!", err });
        }
    },

    updateOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            await order.updateOne({ $set: req.body });
            res.status(200).json({ EC: 0, MS: "Update Order success!" });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Update Order error!", err });
        }
    },
    //DELETE Order
    deleteOrder: async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json({ EC: 0, MS: "Delete Order success!" });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Delete Order error!", err });
        }
    },
};
module.exports = orderController;
