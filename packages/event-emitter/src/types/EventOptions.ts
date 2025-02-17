export interface EventOptions<Detail extends Record<any, any>> {
  bubbles?: boolean;
  cancelable?: boolean;
  detail?: Detail;
}
