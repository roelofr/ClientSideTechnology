---
title: Security Portfolio
author: Roelof Roos
date: Feb 14, 2019
...

# Security Portfolio

## Google Dorks



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
