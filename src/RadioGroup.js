import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT, HOME, END } from '@19h47/keycode';
import Radio from './Radio';

const optionsDefault = {
	tagger: [],
	template: () => { },
	name: '',
};

/**
 * Class Radios
 *
 * @param {obj} element DOM element.
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class RadioGroup {
	constructor(element, options = {}) {
		this.rootElement = element;
		this.radios = [];
		this.current = 0;

		this.options = { ...optionsDefault, ...options };

		// Bind.
		this.handleKeydown = this.handleKeydown.bind(this);

		this.render();
	}

	init() {
		this.elements = [...this.rootElement.querySelectorAll('[role=radio]')];

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

		this.rootElement.addEventListener('keydown', this.handleKeydown);
	}

	/**
	 * Keydown event listener
	 *
	 */
	handleKeydown(event) {
		const key = event.keyCode || event.which;
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

		const codes = {
			[ARROW_UP]: previous,
			[ARROW_RIGHT]: next,
			[ARROW_DOWN]: next,
			[ARROW_LEFT]: previous,
			[HOME]: first,
			[END]: last,
			default: () => false,
		};

		return (codes[key] || codes.default)();
	}

	/**
	 * Deactivate all
	 *
	 */
	deactivateAll = () => this.radios.forEach(radio => radio.deactivate());

	render() {
		const { template, name } = this.options;

		this.options.tagger.forEach(tag => {
			this.rootElement.insertAdjacentHTML(
				'beforeend',
				template(tag.label, tag.value, tag.selected, name),
			);
		});
	}

	destroy() {
		this.rootElement.removeEventListener('keydown', this.handleKeydown);

		this.radios.forEach(radio => radio.destroy());

		this.elements = [];
		this.radios = [];
	}

	setCurrent = (index = 0) => {
		this.current = index;
	};
}
