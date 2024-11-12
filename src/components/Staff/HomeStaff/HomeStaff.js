import React, { useState, useEffect } from 'react';
import ModalCreateUser from '../Managements/UserManagement/ModalCreateUser';
import Button from "react-bootstrap/Button";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { getAllUsers } from '../../../services/apiServices';
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import TableProduct from './tableProduct/tableProduct';
import { getAllProducts } from '../../../services/apiServices';
import { postCreateUserOrder } from '../../../services/apiServices';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "./HomeStaff.scss"
const HomeStaff = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user.account);
    const token = useSelector((state) => state.user.account.access_token);
    const listUsers = useSelector((state) => state.listUser.users);
    const [isExistingCustomer, setIsExistingCustomer] = useState(null);
    const [email, setEmail] = useState('');
    const [customerInfo, setCustomerInfo] = useState(null);
    const [products, setProducts] = useState([]);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const stateOrder = useSelector((state) => state.listOrder);
    const listCategories = useSelector((state) => state.category.listCategories);
    const fetchListUsers = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`, // Đặt token vào header Authorization
            },
        };
        let res = await getAllUsers(config);
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_users",
                payload: res.users,
            });
            toast.success(res.MS);
        }
    };
    useEffect(() => {
        fetchListUsers();
    }, []);
    const updateStateOrder = () => {
        dispatch({
            type: "Update_order_user",
            payload: listProducts,
        });
    };
    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_product",
                payload: res.products,
            });


        }
    };
    const addProductOrder = async (productId) => {
        dispatch({
            type: "add_product_to_order",
            payload: { productId, quantity: 1 }
        });
        toast.success("add done +1");
        console.log(stateOrder);

    };
    const decremeneProductOrder = async (productId) => {
        dispatch({
            type: "decrement_product_in_order",
            payload: productId,
        });
        toast.success("decre done");
    };
    const removeProductOrder = async (productId) => {
        dispatch({
            type: "remove_product_from_order",
            payload: productId,
        });
        toast.success("remove done");
    };
    const handleSubmitOrder = async (event) => {
        // Lọc các sản phẩm có CountOrder > 0
        let simplifiedList = stateOrder.listItemsOrder
            .filter(item => item.CountOrder > 0)  // Chỉ giữ lại các sản phẩm có CountOrder > 0
            .map((item) => {
                return {
                    idProduct: item._id,
                    quantity: item.CountOrder,
                    sum: item.sellingprice * item.CountOrder,
                };
            });

        // Nếu không có sản phẩm hợp lệ (CountOrder > 0), không thực hiện submit
        if (simplifiedList.length === 0) {
            toast.error("Không có sản phẩm hợp lệ để đặt hàng.");
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${account.access_token}`,
            },
        };

        const formData = {
            user: customerInfo._id,
            listItem: simplifiedList,
            total: stateOrder.total,
        };

        // Gọi API để tạo đơn hàng
        let res_data = await postCreateUserOrder(formData, config);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            remove();
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };
    useEffect(() => {
        fetchListProducts();
    }, []);
    useEffect(() => {
        updateStateOrder();
    }, [listProducts]);
    const remove = async () => {
        try {
            await dispatch({
                type: "Clear_order_user",
            });
            toast.success("clear done!");
        } catch (error) {
            toast.error("Failed to clear order.");
        }
        console.log(stateOrder);
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    // Hàm lọc người dùng từ listUsers theo email hoặc số điện thoại
    const filteredUsers = listUsers.filter((user) => {
        const query = searchQuery.toLowerCase();
        return (
            user.email.toLowerCase().includes(query) ||
            user.phoneNumber.includes(query)
        );
    });
    // Chọn khách hàng
    const handleSelectCustomer = (user) => {
        setCustomerInfo(user);
        // setSearchQuery("?"); // Xóa ô tìm kiếm sau khi chọn khách hàng
    };
    // Mở modal tạo tài khoản mới
    const handleCreateNewUser = () => {
        setShowModalCreateUser(true);
    };
    return (
        <div className="HomeStaff-container">
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUsers={fetchListUsers}
            />
            <h2>Tạo đơn hàng mới</h2>
            <TableProduct />
            {/* Thông Tin Khách Hàng */}
            <div className="customer_info">

                <div className='btn_acc'>
                    <Button
                        variant={isExistingCustomer === true ? "primary" : "secondary"}
                        onClick={() => setIsExistingCustomer(true)}
                    >
                        Đã có tài khoản
                    </Button>
                    <Button
                        variant={isExistingCustomer === false ? "primary" : "secondary"}
                        onClick={() => {
                            setIsExistingCustomer(false);  // Đặt trạng thái khách hàng chưa có tài khoản
                            setShowModalCreateUser(true);  // Mở modal tạo tài khoản mới
                        }}
                    >
                        Chưa có tài khoản
                    </Button>

                </div>
                {isExistingCustomer === true && (
                    <div className='searchBox'>
                        <input
                            type="text"
                            placeholder="Nhập email hoặc số điện thoại"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className='input_search'
                        />
                        <div className='result'>
                            {filteredUsers.length > 0 ? (
                                <>
                                    {filteredUsers.map((user) => (
                                        <div
                                            key={user.email}
                                            onClick={() => handleSelectCustomer(user)}
                                            className="item"
                                            style={
                                                user?._id === customerInfo?._id
                                                    ? { backgroundColor: '#e2e2e2', color: '#000000' }
                                                    : {}
                                            }
                                        >
                                            {user.email} - {user.phoneNumber}
                                        </div>

                                    ))}
                                </>
                            ) : (
                                <p>Không tìm thấy khách hàng phù hợp.</p>
                            )}
                        </div>
                    </div>
                )}
                <div className="info_user_order">
                    <div className="box-cus-info-2021-ct" id="manhinhtaikhoan1">
                        <div className="item-tk">
                            <label>Họ tên</label>
                            <div className="item-tk-ct">
                                <input type="text" value={customerInfo?._id || "Chưa cập nhật"} className="inputText" readOnly />
                                <div className="item-tk-ct-note"></div>
                            </div>
                        </div>
                        <div className="item-tk">
                            <label>Số điện thoại</label>
                            <div className="item-tk-ct">
                                <input type="text" value={customerInfo?.phoneNumber || "Chưa cập nhật"} className="inputText" readOnly />
                                <div className="item-tk-ct-note" id="js-sms-result"></div>
                            </div>
                        </div>
                        <div className="item-tk">
                            <label>Email</label>
                            <div className="item-tk-ct">
                                <input type="text" value={customerInfo?.email || "Chưa cập nhật"} className="inputText" readOnly />
                                <div className="item-tk-ct-note"></div>
                            </div>
                        </div>
                        <div className="item-tk">
                            <label>Giới tính</label>
                            <div className="item-tk-ct label-select-radio">
                                <input type="text" value="Nam" className="inputText" readOnly />
                            </div>
                        </div>
                        <div className="item-tk">
                            <label>Địa chỉ</label>
                            <div className="item-tk-ct">
                                <input type="text" value={customerInfo?.address || "Chưa cập nhật"} className="inputText" readOnly />
                                <div className="item-tk-ct-note"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Thông Tin Đơn Hàng */}
            <div className="PaylistOrderContent">
                <div className="cart-content-2021">
                    <div className="cart-content-2021-left">
                        <div className="header-cart-ct-left">
                            <div className="cart-col-product">
                                {/* <div className="fake-checkbox" ></div> */}
                                <span>Tất cả sản phẩm </span>
                            </div>
                            <div className="cart-col-price">Đơn giá</div>
                            <div className="cart-col-quantity">Số lượng</div>
                            <div className="cart-col-total-price">Thành tiền</div>
                            <div className="cart-col-delete">
                                <div onClick={remove}>X</div>
                            </div>
                        </div>
                        <div className="cart-list-item">
                            {
                                !_.isEmpty(stateOrder.listItemsOrder) ? (
                                    stateOrder.listItemsOrder.filter(item => item.CountOrder > 0).map((item, index) => {
                                        return (
                                            <div className="new-cart-items" key={item._id}>
                                                <div className="cart-col-product">
                                                    {item.name}
                                                </div>
                                                <div className="cart-col-price">
                                                    {item.sellingprice}
                                                </div>
                                                <div className="cart-col-quantity">
                                                    <CiCircleMinus onClick={() => decremeneProductOrder(item._id)} size={30} color="#000" style={{ margin: "20px", fontWeight: 500 }} className="btn_icon" />
                                                    <div className={`${item._id} countItem`}> {item.CountOrder}</div>
                                                    <CiCirclePlus onClick={() => addProductOrder(item._id)} size={30} color="#000" style={{ margin: "20px", fontWeight: 200 }} className="btn_icon" />
                                                </div>
                                                <div className="cart-col-total-price">
                                                    {item.sellingprice * item.CountOrder}
                                                </div>
                                                <div className="cart-col-delete" onClick={() => removeProductOrder(item._id)} >X
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div>no order</div>
                                )
                            }


                        </div>
                    </div>
                    {/* // */}
                    <div className="cart-content-2021-right">
                        <div class="box-cart-total-price">
                            <p>
                                <span>Tạm tính</span>
                                <span class="total-cart-price">{stateOrder.total}₫</span>
                            </p>
                            <p>
                                <span>Giảm giá</span>
                                <span id="price-discount">0₫</span>
                            </p>
                            <p>
                                <span>Thành tiền</span>
                                <span class="red-b total-cart-payment">{stateOrder.total}₫</span>
                            </p>

                            <span class="cart-vat">(Đã bao gồm VAT nếu có)</span>
                        </div>
                        <button class="button-buy-submit-cart" onClick={() => handleSubmitOrder()}>Tiến hành đặt hàng</button>
                    </div>
                    {/* // */}
                </div>

            </div>

            {/* Bảng Sản Phẩm */}

        </div>
    );
};

export default HomeStaff;
