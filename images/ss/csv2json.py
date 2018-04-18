import csv
import json

csvfile = open('ss.csv', 'r')
jsonfile = open('ss.js', 'w')

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