import { Injectable } from '@angular/core';
import { LOCALSTORAGE_PROVIDER, MD5_PROVIDER } from '@subular3/shared';
export const SERVER_INFO_KEY = 'subular.cached.serverInfo';
export interface IServerInfo {
  server: string;
  username: string;
  password: string;
  salt: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubsonicAuthenticationService {
  constructor(
    private localStorage: LOCALSTORAGE_PROVIDER,
    private cryptoJs: MD5_PROVIDER
  ) {}

  saveAuthenticationInfo(server: string, username: string, password: string) {
    const salt = this.makeSalt();
    const saltedPassword = this.cryptoJs.MD5(password + salt).toString();
    if (server && !server.toLowerCase().startsWith('http://')) {
      server = `http://${server}`;
    }
    this.localStorage.setValue(SERVER_INFO_KEY, <IServerInfo>{
      server,
      username,
      password: saltedPassword,
      salt
    });
  }

  getServerURl(method: string) {
    const serverInfo = this.getExistingInfoFromCache();
    if (serverInfo) {
      return (
        serverInfo.server +
        '/rest/' +
        method +
        '.view?u=' +
        serverInfo.username +
        '&t=' +
        serverInfo.password +
        '&s=' +
        serverInfo.salt +
        '&v=1.0.0&c=rest&f=json'
      );
    }
    return '';
  }

  hasAuthenticationInfo() {
    return !!this.localStorage.getValue(SERVER_INFO_KEY);
  }

  getHLSURl(id: number) {
    const serverInfo = this.getExistingInfoFromCache();
    if (serverInfo) {
      return (
        serverInfo.server +
        '/rest/hls.m3u8?u=' +
        serverInfo.username +
        '&t=' +
        serverInfo.password +
        '&s=' +
        serverInfo.salt +
        '&v=1.0.0&c=rest&f=json&id=' +
        id
      );
    }
    return '';
  }

  private makeSalt(): string {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 99; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  private getExistingInfoFromCache(): IServerInfo {
    const existingInfo = this.localStorage.getValue(
      SERVER_INFO_KEY
    ) as IServerInfo;
    return existingInfo;
  }
}
