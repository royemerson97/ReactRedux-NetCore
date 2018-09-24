import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';

class NavMenu extends Component {
  render() {
    return (
      <div className="main-nav">
        <div className="navbar navbar-inverse">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to={"/"}>
              React
            </Link>
          </div>
          <div className="clearfix" />
          <div className="navbar-collapse collapse">
            {this.props.isAuthorized
              ?
              <ul className="nav navbar-nav">
                <li>
                  <NavLink to={"/"} exact activeClassName="active">
                    <span className="glyphicon glyphicon-home" /> Home
                </NavLink>
                </li>
                <li>
                  <NavLink to={"/counter"} activeClassName="active">
                    <span className="glyphicon glyphicon-education" /> Counter
                </NavLink>
                </li>
                <li>
                  <NavLink to={"/fetchdata"} activeClassName="active">
                    <span className="glyphicon glyphicon-th-list" /> Fetch data
                </NavLink>
                </li>
                <li>
                  <NavLink to={"/posts"} activeClassName="active">
                    <span className="glyphicon glyphicon-th-list" />Posts
                </NavLink>
                </li>
              </ul>
              :
              <ul className="nav navbar-nav">
                <li>
                  <NavLink to={"/auth"} activeClassName="active">
                    <span className="glyphicon glyphicon-th-list" />Auth
                  </NavLink>
                </li>
              </ul>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.tokenReducer.isAuth
  }
}

export default connect(mapStateToProps)(NavMenu);