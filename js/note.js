export class Note {
  constructor() {
    this.status = false;
  }

  get_status() {
    return this.status;
  }

  change_status() {
    this.status = !this.status;
  }
}
