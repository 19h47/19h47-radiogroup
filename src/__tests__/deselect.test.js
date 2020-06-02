import { toHaveClass } from '@testing-library/jest-dom/matchers';
import { deselect } from '../utils';

expect.extend({ toHaveClass });

document.body.innerHTML = '<div id="target" tabindex="-1"></div>';

const $target = document.getElementById('target');

test('the function deselect should remove the is-selected class to the target', () => {
	$target.classList.add('is-selected');

	deselect($target);

	expect($target).not.toHaveClass('is-selected');
});
