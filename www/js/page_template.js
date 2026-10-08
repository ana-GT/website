$(document).ready(function () {

    //-- Load slider bar with pictures
    $("#slider-frame").load("/components/sliderbar.html", function() {
      $("#featured").orbit();
    }); // load slider-frame

    //-- Load horizontal navigation bar
    $("#navbar-frame").load("/components/navbar.html", function() {

      // Select active to highlight
      let currentPath = window.location.pathname;

      // Account for root domain paths pointing to index.html
      if (currentPath === '/' || currentPath === '') {
        currentPath = '/index.html';
      }

      $('#menu-header li').each(function() {
        let linkPath = $(this).find('a').attr('href');
        if (currentPath.includes(linkPath)) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
            
      }); // menu-header iteration
      
  }); // load navbar-frame
  
}); // ready(function
