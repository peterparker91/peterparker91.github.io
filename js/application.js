!function ($) {

  $(function(){

    var $window = $(window);

    // make code pretty
    window.prettyPrint && prettyPrint();
    
    var $sidebar = $('.bs-docs-sidebar');

    if ($sidebar.length > 0) {
      setTimeout(function () {
      
        var height = $('.bs-docs-sidebar').offset().top;

        $('.bs-docs-sidenav').affix({
          offset: {
            top: function () { return $window.width() <= 980 ? 290 : height - 50; }
          , bottom: 270
          }
        });
      }, 0);
    }

  });

}(window.jQuery);
