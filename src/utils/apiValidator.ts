import { APIGettableSilence } from '../types/silences/gettableSilence';
import { APIMatcher } from '../types/silences/matcher';
import { APISilenceStatus } from '../types/silences/silenceStatus';

export const isAPIGettableSilence = (data: any): data is APIGettableSilence => {
  /* eslint-disable no-eval */
  const hasKeys =
    'id' in data &&
    'status' in data &&
    'updatedAt' in data &&
    'matchers' in data &&
    'startsAt' in data &&
    'endsAt' in data &&
    'createdBy' in data &&
    'comment' in data;
  if (!hasKeys) return false;
  if (!Array.isArray(data.matchers)) return false;
  if (!data.matchers.every((item: any) => isAPIMatcher(item))) return false;
  if (!isAPISilenceStatus(data.status)) return false;
  return true;
};

export const isAPIMatcher = (data: any): data is APIMatcher => {
  /* eslint-disable no-eval */
  const hasKeys = 'name' in data && 'value' in data && 'isRegex' in data;
  if (!hasKeys) return false;
  if (
    typeof data.name !== 'string' ||
    typeof data.value !== 'string' ||
    typeof data.isRegex !== 'boolean'
  )
    return false;
  return true;
};

export const isAPISilenceStatus = (data: any): data is APISilenceStatus => {
  return 'state' in data;
};
