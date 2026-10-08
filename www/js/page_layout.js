    
// Custom header component
class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `

  <div class="row">      
    <!-- <a href="index.html"><img src="images/logo.png" alt="desc" class="header_logo" /></a> -->     
    <h3>A. C. Huam&aacute;n Quispe</h3>
  </div>
        
      
  <div class="row col-12 header_nav" style="margin-bottom:0; box-shadow: none">
    <div id="navbar-frame"></div>
  </div>            

  <div id="slider-frame"></div>


        `;
    }
}

// Define the custom footer component
class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <div class="row col-12">
          <ul id="menu3" class="footer_menu horizontal">
            <li class=""><a href="index.html">Home</a></li>
          </ul>
      </div>	
		  
      <!--<script>
        $('ul#menu3').nav-bar();
      </script>-->

        `;
    }
}



// Register your custom tags
customElements.define('ana-page-header', MyHeader);
customElements.define('ana-page-footer', MyFooter);    
