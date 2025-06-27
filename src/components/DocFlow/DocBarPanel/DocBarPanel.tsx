/**
 * представление документов в виде плитки
 */
import { useState } from "react";
import DocBar from "./DocBar/DocBar";
import session from "../../../libs/token.manager";
// import finder from "../../../libs/deep.finder";
// import { ReactComponent as IconFoo } from "./icons/foo.svg";
// import { ReactComponent as IconFilter } from "./icons/filter-square.svg";
import { ReactComponent as IconFire } from "./icons/fire.svg";
import { ReactComponent as IconFolder } from "./icons/folder.svg";
import { ReactComponent as IconTools } from "./icons/tools.svg";
import { ReactComponent as IconHandUp } from "./icons/hand-thumbs-up.svg";
// import AddDocButton from "./AddDocButton/AddDocButton";
import AddOrderButton from "./AddOrderButton/AddOrderButton";
// import DepAddInvoice from "./DepAddInvoice/DepAddInvoice";
// import DepInvocesForDirector from "./DepInvocesForDirector/DepInvocesForDirector";
import styles from "./styles.module.css";

// эта компонента DocBarPanel в роутере помечена как 'index: true'
// это означает, что она будет отрисовываться по умолчанию.
// Компоненты кнопок 'AddDocButton' и 'AddOrderButton' для перехода на новые маршруты используют useNavigate. 
// React Router не прерывает рендер при использовании navigate(...),
// это приводит к тому, что DocBarPanel начинает рендериться, пока отрабатывает асинхронный navigate.
// Для React навигация является ассинхронной операцией. 
// А т.к. компоненты DocBar обращаются к беку, то возникают лишние запросы во время навигации. 
// Чтобы изменить такое поведение, введён useState 'setIsNavigating', он прокидывается в компоненты кнопок. 
// При клике по кнопку стейт меняется на true. Само состояние прокидывается в DocBar компоненты и
// если стейт равен true, то вызовы к серверу просто блокируются. 
// Это нормальное поведение React Router, не баг, а фича.
export default function DocBarPanel() {
  session.subscribe('DocBarPanel');

  const [isNavigating, setIsNavigating] = useState(false);

  return <div>

    {/* {// стандартная кнопка
      finder(session.getMe()?.roles, 'Создать') ?
        <AddDocButton setIsNavigating={setIsNavigating} />
        : <></>
    } */}

    <AddOrderButton setIsNavigating={setIsNavigating} />

    <div className={styles.root}>

      <DocBar
        title="Новые заявки"
        Icon={IconFire}
        queryString="?statusCode=10&limit=50"
        isNavigating={isNavigating}
      />

      <DocBar
        title="В работе"
        Icon={IconTools}
        queryString="?statusCode=20&limit=50"
        isNavigating={isNavigating}
      />

      <DocBar
        title="Ремонт завершен"
        Icon={IconHandUp}
        queryString="?statusCode=50&limit=50"
        isNavigating={isNavigating}
      />

      <DocBar
        title="Список заказ-нарядов"
        Icon={IconFolder}
        queryString="?limit=50"
        isNavigating={isNavigating}
      />

      {/* <DepInvocesForDirector /> */}

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

      {/* <DepAddInvoice /> */}
    </div>
  </div>
}
