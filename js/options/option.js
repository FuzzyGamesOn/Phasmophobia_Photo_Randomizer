class Option {
  name = ""
  value = ""

  constructor(name, value) {
    this.name = name;
    this.value = value; // intentionally not using set_value in case we add "after init" logic to set_value
  }

  set_value(value) {
    this.value = value;
  }
}
