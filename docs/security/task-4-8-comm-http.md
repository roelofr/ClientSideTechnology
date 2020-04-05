\*\* task group: secure communication \*\*

# Context

Sometimes you need to debug your HTTP(S) network traffic. A often used tool for analyzing HTTP(S) (and other Internet) traffic is Wireshark ([http://www.wireshark.org](http://www.wireshark.org)). NOTE: by sniffing the network possibly the Confidentially is in danger.

# Deliverables

-   Show screenshots/screencast of a HTTP connection to your test host
-   Show screenshots/screencast of a HTTPS connection to your personal bank

# Task

1.  Download a Kali VirtualBox VM ([https://www.offensive-security.com/kali-linux-vm-vmware-virtualbox-image-download/](https://www.offensive-security.com/kali-linux-vm-vmware-virtualbox-image-download/))
2.  Download the Windesheim BBT VM from the elo.
3.  Start your Kali VM
4.  Start the Windesheim BBT VM
    -   Obtain your IP number via `$ ip address`
5.  Kali: Start Wireshark and start sniffing on the host\_only interface
6.  Kali: Start a browser and surf with to your Windesheim BBT VM
    -   Analyse the packages: show the response
7.  Kali: Surf to your personal bank
    -   Analyse the packages: which encryption algorithm is used?

# Done