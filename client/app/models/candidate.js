import Model, { attr } from '@ember-data/model';

export default class CandidateModel extends Model {
  @attr('string') name;
  @attr('number') age;
}
