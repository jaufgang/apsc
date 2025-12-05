export const datePart = (dateString: string | undefined): string =>
	dateString ? dateString.split("T")[0] : dateString;

export const currentYear = 2024; //new Date().getFullYear();
