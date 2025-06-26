import EditFormDefault from "./EditFormDefault";
import EditFormInvoice from "./EditFormInvoice";
import DocSelectCarForOrder from "../DocSelectCarForOrder/DocSelectCarForOrder";

type Props = {
  typeDoc: DocType
  doc?: IDoc
  tpl?: DocTemplateName
}

export default function WrapEditForm({ typeDoc, doc, tpl }: Props) {
  if(tpl === 'order') {
    // перед тем как рендерить форму, надо выбрать авто из списка
    return <DocSelectCarForOrder typeDoc={typeDoc} doc={doc} />
  }

  if(tpl === 'invoice') {
    return <EditFormInvoice typeDoc={typeDoc} doc={doc} />
  }

  return <EditFormDefault typeDoc={typeDoc} doc={doc} />
}
