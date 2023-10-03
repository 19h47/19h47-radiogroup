import Radio from './Radio';

type Template = (label: string, value: string, selected: boolean, name: string) => string

interface Options {
	tagger: Tag[],
	template: Template,
	name: string
}

interface Tag {
	label: string,
	value: string,
	selected: boolean
}

const optionsDefault : Options = {
	tagger: [],
	template: () => '',
	name: '',
};

/**
 * Class Radios
 *
 * @param {obj} element DOM element.
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class RadioGroup {
	el: HTMLElement;
	radios: Radio[] = [];
	current: number = 0;
	options: Options;
	elements: HTMLElement[] = [];

	/**
	 *
	 * @param {HTMLElement} el
	 * @param options
	 */
	constructor(el: HTMLElement, options = {} as Options) {
		this.el = el;

		this.options = { ...optionsDefault, ...options };

		this.render();
	}

	init() {
		this.elements = [...this.el.querySelectorAll<HTMLElement>('[role=radio]')];

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
			.forEach((radio, index) =>
				radio.on('Radio.beforeActivate', () => {
					this.setCurrent(index);
					this.deactivateAll();
					return radio.activate();
				}),
			);

		this.el.addEventListener('keydown', this.handleKeydown);
	}

	/**
	 * Keydown event listener
	 *
	 * @param {KeyboardEvent} event Keyboard event.
	 */
	handleKeydown = (event: KeyboardEvent): any => {
		const key = event.key || event.code;
		const radios = this.radios.filter(radio => false === radio.disabled);

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

		const codes : any = {
			ArrowUp: previous,
			ArrowRight: next,
			ArrowDown: next,
			ArrowLeft: previous,
			Home: first,
			End: last,
			default: () => false,
		};

		return (codes[key] || codes.default)();
	}

	/**
	 * Deactivate all
	 *
	 */
	deactivateAll = () => this.radios.forEach(radio => radio.deactivate());

	render(): void {
		const { template, name } = this.options;

		this.options.tagger.forEach(tag => {
			this.el.insertAdjacentHTML(
				'beforeend',
				template(tag.label, tag.value, tag.selected, name),
			);
		});
	}

	destroy(): void {
		this.el.removeEventListener('keydown', this.handleKeydown);

		this.radios.forEach(radio => radio.destroy());

		this.elements = [];
		this.radios = [];
	}

	setCurrent = (index = 0) => {
		this.current = index;
	};
}
