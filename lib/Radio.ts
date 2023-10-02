import { EventEmitter } from 'events';
import { select, deselect, blur, focus } from './utils';

const CHECKED = 'aria-checked';

/**
 *
 * @constructor
 * @param {object} element
 */
export default class Radio extends EventEmitter {
	el: HTMLElement;
	$input: HTMLInputElement | null;
	checked: boolean;
	disabled: boolean;

	/**
	 *
	 * @param {HTMLElement} el
	 */
	constructor(el: HTMLElement) {
		super();

		// Elements
		this.el = el;
		this.$input = null;
		this.checked = false;
		this.disabled = false;

		const $input = this.el.querySelector<HTMLInputElement>('input[type="radio"]');

		if ($input) {
			// Element
			this.$input = $input;

			// Values
			this.checked = JSON.parse(this.el.getAttribute(CHECKED) as string);
			this.disabled = this.$input.disabled;

			// Bind
			this.handleClick = this.handleClick.bind(this);
		}
	}

	init = () => this.initEvents();

	initEvents() {
		// console.info('Radio.initEvents');

		this.el.addEventListener('click', this.handleClick);
		this.el.addEventListener('focus', () => focus(this.el));
		this.el.addEventListener('blur', () => blur(this.el));
	}

	handleClick = () => this.toggle();

	/**
	 * Toggle
	 */
	toggle() {
		if (this.disabled) {
			return false;
		}

		if (!this.checked && this.$input) {
			this.emit('Radio.beforeActivate');
			// this.activate();
			return this.emit('Radio.activate', {
				element: this.el,
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

		deselect(this.el);
		this.el.setAttribute(CHECKED, 'false');
		this.el.setAttribute('tabindex', '-1');
		blur(this.el);

		if (this.$input) {
			this.$input.checked = false;
			this.$input.removeAttribute('checked');

			return this.emit('Radio.deactivate', {
				element: this.el,
				value: this.$input.value,
			});
		}
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

		select(this.el);
		this.el.setAttribute(CHECKED, 'true');
		this.el.setAttribute('tabindex', '0');

		if (shouldFocus) {
			focus(this.el);
		}

		if (this.$input) {
			this.$input.checked = true;
			this.$input.setAttribute('checked', 'true');
		}

		return true;
	}

	destroy() {
		this.el.removeEventListener('click', this.handleClick);
		this.el.removeEventListener('focus', () => focus(this.el));
		this.el.removeEventListener('blur', () => blur(this.el));
	}

	disable() {
		this.el.setAttribute('tabindex', '-1');
		this.el.setAttribute('aria-disabled', 'true');

		if (this.$input) {
			this.$input.disabled = true;
		}
	}

	enable() {
		if (this.$input) {
			this.$input.disabled = false;
		}

		this.el.setAttribute('aria-disabled', 'false');

		if (this.checked) {
			this.el.setAttribute('tabindex', '0');
		}
	}
}
