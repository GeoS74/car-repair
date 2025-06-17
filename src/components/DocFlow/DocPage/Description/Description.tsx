import { Converter } from "md-conv";
import { Link } from "react-router-dom";

const converter = new Converter()

type Props = {
  description: string
  id: string
  limit?: number
}

export default function Description({ description, id, limit }: Props) {
  if (!description) {
    return <></>
  }

  return <>
      <div className="mt-4"
        dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(_cut(description, limit)) }}
      ></div>
      {(limit && description.length > 350) ? <Link to={`/docflow/${id}`} className="nav-link">Читать полностью</Link> : <></>}
    </>
}

function _cut(text: string, limit?: number) {
  return (limit && text.length > limit) ? text.substring(0, text.indexOf(".", limit) + 1) : text;
}