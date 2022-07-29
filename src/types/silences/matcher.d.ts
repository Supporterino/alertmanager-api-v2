export interface Matcher {
  name: string;
  value: string;
  isRegex: boolean;
  isEqual?: boolean;
}
