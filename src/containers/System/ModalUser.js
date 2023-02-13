import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;// Lay gia tri input
        this.setState({
            ...copyState
        });

    }

    checkValidateInput = () => {
        let isValid = true;
        //arrInput[i]: Truong cua input
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            //this.state.[arrInput[i]]: gia tri cua input
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
            }
        }
        return true;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api create modal
            this.props.createNewUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'email') }} value={this.state.email} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'password') }} value={this.state.password} />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }} value={this.state.firstName} />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }} value={this.state.lastName} />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'address') }} value={this.state.address} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className='modal-user-footer'>
                        <button className='btn-save-change px-3' onClick={() => { this.toggle(this.handleAddNewUser()) }}>Add new</button>
                        <button className='btn-close-click px-3' onClick={() => { this.toggle() }}>Cancel</button>
                    </div>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
