# @19h47/radiogroup

## Usage

### HTML

```html
<div class="js-radiogroup" role="radiogroup">
	<div aria-checked="true" tabindex="0" role="radio">
		<span>Option 1</span>
		<input
			type="radio"
			id="option_1"
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

const element = document.querySelector('.js-radiogroup');
const radiogroup = new RadioGroup(element);

radiogroup.init();
```

#### With events

```javascript
import RadioGroup from '@19h47/radiogroup';

const element = document.querySelector('.js-radiogroup');
const radiogroup = new RadioGroup(element);

radiogroup.init();

radiogroup.radios.map(radio => {
	radio.on('Radio.activate', item => console.log(item));
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

| Role            | Property/State | Usage                                                                                                   |
| --------------- | -------------- | ------------------------------------------------------------------------------------------------------- |
| Radiogroup      |                | Identify div as a container for radios                                                                  |
| Radio           | aria-checked   | Indicate state of radio:<br>- Checked (e.g. aria-checked=true)<br>- Unchecked (e.g. aria-checked=false) |
| aria-labelledby |                | Used to identify radio group                                                                            |

## Events

| Event          | Arguments | Description                       |
| -------------- | --------- | --------------------------------- |
| Radio.activate | item      | Return the current activate input |

## Options

| Option   | Type     | Default    | description |
| -------- | -------- | ---------- | ----------- |
| tagger   | array    | `[]`       |             |
| template | function | `() => {}` |             |
| name     | string   | `''`       |             |

## Test

```bash
yarn test
```

## Acknowledgement

-   [Aleh Zasypkin](https://github.com/azasypkin/event-dispatcher) for its Event Dispatcher
