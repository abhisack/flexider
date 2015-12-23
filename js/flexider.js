//helper function
/**function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
} 



var slider= document.querySelector(".slider"),
    slideCon= document.querySelector(".slide-con"),
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
}


function slideIt() {
  if(tX<=0 && tX>(slideCon.children.length-1)*100*-1) {
       slideCon.style.transition= "all .3s ease-out";
  tX-= 100;
    nc+=1;
  } else {
    tX= 0;
    slideCon.style.transition= "all 0s ease-out";
    nc=0;
  }
  
  slideCon.style.transform= "translateX("+tX+"%)";
  for(var k=0; k<sliderNav.children.length; k++) {
    sliderNav.children[k].classList.remove("focus-nav-item");
  }
  sliderNav.children[nc].classList.add("focus-nav-item");
 autoSlide= setTimeout(slideIt,delay*1000);
}

slideIt();


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
   var buttonNav= document.createElement("nav"),
       prev= document.createElement("button"),
       next= document.createElement("button");
       buttonNav.classList.add("button-nav");
       prev.classList.add("prev");
       next.classList.add("next");
       prev.textContent= "<";
       next.textContent= ">";
       buttonNav.appendChild(prev);
       buttonNav.appendChild(next);
       slider.appendChild(buttonNav);

//Event Handlers

next.addEventListener("click", moveNext, false);
prev.addEventListener("click", movePrevious, false);
      
 var tValue= 0;

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
  
      
   for(var k=0; k<sliderNav.children.length; k++) {
    sliderNav.children[k].classList.remove("focus-nav-item");
  }
  sliderNav.children[nc].classList.add("focus-nav-item");
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
     
   for(var k=0; k<sliderNav.children.length; k++) {
    sliderNav.children[k].classList.remove("focus-nav-item");
  }
  sliderNav.children[nc].classList.add("focus-nav-item");
  
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
                        
function swipeReady(e) {
  clearTimeout(autoSlide);
  startX= e.layerX;
  holdStatus= "true";
}

function swiping(e) {
 if(holdStatus=== "true") {
  dx= e.layerX;
  if(startX<dx) {
    moved= (dx-startX)* 1;
  } else {
    moved= (dx-startX)* 1;
  }
   
   function getNum(n) {
var stringN= n+ "",
    stringLen= stringN.length;

var num= stringN.substring(1, stringLen-2);

return parseInt(num);
}
   
  var tX2= (getNum(tX)*hw*2 *-1)+moved;
   console.log(tX2);
   
   //prevent sliding left when current slide is first one
   if(getNum(tX)==0 && moved > 0) {
     tX2=0;
   }
   
   //prevent sliding left when current slide is last one
    if(getNum(tX)==slideCon.children.length-1 && moved < 0) {
     tX2= (slideCon.children.length-1) *hw*2 *-1;
   }
   slideCon.style.transform= "translateX("+tX2+"px)";
   
 }
   
}
                                              
                        
function swiped(e) {
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



window.addEventListener("resize", function() {
  hw =slider.offsetWidth/2;
});


******************** first awesomeness******/

//helper function
function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
} 



var slider= document.querySelector(".slider"),
    slideCon= document.querySelector(".slide-con"),
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
}


function slideIt() {
  if(tX<=0 && tX>(slideCon.children.length-1)*100*-1) {
       slideCon.style.transition= "all .3s ease-out";
  tX-= 100;
    nc+=1;
  } else {
    tX= 0;
    slideCon.style.transition= "all 0s ease-out";
    nc=0;
  }
  
  slideCon.style.transform= "translateX("+tX+"%)";
  for(var k=0; k<sliderNav.children.length; k++) {
    sliderNav.children[k].classList.remove("focus-nav-item");
  }
  sliderNav.children[nc].classList.add("focus-nav-item");
 autoSlide= setTimeout(slideIt,delay*1000);
}

slideIt();


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
   var buttonNav= document.createElement("nav"),
       prev= document.createElement("button"),
       next= document.createElement("button");
       buttonNav.classList.add("button-nav");
       prev.classList.add("prev");
       next.classList.add("next");
       prev.textContent= "<";
       next.textContent= ">";
       buttonNav.appendChild(prev);
       buttonNav.appendChild(next);
       slider.appendChild(buttonNav);

//Event Handlers

next.addEventListener("click", moveNext, false);
prev.addEventListener("click", movePrevious, false);
      
 var tValue= 0;

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
  
      
   for(var k=0; k<sliderNav.children.length; k++) {
    sliderNav.children[k].classList.remove("focus-nav-item");
  }
  sliderNav.children[nc].classList.add("focus-nav-item");
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
     
   for(var k=0; k<sliderNav.children.length; k++) {
    sliderNav.children[k].classList.remove("focus-nav-item");
  }
  sliderNav.children[nc].classList.add("focus-nav-item");
  
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
slider.addEventListener("touchleave", swiped, false);
                        
function swipeReady(e) {
  clearTimeout(autoSlide);
    holdStatus= "true";
    if(e.type=== "touchstart") {
    e.preventDefault();
    startX= e.changedTouches.pageX;
  } else if(e.type=== "mousedown") {
       startX= e.layerX;
  }
}

function swiping(e) {
    if(e.type=== "touchmove") {
    e.preventDefault();
  }
  
 if(holdStatus=== "true") {
   if(e.type=== "touchmove") {
     dx= e.changedTouches.pageX;
   } else if (e.type=== "mousemove") {
  dx= e.layerX;
   }
  if(startX<dx) {
    moved= (dx-startX)* 1;
  } else {
    moved= (dx-startX)* 1;
  }
   
   function getNum(n) {
var stringN= n+ "",
    stringLen= stringN.length;

var num= stringN.substring(1, stringLen-2);

return parseInt(num);
}
   
  var tX2= (getNum(tX)*hw*2 *-1)+moved;
   console.log(tX2);
   
   //prevent sliding left when current slide is first one
   if(getNum(tX)==0 && moved > 0) {
     tX2=0;
   }
   
   //prevent sliding left when current slide is last one
    if(getNum(tX)==slideCon.children.length-1 && moved < 0) {
     tX2= (slideCon.children.length-1) *hw*2 *-1;
   }
   slideCon.style.transform= "translateX("+tX2+"px)";
   
 }
}
                                              
                        
function swiped(e) {
  if(e.type=== "touchend") {
    e.preventDefault();
  }
  
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



window.addEventListener("resize", function(e) {
  hw =slider.offsetWidth/2;
});
