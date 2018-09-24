import React, { Component } from 'react';
import { connect } from 'react-redux';

class Auth extends Component {

    state = {
        user: '',
        psw: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const url = "/api/auth/RequestToken";
        const data = {
            username: this.state.user,
            password: this.state.psw,
        }
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        fetch(url, config)
            .then((res) => res.json())
            .then((result) => {
                this.props.dispatch({
                    type: 'SET_TOKEN',
                    payload: result.token
                })
            })
    }

    handleUserChange = (e) => {
        this.setState({ user: e.target.value });
    }

    handlePswChange = (e) => {
        this.setState({ psw: e.target.value });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" onChange={this.handleUserChange} className="form-control" ></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={this.handlePswChange} className="form-control" ></input>
                    </div>
                    <div className="form-group">
                    </div>
                    {console.log(this.props)}
                    {this.props.Authorization.isAuth
                        ? <DisabledSubmitButton/>
                        : <EnabledSubmitButton/>
                    }
                </form>
            </div>
        );
    }
}

const EnabledSubmitButton = () => {
    return (
        <div className="form-group">
            <input type="submit" value="Log in" className="btn btn-default" />
        </div>
    )
}

const DisabledSubmitButton = () => {
    return (
        <div className="form-group">
            <input type="submit" value="Log in" className="btn btn-default disabled" />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Authorization : state.tokenReducer
    }
  }

export default connect(mapStateToProps)(Auth);