class Event {
  constructor(company) {
    this.key = null;
    this.company = company;
    this.action = null;
    this.responsable = null;
    this.details = null;
    this.states = null;
    this.time = null;
  }

  buildEvent(action, responsable, details, state) {
    this.key = this.generateKey();
    this.action = action;
    this.responsable = responsable;
    this.details = details;
    this.states = state;

    let timer = new Date();
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(timer);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(timer);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(timer);

    this.time = `${day}/${month}/${year} 
                ${timer.getHours()}:${timer.getMinutes()}:${timer.getSeconds()}`;
  }

  generateKey() {
    let mask = 'abcdefghijklmnopqrstuvwxyz';
    mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    mask += '0123456789';
    let generated_key = '';

    for (var i = 12; i > 0; --i)
      generated_key += mask[Math.floor(Math.random() * mask.length)];
    return generated_key;
  }
}

module.exports = Event;
