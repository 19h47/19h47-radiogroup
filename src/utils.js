export const select = target => target.classList.add('is-selected');
export const deselect = target => target.classList.remove('is-selected');

/**
 * Blur
 *
 * @param {object} target DOM object.
 */
export const blur = target => {
	target.classList.remove('is-focus');

	return target.blur();
};

/**
 * Focus
 *
 * @param {object} target DOM object.
 */
export const focus = target => {
	target.classList.add('is-focus');

	return target.focus();
};
