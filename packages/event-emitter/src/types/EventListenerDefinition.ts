import type {Micra} from '@micra/core';

export interface EventListenerDefinition extends Micra.AddEventListenerOptions {
  type: string;
  listener: Micra.EventListener<any>;
}
