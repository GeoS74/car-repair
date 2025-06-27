import { useLoaderData } from "react-router-dom";

import session from "../../../libs/token.manager"
import DocPageDefault from "./DocPageDefault";
import DocPageInvoice from "./DocPageInvoice";
import DocPageOrder from "./DocPageOrder";

export default function DocPage() {
  session.subscribe('DocPage');

  const [doc, comments] = useLoaderData() as [IDoc, IComment[]];

  console.log(doc);

  if(doc.task.title === 'Заказ-наряд') {
    return <DocPageOrder docLoad={doc} commentsLoad={comments} />
  }

  if(doc.task.title === 'Счёт') {
    return <DocPageInvoice {...doc} />
  }
  
  return <DocPageDefault {...doc} />
}