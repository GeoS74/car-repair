import { useState } from "react";

import session from "../../../libs/token.manager"
import DocSelectType from "../DocSelectType/Wrapper";
import EditForm from "../EditForm/Wrapper";

type Props = {
  tpl?: DocTemplateName
}

export default function CreateDoc({ tpl }: Props) {
  session.subscribe('CreateInvoice');

  const [typeDoc, setTypeDoc] = useState<DocType>();

  if(typeDoc?.directing && typeDoc.task) {
    
    if(typeDoc.task.title === 'Счёт') {
      return <EditForm tpl="invoice" typeDoc={typeDoc}/>
    }
    return <EditForm typeDoc={typeDoc}/>
  }

  if(tpl === 'invoice') {
    return <DocSelectType tpl="invoice" setTypeDoc={setTypeDoc} typeDoc={typeDoc} />
  }
  return <DocSelectType setTypeDoc={setTypeDoc} typeDoc={typeDoc}/>
}
