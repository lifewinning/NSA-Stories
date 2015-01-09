#dependencies!
from bs4 import BeautifulSoup
import urllib
import csv

output = csv.writer(open('intercept-survey.csv', 'w')) #output csv for later use
output.writerow(["file_url", "title"]) # Write column headers as the first line

file = open("index.html")
soup = BeautifulSoup(file)

for h2 in soup.find_all('h2'):
    for link in h2.find_all('a'): 
        f = link.get('href')
        t = link.get('title').encode('utf-8')
        print "link: " + f + " ..."
    output.writerow([f,t])
print "found all the links"