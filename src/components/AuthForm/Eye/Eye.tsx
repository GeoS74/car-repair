import styles from "./styles.module.css";
import openEye from "./image/openeye.svg"
import closeEye from "./image/closeeye.svg"

type Props = {
  setVisiblePassword: React.Dispatch<React.SetStateAction<boolean>>,
  visiblePassword: boolean
}

export const Eye = ({ visiblePassword, setVisiblePassword }: Props) => {
  return <span className={styles.root} onClick={() => setVisiblePassword(!visiblePassword)}>

    {visiblePassword ? <img src={openEye} loading="lazy" /> : <img src={closeEye} loading="lazy" />}
  </span>
};
