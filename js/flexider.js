var flexider= (function() {
//helper function
function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
} 


$$(".flexider").forEach(function(slider) {
    

   var slideCon= slider.children[0],
        tX=0,
        nc=0,
    autoSlide;

var modeValue= slider.getAttribute("data-fs-mode"),
    delay= slider.getAttribute("data-fs-delay");
var settings= {
  mode: modeValue
};

if(settings.mode=="auto") {
    var sliderNav= document.createElement("nav");
    sliderNav.classList.add("slider-nav");
    slider.appendChild(sliderNav);


for(var j=0; j<slideCon.children.length; j++) {
  var navItem= document.createElement("a");
  sliderNav.appendChild(navItem);
    sliderNav.children[0].classList.add("focus-nav-item");
}

    function handleDots(nc) {
    for(var k=0; k<sliderNav.children.length; k++) {
    sliderNav.children[k].classList.remove("focus-nav-item");
  }
  sliderNav.children[nc].classList.add("focus-nav-item");
}
    

function slideIt() {
  if(tX<=0 && tX>(slideCon.children.length-1)*100*-1) {
       
  tX-= 100;
    nc+=1;
  } else {
    tX= 0;
    slideCon.style.transition= "all 0s ease-out";
      setTimeout(function restoreTransition() {
          slideCon.style.transition= "all .3s ease-out";
      },301);
    nc=0;
  }
  

  slideCon.style.transform= "translateX("+tX+"%)";
  for(var k=0; k<sliderNav.children.length; k++) {
    sliderNav.children[k].classList.remove("focus-nav-item");
  }
  sliderNav.children[nc].classList.add("focus-nav-item");
 autoSlide= setTimeout(slideIt,delay*1000);
}

       var vCount= 0;

    
    //pause/resume autosliding when visibility state is changed
    document.addEventListener("visibilitychange", function() {
        if(this.visibilityState === "hidden") {
            vCount++;
            clearTimeout(autoSlide);
        } else if(this.visibilityState === "visible" && vCount!== 0) {
            autoSlide= setTimeout(slideIt, delay*1000);
        }
});
    
    //start slider after 1s of page having been loaded
document.addEventListener("DOMContentLoaded", function() {
    if(document.visibilityState === "visible") {
    setTimeout(function startSliding() {
        slideIt();
    },1000);
    }
  
});
    $$(".slider-nav a").forEach(function(el,index){
el.addEventListener("click", function() {
     tX= index *100* -1;
  for(var l=0; l<sliderNav.children.length; l++) {
    sliderNav.children[l].classList.remove("focus-nav-item");
  }
     nc= index; sliderNav.children[nc].classList.add("focus-nav-item");
   slideCon.style.transform= "translateX("+tX+"%)";
}, false);
});


} else if (settings.mode=="manual") {
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

//Event Handlers

next.addEventListener("click", moveNext, false);
prev.addEventListener("click", movePrevious, false);
      


}


//Functions for Event Handlers

window.addEventListener("keydown", function(e) {
    if(e.keyCode=== 39) {
       clearTimeout(autoSlide);
        moveNext();
    } else if(e.keyCode=== 37) {
      clearTimeout(autoSlide);
        movePrevious();
    }
  

});


function moveNext() {
    tX -= 100;
  
    if(tX > (slideCon.children.length) * 100*-1) {
      nc+=1;
     slideCon.style.transform= "translateX("+tX+"%)";
    } else {
        tX=(slideCon.children.length-1) * 100*-1;
      nc= slideCon.children.length-1;
    }
  
if(settings.mode=== "auto") {
handleDots(nc);
}
}

function movePrevious() {
   
   tX += 100;
    if(tX <= 0) {
    nc-=1;
    slideCon.style.transform= "translateX("+tX+"%)";
    } else {
        tX=0;
      nc= 0;
    }
     
if(settings.mode=== "auto") {
handleDots(nc);
}

}
window.addEventListener("keyup", function(e) {
  if(e.keyCode===39 || e.keyCode===37) {
    if(settings.mode=== "auto") {
    autoSlide= setTimeout(slideIt, delay*1000);
    }
  }
});


//swiping part
var hw= slider.offsetWidth/2,
    startX, dx, moved, holdStatus= false;

slider.addEventListener("mousedown", swipeReady, false);
slider.addEventListener("mousemove", swiping, false);
slider.addEventListener("mouseup", swiped, false);
slider.addEventListener("touchstart", swipeReady, false);
slider.addEventListener("touchmove", swiping, false);
slider.addEventListener("touchend", swiped, false);
                        
function swipeReady(e) {
  holdStatus= "true";
  clearTimeout(autoSlide);
  if(e.type=== "touchstart") {
    var touches= e.changedTouches;
    for(var i=0; i<touches.length; i++) {
      startX= touches[i].pageX -this.offsetLeft;
    }
  } else if (e.type=== "mousedown") {
  startX= e.layerX;
  }
}

function swiping(e) {
    //prevent default action (e.g. 300ms delay for touchmove event)
    e.preventDefault();
  function getNum(n) {
    var stringN= n+ "",
    stringLen= stringN.length;
    var num= stringN.substring(1, stringLen-2);
    return parseInt(num);
}
  
 if(holdStatus=== "true") {
     this.style.webkitUserSelect= "none";
     var _type= e.type;
     
     
   if(_type=== "touchmove") {
       e.preventDefault();
        var touchesMoving= e.changedTouches;
       for(var i=0; i < touchesMoving.length; i++) {
                  dx= touchesMoving[i].pageX -this.offsetLeft;
                  touchesMoving[i].layerX= dx- this.offsetLeft; 
                  console.log(touchesMoving[i].layerX);
       }
   } else if(_type=== "mousemove") {
       dx= e.layerX;
   }
     
   
  if(startX<dx) {
    moved= (dx-startX)* 1;
  } else {
    moved= (dx-startX)* 1;
  }
  
  var tX2= (getNum(tX)*hw*2 *-1)+moved;
   
   //prevent sliding left when current slide is first one
   if(getNum(tX)==0 && moved > 0) {
     tX2=0;
   }
   
   //prevent sliding left when current slide is last one
    if(getNum(tX)==slideCon.children.length-1 && moved < 0) {
     tX2= (slideCon.children.length-1) *hw*2 *-1;
   }
   slideCon.style.transform= "translateX("+tX2+"px)";
   
 } //holdStatus=== true
}  //swiping
                                              
                        
function swiped(e) {

   this.style.webkitUserSelect= "auto";
    holdStatus= "false";

  
  if(moved > 0) {
    if(moved>hw && startX<hw) {
      movePrevious();
    } else {
       slideCon.style.transform= "translateX("+tX+"%)";
    }
  }
    if(moved < 0) {
      if(-1*moved > hw && startX>hw) {
        moveNext();
      } else {
         slideCon.style.transform= "translateX("+tX+"%)";
      }
    }
  
     if(settings.mode=== "auto") {
    autoSlide= setTimeout(slideIt, delay*1000);
    }  
    
}

//update hw when window is resized
window.addEventListener("resize", function() {
  hw =slider.offsetWidth/2;
});
    }); //$$(".flexider)
}) (); // flexider