import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Card/Card";
import styles from "./styles.module.css";
import classname from "../../helpers/classJoiner";
import text from "../../assets/text.module.css";
import { previewData, categoryData, newData } from "../../utils/dummydata";
import { fetchAllProduct } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const Home = (props) => {
	const dispatch = useDispatch();
	const { product: stateProduct, isPending } = useSelector(
		(state) => state.product
	);

	const onClickHandler = (id) => {
		props.history.push(`/product/detail/${id}`);
	};

	useEffect(() => {
		document.title = "Mau belanja? ya di Blanja! | Blanja";
		dispatch(fetchAllProduct());
	}, [dispatch]);

	if (isPending) {
		return <Loader />;
	}

	return (
		<main className={styles.home}>
			<div style={{ marginBottom: "50px" }}>
				<Carousel
					key="1"
					carouselType="previewItem"
					data={previewData}
				/>
			</div>
			<div style={{ marginBottom: "50px" }}>
				<h1 className={text.headline}>Thể loại</h1>
				<p
					className={classname(
						text.helperText,
						styles.marginbottom30
					)}
				>
					Bạn muốn tìm kiếm điều gì?
				</p>
				<Carousel
					key="2"
					carouselType="categoryItem"
					data={categoryData}
					history={props.history}
				/>
			</div>
			<div>
				<h1 className={text.headline}>Mới</h1>
				<p className={classname(text.helperText, styles.marginbottom30)}>
					Bạn chưa bao giờ nhìn thấy nó trước đây!
				</p>
				<div className="w-100">
					<div
						className={classname(
							styles.marginbottom50,
							"row",
							"no-gutters"
						)}
					>
						{stateProduct.map((item) => {
							return (
								<Card
									key={item.id}
									{...item}
									onClickProp={onClickHandler}
								/>
							);
						})}
					</div>
				</div>
				<h1 className={text.headline}>Phổ biến</h1>
				<p className={classname(text.helperText, styles.marginbottom30)}>
					Tìm kiếm sản phẩm phổ biến!
				</p>
				<div className="w-100">
					<div
						className={classname(
							"row",
							"no-gutters",
							"d-flex flex-row"
						)}
					>
						{stateProduct.map((item) => {
							return (
								<Card
									key={item.id}
									{...item}
									onClickProp={onClickHandler}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</main>
	);
};

Home.propTypes = {};

export default Home;
