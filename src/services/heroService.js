export default class HeroService {
  constructor({ heroRepository }) {
    this.repository = heroRepository;
  }

  find() {
    return this.repository.find();
  }

  create(data) {
    return this.repository.create(data);
  }
}
