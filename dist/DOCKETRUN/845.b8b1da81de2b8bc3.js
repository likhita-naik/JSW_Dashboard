"use strict";(self.webpackChunkDOCKETRUN=self.webpackChunkDOCKETRUN||[]).push([[845],{7845:(b,c,o)=>{o.r(c),o.d(c,{LoginModule:()=>x});var n=o(4650),a=o(646),i=o(433),l=o(6895);function p(t,r){1&t&&(n.\u0275\u0275elementStart(0,"p",10)(1,"small"),n.\u0275\u0275text(2,"email or password is incorrect"),n.\u0275\u0275elementEnd()())}let g=(()=>{class t{constructor(e){this.Router=e,this.userName="",this.fail=!1}ngOnInit(){}OnSubmit(e){this.userName=e.value.userName,this.password=e.value.password,console.log(this.userName,this.password),"admin"==e.value.userName&&"admin"==e.value.password&&(localStorage.setItem("session","loggedin"),this.Router.navigate(["app/violations"]))}}return t.\u0275fac=function(e){return new(e||t)(n.\u0275\u0275directiveInject(a.F0))},t.\u0275cmp=n.\u0275\u0275defineComponent({type:t,selectors:[["app-login"]],decls:10,vars:2,consts:[[1,"wrapper","fadeInDown"],["id","formContent",1,"p-2"],[1,"fadeIn","first"],["src","assets/images/logo.svg","id","icon"],[3,"ngSubmit"],["authForm","ngForm"],["type","text","id","login","ngModel","","name","userName","placeholder","User name","required","",1,"fadeIn","second"],["type","password","id","password","ngModel","","name","password","placeholder","Password","required","",1,"fadeIn","third"],["style","color:red",4,"ngIf"],["type","submit","value","Log In",1,"fadeIn","fourth",3,"disabled"],[2,"color","red"]],template:function(e,s){if(1&e){const d=n.\u0275\u0275getCurrentView();n.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"div",2),n.\u0275\u0275element(3,"img",3),n.\u0275\u0275elementEnd(),n.\u0275\u0275elementStart(4,"form",4,5),n.\u0275\u0275listener("ngSubmit",function(){n.\u0275\u0275restoreView(d);const h=n.\u0275\u0275reference(5);return n.\u0275\u0275resetView(s.OnSubmit(h))}),n.\u0275\u0275element(6,"input",6)(7,"input",7),n.\u0275\u0275template(8,p,3,0,"p",8),n.\u0275\u0275element(9,"input",9),n.\u0275\u0275elementEnd()()()}if(2&e){const d=n.\u0275\u0275reference(5);n.\u0275\u0275advance(8),n.\u0275\u0275property("ngIf",s.fail),n.\u0275\u0275advance(1),n.\u0275\u0275property("disabled",!d.valid)}},dependencies:[i._Y,i.Fj,i.JJ,i.JL,i.Q7,l.NgIf,i.On,i.F],styles:['html[_ngcontent-%COMP%]{background-color:#f3f7fa}body[_ngcontent-%COMP%]{font-family:Poppins,sans-serif;height:100vh}a[_ngcontent-%COMP%]{color:#92badd;display:inline-block;text-decoration:none;font-weight:400}h2[_ngcontent-%COMP%]{text-align:center;font-size:16px;font-weight:600;text-transform:uppercase;display:inline-block;margin:40px 8px 10px;color:#ccc}.wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;justify-content:center;width:100%;min-height:100%;padding:20px}#formContent[_ngcontent-%COMP%]{border-radius:10px;background:#fff;width:90%;max-width:550px;position:relative;padding:0;box-shadow:0 30px 60px #e1dedef4;text-align:center}#formFooter[_ngcontent-%COMP%]{background-color:#f6f6f6;border-top:1px solid #dce8f1;padding:25px;text-align:center;border-radius:0 0 10px 10px}.card-footer-item[_ngcontent-%COMP%]{border-right-color:#c4c4cf;border-right-style:solid;border-right-width:1px;box-sizing:border-box;color:#71748d;display:inline-block;flex-basis:0%;flex-grow:1;flex-shrink:1;font-family:Circular Std Book;font-size:14px;font-style:normal;font-weight:400;height:44.6667px;line-height:21px;overflow-wrap:break-word;padding:12px 28px;text-align:center}.card-footer-item-bordered[_ngcontent-%COMP%]:not(:last-child){border-right:1px solid #1a1a2e}.bg-option[_ngcontent-%COMP%]{background-color:#231164;color:#fff}.bg[_ngcontent-%COMP%]{background:linear-gradient(to top,rgba(172,177,177,.788),white)}h2.inactive[_ngcontent-%COMP%]{color:#ccc}h2.active[_ngcontent-%COMP%]{color:#0d0d0d;border-bottom:2px solid #5fbae9}input[type=button][_ngcontent-%COMP%], input[type=submit][_ngcontent-%COMP%], input[type=reset][_ngcontent-%COMP%]{background-color:#518ada;border:none;color:#fff;padding:15px 80px;text-align:center;text-decoration:none;display:inline-block;text-transform:uppercase;font-size:13px;box-shadow:0 10px 30px #5fbae966;border-radius:5px;margin:10px 20px 40px;transition:all .3s ease-in-out}input[type=button][_ngcontent-%COMP%]:hover, input[type=submit][_ngcontent-%COMP%]:hover, input[type=reset][_ngcontent-%COMP%]:hover{background-color:#518ada}input[type=button][_ngcontent-%COMP%]:active, input[type=submit][_ngcontent-%COMP%]:active, input[type=reset][_ngcontent-%COMP%]:active{transform:scale(.95)}input[type=text][_ngcontent-%COMP%], input[type=password][_ngcontent-%COMP%]{background-color:#fff;border:1px solid rgba(3,3,3,.617);color:#0d0d0d;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin:8px;width:85%;border:2px solid #f6f6f6;transition:all .5s ease-in-out;border-radius:5px}input[type=password][_ngcontent-%COMP%]:focus, input[type=text][_ngcontent-%COMP%]:focus{background-color:#fff;border:1px solid rgb(81,138,218)}input[type=text][_ngcontent-%COMP%]:placeholder{color:#ccc}.fadeInDown[_ngcontent-%COMP%]{animation-name:_ngcontent-%COMP%_fadeInDown;animation-duration:1s;animation-fill-mode:both}@keyframes _ngcontent-%COMP%_fadeInDown{0%{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:none}}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}.fadeIn[_ngcontent-%COMP%]{opacity:0;animation:_ngcontent-%COMP%_fadeIn ease-in 1;animation-fill-mode:forwards;animation-duration:1s}.fadeIn.first[_ngcontent-%COMP%]{animation-delay:.4s}.fadeIn.second[_ngcontent-%COMP%]{animation-delay:.6s}.fadeIn.third[_ngcontent-%COMP%]{animation-delay:.8s}.fadeIn.fourth[_ngcontent-%COMP%]{animation-delay:1s}.underlineHover[_ngcontent-%COMP%]:after{display:block;left:0;bottom:-10px;width:0;height:2px;background-color:#56baed;content:"";transition:width .2s}.underlineHover[_ngcontent-%COMP%]:hover{color:#0d0d0d}.underlineHover[_ngcontent-%COMP%]:hover:after{width:100%}*[_ngcontent-%COMP%]:focus{outline:none}#icon[_ngcontent-%COMP%]{width:40%}']}),t})();var f=o(9174);const u=[{path:"",canActivate:[o(5974).V],component:g}];let x=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.\u0275\u0275defineNgModule({type:t}),t.\u0275inj=n.\u0275\u0275defineInjector({imports:[a.Bz.forChild(u),f.A,a.Bz]}),t})()}}]);