export const asEnum = <
	T extends { [key: string]: string },
	K extends keyof T & string
>(
	enumObject: T,
	value: `${T[K]}`
): T[K] =>
	Object.values(enumObject).includes(value)
		? (value as unknown as T[K])
		: undefined
