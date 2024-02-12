import axios from "axios";
import scss from "./HomePage.module.scss";
import { useState } from "react";
import { useEffect } from "react";
const url = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
	const [data, setData] = useState([]);
	const getRequest = async () => {
		const response = await axios.get(url);
		setData(response.data);
	};
	useEffect(() => {
		getRequest();
	}, []);
	const deleteItem = async (id) => {
		const response = await axios.delete(`${url}/${id}`);
		setData(response.data);
	};
	return (
		<div className={scss.HomePage}>
			<h1>Вы не авторизованы</h1>
			<div className={scss.cards}>
				{data.map((item, index) => (
					<div className={scss.card} key={index}>
						<button onClick={() => deleteItem(item._id)}>delete</button>
						<h3>{item.name}</h3>
						<p>{item.login}</p>
						<img src={item.image} alt="img" />
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePage;
