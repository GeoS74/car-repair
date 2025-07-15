import CommentsRow from "../CommentRow/CommentRow";
import styles from "./styles.module.css";

type Props = {
  comments: IComment[]
  linkedFiles: IStaticFile[]
}

export default function CommentsList({ comments, linkedFiles }: Props) {
  return <div className={styles.root} >
    {comments.map(comment => <CommentsRow key={comment.id} {...comment} linkedFiles={linkedFiles} />)}
  </div>
}