---
title: Security Portfolio
author: Roelof Roos
date: Feb 14, 2019
...

# Security Portfolio

## Google Dorks

Time to get your "hackerman" on by finding exposed documents on the World Wide Web, by using Google.

### Webcam

First off, let's get some webcams. They're notorious for exposing themselves on the internet, and it took me very little time to find one.
The first result I got was fairly juicy, as looking up the IP address pointed out that this webcam found, is actually located
on the San Diego State University campus, in San Diego, California, US.

Dork used: `inurl:/live.htm intext:"M-JPEG"|"System Log"|"Camera-1"|"View Control"`

Result: A webcam, shown below.

![http://130.191.35.82/live.htm](images/dorks-webcam.jpg)

### Configurations

Another funny one to find is settings files. Firstly, I tried looking for `.env` files, but they're hard to come by. What, however, is more common is
a `settings.yml`, and looking for indexes containing that, resulted in a very juicy `configuration.yml` for `https://typology.online/`, which seems to
have a misconfigured webroot.

The credentials found granted access to the database (which is *not* protected by a firewall), but the request was rejected by hostname verification by
MariaDB.

Dork used: `intitle:"index of" "settings.yml"`

Result: A misconfigured webserver with production credentials for their MariaDB database.

!["Index of /config/" showing the redacted contents of the config file](images/dorks-config.jpg)

### Printers

You can send your friends a Rickroll by just linking them an undercover video, but wouldn't it be more fun to Rickroll a random
exposed printer? Well, let's do just that.

Dork used: `intitle:"Printer Status" AND inurl:"/PrinterStatus.html"`

Result: an exposed printer, which even allowed me to print. It's again a university in the US (University of Arizona).

![The print page](images/dorks-printer.jpg)

Don't worry, I printed them a message.

![Sorry, not sorry](images/dorks-printer-2.jpg)

## Data leaks

### 1. JailCore

- Date of discovery: january 3, 2020
- Assets in danger:
  - Personal information of inmates in Florida (US), Kentucky (US), Missouri
    (US), Tennessee (US) and West Virginia (US), including:
    - prescription information,
    - medical information,
    - mugshots,
    - visit logs and,
    - activity logs
- Which security aspect was the attack about:
  - Unprotected material on a server
- How was the attack performed:
  - An Amazon S3 bucket was not properly protected (put in private mode or
    with ACLs)
- What was the result:
  - 36,077 files were leaked, with "significant" amounts of personal
    identifyable information about inmates, enough to fake their identity.

Sources:

1. https://www.tweaktown.com/news/70552/data-leak-reveals-inmate-incarceration-records-identity-theft-likely/index.html
2. https://www.vpnmentor.com/blog/report-jailcore-leak/


### Elector promotional website

- Date of discovery: 10 february 2020
- Assets in danger:
  - Full names, addresses and ID card numbers of voters in Israel
- Which security aspect was the attack about:
  - Leaked credentials
- How was the attack performed:
  - The source code of the site promoting the mobile app Elector contained the usernames and passwords of admin accounts for the app.
- What was the result:
  - A lot of data was 'publicly' available

Sources:

1. https://www.fastcompany.com/90462342/every-voter-in-israel-just-had-their-data-leaked-in-grave-security-breach?partner=rss
