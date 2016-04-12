README
======

* Long story short: Your files should go wherever the symlink www points at.
* If you want to see the www symlink:

NOTE: APril:Gatech pwd == CoC pwd(April 6)

  ``
  ssh ahuaman3@killerbee3.cc.gatech.edu
  ls -l 
  ``
  The -l option should show you where www points at. Right now I see www -> /net/www/grads/a/ahuaman3.

* To update your site:

   ``cd /home/ana/website/www  # Your index.html is here
     scp -r * ahuaman3@killerbee3.cc.gatech.edu:/net/www/grads/a/ahuaman3/
   ``    
* FYI: Last time I checked (April 12th, 2016) only killerbee3 worked fine w.r.t. killerbee1. I think
  I accidentally erased the killerbee1 start configuration files.
* Remember that you do NOT copy the www folder. Only copy the contents into (in this case) ahuaman3. 
  Your website is updated automatically.

* Finally, killerbee1, killerbee2 and killerbee3 can be used interchangeably.
* In case you forget your CoC password, you can reset it online through the VPN. For you to use it in a
  new machine, make sure you follow ALL the instructions regarding Linux from the CoC site. Otherwise, it 
  likely won't work or will do so by freaking chance. It is easy if you follow all the instructions.
