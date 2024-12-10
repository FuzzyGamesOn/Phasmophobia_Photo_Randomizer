class Random {
  max = 0;

  constructor(max) {
    this.max = max;
  }

  next() {
    return Math.floor(Math.random() * this.max);
  }
}


