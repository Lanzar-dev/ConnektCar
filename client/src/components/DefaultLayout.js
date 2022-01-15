import React from "react";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

export default function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/userbookings">Bookings</a>
      </Menu.Item>
      {user && user.isAdmin && (
        <Menu.Item>
          <a href="/admin">Admin</a>
        </Menu.Item>
      )}
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <li style={{ color: "orangered" }}>Logout</li>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <Link to="/">
                <h1 style={{ color: "orangered" }}>ConnecktCar</h1>
              </Link>

              <Dropdown overlay={menu} placement="bottomCenter">
                <Button>
                  <strong> {user.username}</strong>
                </Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
      <div className="footer text-center">
        <hr />
        <p>Developed by</p>
        <p>TY</p>
      </div>
    </div>
  );
}
