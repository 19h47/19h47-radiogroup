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
		this.rootElement.addEventListener('focus', () => focus(this.rootElement));
		this.rootElement.addEventListener('blur', () => blur(this.rootElement));
	}

	toggle() {
		if (!this.checked) {
			this.emit('Radio.beforeActivate');
			this.activate();
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
	activate() {
		// console.info('Radio.activate', this.checked);

		if (this.checked) {
			return false;
		}

		this.checked = true;

		select(this.rootElement);
		this.rootElement.setAttribute(CHECKED, 'true');
		this.rootElement.setAttribute('tabindex', 0);
		focus(this.rootElement);

		this.$input.setAttribute('checked', true);

		return true;
	}

	destroy() {
		this.rootElement.removeEventListener('click', this.toggle);
		this.rootElement.removeEventListener('focus', () => focus(this.rootElement));
		this.rootElement.removeEventListener('blur', () => blur(this.rootElement));
	}
}
