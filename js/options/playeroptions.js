class PlayerOptions {
  options = {};
  save_content = "";

  $container_max_photos = $("#options_max_photos");
  $container_per_photo = $("#options_per_photo");
  $container_include_item = $("#options_included_items");
  $template_max_photos;
  $template_per_photo;
  $template_include_item;

  constructor(options) {
    for (let option of options) {
      this.options[option.name] = option;
    }

    this.process_options_from_save();

    this.$template_max_photos = this.$container_max_photos.find(".template").clone();
    this.$template_per_photo = this.$container_per_photo.find(".template").clone();
    this.$template_include_item = this.$container_include_item.find(".template").clone();
  }

  process_options_from_save() {
    let saved_options = JSON.parse(localStorage.getItem('options'));

    if (!saved_options) return;

    for (let option_name of Object.keys(saved_options)) {
      if (Object.keys(this.options).indexOf(option_name) != -1) {
        this.options[option_name].set_value(saved_options[option_name].value);
      }
    }
  }

  process_options_to_save() {
    let options_data = JSON.stringify(this.options);

    localStorage.setItem('options', options_data);
  }

  get(option_name) {
    return this.options[option_name].value;
  }

  set(option_name, val) {
    if (!option_name) return;

    this.options[option_name].value = val;
  }

  render() {
    let options_max_photo = Object.values(this.options).filter((o) => o.name.includes(PREFIX_MAX_PHOTOS));
    let options_per_photo = Object.values(this.options).filter((o) => o.name.includes(PREFIX_ITEMS_PER_PHOTO));
    let options_include_item = Object.values(this.options).filter((o) => o.name.includes(PREFIX_INCLUDE_ITEM));

    options_max_photo.sort((a, b) => {
      if (a.name == b.name) return 0;

      return (a.name > b.name) ? 1 : -1;
    });

    options_per_photo.sort((a, b) => {
      if (a.name == b.name) return 0;

      return (a.name > b.name) ? 1 : -1;
    });

    options_include_item.sort((a, b) => {
      if (a.name == b.name) return 0;

      return (a.name > b.name) ? 1 : -1;
    });

    this.$container_max_photos.empty();
    this.$container_per_photo.empty();
    this.$container_include_item.empty();

    for (let option of options_max_photo) {
      let $new_setting = this.$template_max_photos.clone();
      $new_setting.find("label")
        .html(option.name.replace(PREFIX_MAX_PHOTOS, ""));
      $new_setting.find("input")
        .attr('name', option.name.replace(/\s+/g, '-').toLowerCase())
        .val(this.get(option.name))
        .data("option_name", option.name);

      $new_setting.removeClass("template");
      this.$container_max_photos.append($new_setting);
    }

    for (let option of options_per_photo) {
      let $new_setting = this.$template_per_photo.clone();
      $new_setting.find("label")
        .html(option.name.replace(PREFIX_ITEMS_PER_PHOTO, ""));
      $new_setting.find("input")
        .attr('name', option.name.replace(/\s+/g, '-').toLowerCase())
        .val(this.get(option.name))
        .data("option_name", option.name);

      $new_setting.removeClass("template");
      this.$container_per_photo.append($new_setting);
    }

    for (let option of options_include_item) {
      let $new_setting = this.$template_include_item.clone();
      $new_setting.find("label")
        .html(option.name.replace(PREFIX_INCLUDE_ITEM, ""));
      $new_setting.find("input")
        .attr('name', option.name.replace(/\s+/g, '-').toLowerCase())
        .data("option_name", option.name);

      // don't give them the option to disable photo camera in a photo randomizer
      if ($new_setting.find("label").html() == "Photo Camera") continue;

      if (this.get(option.name)) {
        $new_setting.find("input").prop("checked", "checked");
      }

      $new_setting.removeClass("template");
      this.$container_include_item.append($new_setting);
    }

    /* now, set the general options that aren't iterated over above */
    let $settings = $('#settings_menu');

    $settings.find("input[name='starting_items']").val(this.get("Starting Item Count")).data("option_name", "Starting Item Count");

    let $flashlight = $settings.find("input[name='start_with_flashlight']");
    let $hide_no_photo = $settings.find("input[name='hide_categories_with_no_photos']");
    let $hide_not_unlock = $settings.find("input[name='hide_non_unlocked_items']");

    $flashlight.data("option_name", "Always Start With Flashlight");
    $hide_no_photo.data("option_name", "Hide Photo Categories With No Photos Available");
    $hide_not_unlock.data("option_name", "Hide Items That Are Not Unlocked");

    if (this.get("Always Start With Flashlight")) {
      $flashlight.prop("checked", "checked");
    }
    else {
      $flashlight.removeAttr("checked");
    }

    if (this.get("Hide Photo Categories With No Photos Available")) {
      $hide_no_photo.prop("checked", "checked");
    }
    else {
      $hide_no_photo.removeAttr('checked');
    }

    if (this.get("Hide Items That Are Not Unlocked")) {
      $hide_not_unlock.prop("checked", "checked");
    }
    else {
      $hide_not_unlock.removeAttr('checked');
    }
  }

  save() {
    let self = this;

    $('#settings_menu').find('input').each(function () {
      if (!$(this).data("option_name")) return;

      let option_value;

      if ($(this).attr('type') == 'checkbox') {
        option_value = $(this).is(":checked");
      }
      else {
        option_value = $(this).val();
      }

      self.set($(this).data("option_name"), option_value);
    });

    this.process_options_to_save();
  }
}
