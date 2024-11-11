import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CandidatesController extends Controller {
  @tracked showAddForm = false;

  @action
  candidateAdded() {
    this.showAddForm = false;
    this.send('refreshModel');
  }

  @action
  toggleAddNew() {
    this.showAddForm = !this.showAddForm;
  }
}
