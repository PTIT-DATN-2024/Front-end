import { combineReducers } from "redux";
import userReducer from "./authorReducer";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import orderUserReducer from "./orderUserReducer";
import managerUserReducer from "./admin/managerUserReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    listOrder: orderUserReducer,
    listUser: managerUserReducer,
    cart: cartReducer,
});

export default rootReducer;
