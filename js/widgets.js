
function toggleOverlay(e, overlay, eheight) {
  var body = overlay.parents('.widget').children(".body");
  var contentHeight = body.children(".content").height('auto').height();
  var finalHeight = 0;
  var margin = "8px";
  // if visible, it's going to be hidden, so we set it to the content height
  if ($(overlay).is(":visible")) {
    finalHeight = contentHeight;
    margin = "0";
    body.children(".content").hide();
  }
  
  $(overlay).slideToggle('medium', function() {
    // if height is still zero, it means that it's going to be displayed, so we set it to the overlay height
    if (finalHeight == 0) {
      var overlayHeight = overlay.children("*").height('auto').height();
      finalHeight = overlayHeight;
      body.children(".content").show();
    }
    
    body.children(".content").animate({
      height: finalHeight
      //height: finalHeight - 8
    }, 10, function() {
      if ($('html').hasClass('ie6')) {
        body.css("margin-bottom", margin);
      }
      body.css({height: body.height('auto').height()});
    });
    
    if (eheight != null && $('html').hasClass('ie6')) {
      $(overlay).css({height:eheight});
    }
  });
  
  $(".tabbed, .tabbed-2").each(function(index) {
    var index = $(this).find('.default').index();
    if (index < 0)
      index = 0;
    $(this).tabs({selected: index, select: function(event, ui) {}});
  });
  
  return false;
}

$(document).ready(function(){
  $('.widget .toggle:not(.side-menu .toggle)').click(function(e) {
/*     if ($(overlay).is(":visible")) { */
    // finalHeight = contentHeight;
    // margin = "0";
    // body.children(".content").hide();
    /* } */
    var isVisible = false;
    var overlay = $("#" + $(this).attr('rel'));
    var parentWidget = $(this).parents('.widget');
    var openedOverlay;
    parentWidget.find('.overlay').each(function() {
      if ($(this).is(":visible")) {
        isVisible = true;
        openedOverlay = $(this);
      }
    });
    if (isVisible == false) {
      if (!toggleOverlay($(this), overlay)) {
        e.preventDefault();
      }
    }
    else {
      if (!toggleOverlay($(this), openedOverlay)) {
        e.preventDefault();
      }
    }
  });
  
  $('#slideout .toggle').click(function(e) {
    var overlay = $("#" + $(this).attr('rel'));
    var height = $('#slideout .content').height() - 24;
    //var height = $('#slideout .content').height();
    if (!toggleOverlay($(this), overlay, height)) {
      e.preventDefault();
    }
  });
  
  $('.widget li .operations a').click(function(e) {
    var rel = $(this).attr('rel');
    if (rel) {return;
      var overlay = $('#' + $(this).parents('.widget').attr('id') + "-" + rel + "-overlay");
      if (!toggleOverlay($(this), overlay)) {
        e.preventDefault();
      }
    }
  });
});
