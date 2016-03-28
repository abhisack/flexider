var flexider= (function() {
               
//helper function (courtesy of Lea Verou)
function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
} 
               


$$(".flexider").forEach(function(slider) {
   var slideCon= slider.children[0],
             tX=0, //translateX 
   currentSlide= 0,
      buttonNav= slider.children[0],
    autoSlide //setTimeout context

var modeValue= slider.getAttribute("data-fx-mode"),
        delay= slider.getAttribute("data-fx-delay");
    
var settings= {
    mode: modeValue
};
    
  function createAndAppendSliderNav() {
       var sliderNav= document.createElement("nav");
       sliderNav.classList.add("slider-nav");
       slider.appendChild(sliderNav);


       for(var j=0; j < slideCon.children.length; j++) {
          var navItem= document.createElement("a");
          navItem.index= j;
          navItem.addEventListener("click", handleDotClick, false);
          sliderNav.appendChild(navItem);
          sliderNav.children[0].classList.add("focus-nav-item");
}
    return window.sliderNav = sliderNav;

  }
    
    
    
    function handleDots(nc) {
          for(var k=0; k < sliderNav.children.length; k++) {
          sliderNav.children[k].classList.remove("focus-nav-item");
    }
          sliderNav.children[currentSlide].classList.add("focus-nav-item");
}
    
  
  function handleDotClick() {
         tX= this.index *100* -1;
      
         for(var l=0; l < sliderNav.children.length; l++) {
            sliderNav.children[l].classList.remove("focus-nav-item");
         }
          
         currentSlide= this.index; 
         sliderNav.children[currentSlide].classList.add("focus-nav-item");
      
         slideCon.style.transform= "translateX("+ tX + "%)";
}
  
    function handleButtons() {
        if(currentSlide === 0) {
            buttonNav.children[0].classList.add("inactive");
        } else {
            buttonNav.children[0].classList.remove("inactive");
        }
        
        if(currentSlide === slideCon.children.length-1) {
            buttonNav.children[1].classList.add("inactive");
        } else {
            buttonNav.children[1].classList.remove("inactive");
        }
    }
    

createAndAppendSliderNav();

if(settings.mode === "auto") {
   
    

function slideIt() {
  if(tX <= 0 && tX > (slideCon.children.length-1)*100*-1) {
      
    tX-= 100;
    currentSlide+= 1;
      
  } else {
      //move to first slide
      tX= 0;
      //avoid transition while moving back to the first slide
      slideCon.style.transition= "all 0s ease-out";
      
      //restore transition after first slide is active
      setTimeout(function restoreTransition() {
                slideCon.style.transition= "all .3s ease-out";
      }, 301);
      
     //set current slide to 0
     currentSlide= 0;
      
  }
  
  
 //set the transformation
  slideCon.style.transform= "translateX(" + tX + "%)";
  
 //highlight the dot for current slide
  handleDots(currentSlide);
  
  //set the timer
  autoSlide= setTimeout(slideIt, (delay || 3)*1000);
}


 //if 'page visibility' API is supported, auto-move the slider only when tab is active
    

if(document.visibilityState) {
    var visibilityChangeCount= 0; 
    document.addEventListener("visibilitychange", function() {
        if(this.visibilityState === "hidden") {
            visibilityChangeCount++;
            clearTimeout(autoSlide);
        } else if(this.visibilityState === "visible" && visibilityChangeCount !== 0) {
            autoSlide= setTimeout(slideIt, (delay || 3)*1000);
        }
});
    
}
    
    //always start the slider after 1000ms DOM has fully loaded (and if tab is active in case page-visibility API is supported)
    
document.addEventListener("DOMContentLoaded", function() {
    if(document.visibilityState === "visible") {
    setTimeout(function startSliding() {
        slideIt();
    },1000);
    } 
    
    if(!(document.visibilityState)) {
         setTimeout(function startSliding() {
         slideIt();
    },1000);
    }
  
});
    

} else if (settings.mode=="manual") {
    
    //create and append the 'next' & 'previous' navigation buttons wrapped in in a 'nav'
    var ns= "http://www.w3.org/2000/svg",
        dL= "M130,0 L0,100 130,200",
        dR= "M0,0 L130,100 0,200";
   var buttonNav= document.createElement("nav"),
       prev= document.createElement("button"),
       next= document.createElement("button"),
       arrowLeft= document.createElementNS(ns,"svg"),
       arrowRight= document.createElementNS(ns,"svg"),
       arrowLeftPath= document.createElementNS(ns, "path"),
       arrowRightPath= document.createElementNS(ns, "path");
       
       arrowLeft.setAttribute("viewBox", "0 0 130 200");
       arrowRight.setAttribute("viewBox", "0 0 130 200");
       arrowLeft.classList.add("arrow-left");
       arrowLeft.classList.add("arrow");
       arrowRight.classList.add("arrow-right");
       arrowRight.classList.add("arrow");
       arrowLeftPath.setAttribute("d",dL);
       arrowRightPath.setAttribute("d",dR);
       arrowLeft.appendChild(arrowLeftPath);
       arrowRight.appendChild(arrowRightPath);
       prev.appendChild(arrowLeft);
       next.appendChild(arrowRight);
    
       buttonNav.classList.add("button-nav");
       prev.classList.add("prev");
       next.classList.add("next");
       buttonNav.classList.add("button-nav");
       buttonNav.appendChild(prev);
       buttonNav.appendChild(next);
       slider.appendChild(buttonNav);

//set event handlers to 'next' and 'previous' buttons

next.addEventListener("click", moveNext, false);
prev.addEventListener("click", movePrevious, false);
      
}


function moveNext() {
    tX -= 100;
  

    if(tX > (slideCon.children.length) * 100*-1) {
        currentSlide+= 1;
        slideCon.style.transform= "translateX(" + tX + "%)";
    } else {
        tX=(slideCon.children.length-1) * 100*-1;
        currentSlide= slideCon.children.length-1;
    }
  
    

handleDots(currentSlide);
handleButtons();
    
}

function movePrevious() {
   
    if(tX < 0) {
         tX += 100;
         currentSlide -= 1;
         slideCon.style.transform= "translateX(" + tX + "%)";
    } 
     
      handleDots(currentSlide);
      handleButtons();
}
    
    
//add keyboard events for 'left arrow' & 'right arrow' key

window.addEventListener("keydown", function(e) {
    if(e.keyCode=== 39) {
        clearTimeout(autoSlide);
        moveNext();
    } else if(e.keyCode=== 37) {
        clearTimeout(autoSlide);
        movePrevious();
    }
  
    
});
    
    
window.addEventListener("keyup", function(e) {
  if(e.keyCode===39 || e.keyCode===37) {
    if(settings.mode=== "auto") {
       autoSlide= setTimeout(slideIt, delay*1000);
    }
  }
});
    
    


/*****************
Swipe Functioning 
*******************/
    
var hw= slider.offsetWidth/2, //half the width of slider
    startX, //users initial mouse/touch position
    dx,     //the  length user has dragged
    tX2,    //translateX value in px
    moved,  
    holdStatus= false; //whether user is holding

//add always-needed events for swiping
slider.addEventListener("mousedown", swipeReady, false);
slider.addEventListener("touchstart", swipeReady, false);
slider.addEventListener("touchend", swiped, false);
slider.addEventListener("mouseup", swiped, false);

                        
function swipeReady(e) {
    
  //when user holds add 'mousemove' & 'touchmove' events
  slider.addEventListener("mousemove", swiping, false);
  slider.addEventListener("touchmove", swiping, false);
      
  holdStatus= "true";
  
  //clear timer to prevent auto-sliding (if data-fs-mode is set to 'auto') while the user is holding the slider
  clearTimeout(autoSlide);
 

  if(e.type=== "touchstart") {
      
      var touches= e.changedTouches[0];
      
    //layerX (mouse position relative to the element, slider in this case) is present for 'mouse events' but not for touch events, so polyfill it
      startX= touches.pageX - this.getBoundingClientRect().left;
    
  } else if (e.type=== "mousedown") {
      startX= e.layerX;
  }
}

    
    
function swiping(e) {
    //prevent default action (e.g. 300ms delay on touchmove event)
    e.preventDefault();
    
    //set transition to 'none' to prevent jerks
    slideCon.style.transition= "none";
    
  function getNum(n) {
    var stringN= n+ "",
    stringLen= stringN.length;
    var num= stringN.substring(1, stringLen-2);
    return parseInt(num);
}
    
  
 if(holdStatus=== "true") {
     //set userSelect to none to prevent selection
     this.style.webkitUserSelect= "none";
     
   if(e.type=== "touchmove") {
       //prevent default action (e.g. 300ms delay on touchmove event)
        e.preventDefault();
       
        var touchesMoving= e.changedTouches[0];
//layerX (mouse position relative to the element, slider in this case) is present for 'mouse events' but not for touch events, so polyfill it
                  dx= touchesMoving.pageX - this.getBoundingClientRect().left;
       
       //you could do follwing as well
                  //touchesMoving.layerX= touchesMoving.pageX - this.getBoundingClientRect().left; 
                  // dx= touchesMoving.layerX;
       
   } else if(e.type=== "mousemove") {
       dx= e.layerX;
   }
     
    moved= (dx-startX);
  
   tX2= (getNum(tX)*hw*2 *-1)+moved;
   
   //prevent sliding right when the current slide is the first one
   if(getNum(tX)==0 && moved > 0) {
      tX2=0;
   }
   
   //prevent sliding left when the current slide is last one
    if(getNum(tX) == slideCon.children.length-1 && moved < 0) {
      tX2= (slideCon.children.length-1) * hw * 2 * -1;
   }
     
    //apply transformation
   slideCon.style.transform= "translateX("+ tX2 + "px)";
   
 } //holdStatus === true
}  //swiping()
                                              
                        
function swiped(e) {
   
  //remove the event listeners which aren't needed now  
  slider.removeEventListener("mousemove", swiping, false);
  slider.removeEventListener("touchmove", swiping, false);
  
    
    //restore transition to default
    slideCon.style.transition= "all .3s ease-out";

    //set user-select back to 'auto'
   this.style.webkitUserSelect= "auto";
   holdStatus= "false";

  
  if(moved > 0) {
    if(moved > (hw/1.1) && startX < hw) {
       movePrevious();
    } else {
       slideCon.style.transform= "translateX(" + tX + "%)";
    }
  }
    
    if(moved < 0) {
      if(-1*moved > (hw/1.1) && startX > hw) {
        moveNext();
      } else {
         slideCon.style.transform= "translateX(" + tX + "%)";
      }
    }
    
    //restart auto sliding if the mode is 'auto'
  
     if(settings.mode === "auto") {
        autoSlide= setTimeout(slideIt, (delay || 3)*1000);
    }  
    
    
}

//update hw when window is resized
window.addEventListener("resize", function() {
  hw = slider.offsetWidth/2;
});
    
    }); //$$(".flexider")
}) (); // flexider