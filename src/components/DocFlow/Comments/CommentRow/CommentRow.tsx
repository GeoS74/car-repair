import { Converter } from "md-conv";
import { date } from "../../../../libs/formatterDateAndTime";

import CommentAvatar from "../CommentAvatar/CommentAvatar";
import CommentRowFilesList from "./CommentRowFilesList/CommentRowFilesList";
import styles from "./styles.module.css";
import classNames from "classnames";

const converter = new Converter();
type Props = IComment & {
  linkedFiles: IStaticFile[]
}

export default function CommentsRow({ author, comment, createdAt, files, linkedFiles }: Props) {
  return <div className={classNames(styles.root, "mb-3")} >

    <div>
      <small>{date(createdAt)}</small>
      <CommentAvatar userPhoto={author.photo} />
      <p>{author.name}</p>
      <p>{author.position}</p>
    </div>

    <div>
      <div className="mt-4"
        dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(comment) }}
      >
      </div>

      <CommentRowFilesList files={files} linkedFiles={linkedFiles} />
    </div>

  </div>
}