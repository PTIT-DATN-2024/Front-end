import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./BestSeller.scss";
import { postProductToCart } from "../../../../services/apiServices";
import { getCartbyUserid } from "../../../../services/apiServices";
import { BsCartPlus } from "react-icons/bs";
const BestSeller = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listProducts = useSelector((state) => state.product.listProducts);
    const userState = useSelector((state) => state.user.account);
    const fetchCart = async () => {
        let res = await getCartbyUserid(userState.id);
        if (res.EC === 0) {
            dispatch({
                type: "FETCH_CART_SUCCESS",
                payload: res,
            });
        }
    };
    const addProductToCart = async (product) => {
        if (userState.role === "CUSTOMER") {
            let data = {
                customerId: userState.id,
                product: product,
                quantity: 1,
                totalPrice: product.sellingPrice
            };
            let res_data = await postProductToCart(data);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                fetchCart();
            }
            if (res_data && res_data.EC !== 0) {
                toast.error(res_data.MS);
            }
        }

    };
    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return <div className="slick-arrow slick-next" onClick={onClick} style={{ display: "block", color: "black", fontSize: "30px" }}></div>;
    };
    const SamplePrevArrow = (props) => {
        const { onClick } = props;
        return <div className="slick-arrow slick-prev" onClick={onClick} style={{ display: "block", color: "black", fontSize: "30px" }}></div>;
    };
    const settings = {
        dots: false, // Tắt dots
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Hiển thị 6 slide
        slidesToScroll: 1,
        draggable: true,
        swipeToSlide: true,
        autoplay: true, // Thêm autoplay
        autoplaySpeed: 3000, // Tốc độ chuyển slide (3 giây)
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className="ContainerBestSeller">
            <div className="item_sell">
                <h3>TOP LAPTOP BÁN CHẠY NHẤT</h3>
                <Slider {...settings}>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => (
                            <div key={index} onClick={() => navigate(`/productsPage/${product.productId}`)} class="productSlide">
                                <div class="p-img">
                                    <img src={product.productImages[0].image} alt="Laptop Asus VivoBook X1404ZA-NK386W&nbsp;(i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)" />
                                </div>
                                <div class="p-rate">
                                    <span class="p-count-rate">Đánh giá: {product.rate} ({product.numberVote})</span>
                                    <p class="p-sku">Mã sp: {product.productId.substring(0, 6)}</p>
                                </div>
                                <div class="p-info">
                                    <p class="p-name">{product.name}</p>
                                    {
                                        product?.productDiscount?.discountAmount != null
                                            ? <span class="p-discount">Tiết kiệm: {product?.productDiscount?.discountAmount}</span>
                                            : <span class="p-discount">Mới ! </span>
                                    }
                                    <span class="p-price"> {product.sellingPrice.toLocaleString("vi-VN") + " đ"}</span>
                                </div>
                                <div class="p-action">
                                    <span class="p-qty">{(product.status === "available" || product.status === "") ? "Sắn hàng" : "Đặt trước"}</span>

                                    <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductToCart(product)} />
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
            <div className="item_sell">
                <h3>TOP LAPTOP BÁN CHẠY NHẤT</h3>
                <Slider {...settings}>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => (
                            <div key={index} onClick={() => navigate(`/productsPage/${product.productId}`)} class="productSlide">
                                <div class="p-img">
                                    <img src={product.productImages[0].image} alt="Laptop Asus VivoBook X1404ZA-NK386W&nbsp;(i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)" />
                                </div>
                                <div class="p-rate">
                                    <span class="p-count-rate">Đánh giá: {product.rate} ({product.numberVote})</span>
                                    <p class="p-sku">Mã sp: {product.productId.substring(0, 6)}</p>
                                </div>
                                <div class="p-info">
                                    <p class="p-name">{product.name}</p>
                                    {
                                        product?.productDiscount?.discountAmount != null
                                            ? <span class="p-discount">Tiết kiệm: {product?.productDiscount?.discountAmount}</span>
                                            : <span class="p-discount">Mới ! </span>
                                    }
                                    <span class="p-price"> {product.sellingPrice.toLocaleString("vi-VN") + " đ"}</span>
                                </div>
                                <div class="p-action">
                                    <span class="p-qty">{(product.status === "available" || product.status === "") ? "Sắn hàng" : "Đặt trước"}</span>
                                    <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductToCart(product)} />
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
            <div className="item_sell">
                <h3>TOP LAPTOP BÁN CHẠY NHẤT</h3>
                <Slider {...settings}>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => (
                            <div key={index} onClick={() => navigate(`/productsPage/${product.productId}`)} class="productSlide">
                                <div class="p-img">
                                    <img src={product.productImages[0].image} alt="Laptop Asus VivoBook X1404ZA-NK386W&nbsp;(i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)" />
                                </div>
                                <div class="p-rate">
                                    <span class="p-count-rate">Đánh giá: {product.rate} ({product.numberVote})</span>
                                    <p class="p-sku">Mã sp: {product.productId.substring(0, 6)}</p>
                                </div>
                                <div class="p-info">
                                    <p class="p-name">{product.name}</p>
                                    {
                                        product?.productDiscount?.discountAmount != null
                                            ? <span class="p-discount">Tiết kiệm: {product?.productDiscount?.discountAmount}</span>
                                            : <span class="p-discount">Mới ! </span>
                                    }
                                    <span class="p-price"> {product.sellingPrice.toLocaleString("vi-VN") + " đ"}</span>
                                </div>
                                <div class="p-action">
                                    <span class="p-qty">{(product.status === "available" || product.status === "") ? "Sắn hàng" : "Đặt trước"}</span>

                                    <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductToCart(product)} />
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
            <div className="item_sell">
                <h3>TOP LAPTOP BÁN CHẠY NHẤT</h3>
                <Slider {...settings}>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => (
                            <div key={index} onClick={() => navigate(`/productsPage/${product.productId}`)} class="productSlide">
                                <div class="p-img">
                                    <img src={product.productImages[0].image} alt="Laptop Asus VivoBook X1404ZA-NK386W&nbsp;(i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)" />
                                </div>
                                <div class="p-rate">
                                    <span class="p-count-rate">Đánh giá: {product.rate} ({product.numberVote})</span>
                                    <p class="p-sku">Mã sp: {product.productId.substring(0, 6)}</p>
                                </div>
                                <div class="p-info">
                                    <p class="p-name">{product.name}</p>
                                    {
                                        product?.productDiscount?.discountAmount != null
                                            ? <span class="p-discount">Tiết kiệm: {product?.productDiscount?.discountAmount}</span>
                                            : <span class="p-discount">Mới ! </span>
                                    }
                                    <span class="p-price"> {product.sellingPrice.toLocaleString("vi-VN") + " đ"}</span>
                                </div>
                                <div class="p-action">
                                    <span class="p-qty">{(product.status === "available" || product.status === "") ? "Sắn hàng" : "Đặt trước"}</span>

                                    <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductToCart(product)} />
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>





        </div>
    );
};

export default BestSeller;
