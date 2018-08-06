Code for danbirman.com

## Brain

The brain is an svg file (images/brain.svg) which is copied into index.html and then tagged with ID flags so that the code can create effects like the flashing dots. The brain is a bit heavy on DOM as its made up of some 3000 individual vector graphics, but modern browsers seem not to really care too much. 

## Panels

The individual panels are invisible on page load and all the content loading for the panels (especially the images!) is deferred by a script in the header. This lets the page load very quickly with minimal footprint and then lets the rest of the images load on their own time. You could also just not load the images at all until the panels open but with the total page size at barely 900 kB this didn't seem worth it.

## Summit selfies

I'm using Mapbox (https://www.mapbox.com/) which has been excellent for this purpose. The mapbox CSS is copied into my directory so that there aren't redundant calls. I use some custom code to display images on hover and the images have to be very strongly scaled down to function properly. 

When adding images to the folder images/ss/ the csv file needs to be updated. Running the csv2json.py script converts the csv file to a JSON file more easily readable in javascript and also generates a sitemap file, although for some reason google refuses to index my sitemap. 

## Todo

Things I would still like to add:
 - I need a mobile brain where the text is vertically offset instead of horizontally, it's a pain right now to click on the brain to open the panels.
 - Also for mobile: the panels should deal with grid layouts better, maybe using bootstrap or something else? But that would add a lot of overhead.
 - Sometimes images in the summit selfies load rotated... no idea why that happens!
 - Right now the page is pretty hard to edit, especially if I needed to do something drastic like add a new brain area. Making it more modular would be a smart move.
