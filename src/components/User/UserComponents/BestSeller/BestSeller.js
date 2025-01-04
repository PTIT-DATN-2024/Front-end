import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";
import "./BestSeller.scss";
import { postProductToCart, getCartbyUserid } from "../../../../services/apiServices";

const BestSeller = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    const userState = useSelector((state) => state.user.account);

    // Fetch Cart
    const fetchCart = async () => {
        let res = await getCartbyUserid(userState.id);
        if (res.EC === 0) {
            dispatch({
                type: "FETCH_CART_SUCCESS",
                payload: res,
            });
        }
    };

    // Add Product to Cart
    const addProductToCart = async (product) => {
        if (userState.role === "CUSTOMER") {
            let data = {
                customerId: userState.id,
                product: product,
                quantity: 1,
                totalPrice: product.sellingPrice,
            };
            let res_data = await postProductToCart(data);
            if (res_data && res_data.EC === 0) {
                toast.success("Thêm sản phẩm thành công");
                fetchCart();
            } else {
                toast.error("Thêm sản phẩm thất bại");
            }
        }
    };

    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    // Filter products by first 4 categories
    const categorizedProducts = listCategories.slice(0, 4).map((category) => ({
        categoryName: category.name,
        products: listProducts.filter((product) => product.category.categoryId === category.categoryId),
    }));

    return (
        <div className="ContainerBestSeller">
            {categorizedProducts.map((category, index) => (
                <div className="item_sell" key={index}>
                    <h3>{`TOP SẢN PHẨM ${category.categoryName.toUpperCase()} BÁN CHẠY`}</h3>
                    <Slider {...settings}>
                        {category.products.length > 0 ? (
                            category.products.map((product, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/productsPage/${product.productId}`)}
                                    className="productSlide"
                                >
                                    <div className="p-img">
                                        <img
                                            src={product.productImages[0]?.image}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className="p-rate">
                                        <span className="p-count-rate">
                                            Đánh giá: {product.rate} ({product.numberVote})
                                        </span>
                                        <p className="p-sku">
                                            Mã sp: {product.productId.substring(0, 6)}
                                        </p>
                                    </div>
                                    <div className="p-info">
                                        <p className="p-name">{product.name}</p>
                                        {product?.productDiscount?.discountAmount != null ? (
                                            <span className="p-discount">
                                                Tiết kiệm: {product?.productDiscount?.discountAmount}
                                            </span>
                                        ) : (
                                            <span className="p-discount">Mới!</span>
                                        )}
                                        <span className="p-price">
                                            {product.sellingPrice.toLocaleString("vi-VN") + " đ"}
                                        </span>
                                    </div>
                                    <div className="p-action">
                                        <span className="p-qty">
                                            {product.status === "available" || product.status === ""
                                                ? "Sẵn hàng"
                                                : "Đặt trước"}
                                        </span>
                                        <BsCartPlus
                                            size={30}
                                            style={{ color: "#212121" }}
                                            className="addmeBtn"
                                            onClick={() => addProductToCart(product)}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Không có sản phẩm nào thuộc danh mục này.</p>
                        )}
                    </Slider>
                </div>
            ))}
        </div>
    );
};

export default BestSeller;
