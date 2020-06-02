import { toHaveClass } from '@testing-library/jest-dom/matchers';
import { select } from '../utils';

expect.extend({ toHaveClass });

document.body.innerHTML = '<div id="target" tabindex="-1"></div>';

const $target = document.getElementById('target');

test('the function select should add the is-selected class to the target', () => {
	select($target);

	expect($target).toHaveClass('is-selected');
});
