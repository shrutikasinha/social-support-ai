export const hasNoEmptyValues = <T extends Record<string, unknown>>(obj: T): boolean =>
    Object.values(obj).every((value) => value !== null && value !== undefined && value !== "");