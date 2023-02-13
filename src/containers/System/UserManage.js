import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let respone = await getAllUsers('ALL');
        if (respone && respone.errCode === 0) {
            this.setState({
                arrUsers: respone.users,
                // isOpenModalUser: false
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let respone = await createNewUserService(data);
            if (respone && respone.errCode !== 0) {
                alert(respone.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(Error);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditUser = async (user) => {
        try {
            console.log("Edit user: ", user);
            this.setState({
                isOpenModalEditUser: true,
                userEdit: user
            })
        } catch (error) {
            console.log(error);
        }
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact();
                console.log('Check change: ', res);
            } else {
                console.log(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        let arrUsers = this.state.arrUsers;
        console.log(arrUsers);
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>
                    MANAGE USERS
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}><i className="fas fa-plus"></i> Add new users</button>
                </div>
                <div className='users-table mt-4 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
