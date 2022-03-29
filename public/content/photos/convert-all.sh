#! /bin/bash

for file in ../../../.photos/*.jpg
do
echo $file
convert $file -quality 75 -resize 1920x1920\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".jpeg
convert $file -quality 75 -resize 1920x1920\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".webp
convert $file -quality 75 -resize 320x320\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".thumb.sd.jpeg
convert $file -quality 75 -resize 320x320\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".thumb.sd.webp
convert $file -quality 75 -resize 480x480\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".thumb.hd.jpeg
convert $file -quality 75 -resize 480x480\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".thumb.hd.webp
convert $file -quality 75 -resize 720x720\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".thumb.lg.jpeg
convert $file -quality 75 -resize 720x720\> "$(echo $(basename $file) |sed 's/\.jpg$//g')".thumb.lg.webp
done