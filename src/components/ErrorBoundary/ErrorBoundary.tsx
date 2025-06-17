import { Link } from "react-router-dom"
import Navigate from "../navigate/Navigate"
import Footer from "../Footer/Footer"
import styles from "./styles.module.css"

export default function ErrorBoundary() {
  return <>
    <Navigate />
    <div className={styles.root} style={{ minHeight: `${window.innerHeight - 200}px` }}>
      <h1>404 Страница не существует</h1>
      <hr />
      <p>Вы запросили страницу, которой не существует.</p>
      <Link to="/">Перейти на главную</Link>
    </div>
    <Footer />
  </>
}