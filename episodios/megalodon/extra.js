// Personajes y fondos para "Nacer como un megalodón apesta"
const X=require('./lib');const M=require('./mar');
const {createCanvas}=require('@napi-rs/canvas');
const {W,H,C,TAU,rnd,lerp,E,R,P,Ln,dot,stroke,save,restore,text,eye,cl,seg,eo}=X;
const MEG='#7F8D98', MEGD='#5E6C77', BEL='#EEF0EF';
const sea=(k)=>{
  if(k==='museo')return museo();
  M.sea(k);
};
const cache={};
function museo(){
  if(!cache.m){const cv=createCanvas(W,H);const prev=X.g;X.setCtx(cv.getContext('2d'));const gg=X.g;
    gg.fillStyle='#F1E7D0';gg.fillRect(0,0,W,H);P([[-40,800],[W+40,790],[W+40,H+40],[-40,H+40]],'#B79A6A',{seed:7});
    for(let i=0;i<8;i++)R(80+i*240,20,6,100,2,'#555',{lw:2});
    X.setCtx(prev);cache.m=cv;}
  X.g.drawImage(cache.m,0,0);
}
function bubbles(t,n=8,seed=1){M.bubbles(t,n,seed);}
/* ---------- megalodón ---------- */
// origen = centro del cuerpo, mira a la derecha. o: exp, t, mouth(0..1), flip, rot, baby, lips, hat, crown, glasses, grad, hold, col
function mega(x,y,s=1,o={}){
  save(x,y,s,o.rot||0,o.flip);const G=o.col||MEG,t=o.t||0,wag=Math.sin(t*6)*12;
  // cola
  P([[-150,0],[-215,-78+wag],[-200,-6+wag*.4],[-232,70+wag],[-160,12]],G,{seed:14});
  // aleta pectoral lejana
  P([[10,36],[-20,92],[40,48]],MEGD,{seed:15});
  // cuerpo
  P([[-170,2],[-90,-58],[40,-74],[140,-36],[176,4],[150,30],[50,62],[-90,50]],G,{seed:16});
  P([[-30,-72],[10,-158],[62,-66]],G,{seed:17});
  P([[-70,50],[40,62],[150,30],[176,4],[52,38],[-40,38]],BEL,{stroke:false});
  for(let i=0;i<3;i++)Ln(26+i*13,-32,22+i*13,-6,{lw:2.6});
  P([[16,40],[-34,106],[58,52]],G,{seed:18});
  // boca
  const jaw=(o.mouth||0)*.5;
  if(o.mouth>.05){P([[60,20],[176,2],[172,14],[70,40]],'#6A1010',{lw:2.4});
    for(let i=0;i<6;i++)P([[100+i*13,14],[111+i*13,12],[106+i*13,26]],'#fff',{lw:1.4});
    save(60,30,1,jaw);P([[0,0],[116,-20],[128,4],[40,26],[-10,16]],BEL,{seed:19,lw:3});
    for(let i=0;i<6;i++)P([[34+i*14,-14],[46+i*14,-16],[40+i*14,-26]],'#fff',{lw:1.4});restore();}
  else{stroke([[96,22],[140,20],[170,10]],{lw:3});
    for(let i=0;i<5;i++)P([[122+i*9,20],[129+i*9,20],[125+i*9,28]],'#fff',{lw:1.2});}
  // ojo
  const ex=o.exp||'normal';
  if(ex==='normal'){dot(112,-12,o.baby?7.5:6);}else eye(112,-12,ex);
  if(ex==='normal')Ln(96,-24,126,-18,{lw:3.6});
  if(o.lips){X.lips(150,12,.6);}
  if(o.hat){P([[84,-52],[126,-54],[102,-120]],'#E86AA6');Ln(96,-80,114,-82,{col:C.YEL,lw:5});E(102,-124,10,10,C.YEL);}
  if(o.crown){P([[82,-52],[132,-56],[138,-94],[120,-76],[108,-102],[96,-76],[80,-94]],C.YEL);dot(108,-66,5,C.RED);}
  if(o.glasses){E(112,-12,20,18,null,{lw:3});E(150,-8,15,13,null,{lw:3});Ln(132,-12,138,-10,{lw:3});}
  if(o.grad){P([[76,-60],[128,-82],[180,-60],[128,-42]],'#2E2E2E');R(112,-60,32,16,3,'#2E2E2E');Ln(128,-64,166,-46,{col:C.YEL,lw:3});E(166,-42,5,6,C.YEL,{lw:2});}
  if(o.hold)o.hold();
  restore();
}
/* ---------- Anselmo: el patito de hule ---------- */
function anselmo(x,y,s=1,o={}){
  save(x,y,s,o.rot||0,o.flip);
  E(0,-28,48,30,'#F2CF3A');P([[-40,-34],[-72,-52],[-52,-22]],'#F2CF3A');
  E(30,-70,26,24,'#F2CF3A');P([[50,-70],[78,-64],[52,-56]],'#E9822E',{lw:2.6});
  const ex=o.exp||'normal';
  if(ex==='normal')dot(36,-78,4.6);else eye(36,-78,ex);
  E(-4,-30,22,12,'#E3B92A',{rot:-.2,lw:2.4});
  if(o.wave){}
  restore();
}
/* ---------- extras ---------- */
function tooth(x,y,s=1,rot=0){save(x,y,s,rot);P([[-14,0],[14,0],[7,-48],[0,-62],[-7,-48]],'#fff',{lw:3});restore();}
function tooth2(x,y,s=1,rot=0){save(x,y,s,rot);P([[-24,0],[24,0],[12,-84],[0,-104],[-12,-84]],'#FBF7E8',{lw:3.4});for(let i=-1;i<=1;i++)Ln(i*9,-8,i*5,-70,{lw:1.6,col:'#CFC6A4'});restore();}
function ballena(x,y,s=1,o={}){
  save(x,y,s,o.rot||0,o.flip);const G='#5C7388';
  P([[-170,0],[-250,-60],[-230,-4],[-260,50]],G,{seed:21});
  P([[-190,2],[-100,-70],[60,-86],[170,-40],[200,10],[130,60],[-20,70],[-110,48]],G,{seed:22});
  P([[-20,70],[130,60],[200,10],[150,28],[20,34]],'#D9DEE0',{stroke:false});
  for(let i=0;i<6;i++)Ln(40+i*22,50-i*2,44+i*22,66-i*3,{lw:2.4,col:'#fff'});
  P([[30,52],[-10,110],[80,60]],G,{seed:23});
  dot(138,-6,5);
  if(o.fluke)Ln(-250,-60,-250,-60,{lw:2});
  if(o.exp==='shock'){eye(138,-6,'shock');}
  restore();
}
function iceberg(x,y,s=1){save(x,y,s);P([[-120,0],[-70,-70],[-20,-50],[40,-130],[100,-60],[150,0]],'#E6F2F8',{seed:31});Ln(-20,-50,0,0,{lw:2.4});Ln(40,-130,50,-20,{lw:2.4,col:'#9FC4D6'});restore();}
function termometro(x,y,s=1,k=.5){save(x,y,s);R(-18,-200,36,200,18,'#fff',{lw:4});E(0,6,34,34,C.RED,{lw:4});R(-8,-190*k,16,190*k+6,6,C.RED,{lw:2});restore();}
function cartel(x,y,txt,k,size=34){if(k<=0)return;X.g.font=`${size}px Patrick`;const w=X.g.measureText(txt).width+34;save(x,y,X.back(k));R(-w/2,-26,w,50,8,'#fff',{lw:2.6});text(txt,0,0,size,C.OUT,'Patrick');restore();}
function vitrina(x,y,w,h){R(x,y,w,h,8,'rgba(207,232,243,.55)',{lw:5});R(x-14,y+h,w+28,26,6,'#8E6034',{lw:4});}
function blanco(x,y,s=1,o={}){ // gran blanco: tiburón de pulpo con diente
  M.tiburon(x,y,s,o);
}
module.exports={sea,bubbles,mega,anselmo,tooth,tooth2,ballena,iceberg,termometro,cartel,vitrina,blanco,pez:M.pez,delfin:M.delfin,tiburon:M.tiburon,kelp:M.kelp,coral:M.coral,rock:M.rock,ink:M.ink,MEG,MEGD,BEL};
