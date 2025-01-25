import type {PlopTypes} from '@turbo/gen';
import type {RunActionConfig} from '../types';

export const runActionType: PlopTypes.CustomActionFunction = async (
  data,
  {call: callback}: RunActionConfig = {type: 'run'},
) => {
  if (callback == null) throw new Error('callback is required');

  const result = await callback(data);
  return typeof result === 'string' ? result : 'done';
};
