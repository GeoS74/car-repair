import { useSelector } from "react-redux";
import { StoreState } from "../../../../store/index";
import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  statusCode?: number
}

export default function Status({ statusCode }: Props) {
  const statuses = useSelector((state: StoreState) => state.status.items);

  if(!statusCode) return <></>;

  return <div className={classNames(styles.root, "mt-4")}>{statuses.map(s => {
    return <span className={`badge ${s.code <= statusCode ? 'bg-success' : 'bg-light'}`} key={s.code}>{s.title}</span>
  })}</div>
}