import styles from "./styles.module.css"
import classNames from "classnames"

type Props = {
  id: string,
  name: string,
  title: string,
  checked: boolean,
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
}


export default function AccordionCheckbox({ id, name, title, checked, changeHandler }: Props) {
  return <>
    <input type="checkbox" 
      name={name}
      defaultChecked={checked}
      id={id}
      className="form-check-input" 
      onChange={changeHandler}
      />

    <label className={classNames("form-check-label", styles.label)} htmlFor={id}>
      {title}
    </label>
  </>
}
