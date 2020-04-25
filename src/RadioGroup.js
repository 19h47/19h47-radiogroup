import {
	ARROW_UP,
	ARROW_RIGHT,
	ARROW_DOWN,
	ARROW_LEFT,
	// SPACE,
	HOME,
	END,
} from '@19h47/keycode';
import Radio from './Radio';

const optionsDefault = {
	tagger: [],
	template: () => {},
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

		//
		this.onKeydown = this.onKeydown.bind(this);
		this.deactivateAll = this.deactivateAll.bind(this);

		this.render();
	}

	init() {
		this.elements = [...this.rootElement.querySelectorAll('[role=radio]')];

		this.elements.map($input => {
			const radio = new Radio($input);

			radio.init();
			this.radios.push(radio);

			return true;
		});

		this.initEvents();

		return true;
	}

	initEvents() {
		this.radios.forEach((radio, index) =>
			radio.on('Radio.beforeActivate', () => {
				this.current = index;

				this.deactivateAll();
				return this.radios[this.current].activate();
			}),
		);

		this.rootElement.addEventListener('keydown', this.onKeydown);
	}

	/**
	 * Keydown event listener
	 *
	 */
	onKeydown(event) {
		const key = event.keyCode || event.which;

		const next = () => {
			this.current = this.current + 1 > this.radios.length - 1 ? 0 : this.current + 1;

			this.deactivateAll();
			this.radios[this.current].toggle();

			event.preventDefault();
		};

		const previous = () => {
			this.current = 0 > this.current - 1 ? this.radios.length - 1 : this.current - 1;

			this.deactivateAll();
			this.radios[this.current].toggle();

			event.preventDefault();
		};

		const first = () => {
			this.deactivateAll();
			this.radios[0].toggle();

			event.preventDefault();
		};

		const last = () => {
			this.deactivateAll();
			this.radios[this.radios.length - 1].toggle();

			event.preventDefault();
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
	deactivateAll() {
		// console.info('RadioGroup.deactivateAll');
		return this.radios.map(radio => radio.deactivate());
	}

	render() {
		const { template, name } = this.options;

		this.options.tagger.forEach(tag => {
			this.rootElement.insertAdjacentHTML(
				'beforeend',
				template(tag.label, tag.value, tag.selected, name),
			);
		});
	}
}
