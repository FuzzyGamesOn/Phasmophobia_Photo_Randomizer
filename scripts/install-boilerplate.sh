#!/bin/bash

if [ $(pwd | grep "scripts") ]; then
    echo "This script is meant to be executed from the project root. Exiting."
    exit 1
fi

wget -O bp.zip https://github.com/h5bp/html5-boilerplate/releases/download/v9.0.0/html5-boilerplate_v9.0.0.zip
unzip -o bp.zip
rm -rf bp.zip
rm -rf LICENSE.txt
