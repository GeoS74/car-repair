import classNames from "classnames";
import styles from "./styles.module.css";
import EditFormComments from "../EditForm/EditFormComments";

type Props = {
  docId: string
 }

export default function Comments({ docId }: Props){
  return <div className={classNames(styles.root, "mt-4")}>
      <EditFormComments docId={docId} />
    </div>
}