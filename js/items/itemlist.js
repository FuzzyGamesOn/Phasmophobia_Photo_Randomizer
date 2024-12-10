class ItemList {
  items = [];
  unlocked_items = [];
  recent_unlocked_names = [];

  $container = $("#item_list ul");
  $template;

  constructor() {
    let template_selector = "li.item.template";

    this.$template = $(template_selector).clone();
    this.$template.removeClass("template");

    $(template_selector).remove();
  }

  add_item(item_object) {
    this.items.push(item_object);
  }

  unlock_item(item_name) {
    if (this.items.length == 0) return;
    if (this.items.map((i) => i.name).indexOf(item_name) == -1) return;

    for (let index in this.items) {
      if (this.items[index].name != item_name) continue;

      let chosen_item = this.items.splice(index, 1)[0];
      this.unlocked_items.push(chosen_item);

      if (chosen_item.name != "Photo Camera" && !(chosen_item.name == "Flashlight" && player_options.get("Always Start With Flashlight"))) {
        this.recent_unlocked_names.push(chosen_item.name);
      }

      break;
    }

    this.render();
  }

  unlock_random_item(quantity = 1) {
    let valid_items = this.items.filter((i) => player_options.get(PREFIX_INCLUDE_ITEM + i.name));

    for (let x = 0; x < quantity; x++) {
      if (valid_items.length == 0) break;

      let random_index = (new Random(valid_items.length)).next();
      let chosen_item = valid_items.splice(random_index, 1)[0];
      let items_index = this.items.findIndex((i) => i.name == chosen_item.name);

      // remove the item from the items list as well
      this.items.splice(items_index, 1);

      this.unlocked_items.push(chosen_item);
      this.recent_unlocked_names.push(chosen_item.name);
    }

    this.render();
  }

  render() {
    let all_items = this.items.concat(this.unlocked_items);
    let unlocked_item_names = this.unlocked_items.map((i) => i.name);

    all_items.sort((a, b) => {
      if (a.name == b.name) return 0;

      return (a.name > b.name) ? 1 : -1;
    });

    this.$container.empty();

    for (let item of all_items) {
      if (!player_options.get(PREFIX_INCLUDE_ITEM + item.name)) continue;
      if (player_options.get("Hide Items That Are Not Unlocked") && unlocked_item_names.indexOf(item.name) == -1) continue;

      let $new_listing = this.$template.clone();

      $new_listing.html(item.name);
      $new_listing.addClass(item.name.replace(" ", "-").toLowerCase());

      if (unlocked_item_names.indexOf(item.name) == -1) $new_listing.addClass("exhausted");
      else if (this.recent_unlocked_names.indexOf(item.name) != -1) $new_listing.addClass("new");

      this.$container.append($new_listing);
    }

    this.recent_unlocked_names = [];
  }

  reset() {
    this.items = this.items.concat(this.unlocked_items);
    this.unlocked_items = [];
    this.recent_unlocked_names = [];

    this.render();
  }
}


