import { Property } from "@/modals/api";
import { BaseType } from "./const";
import { Variable } from "@/modals/env";

export function isNull(val: any) {
  return val === undefined || val === null;
}

export function isVirtualProperty(propt?: Property) {
  return (
    propt &&
    isNull(propt.name) &&
    isNull(propt.desc) &&
    isNull(propt.value) &&
    propt.type === BaseType.String
  );
}

export function isVirtualVariable(propt?: Variable) {
  return (
    propt && isNull(propt.key) && isNull(propt.initValue) && isNull(propt.value)
  );
}
