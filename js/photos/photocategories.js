class PhotoCategories {
  categories = [];

  $container = $("#photo_objectives");
  $template;

  constructor() {
    let template_selector = "div.photo-objective.template";

    this.$template = $(template_selector).clone();
    this.$template.removeClass("template");

    $(template_selector).remove();
  }

  add_category(category_object) {
    this.categories.push(category_object);
  }

  render() {
    let self = this;

    this.$container.empty();

    for (let category of this.categories) {
      if (player_options.get("Hide Photo Categories With No Photos Available") && category.max_photos <= 0) {
        continue;
      }

      let $new_listing = this.$template.clone();

      $new_listing.find("h3").html(category.name);
      $new_listing.find("span.photo-current").html(category.current_photos);
      $new_listing.find("span.photo-max").html(category.max_photos);
      $new_listing.find("div.items-per-photo").html(category.item_unlocks_per_photo + (category.item_unlocks_per_photo == 1 ? ' item' : ' items'));
      $new_listing.addClass(category.name.replace(" ", "-").toLowerCase());

      if (category.current_photos >= category.max_photos) $new_listing.addClass("exhausted");

      $new_listing.on("contextmenu", (e) => {
        e.preventDefault();
      });
      $new_listing.on("mouseup", (e) => {
        switch (e.button) {
          case 0: // left mouse button
            category.increment();
            window.item_list.unlock_random_item(category.item_unlocks_per_photo);
            break;

          case 2: // right mouse button
            // not currently supported
            break;
        }

        if (e.button == 0) { // don't forget to add right mouse button here if supported
          self.render();
        }
      });

      this.$container.append($new_listing);
    }
  }

  reset() {
    for (let category of this.categories) {
      category.reset();
    }

    this.render();
  }
}

