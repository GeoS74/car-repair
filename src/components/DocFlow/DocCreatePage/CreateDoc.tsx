import { useState } from "react";

import session from "../../../libs/token.manager"
import DocSelectType from "../DocSelectType/Wrapper";
import WrapEditForm from "../EditForm/Wrapper";
import { useLocation } from "react-router-dom";

type Props = {
  tpl?: DocTemplateName
}

export default function CreateDoc({ tpl }: Props) {
  session.subscribe('CreateDoc');

  // стандартная логика создания документа
  const [typeDoc, setTypeDoc] = useState<DocType>();

  // если компонента создания заказ-наряда AddOrderButton прокидывет данные
  // использовать их для заполнения состояния
  const locState = useLocation().state;
  if(!typeDoc && locState) {
    if(locState?.directing && locState?.task){
      setTypeDoc({
        directing: locState.directing,
        task: locState?.task
      });
    }
  }



  if(typeDoc?.directing && typeDoc.task) {
    
    if(typeDoc.task.title === 'Заказ-наряд') {
      return <WrapEditForm tpl="order" typeDoc={typeDoc}/>
    }
    if(typeDoc.task.title === 'Счёт') {
      return <WrapEditForm tpl="invoice" typeDoc={typeDoc}/>
    }
    return <WrapEditForm typeDoc={typeDoc}/>
  }

  if(tpl === 'invoice') {
    return <DocSelectType tpl="invoice" setTypeDoc={setTypeDoc} typeDoc={typeDoc} />
  }
  return <DocSelectType setTypeDoc={setTypeDoc} typeDoc={typeDoc}/>
}
