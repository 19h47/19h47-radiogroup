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


/**
 * Class Radios
 *
 * @param {obj} element DOM element.
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class RadioGroup {
	constructor(element) {
		this.rootElement = element;
		this.elements = [...this.rootElement.querySelectorAll('[role=radio]')];
		this.radios = [];
		this.current = 0;

		//
		this.onKeyDown = this.onKeyDown.bind(this);
		this.deactivateAll = this.deactivateAll.bind(this);
	}

	init() {
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
		this.radios.map(radio => {
			radio.on('Radio.activate', this.deactivateAll);
			// radio.on('Radio.deactivate', () => {});

			return true;
		});

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
			event.stopPropagation();
		};

		const previous = () => {
			this.current = 0 > this.current - 1 ? this.radios.length - 1 : this.current - 1;

			this.deactivateAll();
			this.radios[this.current].activate();

			event.preventDefault();
			event.stopPropagation();
		};

		const first = () => {
			this.deactivateAll();
			this.radios[0].activate();

			event.preventDefault();
			event.stopPropagation();
		};

		const last = () => {
			this.deactivateAll();
			this.radios[this.radios.length - 1].activate();

			event.preventDefault();
			event.stopPropagation();
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
}
