const CHECKED = 'aria-checked';

const select = target => target.classList.add('is-selected');
const deselect = target => target.classList.remove('is-selected');


/**
 * Blur
 *
 * @param {object} target DOM object.
 */
const blur = target => {
	target.classList.remove('is-focus');

	return target.blur();
};


/**
 * Focus
 *
 * @param {object} target DOM object.
 */
const focus = target => {
	target.classList.add('is-focus');

	return target.focus();
};


/**
 *
 * @constructor
 * @param {object} element
 */
export default class Radio {
	constructor(element) {
		// Elements
		this.rootElement = element;
		this.$input = this.rootElement.querySelector('input');

		// Values
		this.checked = JSON.parse(this.rootElement.getAttribute(CHECKED));

		// Bind
		this.toggle = this.toggle.bind(this);
	}

	init() {
		// console.info('Radio.init');

		this.initEvents();
	}

	initEvents() {
		// console.info('Radio.initEvents');

		this.rootElement.addEventListener('click', this.toggle);
		this.rootElement.addEventListener('focus', focus(this.rootElement));
		this.rootElement.addEventListener('blur', blur(this.rootElement));
	}

	/**
	 * Toggle
	 *
	 */
	toggle() {
		// console.info('Radio.toggle', this.checked);

		if (this.checked) {
			// Dispatch event
			// this.rootElement.dispatchEvent(new CustomEvent('Radio.deactivate', {
			// 	detail: {
			// 		element: this.rootElement,
			// 	},
			// }));

			// return this.deactivate();
		}

		this.rootElement.dispatchEvent(new CustomEvent('Radio.activate', {
			detail: {
				element: this.rootElement,
			},
		}));

		return this.activate();
	}

	/**
	 * Deactivate
	 *
	 * @return boolean
	 */
	deactivate() {
		// console.info('Radio.deactivate', this.checked);

		if (!this.checked) {
			return false;
		}

		this.checked = false;

		const conditionClass = this.rootElement.getAttribute('data-condition-class');
		const conditionalEls = document.querySelectorAll(`.${conditionClass}`) || [];

		deselect(this.rootElement);
		this.rootElement.setAttribute(CHECKED, 'false');
		this.rootElement.setAttribute('tabindex', -1);

		// Condition.
		for (let i = 0; i < conditionalEls.length; i += 1) {
			const $input = conditionalEls[i].querySelector('input') || false;
			conditionalEls[i].classList.add('is-off');
			conditionalEls[i].setAttribute('tabIndex', -1);

			if ($input) {
				conditionalEls[i].querySelector('input').setAttribute('disabled', true);
			}
		}

		this.$input.removeAttribute('checked');

		return true;
	}


	/**
	 * Checkbox.activate
	 *
	 * @return {boolean}
	 */
	activate() {
		// console.info('Radio.activate', this.checked);

		if (this.checked) {
			return false;
		}

		this.checked = true;

		const conditionClass = this.rootElement.getAttribute('data-condition-class');
		const conditionalEls = document.querySelectorAll(`.${conditionClass}`) || [];

		select(this.rootElement);
		this.rootElement.setAttribute(CHECKED, 'true');
		this.rootElement.setAttribute('tabindex', 0);

		// Condition.
		for (let i = 0; i < conditionalEls.length; i += 1) {
			const $input = conditionalEls[i].querySelector('input') || false;

			conditionalEls[i].classList.remove('is-off');
			conditionalEls[i].setAttribute('tabIndex', 0);

			if ($input) {
				$input.removeAttribute('disabled');
			}
		}

		this.$input.setAttribute('checked', true);

		return true;
	}
}
