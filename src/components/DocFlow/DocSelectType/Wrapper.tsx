import SelectTypeDefault from "./SelectTypeDefault";
import SelectTypeDirectingForInvoice from "./SelectTypeDirectingForInvoice";

type Props = {
  setTypeDoc: React.Dispatch<React.SetStateAction<DocType | undefined>>
  typeDoc: DocType | undefined
  tpl?: DocTemplateName
}

export default function WrapSelectDoc({ tpl, setTypeDoc, typeDoc }: Props) {
  if(tpl === 'invoice') {
    return <SelectTypeDirectingForInvoice setTypeDoc={setTypeDoc} />
  }

  return <SelectTypeDefault setTypeDoc={setTypeDoc} typeDoc={typeDoc} />
}