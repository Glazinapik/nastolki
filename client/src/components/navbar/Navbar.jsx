import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    
    const user = useSelector((state) => state.user);

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="nav">
                        <img className="logo" src="/img/cub.png" alt="" />
                        <Link className="navbar-brand" to="/"><span className="title">NASTOLKI</span></Link>
                        <ul className="menu">
                            {user && user !== 'noUser' ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/games"
                                            className="nav-link"
                                        >
                                            Игры
                                        </NavLink>
                                    </li>
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

                                            to={`user/${user.id}`}
                                            className="nav-link"
                                        >
                                            Мой профиль
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to={`/mymeetings/${user.id}`}
                                            className="nav-link"
                                        >
                                            Мои встречи
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
            </header>
        </>
    );
}

export default Navbar;
