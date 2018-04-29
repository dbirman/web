import csv
import json

csvfile = open('images/ss/ss.csv', 'r')
jsonfile = open('images/ss/ss.js', 'w')

fieldnames = ("names","imgs","coordsY","coordsX","alt")
data = dict()
for field in fieldnames:
	data[field] = []

reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
	# print(row)
	for field in fieldnames:
		data[field].append(row[field])
	# print(data)

jsonfile.write('var info = ')
json.dump(data, jsonfile)
jsonfile.write('\n')

# now write the xml file 

smapfile = open('sitemap.xml','w')

smapfile.write('<?xml version="1.0" encoding="UTF-8"?>\n')
smapfile.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n')
smapfile.write('<url>\n')
smapfile.write('\t<loc>https://danbirman.com/index.html</loc>\n')
# todo here
imgs = data["imgs"]
alts = data["alt"]
for img, alt in zip(imgs, alts):
	smapfile.write('\t<image:image>\n')
	smapfile.write('\t\t<image:loc>https://danbirman.com/images/ss/'+img+'.jpg</image:loc>\n')
	if alt is not None:
		smapfile.write('\t\t<image:caption>'+alt+'</image:caption>\n')
	smapfile.write('\t</image:image>\n')
smapfile.write('</url>\n')
smapfile.write('</urlset>')


  # <image:image>
  #   <image:loc>https://danbirman.com/images/ss/eastpost_spire.jpg</image:loc>
  #   <image:caption></image:caption>
  # </image:image>