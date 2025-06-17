import AccordionCheckbox from "../AccordionCheckbox/AccordionCheckbox"
import Action from "../Action/Action"

import styles from "./styles.module.css"

type Props = {
  role: ISimpleRow,
  directing: ISimpleRow,
  task: ISimpleRow,
  actions: ISimpleRow[],
  accessSettings: IRole[]
}

export default function Task({ role, directing, task, actions, accessSettings }: Props) {
  return <div
    className={styles.root}
    onMouseEnter={_showOptionalButton}
    onMouseLeave={_showOptionalButton}>

    <AccordionCheckbox
      id={(role.id + directing.id + task.id).toString()}
      name={`id_${role.id}[id_${directing.id}][id_${task.id}][]`}
      title={task.title}
      changeHandler={_directingCheckboxOn}

      checked={_isChecked(role.id, directing.id, task.id, accessSettings)}
    />

    <span onClick={_showHideList} className="text-muted" hidden={true}>показать действия</span>

    <div hidden={true} className={styles.checkboxList}>
      <p onClick={_allCheckboxOn} className="mt-2 text-muted">Выделить все</p>

      {actions.map(action => <Action
        key={role.id + directing.id + task.id + action.id}
        role={role}
        directing={directing}
        task={task}
        action={action}
        accessSettings={accessSettings}
      />)}
    </div>
  </div>
}

function _isChecked(roleId: number, directingId: number, taskId: number, accessSettings: IRole[]) {

  const checked = accessSettings.find(e => e.id === roleId)
    ?.directings.find(e => e.id === directingId)
    ?.tasks.find(e => e.id === taskId);

  return !!checked;
}

function _directingCheckboxOn(event: React.ChangeEvent<HTMLInputElement>) {
  const directingCheckbox = event.currentTarget.parentElement?.parentElement?.parentElement
    ?.querySelector('input');

  if (event.currentTarget.checked) {
    (directingCheckbox as HTMLInputElement).checked = true;
  }
}

function _showOptionalButton(event: React.MouseEvent<HTMLParagraphElement>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement;
  optionalButton.hidden = !optionalButton?.hidden;
}

function _showHideList(event: React.MouseEvent<HTMLElement, MouseEvent>) {
  const divActionsList = event.currentTarget.nextElementSibling as HTMLDivElement
  divActionsList.hidden = !divActionsList.hidden;

  event.currentTarget.innerText = divActionsList.hidden ? "показать список" : "свернуть"
}

function _allCheckboxOn(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
  event.currentTarget.parentElement?.childNodes
    .forEach(elem => {
      if (elem.nodeName === 'DIV') {
        (elem.firstChild as HTMLInputElement).checked = true;
      }
    })
}