import styles from "./styles.module.css"

type Props = {
  countVisibleSlides: number
  countPaginations: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  countSlides: number
  active: number
}

export default function Pagination({
  countVisibleSlides,
  countPaginations,
  setActive,
  active,
  countSlides,
}: Props) {
  return <div className={styles.root}>
    {new Array(countPaginations)
      .fill(null)
      .map((_, i) => {
        return <input key={i}
          className="form-check-input"
          type="radio"

          checked={_isChecked(i, countVisibleSlides, countPaginations, countSlides, active)}

          onChange={() => {
            const active = (i + 1) * countVisibleSlides > countSlides ?
              countSlides - countVisibleSlides :
              i * countVisibleSlides;

            setActive(active)
          }}
        />
      })}
  </div>
}

function _isChecked(
  index: number,
  countVisibleSlides: number,
  countPaginations: number,
  countSlides: number,
  active: number,
) {
  // если выполняется это условие, то достигнут предел прокрутки
  if (active === countSlides - countVisibleSlides) {
    return index + 1 === countPaginations
  }

  return active >= index * countVisibleSlides && active < (index + 1) * countVisibleSlides
}