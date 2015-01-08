#dependencies!
from bs4 import BeautifulSoup
import urllib
import csv

output = csv.writer(open('incercept-document-citations.csv', 'w')) #output csv for later use
output.writerow(["file_url","link_title","date","title","article_url","publication", "description"]) # Write column headers as the first line
archive = open('nsa-archive.csv','rU') #read csv in
reader = csv.DictReader(archive)
bucket = set()
for row in reader:
    url = urllib.urlopen(row['url'])
    soup = BeautifulSoup(url)
    import re
    intercept = re.search('https://firstlook.org/theintercept/', row['url'])
    if intercept:
        print "searching "+ row['url']+" ..."
        #let's look for some meta tags
        ogdesc = soup.find_all('meta',attrs={"property":"og:description"})
        if ogdesc:
            d = ogdesc[0]['content'].encode('utf-8')
        # let's look for links to files
        pdf = ''
        for link in soup.find_all('a'):
            pdf = link.get('href')
            if pdf is None:
                continue
            if pdf not in bucket:
                if pdf.startswith('https://firstlook.org/theintercept/document/'):
                    u = link.contents[0].encode('utf-8')
                    f = pdf
                    print "document: "+ f
                    output.writerow([f, u,row['date'],row['title'],row['url'],row['publication'], d])
                    bucket.add(pdf)
                elif pdf.startswith('https://firstlook.org/theintercept/?'):
                    u = link.contents[0].encode('utf-8')
                    f = pdf
                    print "document: "+ f
                    output.writerow([f, u,row['date'],row['title'],row['url'],row['publication'], d])
                    bucket.add(pdf)
    else:
        print "move along, skip this "+ row['publication'] + " article"
print bucket