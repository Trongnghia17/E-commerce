import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { Button, FormGroup, FormControl } from "react-bootstrap"
import {
	authLoginCustomerCreator,
	authLoginSellerCreator,
	authLoginAdminCreator,
} from "../../redux/actions/auth";
import corpName from "../../assets/img/logoShopee.png";
import classname from "../../helpers/classJoiner";
import styles from "./styles.module.css";
import background from "../../assets/background/background.jpg";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
	const dispatch = useDispatch();
	const [customerType, setCustomerType] = useState(true);
	const [userType, setUserType] = useState(false);
	const [adminType, setAdminType] = useState(false);
	const [errMsg, setErrMsg] = useState(null);
	// const [errMsgSllr, setErrMsgSllr] = useState(null)

	const {
		user: login,
		status: statusLogin,
		errMsg: errMsgUser,
	} = useSelector((state) => state.auth);

	const { handleSubmit, register, errors } = useForm();

	// console.log(userAddress)

	useEffect(() => {
		document.title = "Login";
	}, []);


	useEffect(() => {
		if (statusLogin === 200) {
			props.history.push("/");
		}
	}, [statusLogin]);

	useEffect(() => {
		// console.log(statusLogin, login.user_type, errMsgUser)
		if (statusLogin === 200 && login.user_type === "Customer") {
			setErrMsg(null);
			return console.log("customer dah login");
		} else if (statusLogin === 200 && login.user_type === "Seller") {
			setErrMsg(null);
			return console.log("seller dah login");
		} else if (statusLogin === 200 && login.user_type === "Admin") {
			setErrMsg(null);
			return console.log("Admin dah login");
		}
		 else {
			setErrMsg(errMsgUser);
			// console.log('kambing')
		}
	}, [statusLogin, login.user_type]);

	const onSubmitCustomer = (data) => {
		dispatch(authLoginCustomerCreator(data));
		// console.log('customer')
	};
	const onSubmitSeller = (data) => {
		dispatch(authLoginSellerCreator(data));
		// console.log('seller')
	};
	const onSubmitAdmin = (data) => {
		dispatch(authLoginAdminCreator(data));
		// console.log('Admin')
	};
	return (
		// <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' , }}>
		<div className={classname(styles.body)}  >
			{/* <p>FORM YANG INI PUNYA CUSTOMER</p> */}
			{customerType === true && userType === false && adminType === false ? (
				<div>
					<form
						className={classname(styles.login)}
						onSubmit={handleSubmit(onSubmitCustomer)}
					>
						<img
							alt="logo"
							className={classname(styles.logo)}
							src={corpName}
						/>
						<p className={classname(styles.desc)}>
							Vui lòng đăng nhập bằng tài khoản của bạn
						</p>

						<div className={classname(styles.userType)}>


							{customerType === true && userType === false && adminType === false ? (
								<button
									className={classname(
										styles.userTypeBtnCustomerActive
									)}
								>
									Khách hàng
								</button>
							) : (
									<button
										className={classname(
											styles.userTypeBtnCustomer
										)}
									>
										Khách hàng
									</button>
								)}
							<button
								className={classname(styles.userTypeBtnSeller)}
								onClick={(e) => {
									e.preventDefault();
									setCustomerType (false);
									setUserType(true);
									setAdminType(false);
								}}
							>
								Người bán
							</button>
							<button
								className={classname(styles.userTypeBtnSeller)}
								onClick={(e) => {
									e.preventDefault();
									setCustomerType(false);
									setAdminType(true);
									setUserType(false);
								}}
							>
								Quản lý
							</button>
						</div>
						{errMsg === null ? null : (
							<p className={classname(styles.errMsg)}>
								{errMsg}
							</p>
						)}
						<form className={classname(styles.formContainer)}>

							<div>
								<input
									className={classname(styles.loginInput)}
									placeholder="Email"
									name="email"
									ref={register({
										required: "Vui lòng nhập email",
										pattern: {
											value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
											message: "Định dạng email không đúng",
										},
									})}
								/>
							</div>
							<p style={{ fontSize: 16, color: "red" }}>
								{errors.email && errors.email.message}
							</p>

							<div>
								<input
									className={classname(styles.loginInput)}
									placeholder="Mật khẩu"
									name="password"
									type="password"
									ref={register({
										required: "Vui lòng nhập mật khẩu",
										pattern: {
											value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
												message: "Mật khẩu phải chứa ít nhất 1 số, 1 chữ cái viết hoa và nhiều hơn 8 ký tự",
										},
										validate: (value) =>
											value !== "admin" || "Nice try!",
									})}
								/>
							</div>
							<p style={{ fontSize: 16, color: "red", width: 400 }}>
								{errors.password && errors.password.message}
							</p>
							<p className={classname(styles.forgot)}>
								<span onClick={() => { }}>
									<Link
										className={classname(styles.bla)}
										to="/EmailInput"
									>
										Quên mật khẩu?
									</Link>
								</span>
							</p>
							<button
								className={classname(styles.loginSubmit)}
								type="submit"
							>
								Đăng nhập
							</button>
						</form>
					</form>
					<div className={classname(styles.signUpBtn)}>
						<p>
							Bạn chưa có tài khoản?{" "}
							<span onClick={() => { }}>
								<Link
									className={classname(styles.bla)}
									to="/RegisterCustomer"

								>
									Đăng ký
								</Link>
							</span>
						</p>
					</div>
				</div>
			) : (  customerType === false && userType === true && adminType === false ? (
					// <p>FORM DIBAWAH PUNYA SELLER, YANG ATAS PUNYA CUSTOMER</p>
					<div>
						<form
							className={classname(styles.login)}
							onSubmit={handleSubmit(onSubmitSeller)}
						>
							<img
								alt="logo"
								className={classname(styles.logo)}
								src={corpName}
							/>
							<p className={classname(styles.desc)}>
								Vui lòng đăng nhập bằng tài khoản người bán
						</p>

							{/* {errMsgSllr === null ? null : (<p className={classname(styles.errMsg)}>{errMsgSllr}</p>)} */}
							<div className={classname(styles.userType)}>
								<button
									className={classname(
										styles.userTypeBtnCustomer
									)}
									onClick={(e) => {
										e.preventDefault();
										setCustomerType(true);
										setUserType(false);
										setAdminType(false);
									}}
								>
									Khách hàng
							</button>
								{userType === true ? (
									<button
										className={classname(
											styles.userTypeBtnSellerActive
										)}
									>
										Người bán
									</button>
								) : (
										<button
											className={classname(
												styles.userTypeBtnSeller
											)}
										>
											Người bán
										</button>
									)}
								<button
								className={classname(styles.userTypeBtnSeller)}
								onClick={(e) => {
									e.preventDefault();
									setCustomerType(false);
									setUserType(false);
									setAdminType(true);
								}}
							>
								Quản lý
							</button>
							</div>
							{errMsg === null ? null : (
								<p className={classname(styles.errMsg)}>
									{errMsg}
								</p>
							)}
							<form className={classname(styles.formContainer)}>

								<div>
									<input
										className={classname(styles.loginInput)}
										placeholder="Email"
										name="email"
										ref={register({
											required: "Vui lòng nhập email",
											pattern: {
												value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
												message: "Định dạng email không đúng",
											},
										})}
									/>
								</div>
								<p style={{ fontSize: 16, color: "red" }}>
									{errors.email && errors.email.message}
								</p>

								<div>
									<input
										className={classname(styles.loginInput)}
										placeholder="Mật khẩu"
										name="password"
										type="password"
										ref={register({
											required: "Vui lòng nhập mật khẩu",
											pattern: {
												value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
												message: "Mật khẩu phải chứa ít nhất 1 số, 1 chữ cái viết hoa và nhiều hơn 8 ký tự",
											},
											// validate: value => value !== "admin" || "Nice try!"
										})}
									/>
								</div>
								<p style={{ fontSize: 16, color: "red" }}>
									{errors.password && errors.password.message}
								</p>
								<p className={classname(styles.forgot)}>
									<span onClick={() => { }}>
										<Link
											className={classname(styles.bla)}
											to="/EmailInput"
										>
											Quên mật khẩu?
									</Link>
									</span>
								</p>
								<button
									className={classname(styles.loginSubmit)}
									type="submit"
								>
									Đăng nhập
							</button>
							</form>
						</form>
						<div className={classname(styles.signUpBtn)}>
							<p>
								Bạn chưa có tài khoản?{" "}
								<span onClick={() => { }}>
									<Link
										className={classname(styles.bla)}
										to="/RegisterSeller"
									>
										Đăng ký
								</Link>
								</span>
							</p>
						</div>
					</div>
			) : (
<div>
						<form
							className={classname(styles.login)}
							onSubmit={handleSubmit(onSubmitAdmin)}
						>
							<img
								alt="logo"
								className={classname(styles.logo)}
								src={corpName}
							/>
							<p className={classname(styles.desc)}>
								Vui lòng đăng nhập bằng tài khoản quản lý
						</p>

							{/* {errMsgSllr === null ? null : (<p className={classname(styles.errMsg)}>{errMsgSllr}</p>)} */}
							<div className={classname(styles.userType)}>
								<button
									className={classname(
										styles.userTypeBtnCustomer
									)}
									onClick={(e) => {
										e.preventDefault();
										setCustomerType(true);
										setUserType(false);
										setAdminType(false);
									}}
								>
									Khách hàng
							</button>
							<button
								className={classname(styles.userTypeBtnSeller)}
								onClick={(e) => {
									e.preventDefault();
									setCustomerType(false);
									setUserType(true);
									setAdminType(false);
								}}
							>
								Người bán
							</button>
								{adminType === true  ? (
									<button
										className={classname(
											styles.userTypeBtnSellerActive
										)}
									>
										Quản lý
									</button>
								) : (
										<button
											className={classname(
												styles.userTypeBtnSeller
											)}
										>
											Quản lý
										</button>
									)}
							</div>
							{errMsg === null ? null : (
								<p className={classname(styles.errMsg)}>
									{errMsg}
								</p>
							)}
							<form className={classname(styles.formContainer)}>

								<div>
									<input
										className={classname(styles.loginInput)}
										placeholder="Email"
										name="email"
										ref={register({
											required: "Vui lòng nhập email",
											pattern: {
												value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
												message: "Định dạng email không đúng",
											},
										})}
									/>
								</div>
								<p style={{ fontSize: 16, color: "red" }}>
									{errors.email && errors.email.message}
								</p>

								<div>
									<input
										className={classname(styles.loginInput)}
										placeholder="Mật khẩu"
										name="password"
										type="password"
										ref={register({
											required: "Vui lòng nhập mật khẩu",
											pattern: {
												value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
												message: "Mật khẩu phải chứa ít nhất 1 số, 1 chữ cái viết hoa và nhiều hơn 8 ký tự",
											},
											// validate: value => value !== "admin" || "Nice try!"
										})}
									/>
								</div>
								<p style={{ fontSize: 16, color: "red" }}>
									{errors.password && errors.password.message}
								</p>
								<button
									className={classname(styles.loginSubmit)}
									type="submit"
								>
									Đăng nhập
							</button>
							</form>
						</form>
					</div>
				)
			)}
		</div>
		// </div>
	);

};

export default Login;
