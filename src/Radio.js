import { EventEmitter } from 'events';
import { select, deselect, blur, focus } from './utils';

const CHECKED = 'aria-checked';

/**
 *
 * @constructor
 * @param {object} element
 */
export default class Radio extends EventEmitter {
	constructor(element) {
		super();

		// Elements
		this.rootElement = element;
		this.$input = this.rootElement.querySelector('input[type="radio"]');

		// Values
		this.checked = JSON.parse(this.rootElement.getAttribute(CHECKED));
		this.disabled = this.$input.disabled || false;

		// Bind
		this.handleClick = this.handleClick.bind(this);
	}

	init = () => this.initEvents();

	initEvents() {
		// console.info('Radio.initEvents');

		this.rootElement.addEventListener('click', this.handleClick);
		this.rootElement.addEventListener('focus', () => focus(this.rootElement));
		this.rootElement.addEventListener('blur', () => blur(this.rootElement));
	}

	handleClick = () => this.toggle();

	/**
	 * Toggle
	 */
	toggle() {
		if (this.disabled) {
			return false;
		}

		if (!this.checked) {
			this.emit('Radio.beforeActivate');
			// this.activate();
			return this.emit('Radio.activate', {
				element: this.rootElement,
				value: this.$input.value,
			});
		}

		return false;
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
		this.rootElement.checked = false;

		deselect(this.rootElement);
		this.rootElement.setAttribute(CHECKED, 'false');
		this.rootElement.setAttribute('tabindex', -1);
		blur(this.rootElement);

		this.$input.removeAttribute('checked');

		return this.emit('Radio.deactivate', {
			element: this.rootElement,
			value: this.$input.value,
		});
	}

	/**
	 * Radio.activate
	 *
	 * @return {boolean}
	 */
	activate(shouldFocus = true) {
		// console.info('Radio.activate', this.checked);

		if (this.checked) {
			return false;
		}

		this.checked = true;
		this.rootElement.checked = true;

		select(this.rootElement);
		this.rootElement.setAttribute(CHECKED, 'true');
		this.rootElement.setAttribute('tabindex', 0);

		if (shouldFocus) {
			focus(this.rootElement);
		}

		this.$input.setAttribute('checked', true);

		return true;
	}

	destroy() {
		this.rootElement.removeEventListener('click', this.handleClick);
		this.rootElement.removeEventListener('focus', () => focus(this.rootElement));
		this.rootElement.removeEventListener('blur', () => blur(this.rootElement));
	}

	disable() {
		this.rootElement.setAttribute('tabindex', -1);
		this.$input.disabled = true;
		this.rootElement.setAttribute('aria-disabled', true);
	}

	enable() {
		this.$input.disabled = false;
		this.rootElement.setAttribute('aria-disabled', false);

		if (this.checked) {
			this.rootElement.setAttribute('tabindex', 0);
		}
	}
}
