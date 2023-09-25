"use strict";(self.webpackChunkDOCKETRUN=self.webpackChunkDOCKETRUN||[]).push([[778],{1778:(q,b,l)=>{l.r(b),l.d(b,{TrafficCountModule:()=>W});var T=l(6895),x=l(9569),R=l(2953),D=l(1301),B=l(7445),o=l(4650),h=l(433),F=l(3868),f=l(9541),C=l(9449),g=l(3192),d=l(1086),p=l(1180);let A=(()=>{class a extends g.Q7{initialize(){this.enableOptionSharing=!0,super.initialize()}update(n){const r=this._cachedMeta;this.updateElements(r.data,0,r.data.length,n)}updateElements(n,e,r,i){const s=this,c="reset"===i,{xScale:k,yScale:P}=s._cachedMeta,G=s.resolveDataElementOptions(e,i),J=s.getSharedOptions(i,n[e],G);for(let u=e;u<e+r;u++){const M=!c&&s.getParsed(u),K=c?k.getBasePixel():k.getPixelForValue(M.x),Q=c?P.getBasePixel():P.getPixelForValue(M.y),O=s.resolveDataElementOptions(u,i),{width:S,height:E,anchorX:X,anchorY:Y}=O,$={x:I(X,K,S),y:U(Y,Q,E),width:S,height:E,options:O};s.updateElement(n[u],u,$,i)}s.updateSharedOptions(J,i)}draw(){const n=this,e=n.getMeta().data||[];let r,i;for(r=0,i=e.length;r<i;++r)e[r].draw(n._ctx)}}return(0,p.Z)(a,"id","matrix"),(0,p.Z)(a,"version","2.0.1"),(0,p.Z)(a,"defaults",{dataElementType:"matrix",animations:{numbers:{type:"number",properties:["x","y","width","height"]}}}),(0,p.Z)(a,"overrides",{interaction:{mode:"nearest",intersect:!0},scales:{x:{type:"linear",offset:!0},y:{type:"linear",reverse:!0}}}),a})();function I(a,t,n){return"left"===a||"start"===a?t:"right"===a||"end"===a?t-n:t-n/2}function U(a,t,n){return"top"===a||"start"===a?t:"bottom"===a||"end"===a?t-n:t-n/2}function w(a,t){const{x:n,y:e,width:r,height:i}=a.getProps(["x","y","width","height"],t);return{left:n,top:e,right:n+r,bottom:e+i}}function y(a,t,n){return Math.max(Math.min(a,n),t)}function v(a,t,n,e){const r=null===t,i=null===n,s=!(!a||r&&i)&&w(a,e);return s&&(r||t>=s.left&&t<=s.right)&&(i||n>=s.top&&n<=s.bottom)}class m extends g.W_{constructor(t){super(),this.options=void 0,this.width=void 0,this.height=void 0,t&&Object.assign(this,t)}draw(t){const n=this.options,{inner:e,outer:r}=function z(a){const t=w(a),n=t.right-t.left,e=t.bottom-t.top,r=function j(a,t,n){const e=a.options.borderWidth;let r,i,s,c;return(0,d.i)(e)?(r=+e.top||0,i=+e.right||0,s=+e.bottom||0,c=+e.left||0):r=i=s=c=+e||0,{t:y(r,0,n),r:y(i,0,t),b:y(s,0,n),l:y(c,0,t)}}(a,n/2,e/2);return{outer:{x:t.left,y:t.top,w:n,h:e},inner:{x:t.left+r.l,y:t.top+r.t,w:n-r.l-r.r,h:e-r.t-r.b}}}(this),i=(0,d.aw)(n.borderRadius);t.save(),r.w!==e.w||r.h!==e.h?(t.beginPath(),(0,d.au)(t,{x:r.x,y:r.y,w:r.w,h:r.h,radius:i}),(0,d.au)(t,{x:e.x,y:e.y,w:e.w,h:e.h,radius:i}),t.fillStyle=n.backgroundColor,t.fill(),t.fillStyle=n.borderColor,t.fill("evenodd")):(t.beginPath(),(0,d.au)(t,{x:e.x,y:e.y,w:e.w,h:e.h,radius:i}),t.fillStyle=n.backgroundColor,t.fill()),t.restore()}inRange(t,n,e){return v(this,t,n,e)}inXRange(t,n){return v(this,t,null,n)}inYRange(t,n){return v(this,null,t,n)}getCenterPoint(t){const{x:n,y:e,width:r,height:i}=this.getProps(["x","y","width","height"],t);return{x:n+r/2,y:e+i/2}}tooltipPosition(){return this.getCenterPoint()}getRange(t){return"x"===t?this.width/2:this.height/2}}(0,p.Z)(m,"id","matrix"),(0,p.Z)(m,"defaults",{backgroundColor:void 0,borderColor:void 0,borderWidth:void 0,borderRadius:0,anchorX:"center",anchorY:"center",width:20,height:20});let Z=(()=>{class a{constructor(){g.kL.register(A,m)}ngOnInit(){this.chartContainer=document.getElementById("heatmap"),new g.kL(this.chartContainer.getContext("2d"),{type:"matrix",data:{datasets:[{label:"People Entry",data:[{x:1,y:1,v:11},{x:1,y:2,v:22},{x:1,y:3,v:43},{x:1,y:4,v:63},{x:1,y:5,v:13},{x:1,y:6,v:23},{x:1,y:7,v:63},{x:2,y:1,v:21},{x:2,y:2,v:12},{x:2,y:3,v:63},{x:2,y:4,v:23},{x:2,y:5,v:13},{x:2,y:6,v:3},{x:2,y:7,v:33},{x:3,y:1,v:31},{x:3,y:2,v:72},{x:3,y:3,v:13},{x:3,y:4,v:53},{x:3,y:5,v:63},{x:3,y:6,v:33},{x:3,y:7,v:23},{x:4,y:1,v:11},{x:4,y:2,v:12},{x:4,y:3,v:63},{x:4,y:4,v:13},{x:4,y:5,v:63},{x:4,y:6,v:33},{x:4,y:7,v:23},{x:5,y:1,v:61},{x:5,y:2,v:22},{x:5,y:3,v:43},{x:5,y:4,v:13},{x:5,y:5,v:63},{x:5,y:6,v:33},{x:5,y:7,v:23},{x:6,y:1,v:21},{x:6,y:2,v:32},{x:6,y:3,v:23},{x:6,y:4,v:13},{x:7,y:1,v:41},{x:7,y:2,v:12},{x:7,y:3,v:13},{x:7,y:4,v:13},{x:7,y:5,v:63},{x:7,y:6,v:33},{x:7,y:7,v:23},{x:8,y:1,v:41},{x:8,y:2,v:12},{x:8,y:3,v:13},{x:8,y:4,v:13},{x:8,y:5,v:63},{x:8,y:6,v:33},{x:8,y:7,v:23}],backgroundColor(e){const i=(e.dataset.data[e.dataIndex].v-5)/40;return(0,d.c)("#5CABFF").alpha(i).rgbString()},borderColor(e){const i=(e.dataset.data[e.dataIndex].v-5)/40;return(0,d.c)("#5CABFF").alpha(i).rgbString()},borderWidth:1,width:({chart:e})=>(e.chartArea||{}).width/8-1,height:({chart:e})=>(e.chartArea||{}).height/7-1}]},options:{plugins:{tooltip:{callbacks:{title:()=>"",label(e){const r=e.dataset.data[e.dataIndex];return["x: "+r.x,"y: "+r.y,"v: "+r.v]}}}},scales:{x:{ticks:{stepSize:1},grid:{display:!1}},y:{offset:!0,ticks:{stepSize:1},grid:{display:!1}}}}})}}return a.\u0275fac=function(n){return new(n||a)},a.\u0275cmp=o.\u0275\u0275defineComponent({type:a,selectors:[["app-heatmap"]],decls:2,vars:0,consts:[[1,"chart-wrapper","mt-3"],["id","heatmap"]],template:function(n,e){1&n&&(o.\u0275\u0275elementStart(0,"div",0),o.\u0275\u0275element(1,"canvas",1),o.\u0275\u0275elementEnd())},styles:[".chart-wrapper[_ngcontent-%COMP%]{width:100%;height:100%;border:1px solid #ccc;border-radius:10px;position:relative;overflow-x:scroll}"]}),a})(),H=(()=>{class a{constructor(){this.barChartOptions={scaleShowVerticalLines:!1,borderRadius:10,spacing:.2,spanGaps:5,categoryPercentage:.75,barPercentage:.9,responsive:!0,elements:{line:{fill:!1}},scales:{x:{grid:{display:!1,stacked:!0}},y:{grid:{display:!1,stacked:!0}}},plugins:{legend:{display:!0}}},this.barChartOptions2={scaleShowVerticalLines:!1,borderRadius:10,spacing:.2,spanGaps:5,categoryPercentage:.75,barPercentage:.9,responsive:!0,elements:{line:{fill:!1}},scales:{x:{display:!1,min:.5,max:2.5,offset:!1},y:{display:!1,min:.5,max:2.5}},plugins:{legend:{display:!0}}},this.barControllerChartOptions={barThickness:6},this.barChartLabels=["Apple","Banana","Kiwifruit","Blueberry","Orange","Grapes"],this.barChartType="bar",this.barChartLegend=!0,this.barChartPlugins=[],this.barChartData=[{data:[49,30,89,90,15,33],label:"Occupiency",type:"line",borderColor:"orange",backgroundColor:"white",pointStyle:"circle",pointRadius:4,pointHoverRadius:8},{data:[45,37,60,70,46,33],label:"Entry",stack:"Stack 0",backgroundColor:"#ccc",barThickness:12,borderRadius:7},{data:[45,37,60,70,46,33],label:"Entry",stack:"Stack 0",backgroundColor:"#D8D8D9",barThickness:12,borderRadius:7},{data:[78,60,40,102,34,39],label:"Exit",stack:"Stack 1",backgroundColor:"#134276",barThickness:10,borderRadius:7},{data:[78,60,40,102,34,39],label:"Exit",stack:"Stack 1",backgroundColor:"#82beff",barThickness:10,borderRadius:7}],this.barChartData2=[{data:[49,30,89,90,15,33],label:"Occupiency",type:"line",borderColor:"orange",backgroundColor:"white",pointStyle:"circle",pointRadius:4,pointHoverRadius:8},{data:[{x:1,y:1},{x:2,y:1},{x:1,y:2},{x:2,y:2}],label:"Entry",backgroundColor:"#ccc",barThickness:12,borderRadius:7,width:n=>(n.chartArea||{}).width/2-1,height:n=>(n.chartArea||{}).height/2-1}]}ngOnInit(){}dateUpdated(n){}}return a.\u0275fac=function(n){return new(n||a)},a.\u0275cmp=o.\u0275\u0275defineComponent({type:a,selectors:[["app-traffic-count"]],decls:23,vars:9,consts:[[1,"dashboard-content"],[1,"row"],[1,"float-end"],["id","dateInput",1,"mb-3","col-xl-2","col-xs-6","col-md-6","col-sm-6","col-lg-4","float-end"],[1,"ms-3","date-picker"],["ngxDaterangepickerMd","","placeholder","Select Date","required","",1,"form-control",3,"showCustomRangeLabel","timePicker","ngModel","datesUpdated","ngModelChange"],["datepicker",""],["icon","calendar"],[1,"me-3","ms-2","my-2"],["role","status","aria-hidden","true",1,"spinner-grow","spinner-grow-sm","me-2",2,"background-color","#3FCA56"],[1,"card"],[1,"card-header"],[1,"row","card-body"],[1,"col-6"],[1,"chart-wrapper","mt-3"],["baseChart","",3,"datasets","labels","options","plugins","legend","type"]],template:function(n,e){1&n&&(o.\u0275\u0275elementStart(0,"div",0)(1,"h5"),o.\u0275\u0275text(2,"Traffic Count"),o.\u0275\u0275elementEnd(),o.\u0275\u0275elementStart(3,"div",1)(4,"div",2)(5,"div",3)(6,"div",4)(7,"input",5,6),o.\u0275\u0275listener("datesUpdated",function(i){return e.dateUpdated(i)})("ngModelChange",function(i){return e.selectedMoments=i}),o.\u0275\u0275elementEnd(),o.\u0275\u0275element(9,"fa-icon",7),o.\u0275\u0275elementEnd()(),o.\u0275\u0275elementStart(10,"div",8)(11,"span",2),o.\u0275\u0275element(12,"span",9),o.\u0275\u0275text(13,"Live"),o.\u0275\u0275elementEnd()()(),o.\u0275\u0275elementStart(14,"div",10)(15,"div",11),o.\u0275\u0275text(16,"\nEntry and Exit Analysis "),o.\u0275\u0275elementEnd(),o.\u0275\u0275elementStart(17,"div",12)(18,"div",13)(19,"div",14),o.\u0275\u0275element(20,"canvas",15),o.\u0275\u0275elementEnd()(),o.\u0275\u0275elementStart(21,"div",13),o.\u0275\u0275element(22,"app-heatmap"),o.\u0275\u0275elementEnd()()()()()),2&n&&(o.\u0275\u0275advance(7),o.\u0275\u0275property("showCustomRangeLabel",!0)("timePicker",!0)("ngModel",e.selectedMoments),o.\u0275\u0275advance(13),o.\u0275\u0275property("datasets",e.barChartData)("labels",e.barChartLabels)("options",e.barChartOptions)("plugins",e.barChartPlugins)("legend",e.barChartLegend)("type",e.barChartType))},dependencies:[h.Fj,h.JJ,h.Q7,F.BN,h.On,f.jh,C.SP,Z],styles:[".chart-wrapper[_ngcontent-%COMP%]{width:100%;height:100%;border:1px solid #ccc;border-radius:10px;position:relative;overflow-x:scroll}.date-picker[_ngcontent-%COMP%]{position:relative;background-color:#fff!important;padding:5px;border-radius:10px;display:flex;justify-content:space-between;align-items:center}.date-picker[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background-color:#fff!important;border:none!important}.date-picker[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]{margin-right:.4rem!important}.date-picker[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:active{background-color:#fff!important;box-shadow:none!important;border:none}"]}),a})();var N=l(9174);const V=[{path:"",component:H}];let W=(()=>{class a{}return a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=o.\u0275\u0275defineNgModule({type:a}),a.\u0275inj=o.\u0275\u0275defineInjector({providers:[B.N,T.DatePipe,D.a,{provide:f.$g,useValue:{generateColors:!1}}],imports:[N.A,x.Bz.forChild(V),R.IJ,f.vQ,C.n1.forRoot({}),x.Bz]}),a})()}}]);