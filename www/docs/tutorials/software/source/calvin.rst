Setup of Control Machine (calvin)
##################################

Calvin is the machine in charge of controlling the robot motors.
It has the CAN cards to communicate with the drives, Schunk hands,
F/T and tactile sensors. Recently (Tuesday, April 7th, 2015) we had
to wipe it out, so here the documented procedure for setting it up:

1. Reinstall the latest version of debian. Currently we installed debian Jessie 2 RC, 64 bits
   (3.16.0-4-amd64). Calvin does require a USB drive installation (no DVD reader). I set
   the booting order to have USB first, but in case it does not work, press F11
   for booting options.
2. Add me as an  user (i.e. ana) and give myself sudo power

   .. code-block:: bash

      useradd/adduser ana sudo

3. Install packages: git
4. Install packages for installing our funky Lab packages: autoconf, autoconf-archive, autotools, doxygen.
5. Install amino requirements:

   .. code-block:: bash

      sudo apt-get install libblas3gf libblas-dev liblapack3gf liblapack-dev maxima

6. Install gfortran, build-essentials (always needed. gfortran is for amino as well).
7. Install amino, ach and sns. I prefer /usr/local.
8. Remember to set achd in inetd (See ACH manual, section 6.1.1). This machine gets input through ach channels over the network, so this is required.


Installation of can402
======================

Besides installing socanmatic, you only have one extra thing to do: Set the can interfaces.
For this, I used the instructions from `this guy in WPI who also uses can402 < http://www.cs.rpi.edu/foswiki/bin/view/RoboticsWeb/PowerballGATech>`_ 
and also asked Neil for modifications to adapt the indications to our setup.

In short: You have to modify /etc/network/interfaces to create our SocketCAN drivers:


.. code-block:: bash

   sudo vim /etc/network/interfaces

You should add the following lines:

.. code-block:: bash

   # can0:
   auto can0
   iface can0 inet manual
   pre-up ip link set $IFACE type can bitrate 1000000
   up /sbin/ifconfig $IFACE up
   down /sbin/ifconfig $IFACE down

   auto can1
   iface can1 inet manual
   pre-up ip link set $IFACE type can bitrate 1000000
   up /sbin/ifconfig $IFACE up
   down /sbin/ifconfig $IFACE down

   auto can2
   iface can2 inet manual
   pre-up ip link set $IFACE type can bitrate 1000000
   up /sbin/ifconfig $IFACE up
   down /sbin/ifconfig $IFACE down

   
In our case we also add 3 interfaces: can0 for left arm, can1 for right and can2 for torso.
After you save these changes, restart the network service (or just restart the machine). To make 
sure your interfaces are there run:

.. code-block:: bash

   sudo ifconfig

And you should see can0, can1 and can2. Once this is done, you are good to run can402 and move the arm

**NOTE:** Observe the bitrate of 1000 000 (1Mbps). This is not a random number, but the baud rate we
set in the MTS software per each module (remember 1000 kbps?). In the original tutorial of the WPI
guy, this number was 500000 (500 kbps), which is the default value Schunk ship the modules with.
Neil said he set this to be 1000kbps,so the value set here should match the value set in the MTS software
(which is the value at which the motor runs).

SDH hands
==========

This should NOT be painful if we follow the instructions correctly (blessed be Neil who
kindly provided assistance when I got stuck).

The SDH hands communicate through serial ports. You need to install 4 libraries:

1. Install reflex

   .. code-block:: bash
      
      git clone http://github.com/golems/reflex
  
2. Install ntcan from the esd.eu website. You need to create an user account (free). The
   driver version that works well with our kernel is the latest one:
   esdcan-pci405-linux-2.6.x-x86_64-3.9.5.tgz. Notice that we have an ntcan repository
   in our golems server but these are old. They work with older kernels. The one I
   downloaded from the website works just fine. Note: You MUST follow the README instructions
   after compiling for loading the module and creating the nodes:

   * Create the inodes (probably as sudo)

     .. code-block:: bash

	cd /dev
	mknod --mode=a+rw can0 c 53 0
	mknod --mode=a+rw can1 c 53 1	     

     Where 53 is the major of the driver (identifier of the card. See the README for details)

   * Load the driver (probably with sudo)

     .. code-block:: bash
		   
	insmod /lib/modules/3.16.0-4-amd64/esdcan-pci405.ko

3. Install sdhlibrary-cpp

   .. code-block:: bash

      git clone thebrain.golems.org:/srv/git/drivers/sdhlibrary-cpp

4. Install sdhiod

   .. code-block:: bash

      git clone thebrain.golems.org:/srv/git/drivers/sdhiod

5. You should be good to go
   
