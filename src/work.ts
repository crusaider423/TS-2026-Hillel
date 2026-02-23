// 1.
const updateProperty = <T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
): T => {
  const copyObj = structuredClone(obj);
  copyObj[key] = value;
  return copyObj;
};

// 2.
type EventNameType = "click" | "scroll" | "purchase";
interface IEventPayloads {
  click: { x: number; y: number };
  scroll: { offset: number };
  purchase: { itemId: string; amount: number };
}
class AnalyticsTracker<
  T extends EventNameType,
  U extends IEventPayloads[T] = IEventPayloads[T],
> {
  track(eventName: T, payload: U): void {}
}

// 3.
class FormProcessor<T extends object = {}> {
  public data: T;

  constructor(data: T) {
    this.data = data;
  }

  public updateField<K extends keyof T>(key: K, value: T[K]): void {
    this.data[key] = value;
  }
}
