import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

import tokenManager from "../../../libs/token.manager";
import serviceHost from "../../../libs/service.host";
import fetchWrapper from "../../../libs/fetch.wrapper";
import { responseNotIsArray } from "../../../middleware/response.validator"
import styles from "./styles.module.css"
import classNames from "classnames";
import Accordion from "../Accordion/Accordion";
import Popup from "../../Popup/Popup";

export default function AccessSetting() {
  const [disabled, setDisabled] = useState(false);
  const [modePopup, setModePopup] = useState<PopupMode>();
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  /*
  * первый элемент массива исходных данных - роли
  * второй - направления
  * третий - задачи / процессы
  * четвёртый - действия
  * пятый - настройки прав доступа в виде объекта
  */
  const [roles, directings, tasks, actions, accessSettings] = useLoaderData() as IRole[][];

  return <div className={styles.root}>
    <h3>Настройки прав доступа</h3>

    <form
      onSubmit={event => _updateAccessSetting(event, setDisabled, setModePopup)}
      className={classNames(styles.content, "mt-4")}>

      <fieldset disabled={disabled}>
            <input
              type="submit"
              className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)}
              value="Сохранить настройки"
            />

        <Accordion roles={roles} directings={directings} tasks={tasks} actions={actions} accessSettings={accessSettings} />

      </fieldset>
    </form>

    {modePopup ? <Popup mode={modePopup} message={modePopup === "success" ? "Настройки успешно записаны" : "Настройки не записаны! Попробуйте ещё раз"} /> : <></>}
  </div>
}

function _updateAccessSetting(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setModePopup: React.Dispatch<React.SetStateAction<PopupMode>>
) {

  event.preventDefault();
  setDisabled(true);
  setModePopup(undefined);

  const fd = new FormData(event.currentTarget)

  fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/setting/access`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async (response) => {
      if (response.ok) {
        setModePopup("success")
        return;
      }

      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => {
      console.log(error.message)
      setModePopup("danger")
    })
    .finally(() => setDisabled(false));
}