import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AddCandidateComponent extends Component {
  @service store;

  @tracked candidate = this.store.createRecord('candidate');
  @tracked error = null;

  @action
  async save(event) {
    event.preventDefault();

    try {
      await this.candidate.save();
      this.error = null;
      this.args.onAdded();
    } catch (e) {
      this.error = (e.errors && e.errors[0]?.title) ?? 'Unknown error';
    }
  }

  @action
  cancel() {
    this.args.onCancel();
    this.error = null;
  }
}
