import { useState } from "react";
import SignatoryPane from "./SignatoryPane/SignatoryPane"
import SignatorySearchInput from "./SignatorySearchInput/SignatorySearchInput";
import SignatoryDataList from "./SignatoryDataList/SignatoryDataList";

import classNames from "classnames";
import styles from "./styles.module.css"

type Props = {
  typeDoc: DocType
  signatoryMode: SignatoryMode
  signUnits?: IDocSignatory[]
  title?: string
}

export default function SignatoryList({ typeDoc, signUnits, title, signatoryMode }: Props) {
  const [signSearchList, setSignSearchList] = useState<IDocSignatory[]>([]);
  const [signatory, setSignatory] = useState(signUnits || []);

  return <div className={classNames(styles.root, "mt-4")}>

    <h4>{title || ""}</h4>
    
    <SignatoryPane 
      signatory={signatory}
      signatoryMode={signatoryMode}
    />

    <SignatorySearchInput 
      setSignSearchList={setSignSearchList} 
      typeDoc={typeDoc}
      signatoryMode={signatoryMode}
    />

    <SignatoryDataList 
      signatory={signatory}
      setSignatory={setSignatory}
      signSearchList={signSearchList}
      setSignSearchList={setSignSearchList}
    />
  </div>
}
