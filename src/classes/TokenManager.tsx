import serviceHost from "../libs/service.host"
import ITokenManager from "./ITokenManager"

export default class TokenManager implements ITokenManager {

  _refresh = ""
  _access = ""
  _subscribe: Map<string, (value: boolean) => void> = new Map()

  constructor() {
    this.setRefresh(localStorage.getItem(`session_id`) || "")

    // don`t call async function this.refreshTokens() in constructor!!!
  }

  getRefresh(): string {
    return this._refresh || ""
  }
  getAccess(): string {
    return this._access || ""
  }
  setRefresh(refreshToken: string): void {
    localStorage.setItem(`session_id`, refreshToken)
    this._refresh = refreshToken
  }
  setAccess(accessToken: string): void {
    this._access = accessToken
  }
  async refreshTokens(): Promise<boolean> {
    if (!this._refresh) {
      return false
    }

    /**
     * если токен рефрешиться, то отправляем запрос в массив подписчиков
     * иначе выполняем fetch запрос
     * при этом чтобы создать первого подписчика - записываем в this._subscribe
     * простую функцию, которая возвращает полученный аргумент с типом boolean
     */
    if(this._subscribe.size > 0) {
      return new Promise(res => {
        this._subscribe.set(Date.now().toString(), b => res(b))
      })
    }
    else {
      this._subscribe.set(Date.now().toString(), b => b)
    }

    return fetch(`${serviceHost("mauth")}/api/mauth/refresh`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${this._refresh}`
      }
    }).then(async (req) => {
      if (req.ok) {
        const res = await req.json();

        this.setAccess(res.access);
        this.setRefresh(res.refresh);
        return true;
      }

      throw new Error(`response status: ${req.status}`)
    })
      .catch(() => {
        this.setAccess("");
        this.setRefresh("");
        return false
      })
      .finally(() => {
        this._subscribe.forEach(res => res(true));
        this._subscribe = new Map();
      })
  }
}