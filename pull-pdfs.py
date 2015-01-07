#dependencies!
from bs4 import BeautifulSoup
import urllib
import csv

output = csv.writer(open('nsa-archive-pdf-scrape.csv', 'w')) #output csv for later use
output.writerow(["file_url","link_title","date","title","article_url","publication", "description","tags"]) # Write column headers as the first line
archive = open('nsa-archive.csv','rU') #read csv in
pile = set() #deduplication
reader = csv.DictReader(archive)
#scrape each url
for row in reader:
    url = urllib.urlopen(row['url'])
    soup = BeautifulSoup(url)
    import re
    #identify all the urls that are just pdf files, we do not need you
    pdf = re.search('pdf', row['url'])
    flmpdf = re.search('/theintercept/document/', row['url'])
    #seriously, there was a zip file?
    zipfile = re.search('zip', row['url'])
    #ic on the record has dumb ideas about description tags
    icotr = re.search('http://icontherecord.tumblr.com/post/67419963949/dni-clapper-declassifies-additional-intelligence', row['url'])
    if pdf:
        pass
    elif flmpdf:
        pass
    elif zipfile:
        continue
    elif icotr:
        d = ''
        t = ''
    else:
        print "searching "+ row['url']+" ..."
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
    # let's look for links to files
    pdf = ''
    for link in soup.find_all('a'):
        pdf = link.get('href')
        if pdf is None:
            continue
        elif pdf.endswith('pdf'):
            u = link.contents[0].encode('utf-8')
            f = pdf
            #write row to csv 
            print f + " is a PDF"
            output.writerow([f, u,row['date'],row['title'],row['url'],row['publication'], d, t])
        elif pdf.startswith('https://firstlook.org/theintercept/document/'):
            u = link.contents[0].encode('utf-8')
            f = pdf
            print "an intercept document! "+ f
        elif pdf.startswith('https://firstlook.org/theintercept/?'):
            u = link.contents[0].encode('utf-8')
            f = pdf
            print "an intercept document! "+ f
            output.writerow([f, u,row['date'],row['title'],row['url'],row['publication'], d, t])
        elif pdf.startswith('http://www.guardian.co.uk/world/interactive/'):
            u = link.contents[0].encode('utf-8')
            f = pdf
            print "a guardian document! "+ f
        elif pdf.startswith('http://apps.washingtonpost.com/'):
            u = link.contents[0].encode('utf-8')
            f = pdf
            print "a post document! "+ f
        else:
            continue

