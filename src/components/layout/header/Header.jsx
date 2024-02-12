import scss from "./Header.module.scss";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;
const links = [
	{
		name: "Home",
		href: "/",
	},
];

const Header = () => {
	const [userProfile, setUserProfile] = useState({});
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const getRequest = async () => {
		try {
			const response = await (await axios.get(url)).data;

			const findUser = response.find(
				(item) => item._id === +localStorage.getItem("isAuth")
			);

			if (findUser) {
				setUserProfile(findUser);
			} else {
				localStorage.removeItem("isAuth");
				setUserProfile({});
			}
		} catch {
			console.log("error");
		}
	};

	const handleLogOut = () => {
		localStorage.removeItem("isAuth");
		navigate("/login");
	};

	useEffect(() => {
		getRequest();
	}, [pathname]);

	return (
		<header className={scss.Header}>
			<div className={scss.content}>
				<nav>
					<ul>
						{links.map((item, index) => (
							<li key={index}>
								<Link to={item.href}>{item.name}</Link>
							</li>
						))}
					</ul>
				</nav>

				<div>
					{userProfile.login ? (
						<>
							<div className={scss.card}>
								<h3>{userProfile.name}</h3>
								<p>{userProfile.login}</p>
								<button onClick={handleLogOut}>LogOut</button>
								<img
									style={{
										width: 50,
									}}
									src={userProfile.image}
									alt="avatar"
								/>
							</div>
						</>
					) : (
						<div className={scss.links}>
							<button>
								<Link to="/login">Log in</Link>
							</button>
							<button>
								<Link to="/registration">Registration</Link>
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
