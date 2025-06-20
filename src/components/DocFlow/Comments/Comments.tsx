import classNames from "classnames";
import styles from "./styles.module.css";
import EditFormComments from "../EditForm/EditFormComments";
import CommentsList from "./CommentsList/CommentsList";

type Props = {
  docId: string,
  comments: IComment[],
  addComment: (comment: IComment) => void
 }

export default function Comments({ docId, comments, addComment }: Props){
  return <div className={classNames(styles.root, "mt-4")}>
      <EditFormComments docId={docId} addComment={addComment} />

      <CommentsList comments={comments} />
    </div>
}