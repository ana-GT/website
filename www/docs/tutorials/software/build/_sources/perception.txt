Perception Software Tools
###########################

Kinect / PrimeSense Drivers
****************************
Currently the robots use 2 different kind of sensors:

1. Crichton uses a Carmine (PrimeSense 1.09), which is just a short-range PrimeSense (0.35 - 1.4m)
2. Alita uses a regular Kinect (old one, version 1.0)

Since as far as I know, the Carmine only works with OpenNI2, we will stick to it. Our system
requires the following packages to be installed:

1. **OpenNI2:** Base driver needed to access the Carmine
2. **libfreenect:** Needed to use the Kinect with OpenNI2
3. **Nite2:** I use it for Skeleton tracking.

Notice that we do NOT use OpenNI anymore. I had been under the wrong impression
that OpenNI2 did not work with Kinect, but that was wrong. You need to install
libfreenect and then Kinect is available to use.

PS.- Most of the info here comes from `this tutorial <http://eras.readthedocs.org/en/latest/servers/body_tracker/doc/setup.html>`_

OpenNI2
========
I installed this some months previous to the time of this writing, so I will write what
I remember. Install OpenNI2 from the occipital repository:

.. code-block:: bash

   git clone https://github.com/occipital/OpenNI2

   
The website of Occipital is `here <http://structure.io/openni>`_, in case you are curious.
Remember to check that the rules in udev/rules.d contain the specifications for the
hardware you will use. For instance, for the Kinect, you should have the following
lines in the file: /etc/udev/rules.d/51-kinect.rules

.. code-block:: bash

   SUBSYSTEM=="usb", ATTR{idVendor}=="045e", ATTR{idProduct}=="02b0", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idVendor}=="045e", ATTR{idProduct}=="02ad", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idVendor}=="045e", ATTR{idProduct}=="02ae", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idVendor}=="045e", ATTR{idProduct}=="02c2", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idVendor}=="045e", ATTR{idProduct}=="02be", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idVendor}=="045e", ATTR{idProduct}=="02bf", MODE:="0666", OWNER:="root", GROUP:="video"

If I remember correctly, by default OpenNI2 only comes with rules for the PrimeSense, which are:

.. code-block:: bash

   # Make primesense device mount with writing permissions (default is read only for unknown devices)
   SUBSYSTEM=="usb", ATTR{idProduct}=="0200", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="0300", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="0401", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="0500", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="0600", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="0601", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="0609", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="1250", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="1260", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="1270", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="1280", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="1290", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"
   SUBSYSTEM=="usb", ATTR{idProduct}=="f9db", ATTR{idVendor}=="1d27", MODE:="0666", OWNER:="root", GROUP:="video"

   
libfreenect
============

* Download the OpenNI2-FreenectDriver
* Once compiled, copy driver to OpenNI2 directory

.. code-block:: bash

   git clone https://github.com/OpenKinect/libfreenect.git
   cd libfreenect
   mkdir build; cd build
   cmake .. -DBUILD_OPENNI2_DRIVER=ON
   make
   cp -L lib/OpenNI2-FreenectDriver/libFreenectDriver.so ${OPENNI2_DIR}/Bin/x64-Release/OpenNI2/Drivers

As the original tutorial says, if everything went all right, you can plug in your Kinect and run the example in OpenNI2

.. code-block:: bash

   cd ${OPENNI2_DIR}/Bin/x64-Release/
   ./NiViewer

I verified and it works for both Carmine and regular Kinect.		

NiTE2
======

You only need to install this if you want to use applications such as Skeleton tracking. I need
that for handover activities:

1. Download NiTE2 from: `<http://ilab.usc.edu/packages/forall/ubuntu-13.10/NiTE-Linux-x64-2.2.tar.bz2>`_
2. Extract NiTE-Linux-x64-2.2
3. Run install.sh (only generates a text file with location directions, from what I can see).
4. Copy the libFreenectDriver.so from libfreenect into the Drivers folder in NiTE to test the skeleton tracker:

   .. code-block:: bash

      cp ${LIBFREENECT_DIR}/build/lib/OpenNI2-FreenectDriver/libFreenectDriver.so ${NiTE2_DIR}/Samples/Bin/OpenNI2/Drivers

5. Run demo skeleton tracker (UserViewer in Samples/Bin folder in NiTE2)
