import {
	ARROWDOWN,
	LEFT,
	RIGHT,
	// SPACE,
	ARROWUP,
} from '@19h47/keycode';

const CHECKED = 'aria-checked';


/**
 * Class Radios
 *
 * @param obj element DOM element.
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */
export default class Radios {
	constructor(element) {
		this.$element = element;
	}

	init() {
		if (null === this.$element) return false;

		this.radios = this.$element.querySelectorAll('[role=radio]');

		this.initEvents();

		return true;
	}

	initEvents() {
		for (let i = 0; i < this.radios.length; i += 1) {
			const input = this.radios[i].querySelector('input');

			// Click.
			this.radios[i].addEventListener('click', () => {
				this.deactivateAll();
				Radios.toggle(this.radios[i], input, 'true' === this.radios[i].getAttribute(CHECKED));
			});

			// Focus.
			this.radios[i].addEventListener('focus', () => Radios.focus(this.radios[i]));

			// Blur.
			this.radios[i].addEventListener('blur', () => Radios.blur(this.radios[i]));

			// Keydown.
			this.radios[i].addEventListener('keydown', (event) => {
				if ('keydown' === event.type) {
					this.keydownEventListener(event, i);
				}
			});

			if (input.checked) {
				Radios.activate(this.radios[i], input, false);
			}
		}
	}

	/**
	 * Keydown event listener
	 *
	 * @param  {object} event
	 * @param  {number} i
	 * @return
	 */
	keydownEventListener(event, i) {
		const key = event.keyCode;
		let $current = null;

		const next = () => {
			$current = this.radios[i + 1] || this.radios[0];

			this.deactivateAll();
			Radios.blur(this.radios[i]);
			Radios.focus($current);
			Radios.activate(
				$current,
				$current.querySelector('input'),
				false,
			);
			event.preventDefault();
			event.stopPropagation();
		};

		const previous = () => {
			$current = this.radios[i - 1] || this.radios[this.radios.length - 1];

			this.deactivateAll();
			Radios.blur(this.radios[i]);
			Radios.focus($current);
			Radios.activate(
				$current,
				$current.querySelector('input'),
				false,
			);
			event.preventDefault();
			event.stopPropagation();
		};

		const codes = {
			[ARROWDOWN]: next,
			[RIGHT]: next,
			[ARROWUP]: previous,
			[LEFT]: previous,
			// [SPACE]: () => {
			// 	this.deactivateAll();
			// 	Radios.activate(
			// 		this.radios[i],
			// 		this.radios[i].querySelector('input'),
			// 		false,
			// 	);
			// 	event.preventDefault();
			// 	event.stopPropagation();
			// },
			default: () => false,
		};

		return (codes[key] || codes.default)();
	}

	/**
	 * Toggle
	 *
	 * @param  {object}  element DOM element.
	 * @param  {object}  input DOM element.
	 * @param  {boolean} active
	 */
	static toggle(element, input, active) {
		if (active) {
			return this.deactivate(element, input, active);
		}

		return this.activate(element, input, active);
	}


	/**
	 * Checkbox.activate
	 *
	 * @param  {object}  element DOM element.
	 * @param  {object}  input DOM element.
	 * @param  {boolean} active
	 * @return bool
	 * @access static
	 */
	static activate(element, input, active) {
		if (active) return false;

		const conditionClass = element.getAttribute('data-condition-class');
		const conditionalEls = document.querySelectorAll(`.${conditionClass}`) || [];

		const radio = input;

		element.classList.add('is-selected');
		element.setAttribute(CHECKED, 'true');
		element.setAttribute('tabindex', 0);

		// Condition.
		for (let i = 0; i < conditionalEls.length; i += 1) {
			const $input = conditionalEls[i].querySelector('input') || false;

			conditionalEls[i].classList.remove('is-off');
			conditionalEls[i].setAttribute('tabIndex', 0);

			if ($input) {
				$input.removeAttribute('disabled');
			}
		}

		radio.setAttribute('checked', true);

		return true;
	}


	/**
	 * Deactivate
	 *
	 * @param  {object}  element DOM element.
	 * @param  {object}  input DOM element.
	 * @param  {boolean} active
	 * @return boolean
	 */
	static deactivate(element, input, active) {
		if (!active) return false;

		const conditionClass = element.getAttribute('data-condition-class');
		const conditionalEls = document.querySelectorAll(`.${conditionClass}`) || [];
		const radio = input;

		element.classList.remove('is-selected');
		element.setAttribute(CHECKED, 'false');
		element.setAttribute('tabindex', -1);

		// Condition.
		for (let i = 0; i < conditionalEls.length; i += 1) {
			const $input = conditionalEls[i].querySelector('input') || false;
			conditionalEls[i].classList.add('is-off');
			conditionalEls[i].setAttribute('tabIndex', -1);

			if ($input) {
				conditionalEls[i].querySelector('input').setAttribute('disabled', true);
			}
		}

		radio.removeAttribute('checked');

		return true;
	}

	/**
	 * Deactive all
	 *
	 * @return void
	 */
	deactivateAll() {
		for (let i = 0; i < this.radios.length; i += 1) {
			const input = this.radios[i].querySelector('input');

			Radios.deactivate(this.radios[i], input, true);
		}
	}

	/**
	 * Focus
	 *
	 * @param {object} element DOM object.
	 */
	static focus(element) {
		element.classList.add('is-focus');

		return element.focus();
	}

	/**
	 * Blur
	 *
	 * @param {object} element DOM object.
	 */
	static blur(element) {
		element.classList.remove('is-focus');

		return element.blur();
	}
}
