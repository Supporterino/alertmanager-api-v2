import { Matcher } from '..';
import { APIGettableSilence } from '../types/silences/gettableSilence';
import { SilenceStatus } from './silenceStatus';

export class Silence {
  private _id: string;
  private _status: SilenceStatus;
  private _updatedAt: Date;
  private _matchers: Array<Matcher>;
  private _startsAt: Date;
  private _endsAt: Date;
  private _createdBy: string;
  private _comment: string;

  constructor(
    id: string,
    status: SilenceStatus,
    updatedAt: Date,
    matchers: Array<Matcher>,
    startsAt: Date,
    endsAt: Date,
    createdBy: string,
    comment: string
  ) {
    this._id = id;
    this._status = status;
    this._updatedAt = updatedAt;
    this._matchers = matchers;
    this._startsAt = startsAt;
    this._endsAt = endsAt;
    this._createdBy = createdBy;
    this._comment = comment;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get status(): SilenceStatus {
    return this._status;
  }
  public set status(value: SilenceStatus) {
    this._status = value;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  public get matchers(): Array<Matcher> {
    return this._matchers;
  }
  public set matchers(value: Array<Matcher>) {
    this._matchers = value;
  }

  public get startsAt(): Date {
    return this._startsAt;
  }
  public set startsAt(value: Date) {
    this._startsAt = value;
  }

  public get createdBy(): string {
    return this._createdBy;
  }
  public set createdBy(value: string) {
    this._createdBy = value;
  }

  public get endsAt(): Date {
    return this._endsAt;
  }
  public set endsAt(value: Date) {
    this._endsAt = value;
  }

  public get comment(): string {
    return this._comment;
  }
  public set comment(value: string) {
    this._comment = value;
  }

  public static fromJSON(apiObject: APIGettableSilence): Silence {
    const matchers = new Array<Matcher>();
    apiObject.matchers.forEach(matcher =>
      matchers.push(
        new Matcher(
          matcher.name,
          matcher.value,
          matcher.isRegex,
          matcher.isEqual
        )
      )
    );
    return new Silence(
      apiObject.id,
      apiObject.status,
      new Date(apiObject.updatedAt),
      matchers,
      new Date(apiObject.startsAt),
      new Date(apiObject.endsAt),
      apiObject.createdBy,
      apiObject.comment
    );
  }
}

export const silencesFromAPIArray = (
  arr: Array<APIGettableSilence>
): Array<Silence> => {
  const silences = new Array<Silence>();
  arr.forEach(rawSilence => silences.push(Silence.fromJSON(rawSilence)));
  return silences;
};
