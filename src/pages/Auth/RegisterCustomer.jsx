import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// import { Button, FormGroup, FormControl } from "react-bootstrap"
import {
	authRegisterCustomerCreator,
	authRegisterSellerCreator,
} from "../../redux/actions/auth";
import corpName from "../../assets/img/logoShopee.png";
import classname from "../../helpers/classJoiner";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
	const dispatch = useDispatch();
	// const [userType, setUserType] = useState(false);

	const { handleSubmit, register, errors } = useForm();

	const { user: registerUser } = useSelector((state) => state.auth);

	useEffect(() => {
		if (registerUser.msg === "Register Success") {
			props.history.push("/");
		}
	}, [registerUser.msg]);

	const onSubmitCustomer = (data) => {
		dispatch(authRegisterCustomerCreator(data));
	};

	return (
		<div className={classname(styles.body)}>

			<form
				className={classname(styles.login)}
				onSubmit={handleSubmit(onSubmitCustomer)}
			>
				{/* <p className={classname(styles.corpName)}>Blanja</p> */}
				<img
					alt="logo"
					className={classname(styles.logo)}
					src={corpName}
				/>
				<p className={classname(styles.desc)}>
					Vui lòng đăng ký bằng tài khoản của bạn
						</p>
				<div className={classname(styles.userType)}>
					<button
						className={classname(
							styles.userTypeBtnCustomerActive
						)}
					>
						Khách hàng
						</button>

					<button
						className={classname(styles.userTypeBtnSeller)}
						onClick={(e) => {
							e.preventDefault();
							// props.history.push("/RegisterSeller");
						}}
					>
						<Link
							className={classname(styles.bla)}
							to="/RegisterSeller"
						>
							Người bán

						</Link>

					</button>
				</div>
				<form className={classname(styles.formContainer)}>

					<div>
						<input
							className={classname(styles.registerInput)}
							id="nameCust"
							placeholder="Name"
							name="name"
							ref={register({
								required: "Required",
							})}
							type="username"
						/>
					</div>
					<p style={{ fontSize: 16, color: "red", marginTop: -20 }}>
						{errors.name && errors.name.message}
					</p>

					<div>
						<input
							className={classname(styles.registerInput)}
							id="emailCust"
							placeholder="Email"
							name="email"
							ref={register({
								required: "Required",
								pattern: {
									value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
									message: "Email không đúng định dạng",
								},
							})}
							type="email"

						/>
					</div>
					<p style={{ fontSize: 16, color: "red", marginTop: -20 }}>
						{errors.email && errors.email.message}
					</p>

					<div>
						<input
							className={classname(styles.registerInput)}
							id="passwordCustomer"
							placeholder="Password"
							name="password"
							type="password"
							ref={register({
								required: "Required", pattern: {
									value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
									message: "Mật khẩu phải chứa ít nhất 1 số, chữ in hoa và nhiều hơn 8 ký tự"
								}
							})}
						/>
					</div>
					<p style={{ fontSize: 16, color: "red", marginTop: -20, width: 400 }}>
						{errors.password && errors.password.message}
					</p>
					<button
						className={classname(styles.loginSubmit)}
						type="submit"
					>
						Đăng ký
							</button>
				</form>
			</form>
			<div className={classname(styles.signUpBtn)}>
				<p>
					Bạn đã có tài khoản ?{" "}
					<span onClick={() => { }}>
						<Link className={classname(styles.bla)} to="/login">
							Đăng nhập
								</Link>
					</span>
				</p>
			</div>
		</div>
	);
};

export default Login;
