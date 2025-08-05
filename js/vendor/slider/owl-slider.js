// JavaScript Document
$(document).on('ready', function() {
	
// TESTIMONIAL CAROUSEL
	  var owl = $(".owl-demo,.owl-demo1");	 
	  owl.owlCarousel({
		  autoPlay: 4000,
		  items : 3, //10 items above 1000px browser width
		  itemsDesktop : [1920,1], //5 items between 1000px and 901px
		  itemsDesktopSmall : [900,1], // betweem 900px and 601px
		  itemsTablet: [600,1], //2 items between 600 and 0
		  itemsMobile : [380,1] 
	  });
	 
	  // Custom Navigation Events
	  $(".next").click(function(){
		owl.trigger('owl.next');
	  })
	  $(".prev").click(function(){
		owl.trigger('owl.prev');
	  })
	  $(".play").click(function(){
		owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
	  })
	  $(".stop").click(function(){
		owl.trigger('owl.stop');
	  })
	 
//CLIENT LOGO    
      var owl = $(".testimonial");
     
      owl.owlCarousel({
		   autoPlay: 4000,
        itemsCustom : [
        [0, 1],
        [450, 1],
        [600, 1],
        [700, 2],
        [1000, 2],
        [1200, 2],
        [1400, 2],
        [1600,2]
      ]
      });
     
      // Custom Navigation Events
      $(".next").click(function(){
        owl.trigger('owl.next');
      })
      $(".prev").click(function(){
        owl.trigger('owl.prev');
      })
      $(".play").click(function(){
        owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
      })
      $(".stop").click(function(){
        owl.trigger('owl.stop');
      })
	 
	

   

});