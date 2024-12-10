import { ApiError } from "./api-error.model";

export class ValidationError extends ApiError {
  private _details: string[];

  constructor(
    status: number,
    message: string,
    path: string,
    details: string[]
  ) {
    super(status, message, path);
    this._details = details;
  }

  public get details(): string[] {
    return this._details;
  }
  public set details(value: string[]) {
    this._details = value;
  }
}
