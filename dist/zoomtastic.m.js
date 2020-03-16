Object.assign||(console.log("Object.assing polyfill enabled"),Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(t){var e=arguments;if(null==t)throw new TypeError("Cannot convert first argument to object");for(var i=Object(t),o=1;o<arguments.length;o++){var n=e[o];if(null!=n){n=Object(n);for(var r=Object.keys(Object(n)),s=0,a=r.length;s<a;s++){var c=r[s],l=Object.getOwnPropertyDescriptor(n,c);void 0!==l&&l.enumerable&&(i[c]=n[c])}}}return i}})),window.NodeList&&!NodeList.prototype.forEach&&(console.log("NodeList.forEach polyfill enabled"),NodeList.prototype.forEach=function(t,e){e=e||window;for(var i=0;i<this.length;i++)t.call(e,this[i],i,this)});var t=function(t){if(this.clickable=!1,this.config={duration:200,zoomInCursor:"zoom-in",zoomOutCursor:"zoom-out",background:"rgba(0, 0, 0, 0.75)",easing:"linear",zIndex:16777271,x:.5,y:.5,scale:.95,initialX:.5,initialY:.6,initialScale:.95},t){if("object"!=typeof this.config)throw new TypeError("Config must be an object");if(this.config=Object.assign(this.config,t),"number"!=typeof this.config.duration||this.config.duration<0)throw new TypeError('Field "duration" must be a number greater than 0');if("string"!=typeof this.config.zoomInCursor)throw new TypeError('Field "zoomInCursor" must be a string');if("string"!=typeof this.config.zoomOutCursor)throw new TypeError('Field "zoomOutCursor" must be a string');if("string"!=typeof this.config.background)throw new TypeError('Field "background" must be a string');if("string"!=typeof this.config.easing)throw new TypeError('Field "easing" must be a string');if("number"!=typeof this.config.zIndex)throw new TypeError('Field "zIndex" must be a number or string');if("number"!=typeof this.config.x||this.config.x>1||this.config.x<0)throw new TypeError('Field "x" must be a number in the range from 0 to 1');if("number"!=typeof this.config.y||this.config.y>1||this.config.y<0)throw new TypeError('Field "y" must be a number in the range from 0 to 1');if("number"!=typeof this.config.scale||this.config.scale>1||this.config.scale<0)throw new TypeError('Field "scale" must be a number in the range from 0 to 1');if("number"!=typeof this.config.initialX||this.config.initialX>1||this.config.initialX<0)throw new TypeError('Field "initialX" must be a number in the range from 0 to 1');if("number"!=typeof this.config.initialY||this.config.initialY>1||this.config.initialY<0)throw new TypeError('Field "initialY" must be a number in the range from 0 to 1');if("number"!=typeof this.config.initialScale||this.config.initialScale>1||this.config.initialScale<0)throw new TypeError('Field "initialScale" must be a number in the range from 0 to 1')}this.mount()};t.prototype.mount=function(){var t=this,e=document.getElementById("zoomtastic-container");e&&e.remove();var i=document.createElement("div");i.id="zoomtastic-container",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.height="100vh",i.style.display="block",i.style.position="fixed",i.style.overflow="hidden",i.style.cursor=this.config.zoomOutCursor,i.style.zIndex=String(this.config.zIndex),i.style.display="none";var o=document.createElement("div");o.id="zoomtastic-background",o.style.top="0",o.style.left="0",o.style.width="100%",o.style.height="100%",o.style.zIndex="0",o.style.opacity="0",o.style.position="absolute",o.style.backgroundColor=this.config.background,o.style.transitionProperty="opacity",o.style.transitionDuration=Math.round(this.config.duration)+"ms",o.style.transitionTimingFunction=this.config.easing,o.style.pointerEvents="none",o.style.userSelect="none";var n=document.createElement("div");n.id="zoomtastic-image",n.style.top=String(100*this.config.initialY)+"%",n.style.left=String(100*this.config.initialX)+"%",n.style.width=String(100*this.config.initialScale)+"%",n.style.height=String(100*this.config.initialScale)+"%",n.style.zIndex="16777271",n.style.opacity="0",n.style.display="block",n.style.position="absolute",n.style.transform="translate(-50%, -50%)",n.style.backgroundSize="contain",n.style.backgroundRepeat="no-repeat",n.style.backgroundPosition="center",n.style.transitionProperty="all",n.style.transitionDuration=Math.round(this.config.duration/2)+"ms",n.style.transitionTimingFunction=this.config.easing,n.style.pointerEvents="none",n.style.userSelect="none",n.style.filter="drop-shadow(0 4px 64px rgba(0, 0, 0, 0.1))",i.addEventListener("click",function(){t.clickable&&(t.hide(),t.clickable=!1)}),i.appendChild(n),i.appendChild(o),document.body.appendChild(i)},t.prototype.clearTimers=function(){clearTimeout(this.timer0),clearTimeout(this.timer1),clearTimeout(this.timer2),clearTimeout(this.timer3),clearTimeout(this.timer4)},t.prototype.listen=function(t){var e=this;void 0===t&&(t="zoomtastic"),document.querySelectorAll("["+t+"]").forEach(function(i){i.style.cursor=e.config.zoomInCursor,i.addEventListener("click",function(o){o.preventDefault(),e.clickable=!1;var n=i.getAttribute(t)||i.getAttribute("src")||i.getAttribute("lowsrc");n&&e.show(n)})})},t.prototype.show=function(t){try{var e=this,i=document.getElementById("zoomtastic-container"),o=document.getElementById("zoomtastic-background"),n=document.getElementById("zoomtastic-image");if("string"!=typeof t)throw new TypeError("URL must be a string");return"function"==typeof e.beforeShow&&e.beforeShow(),e.clearTimers(),i.style.cursor=e.config.zoomOutCursor,i.style.display="block",e.timer0=setTimeout(function(){return o.style.opacity="1"},0),n.style.backgroundImage='url("'+encodeURI(t)+'")',e.timer1=setTimeout(function(){e.clickable=!0,n.style.opacity="1",n.style.top=String(100*e.config.x)+"%",n.style.left=String(100*e.config.y)+"%",n.style.width=String(100*e.config.scale)+"%",n.style.height=String(100*e.config.scale)+"%"},Math.round(e.config.duration/2)),e.timer2=setTimeout(function(){"function"==typeof e.afterShow&&e.afterShow()},Math.round(e.config.duration)),Promise.resolve()}catch(t){return Promise.reject(t)}},t.prototype.hide=function(){try{var t=this,e=document.getElementById("zoomtastic-container"),i=document.getElementById("zoomtastic-background"),o=document.getElementById("zoomtastic-image");return"function"==typeof t.beforeHide&&t.beforeHide(),t.clearTimers(),e.style.cursor="auto",o.style.opacity="0",o.style.top=String(100*t.config.initialY)+"%",o.style.left=String(100*t.config.initialX)+"%",o.style.width=String(100*t.config.initialScale)+"%",o.style.height=String(100*t.config.initialScale)+"%",t.timer3=setTimeout(function(){i.style.opacity="0"},Math.round(t.config.duration/2)),t.timer4=setTimeout(function(){e.style.display="none",t.clickable=!0,"function"==typeof t.afterHide&&t.afterHide()},Math.round(t.config.duration)),Promise.resolve()}catch(t){return Promise.reject(t)}};export default t;
//# sourceMappingURL=zoomtastic.m.js.map