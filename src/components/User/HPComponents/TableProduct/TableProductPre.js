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

    const addProductOrder = (productId) => {
        dispatch({ type: "add_product", payload: productId });
        toast.success("Product added to order.");
    };

    const removeProductOrder = (productId) => {
        dispatch({ type: "remove_product", payload: productId });
        toast.success("Product removed from order.");
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
        <div className="tableProduct">
            <Slider {...settings}>
                {listProducts &&
                    listProducts.map((product, index) => (
                        <div key={index} class="productSlide">
                            <div class="p-img">
                                <img src={product.presentImage} alt="Laptop Asus VivoBook X1404ZA-NK386W&nbsp;(i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)" />
                            </div>
                            <div class="p-rate">
                                {/* rate */}
                                {/* <img src="/media/lib/star_0.png" alt="rate" class="p-rating"/> */}
                                <span class="p-count-rate">{product.rate}</span>
                                <p class="p-sku">Mã: LTAU861</p>
                            </div>
                            <div class="p-info">
                                <p class="p-name">{product.name}</p>
                                <span class="p-price"> {product.sellingprice.toLocaleString("vi-VN") + " đ"}</span>
                                <span class="p-discount"> (Tiết kiệm: 19% )</span>
                            </div>
                            <div class="p-action">
                                <span class="p-qty">Sẵn hàng</span>
                                <div className="addmeBtn" onClick={() => addProductOrder(product._id)}>
                                    <BsCartPlus size={30} style={{ color: "#212121" }} />
                                </div>
                            </div>
                        </div>
                    ))}
            </Slider>
            <div className="tableProductMore" onClick={() => navigate("/productFilterPage")}>
                More Products
            </div>
        </div>
    );
};

export default TableProductPre;
