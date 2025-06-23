import { Converter } from "md-conv";
import { date } from "../../../../libs/formatterDateAndTime";
import styles from "./styles.module.css";
import classNames from "classnames";
import CommentAvatar from "../CommentAvatar/CommentAvatar";

const converter = new Converter();

export default function CommentsRow({ author, comment, createdAt }: IComment) {
  return <div className={classNames(styles.root, "mb-3")} >

    <div>
      <small>{date(createdAt)}</small>
      <CommentAvatar userPhoto={author.photo} />
      <p>{author.name}</p>
    </div>

    <div className="mt-4"
      dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(comment) }}
    ></div>

  </div>
}