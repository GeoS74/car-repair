import CommentsRow from "../CommentRow/CommentRow";
import styles from "./styles.module.css";

type Props = {
  comments: IComment[]
}

export default function CommentsList({ comments }: Props) {
  return <div className={styles.root} >
    {comments.map(comment => <CommentsRow {...comment} key={comment.id} />)}
  </div>
}