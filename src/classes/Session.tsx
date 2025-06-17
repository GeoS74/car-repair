import serviceHost from "../libs/service.host";
import TokenManager from "./TokenManager";
import ISession from "./ISession"
import IObserverPattern from "./IObserverPattern"
import { useState } from "react";

export default class Session extends TokenManager implements ISession, IObserverPattern {
  _me: IUser | undefined
  _stateHooks: Map<string, React.Dispatch<React.SetStateAction<IUser | undefined>>> = new Map()

  constructor() {
    super();
  }

  // @Override
  setAccess(accessToken: string): void {
    if (!this.compareAccessTokens(this.getAccess(), accessToken)) {
      if (accessToken) {
        super.setAccess(accessToken);
        this.sessionStart();
        return;
      }
    }
    super.setAccess(accessToken);
  }

  start() {
    if (this.getRefresh() && !this.getAccess()) {
      this.refreshTokens()
        .then(this.sessionStart)
        .catch(() => { /* do nothing */ })
    }
    return null;
  }

  close() {
    this.setAccess("");
    this.setRefresh("");
    this.setMe(undefined);
    this.notify();
    return null;
  }

  getMe() {
    return this._me;
  }

  private async setMe(me?: IUser) {
    this._me = me;
  }

  /* сравнить jwt токены исключив сигнатуру */
  private compareAccessTokens(oldToken: string, newToken: string) {
    return oldToken.split('.').slice(0, 2).join('') === newToken.split('.').slice(0, 2).join('')
  }

  private async sessionStart() {
    return this.whoAmI()
      .then((me) => this.setMe(me))
      .then(() => this.notify());
  }

  subscribe(componentKey: string) {
    const [user, updateUser] = useState(this.getMe());
    this._stateHooks.set(componentKey, updateUser);

    user?.toString(); // it does nothing, this is antilinter
  }

  unsubscribe(componentKey: string) {
    this._stateHooks.delete(componentKey)
  }

  private notify() {
    this._stateHooks.forEach(hook => hook(this.getMe()))
  }

  private async whoAmI() {
    return Promise.all([this.getMeAccess(), this.getUser()])
      .then(res => ({ ...res[0], ...res[1] }))
  }

  private getMeAccess() {
    return fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
      headers: {
        'Authorization': `Bearer ${this.getAccess()}`
      }
    })
      .then(async res => {
        if (res.ok) {
          const me = await res.json();
          return me;
        }
      })
  }

  private getUser() {
    return fetch(`${serviceHost("informator")}/api/informator/user/`, {
      headers: {
        'Authorization': `Bearer ${this.getAccess()}`
      }
    })
      .then(async res => {
        if (res.ok) {
          const user = await res.json();
          return user;
        }
      })
  }
}