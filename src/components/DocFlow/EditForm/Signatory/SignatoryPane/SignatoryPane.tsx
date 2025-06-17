import styles from "./styles.module.css"

type Props = {
  signatory: IDocSignatory[]
  signatoryMode: SignatoryMode
}

export default function SignatoryPane({ signatory, signatoryMode }: Props) {
  return <ul className={styles.root}>
    {signatory.map(s => (
      <li
        key={s.uid}
        onMouseEnter={_showOptionalButton}
        onMouseLeave={_showOptionalButton}
      >{`${s.position} ${s.name}`}

        <span hidden
          onClick={(event) => {
            if (!confirm('Удалить?')) {
              return;
            }
            // достаточно удалить элемент li, имеющий скрытое поле hidden
            // это обновит данные о подписантах при запросе на редактирование к бэку
            event.currentTarget.parentElement?.remove();
          }}
        ><small>удалить</small></span>

        <input type="hidden" name={`${signatoryMode}[${s.uid}]`} defaultValue={s.accept ? "on" : ""} />
      </li>
    ))}
  </ul>
}

function _showOptionalButton(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement | undefined;
  if (optionalButton) {
    optionalButton.hidden = !optionalButton.hidden;
  }
}