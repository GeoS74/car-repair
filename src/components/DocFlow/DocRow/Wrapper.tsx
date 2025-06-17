import DocRowDefault from "./DocRowDefault";
import DocPageInvoice from "./DocRowInvoice";

export default function DocRow({ ...doc }: IDoc) {

  if(doc.task.title === 'Счёт') {
    return <DocPageInvoice {...doc} />
  }
  
  return <DocRowDefault {...doc} />
}