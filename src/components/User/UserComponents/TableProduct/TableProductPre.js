import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";
import { postProductToCart } from "../../../../services/apiServices";
import { getCartbyUserid } from "../../../../services/apiServices";
import "./TableProductPre.scss";

const TableProductPre = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    };
    // Custom next arrow

    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return <div className="slick-arrow slick-next" onClick={onClick} style={{ display: "block", color: "black", fontSize: "30px" }}></div>;
    };

    // Custom previous arrow
    const SamplePrevArrow = (props) => {
        const { onClick } = props;
        return <div className="slick-arrow slick-prev" onClick={onClick} style={{ display: "block", color: "black", fontSize: "30px" }}></div>;
    };
    const settings = {
        dots: false, // Tắt dots
        infinite: true,
        speed: 300,
        slidesToShow: 6, // Hiển thị 6 slide
        slidesToScroll: 1,
        draggable: true,
        swipeToSlide: true,
        autoplay: true, // Thêm autoplay
        autoplaySpeed: 3000, // Tốc độ chuyển slide (3 giây)
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className="tableProductPre">
            <div className="tableProductPre_item">
                <div className="header">
                    <div className="title">
                        CÁC SẢN PHẨM BÁN CHẠY NHẤT
                    </div>
                    <div className="more" onClick={() => navigate("/productFilterPage")}>
                        Xem tất cả
                    </div>
                </div>
                <div className="tableProductPre_list">
                    <Slider {...settings}>
                        {listProducts &&
                            listProducts.length > 0 &&
                            listProducts.map((product, index) => (
                                <div key={index} onClick={() => navigate(`/productsPage/${product.productId}`)} class="productSlide">
                                    <div class="p-img">
                                        <img src={product.productImages[0].image} alt="Laptop Asus VivoBook X1404ZA-NK386W&nbsp;(i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)" />
                                    </div>
                                    <div class="p-rate">
                                        <span class="p-count-rate">{product.rate} ({product.numberVote})</span>
                                        <p class="p-sku">Mã: {product.productId.substring(0, 6)}</p>
                                    </div>
                                    <div class="p-info">
                                        <p class="p-name">{product.name}</p>
                                        {
                                            product?.productDiscount?.discountAmount != null
                                                ? <span class="p-discount">Tiết kiệm: {product?.productDiscount?.discountAmount}</span>
                                                : <span class="p-discount">Mới ! </span>
                                        }
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
        </div>
    );
};

export default TableProductPre;
