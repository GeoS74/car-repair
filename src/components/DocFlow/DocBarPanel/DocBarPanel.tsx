/**
 * представление документов в виде плитки
 */
import DocBar from "./DocBar/DocBar";
import session from "../../../libs/token.manager";
import finder from "../../../libs/deep.finder";
// import { ReactComponent as IconFoo } from "./icons/foo.svg";
// import { ReactComponent as IconFilter } from "./icons/filter-square.svg";
import { ReactComponent as IconFire } from "./icons/fire.svg";
import { ReactComponent as IconFolder } from "./icons/folder.svg";
import { ReactComponent as IconTools } from "./icons/tools.svg";
import { ReactComponent as IconHandUp } from "./icons/hand-thumbs-up.svg";
import AddDocButton from "./AddDocButton/AddDocButton";
import AddOrderButton from "./AddOrderButton/AddOrderButton";
import DepAddInvoice from "./DepAddInvoice/DepAddInvoice";
import DepInvocesForDirector from "./DepInvocesForDirector/DepInvocesForDirector";
import styles from "./styles.module.css";

export default function DocBarPanel() {
  session.subscribe('DocBarPanel');

  // console.log(session.getMe())

  return <div>

    {// стандартная кнопка
    finder(session.getMe()?.roles, 'Создать') ?
      <AddDocButton />
      : <></>
    }

    <AddOrderButton />

    <div className={styles.root}>

      <DepInvocesForDirector />

      <DocBar
        title="Новые заявки"
        Icon={IconFire}
        queryString="?statusCode=10&limit=50"
      />

      <DocBar
        title="В работе"
        Icon={IconTools}
        queryString="?statusCode=20&limit=50"
      />

      <DocBar
        title="Ремонт завершен"
        Icon={IconHandUp}
        queryString="?statusCode=50&limit=50"
      />

      {/* <DocBar
        title="На утверждение"
        Icon={IconFire}
        queryString="?acceptor=0&limit=50"
      />

      <DocBar
        title="На рассмотрение"
        Icon={IconFoo}
        queryString="?recipient=0&limit=50"
      />

      <DocBar
        title="Исходящие"
        Icon={IconFilter}
        queryString="?author=1&limit=50"
      /> */}

      <DocBar
        title="Список заказ-нарядов"
        Icon={IconFolder}
        queryString="?limit=50"
      />

      <DepAddInvoice />
    </div>
  </div>
}
