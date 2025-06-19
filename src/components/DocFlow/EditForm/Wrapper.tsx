import EditFormDefault from "./EditFormDefault";
import EditFormInvoice from "./EditFormInvoice";
import EditFormOrfer from "./EditFormOrder";

type Props = {
  typeDoc: DocType
  doc?: IDoc
  tpl?: DocTemplateName
}

export default function WrapEditForm({ typeDoc, doc, tpl }: Props) {
  if(tpl === 'order') {
    return <EditFormOrfer typeDoc={typeDoc} doc={doc} />
  }

  if(tpl === 'invoice') {
    return <EditFormInvoice typeDoc={typeDoc} doc={doc} />
  }

  return <EditFormDefault typeDoc={typeDoc} doc={doc} />
}
