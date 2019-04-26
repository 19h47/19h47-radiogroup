import KEYCODE from 'src/keycode';

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
				if ('keydown' !== event.type) return false;

				let flag = false;
				let $current = null;

				switch (event.keyCode) {
					case KEYCODE.DOWN:
					case KEYCODE.RIGHT:
						$current = this.radios[i + 1] ? this.radios[i + 1] : this.radios[0];

						this.deactivateAll();
						Radios.blur(this.radios[i]);
						Radios.focus($current);
						Radios.activate(
							$current,
							$current.querySelector('input'),
							false,
						);
						flag = true;

						break;

					case KEYCODE.UP:
					case KEYCODE.LEFT:
						$current = this.radios[i - 1]
							? this.radios[i - 1]
							: this.radios[this.radios.length - 1];

						this.deactivateAll();
						Radios.blur(this.radios[i]);
						Radios.focus($current);
						Radios.activate(
							$current,
							$current.querySelector('input'),
							false,
						);
						flag = true;

						break;

					case KEYCODE.SPACE:
						this.deactivateAll();
						Radios.activate(
							this.radios[i],
							this.radios[i].querySelector('input'),
							false,
						);
						flag = true;

						break;

					default:
						break;
				}

				if (flag) {
					event.preventDefault();
					event.stopPropagation();

					return true;
				}

				return false;
			});

			if (input.checked) {
				Radios.activate(this.radios[i], input, false);
			}
		}
	}


	static toggle(element, input, active) {
		if (active) {
			return this.deactivate(element, input, active);
		}

		return this.activate(element, input, active);
	}


	/**
	 * Checkbox.activate
	 *
	 * @param  obj  element DOM element.
	 * @param  obj  input DOM element.
	 * @param  bool active
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
			conditionalEls[i].classList.remove('is-off');
			conditionalEls[i].setAttribute('tabIndex', 0);
			conditionalEls[i].querySelector('input').removeAttribute('disabled');
		}

		radio.setAttribute('checked', true);

		return true;
	}


	/**
	 * Deactivate
	 *
	 * @param  obj  element DOM element.
	 * @param  obj  input DOM element.
	 * @param  bool active
	 * @return bool
	 */
	static deactivate(element, input, active) {
		// console.info('Radios.deactivate');

		if (!active) return false;

		const conditionClass = element.getAttribute('data-condition-class');
		const conditionalEls = document.querySelectorAll(`.${conditionClass}`) || [];
		const radio = input;

		element.classList.remove('is-selected');
		element.setAttribute(CHECKED, 'false');
		element.setAttribute('tabindex', -1);

		// Condition.
		for (let i = 0; i < conditionalEls.length; i += 1) {
			conditionalEls[i].classList.add('is-off');
			conditionalEls[i].setAttribute('tabIndex', -1);
			conditionalEls[i].querySelector('input').setAttribute('disabled', true);
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
	 * @param obj element DOM object.
	 */
	static focus(element) {
		element.classList.add('is-focus');

		return element.focus();
	}

	/**
	 * Blur
	 *
	 * @param obj element DOM object.
	 */
	static blur(element) {
		element.classList.remove('is-focus');

		return element.blur();
	}
}
