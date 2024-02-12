import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import scss from "./LoginPage.module.scss";

const url = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
	const navigate = useNavigate();
	const [userLogin, setUserLogin] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const handleAuth = () => {
		if (userLogin === "" || userPassword === "") {
			alert("write");
		} else {
			const dataList = {
				login: userLogin,
				password: userPassword,
			};
			getUser(dataList);
		}
	};

	const getUser = async (dataList) => {
		try {
			const response = await axios.get(url);
			const responseData = response.data;

			const findUser = responseData.find(
				(item) =>
					item.login === dataList.login && item.password === dataList.password
			);

			if (findUser) {
				localStorage.setItem("isAuth", "" + findUser._id);
				navigate("/");
			} else {
				alert("Пользователь не найден");
			}
		} catch (error) {
			console.log("Ошибка при аутентификации:", error);
		}
	};

	const handleNavigate = () => {
		navigate("/registration");
	};

	return (
		<div className={scss.LoginPage}>
			<div className="container">
				<div className={scss.card}>
					<h1>Login</h1>
					<input
						type="text"
						value={userLogin}
						placeholder="Email"
						onChange={(e) => setUserLogin(e.target.value)}
					/>
					<input
						type="password"
						value={userPassword}
						placeholder="Password"
						onChange={(e) => setUserPassword(e.target.value)}
					/>
					<button onClick={handleAuth}>Login</button>
					<button onClick={handleNavigate}>Registration</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
