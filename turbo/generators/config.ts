import type {PlopTypes} from '@turbo/gen';
import {runActionType} from './utilities/runActionType';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setActionType('run', runActionType);
}
