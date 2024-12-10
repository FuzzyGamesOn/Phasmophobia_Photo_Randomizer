item_names = [
  "D.O.T.S. Projector",
  "EMF Reader",
  "Ghost Writing Book",
  "Spirit Box",
  "Thermometer",
  "UV Light",
  "Video Camera",
  "Flashlight",
  "Crucifix",
  "Firelight",
  "Head Gear",
  "Igniter",
  "Incense",
  "Motion Sensor",
  "Parabolic Microphone",
  "Photo Camera",
  "Salt",
  "Sanity Medication",
  "Sound Sensor",
  "Tripod"
];

photo_types = [
  "Ghost",
  "Bone",
  "Burned Crucifix",
  "Dirty Water",
  "Cursed Possession",
  "Dead Body",
  "Disturbed Salt",
  "Fingerprint",
  "Footprint",
  "Ghost Writing",
  "Interaction"
];

photo_types_maximums = {
  "Burned Crucifix": 2,
  "Disturbed Salt": 2,
  "Fingerprint": 2,
  "Ghost Writing": 2,
  "Interaction": 2
};

for (let photo_type of photo_types) {
  if (!(photo_type in Object.keys(photo_types_maximums))) {
    photo_types_maximums[photo_type] = 1;
  }
}

photo_types_items_per_photo = {}

for (let photo_type of photo_types) {
  photo_types_items_per_photo[photo_type] = 1;
}

option_definitions = {
  "Starting Item Count": 0,
  "Always Start With Flashlight": true,
  "Hide Photo Categories With No Photos Available": true,
  "Hide Items That Are Not Unlocked": false
};

for (let photo_type of photo_types) {
  option_definitions[PREFIX_MAX_PHOTOS + photo_type] = photo_types_maximums[photo_type] || 0;
  option_definitions[PREFIX_ITEMS_PER_PHOTO + photo_type] = photo_types_items_per_photo[photo_type] || 1;
}

for (let item_name of item_names) {
  option_definitions[PREFIX_INCLUDE_ITEM + item_name] = true;
}

