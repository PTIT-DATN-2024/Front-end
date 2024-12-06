import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";

import "./TableProductPre.scss";

const TableProductPre = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);

    const addProductOrder = async (productId) => {
        dispatch({
            type: "add_product_to_order",
            payload: { productId, quantity:1 },
        });
        toast.success("Added to order successfully");
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
                                        <span class="p-count-rate">{product.rate}</span>
                                        <span class="p-count-rate">({product.numberVote})</span>
                                        <p class="p-sku">Mã: {product.productId}</p>
                                    </div>
                                    <div class="p-info">
                                        <p class="p-name">{product.name}</p>
                                        <span class="p-discount"> (Tiết kiệm: {product?.productDiscount?.discountAmount != null ? product?.productDiscount?.discountAmount : 0 }% )</span>
                                        <span class="p-price"> {product.sellingPrice.toLocaleString("vi-VN") + " đ"}</span>
                                    </div>
                                    <div class="p-action">
                                        <span class="p-qty">{(product.status==="available" || product.status==="" )? "Sắn hàng" : "Đặt trước"}</span>
                                        <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductOrder(product._id)} />
                                    </div>
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
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
                                        <span class="p-count-rate">{product.rate}</span>
                                        <span class="p-count-rate">({product.numberVote})</span>
                                        <p class="p-sku">Mã: {product.productId}</p>
                                    </div>
                                    <div class="p-info">
                                        <p class="p-name">{product.name}</p>
                                        <span class="p-discount"> (Tiết kiệm: {product?.productDiscount?.discountAmount != null ? product?.productDiscount?.discountAmount : 0 }% )</span>
                                        <span class="p-price"> {product.sellingPrice.toLocaleString("vi-VN") + " đ"}</span>
                                    </div>
                                    <div class="p-action">
                                        <span class="p-qty">{(product.status==="available" || product.status==="" )? "Sắn hàng" : "Đặt trước"}</span>
                                        <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductOrder(product._id)} />
                                    </div>
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
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
                                        <span class="p-count-rate">{product.rate}</span>
                                        <span class="p-count-rate">({product.numberVote})</span>
                                        <p class="p-sku">Mã: {product.productId}</p>
                                    </div>
                                    <div class="p-info">
                                        <p class="p-name">{product.name}</p>
                                        <span class="p-discount"> (Tiết kiệm: {product?.productDiscount?.discountAmount != null ? product?.productDiscount?.discountAmount : 0 }% )</span>
                                        <span class="p-price"> {product.sellingPrice.toLocaleString("vi-VN") + " đ"}</span>
                                    </div>
                                    <div class="p-action">
                                        <span class="p-qty">{(product.status==="available" || product.status==="" )? "Sắn hàng" : "Đặt trước"}</span>
                                        <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductOrder(product._id)} />
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
