const regExp =
  /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;

export const isURL = (url: string): boolean => {
  return regExp.test(url);
};
