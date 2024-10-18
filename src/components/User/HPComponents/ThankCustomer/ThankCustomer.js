import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";
import "./ThankCustomer.scss";

const ThankCustomer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);

    const settings = {
        dots: false, // Disable dots
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 4 slides per view
        slidesToScroll: 1,
        draggable: true,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className="containerTC">
            <div className="Pre">
                <img className="lazy loaded" src="https://hanoicomputercdn.com/media/lib/20-05-2024/khachang_logo_new.png" alt="Khách Hàng Hacom" />
            </div>
            <div className="list">
                <Slider {...settings}>
                    <div className="slide-item">
                        <a href="#" title="Đại Gia Đình HACOM ^^!">
                            <img className="owl-lazy" src="https://hanoicomputercdn.com/media/banner/27_Jul853b031a43495200d111d6f5239398a3.jpg" alt="Đại Gia Đình HACOM ^^!" />
                        </a>
                    </div>
                    <div className="slide-item">
                        <a href="#" title="Đại Gia Đình HACOM ^^!">
                            <img className="owl-lazy" src="https://hanoicomputercdn.com/media/banner/27_Jul853b031a43495200d111d6f5239398a3.jpg" alt="Đại Gia Đình HACOM ^^!" />
                        </a>
                    </div>
                    <div className="slide-item">
                        <a href="#" title="Đại Gia Đình HACOM ^^!">
                            <img className="owl-lazy" src="https://hanoicomputercdn.com/media/banner/27_Jul853b031a43495200d111d6f5239398a3.jpg" alt="Đại Gia Đình HACOM ^^!" />
                        </a>
                    </div>
                    <div className="slide-item">
                        <a href="#" title="Đại Gia Đình HACOM ^^!">
                            <img className="owl-lazy" src="https://hanoicomputercdn.com/media/banner/27_Jul853b031a43495200d111d6f5239398a3.jpg" alt="Đại Gia Đình HACOM ^^!" />
                        </a>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

// Custom next arrow
const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="slick-arrow slick-next" onClick={onClick}>
            ➔
        </div>
    );
};

// Custom previous arrow
const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="slick-arrow slick-prev" onClick={onClick}>
            ➔
        </div>
    );
};

export default ThankCustomer;
