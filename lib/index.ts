import Radio from './Radio.js';

export type { default as Radio } from './Radio.js';

export type Template = (label: string, value: string, selected: boolean, name: string) => string;

export interface Tag {
	label: string;
	value: string;
	selected?: boolean;
}

export interface Options {
	tagger: Tag[];
	template: Template;
	name: string;
}

export interface RadioEventDetail {
	element: HTMLElement;
	value?: string;
}

const optionsDefault: Options = {
	tagger: [],
	template: () => '',
	name: '',
};

/**
 * Class Radios
 *
 * @param {HTMLElement} $el DOM element.
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class RadioGroup {
	$el: HTMLElement;
	radios: Radio[] = [];
	current: number = 0;
	options: Options;
	elements: HTMLElement[] = [];

	/**
	 *
	 * @param {HTMLElement} $el
	 * @param options
	 */
	constructor($el: HTMLElement, options: Partial<Options> = {}) {
		this.$el = $el;

		this.options = { ...optionsDefault, ...options };

		this.render();
	}

	init() {
		this.elements = [...this.$el.querySelectorAll<HTMLElement>('[role=radio]')];

		this.elements.forEach($element => {
			const radio = new Radio($element);

			radio.init();

			this.radios.push(radio);

			return true;
		});

		this.initEvents();

		return true;
	}

	initEvents() {
		this.radios
			.filter(radio => false === radio.disabled)
			.forEach(radio =>
				radio.$el.addEventListener('Radio.beforeActivate', this.handleBeforeActivate),
			);

		this.$el.addEventListener('keydown', this.handleKeydown);
	}

	handleBeforeActivate = (event: Event) => {
		const radios = this.radios.filter(radio => false === radio.disabled);
		const index = radios.findIndex(radio => radio.$el === event.currentTarget);

		if (-1 === index) {
			return false;
		}

		this.setCurrent(index);
		this.deactivateAll();

		return radios[index].activate();
	};

	/**
	 * Keydown event listener
	 *
	 * @param {KeyboardEvent} event Keyboard event.
	 */
	handleKeydown = (event: KeyboardEvent): boolean | void => {
		const $target = event.target as HTMLElement | null;
		const $radio = $target?.closest('[role=radio]');

		if (!$radio) {
			return false;
		}

		const { key } = event;
		const radios = this.radios.filter(radio => false === radio.disabled);
		const index = radios.findIndex(radio => radio.$el === $radio);

		if (0 === radios.length) {
			return false;
		}

		if (-1 !== index) {
			this.setCurrent(index);
		}

		const next = () => {
			event.preventDefault();

			const index = this.current + 1 > radios.length - 1 ? 0 : this.current + 1;

			this.setCurrent(index);
			radios[this.current].toggle();
		};

		const previous = () => {
			event.preventDefault();

			const index = 0 > this.current - 1 ? radios.length - 1 : this.current - 1;

			this.setCurrent(index);
			radios[this.current].toggle();
		};

		const first = () => {
			event.preventDefault();

			this.setCurrent(0);
			radios[0].toggle();
		};

		const last = () => {
			event.preventDefault();

			this.setCurrent(radios.length - 1);
			radios[radios.length - 1].toggle();
		};

		const toggle = () => {
			event.preventDefault();

			const focused = radios.find(radio => radio.$el === document.activeElement);

			return (focused ?? radios[this.current]).toggle();
		};

		const codes: Record<string, () => boolean | void> = {
			' ': toggle,
			ArrowUp: previous,
			ArrowRight: next,
			ArrowDown: next,
			ArrowLeft: previous,
			Home: first,
			End: last,
			default: () => false,
		};

		return (codes[key] ?? codes.default)();
	}

	/**
	 * Deactivate all
	 *
	 */
	deactivateAll = (): void => this.radios.forEach(radio => radio.deactivate());

	render(): void {
		const { template, name } = this.options;

		this.options.tagger.forEach(tag => {
			this.$el.insertAdjacentHTML(
				'beforeend',
				template(tag.label, tag.value, tag.selected ?? false, name),
			);
		});
	}

	destroy(): void {
		this.$el.removeEventListener('keydown', this.handleKeydown);

		this.radios.forEach(radio => {
			radio.$el.removeEventListener('Radio.beforeActivate', this.handleBeforeActivate);
			radio.destroy();
		});

		this.elements = [];
		this.radios = [];
	}

	setCurrent = (index = 0): void => {
		this.current = index;
	};
}
