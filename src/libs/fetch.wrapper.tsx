/**
 * fetchWrapper - функция-обёртка над fetch запросом к БД
 * используется в случае, когда требуется контроль доступа с сервисам бэка
 * и бэк может вернуть статус 401 (не авторизован)
 * 
 * Логика:
 * 1) выполнить запрос
 * 2) если статус 401 выбросить исключение иначе вернуть результат
 * 3) проверить что выброшена ошибка с текстом "401"
 * 4) обновить токены
 * 5) если токены обновились, попытаться снова выполнить запрос
 * 6) если статус 401 выбросить исключение иначе вернуть результат
 * 7) если не одно условие не сработало вернуть отклоненный промис
 */

/* BUG detected

  1) About -> EditForm
  2) Catalog -> UploadPriceForm

  1) Setting -> AccessSetting
  2) SimpleList -> EditForm
  3) SimpleList -> SearchForm
  4) User -> Accordion
  5) User -> Avatar


  если access токен будет просрочен, то после refresh-a фото не будет изменено при таком вызове
    fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${tokenManager.getAccess()}`
      },
      body: new FormData(event.currentTarget)
    }))

  для исправления надо FormData записывать в константу перед вызовом fetchWrapper
  PS возможно это как-то связано с тем, что используется событие onChange, а не onSubmit
  */
 
import tokenManager from "./token.manager"

interface IFetchWrapper {
  (): Promise<Response>
}

export default async function fetchWrapper(func: IFetchWrapper | IFetchWrapper[]) {
  try {

    if (Array.isArray(func)) {
      return await Promise.all(func.map(f => _thenable(f)))
    }
    return await _thenable(func)

  } catch (error: unknown) {

    if (error instanceof Error && error.message === "401") {
      try {
        if (await tokenManager.refreshTokens()) {

          if (Array.isArray(func)) {
            return await Promise.all(func.map(f => _thenable(f)))
          }
          return await _thenable(func)
        }
      }
      catch (e) { /**/ }
    }
  }
  return Promise.reject(new Error('error: fetch.wrapper'))
}

function _thenable(func: IFetchWrapper) {
  return func()
    .then(response => {
      if (response.status === 401) {
        throw new Error("401");
      }
      return response;
    })
}