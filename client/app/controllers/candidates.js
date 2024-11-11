import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CandidatesController extends Controller {
  @service store;

  @tracked showNewForm = false;
  @tracked newName = null;
  @tracked newAge = null;

  @tracked errorMessage = null;
  @tracked successMessage = null;

  @action
  addNew() {
    this.showNewForm = true;
    this.errorMessage = null;
    this.successMessage = null;
  }

  @action
  async saveNew(event) {
    event.preventDefault();

    const candidate = this.store.createRecord('candidate', {
      name: this.newName,
      age: this.newAge,
    });

    try {
      await candidate.save();
      this.resetNewForm();
      this.errorMessage = null;
      this.successMessage = `Candidate "${candidate.name}" added successfully`;
      setTimeout(() => (this.successMessage = null), 2000);
    } catch (e) {
      this.successMessage = null;
      this.errorMessage = (e.errors && e.errors[0]?.title) ?? 'Unknown error';
    }
    await this.send('refreshModel');
  }

  @action
  cancelNew() {
    this.resetNewForm();
    this.errorMessage = null;
    this.successMessage = null;
  }

  resetNewForm() {
    this.showNewForm = false;
    this.newName = null;
    this.newAge = null;
  }
}
