import { create, StateCreator } from "zustand";
import { subscribeWithSelector, devtools, persist } from "zustand/middleware";
export { useShallow } from "zustand/react/shallow";

export function createStore<T = unknown>(
  creator: StateCreator<T>,
  options?: { name: string }
) {
  if (options) {
    return create(
      persist(devtools(subscribeWithSelector(creator)), { name: options.name })
    );
  }
  return create(devtools(subscribeWithSelector(creator)));
}
