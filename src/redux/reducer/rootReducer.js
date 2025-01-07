import { combineReducers } from "redux";
import userReducer from "./authorReducer";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import orderUserReducer from "./orderUserReducer";
import managerUserReducer from "./admin/managerUserReducer";
import cartReducer from "./cartReducer";
import chatBoxReducer from "./chatBoxReducer";
import discountReducer from "./discountReducer";

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    listOrder: orderUserReducer,
    listUser: managerUserReducer,
    cart: cartReducer,
    chatBox: chatBoxReducer,
    discount: discountReducer,
});

export default rootReducer;
