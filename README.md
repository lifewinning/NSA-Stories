This repository, maintained by Josh Begley in collaboration with Margot Williams, contains a simple index of every document published from the Snowden archive.

I thought it might be fun to learn some simple scraping things by trying to add some contextual information to this index, so I worked on some really basic scripts to do that.  

**meta-tags.py** adds the article description and relevant search tags that were added when the article in question was originally published.

**pull-pdfs.py** does the same thing as the above but also goes through the articles in `nsa-archive.csv` and looks for links to PDFs (or links to pages with documents hosted on The Intercept's documents page). Need to figure out how to include links that are just to DocumentCloud pages, like [this page](http://www.theguardian.com/world/interactive/2013/jun/06/verizon-telephone-data-court-order). 

**intercept-only.py** does the same thing as the above also, but *only* for articles on The Intercept. Basically I find their [documents page](https://firstlook.org/theintercept/documents/) really sparse and wanted to provide links to the original source articles with the stories. 

Still need to deduplicate outputs from meta-tags and pull-pdfs. 

[EFF](https://www.eff.org/nsa-spying/nsadocs) and [ACLU](https://www.aclu.org/nsa-documents-search) have done the bulk of this work to date. [Let Josh know](mailto:josh.begley@theintercept.com) if you notice something that's missing.