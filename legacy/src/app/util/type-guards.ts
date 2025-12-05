export const isNotNullOrUndefined = <T>(
	value: null | undefined | T
): value is T => value !== null && value !== undefined
