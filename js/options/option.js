class Option {
  name = ""
  value = ""

  /* @fn (name: string, value: int | bool) */
  constructor(name, value) {
    this.name = name;
    this.value = value; // intentionally not using set_value in case we add "after init" logic to set_value
  }

  /* @fn (value: int | bool) */
  set_value(value) {
    this.value = value;
  }
}
