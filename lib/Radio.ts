import { select, deselect, blur, focus, dispatchEvent } from './utils.js';

const CHECKED = 'aria-checked';

/**
 *
 * @param {HTMLElement} $el HTML element.
 */
export default class Radio {
	$el: HTMLElement;
	$input: HTMLInputElement | null = null;
	checked: boolean = false;
	disabled: boolean = false;

	/**
	 *
	 * @param {HTMLElement} $el
	 */
	constructor($el: HTMLElement) {
		this.$el = $el;
		this.$input = this.$el.querySelector<HTMLInputElement>('input[type="radio"]');

		this.checked =
			'true' === this.$el.getAttribute(CHECKED) || true === this.$input?.checked;
		this.disabled =
			'true' === this.$el.getAttribute('aria-disabled') || true === this.$input?.disabled;
	}

	init = () => this.initEvents();

	initEvents(): void {
		this.$el.addEventListener('click', this.handleClick);
		this.$el.addEventListener('focus', this.handleFocus);
		this.$el.addEventListener('blur', this.handleBlur);
	}

	handleClick = () => this.toggle();
	handleFocus = () => focus(this.$el);
	handleBlur = () => blur(this.$el);

	/**
	 * Toggle
	 */
	toggle(): boolean {
		if (this.disabled) {
			return false;
		}

		if (!this.checked) {
			dispatchEvent(this.$el, {}, 'beforeActivate');

			return dispatchEvent(
				this.$el,
				{
					element: this.$el,
					value: this.$input?.value,
				},
				'activate',
			);
		}

		return false;
	}

	/**
	 * Deactivate
	 *
	 * @return boolean
	 */
	deactivate(): boolean | undefined {
		if (!this.checked) {
			return false;
		}

		this.checked = false;

		deselect(this.$el);
		this.$el.setAttribute(CHECKED, 'false');
		this.$el.setAttribute('tabindex', '-1');
		blur(this.$el);

		if (this.$input) {
			this.$input.checked = false;
			this.$input.removeAttribute('checked');
		}

		return dispatchEvent(
			this.$el,
			{
				element: this.$el,
				value: this.$input?.value,
			},
			'deactivate',
		);
	}

	/**
	 * Radio.activate
	 *
	 * @param {boolean} shouldFocus Should focus or not.
	 *
	 * @return {boolean}
	 */
	activate(shouldFocus: boolean = true): boolean {
		if (this.checked) {
			return false;
		}

		this.checked = true;

		select(this.$el);
		this.$el.setAttribute(CHECKED, 'true');
		this.$el.setAttribute('tabindex', '0');

		if (shouldFocus) {
			focus(this.$el);
		}

		if (this.$input) {
			this.$input.checked = true;
			this.$input.setAttribute('checked', 'true');
		}

		return true;
	}

	destroy(): void {
		this.$el.removeEventListener('click', this.handleClick);
		this.$el.removeEventListener('focus', this.handleFocus);
		this.$el.removeEventListener('blur', this.handleBlur);
	}

	disable(): void {
		this.disabled = true;
		this.$el.setAttribute('tabindex', '-1');
		this.$el.setAttribute('aria-disabled', 'true');

		if (this.$input) {
			this.$input.disabled = true;
		}
	}

	enable(): void {
		this.disabled = false;
		this.$el.setAttribute('aria-disabled', 'false');

		if (this.$input) {
			this.$input.disabled = false;
		}

		if (this.checked) {
			this.$el.setAttribute('tabindex', '0');
		}
	}
}
