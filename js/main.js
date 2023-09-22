// Helper functions to check if device is mobile

var isMobile = Math.min(window.screen.width, window.screen.height) < 768 || navigator.userAgent.indexOf("Mobi") > -1;

//Flex Font

flexFont = function () {
  var divs = document.getElementsByClassName("flexFont");
    for(var i = 0; i < divs.length; i++) {
        var relFontsize = divs[i].offsetWidth*0.05;
        divs[i].style.fontSize = relFontsize+'px';
    }
  };

  window.onload = function(event) {
    flexFont();
  };
  window.onresize = function(event) {
    flexFont();
  };

// Declare main variables
const mainWrapper = document.querySelector('.home-wrapper');
const leftElement = document.querySelector('.left-column-fixed');
const rightElement = document.querySelector('.right-column-fixed');
const wrapperElement = document.querySelector('.cols-wrapper');
const resizer = document.querySelector(".resizer");
const resizerWidth = 36;
const height = leftElement.offsetHeight;


//check if device is not mobile
if (!isMobile) {
  
  console.log('not mobile');
  
  //Set the width of the main two scrollable columns
  leftElement.style.width = (window.innerWidth * 70 / 100 ) + 'px';
  rightElement.style.width =  ((window.innerWidth -leftElement.offsetWidth) - (resizerWidth * 2))  + 'px';

  resizer.addEventListener("mousedown", (event) => {
    document.addEventListener("mousemove", resize, false);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", resize, false);
    }, false);
  });
  
  flexFont();

  // Scroll Speed

    $.fn.moveIt = function(){
      var $window = $(window);
      var instances = [];

      $(this).each(function(){
        instances.push(new moveItItem($(this)));
      });

      window.onscroll = function(){
        var scrollTop = $window.scrollTop();
        instances.forEach(function(inst){
          inst.update(scrollTop);
        });
      }
    }

    var moveItItem = function(el){
      this.el = $(el);
      this.speed = parseInt(this.el.attr('data-scroll-speed'));
    };

    moveItItem.prototype.update = function(scrollTop){
      var pos = scrollTop / this.speed;
      this.el.css('transform', 'translateY(' + -pos + 'px)');
    };


      $(function(){
        $('[data-scroll-speed]').moveIt();
      });

  //TranslateY button view more works    
      
  window.onscroll = function() {
    const scrollTarget = document.querySelector('#bars');
    var scrollTop = document.documentElement.scrollTop * 5;
    console.log(scrollTop);
    scrollTarget.style.transform =
      "translateY(-" + scrollTop + "px)";
  };
  
}
else {
  // Mobile devices

  function move(element, amount, duration){
    element.style['transition-property'] = 'transform'
    element.style['transition-duration'] = `${duration}ms`
    element.style['transition-timing-function'] = "ease-in-out"
    setTimeout(() => element.style.transform =  "translateX(-" + amount + "px");
  } 

  leftPanel = document.querySelector('.column-left-main');
  leftPanel.classList.add('expanded');
   
  resizer.addEventListener('click', function(){
    console.log(leftPanel.innerWidth);
     
    if (leftPanel.classList.contains('expanded')){

      move(leftPanel,window.innerWidth - resizerWidth ,500 )
      //leftPanel.style.transform ="translateX(-" + (window.innerWidth - resizerWidth) + "px)";

      leftPanel.classList.remove('expanded');
      rightElement.classList.add('pos-absolute')
    }
    else {
      leftPanel.style.transform ="translateX(0px)";
      leftPanel.classList.add('expanded');
      rightElement.classList.remove('pos-absolute')
    }
  })

}



function resize(e) {
  const size = `${e.x}px`;
  leftElement.style.width = size;
  rightElement.style.width = (window.innerWidth - e.x - (resizerWidth * 2)) + 'px';
  resizer.style.width = resizerWidth / 2 + 'px';
}







/*
console.log(leftElement.offsetHeight);
rightElement.style.height = leftElement.offsetHeight +'px';
leftElement.style.height = leftElement.offsetHeight +'px';
*/


// Text fit on container

const isOverflown = ({ clientHeight, scrollHeight }) => scrollHeight > clientHeight

const resizeText = ({ element, elements, minSize = 10, maxSize = 512, step = 1, unit = 'px' }) => {
  (elements || [element]).forEach(el => {
    let i = minSize
    let overflow = false

        const parent = el.parentNode

    while (!overflow && i < maxSize) {
        el.style.fontSize = `${i}${unit}`
        overflow = isOverflown(parent)

      if (!overflow) i += step
    }

    // revert to last state where no overflow happened
    el.style.fontSize = `${i - step}${unit}`
  })
}

//
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}


function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


// Scroll


const scrollable = document.querySelector('.scroll-content');
const wrapper = document.querySelector('.home-wrapper');


let total = 0;

function topPosition(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top
  );
}









//Animación del titular principal

var animheading = gsap.timeline({
  repeat: -1, defaults: { duration: 0.5, ease: "elastic.out(1,1)" }
  });
  
  animheading.fromTo(".heading-word:nth-child(1)",
      { yPercent: 200, opacity: 0 },
      { yPercent: 0, opacity: 1 })
  .to(".heading-word:nth-child(1)",
      { opacity: 0, ease: "none", delay: 0.5 })
  
  .fromTo(".heading-word:nth-child(2)",
      { yPercent: 200, opacity: 0 },
      { yPercent: 0, opacity: 1 })
  .to(".heading-word:nth-child(2)",
      { opacity: 0, ease: "none", delay: 0.5 })
  
  .fromTo(".heading-word:nth-child(3)",
      { yPercent: 200, opacity: 0 },
      { yPercent: 0, opacity: 1 })
  .to(".heading-word:nth-child(3)",
      { opacity: 0, ease: "none", delay: 0.5 })

//Animación del hero section

  gsap.to(".more", {
    duration: 1,
    x: 10,
    repeat: -1,
    yoyo: true
  });

