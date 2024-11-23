// apiDocumentation.js

import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { imageListClasses } from "@mui/material";

const apiDocumentation = [
    // USER API
    {
        api: "postLogin",
        url: "/user/login",
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
        url: "/user/signup",
        method: "POST",
        description: "Sign up a new user",
        req: {
            body: {
                "email": "aa",
                "password": "1",
                "address": "nghe an",
                "phoneNumber": "0123456789",
                "role": "ADMIN",
                "avatar": ""
            }
        },
        res: {
            "EC": 0,
            "MS": "Sign Up and Login success!",
            "user": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzIzN2ViM2Y2ZGNlYTA4NzZlZDc3MSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTczMTM0NDM2MywiZXhwIjoxNzMxMzQ3OTYzfQ.sCtOibWiO__YFvLcMXe2kfl1hyesX7fE2-GXdN0ZrOc",
                "id": "673237eb3f6dcea0876ed771",
                "email": "aa",
                "role": "ADMIN",
                "avatar": null
            }
        }
    },
    {
        api: "postCreateUser",
        url: "/user",
        method: "POST",
        description: "Create a new user",
        req: {
            body: {
                "email": "a123",
                "password": "1",
                "address": "nghe an",
                "phoneNumber": "0123456789",
                "role": "ADMIN",
                "avatar": ""
            }
        },
        res: {
            "EC": 0,
            "MS": "Add user success!",
            "saveUser": {
                "email": "a123",
                "password": "$2a$10$3a/OMCLReQC30rpUFrkbPO9S8X1uDOzQBXbpQVJB1qOn7mf9ZT8Yq",
                "address": "nghe an",
                "phoneNumber": "0123456789",
                "role": "ADMIN",
                "avatar": null,
                "isDeleted": false,
                "_id": "673238233f6dcea0876ed773",
                "__v": 0
            }
        }
    },
    {
        api: "getAllUsers",
        url: "/user",
        method: "GET",
        description: "Get all users",
        req: {},
        res: {
            EC: 0,
            MS: "Get all users success!",
            users: [
                {
                    "_id": "669f9bbd022ffc8666ff1538",
                    "email": "a",
                    "address": "1",
                    "phoneNumber": "1",
                    "role": "ADMIN",
                    "avatar": "/v1/uploads/users/1721736309814.jpg"
                }
            ]
        }
    },
    {
        api: "putUpdateUser",
        url: "/user/:id",
        method: "PUT",
        description: "Update user information",
        req: {
            params: {
                id: "ObjectId"          // User's unique ID
            },
            body: {
                "email": "nnqweqweqa123123123",
                "password": "nna",
                "address": "nna",
                "phoneNumber": "0123456789",
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
        url: "/user/:id",
        method: "PUT",
        description: "Update user information",
        req: {
            params: {
                id: "ObjectId"          // User's unique ID
            },
            body: {
            }
        },
        res: {
            "EC": 0,
            "MS": "Get user success!",
            "user": {
                "_id": "673237eb3f6dcea0876ed771",
                "email": "aa",
                "address": "nna",
                "phoneNumber": "0123456789",
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
                id: "ObjectId"  // User's unique ID
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
                    "_id": "668398ba1fb0f44c34b6088d",
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
            params: {
                id: "ObjectId"  // User's unique ID
            }
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
                id: "ObjectId"  // User's unique ID
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
                "category": "668398dd1fb0f44c34b60897",
                "importprice": "35000",
                "sellingprice": "55000",
                "weight": "300g",
                "presentimage": "",
                "description": "example description",
                "count": 30
            }
        },
        res: {
            "EC": 0,
            "MS": "Add Product success!",
            "savedProduct": {
                "name": "food 13",
                "importprice": 35000,
                "sellingprice": 55000,
                "category": "668398dd1fb0f44c34b60897",
                "weight": "300g",
                "presentImage": null,
                "description": "example description",
                "count": 30,
                "rate": 5,
                "numberVote": 1,
                "isDeleted": false,
                "_id": "67323a8d3f6dcea0876ed780",
                "__v": 0
            }
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
                    "_id": "67323e2f682729ea6f4b54f7",
                    "name": "123123123",
                    "importprice": 11111,
                    "sellingprice": 11111111,
                    "category": {
                        "idCategory": "668398c11fb0f44c34b60890",
                        "nameCategory": "Laptop"
                    },
                    "weight": "1",
                    "presentImage": "/v1/uploads/products/1731345967764.jpg",
                    "description": "23123123",
                    "count": 111,
                    "rate": 5,
                    "numberVote": 1
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
                id: "ObjectId"  // User's unique ID
            },
        },
        res: {
            "EC": 0,
            "MS": "Get a product success!",
            "product": {
                "_id": "67323e2f682729ea6f4b54f7",
                "name": "123123123",
                "importprice": 11111,
                "sellingprice": 11111111,
                "category": {
                    "idCategory": "668398c11fb0f44c34b60890",
                    "nameCategory": "Laptop"
                },
                "weight": "1",
                "presentImage": "/v1/uploads/products/1731345967764.jpg",
                "description": "23123123",
                "count": 111,
                "rate": 5,
                "numberVote": 1
            }
        }
    },
    {
        api: "getSearchProduct",
        url: "/product/search?query=a",
        method: "GET",
        description: "Search products by query",
        req: {
            query: "string"  // Search query string
        },
        res: {
            EC: 0,
            MS: "Search products success!",
            suggestions: [
                {
                    "_id": "6732cc2b46d12690b940dfdf",
                    "name": "Bàn phím cơ gaming Edra EK398 Alpha Red switch (USB/ABS/Led Rainbow)",
                    "importprice": 479000,
                    "sellingprice": 600000,
                    "category": {
                        "idCategory": "668398ba1fb0f44c34b6088d"
                    },
                    "weight": "500",
                    "presentImage": "/v1/uploads/products/1731382315181.jpg",
                    "description": "Bàn phím cơ gaming Edra EK398 Alpha Chuẩn kết nối: Dây USB Layout 98 phím Keycap: ABS Led Rainbow Switch YH",
                    "count": 30,
                    "rate": 5,
                    "numberVote": 1
                }
            ]
        }
    },

    // ORDER API
    {
        api: "postCreateUserOrder",
        url: "/order",
        method: "POST",
        description: "Create a new order",
        req: {
            body:
            {
                "user": "668391126954eb2c817d4d87",
                "listItem": [
                    {
                        "idProduct": "6683994c1fb0f44c34b608a2",
                        "quantity": 3,
                        "sum": 165000
                    },
                    {
                        "idProduct": "668399511fb0f44c34b608a4",
                        "quantity": 2,
                        "sum": 110000

                    }

                ],
                "total": 275000
            }     // Order creation time

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
                    "_id": "6732ddc62fc5ca4fba024e01",
                    "user": {
                        "idUser": "669f9bbd022ffc8666ff1538",
                        "emailUser": "a",
                        "avatarUser": "/v1/uploads/users/1721736309814.jpg"
                    },
                    "listItem": [
                        {
                            "idProduct": "6732cc2b46d12690b940dfdf",
                            "nameProduct": "Bàn phím cơ gaming Edra EK398 Alpha Red switch (USB/ABS/Led Rainbow)",
                            "presentImageProduct": "/v1/uploads/products/1731382315181.jpg",
                            "sellingpriceProduct": 600000,
                            "quantity": 3,
                            "sum": 1800000
                        },
                        {
                            "idProduct": "6732d05846d12690b940dff7",
                            "nameProduct": "Tai nghe không dây Razer Barracuda X-2022 RZ04-04430100-R3M1",
                            "presentImageProduct": "/v1/uploads/products/1731383384376.jpg",
                            "sellingpriceProduct": 2300000,
                            "quantity": 4,
                            "sum": 9200000
                        },
                        {
                            "idProduct": "6732d1ce46d12690b940dffd",
                            "nameProduct": "Laptop Asus VivoBook X1504ZA-NJ582W (i3 1215U/8GB RAM/512GB SSD/15.6 FHD/Win11/Bạc)",
                            "presentImageProduct": "/v1/uploads/products/1731383758718.jpg",
                            "sellingpriceProduct": 11000000,
                            "quantity": 4,
                            "sum": 44000000
                        }
                    ],
                    "total": 55000000,
                    "statusOrder": "CXN",
                    "createdAt": "2024-11-12T04:47:02.533Z"
                }
            ]
        }
    },
    {
        api: "getAllOrders",
        url: "/order",
        method: "GET",
        description: "Get all orders",
        req: {
            "statusOrder": "DG"
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
                "_id": "6732ddc62fc5ca4fba024e01",
                "user": {
                    "idUser": "669f9bbd022ffc8666ff1538",
                    "emailUser": "a",
                    "avatarUser": "uploads\\users\\1721736309814.jpg"
                },
                "listItem": [
                    {
                        "idProduct": "6732cc2b46d12690b940dfdf",
                        "nameProduct": "Bàn phím cơ gaming Edra EK398 Alpha Red switch (USB/ABS/Led Rainbow)",
                        "sellingPriceProduct": 600000,
                        "quantity": 3,
                        "sum": 1800000
                    },
                    {
                        "idProduct": "6732d05846d12690b940dff7",
                        "nameProduct": "Tai nghe không dây Razer Barracuda X-2022 RZ04-04430100-R3M1",
                        "sellingPriceProduct": 2300000,
                        "quantity": 4,
                        "sum": 9200000
                    },
                    {
                        "idProduct": "6732d1ce46d12690b940dffd",
                        "nameProduct": "Laptop Asus VivoBook X1504ZA-NJ582W (i3 1215U/8GB RAM/512GB SSD/15.6 FHD/Win11/Bạc)",
                        "sellingPriceProduct": 11000000,
                        "quantity": 4,
                        "sum": 44000000
                    }
                ],
                "statusOrder": "DG",
                "total": 55000000,
                "createdAt": "2024-11-12T04:47:02.533Z"
            }
        }
    },
    {
        api: "getOrderByUserID",
        url: "/order/user/:id",
        method: "GET",
        description: "Get orderby userid ",
        req: {
        },
        res: {
            "EC": 0,
            "MS": "Get Orders by UserId success!",
            "orders": [
                {
                    "_id": "6732ddc62fc5ca4fba024e01",
                    "user": {
                        "idUser": "669f9bbd022ffc8666ff1538",
                        "emailUser": "a",
                        "avatarUser": "/v1/uploads/users/1721736309814.jpg"
                    },
                    "listItem": [
                        {
                            "idProduct": "6732cc2b46d12690b940dfdf",
                            "nameProduct": "Bàn phím cơ gaming Edra EK398 Alpha Red switch (USB/ABS/Led Rainbow)",
                            "presentImageProduct": "/v1/uploads/products/1731382315181.jpg",
                            "sellingpriceProduct": 600000,
                            "quantity": 3,
                            "sum": 1800000
                        },
                        {
                            "idProduct": "6732d05846d12690b940dff7",
                            "nameProduct": "Tai nghe không dây Razer Barracuda X-2022 RZ04-04430100-R3M1",
                            "presentImageProduct": "/v1/uploads/products/1731383384376.jpg",
                            "sellingpriceProduct": 2300000,
                            "quantity": 4,
                            "sum": 9200000
                        },
                        {
                            "idProduct": "6732d1ce46d12690b940dffd",
                            "nameProduct": "Laptop Asus VivoBook X1504ZA-NJ582W (i3 1215U/8GB RAM/512GB SSD/15.6 FHD/Win11/Bạc)",
                            "presentImageProduct": "/v1/uploads/products/1731383758718.jpg",
                            "sellingpriceProduct": 11000000,
                            "quantity": 4,
                            "sum": 44000000
                        }
                    ],
                    "total": 55000000,
                    "createdAt": "2024-11-12T04:47:02.533Z",
                    "statusOrder": "DG"
                }
            ]
        }
    },


    // COMMENT API
    {
        api: "postCreateComment",
        url: "/comment",
        method: "POST",
        description: "Create a new comment",
        req: {
            body: {
                content: "12312312",
                idProduct: "6732cc2b46d12690b940dfdf",
                idUser: "669f9bbd022ffc8666ff1538",
                rating: 5          // Product rating (1-5)
            }
        },
        res: {
            "EC": 0,
            "MS": "Thêm Comment thành công và cập nhật đánh giá!",
            "comment": {
                "idProduct": "6732cc2b46d12690b940dfdf",
                "idUser": "669f9bbd022ffc8666ff1538",
                "content": "12312312",
                "rating": 5,
                "_id": "6732e0532fc5ca4fba024e30",
                "createdAt": "2024-11-12T04:57:55.887Z",
                "__v": 0
            }
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
            "comments": [
                {
                    "_id": "6732dde22fc5ca4fba024e09",
                    "idProduct": "6732cc2b46d12690b940dfdf",
                    "idUser": "669f9bbd022ffc8666ff1538",
                    "content": "qqqqqq",
                    "rating": 5,
                    "createdAt": "2024-11-12T04:47:30.271Z",
                    "__v": 0
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
            params: {
                id: "ObjectId"            // Comment's unique ID
            },
            body: {
                content: "12312312",
                idProduct: "6732cc2b46d12690b940dfdf",
                idUser: "669f9bbd022ffc8666ff1538",
                rating: 5           // New rating score (1-5)
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
            params: {
                id: "ObjectId"  // Comment's unique ID
            }
        },
        res: {
            EC: 0,
            MS: "Delete comment success!"
        }
    }
];

export default apiDocumentation;


// user 
// product
// category
// order
// comment
// Dashboard
// image
