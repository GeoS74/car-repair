import Directing from "../Directing/Directing"

import styles from "./styles.module.css"
import classNames from "classnames"

type Props = {
  role: ISimpleRow,
  directings: ISimpleRow[],
  tasks: ISimpleRow[],
  actions: ISimpleRow[],
  accessSettings: IRole[]
}

export default function Role({ role, directings, tasks, actions, accessSettings }: Props) {
  return <div className={classNames("accordion-item", styles.root)} key={role.id}>
    
    <h2 className="accordion-header" onClick={(event) => collapser(event)}>
      <span className="accordion-button collapsed">
        {role.title}
      </span>
    </h2>

    <div className="accordion-collapse collapse">
      <div className="accordion-body">

        {directings.map(directing => <Directing
          key={role.id + directing.id}
          role={role}
          directing={directing}
          tasks={tasks}
          actions={actions}
          accessSettings={accessSettings}
        />)}
      </div>
    </div>
  </div>
}

function collapser(event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) {
  event.currentTarget.firstElementChild?.classList.toggle("collapsed")
  event.currentTarget.nextElementSibling?.classList.toggle("collapse")
}