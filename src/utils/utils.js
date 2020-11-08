export function format(type, input) {
	let newInput;
	switch (type) {
		case Date:
			newInput = new Date(input);
			return newInput.getHours() + ":" + String(newInput.getMinutes()).padStart(2, "0");
		default:
			return input;
	}
}

export function sortBy(type, order, input) {
	switch (type) {
		case Date:
			if (order === "ascending")
				return input.sort((m1, m2) => new Date(m2.info.date) - new Date(m1.info.date));
			else
				return input.sort((m2, m1) => new Date(m2.info.date) - new Date(m1.info.date));
	}
}
