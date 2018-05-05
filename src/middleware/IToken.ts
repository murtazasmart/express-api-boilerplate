import { injectable } from "inversify";

@injectable()
export class IToken {
  public company: string;
  public username: string;
  public userID: string;
  public locale: string;
  public permissions: any;
  public type: string;
  public tenantID: string;
  public auth_time: number;
  public name: string;
  public phone_number: string;
  public email: string;
  public address: any;
  public domain: string;
  public iat: number;
  public exp: number;
}
