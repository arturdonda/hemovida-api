export function isCpfValid(cpf: string): boolean {
	const digits = cpf.split('').map(x => Number(x));

	const firstDigit = (digits.reduce((total, digit, index) => (index < 9 ? total + digit * (10 - index) : total), 0) * 10) % 11;

	const secondDigit = ((digits.reduce((total, digit, index) => (index < 9 ? total + digit * (11 - index) : total), 0) + firstDigit * 2) * 10) % 11;

	return firstDigit === digits[9] && secondDigit === digits[10];
}
