#! /bin/bash

for file in ../../../.photos/$1.jpg
do
echo $file
convert $file -quality 75 -resize 1920x1920\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".jpeg
convert $file -quality 75 -resize 1920x1920\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".webp
convert $file -quality 75 -resize 480x480\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".thumb.jpeg
convert $file -quality 75 -resize 480x480\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".thumb.webp
done