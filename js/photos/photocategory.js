class PhotoCategory {
  name = "";
  current_photos = 0;
  max_photos = 0;
  item_unlocks_per_photo = 0;

  /* @fn (name: string) */
  constructor(name) {
    this.name = name;

    this.update_from_settings();
  }

  increment() {
    this.current_photos = clamp(this.current_photos + 1, 0, this.max_photos);
  }

  decrement() {
    this.current_photos = clamp(this.current_photos - 1, 0, this.max_photos);
  }

  reset() {
    this.current_photos = 0;
    this.update_from_settings();
  }

  update_from_settings() {
    this.max_photos = player_options.get(PREFIX_MAX_PHOTOS + this.name) || 0;
    this.item_unlocks_per_photo = player_options.get(PREFIX_ITEMS_PER_PHOTO + this.name) || 0;
  }
}

