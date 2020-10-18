# @19h47/radiogroup

## Install

```bash
yarn add @19h47/radiogroup
```

## Usage

### HTML

```html
<div role="radiogroup">
	<div aria-checked="true" tabindex="0" role="radio">
		<span>Option 1</span>
		<input
			id="option_1"
			type="radio"
			name="option"
			value="option_1"
			checked
			style="display: none;"
		/>
	</div>

	<div aria-checked="false" tabindex="-1" role="radio">
		<span>Option 2</span>
		<input type="radio" id="option_2" name="option" value="option_2" style="display: none;" />
	</div>
</div>
```

### JavaScript

```javascript
import RadioGroup from '@19h47/radiogroup';

const $element = document.querySelector('[role="radiogroup"]');
const radiogroup = new RadioGroup($element);

radiogroup.init();
```

## Keyboard Support

| Key        | Function                                                                                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tab        | <ul><li>Moves keyboard focus to the checked `radio` button in a radiogroup.</li><li>If no `radio` button is checked, focus moves to the first radio button in the group.</li></ul> |
| Down arrow | <ul><li>Moves focus to next `radio` button in the group.</li><li>If focus is on the last `radio` button in the group, move focus to the first radio button.</li></ul>              |
| Home       | Move to first input.                                                                                                                                                               |
| Up arrow   | <ul><li>Moves focus to previous `radio` button in the group.</li><li>If focus is on the first `radio` button in the group, move focus to the last radio button.</li></ul>          |
| End        | Move to last input.                                                                                                                                                                |
| Space      | If the radio button with focus is unchecked, it's state will be changed to checked.                                                                                                |

## ARIA Roles, Properties and States

| Role            | Property/State | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| radiogroup      |                | <ul><li>The `role="radiogroup"` attribute identifies the `div` element as a container for a group of `radio` buttons.</li><li>The descendent `radio` buttons are considered part of the group.</li><li>The accessible name comes the `aria-labelledby` attribute, which points to the element that contains the label text.</li><li>The `radiogroup` widget does not need a `tabindex` value, since the `ul[role"radiogroup"]` element never receives keyboard focus.</li></ul> |
| radio           | aria-checked   | Indicate state of radio:<br><ul><li>Checked (e.g. aria-checked=true)</li><li>Unchecked (e.g. aria-checked=false)</li></ul>                                                                                                                                                                                                                                                                                                                                                      |
| aria-labelledby |                | Used to identify radio group                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

## Events

| Event            | Arguments | Description                                                   |
| ---------------- | --------- | ------------------------------------------------------------- |
| Radio.activate   | event     | Return an object containing current element and current value |
| Radio.deactivate | event     | Return an object containing current element and current value |

```javascript

import RadioGroup from '@19h47/radiogroup';

const $element = document.querySelector('[role="radiogroup"]');
const radiogroup = new RadioGroup($element);

radiogroup.init();


radiogroup.radios.forEach(radio => {
	radio.on('Radio.activate', ({ element, value }) => {
		console.log(element, value);
	}

	radio.on('Radio.deactivate', ({ element, value }) => {
		console.log(element, value);
	}
}

```

## Options

| Option   | Type     | Default    | description |
| -------- | -------- | ---------- | ----------- |
| tagger   | array    | `[]`       |             |
| template | function | `() => {}` |             |
| name     | string   | `''`       |             |

## RadioGroup Methods

| Method      | Description | Arguments |
| ----------- | ----------- | --------- |
| `init()`    |             |           |
| `destroy()` |             |           |

## Radio Methods

| Method         | Description | Arguments |
| -------------- | ----------- | --------- |
| `activate()`   |             |           |
| `deactivate()` |             |           |
| `destroy()`    |             |           |

## Test

```bash
yarn test
```

## Build Setup

```bash

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn start

# build for development
$ yarn dev

# build for production
$ yarn prod

```

## References

-   [Aleh Zasypkin](https://github.com/azasypkin/event-dispatcher) for its Event Dispatcher
-   [Radio Button Example](https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/radio-1.html)
