import DocRowDefault from "./DocRowDefault";
import DocPageInvoice from "./DocRowInvoice";
import DocRowOrder from "./DocRowOrder";

export default function DocRow({ ...doc }: IDoc) {

  if(doc.task.title.toLowerCase() === 'Заказ-наряд'.toLowerCase()) {
    return <DocRowOrder {...doc} />
  }

  if(doc.task.title === 'Счёт') {
    return <DocPageInvoice {...doc} />
  }
  
  return <DocRowDefault {...doc} />
}