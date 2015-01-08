from bs4 import BeautifulSoup
import urllib
import csv

output = csv.writer(open('intercept-document-citation-add-titles.csv', 'w')) #output csv for later use
output.writerow(["file_url", "title", "date", "article_title","article_url","publication","description"]) # Write column headers as the first line

matches = open('../csvs/intercept-document-citations.csv','rU')
m = csv.DictReader(matches)

for row in m:
	url = urllib.urlopen(row['file_url'])
	soup = BeautifulSoup(url)

	for h1 in soup.find_all('h1', {"class":"title"}):
	    t = h1.string.encode('utf-8')
	    print "getting header: " + t + " ..."
	    output.writerow([row['file_url'],t, row['date'],row['title'],row['article_url'],row['publication'],row['description']])
	   

print "cool here are some links"