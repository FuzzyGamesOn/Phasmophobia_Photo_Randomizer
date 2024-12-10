/* item_names, photo_types, options_definitions, etc. are defined in lists.js */
let options = [];

for (let option_name in option_definitions) {
  let new_option = new Option(option_name, option_definitions[option_name]);

  options.push(new_option);
}

/* window is implied, but specifying to indicate that these are intentionally global */
window.player_options = new PlayerOptions(options, "{}");
window.item_list = new ItemList();
window.photo_categories = new PhotoCategories();

for (let name of item_names) {
  item_list.add_item(new Item(name));
}

function init() {
  item_list.unlock_item("Photo Camera"); // player always starts with Photo Camera, because how would you photo rando otherwise?!

  let starting_item_count = player_options.get("Starting Item Count") || 0;

  // if the player has the always flashlight option enabled, give them the flashlight but subtract it from any starting item count
  if (player_options.get("Always Start With Flashlight") && player_options.get(PREFIX_INCLUDE_ITEM + "Flashlight")) {
    item_list.unlock_item("Flashlight");
    starting_item_count--;
  }

  // if the player still has starting item count after maybe starting flashlight, give them those random items too
  if (starting_item_count > 0) {
    item_list.unlock_random_item(starting_item_count);
  }
}

for (let category of photo_types) {
  photo_categories.add_category(
    new PhotoCategory(
      category
    )
  );
}

init();
item_list.render();
photo_categories.render();

$('#btn_reset').on('click', () => {
  item_list.reset();
  photo_categories.reset();

  init();
});

$('#btn_settings').on('click', () => {
  $('#photo_categories').addClass('hidden');
  $('#settings_menu').removeClass('hidden');

  player_options.render();
});

$('#btn_settings_save').on('click', () => {
  player_options.save();

  $('#settings_menu').addClass('hidden');
  $('#photo_categories').removeClass('hidden');

  item_list.reset();
  photo_categories.reset();

  init();
});
