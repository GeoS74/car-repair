import { Converter } from "md-conv";
import styles from "./styles.module.css";
import classNames from "classnames";

const converter = new Converter();

export default function CommentsRow({ author, comment, createdAt }: IComment){
  return <div className={classNames(styles.root, "mb-3")} >
    <p>{createdAt}</p>
    <p>{author.name}</p>
    
    <div className="mt-4"
        dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(comment) }}
      ></div>

    </div>
}