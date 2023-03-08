export const datePart = (dateString: string | undefined): string =>
	dateString ? dateString.split("T")[0] : dateString
