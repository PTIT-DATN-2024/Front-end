// apiDocumentation.js

const apiDocumentation = [
    // USER API
    {
        api: "postLogin",
        url: "/auth/login",
        method: "POST",
        description: "Login a user",
        req: {
            body: {
                "email": "a",
                "password": "1"
            }
        },
        res: {
            "EC": 0,
            "MS": "Login Success",
            "user": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWY5YmJkMDIyZmZjODY2NmZmMTUzOCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTczMTM0NDE4MCwiZXhwIjoxNzMxMzQ3NzgwfQ.Q2NvNxzprZ1tl6n-Dnr5_v1iRixeCgIW--i-ySWIDu4",
                "id": "669f9bbd022ffc8666ff1538",
                "email": "a",
                "role": "ADMIN",
                "avatar": "uploads\\users\\1721736309814.jpg"
            }
        }
    },
    {
        api: "postSignUp",
        url: "/auth/signup",
        method: "POST",
        description: "Sign up a new user",
        req: {
            body: {
                "email": "aa",
                "password": "1",
                "address": "nghe an",
                "phone": "0123456789",
                "role": "ADMIN",
                "avatar": ""
            }
        },
        res: {
            "EC": 0,
            "MS": "Signup Successfully.",
        }
    },
    // {
    //     api: "postCreateUser",
    //     url: "/user",
    //     method: "POST",
    //     description: "Create a new user",
    //     req: {
    //         body: {
    //             "email": "a123",
    //             "password": "1",
    //             "address": "nghe an",
    //             "phoneNumber": "0123456789",
    //             "role": "ADMIN",
    //             "avatar": ""
    //         }
    //     },
    //     res: {
    //         "EC": 0,
    //         "MS": "Add user success!",
    //         "saveUser": {
    //             "email": "a123",
    //             "password": "$2a$10$3a/OMCLReQC30rpUFrkbPO9S8X1uDOzQBXbpQVJB1qOn7mf9ZT8Yq",
    //             "address": "nghe an",
    //             "phoneNumber": "0123456789",
    //             "role": "ADMIN",
    //             "avatar": null,
    //             "isDeleted": false,
    //             "_id": "673238233f6dcea0876ed773",
    //             "__v": 0
    //         }
    //     }
    // },
    {
        api: "getAllUsers",
        url: "/user", // "/customer"
        method: "GET",
        description: "Get all users",
        req: {},
        res: {
            EC: 0,
            MS: "Get all users success!",
            customers: [
                {
                    "customerId": "669f9bbd022ffc8666ff1538",
                    "email": "a",
                    "address": "1",
                    "phone": "1",
                    "role": "ADMIN",
                    "avatar": "/v1/uploads/users/1721736309814.jpg"
                }
            ]
        }
    },
    {
        api: "putUpdateUser",
        url: "/user/:id", // "/customer/.." 3 in 1
        method: "PUT",
        description: "Update user information",
        req: {
            params: {
                id: "ObjectId"          // có :id -> add param ??????
            },
            body: {
                "email": "nnqweqweqa123123123",
                "password": "nna",
                "address": "nna",
                "phone": "0123456789",
                "role": "USER",
                "avatar": "no-image"
            }
        },
        res: {
            "EC": 0,
            "MS": "Update user success!"
        }
    },
    {
        api: "getUserById",
        url: "/customer/:id", // "/customer/..."
        method: "GET",
        description: "Update user information",
        req: {

            body: {
            }
        },
        res: {
            "EC": 0,
            "MS": "Get user success!",
            "user": {
                "customerId": "673237eb3f6dcea0876ed771",
                "email": "aa",
                "address": "nna",
                "phone": "0123456789",
                "role": "ADMIN",
                "avatar": null
            }
        }
    },
    {
        api: "deleteUser",
        url: "/user/:id",
        method: "DELETE",
        description: "Delete a user",
        req: {
            params: {
                id: "ObjectId"  // ????????? :id
            }
        },
        res: {
            EC: 0,
            MS: "Delete user success!"
        }
    },


    // CATEGORY API
    {
        api: "postCreateCategory",
        url: "/category",
        method: "POST",
        description: "Create a new category",
        req: {
            body: {
                "name": "theloai5",
                "description" : "876238712531",
                "avatar": "xxx"

            }
        },
        res: {
            "EC": 0,
            "MS": "Add Category success!",
        }
    },
    {
        api: "getAllCategories",
        url: "/category",
        method: "GET",
        description: "Get all categories",
        req: {},
        res: {
            EC: 0,
            MS: "Get all categories success!",
            categories: [
                {
                    "categoryId": "668398ba1fb0f44c34b6088d",
                    "name": "Bàn phím",
                    "avatar": "/v1/uploads/categories/1728958622284.jpg"
                }
            ]
        }
    },
    {
        api: "deleteCategory",
        url: "/category/:id",
        method: "DELETE",
        description: "Delete a category",
        req: {
        },
        res: {
            "EC": 0,
            "MS": "Delete success!"
        }
    },
    {
        api: "updatecategory",
        url: "/category/:id",
        method: "PUT",
        description: "update a category",
        req: {
            params: {
                id: "ObjectId"  // ??? :id
            },
            body: {
                "name": "theloai544444",
                "avatar": ""
            }
        },
        res: {
            "EC": 0,
            "MS": "update success!"
        }
    },

    // PRODUCT API
    {
        api: "postCreateProduct",
        url: "/product",
        method: "POST",
        description: "Create a new product",
        req: {
            body: {
                "name": "food 13",
                "categoryId": "cat003",
                "importPrice": "35000",
                "sellingPrice": "55000",
                "weight": "300g",
                "avatar": "",
                "description": "example description",
                "total": 30
            }
        },
        res: {
            "EC": 0,
            "MS": "Add Product success!",
        }
    },
    {
        api: "getAllProducts",
        url: "/product",
        method: "GET",
        description: "Get all products",
        req: {
        },
        res: {
            EC: 0,
            MS: "Get all products success!",
            products: [
                {
                    "productId": "prod001",
                    "category": {
                        "categoryId": "cat001",
                        "name": "Mouse",
                        "description": "Electronic devices",
                        "avatar": "1728958738001.jpg",
                        "createdAt": "2024-11-08T10:10:24.402015"
                    },
                    "productDiscount": {
                        "productDiscountId": "disc001",
                        "discountAmount": 5.0,
                        "expiredDate": "2025-01-01T00:00:00",
                        "createdAt": "2024-11-08T10:10:24.402015",
                        "updatedAt": "2024-11-08T10:10:24.402015"
                    },
                    "name": "Laptop",
                    "total": 100,
                    "rate": 4.5,
                    "numberVote": 150,
                    "description": "High-performance laptop",
                    "importPrice": 500.0,
                    "sellingPrice": 550.0,
                    "status": "Available",
                    "weight": "300g",
                    "presentImage": "1728958738001.jpg",
                    "createdAt": "2024-11-08T10:10:24.402015",
                    "updatedAt": "2024-11-08T10:10:24.402015"
                }
            ]
        }
    },
    {
        api: "getproductbyid",
        url: "/product/:id",
        method: "GET",
        description: "Get all products",
        req: {
            params: {
                id: "ObjectId"  // ??? :id
            },
        },
        res: {
            "EC": 0,
            "MS": "Get a product success!",
            "product": {
                "productId": "prod001",
                "category": {
                    "categoryId": "cat001",
                    "name": "Mouse",
                    "description": "Electronic devices",
                    "avatar": "1728958738001.jpg",
                    "createdAt": "2024-11-08T10:10:24.402015"
                },
                "productDiscount": {
                    "productDiscountId": "disc001",
                    "discountAmount": 5.0,
                    "expiredDate": "2025-01-01T00:00:00",
                    "createdAt": "2024-11-08T10:10:24.402015",
                    "updatedAt": "2024-11-08T10:10:24.402015"
                },
                "name": "Laptop",
                "total": 100,
                "rate": 4.5,
                "numberVote": 150,
                "description": "High-performance laptop",
                "importPrice": 500.0,
                "sellingPrice": 550.0,
                "status": "Available",
                "weight": "300g",
                "presentImage": "1728958738001.jpg",
                "createdAt": "2024-11-08T10:10:24.402015",
                "updatedAt": "2024-11-08T10:10:24.402015"
            }
        }
    },
    {
        api: "getSearchProduct",
        url: "/product/search?query=a",
        method: "GET",
        description: "Search products by query",
        param: {
            query: "a"
        },
        req: {
            query: "string"  // Search query string
        },
        res: {
            EC: 0,
            MS: "Search products success!",
            products: [
                {
                    "productId": "prod001",
                    "category": {
                        "categoryId": "cat001",
                        "name": "Mouse",
                        "description": "Electronic devices",
                        "avatar": "1728958738001.jpg",
                        "createdAt": "2024-11-08T10:10:24.402015"
                    },
                    "productDiscount": {
                        "productDiscountId": "disc001",
                        "discountAmount": 5.0,
                        "expiredDate": "2025-01-01T00:00:00",
                        "createdAt": "2024-11-08T10:10:24.402015",
                        "updatedAt": "2024-11-08T10:10:24.402015"
                    },
                    "name": "Laptop",
                    "total": 100,
                    "rate": 4.5,
                    "numberVote": 150,
                    "description": "High-performance laptop",
                    "importPrice": 500.0,
                    "sellingPrice": 550.0,
                    "status": "Available",
                    "weight": "300g",
                    "presentImage": "1728958738001.jpg",
                    "createdAt": "2024-11-08T10:10:24.402015",
                    "updatedAt": "2024-11-08T10:10:24.402015"
                }
            ]
        }
    },



    // cart api
    {
        api: "getCartbyUserid",
        url: "/cart/user/:userId",
        method: "get",
        description: "post product to cart of user",
        req: {
        },
        res: {
            "MS": "Get all item form Cart successfully.",
            "EC": 0,
            "cart": [
                {
                    "cartDetailId": "cd003",
                    "cart": {
                        "cartId": "cart003",
                        "customer": {
                            "customerId": "cust003",
                            "email": "user3@example.com",
                            "password": "pass3",
                            "userName": "user3",
                            "fullName": "User Three",
                            "address": "1",
                            "role": "CUSTOMER",
                            "avatar": "1728958738001.jpg",
                            "phone": "1234567892",
                            "isDelete": "false",
                            "createdAt": "2024-11-08T10:10:24.402015",
                            "updatedAt": "2024-11-08"
                        },
                        "createdAt": "2024-11-08T10:10:24.402015",
                        "updatedAt": "2024-11-08T10:10:24.402015"
                    },
                    "product": {
                        "productId": "prod003",
                        "category": {
                            "categoryId": "cat003",
                            "name": "Appliances",
                            "description": "Home appliances",
                            "avatar": "1728958738001.jpg",
                            "createdAt": "2024-11-08T10:10:24.402015"
                        },
                        "productDiscount": {
                            "productDiscountId": "disc003",
                            "discountAmount": 15.0,
                            "expiredDate": "2025-03-01T00:00:00",
                            "createdAt": "2024-11-08T10:10:24.402015",
                            "updatedAt": "2024-11-08T10:10:24.402015"
                        },
                        "name": "Washing Machine",
                        "total": 75,
                        "rate": 4.0,
                        "numberVote": 100,
                        "description": "Automatic washing machine",
                        "importPrice": 300.0,
                        "sellingPrice": 350.0,
                        "status": "Available",
                        "weight": "300g",
                        "presentImage": "1728958738001.jpg",
                        "createdAt": "2024-11-08T10:10:24.402015",
                        "updatedAt": "2024-11-08T10:10:24.402015"
                    },
                    "quantity": 1,
                    "totalPrice": 110000.0,
                    "createdAt": "2024-11-08T10:10:24.402015",
                    "updatedAt": "2024-11-08T10:10:24.402015"
                },
                {
                    "cartDetailId": "cd002",
                    "cart": {
                        "cartId": "cart003",
                        "customer": {
                            "customerId": "cust003",
                            "email": "user3@example.com",
                            "password": "pass3",
                            "userName": "user3",
                            "fullName": "User Three",
                            "address": "1",
                            "role": "CUSTOMER",
                            "avatar": "1728958738001.jpg",
                            "phone": "1234567892",
                            "isDelete": "false",
                            "createdAt": "2024-11-08T10:10:24.402015",
                            "updatedAt": "2024-11-08"
                        },
                        "createdAt": "2024-11-08T10:10:24.402015",
                        "updatedAt": "2024-11-08T10:10:24.402015"
                    },
                    "product": {
                        "productId": "prod002",
                        "category": {
                            "categoryId": "cat002",
                            "name": "Furniture",
                            "description": "Home furniture",
                            "avatar": "1728958738001.jpg",
                            "createdAt": "2024-11-08T10:10:24.402015"
                        },
                        "productDiscount": {
                            "productDiscountId": "disc002",
                            "discountAmount": 10.0,
                            "expiredDate": "2025-02-01T00:00:00",
                            "createdAt": "2024-11-08T10:10:24.402015",
                            "updatedAt": "2024-11-08T10:10:24.402015"
                        },
                        "name": "Sofa",
                        "total": 50,
                        "rate": 4.2,
                        "numberVote": 120,
                        "description": "Comfortable sofa",
                        "importPrice": 200.0,
                        "sellingPrice": 220.0,
                        "status": "Available",
                        "weight": "300g",
                        "presentImage": "1728958738001.jpg",
                        "createdAt": "2024-11-08T10:10:24.402015",
                        "updatedAt": "2024-11-08T10:10:24.402015"
                    },
                    "quantity": 2,
                    "totalPrice": 110000.0,
                    "createdAt": "2024-11-08T10:10:24.402015",
                    "updatedAt": "2024-11-08T10:10:24.402015"
                }
            ]
        }
    },
    {
        // khi chọn 1 sp hoặc thêm số lượng +1 ( quantity =1) sẽ call api thêm sản phẩm và giỏ hàng của user đó
        // xử lí mỗi user khi tạo tài khoản sẽ mặc định có 1 cart rỗng
        // nếu product đã có trong giỏ hàng thì sẽ cập nhật cartdetail thuộc cart tuong ứng với số lượng tăng lên 1
        // nếu product chưa có trong giỏi của user đó sẽ tạo 1 cartdeatl mới với product và quantity truyền vào từ req, cho cartdetail đó vào cart của kh
        api: "postProductToCart",
        url: "/cart",
        method: "PUT",
        description: "post product to cart of user",
        req: {
            body:
            {
                customerId: "cust012",
                product: {
                    "productId": "prod001",
                    "category": {
                        "categoryId": "cat001",
                        "name": "Mouse",
                        "description": "Electronic devices",
                        "avatar": "1728958738001.jpg",
                        "createdAt": "2024-11-08T10:10:24.402015"
                    },
                    "productDiscount": {
                        "productDiscountId": "disc001",
                        "discountAmount": 5.0,
                        "expiredDate": "2025-01-01T00:00:00",
                        "createdAt": "2024-11-08T10:10:24.402015",
                        "updatedAt": "2024-11-08T10:10:24.402015"
                    },
                    "name": "Laptop",
                    "total": 100,
                    "rate": 4.5,
                    "numberVote": 150,
                    "description": "High-performance laptop",
                    "importPrice": 500.0,
                    "sellingPrice": 550.0,
                    "status": "Available",
                    "weight": "300g",
                    "presentImage": "1728958738001.jpg",
                    "createdAt": "2024-11-08T10:10:24.402015",
                    "updatedAt": "2024-11-08T10:10:24.402015"
                },
                quantity: 4,
                totalPrice: 91000000
            }
        },
        res: {
            EC: 0,
            MS: "Create order success!",
        }
    },
    {
        // remove cartdetail xóa cartdetail trong cart của kh
        api: "removeProductToCart",
        url: "/cart/cartDetail/:cartDetailId",
        method: "DELETE",
        description: "remove product to cart of user",
        req: {
        },
        res: {
            EC: 0,
            MS: "Deleted order success!",
        }
    },
    {
        // nếu product đã có trong giỏ hàng thì sẽ cập nhật cartdetail thuộc cart tuong ứng với số lượng giảm đi 1 nếu sau klhi giảm =0 thì sẽ xóa luôn cart detail
        api: "changeQuantityOfProductToCart",
        url: "/cart/cartDetail/:cartDetailId",
        method: "PUT",
        description: "Change quantity product to cart of user",
        param:{
            quantity: -1,
        },
        req: {
            body : {
                quantity: -1,
            }
        },
        res: {
            EC: 0,
            MS: "Changed quantity of item success!",
        }
    },
    // thay đổi create order sẽ chỉ truyền vào cartid mà không truyền thông tin gì nữa


    // ORDER API
    {
        api: "postCreateUserOrder",
        url: "/order",
        method: "POST",
        description: "Create a new order",
        req: {
            body:
            {
                "customerId": "cust003",
                "cartDetails": [
                    {
                        "cartDetailId": "cd012",
                        "cart": {
                            "cartId": "cart012",
                            "customer": {
                                "customerId": "cust012",
                                "email": "user12@example.com",
                                "password": "pass12",
                                "userName": "user12",
                                "fullName": "User Twelve",
                                "address": "1",
                                "role": "customer",
                                "avatar": "1728958738001.jpg",
                                "phone": "1234567801",
                                "isDelete": "false",
                                "createdAt": "2024-11-08T10:10:24.402015",
                                "updatedAt": "2024-11-08"
                            },
                            "createdAt": "2024-11-08T10:10:24.402015",
                            "updatedAt": "2024-11-08T10:10:24.402015"
                        },
                        "product": {
                            "productId": "prod012",
                            "category": {
                                "categoryId": "cat012",
                                "name": "ABCDEF",
                                "description": "Automotive accessories",
                                "avatar": "1728958738001.jpg",
                                "createdAt": "2024-11-08T10:10:24.402015"
                            },
                            "productDiscount": {
                                "productDiscountId": "disc012",
                                "discountAmount": 60.0,
                                "expiredDate": "2025-12-01T00:00:00",
                                "createdAt": "2024-11-08T10:10:24.402015",
                                "updatedAt": "2024-11-08T10:10:24.402015"
                            },
                            "name": "Car Oil",
                            "total": 90,
                            "rate": 4.3,
                            "numberVote": 125,
                            "description": "Synthetic car oil",
                            "importPrice": 25.0,
                            "sellingPrice": 30.0,
                            "status": "Available",
                            "weight": "300g",
                            "presentImage": "1728958738001.jpg",
                            "createdAt": "2024-11-08T10:10:24.402015",
                            "updatedAt": "2024-11-08T10:10:24.402015"
                        },
                        "quantity": 1,
                        "totalPrice": 110000.0,
                        "createdAt": "2024-11-08T10:10:24.402015",
                        "updatedAt": "2024-11-08T10:10:24.402015"
                    },
                ],
                "total": 10
            }
        },
        res: {
            EC: 0,
            MS: "Create order success!",
        }
    },
    {
        api: "getAllOrders",
        url: "/order",
        method: "GET",
        description: "Get all orders",
        req: {},
        res: {
            "EC": 0,
            "MS": "Get all Order success!",
            "orders": [
                {
                    "orderId": "6732ddc62fc5ca4fba024e01",
                    "customer": {
                        "customerId": "669f9bbd022ffc8666ff1538",
                        "email": "a",
                        "avatar": "/v1/uploads/users/1721736309814.jpg"
                    },
                    "detailOrderedProducts": [
                        {
                            "detailOrderProductId": "dop012",
                            "product": {
                                "productId": "6732cc2b46d12690b940dfdf",
                                "name": "Bàn phím cơ gaming Edra EK398 Alpha Red switch (USB/ABS/Led Rainbow)",
                                "presentImage": "/v1/uploads/products/1731382315181.jpg",
                                "sellingPrice": 600000,
                            },
                            "quantity": 3,
                            "totalPrice": 1800000
                        }
                        ,
                        {
                            "detailOrderProductId": "dop012",
                            "product": {
                                "productId": "6732d05846d12690b940dff7",
                                "name": "Tai nghe không dây Razer Barracuda X-2022 RZ04-04430100-R3M1",
                                "presentImage": "/v1/uploads/products/1731383384376.jpg",
                                "sellingPrice": 2300000
                            },
                            "quantity": 4,
                            "sum": 9200000
                        },
                        {
                            "detailOrderProductId": "dop012",
                            "product": {
                                "productId": "6732d1ce46d12690b940dffd",
                                "name": "Laptop Asus VivoBook X1504ZA-NJ582W (i3 1215U/8GB RAM/512GB SSD/15.6 FHD/Win11/Bạc)",
                                "presentImage": "/v1/uploads/products/1731383758718.jpg",
                                "sellingPrice": 11000000
                            },
                            "quantity": 4,
                            "sum": 44000000
                        }
                    ],
                    "total": 55000000,
                    "status": "CXN",
                    "createdAt": "2024-11-12T04:47:02.533Z"
                }
            ]
        }
    },
    {
        api: "updateStatusOrder",
        url: "/order/:id", //////////// thêm /:id
        method: "PUT",
        description: "Get all orders",
        req: {
            "status": "DG"
        },
        res: {
            "EC": 0,
            "MS": "Update Order success!"
        }
    },
    {
        api: "getOrderByID",
        url: "/order/:id",
        method: "GET",
        description: "Get  orders by id",
        req: {
        },
        res: {
            "EC": 0,
            "MS": "Get an Order success!",
            "order": {
                "orderId": "6732ddc62fc5ca4fba024e01",
                "customer": {
                    "customerId": "669f9bbd022ffc8666ff1538",
                    "email": "a",
                    "avatar": "uploads\\users\\1721736309814.jpg"
                },
                "detailOrderedProducts": [
                    {
                        "detailOrderProductId": "dop012",
                        "product": {
                            "productId": "6732cc2b46d12690b940dfdf",
                            "name": "Bàn phím cơ gaming Edra EK398 Alpha Red switch (USB/ABS/Led Rainbow)",
                            "presentImage": "/v1/uploads/products/1731382315181.jpg",
                            "sellingPrice": 600000,
                        },
                        "quantity": 3,
                        "totalPrice": 1800000
                    },
                    {
                        "detailOrderProductId": "dop012",
                        "product": {
                            "productId": "6732d05846d12690b940dff7",
                            "name": "Tai nghe không dây Razer Barracuda X-2022 RZ04-04430100-R3M1",
                            "presentImage": "/v1/uploads/products/1731383384376.jpg",
                            "sellingPrice": 2300000
                        },
                        "quantity": 4,
                        "sum": 9200000
                    },
                    {
                        "detailOrderProductId": "dop012",
                        "product": {
                            "productId": "6732d1ce46d12690b940dffd",
                            "name": "Laptop Asus VivoBook X1504ZA-NJ582W (i3 1215U/8GB RAM/512GB SSD/15.6 FHD/Win11/Bạc)",
                            "presentImage": "/v1/uploads/products/1731383758718.jpg",
                            "sellingPrice": 11000000
                        },
                        "quantity": 4,
                        "sum": 44000000
                    }
                ],
                "total": 55000000,
                "status": "CXN",
                "createdAt": "2024-11-12T04:47:02.533Z"
            }
        }
    },
    {
        api: "getOrderByUserID",
        url: "/order/customer/:id",
        method: "GET",
        description: "Get orderby userid ",
        req: {
        },
        res: {
            "EC": 0,
            "MS": "Get Orders by UserId success!",
            "orders": [
                {
                    "orderId": "6732ddc62fc5ca4fba024e01",
                    "customer": {
                        "customerId": "669f9bbd022ffc8666ff1538",
                        "email": "a",
                        "avatar": "/v1/uploads/users/1721736309814.jpg"
                    },
                    "detailOrderedProducts": [
                        {
                            "detailOrderProductId": "dop012",
                            "product": {
                                "productId": "6732cc2b46d12690b940dfdf",
                                "name": "Bàn phím cơ gaming Edra EK398 Alpha Red switch (USB/ABS/Led Rainbow)",
                                "presentImage": "/v1/uploads/products/1731382315181.jpg",
                                "sellingPrice": 600000,
                            },
                            "quantity": 3,
                            "totalPrice": 1800000
                        },
                        {
                            "detailOrderProductId": "dop012",
                            "product": {
                                "productId": "6732d05846d12690b940dff7",
                                "name": "Tai nghe không dây Razer Barracuda X-2022 RZ04-04430100-R3M1",
                                "presentImage": "/v1/uploads/products/1731383384376.jpg",
                                "sellingPrice": 2300000
                            },
                            "quantity": 4,
                            "sum": 9200000
                        }
                    ],
                    "total": 11000000,
                    "status": "CXN",
                    "createdAt": "2024-11-12T04:47:02.533Z"
                }
            ]
        }
    },


    // COMMENT API
    {
        api: "postCreateComment",  // update numberVote, rate in Product
        url: "/comment",
        method: "POST",
        description: "Create a new comment",
        req: {
            body: {
                customerId: "cust007",
                productId: "prod012",
                rating: 5,        // Product rating (1-5)
                comment: "OK! Good product."
            }
        },
        res: {
            "EC": 0,
            "MS": "Thêm Comment thành công và cập nhật đánh giá!",
        }
    },
    {
        api: "getCommentsProduct",
        url: "/comment/product/:productId",
        method: "GET",
        description: "Get all comments for a product",
        req: {
            params: {
                productId: "ObjectId"  // Product's unique ID
            }
        },
        res: {
            "EC": 0,
            "MS": "Lấy tất cả comments thành công!",
            "productReviews": [
                {
                    "productReviews": "6732dde22fc5ca4fba024e09",
                    "customer": {
                        "customerId": "669f9bbd022ffc8666ff1538",
                        "name": "David",
                        "avatar": ""
                    },
                    "product": {
                        "productId": "6732cc2b46d12690b940dfdf",
                        "name": "bàn phím Rapoo"
                    },
                    "rating": 5,
                    "comment": "qqqqqq",
                    "createdAt": "2024-11-12T04:47:30.271Z",
                }
            ]
        }
    },
    {
        api: "putUpdateComment",
        url: "/comment/:id",
        method: "PUT",
        description: "Update a comment",
        req: {
            body: {
                customerId: "cust007",
                productId: "prod012",
                rating: 5,
                comment: "OK! Good product."
            }
        },
        res: {
            EC: 0,
            MS: "Update comment success!",
        }
    },
    {
        api: "deleteComment",
        url: "/comment/:id",
        method: "DELETE",
        description: "Delete a comment",
        req: {
        },
        res: {
            EC: 0,
            MS: "Delete comment success!"
        }
    }
];

export default apiDocumentation;
