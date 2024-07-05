const TableUsers = (props) => {
    const { listUsers } = props;
    console.log(listUsers);
    return (
        <>
            <table className="table caption-top">
                <caption>Danh sách User</caption>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Role</th>
                        <th scope="col">Setting</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers &&
                        listUsers.length > 0 &&
                        listUsers.map((user, index) => {
                            return (
                                <tr key={`table_user_${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{user._id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-secondary">View</button>
                                        <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(user)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(user)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    {listUsers && listUsers.length === 0 && (
                        <tr>
                            <td colSpan={6}>Not found user</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default TableUsers;
