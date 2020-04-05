\*\* Task group: infrastructure \*\*

# Context

All kinds of tools are used for 'researching' for vulnerabilities (also called hacking). The Kali distribution contains all relevant security tools, a must have for Software Engineers.

# Deliverables

-   Show a working Kali VM on your laptop

# Task: install the Kali distribution in a VirtualBox VM

1.  Download the Kali NetInstaller .iso from [https://www.kali.org](https://www.kali.org)
    
2.  Create a VM in VirtualBox with 1GB RAM, 20GB disk space, 2 Network interfaces (NAT and host\_only), .iso in virtual optical drive.
    
3.  Boot from the .iso file and follow the instructions
    
    -   Choose the lightweight LXDE desktop
    -   Don't forget to accept the Intel license
4.  After reboot add next snippet to the `/etc/network/interfaces` file, so that eth0 (NAT interface) also obtains an IP.
    
    ```
     auto eth0
     allow-hotplug eth0
     iface eth0 inet dhcp
    ```
    
5.  Add ZAP (Zed Attack Proxy) to the list of applications. If this fails, you clould also use ZAP from your host operating system.
    
    ```
     sudo apt update
     sudo apt upgrade
     sudo apt install zaproxy
    ```
    
    Alternatively install ZAP on your host: [https://www.zaproxy.org/](https://www.zaproxy.org/)
    
6.  Reboot
    
    ```
     sudo reboot
    ```
    

# Done