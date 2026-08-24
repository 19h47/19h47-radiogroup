# @19h47/radiogroup

Vanilla enhancer for the [WAI-ARIA Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/). You write `role="radiogroup"` / `role="radio"`; the script keeps exclusive selection, keyboard support, and attributes in sync.

Markup is the source of truth. If a native `<fieldset>` and `input type="radio"` cover the case — including cards or ratings styled with `:has()` and `appearance` — do not install this library.

## When to use

- The group is already APG markup, with no native input (CMS, existing HTML, widget outside a form).
- The control is app chrome: composite cells, disabled options in the middle, live UI around the group. Native radios would break the layout or the keyboard path.
- You want that pattern in vanilla JS, without a framework a11y kit.

## When not to use

- Exclusive choice in a form: use native radios. The browser already does arrows, tab, `required`, and `FormData`.
- Custom look is not a reason to switch. A visually hidden radio inside a `<label>`, plus CSS, is enough.
- `tagger` / `template` only inject HTML. They are not an accessibility feature.

## Installation

```bash
pnpm add @19h47/radiogroup
```

Also works with `npm` / `yarn` / `bun`.

## Usage

The HTML declares the group, the checked radio, and the tab stop. JavaScript reads that state and keeps it in sync after interaction. A native `input[type="radio"]` is optional, and only useful when the APG radios must also submit with a form.

```html
<div role="radiogroup" aria-labelledby="option-label">
	<h2 id="option-label">Options</h2>

	<div aria-checked="true" tabindex="0" role="radio">Option 1</div>
	<div aria-checked="false" tabindex="-1" role="radio">Option 2</div>
</div>
```

```ts
import RadioGroup from '@19h47/radiogroup';

const $element = document.querySelector('[role="radiogroup"]');
const radiogroup = new RadioGroup($element);

radiogroup.init();
```

## Keyboard Support

| Key | Function |
| --- | --- |
| Tab / Shift+Tab | Moves focus into or out of the group. Focus lands on the checked radio, or the first radio if none is checked. |
| Space | Checks the focused radio if it is not already checked. |
| Down / Right | Moves focus to the next radio, unchecks the previous one, and checks the newly focused radio. Wraps from last to first. |
| Up / Left | Moves focus to the previous radio, unchecks the previous one, and checks the newly focused radio. Wraps from first to last. |
| Home | Moves focus to the first enabled radio and checks it. |
| End | Moves focus to the last enabled radio and checks it. |

Tab order comes from the markup (`tabindex="0"` on one radio, `tabindex="-1"` on the others). The script updates those attributes when the selection changes.

## ARIA Roles, Properties and States

| Role / attribute | Usage |
| --- | --- |
| `role="radiogroup"` | Container for the radios. Not focusable. Give it an accessible name with `aria-labelledby` or `aria-label`. |
| `role="radio"` | Each option. Labelled by its content, `aria-labelledby`, or `aria-label`. |
| `aria-checked` | `"true"` on the checked radio, `"false"` on the others. |
| `tabindex` | `"0"` on the current radio, `"-1"` on the others (roving tabindex). |

If you add a native `input[type="radio"]` for form submit, hide it from the accessibility tree (`display: none` or equivalent) so AT only sees the ARIA radios.

## Events

| Event | Description |
| --- | --- |
| `Radio.activate` | Fired on the radio. `detail` has `element` (the `[role="radio"]`) and `value` (from the optional input). |
| `Radio.deactivate` | Same shape, when a radio is unchecked. |

```js
import RadioGroup from '@19h47/radiogroup';

const $element = document.querySelector('[role="radiogroup"]');
const radiogroup = new RadioGroup($element);

radiogroup.init();

radiogroup.radios.forEach(radio => {
	radio.$el.addEventListener('Radio.activate', ({ detail }) => {
		console.log(detail.element, detail.value);
	});

	radio.$el.addEventListener('Radio.deactivate', ({ detail }) => {
		console.log(detail.element, detail.value);
	});
});
```

## Types

The package ships declaration files. `RadioGroup` is the default export; `Radio`, `Options`, `Tag`, `Template`, and `RadioEventDetail` are named type exports.

```ts
import RadioGroup, { type Options, type Radio, type Tag } from '@19h47/radiogroup';
```

## Options

Optional helpers to append radios from data. They do not replace writing the markup yourself.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `tagger` | `array` | `[]` | List of `{ label, value, selected }` passed to `template`. |
| `template` | `function` | `() => ''` | `(label, value, selected, name) => html` |
| `name` | `string` | `''` | Passed to `template` as the native input `name`. |

## RadioGroup

| | Description |
| --- | --- |
| `$el` | Root `[role="radiogroup"]` |
| `radios` | `Radio` instances |
| `current` | Index of the current radio among the enabled ones |
| `init()` | Bind radios and events |
| `destroy()` | Remove listeners |
| `deactivateAll()` | Uncheck every radio |

## Radio

| | Description |
| --- | --- |
| `$el` | The `[role="radio"]` element |
| `$input` | Nested `input[type="radio"]`, or `null` |
| `activate(shouldFocus = true)` | Check the radio |
| `deactivate()` | Uncheck the radio |
| `enable()` / `disable()` | Toggle `aria-disabled` and the native input |
| `destroy()` | Remove listeners |

## Development

```bash
pnpm install
pnpm dev      # Vite playground
pnpm build    # library build → dist/ (JS + .d.ts)
```

## Demo

Live example: [19h47.github.io/19h47-radiogroup](https://19h47.github.io/19h47-radiogroup/) · [source](./docs/index.html)

## References

- [Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
