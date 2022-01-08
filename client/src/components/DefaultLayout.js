import React from "react";
import { Menu, Dropdown, Button, Space, Row, Col } from "antd";
import { Link } from "react-router-dom";

export default function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="https://www.antgroup.com">Home</a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://www.antgroup.com">Bookings</a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://www.aliyun.com">Profile</a>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <li>Logout</li>
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
                <h1>ConnecktCar</h1>
              </Link>

              <Dropdown overlay={menu} placement="bottomCenter">
                <Button>
                  Hi!, <strong> {user.username}</strong>
                </Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}
