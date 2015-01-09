from bs4 import BeautifulSoup
import urllib
import csv

output = csv.writer(open('data-with-script.csv', 'w')) #output csv for later use
output.writerow(["file_url", "title", "date", "article_title","article_url","publication","description", "divID"]) # Write column headers as the first line

matches = open('../csvs/intercept-document-citations.csv','rU')
m = csv.DictReader(matches)

for row in m:
    url = urllib.urlopen(row['file_url'])
    soup = BeautifulSoup(url)
    for div in soup.find_all("div", {"class":"ti-body"}):
        c = div.find_all("div", {"class": "document-cloud-container gutter nomob"})
        cid = c[0]['id']
    for h1 in soup.find_all('h1', {"class":"title"}):
        t = h1.string.encode('utf-8')
        print "getting header: " + t + " ..."
    output.writerow([row['file_url'],t, row['date'],row['title'],row['article_url'],row['publication'],row['description'], cid])  
print "awesome you got the things awesome!"