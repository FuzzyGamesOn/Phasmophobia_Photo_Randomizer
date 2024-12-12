class Random {
  max = 0;

  /* @fn (max: int) */
  constructor(max) {
    this.max = max;
  }

  /* @fn () -> int */
  next() {
    return Math.floor(Math.random() * this.max);
  }
}


