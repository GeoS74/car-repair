import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import session from "../../libs/token.manager"

import Toggle from "./Toggle/Toggle";
import Greet from "./Greet/Greet";
import styles from "./styles.module.css"
import classNames from "classnames";

function _toggleMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  event.currentTarget.classList.toggle('collapsed')
  event.currentTarget.nextElementSibling?.classList.toggle('show');
}

export default function Navigate() {
  session.subscribe('navigate')
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme

  return <div>
    <Toggle />

    <div className={styles.root}>
      <div>
        <nav className={classNames(styles.root, `navbar navbar-expand-lg navbar-${theme === 'light' ? 'primary' : 'dark'}`)}>
          <div className="container-fluid">
            <Link className={classNames("navbar-brand")} to="/docflow" ><h1>БОВИД</h1></Link>

            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation"
              onClick={_toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav me-auto">
                {/* <li className="nav-item">
                  <Link to="/" className="nav-link active">Home</Link>
                </li> */}

                {session.getMe() ?
                  <li className="nav-item">
                    <Link to="/docflow" className="nav-link">Документы</Link>
                  </li>
                  : <></>}

                {session.getMe() ? <li className="nav-item">
                  <Link to="/user" className="nav-link">Кабинет</Link>
                </li>
                  : <></>}

                {session.getMe()?.rank === 'admin' ?
                  <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" onClick={(event) => event.currentTarget.nextElementSibling?.classList.toggle("show")}>Настройки</span>
                    <div className="dropdown-menu" onClick={(event) => event.currentTarget.classList.toggle("show")}>
                      <Link to="/setting/edit/roles" className="dropdown-item">Роли</Link>
                      <Link to="/setting/edit/directings" className="dropdown-item">Подразделения</Link>
                      <Link to="/setting/edit/processes" className="dropdown-item">Объекты</Link>
                      <Link to="/setting/edit/actions" className="dropdown-item">Действия</Link>
                      <Link to="/setting/edit/status" className="dropdown-item">Статусы</Link>
                      <hr />
                      <Link to="/setting/edit/access" className="dropdown-item">Права доступа</Link>
                      <Link to="/setting/edit/bundle/role" className="dropdown-item">Привязка ролей</Link>
                    </div>
                  </li>
                  : <></>
                }

                {session.getMe()?.rank === 'admin' ?
                  <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" onClick={(event) => event.currentTarget.nextElementSibling?.classList.toggle("show")}>Автомобили</span>
                    <div className="dropdown-menu" onClick={(event) => event.currentTarget.classList.toggle("show")}>
                      <Link to="/cars" className="dropdown-item">Список автомобилей</Link>
                      <Link to="/cars/upload/excel" className="dropdown-item">Загрузка списка</Link>
                    </div>
                  </li>
                  : <></>
                }

                {session.getMe()?.rank === 'admin' ?
                  <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" onClick={(event) => event.currentTarget.nextElementSibling?.classList.toggle("show")}>Пользователи</span>
                    <div className="dropdown-menu" onClick={(event) => event.currentTarget.classList.toggle("show")}>
                      <Link to="/users/management" className="dropdown-item">Пользователи системы</Link>
                      <Link to="/users/setting/company" className="dropdown-item">Список компаний</Link>
                    </div>
                  </li>
                  : <></>
                }

              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Greet />
    </div>
  </div>
}