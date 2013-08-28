var midori={browserType:window.opera?"Opera":((navigator.userAgent.indexOf("WebKit")!=-1)?"Safari":((navigator.userAgent.indexOf("MSIE")!=-1)?"MSIE":"Gecko")),browserOS:(navigator.userAgent.indexOf("Windows")!=-1)?"Win":((navigator.userAgent.indexOf("Macintosh")!=-1)?"Mac":"Other"),domReady:[],each:function(d,b,a){var e=d.firstChild;while(e){if(!a){b(e)}if(e.firstChild){this.each(e,b,a)}if(a){b(e)}e=e.nextSibling}},sibling:function(c,b){var a=c;if(b=="next"){do{a=a.nextSibling}while(a&&a.nodeType==3)}else{if(b=="prev"){do{a=a.previousSibling}while(a&&a.nodeType==3)}}return(a==c)?false:a},parseSelectors:function(b){var k=this.trim(b).split("");var l=-1;var a="";var d=[],n=[],e=[];var m=false,g=false,h=false;for(var f=0,j=k.length;f<j;f++){if(m){if(g){switch(k[f]){case'"':h=!h;break;case"]":if(!h){n[l].push(a);g=false;a=""}break;case"\\":a+=k[++f];break;default:a+=k[f]}}else{switch(k[f]){case"[":g=true;break;case" ":case">":case",":m=false;e[l]=k[f];break;case"\\":d[l]+=k[++f];break;default:d[l]+=k[f]}}}else{switch(k[f]){case" ":case">":case",":e[l]+=k[f];break;default:m=true;d[++l]=k[f];n[l]=[]}}}return{elements:d,attrs:n,separators:e}},processAttrs:function(e,c,g){for(var f=0,d=c.length,b;f<d;f++){b=(c[f]=="class")?(e.className?e.className:null):e.getAttribute(c[f]);switch(typeof g[f]){case"undefined":if(b==null){return false}break;case"string":if(b==g[f]){return false}break;default:if(!g[f].test(b)){return false}}}return true},processPseudo:function(e,h,d,b){var a,f,g=[],l=0;if(!(f=e.parentNode.getAttribute("midorinodekey"))){e.parentNode.setAttribute("midorinodekey",f=Math.random().toString().substr(2))}if(a=this.pCache[f]){g=a.parentChildren,l=a.pI}else{var i=e.parentNode.firstChild;while(i){if(i.nodeType==1){g.push(i)}i=i.nextSibling}this.pCache[f]={parentChildren:g,pI:0}}var j=g.length;switch(h){case"first-child":if(e==g[0]){return true}break;case"last-child":if(e==g[j-1]){return true}break;case"only-child":if(j==1){return true}break}if(h=="nth-child"){var k=d*l+b;var m=-50;while(k>-50&&k<=j){if(k>=0&&g[k-1]==e){this.pCache[f]["pI"]=(d>=0)?l+1:0;return true}l++,k+=d;if(k==m){break}m=k}}},getMatches:function(u,k,t,m){this.pCache={};var b=[],h=[];var j,g,d,e,l,f,p,o;this.postProcess=function(i){if(!r&&!e){b.push(i);return}var a=true;if(r&&!this.processAttrs(i,t,h)){a=false}if(e&&!this.processPseudo(i,l,p,o)){a=false}if(a){b.push(i)}};for(var q=0,r=t.length;q<r;q++){j=t[q].match(/([a-z0-9_-]+)\s*([=^$*|~!]{0,2})\s*"?([^"]*)"?$/i);t[q]=j[1];switch(j[2]){case"=":h[q]=new RegExp("^"+j[3]+"$","i");break;case"^=":h[q]=new RegExp("^"+j[3],"i");break;case"$=":h[q]=new RegExp(j[3]+"$","i");break;case"*=":h[q]=new RegExp(j[3],"i");break;case"~=":h[q]=new RegExp("^"+j[3]+"$|^"+j[3]+"\\s|\\s"+j[3]+"\\s|\\s"+j[3]+"$","i");break;case"!=":h[q]=j[3]}}if(k.indexOf(":")!=-1){j=k.split(":");k=j[0];e=j[1].match(/([a-z-]+)\(?([a-z0-9+-]*)\)?/i);l=e[1].toLowerCase();switch(f=e[2].toLowerCase()){case"odd":f="2n+1";break;case"even":f="2n"}j=f.match(/([0-9+-]*)(n?)([0-9+-]*)/i);p=parseInt(j[2]?(j[1]?((j[1]=="-")?-1:j[1]):1):0);o=parseInt(j[3]?j[3]:((j[1]&&!j[2])?j[1]:0))}if(k.indexOf("#")!=-1){this.postProcess(document.getElementById(k.substr(k.indexOf("#")+1)))}else{if(k.indexOf(".")!=-1){j=k.split(".");var n=k.substr(j[0].length+1).replace("."," ");var c=new RegExp("^"+n+"$|^"+n+"\\s|\\s"+n+"\\s|\\s"+n+"$","i");g=u.getElementsByTagName(j[0]?j[0]:"*");for(q=0,d=g.length;q<d;q++){if((!m&&c.test(g[q].className))||(m&&c.test(g[q].className)&&g[q].parentNode==u)){this.postProcess(g[q])}}}else{if(k=="*"||/^[A-Za-z0-9]+$/.test(k)){for(q=0,g=u.getElementsByTagName(k),d=g.length;q<d;q++){if(!m||(m&&g[q].parentNode==u)){this.postProcess(g[q])}}}}}return b},get:function(selectorText,startAt){var selectors=this.parseSelectors(selectorText);var numS=selectors.elements.length;if(!startAt){startAt=document}if(numS==1){var idMatch=selectors.elements[0].match(/^[a-z0-9*]*#([^,:]+)$/i);if(idMatch&&selectors.attrs[0]==""&&selectors.separators==""){return document.getElementById(idMatch[1])}}var objs=this.getMatches(startAt,selectors.elements[0],selectors.attrs[0]);var allObjs=[],newObjs,separator;for(var i=1;i<numS;i++){newObjs=[];separator=this.trim(selectors.separators[i-1]);if(separator==","){allObjs=this.concatUnique(allObjs,objs);objs=this.getMatches(startAt,selectors.elements[i],selectors.attrs[i])}else{var oneLevelOnly=(separator==">")?true:false;for(var j=0,numObjs=objs.length;j<numObjs;j++){if(!this.inArray(objs[j],newObjs)){newObjs=this.concatUnique(newObjs,this.getMatches(objs[j],selectors.elements[i],selectors.attrs[i]),oneLevelOnly)}}objs=newObjs}}allObjs=this.concatUnique(allObjs,objs);allObjs.apply=function(p){for(var i=0,numObjs=this.length;i<numObjs;i++){(typeof p=="function")?p(this[i]):eval("this[i]."+p)}};return allObjs},getCssRule:function(e,g,f){var b=[];var h=document.styleSheets[e];h=h.rules?h.rules:h.cssRules;g=g.toLowerCase();f=(this.browserType=="Safari")?f.replace(/([A-Z])/,"-$1").toLowerCase():f.toLowerCase();for(var d=0,a=h.length;d<a;d++){if(g=="*"||h[d].selectorText.toLowerCase()==g){for(var c in h[d].style){if(this.browserType=="Safari"){if(h[d].style[c].toLowerCase&&h[d].style[c].toLowerCase()==f){if(g=="*"){b[h[d].selectorText]=value}else{return h[d].style[h[d].style[c]]}}}else{if(c.toLowerCase()==f){if(g=="*"){b[h[d].selectorText]=h[d].style[c]}else{return h[d].style[c]}}}}}}return b},setStyles:function(c,b){for(var a in b){(a=="float")?this.setFloat(c,b[a]):c.style[a]=b[a]}},setAttributes:function(c,b){for(var a in b){(a=="className")?c.className=b[a]:c.setAttribute(a,b[a])}},removeNode:function(a){return a.parentNode.removeChild(a)},addEventListener:function(b,a,c){this.safariReady=function(){this.readyTimer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){midori.runReadyEvents()}},10)};this.msieReady=function(){document.write('<script id="midori_onload" src="javascript: {}" defer="true"><\/script>');this.get("#midori_onload").onreadystatechange=function(){if(this.readyState=="complete"){midori.runReadyEvents()}}};if(b.addEventListener){if(a=="ready"){switch(this.browserType){case"Safari":this.domReady.push(c);if(!this.readyTimer){this.safariReady()}return;case"Opera":case"Gecko":a="DOMContentLoaded";break;default:a="load"}}b.addEventListener(a,c,false);return}if(a=="ready"){if(!this.domReady.length){this.msieReady()}this.domReady.push(c);return}b.attachEvent("on"+a,c)},runReadyEvents:function(){if(this.readyTimer){clearInterval(this.readyTimer)}for(var a=0,b=this.domReady.length;a<b;a++){this.domReady[a]()}},getEventTarget:function(a){var b=a.target?a.target:a.srcElement;if(b.nodeType==3){b=b.parentNode}return b},getMousePos:function(a){if(a.targetTouches&&a.targetTouches.length){return{x:a.targetTouches[0].pageX,y:a.targetTouches[0].pageY}}else{if(a.pageX||a.pageY){return{x:a.pageX,y:a.pageY}}else{return{x:a.clientX+document.documentElement.scrollLeft-document.body.clientLeft,y:a.clientY+document.documentElement.scrollTop-document.body.clientTop}}}},preventBubble:function(a){a.stopPropagation?a.stopPropagation():window.event.cancelBubble=true},preventDefault:function(a){a.preventDefault?a.preventDefault():window.event.returnValue=false},getFloat:function(a){return((this.browserType=="MSIE")?a.style.styleFloat:a.style.cssFloat)},setFloat:function(b,a){(this.browserType=="MSIE")?b.style.styleFloat=a:b.style.cssFloat=a},getSelection:function(a){if(this.browserType!="MSIE"){return a.getSelection()}if(a==window){a=document}var b=a.selection.createRange();if(a.selection.type!="Control"){return b}},getSelectionText:function(a){return(this.browserType=="MSIE")?a.htmlText:a.toString()},getCookie:function(e){var c=document.cookie.split("; ");for(var a=0,b=c.length;a<b;a++){var d=c[a].split("=");if(d[0]==e){return unescape(d[1].replace(/\+/g," "))}}},setCookie:function(c,e,a,f,d){var b=new Date();document.cookie=c+"="+escape(e)+"; expires="+b.toUTCString(b.setSeconds(a))+(f?"; path="+f:"")+(d?"; domain="+d:"")},convertToFields:function(b,f,c){for(var d in c){if(typeof c[d]=="object"){this.convertToFields(b,f+"["+d+"]",c[d])}else{var e=document.createElement("input");this.setAttributes(e,{type:"hidden",name:f+"["+d+"]",value:c[d]});b.appendChild(e)}}},replace:function(a,e){if(!e){return a}var d=a.match(/:[A-Za-z0-9_]+/g).sort().reverse();for(var b=0,c=d.length;b<c;b++){a=a.replace(d[b],e[d[b].substr(1)])}return a},trim:function(a){return a.replace(/^\s+|\s+$/g,"")},uniqid:function(a){return Math.floor(Math.random()*(a?a:100000))},concatUnique:function(c,b){var a=[];for(var d=0,e=b.length;d<e;d++){if(!this.inArray(b[d],c)){a.push(b[d])}}return c.concat(a)},implode:function(f,b){if(typeof b!="object"){return b}var g="";if(b.length&&!b.propertyIsEnumerable("length")){for(var e=0,d=b.length;e<d;e++){g+=f+b[e]}}else{for(var c in b){g+=f+b[c]}}return g.substr(f.length)},inArray:function(c,b){for(var e=0,d=b.length;e<d;e++){if((c!=null&&b[e].constructor==Array&&c.constructor==Array&&b[e].toString()==c.toString())||(b[e]==c)){return true}}},shortenWords:function(b,a){a=a?a-3:45;this.each(b,function(h){if(h.nodeType!=3){return}var k=h.data.split(" ");var f=false,c;for(var e=0,j=k.length;e<j;e++){if((stLen=k[e].length)>a){var g=Math.floor(stLen-a);var d=Math.floor(stLen/2-g/2);k[e]=k[e].substr(0,d)+"..."+k[e].substr(d+g);f=true}}if(f){h.data=midori.implode(" ",k)}})},resizeImg:function(b,a){a=a?a:400;this.get("img",b).apply(function(c){if(c.width>a){if(c.style.msInterpolationMode){c.style.msInterpolationMode="bicubic"}c.width=a}})},saveCheckboxState:function(b,a,c){a.checked?b.innerHTML++:(--b.innerHTML==0)?b.innerHTML="":{};if(c){c(b.innerHTML)}},checkRequiredFields:function(h){h.required=h.required.split(",");var b=this.get("#"+h.formId);var a=false;var k,j,g,e;for(var f=0,d=h.required.length;f<d;f++){if(k=this.trim(h.required[f])){j=this.get("#"+k);g=(j.type.toLowerCase()=="checkbox")?"c":"t";e=(g=="c")?j.parentNode.style:j.style;e.backgroundColor="";if((g=="c"&&!j.checked)||(this.trim(j.value)=="")){e.backgroundColor="#FAA";a=true}}}this.get("#"+h.formId+"-status").innerHTML=a?h.message:"";var c=h.callback?h.callback():"";if(c===false||a){if(h.event){this.preventDefault(h.event)}return false}else{if(!h.event){b.submit()}}},getWindowDims:function(){if(this.browserType=="MSIE"){return{windowWidth:document.documentElement.clientWidth,windowHeight:document.documentElement.clientHeight,scrollTop:document.documentElement.scrollTop}}else{return{windowWidth:window.innerWidth,windowHeight:window.innerHeight,scrollTop:window.scrollY}}},getPos:function(c,a){var d=0,b=0;a=a?a.offsetParent:null;while(c.offsetParent!=a){d+=c.offsetLeft,b+=c.offsetTop-c.scrollTop,c=c.offsetParent}return{x:d,y:b}},highlightRow:function(c,a,b){this.get("td",c).apply(function(e){var d=e.className.split(" ");e.className=(d[d.length-1]==a)?e.className.substr(0,e.className.length-a.length-1):b?e.className:e.className+" "+a})}};var midoriFX={intervals:{},lastIntervalId:0,getOutsideSize:function(c,d){var b=d=="width"?c.offsetWidth:c.offsetHeight;c.style[d]=b.toString()+"px";var a=(d=="width"?c.offsetWidth:c.offsetHeight)-b;c.style[d]=(b-a).toString()+"px";return a},showWithAnim:function(b){var a=this.intervals[b.intervalKey].newSize?false:true;this.intervals[b.intervalKey].newSize+=Math.round((b.elementSize-this.intervals[b.intervalKey].newSize)/2);if(this.intervals[b.intervalKey].newSize<b.elementSize){b.element.style[b.what]=this.intervals[b.intervalKey].newSize.toString()+"px"}else{clearInterval(this.intervals[b.intervalKey].intervalId);b.element.style[b.what]=b.elementSize.toString()+"px";b.element.style.overflow="visible";if(b.callback){b.callback(b.element)}}if(a){b.element.style.display="block"}},show:function(f,e,d){var c=d?"width":"height";var a=midori.get("#"+f);var b={intervalKey:Math.random(),element:a,callback:e,what:c};midori.setStyles(a,{overflow:"hidden",visibility:"hidden",display:"block"});b.elementSize=(d?a.offsetWidth:a.offsetHeight)-this.getOutsideSize(a,c),midori.setStyles(a,{display:"none",visibility:"visible"});this.intervals[b.intervalKey]={newSize:0,intervalId:setInterval(function(){midoriFX.showWithAnim(b)},40)}},hideWithAnim:function(c){var b=(c.what=="width"?c.element.offsetWidth:c.element.offsetHeight)-c.outsideSize;var a=c.constantSpeed?c.oldSize-4:Math.round(b/1.5);if(a>2){c.element.style[c.what]=a.toString()+"px";c.element.style.opacity=a/50}else{clearInterval(this.intervals[c.intervalKey].intervalId);c.element.style.display="none";c.element.style[c.what]=c.elementSize.toString()+"px";c.element.style.opacity=1;if(c.callback){c.callback(c.element)}}},hide:function(h,g,c,f){var e=f?"width":"height";var b=midori.get("#"+h);var a=this.getOutsideSize(b,e);var d={intervalKey:Math.random(),element:b,outsideSize:a,elementSize:(f?b.offsetWidth:b.offsetHeight)-a,callback:g,constantSpeed:c,what:e};b.style.overflow="hidden";this.intervals[d.intervalKey]={intervalId:setInterval(function(){midoriFX.hideWithAnim(d)},40)}},scrollToWithAnim:function(b,a){if(Math.abs(a-this.intervals[b].scrollPos)>10){this.intervals[b].scrollPos+=Math.round((a-this.intervals[b].scrollPos)/8);scrollTo(0,this.intervals[b].scrollPos)}else{clearInterval(this.intervals[b].intervalId)}},scrollTo:function(e,a){var c=midori.getPos(midori.get("#"+e)).y+(a?a:0);var b=Math.random();var d=midori.getWindowDims();this.intervals[b]={scrollPos:d.scrollTop,intervalId:setInterval(function(){midoriFX.scrollToWithAnim(b,c)},15)}},sliderToWithAnim:function(c,a,b){var d=this.intervals[c];var e=Math.abs(b-d.targetPos);d.targetPos+=Math.round(e/8)*d.direction;a.style.marginLeft=-d.targetPos+"px";if(e<4){clearInterval(d.intervalId)}},slider:function(c,d,b){var a=midori.get("#"+c);var g=midori.getPos(midori.get("#"+d),a).x;var e=a.style.marginLeft?Math.abs(parseInt(a.style.marginLeft,10)):0;var f=Math.random();if(this.lastIntervalId){clearInterval(this.lastIntervalId)}this.intervals[f]={targetPos:e,direction:(e>g)?-1:1,intervalId:setInterval(function(){midoriFX.sliderToWithAnim(f,a,g)},15)};this.lastIntervalId=this.intervals[f].intervalId}};var midoriPopup={show:function(c){if(typeof c.x=="undefined"){c.x=5}if(typeof c.y=="undefined"){c.y=-5}this.popupId=c.popupId;var a=midori.get("#"+c.popupId);var d=midori.getWindowDims();var b=c.showAtMousePos?midori.getMousePos(c.event):midori.getPos(c.obj);a.style.display="block";if(this.activePopup){this.activePopup.style.display="none"}c.obj.blur();if(d.windowWidth<b.x+a.offsetWidth+c.x){b.x-=a.offsetWidth}while(b.y+a.offsetHeight+c.y-d.scrollTop>d.windowHeight){b.y-=a.offsetHeight+20}midori.setStyles(a,{left:(b.x+c.x)+"px",top:(b.y+c.y+c.obj.offsetHeight)+"px"});this.activePopup=a;c.noAnim?a.style.display="block":midoriFX.show(this.popupId);if(c.event){midori.preventDefault(c.event)}if(c.showCallback){c.showCallback(this)}this.hideCallback=c.hideCallback?c.hideCallback:false},hide:function(){if(this.activePopup==null){return}if(this.hideCallback){this.hideCallback(this)}midoriFX.hide(this.popupId);this.activePopup=null}};midori.addEventListener(document,"mouseup",function(a){midoriPopup.hide()});midori.addEventListener(document,"touchend",function(a){midoriPopup.hide()});var midoriTab={selectedTabs:{},select:function(c,a){var b=c.getAttribute("tabset");if(this.selectedTabs[b]){this.selectedTabs[b].parentNode.className="";midori.get("#"+this.selectedTabs[b].hash.substr(1)).style.display="none"}this.selectedTabs[b]=c;c.parentNode.className="tab-selected";a?midori.get("#"+c.hash.substr(1)).style.display="block":midoriFX.show(c.hash.substr(1))},init:function(){midori.get(".tab-set").apply(function(a){midori.get("#"+a.id+" a").apply(function(b){b.setAttribute("tabset",a.id);if(b.parentNode.className=="tab-selected"){midoriTab.selectedTabs[a.id]=b;midoriTab.select(b,true)}midori.addEventListener(b,"click",function(d){var c=midori.getEventTarget(d);c.blur();midoriTab.select(c);midori.preventDefault(d)})})})}};var midoriHistory={history:[],modifyLocation:function(a){var b=window.location.toString();window.location=(b.indexOf("#")==-1)?b+"#"+a:b.replace(/#.+/,"#"+a)},add:function(b){if(b==this.last){return}this.history.push(b);this.modifyLocation(b);this.last=b;if(midori.browserType=="MSIE"){var a=midori.get("#midori_history").contentWindow.document;a.open('javascript: "<html></html>"');a.write('<html><body><div id="me">'+b+"</div></body></html>");a.close()}},remove:function(c){var d=this.history;for(var b=0,a=d.length;b<a;b++){if(d[b]==c){d.splice(b,1);if(b==a){this.last=d[d.length-1]}}}this.history=d},onChange:function(){var a=window.location.toString();var b=(midori.browserType=="MSIE")?midori.get("#midori_history").contentWindow.document.getElementById("me").innerText:(a.indexOf("#")!=-1)?a.match(/#(.+)$/)[1]:"";if(midori.browserType=="MSIE"){if(midoriHistory.oldItem!=b&&midori.inArray(b,midoriHistory.history)){midoriHistory.oldItem=b;midoriHistory.modifyLocation(b);midoriHistory.callback(b)}}else{if(midoriHistory.oldLoc!=a&&midori.inArray(b,midoriHistory.history)){midoriHistory.oldLoc=a;midoriHistory.callback(b)}}},init:function(a){this.callback=a;if(midori.browserType=="MSIE"){document.body.appendChild(document.createElement("div")).innerHTML='<iframe id="midori_history" style="position: absolute; width: 1px; height: 1px"></iframe>'}setInterval(this.onChange,250)}};function midoriTableSelection(e){this.vars=e;this.rowIds=[];var f=this;var b=document.createElement("input");b.setAttribute("type","checkbox");midori.addEventListener(b,"click",function(k){var m,j,l;for(var h=0,g=f.rowIds.length;h<g;h++){m=f.rowIds[h];j=midori.get("#"+e.rowPrefix+"cb_"+m).firstChild;l=j.checked;j.checked=!l;j.value=l?"":m;midori.highlightRow(midori.get("#"+e.rowPrefix+m),e.rowHighlight);midori.saveCheckboxState(midori.get("#"+e.tableId+"_cb_parent"),j)}});var c=midori.get("#"+e.tableId+" th")[0];var d=document.createElement("th");midori.setAttributes(d,{id:e.rowPrefix+"header-cb",align:"left",className:c.className});d.appendChild(b);d.style.display="none";c.parentNode.appendChild(d);var a=document.createElement("div");a.id=e.tableId+"_cb_parent";document.body.appendChild(a);midori.get("#"+e.tableId+' tr[id^="'+e.rowPrefix+'"]').apply(function(i){var k,h,j,g;midori.get("td:last-child",i).apply(function(l){g=l.className});j=i.id.substr(e.rowPrefix.length);k=document.createElement("td");k.style.display="none";midori.setAttributes(k,{id:e.rowPrefix+"cb_"+j,className:g});h=document.createElement("input");midori.setAttributes(h,{name:e.checkboxName,type:"checkbox",value:j});midori.addEventListener(h,"click",function(l){midori.highlightRow(midori.get("#"+e.rowPrefix+j),e.rowHighlight);midori.saveCheckboxState(midori.get("#"+e.tableId+"_cb_parent"),h);this.value=j});k.appendChild(h);i.appendChild(k);f.rowIds.push(j)});this.toggle=function(){var g=this.rowIds.length;if(midori.get("#"+this.vars.rowPrefix+"header-cb").style.display=="none"){midori.get("#"+this.vars.rowPrefix+"header-cb").style.display="";for(var h=0;h<g;h++){var j=this.rowIds[h];midori.get("#"+this.vars.rowPrefix+"cb_"+j).style.display="";if(midori.get("#"+this.vars.rowPrefix+"cb_"+j).firstChild.checked){midori.highlightRow(midori.get("#"+this.vars.rowPrefix+j),this.vars.rowHighlight)}}if(e.showCallback){e.showCallback(this)}}else{midori.get("#"+this.vars.rowPrefix+"header-cb").style.display="none";for(var h=0;h<g;h++){midori.get("#"+this.vars.rowPrefix+"cb_"+this.rowIds[h]).style.display="none";midori.highlightRow(midori.get("#"+this.vars.rowPrefix+this.rowIds[h]),this.vars.rowHighlight,true)}if(e.hideCallback){e.hideCallback(this)}}}}function midoriDragDrop(a,b){var c=this;this.container=midori.get("#"+a);this.init=function(){this.objs=[];this.objsCoords=[];this.mouseMoved=false;this.dragged=null;midori.each(this.container,function(e){if(/not-draggable/.test(e.className)||!/draggable/.test(e.className)||e.style.display=="none"){return}c.objs.push(e);for(var d=0;d<2;d++){midori.addEventListener(e,["mousedown","touchstart"][d],function(i){var f=midori.getMousePos(i);var h=midori.getEventTarget(i);if(/not-draggable/.test(h.className)){return}while(!/draggable/.test(h.className)){h=h.parentNode}var g=midori.getPos(h);c.dragged=h;c.mouseOffset={x:f.x-g.x,y:f.y-g.y};if(!/drop-target/.test(e.className)){h.style.opacity=".5";midori.preventBubble(i);midori.preventDefault(i)}c.removeDraggedObj(h)})}},true)};this.findPlace=function(e,k){var o=k&&e.targetTouches?this.lastMousePos:midori.getMousePos(e);var g,m,l;if(!this.objsCoords.length){for(var h=0,d=this.objs.length;h<d;h++){if((g=this.objs[h])&&(l=midori.getPos(g))){this.objsCoords.push({obj:g,x:l.x,y:l.y,width:g.offsetWidth,height:g.offsetHeight})}}}for(var f=0,n=this.objsCoords.length;f<n;f++){if(m=this.objsCoords[f]){if(!((o.x>=m.x&&o.x<=m.x+m.width)&&(o.y>=m.y&&o.y<=m.y+m.height))){continue}m.where=midori.getFloat(m.obj)?(o.x<m.x+m.width/2)?"prev":"next":(o.y<m.y+m.height/2)?"prev":"next";return m}}};this.removeDraggedObj=function(e){var d,f=this.objs.length;midori.each(e,function(g){if(!/draggable/.test(g.className)){return}for(d=0;d<f;d++){if(c.objs[d]==g){c.objs[d]="";break}}},true);for(d=0;d<f;d++){if(this.objs[d]==e){this.objs[d]="";break}}};this.mouseMove=function(f){if(!this.dragged||/drop-target/.test(this.dragged.className)){return}midori.preventDefault(f);var d=midori.getMousePos(f);this.lastMousePos=d;this.mouseMoved=true;midori.setStyles(this.dragged,{position:"absolute",left:(d.x-this.mouseOffset.x)+"px",top:(d.y-this.mouseOffset.y)+"px"});midori.setFloat(this.spacer,midori.getFloat(this.dragged));var e;if((e=this.findPlace(f))&&(this.dropCallback(e,this.dragged,this.spacer))){midori.setStyles(this.spacer,{display:"block",height:this.dragged.offsetHeight+"px"});if(midori.getFloat(this.spacer)){this.spacer.style.width=this.dragged.offsetWidth+"px"}}else{this.spacer.style.display="none"}};this.mouseUp=function(e){this.doneDragging=false;if(!this.dragged){return}var d;if(this.mouseMoved&&(d=this.findPlace(e,true))){this.dropCallback(d,this.dragged);this.doneDragging=true}if(!this.dragged){return}this.spacer.style.display="none";midori.setStyles(this.dragged,{position:"",opacity:"1"});this.init(this.container)};this.defaultDropCallback=function(f,d,e){if(/drop-target/.test(f.obj.className)){return f.obj.appendChild(e?e:d)}return(f.where=="next"&&!f.obj.nextSibling)?f.obj.parentNode.appendChild(e?e:d):f.obj.parentNode.insertBefore(e?e:d,(f.where=="prev")?f.obj:f.obj.nextSibling)};midori.addEventListener(this.container,"mousemove",function(d){c.mouseMove(d)});midori.addEventListener(this.container,"mouseup",function(d){c.mouseUp(d)});midori.addEventListener(this.container,"click",function(d){if(c.doneDragging){midori.preventDefault(d)}});midori.addEventListener(this.container,"touchmove",function(d){c.mouseMove(d)});midori.addEventListener(this.container,"touchend",function(d){c.mouseUp(d)});this.spacer=document.createElement("div");this.spacer.innerHTML="&nbsp;";midori.setAttributes(this.spacer,{id:"midori_dd_spacer"+midori.uniqid(),className:"midori-dd-spacer"});this.dropCallback=b?b:this.defaultDropCallback;this.init()}function midoriAjax(f,d,a){var c=this;this.cache={};this.callback=f;try{this.request=new XMLHttpRequest()}catch(b){try{this.request=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){this.request=new ActiveXObject("Microsoft.XMLHTTP")}}this.runCallback=function(g,e){if(!e){if(c.request.readyState!=4){return}c.responseText=c.request.responseText;c.responseXML=c.request.responseXML;c.status=c.request.status;c.cache[c.cacheKey]=c.responseText}c.callback(d)};this.post=function(g,k,m,l){var j;this.cacheKey=g+"?"+k;if(a&&((j=this.cache[this.cacheKey])!=null)){this.responseText=j;this.runCallback("",true);return}this.request.onreadystatechange=this.runCallback;m=m?midori.trim(((m==true)?"GET":m).toUpperCase()):"POST";this.request.open(m,midori.inArray(m,["POST","PUT"])?g:g+(k?"?"+k:""),true);if(midori.inArray(m,["POST","PUT"])){this.request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");this.request.setRequestHeader("Content-length",k.length);this.request.setRequestHeader("Connection","close")}if(l){for(var h=0,e=l.length;h<e;h++){this.request.setRequestHeader(l[h][0],l[h][1])}}this.request.send(midori.inArray(m,["POST","PUT"])?k:null)}}function midoriAutoComplete(vars){var thisObj=this;this.process=function(event){if(this.popup&&this.popup==midoriPopup.activePopup){switch(event.keyCode){case 27:case 37:case 39:midoriPopup.hide();break;case 13:this.replaceSnippet(this.snippet);midoriPopup.hide();break;case 38:if(this.suggestionPos&&this.suggestionPos!=1){this.highlightSuggestion(this.suggestionPos-1)}break;case 40:if(this.suggestionPos!=this.numSuggestions){this.highlightSuggestion(this.suggestionPos+1)}break}}else{if(vars.callback2){vars.callback2(event)}}this.content=this.obj.value;if(this.content==this.oldContent||midori.inArray(event.keyCode,[13,38,40])){return}var changed=false;for(var i=0,len=this.content.length;i<len;i++){if(this.content.charAt(i)!=this.oldContent.charAt(i)){changed=true;break}}if(!changed&&this.oldContent.length<len){return}if(this.content.charAt(i)==vars.separator){(event.keyCode==8)?i--:i++}for(var j=i;j>0;j--){if(this.content.charAt(j)==vars.separator){j++;break}}var snippet=this.content.substr(j,i-j);for(var j=i;j<len;j++){if(this.content.charAt(j)==vars.separator){break}}snippet+=this.content.substr(i,j-i);snippet=midori.trim(snippet);if(snippet.length>=vars.minChars){if(typeof vars.fileName=="string"){this.ajax.post(vars.fileName,vars.params+midori.trim(snippet))}else{this.ajax.responseText=vars.fileName(vars.params+midori.trim(snippet));this.ajaxCallback()}}this.oldContent=this.content};this.addProperties=function(id,snippet){var obj=midori.get("#midori_suggestion"+this.uniqid+"_"+id);midori.addEventListener(obj,"mouseover",function(e){thisObj.highlightSuggestion(id)});midori.addEventListener(obj,"click",function(e){thisObj.replaceSnippet(snippet);midori.preventDefault(e)})};this.showSuggestions=function(snippet){var suggestions=this.suggestions[snippet],html="",properties=[],i=0,j=0,k="";for(i in suggestions){if(vars.htmlTemplate){for(k in suggestions[i]){properties[k]=suggestions[i][k]}}html+='<a id="midori_suggestion'+this.uniqid+"_"+(++j)+'" class="'+vars.suggestionClass+'" href="#">'+(vars.htmlTemplate?midori.replace(vars.htmlTemplate,properties):suggestions[i])+"</a>\n"}if(!html){midoriPopup.hide();return}this.snippet=snippet;this.suggestionPos=0;this.numSuggestions=j;if(this.popup){midori.removeNode(this.popup)}this.popupId="midori_suggestions"+this.uniqid;this.popup=document.createElement("div");midori.setAttributes(this.popup,{id:this.popupId,className:"popup"});document.body.appendChild(this.popup);this.popup.innerHTML=html;j=0;for(var i in this.suggestions[snippet]){this.addProperties(++j,snippet)}midoriPopup.show({obj:this.obj,popupId:this.popupId,x:0,y:0,noAnim:true});this.obj.focus()};this.highlightSuggestion=function(suggestionPos){midori.get("#"+this.popupId+" ."+vars.suggestionSelectedClass.replace(" ",".")).apply("className = '"+vars.suggestionClass+"'");midori.get("#midori_suggestion"+this.uniqid+"_"+suggestionPos).className=vars.suggestionSelectedClass;this.suggestionPos=suggestionPos};this.replaceSnippet=function(snippet){var pos=0;for(var i in this.suggestions[snippet]){if(++pos==this.suggestionPos){this.obj.value=this.obj.value.replace(snippet,vars.callback?vars.callback(this.suggestions[snippet][i]):this.suggestions[snippet][i]);break}}this.content=this.obj.value;this.oldContent=this.content;this.obj.focus()};this.init=function(){if(!vars.separator){vars.separator=""}this.ajaxCallback=function(){if(thisObj.ajax.responseText){var response=(typeof thisObj.ajax.responseText=="string")?eval("("+thisObj.ajax.responseText+")"):thisObj.ajax.responseText;thisObj.suggestions[response.snippet]=response.result;thisObj.showSuggestions(response.snippet)}};this.uniqid=midori.uniqid();this.obj=midori.get("#"+vars.id);this.content=this.obj.value;this.oldContent=this.content;this.suggestions=[];this.ajax=(typeof vars.fileName=="string")?new midoriAjax(this.ajaxCallback,"",true):{};if(this.browserType!="Gecko"){var parentNode=this.obj;midori.addEventListener(parentNode,"keypress",function(e){if(e.keyCode==13){midori.preventDefault(e)}});while(parentNode.parentNode!=null){parentNode=parentNode.parentNode;if(parentNode.nodeName.toLowerCase()=="form"){midori.addEventListener(parentNode,"keypress",function(e){if(e.keyCode==13){return false}})}}}this.obj.setAttribute("autocomplete","off");midori.addEventListener(this.obj,"keyup",function(e){thisObj.process(e)})};this.init()}function midoriInlineEdit(a){var b=this;this.myObj=midori.get("#"+a.id);this.editObj="";this.input=a.textArea?"textarea":"input";midori.addEventListener(document,"mouseup",function(c){if(b.editObj&&midori.getEventTarget(c)!=b.editObj){b.save();midori.preventDefault(c)}});this.edit=function(){if(this.myObj.getAttribute("editing")=="on"||midori.get(this.input,this.myObj)[0]){return}var c=this.myObj.innerHTML.replace(/"/g,"&quot;");this.myObj.innerHTML=a.textArea?midori.replace('<textarea style="width: :w; height: :h; overflow: auto">:value</textarea>',{w:(this.myObj.parentNode.offsetWidth-(a.x?a.x:32))+"px",h:(this.myObj.parentNode.offsetHeight-(a.y?a.y:32))+"px",value:c}):midori.replace('<input type="text" size=":size" maxlength=":maxlen" value=":value" />',{size:(a.size?a.size:""),maxlen:(a.maxlen?a.maxlen:""),value:c});this.editObj=midori.get(this.input,this.myObj)[0];this.editObj.focus();this.editObj.focus();this.myObj.setAttribute("editing","on");midori.addEventListener(this.editObj,"mousedown",function(d){midori.preventBubble(d)});midori.addEventListener(this.editObj,"keyup",function(d){if(d.keyCode==13||d.keyCode==27){b.save()}});midori.addEventListener(this.editObj,"blur",function(d){b.save()})};this.select=function(){if(this.myObj.getAttribute("editing")=="on"){this.editObj.select()}};this.save=function(){if(this.myObj.getAttribute("editing")!="on"){return}var c=midori.trim(this.editObj.value.replace("\n","").replace("\r",""));if(!c){this.editObj.value="";return}this.myObj.setAttribute("editing","off");this.myObj.innerHTML="";this.myObj.innerHTML=c;if(a.callback){a.callback(c,this.myObj)}}};