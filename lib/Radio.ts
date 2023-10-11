import { select, deselect, blur, focus, dispatchEvent } from './utils';

const CHECKED = 'aria-checked';

/**
 *
 * @param {HTMLElement} el HTML element.
 */
export default class Radio {
	el: HTMLElement;
	$input: HTMLInputElement | null = null;
	checked: boolean = false;
	disabled: boolean = false;

	/**
	 *
	 * @param {HTMLElement} el
	 */
	constructor(el: HTMLElement) {
		// Elements
		this.el = el;

		const $input = this.el.querySelector<HTMLInputElement>('input[type="radio"]');

		if ($input) {
			// Element
			this.$input = $input;

			// Values
			this.checked = JSON.parse(this.el.getAttribute(CHECKED) as string);
			this.disabled = this.$input.disabled;
		}
	}

	init = () => this.initEvents();

	initEvents(): void {
		// console.info('Radio.initEvents');

		this.el.addEventListener('click', this.handleClick);
		this.el.addEventListener('focus', () => focus(this.el));
		this.el.addEventListener('blur', () => blur(this.el));
	}

	handleClick = () => this.toggle();

	/**
	 * Toggle
	 */
	toggle(): boolean {
		if (this.disabled) {
			return false;
		}

		if (!this.checked) {
			dispatchEvent(this.el, {}, 'beforeActivate');
			// this.activate();
			return dispatchEvent(this.el, {
				element: this.el,
				value: this.$input!.value
			}, 'activate');
		}

		return false;
	}

	/**
	 * Deactivate
	 *
	 * @return boolean
	 */
	deactivate(): boolean | undefined {
		// console.info('Radio.deactivate', this.checked);

		if (!this.checked) {
			return false;
		}

		this.checked = false;

		deselect(this.el);
		this.el.setAttribute(CHECKED, 'false');
		this.el.setAttribute('tabindex', '-1');
		blur(this.el);


		this.$input!.checked = false;
		this.$input!.removeAttribute('checked');

		return dispatchEvent(this.el, {
			element: this.el,
			value: this.$input!.value,
		}, 'deactivate');

	}

	/**
	 * Radio.activate
	 *
	 * @param {boolean} shouldFocus Should focus or not.
	 *
	 * @return {boolean}
	 */
	activate(shouldFocus: boolean = true): boolean {
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

		this.$input!.checked = true;
		this.$input!.setAttribute('checked', 'true');

		return true;
	}

	destroy(): void {
		this.el.removeEventListener('click', this.handleClick);
		this.el.removeEventListener('focus', () => focus(this.el));
		this.el.removeEventListener('blur', () => blur(this.el));
	}

	disable(): void {
		this.el.setAttribute('tabindex', '-1');
		this.el.setAttribute('aria-disabled', 'true');

		// @see https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-
		this.$input!.disabled = true;
	}

	enable(): void {
		this.$input!.disabled = false;

		this.el.setAttribute('aria-disabled', 'false');

		if (this.checked) {
			this.el.setAttribute('tabindex', '0');
		}
	}
}
