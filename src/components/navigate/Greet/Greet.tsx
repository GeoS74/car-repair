import { Link } from "react-router-dom";

import session from "../../../libs/token.manager"
import styles from "./styles.module.css"

export default function Greet() {
  session.subscribe('greet')

  return <div className={styles.root}>
    {session.getMe() ? <>

      <Link to="/user" className="nav-link">{session.getMe()?.email}</Link>

      <Link to="/auth/signout" className="nav-link">Sign out</Link>
    </>
      : <Link to="/auth" className="nav-link">Sign in</Link>}
  </div>
}