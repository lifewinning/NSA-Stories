#dependencies!
from bs4 import BeautifulSoup
import urllib
import csv

#read csv in
archive = open('nsa-archive.csv','rU')
#output csv for later use
output = csv.writer(open('nsa-archive-with-meta.csv', 'w'))
output.writerow(["date","title","url","publication", "description","tags"]) # Write column headers as the first line
reader = csv.DictReader(archive)
#scrape each url
for row in reader:
    url = urllib.urlopen(row['url'])
    soup = BeautifulSoup(url)
    print "adding "+ row['url']+"..."
    import re
    #identify all the urls that are just pdf files and will break everything
    pdf = re.search('pdf', row['url'])
    flmpdf = re.search('/theintercept/document/', row['url'])
    #seriously, there was a zip file?
    zipfile = re.search('zip', row['url'])
    #hacky workaround because ic on the record is the worst
    icotr = re.search('http://icontherecord.tumblr.com/post/67419963949/dni-clapper-declassifies-additional-intelligence', row['url'])
    #anyway sorry about that workaround
    if pdf:
        d = 'rawfile'
        t = ''
    elif flmpdf:
        d = 'rawfile'
        t = ''
    elif zipfile:
        d = 'rawfile'
        t = ''
    elif icotr:
        d = ''
        t = ''
    else:
        #let's look for some meta tags
        ogdesc = soup.find_all('meta',attrs={"property":"og:description"})
        desc = soup.find_all('meta', attrs={"property":"description"})
        tags = soup.find_all('meta', attrs={"name":"keywords", "content":True})
        if ogdesc:
            d = ogdesc[0]['content'].encode('utf-8')
        elif desc:
            d = desc[0]['content'].encode('utf-8')
        else:
            d = ''
        if tags:
            t = tags[0]['content'].encode('utf-8')
        else:
            t = ''
    output.writerow([row['date'],row['title'],row['url'],row['publication'], d, t])