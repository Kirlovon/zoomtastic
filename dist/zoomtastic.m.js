Object.assign||(console.log("Object.assing polyfill enabled"),Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(t){var e=arguments;if(null==t)throw new TypeError("Cannot convert first argument to object");for(var o=Object(t),i=1;i<arguments.length;i++){var n=e[i];if(null!=n){n=Object(n);for(var r=Object.keys(Object(n)),s=0,a=r.length;s<a;s++){var c=r[s],l=Object.getOwnPropertyDescriptor(n,c);void 0!==l&&l.enumerable&&(o[c]=n[c])}}}return o}})),window.NodeList&&!NodeList.prototype.forEach&&(console.log("NodeList.forEach polyfill enabled"),NodeList.prototype.forEach=function(t,e){e=e||window;for(var o=0;o<this.length;o++)t.call(e,this[o],o,this)});var t=function(t){if(this.config={preload:!0,duration:150,delay:200,zoomInCursor:"zoom-in",zoomOutCursor:"zoom-out",background:"rgba(0, 0, 0, 0.75)",easing:"ease-out",zIndex:"16777271",top:"50%",left:"50%",width:"95%",height:"95%",baseTop:"55%",baseLeft:"50%",baseHeight:"90%",baseWidth:"90%"},t){if("object"!=typeof this.config)throw new TypeError("Config must be an object");if(this.config=Object.assign(this.config,t),"boolean"!=typeof this.config.preload)throw new TypeError('Field "preload" must be a boolean');if("number"!=typeof this.config.duration)throw new TypeError('Field "duration" must be a number');if("number"!=typeof this.config.delay)throw new TypeError('Field "delay" must be a number');if("string"!=typeof this.config.zoomInCursor)throw new TypeError('Field "zoomInCursor" must be a string');if("string"!=typeof this.config.zoomOutCursor)throw new TypeError('Field "zoomOutCursor" must be a string');if("string"!=typeof this.config.background)throw new TypeError('Field "background" must be a string');if("string"!=typeof this.config.easing)throw new TypeError('Field "easing" must be a string');if("string"!=typeof this.config.top)throw new TypeError('Field "top" must be a string');if("string"!=typeof this.config.left)throw new TypeError('Field "left" must be a string');if("string"!=typeof this.config.width&&"number"!=typeof this.config.width)throw new TypeError('Field "width" must be a number or string');if("string"!=typeof this.config.height&&"number"!=typeof this.config.height)throw new TypeError('Field "height" must be a number or string')}this.mount()};t.prototype.mount=function(){var t=this,e=document.getElementById("zoomtastic-container");e&&e.remove();var o=document.createElement("div");o.id="zoomtastic-container",o.style.top="0",o.style.left="0",o.style.width="100%",o.style.height="100vh",o.style.opacity="0",o.style.position="fixed",o.style.overflow="hidden",o.style.cursor=this.config.zoomOutCursor,o.style.zIndex=String(this.config.zIndex),o.style.backgroundColor=this.config.background,o.style.transitionProperty="all",o.style.transitionDuration=this.config.duration+"ms",o.style.transitionTimingFunction=this.config.easing,o.style.display="none";var i=document.createElement("div");i.id="zoomtastic-image",i.style.top=String(this.config.baseTop),i.style.left=String(this.config.baseLeft),i.style.width=String(this.config.baseWidth),i.style.height=String(this.config.baseHeight),i.style.zIndex=String(this.config.zIndex),i.style.opacity="0",i.style.display="block",i.style.position="absolute",i.style.transform="translate(-50%, -50%)",i.style.backgroundSize="contain",i.style.backgroundRepeat="no-repeat",i.style.backgroundPosition="center",i.style.transitionProperty="all",i.style.transitionDuration=this.config.duration+"ms",i.style.transitionTimingFunction=this.config.easing,i.style.filter="drop-shadow(0 4px 64px rgba(0, 0, 0, 0.5))",o.addEventListener("click",function(){return t.hide()}),o.appendChild(i),document.body.appendChild(o)},t.prototype.listen=function(t){var e=this;void 0===t&&(t="[zoomtastic]"),document.querySelectorAll(t).forEach(function(t){t.style.cursor=e.config.zoomInCursor,t.addEventListener("click",function(o){o.preventDefault();var i=t.getAttribute("zoomtastic")||t.getAttribute("src")||t.getAttribute("lowsrc");i&&e.show(i)})})},t.prototype.show=function(t){var e=this,o=!this.config.preload,i=document.getElementById("zoomtastic-container"),n=document.getElementById("zoomtastic-image");if(i.style.display="block",setTimeout(function(){return i.style.opacity="1"},0),n.style.backgroundImage='url("'+encodeURI(t)+'")',this.config.preload){var r=new Image;r.onload=function(){o=!0,"function"==typeof e.config.onShow&&e.config.onShow()},r.src=t}else"function"==typeof this.config.onShow&&this.config.onShow();setTimeout(function(){var t=setInterval(function(){o&&(n.style.opacity="1",n.style.top=String(e.config.top),n.style.left=String(e.config.left),n.style.width=String(e.config.width),n.style.height=String(e.config.height),clearInterval(t))},10)},this.config.delay)},t.prototype.hide=function(){var t=this,e=document.getElementById("zoomtastic-container"),o=document.getElementById("zoomtastic-image");"function"==typeof this.config.onHide&&this.config.onHide(),o.style.opacity="0",o.style.top=String(this.config.baseTop),o.style.left=String(this.config.baseLeft),o.style.width=String(this.config.baseWidth),o.style.height=String(this.config.baseHeight),setTimeout(function(){e.style.opacity="0",setTimeout(function(){return e.style.display="none"},t.config.duration)},this.config.delay)};export default t;
//# sourceMappingURL=zoomtastic.m.js.map
