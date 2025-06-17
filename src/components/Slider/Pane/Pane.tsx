import Slide from "../Slide/Slide"

import styles from "./styles.module.css"

type Props = {
  slides: ISlider[]
  active: number
  width: number
  countVisibleSlides: number
}

export default function Pane({slides, active, width, countVisibleSlides}: Props) {
  return <div className={styles.root} >

  <div className={styles.slidesWrapper} style={{ left: `${active * -width/countVisibleSlides}px` }}>
    {slides.map((e, i) => (
      <Slide
        key={i}
        image={e.files[0]?.fileName}
        message={e.message}
        width={width/countVisibleSlides}
      />
    ))}
  </div>

</div>
}