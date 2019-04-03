# @19h47/radios

## HTML

```html

<div class="js-radios" role="radiogroup">
	<div class="js-radio" aria-checked="false" tabindex="0" role="radio">
		<span>Option 1</span>
		<input type="radio" id="option_1" name="option" value="option_1" checked style="display: none;">
	</div>

	<div class="js-radio" tabindex="0" role="radio">
		<span>Option 2</span>
		<input type="radio" id="option_2" name="option" value="option_2" style="display: none;">
	</div>
</div>

```

## JavaScript

```javascript

const element = document.querySelector('.js-radios');
const radios = new Radios(element);

radios.init();

```
