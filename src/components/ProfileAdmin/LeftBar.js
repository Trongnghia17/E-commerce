import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./leftbar.module.css";
import userDefault from "../../assets/img/default.png";
import { Accordion, Card } from "react-bootstrap";
import {
  getSellerByAdminIdCreator,
  getCustomerByAdminIdCreator,
  getProductByAdminIdCreator,
  getOrderAdminCreator,
} from "../../redux/actions/product";
import { API_URL } from "../../utils/environment";
import { authClearState } from "../../redux/actions/auth";

export default function LeftBar(props) {
  const [arrow, setArrow] = useState({
    store: true,
    product: false,
    order: false,
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    nav,
    setNav1,
    setNav2,
    setNav3,
    setNav4,
    setNav5,
    setEdit,
    onShow,
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.infoitem}>
        <div className={styles.profile}>
          <div className={styles.containerimage}>
            <img
              className={styles.image}
              src={user.avatar ? `${API_URL}${user.avatar}` : userDefault}
              alt=''
            />
          </div>
          <div className={styles.nameinfo}>
            <p className={styles.name}>{user.name ? user.name : "Anonim"}</p>
            <p
              className={styles.edit}
              onClick={() => {
                setEdit();
                setNav1();
              }}>
            </p>
          </div>
        </div>

        <Accordion defaultActiveKey='0'>
        <Card
            style={{
              backgroundColor: "#ffffff",
              border: "none",
            }}>
            <Accordion.Toggle
              onClick={() => {
                setNav3();
                setArrow({
                  store: false,
                  product: !arrow.product,
                  order: false,
                });
                dispatch(getCustomerByAdminIdCreator(Number(user.id)));
              }}
              as={Card.Header}
              eventKey='1'
              style={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                flexDirection: "row",
              }}>
              <span className='fa-stack fa-lg' style={{ flex: 1 }}>
                <i
                  className='fa fa-circle fa-stack-2x'
                  style={{ color: "#F36F45" }}></i>
                <i className='fa fa-cube fa-stack-1x fa-inverse'></i>
              </span>
              <p
                style={{ flex: 5 }}
                className={
                  nav === "AdminCustomer" || nav === "selingproduct"
                    ? styles.active
                    : styles.inactive
                }>
                Khách hàng
              </p>
            </Accordion.Toggle>
          </Card>
          <Card
            style={{
              backgroundColor: "#ffffff",
              border: "none",
            }}>
            <Accordion.Toggle
              onClick={() => {
                setNav5();
                setArrow({
                  store: false,
                  product: !arrow.product,
                  order: false,
                });
                dispatch(getSellerByAdminIdCreator(Number(user.id)));
              }}
              as={Card.Header}
              eventKey='1'
              style={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                flexDirection: "row",
              }}>
              <span className='fa-stack fa-lg' style={{ flex: 1 }}>
                <i
                  className='fa fa-circle fa-stack-2x'
                  style={{ color: "#F36F45" }}></i>
                <i className='fa fa-cube fa-stack-1x fa-inverse'></i>
              </span>
              <p
                style={{ flex: 5 }}
                className={
                  nav === "AdminSeller" || nav === "selingproduct"
                    ? styles.active
                    : styles.inactive
                }>
               Nhân viên Seller
              </p>
            </Accordion.Toggle>
          </Card>
          <Card
            style={{
              backgroundColor: "#ffffff",
              border: "none",
            }}>
            <Accordion.Toggle
              onClick={() => {
                setNav2();
                setArrow({
                  store: false,
                  product: !arrow.product,
                  order: false,
                });
                dispatch(getProductByAdminIdCreator(Number(user.id)));
              }}
              as={Card.Header}
              eventKey='1'
              style={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                flexDirection: "row",
              }}>
              <span className='fa-stack fa-lg' style={{ flex: 1 }}>
                <i
                  className='fa fa-circle fa-stack-2x'
                  style={{ color: "#F36F45" }}></i>
                <i className='fa fa-cube fa-stack-1x fa-inverse'></i>
              </span>
              <p
                style={{ flex: 5 }}
                className={
                  nav === "myproduct" || nav === "selingproduct"
                    ? styles.active
                    : styles.inactive
                }>
                Sản phẩm
              </p>
            </Accordion.Toggle>
          </Card>

          <Card
            style={{
              backgroundColor: "#ffffff",
              border: "none",
            }}>
            <Accordion.Toggle
              onClick={() => {
                setNav4();
                setArrow({
                  store: false,
                  product: false,
                  order: !arrow.order,
                });
                dispatch(getOrderAdminCreator(Number(user.id)));
              }}
              as={Card.Header}
              eventKey='2'
              style={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                flexDirection: "row",
              }}>
              <span className='fa-stack fa-lg' style={{ flex: 1 }}>
                <i
                  className='fa fa-circle fa-stack-2x'
                  style={{ color: "#F3456F" }}></i>
                <i className='fa fa fa-shopping-cart fa-stack-1x fa-inverse'></i>
              </span>
              <p
                style={{ flex: 5 }}
                className={
                  nav === "myorder" || nav === "ordercancel"
                    ? styles.active
                    : styles.inactive
                }>
                Đơn hàng
              </p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='2'>
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "40px",
                  paddingTop: 0,
                  paddingBottom: 0,
                  cursor: "pointer",
                }}>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
      <button
        onClick={() => {
          // dispatch(authClearState());
          onShow();
        }}
        className={styles.btnsave}>
          Đăng xuất

      </button>
    </div>
  );
}
