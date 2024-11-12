import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | add-candidate', function (hooks) {
  setupRenderingTest(hooks);

  // Use a different name every time to prevent name duplicates.
  const expectedName = 'Test Name ' + Math.random();

  test('it adds a candidate', async function (assert) {
    let onAddedTestRan = false;
    this.set('onAddedTest', (actual) => {
      assert.equal(actual.name, expectedName);
      onAddedTestRan = true;
    });

    await render(hbs`<AddCandidate @onAdded={{this.onAddedTest}}/>`);

    await fillIn('input[type=text]', expectedName);
    await fillIn('input[type=number]', 39);
    await click('button[type=submit]');
    await new Promise((r) => setTimeout(r, 10)); // Give it a sec to run onAddedTest

    // This works in the browser (localhost:4200/tests) but fails on CLI (`make test`) because there is no backend.
    // TODO: Change the adapter for the test environment (it will also prevent adding test data to the real DB).
    assert.equal(onAddedTestRan, true);
  });
});
