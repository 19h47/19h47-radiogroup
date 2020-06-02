import EventDispatcher from './EventDispatcher';
import { select, deselect, blur, focus } from './utils';

const CHECKED = 'aria-checked';

/**
 *
 * @constructor
 * @param {object} element
 */
export default class Radio extends EventDispatcher {
	constructor(element) {
		super(['Radio.beforeActivate', 'Radio.activate', 'Radio.deactivate']);

		// Elements
		this.rootElement = element;
		this.$input = this.rootElement.querySelector('input');

		//
		this.conditional = {
			className: this.rootElement.getAttribute('data-condition-class'),
		};

		this.conditional.elements = [
			...document.querySelectorAll(`.${this.conditional.className}`),
		];

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
			this.emit('Radio.beforeActivate', this.rootElement);
			this.activate();
			return this.emit('Radio.activate', this.rootElement);
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

		// Condition.
		this.conditional.elements.map(element => {
			const $input = element.querySelector('input') || false;

			element.classList.add('is-off');
			element.setAttribute('tabIndex', -1);

			if ($input) {
				element.querySelector('input').setAttribute('disabled', true);
			}

			return true;
		});

		this.$input.removeAttribute('checked');

		return this.emit('Radio.deactivate', this.rootElement);
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

		// Condition.
		this.conditional.elements.map(element => {
			const $input = element.querySelector('input') || false;

			element.classList.remove('is-off');
			element.setAttribute('tabIndex', 0);

			if ($input) {
				$input.removeAttribute('disabled');
			}

			return true;
		});

		this.$input.setAttribute('checked', true);

		return true;
	}
}
