import { toHaveClass, toHaveFocus } from '@testing-library/jest-dom/matchers';
import { focus } from '../utils';

expect.extend({ toHaveClass, toHaveFocus });

document.body.innerHTML = '<div id="target" tabindex="-1"></div>';

const $target = document.getElementById('target');
$target.blur();

test('the function focus should add the is-focus class to the target', () => {
	focus($target);

	expect($target).toHaveClass('is-focus');
});

test('the function focus should focus the target', () => {
	focus($target);

	expect($target).toHaveFocus();
});
