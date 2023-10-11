export const select = (target: HTMLElement) => target.classList.add('is-selected');
export const deselect = (target: HTMLElement) => target.classList.remove('is-selected');

/**
 * Blur
 *
 * @param {object} target DOM object.
 */
export const blur = (target : HTMLElement) => {
	target.classList.remove('is-focus');

	return target.blur();
};

/**
 * Focus
 *
 * @param {object} target DOM object.
 */
export const focus = (target : HTMLElement) => {
	target.classList.add('is-focus');

	return target.focus();
};

/**
 * Dispatch event
 *
 * @param {HTMLElement} target
 * @param {object} details
 * @param {string} name
 */
export const dispatchEvent = (target: HTMLElement, details: object = {}, name: string = ''): boolean => {
	const event = new CustomEvent(`Radio.${name}`, {
		bubbles: false,
		cancelable: true,
		detail: details,
	});

	// Dispatch the event on target.
	return target.dispatchEvent(event);
};
