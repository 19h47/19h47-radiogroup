import {
	ARROW_DOWN,
	LEFT,
	RIGHT,
	// SPACE,
	ARROW_UP,
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

		this.options = Object.assign({}, optionsDefault, options);

		//
		this.onKeyDown = this.onKeyDown.bind(this);
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
		this.radios.forEach(
			(radio, index) => radio.on(
				'Radio.activate',
				() => {
					this.current = index;

					return this.deactivateAll();
				},
			),
		);

		this.rootElement.addEventListener('keydown', this.onKeyDown);
	}

	/**
	 * Keydown event listener
	 *
	 */
	onKeyDown(event) {
		const key = event.keyCode || event.which;

		const next = () => {
			this.current = this.current + 1 > this.radios.length - 1 ? 0 : this.current + 1;

			this.deactivateAll();
			this.radios[this.current].activate();

			event.preventDefault();
		};

		const previous = () => {
			this.current = 0 > this.current - 1 ? this.radios.length - 1 : this.current - 1;

			this.deactivateAll();
			this.radios[this.current].activate();

			event.preventDefault();
		};

		const first = () => {
			this.deactivateAll();
			this.radios[0].activate();

			event.preventDefault();
		};

		const last = () => {
			this.deactivateAll();
			this.radios[this.radios.length - 1].activate();

			event.preventDefault();
		};

		const codes = {
			[ARROW_DOWN]: next,
			[RIGHT]: next,
			[ARROW_UP]: previous,
			[LEFT]: previous,
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
		return this.radios.map(radio => radio.deactivate());
	}

	render() {
		const { template, name } = this.options;

		this.options.tagger.forEach(tag => {
			this.rootElement.insertAdjacentHTML('beforeend', template(tag.label, tag.value, name));
		});
	}
}
