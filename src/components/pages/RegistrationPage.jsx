import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import scss from "./RegistrationPage.module.scss";

const url = import.meta.env.VITE_BACKEND_URL;

const RegistrationPage = () => {
	const navigate = useNavigate();
	const [userName, setUserName] = useState("");
	const [userImage, setUserImage] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const handleAuth = async () => {
		if (!userName || !userEmail || !userPassword) {
			console.error("Please fill in all fields");
			return;
		}

		const newUser = {
			name: userName,
			login: userEmail,
			password: userPassword,
			image: userImage,
		};
		await postUser(newUser);
	};

	const postUser = async (newUser) => {
		try {
			const response = (await axios.post(url, newUser)).data;
			const findUser = response.find((item) => item.login === newUser.login);
			localStorage.setItem("isAuth", findUser._id);

			navigate("/");
		} catch (error) {
			console.error("Error while posting user:", error);
			if (error.response) {
				console.error("Server responded with status:", error.response.status);
				console.error("Response data:", error.response.data);
			} else if (error.request) {
				console.error("No response received:", error.request);
			} else {
				console.error("Error setting up request:", error.message);
			}
		}
	};

	return (
		<div className={scss.RegistrationPage}>
			<div className="container">
				<div className={scss.card}>
					<h1>Registration</h1>
					<input
						type="text"
						value={userName}
						placeholder="Name"
						onChange={(e) => setUserName(e.target.value)}
					/>
					<input
						type="text"
						value={userEmail}
						placeholder="Email"
						onChange={(e) => setUserEmail(e.target.value)}
					/>
					<input
						type="password"
						value={userPassword}
						placeholder="Password"
						onChange={(e) => setUserPassword(e.target.value)}
					/>
					<input
						type="url"
						value={userImage}
						placeholder="Image"
						onChange={(e) => setUserImage(e.target.value)}
					/>
					<button onClick={handleAuth}>Registration</button>
				</div>
			</div>
		</div>
	);
};

export default RegistrationPage;
