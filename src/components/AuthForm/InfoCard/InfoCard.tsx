import { useLoaderData } from "react-router-dom";

import styles from "./styles.module.css"

type Props = {
  mode: AuthInfoCardMode
}

export const InfoCard = ({ mode }: Props) => {
  const data = _getMessage(mode, useLoaderData() as number)

  return <div className={styles.root}>
    <div className="card border-secondary">
      <div className="card-header">{data.title}</div>
      <div className="card-body">
        <h4 className="card-title">{data.message}</h4>
        <p className="card-text">{data.description}</p>
      </div>
    </div>
  </div>
}

function _getMessage(mode: AuthInfoCardMode, status: number) {
  return mode === 'confirm' ? _getConfirmMessage(status) : _getRecoveryMessage(status)
}

function _getConfirmMessage( status: number){
  if (status === 200) {
    return {
      title: "Подтверждение email",
      message: "Вы успешно зарегестрировались",
      description: "Используйте свой логи и пароль, указанные при регистрации для входа"
    }
  }

  return {
    title: "Подтверждение email",
    message: "Переданный токен не действителен",
    description: "Возможно ссылка устарела или токен не верный"
  }
}

function _getRecoveryMessage( status: number){
  if (status === 200) {
    return {
      title: "Сброс пароля",
      message: "Пароль сброшен",
      description: "Новый пароль сгенерирован и выслан на Ваш email, указанный при регистрации"
    }
  }

  return {
    title: "Сброс пароля",
    message: "Ошибка сброса пароля",
    description: "Возможно ссылка устарела или токен сброса пароля не верный"
  }
}