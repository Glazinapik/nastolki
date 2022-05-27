import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    const user = useSelector((state) => state.user);

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <div className="container-fluid d-flex">
                    <Link className="navbar-brand" to="/">
                        N a s t o l k i . r u
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/meetings"
                                            className="nav-link"
                                        >
                                            Все вcтречи
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/addmeeting"
                                            className="nav-link"
                                        >
                                            Добавить встречу
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/user/signout"
                                            className="nav-link"
                                        >
                                            Выйти
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/user/signup"
                                            className="nav-link"
                                        >
                                            Зарегистрироваться
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/user/signin"
                                            className="nav-link"
                                        >
                                            Войти
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;