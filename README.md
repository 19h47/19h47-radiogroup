# @19h47/radios


## Usage

### HTML

```html

<div class="js-radios" role="radiogroup">
	<div class="js-radio" aria-checked="true" tabindex="0" role="radio">
		<span>Option 1</span>
		<input type="radio" id="option_1" name="option" value="option_1" checked style="display: none;">
	</div>

	<div class="js-radio" aria-checked="false" tabindex="-1" role="radio">
		<span>Option 2</span>
		<input type="radio" id="option_2" name="option" value="option_2" style="display: none;">
	</div>
</div>

```

### JavaScript

```javascript

const element = document.querySelector('.js-radios');
const radios = new Radios(element);

radios.init();

```

#### With events

```javascript

import Radios from '@19h47/radios';

const element = document.querySelector('.js-radios');
const radios = new Radios(element);

radios.inputs.map(input => {
	input.addEventListener('Radio.activate', event => {
		const { detail: { element } } = event;

		console.log(item);
	});
});

```

## Keyboard Support

| Key   | Function                            |
| ----- | ----------------------------------- |
| Tab   | Moves keyboard focus to radiogroup. |
| Arrow | Moves up and down radio options.    |
| Home  | Move to first input.                |
| End   | Move to last input.                 |

## ARIA Roles, Properties and States

| Role            | Property/State | Usage |
| --------------- | -------------- | ----- |
| Radiogroup      |                | Identify div as a container for radios |
| Radio           | aria-checked   | Indicate state of radio:<br>- Checked (e.g. aria-checked=true)<br>- Unchecked (e.g. aria-checked=false) |
| aria-labelledby |                | Used to identify radio group |

## Events

| Event          | Arguments | Description |
| -------------- | --------- | ----------- |
| Radio.activate | event     |             |

