import Navigate from "../navigate/Navigate"
import { useLoaderData } from "react-router-dom";
// import logo from "../navigate/image/logo.svg"
import Slider from "../Slider/Slider"
import SearchForm from "./SearchForm/SearchForm"
import Text from "./Text/Text"
import Footer from "../Footer/Footer"
import styles from "./styles.module.css"

export default function Main() {
  const [slides, about] = useLoaderData() as [ISlider[], IAbout];
  return <>
    <Navigate />
    <div className={styles.root} style={{ minHeight: `${window.innerHeight - 200}px` }}>
      <h1>автозапчасти</h1>
      <hr />

      <SearchForm />

      <Slider 
        slides={slides}
        width={Math.floor(window.innerWidth * 0.8)} 
      />

      <Text about={about}/>

      {/* <img src={logo} loading="lazy" />
            <h3>Поиск позиций</h3> */}
    </div>
    <Footer />
  </>
}