import classNames from "classnames";
import styles from "./styles.module.css";
import EditFormComments from "../EditForm/EditFormComments";
import CommentsList from "./CommentsList/CommentsList";

type Props = {
  docId: string,
  comments: IComment[],
  addComment: (comment: IComment) => void
  setFiles: (files: IStaticFile[]) => void
  linkedFiles: IStaticFile[]
 }

export default function Comments({ docId, comments, addComment, setFiles, linkedFiles }: Props){
  return <div className={classNames(styles.root, "mt-4")}>
      <EditFormComments docId={docId} addComment={addComment} setFiles={setFiles} />

      <CommentsList comments={comments} linkedFiles={linkedFiles} />
    </div>
}