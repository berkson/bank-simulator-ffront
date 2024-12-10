export class ApiError {
  constructor(
    private _status: number,
    private _message: string,
    private _path: string
  ) {}

  public get status(): number {
    return this._status;
  }
  public set status(value: number) {
    this._status = value;
  }
  public get message(): string {
    return this._message;
  }
  public set message(value: string) {
    this._message = value;
  }
  public get path(): string {
    return this._path;
  }
  public set path(value: string) {
    this._path = value;
  }
}
