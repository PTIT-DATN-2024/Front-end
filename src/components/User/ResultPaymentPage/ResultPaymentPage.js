import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllProducts } from "../../../services/apiServices";
import "./ResultPaymentPage.scss";
import { postResultPayment, getCartbyUserid, removeProductToCart } from "../../../services/apiServices";
import { CiCircleCheck, CiCircleAlert, CiCircleRemove } from "react-icons/ci";
const ResultPaymentPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const userCart = useSelector((state) => state.cart.cartItems);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const userState = useSelector((state) => state.user.account);
    const [message, setMessage] = useState('');
    const listProducts = useSelector((state) => state.product.listProducts);
    const stateOrder = useSelector((state) => state.listOrder);
    const [queryParams, setQueryParams] = useState();
    const [vnpTxnRef, setVnpTxnRef] = useState();
    const [vnpResponseCode, setVnpResponseCode] = useState();
    const handleStateOrder = async (data) => {
        const response = await postResultPayment(data);
        if (response && response.EC === 0) {
            toast.success(response.MS);
        } else if (response) {
            toast.error(response.MS);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // Lấy danh sách sản phẩm khi trang được load
    const fetchCart = async () => {
        let res = await getCartbyUserid(userState.id);
        if (res.EC === 0) {
            dispatch({
                type: "FETCH_CART_SUCCESS",
                payload: res,
            });
        }
    };
    const paymentIcons = {
        success: <CiCircleCheck style={{ color: 'green', fontSize: '60px' }} />,
        failed: <CiCircleRemove style={{ color: 'red', fontSize: '60px' }} />,
        error: <CiCircleAlert style={{ color: 'orange', fontSize: '60px' }} />,
    };
    const paymentMessages = {
        success: "Cảm ơn bạn đã mua sắm! Chúng tôi sẽ xử lý đơn hàng của bạn sớm.",
        failed: "Vui lòng thử lại hoặc liên hệ với chúng tôi nếu bạn gặp vấn đề.",
        error: "Vui lòng liên hệ với bộ phận hỗ trợ khách hàng để giải quyết vấn đề này.",
    };
    // Xử lý trạng thái thanh toán dựa trên các tham số từ URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const data = {
            vnp_Amount: params.get('vnp_Amount'),
            vnp_BankCode: params.get('vnp_BankCode'),
            vnp_BankTranNo: params.get('vnp_BankTranNo'),
            vnp_CardType: params.get('vnp_CardType'),
            vnp_OrderInfo: params.get('vnp_OrderInfo'),
            vnp_PayDate: params.get('vnp_PayDate'),
            vnp_ResponseCode: params.get('vnp_ResponseCode'),
            vnp_TmnCode: params.get('vnp_TmnCode'),
            vnp_TransactionNo: params.get('vnp_TransactionNo'),
            vnp_TransactionStatus: params.get('vnp_TransactionStatus'),
            vnp_TxnRef: params.get('vnp_TxnRef'),
            vnp_SecureHash: params.get('vnp_SecureHash'),
        };
        setQueryParams(params);
        setVnpTxnRef(params.get('vnp_TxnRef'));
        setVnpResponseCode(params.get('vnp_ResponseCode'));
        switch (params.get('vnp_ResponseCode')) {
            case '00':
                setPaymentStatus('success');
                setMessage(`Thanh toán thành công! Mã giao dịch: ${params.get('vnp_TxnRef').slice(0, 4)}...${params.get('vnp_TxnRef').slice(12, 16)}`);
                handleStateOrder(data);
                break;
            case '07':
                setPaymentStatus('failed');
                setMessage('Giao dịch bị nghi ngờ gian lận. Vui lòng liên hệ hỗ trợ.');
                break;
            case '09':
                setPaymentStatus('failed');
                setMessage('Giao dịch không thành công: Thẻ hoặc tài khoản chưa đăng ký dịch vụ InternetBanking.');
                break;
            case '10':
                setPaymentStatus('failed');
                setMessage('Xác thực không đúng quá 3 lần. Vui lòng thử lại.');
                break;
            case '11':
                setPaymentStatus('failed');
                setMessage('Giao dịch đã hết hạn chờ thanh toán. Vui lòng thực hiện lại.');
                break;
            case '12':
                setPaymentStatus('failed');
                setMessage('Giao dịch không thành công: Tài khoản hoặc thẻ bị khóa.');
                break;
            case '13':
                setPaymentStatus('failed');
                setMessage('Mật khẩu xác thực (OTP) không đúng. Vui lòng thử lại.');
                break;
            case '24':
                setPaymentStatus('failed');
                setMessage('Giao dịch đã bị hủy bởi khách hàng.');
                break;
            case '51':
                setPaymentStatus('failed');
                setMessage('Không đủ số dư trong tài khoản để thực hiện giao dịch.');
                break;
            case '65':
                setPaymentStatus('failed');
                setMessage('Tài khoản đã vượt quá hạn mức giao dịch trong ngày.');
                break;
            case '75':
                setPaymentStatus('failed');
                setMessage('Ngân hàng đang bảo trì. Vui lòng thử lại sau.');
                break;
            case '79':
                setPaymentStatus('failed');
                setMessage('Nhập sai mật khẩu thanh toán quá số lần quy định.');
                break;
            case '99':
                setPaymentStatus('failed');
                setMessage('Lỗi không xác định. Vui lòng liên hệ hỗ trợ.');
                break;
            default:
                setPaymentStatus('error');
                setMessage('Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.');
                break;
        }
    }, [location]);
    return (
        <div className="result-payment">
            <div>
                {paymentStatus && paymentIcons[paymentStatus]}
            </div>
            <div className={`status-message ${paymentStatus}`}>
                {message}
            </div>
            {paymentStatus && (
                <div>
                    <p>{paymentMessages[paymentStatus]}</p>
                </div>
            )}
        </div>
    );
};

export default ResultPaymentPage;
