const jsonResponse = `{
    "data": {
        "EC": 0,
        "MS": "Add user success!",
        "saveUser": {
            "email": "231231231211",
            "password": "123123",
            "address": "123123",
            "phoneNumber": "1231231231",
            "role": "USER",
            "avatar": "khoan ddax",
            "_id": "667fce2851845976b437a50b",
            "__v": 0
        }
    }
}`;
const responseObject = JSON.parse(jsonResponse);
console.log(responseObject);

// Truy cập vào các trường trong object
console.log(responseObject.data.EC); // 0
console.log(responseObject.data.MS); // Add user success!
console.log(responseObject.data.saveUser.email); // 231231231211