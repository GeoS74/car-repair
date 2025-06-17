import styles from "../styles.module.css"

type Props = {
  signatory: IDocSignatory[]
  setSignatory: (value: React.SetStateAction<IDocSignatory[]>) => void
  signSearchList: IDocSignatory[]
  setSignSearchList: (value: React.SetStateAction<IDocSignatory[]>) => void
}

export default function SignatoryDataList({ signatory, setSignatory, signSearchList, setSignSearchList }: Props) {
  return <div className={styles.dataList}>
    {signSearchList?.map(s => <div
      key={s.uid}
      onClick={() => { // ninja code :)
        if (!signatory.find(e => e.uid === s.uid)) {
          setSignatory([...signatory, s])
        }
        setSignSearchList(signSearchList.filter(e => e.uid !== s.uid))
      }}
    >{`${s.position} ${s.name}`}
    </div>)}
  </div>
}