import AccordionCheckbox from "../AccordionCheckbox/AccordionCheckbox"

import styles from "./styles.module.css"

type Props = {
  role: ISimpleRow,
  directing: ISimpleRow,
  task: ISimpleRow,
  action: ISimpleRow,
  accessSettings: IRole[]
}

export default function Action({ role, directing, task, action, accessSettings }: Props) {
  return <div className={styles.root}>

    <AccordionCheckbox
      id={(role.id + directing.id + task.id + action.id).toString()}
      name={`id_${role.id}[id_${directing.id}][id_${task.id}][id_${action.id}]`}
      title={action.title}

      checked={_isChecked(role.id, directing.id, task.id, action.id, accessSettings)}
    />
  </div>
}

function _isChecked(
  roleId: number, 
  directingId: number, 
  taskId: number, 
  actionId: number,
  accessSettings: IRole[]) {

  const checked = accessSettings.find(e => e.id === roleId)
    ?.directings.find(e => e.id === directingId)
    ?.tasks.find(e => e.id === taskId)
    ?.actions.find(e => e.id === actionId);

  return !!checked;
}