const regExp =
  /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;

const isURL = (url: string): boolean => {
  return regExp.test(url);
};
