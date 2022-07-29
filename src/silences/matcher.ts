export class Matcher {
  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  private _value: string;
  public get value(): string {
    return this._value;
  }
  public set value(value: string) {
    this._value = value;
  }
  private _isRegex: boolean;
  public get isRegex(): boolean {
    return this._isRegex;
  }
  public set isRegex(value: boolean) {
    this._isRegex = value;
  }
  private _isEqual: boolean;
  public get isEqual(): boolean {
    return this._isEqual;
  }
  public set isEqual(value: boolean) {
    this._isEqual = value;
  }

  constructor(
    name: string,
    value: string,
    isRegex: boolean,
    isEqual?: boolean
  ) {
    this._name = name;
    this._value = value;
    this._isRegex = isRegex;
    if (isEqual !== undefined) this._isEqual = isEqual;
    else this._isEqual = true;
  }
}
