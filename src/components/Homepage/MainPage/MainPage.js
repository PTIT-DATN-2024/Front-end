import { useSelector } from "react-redux";

const MainPage = (props)=>{
    const isAuthenticated = useSelector(state   => state.user.isAuthenticated)
    const account = useSelector(state   => state.user.account)
    console.log(isAuthenticated,account);
    return (
        <div>
            page main
        </div>
    )
}
export default MainPage;