
// Validate user
// Validate Email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return "Email không được để trống";
    } else if (!emailRegex.test(email)) {
        return "Email không hợp lệ";
    }
    return "";
};

// Validate Password
const validatePassword = (password) => {
    if (!password) {
        return "Mật khẩu không được để trống";
    } else if (password.length < 6) {
        return "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return "";
};

// Validate Address
const validateAddress = (address) => {
    if (!address) {
        return "Địa chỉ không được để trống";
    } else if (address.length < 3) {
        return "Địa chỉ phải có ít nhất 3 ký tự";
    }
    return "";
};

// Validate Phone Number
const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneNumber) {
        return "Số điện thoại không được để trống";
    } else if (!phoneRegex.test(phoneNumber)) {
        return "Số điện thoại không hợp lệ";
    }
    return "";
};

// Validate Role
const validateRole = (role) => {
    const validRoles = ["CUSTOMER", "STAFF", "ADMIN"];
    if (!role) {
        return "Vai trò không được để trống";
    } else if (!validRoles.includes(role)) {
        return "Vai trò không hợp lệ";
    }
    return "";
};

// Validate Product Name
const validateProductName = (name) => {
    if (!name) {
        return "Tên sản phẩm không được để trống";
    } else if (name.length < 3) {
        return "Tên sản phẩm phải có ít nhất 3 ký tự";
    }
    return "";
};
const validateProductCategory = (name) => {
    if (!name) {
        return "Thể loại không được để trống";
    }
    return "";
};
// Validate Product Weight
const validateProductWeight = (weight) => {
    if (!weight) {
        return "Cân nặng sản phẩm không được để trống";
    } else if (weight <= 0) {
        return "Cân nặng không hợp lệ";
    }
    return "";
};
// Validate Product Count
const validateProductCount = (count) => {
    if (!count) {
        return "Số lượng sản phẩm không được để trống";
    } else if (count < 0) {
        return "Số lượng sản phẩm không hợp lệ";
    }
    return "";
};
const validateImportPrice = (importprice) => {
    console.log(importprice);
    if (!importprice) {
        return "Giá nhập không được để trống";
    } else if (isNaN(Number(importprice)) || Number(importprice) <= 0) {
        return "Giá nhập không hợp lệ";
    }
    return "";
};
const validateSellingPrice = (sellingprice, importprice) => {
    if (!Number(sellingprice)) {
        return "Giá bán không được để trống";
    } else if (isNaN(Number(sellingprice)) || Number(sellingprice) <= 0) {
        return "Giá bán không hợp lệ";
    } else if (Number(sellingprice) < Number(importprice)) {
        return "Giá bán nhỏ hơn giá nhập";
    }
    return "";
};
const validateProductPresent = (img) => {
    if (!img) {
        return "Ảnh sản phẩm không được để trống";
    }
    return "";
};
const validateProductDescription = (description) => {
    if (!description) {
        return "Mô tả không được để trống";
    }
    return "";
};

// Validate Category Name
const validateCategoryName = (name) => {
    if (!name) {
        return "Tên danh mục không được để trống";
    } else if (name.length < 2) {
        return "Tên danh mục phải có ít nhất 2 ký tự";
    }
    return "";
};
const validateCategoryAvatar = (avatar) => {
    if (!avatar) {
        return "Ảnh danh mục không được để trống";
    }
    return "";
};


// Validate Voucher Time Start
const validateVoucherTimeStart = (timeStart) => {
    if (!timeStart) {
        return "Thời gian bắt đầu không được để trống";
    }
    return "";
};

// Validate Voucher Time End
const validateVoucherTimeEnd = (timeEnd) => {
    if (!timeEnd) {
        return "Thời gian kết thúc không được để trống";
    }
    return "";
};

// Validate Voucher Quantity
const validateVoucherQuantity = (quantity) => {
    if (quantity === undefined || quantity === null) {
        return "Số lượng voucher không được để trống";
    } else if (quantity <= 0) {
        return "Số lượng voucher phải lớn hơn 0";
    }
    return "";
};

// Validate Voucher Sale Off
const validateVoucherSaleOff = (saleOff) => {
    if (saleOff === undefined || saleOff === null) {
        return "Giảm giá không được để trống";
    } else if (saleOff < 0 || saleOff > 100) {
        return "Giảm giá phải từ 0 đến 100";
    }
    return "";
};

// Validate Order Total
const validateOrderTotal = (total) => {
    if (total === undefined || total === null) {
        return "Tổng số tiền không được để trống";
    } else if (total <= 0) {
        return "Tổng số tiền phải lớn hơn 0";
    }
    return "";
};

// Validate Comment Content
const validateCommentContent = (content) => {
    if (!content) {
        return "Nội dung bình luận không được để trống";
    } else if (content.length < 1) {
        return "Nội dung bình luận phải có ít nhất 1 ký tự";
    }
    return "";
};

// Validate Background Image Name
const validateBgImageName = (name) => {
    if (!name) {
        return "Tên ảnh nền không được để trống";
    } else if (name.length < 3) {
        return "Tên ảnh nền phải có ít nhất 3 ký tự";
    }
    return "";
};

// Validate Background Image
const validateBgImage = (img) => {
    if (!img) {
        return "Ảnh nền không được để trống";
    }
    return "";
};

const validateName = (name) => {
    if (!name) {
        return "Tên  không được để trống";
    }
    return "";
};

const validateQuantity = (quantity) => {
    if (!quantity) {
        return "Số lượng không được để trống";
    } else if (isNaN(quantity) || quantity <= 0) {
        return "Số lượng không hợp lệ";
    }
    return "";
};
const validateDesc = (desc) => {
    if (!desc) {
        return "Mô tả không được để trống";
    }
    return "";
};
const validateUsername = (username) => {
    if (!username) {
        return "Tên không được để trống";
    }
    return "";
};
const validateFullName = (fullName) => {
    if (!fullName) {
        return "Tên đầy đủ không được để trống";
    }
    return "";
};

const validateFields = (fields) => {
    const errors = {};
    for (const [field, value] of Object.entries(fields)) {
        if (field === "email") {
            errors.email = validateEmail(value);
        } else if (field === "password") {
            errors.password = validatePassword(value);
        } else if (field === "address") {
            errors.address = validateAddress(value);
        } else if (field === "phoneNumber") {
            errors.phoneNumber = validatePhoneNumber(value);
        } else if (field === "role") {
            errors.role = validateRole(value);
        } else if (field === "productName") {
            errors.productName = validateProductName(value);
        } else if (field === "importprice") {
            errors.importprice = validateImportPrice(value);
        } else if (field === "sellingprice") {
            errors.sellingprice = validateSellingPrice(value.sellingprice, value.importprice);
        } else if (field === "weight") {
            errors.weight = validateProductWeight(value);
        } else if (field === "productDescription") {
            errors.productDescription = validateProductDescription(value);
        } else if (field === "productCount") {
            errors.productCount = validateProductCount(value);
        } else if (field === "productPresent") {
            errors.productPresent = validateProductPresent(value);
        } else if (field === "productPresent1") {
            errors.productPresent1 = validateProductPresent(value);
        } else if (field === "productPresent2") {
            errors.productPresent2 = validateProductPresent(value);
        } else if (field === "productCategory") {
            errors.productCategory = validateProductCategory(value);
        } else if (field === "categoryName") {
            errors.categoryName = validateCategoryName(value);
        } else if (field === "categoryAvatar") {
            errors.categoryAvatar = validateCategoryAvatar(value);
        } else if (field === "description") {
            errors.description = validateDesc(value);
        } else if (field === "username") {
            errors.username = validateUsername(value);
        } else if (field === "fullName") {
            errors.fullName = validateFullName(value);
        }
    }
    return errors;
};

export default validateFields;
