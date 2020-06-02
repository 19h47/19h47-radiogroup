import { toHaveClass, toHaveFocus } from '@testing-library/jest-dom/matchers';
import { blur } from '../utils';

expect.extend({ toHaveClass, toHaveFocus });

document.body.innerHTML = '<div class="is-focus" id="target" tabindex="-1"></div>';

const $target = document.getElementById('target');
$target.focus();

test('the function blur should remove the is-focus class to the target', () => {
	blur($target);

	expect($target).not.toHaveClass('is-focus');
});

test('the function blur should blur the target', () => {
	blur($target);

	expect($target).not.toHaveFocus();
});
