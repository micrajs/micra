import type {PlopTypes} from '@turbo/gen';

export interface RunActionConfig extends PlopTypes.ActionConfig {
  call?: (data?: any) => Promise<void | string>;
}

export type ExtendedActionTypes = PlopTypes.ActionType | RunActionConfig;
