// Personajes y fondos del mar para "Nacer como un pulpo apesta"
const X=require('./lib');
const {createCanvas}=require('@napi-rs/canvas');
const {W,H,C,TAU,rnd,lerp,E,R,P,Ln,dot,stroke,save,restore,text,eye,lips,snake,snakeHead,path}=X;
const g=()=>X.g;
const OUT=C.OUT;
const PUL='#D2705A', PULD='#A8472F';

/* ---------- fondos ---------- */
function kelp(x,yb,h,seed,col='#4E7A3B'){
  const pts=[];for(let i=0;i<=8;i++)pts.push([x+Math.sin(i*.9+seed)*18*(i/8),yb-h*i/8]);
  stroke(pts,{lw:13,col:OUT,noJit:true});stroke(pts,{lw:8,col,noJit:true});
  for(let i=2;i<8;i+=2){const p=pts[i];Ln(p[0],p[1],p[0]+(i%4?28:-28),p[1]-20,{lw:5,col});}
}
function coral(x,yb,s,col){
  X.save(x,yb,s);
  for(const a of[-.5,0,.5]){const L=70+rnd(a*9+x)*50;const tip=[Math.sin(a)*L,-Math.cos(a)*L];
    stroke([[0,0],[tip[0]*.5,tip[1]*.5],tip],{lw:20,col:OUT,noJit:true});stroke([[0,0],[tip[0]*.5,tip[1]*.5],tip],{lw:13,col,noJit:true});
    E(tip[0],tip[1],11,11,col,{lw:2.6});}
  restore();
}
function rock(x,y,w,h,col='#8C8C86',seed=1){P([[x-w/2,y],[x-w*.4,y-h*.7],[x-w*.1,y-h],[x+w*.3,y-h*.85],[x+w/2,y-h*.2],[x+w*.45,y]],col,{seed});}
function drawSea(kind){
  const night=kind==='noche';
  const gg=g();
  if(kind==='lab'){
    gg.fillStyle='#EDE8DA';gg.fillRect(0,0,W,H);
    P([[-40,820],[W+40,810],[W+40,H+40],[-40,H+40]],'#C9BFA6',{seed:7});
    for(let i=0;i<5;i++)R(120+i*360,150,240,16,4,'#A8743F');
    return;
  }
  gg.fillStyle=night?'#223B58':(kind==='hondo'?'#7FA6BE':(kind==='arrecife'?'#BDE0EC':'#CFE6F0'));gg.fillRect(0,0,W,H);
  if(!night){const pts=[];for(let x=-40;x<=W+40;x+=60)pts.push([x,70+Math.sin(x*.02)*10]);stroke(pts,{lw:4,col:'#fff',amp:.5});}
  const fl=night?'#6F6850':'#E0D0A4';
  P([[-40,850],[500,832],[1100,852],[1600,834],[W+40,848],[W+40,H+40],[-40,H+40]],fl,{seed:3});
  for(let i=0;i<16;i++)E(40+rnd(i+2)*(W-80),900+rnd(i*3)*150,9+rnd(i)*14,6,night?'#8D8566':'#CDBA8A',{lw:2});
  rock(80,860,260,150,night?'#5D5F66':'#8C8C86',2);rock(1840,862,300,170,night?'#5D5F66':'#8C8C86',5);
  if(kind==='arrecife'){coral(560,860,1.1,'#E0618F');coral(780,870,.9,'#E9A53A');coral(1300,860,1.2,'#E0618F');coral(1520,868,1,'#9A72C9');}
  kelp(300,870,260,1);kelp(1700,870,300,3);kelp(1020,878,210,5,'#5E8748');
}
const cache={};
function sea(kind='mar'){
  if(!cache[kind]){const cv=createCanvas(W,H);const prev=X.g;X.setCtx(cv.getContext('2d'));drawSea(kind);X.setCtx(prev);cache[kind]=cv;}
  X.g.drawImage(cache[kind],0,0);
}
function bubbles(t,n=8,seed=1,col='#fff'){
  for(let i=0;i<n;i++){const x=rnd(i+seed)*W,sp=60+rnd(i*5+seed)*80,y=H-((t*sp+rnd(i*3+seed)*H)%(H+60));
    E(x+Math.sin(t*2+i)*10,y,6+rnd(i*7)*9,6+rnd(i*7)*9,null,{lw:2.4,col:'#7FA6BE',noJit:true});}
}
function ink(x,y,k,s=1){ // nube de tinta que crece
  if(k<=0)return;const e=X.eo(X.cl(k));save(x,y,s);
  for(let i=0;i<9;i++){const a=rnd(i+3)*TAU,d=e*(40+rnd(i*5)*150);E(Math.cos(a)*d,Math.sin(a)*d*.7,(30+rnd(i*9)*50)*e,(26+rnd(i*9)*40)*e,'#2B2B3A',{lw:2.4,amp:2});}
  restore();
}

/* ---------- pulpo ---------- */
// origen: centro del suelo bajo el cuerpo. o: exp, t, wave, flip, rot, col, hat, crown, glasses, lips, mouth('open'|'sad'), look, grad, sweat
function pulpo(x,y,s=1,o={}){
  const col=o.col||PUL,dk=o.dk||PULD,t=o.t||0,wv=o.wave??1;
  save(x,y,s,o.rot||0,o.flip);
  for(let i=0;i<8;i++){
    const side=i<4?-1:1,j=i<4?3-i:i-4;
    const dx=side*(.3+j*.3),len=(105+j*38)*(o.arms??1),bx=side*(14+j*17);
    const pts=[];
    for(let k=0;k<=9;k++){const u=k/9;
      pts.push([bx+dx*u*len,-48+Math.min(u*1.6,1)*48+Math.sin(t*3.2+i*1.7+u*4)*wv*(5+u*10)*.8-Math.max(0,u-.72)*(o.curl??90)]);}
    stroke(pts,{lw:25*s,col:OUT,noJit:true});stroke(pts,{lw:18*s,col,noJit:true});
    for(let k=2;k<=8;k+=2)dot(pts[k][0],pts[k][1]+3,3.2,'#F3D2B8');
  }
  P([[-62,-50],[-72,-100],[-54,-162],[0,-204],[54,-162],[72,-100],[62,-50],[0,-34]],col,{seed:41});
  for(const p of[[-28,-156],[12,-176],[36,-130],[-10,-128],[-40,-110]])E(p[0],p[1],7,5,dk,{lw:1,stroke:false});
  const ex=o.exp||'normal';
  for(const sx of[-1,1]){
    if(ex==='normal'||ex==='angry'||ex==='sweat'||ex==='sad'){
      E(sx*26,-92,15,17,'#fff',{lw:3});dot(sx*26+(o.look||0),-90,6.5);
      if(ex==='angry')Ln(sx*26-sx*14,-116,sx*26+sx*14,-104,{lw:4});
      if(ex==='sad')Ln(sx*26+sx*14,-114,sx*26-sx*14,-108,{lw:4});
      if(ex==='sweat'&&sx>0)X.drop(sx*26+30,-110);
    }else eye(sx*26,-92,ex);
  }
  if(o.lips)lips(0,-56,.9);
  else if(o.mouth==='open')E(0,-54,13,10,'#6A1010',{lw:2.6});
  else if(o.mouth==='sad')stroke([[-10,-50],[0,-56],[10,-50]],{lw:3});
  else stroke([[-10,-56],[0,-51],[10,-56]],{lw:3});
  if(o.glasses){E(-26,-92,21,21,null,{lw:3.4});E(26,-92,21,21,null,{lw:3.4});Ln(-5,-92,5,-92,{lw:3.4});}
  if(o.hat){P([[-26,-190],[26,-190],[0,-272]],'#E86AA6');Ln(-14,-218,16,-222,{col:C.YEL,lw:5});E(0,-274,10,10,C.YEL);}
  if(o.crown){P([[-30,-196],[30,-196],[34,-246],[16,-222],[0,-250],[-16,-222],[-34,-246]],C.YEL);dot(0,-214,5,C.RED);}
  if(o.grad){P([[-48,-196],[0,-216],[48,-196],[0,-178]],'#2E2E2E');R(-26,-198,52,18,3,'#2E2E2E');Ln(0,-206,40,-186,{col:C.YEL,lw:3});}
  restore();
  if(o.hold)o.hold();
}
// pulpito bebé (larva): solo cuerpo y puntos
function larva(x,y,s,t=0,o={}){
  save(x,y,s,o.rot||0);
  P([[-14,0],[-18,-20],[-8,-38],[0,-44],[8,-38],[18,-20],[14,0]],o.col||'#E8B7A6',{lw:2.4,seed:9});
  for(let i=0;i<5;i++)stroke([[-12+i*6,0],[-12+i*6+Math.sin(t*6+i)*5,12],[-12+i*6+Math.sin(t*6+i+1)*6,22]],{lw:3.2,noJit:true});
  dot(-6,-24,2.6);dot(6,-24,2.6);
  restore();
}

/* ---------- otros animales ---------- */
function pez(x,y,s=1,o={}){
  save(x,y,s,o.rot||0,o.flip);const col=o.col||'#E6B046',t=o.t||0;
  P([[-44,0],[-84,-28+Math.sin(t*10)*5],[-84,28+Math.sin(t*10)*5]],col);
  E(0,0,52,28,col);P([[-10,-26],[8,-50],[22,-26]],col,{lw:2.6});
  E(30,-6,8,8,'#fff',{lw:2.4});dot(32,-6,3.4);
  if(o.mouth)P([[46,2],[64,-8],[64,14]],'#6A1010',{lw:2.4});else stroke([[44,8],[50,10]],{lw:2.6});
  restore();
}
function cangrejo(x,y,s=1,o={}){
  save(x,y,s,0,o.flip);const col='#D9472B',t=o.t||0;
  for(const sd of[-1,1])for(let i=0;i<3;i++){Ln(sd*30,-18,sd*(60+i*14),-4+i*4+Math.sin(t*8+i)*3,{lw:4,col:OUT});Ln(sd*(60+i*14),-4+i*4,sd*(66+i*14),20,{lw:4});}
  for(const sd of[-1,1]){
    Ln(sd*34,-40,sd*80,-86-Math.sin(t*5+sd)*8,{lw:12,col:OUT});Ln(sd*34,-40,sd*80,-86-Math.sin(t*5+sd)*8,{lw:7,col});
    const cx=sd*92,cy=-100-Math.sin(t*5+sd)*8;E(cx,cy-12,24,11,col,{lw:3,rot:sd*.3});E(cx,cy+10,24,11,col,{lw:3,rot:-sd*.3});}
  E(0,-34,54,34,col);
  for(const sd of[-1,1]){Ln(sd*14,-58,sd*16,-84,{lw:4});E(sd*16,-90,9,9,'#fff',{lw:2.6});dot(sd*16,-90,3.4);}
  stroke([[-14,-30],[0,-24],[14,-30]],{lw:3});
  restore();
}
function tiburon(x,y,s=1,o={}){
  save(x,y,s,o.rot||0,o.flip);const G='#8C97A0';
  P([[-150,0],[-210,-50],[-190,0],[-212,48]],G,{seed:4});
  P([[-160,0],[-80,-52],[40,-62],[130,-26],[150,10],[40,54],[-80,46]],G,{seed:5});
  P([[-30,-60],[0,-130],[40,-62]],G,{seed:6});
  P([[-40,48],[20,52],[120,12],[130,6],[40,30]],'#E9ECEE',{stroke:false});
  dot(100,-8,6);Ln(86,-22,112,-14,{lw:4});
  if(o.mouth){P([[110,14],[160,10],[130,40]],'#6A1010',{lw:2.4});for(const tx of[118,130,142])P([[tx-5,14],[tx+5,14],[tx,24]],'#fff',{lw:1.4});}
  restore();
}
function delfin(x,y,s=1,o={}){
  save(x,y,s,o.rot||0,o.flip);const G='#7C97B0';
  P([[-130,0],[-186,-34],[-170,0],[-186,34]],G,{seed:7});
  P([[-130,0],[-50,-54],[60,-50],[110,-20],[150,-8],[152,4],[100,18],[50,50],[-50,46]],G,{seed:8});
  P([[-20,-52],[10,-96],[44,-50]],G,{seed:9});
  P([[-30,44],[60,48],[100,18],[40,24]],'#E4EBF2',{stroke:false});
  dot(86,-14,5);stroke([[130,2],[148,0]],{lw:3});
  restore();
}
function foca(x,y,s=1,o={}){
  save(x,y,s,o.rot||0,o.flip);const G='#6D6D6A';
  P([[-130,10],[-170,-10],[-140,-30],[-90,-70],[0,-80],[60,-60],[100,-20],[90,20],[-40,24]],G,{seed:11});
  E(70,-52,34,30,G,{seed:12});E(80,-40,18,12,'#C9C9C4',{lw:2});dot(60,-62,5);dot(94,-48,4);
  for(let i=0;i<3;i++){Ln(88,-38+i*5,126,-46+i*9,{lw:2});}
  restore();
}
function frasco(x,y,s=1,o={}){ // Gerardo
  save(x,y,s,o.rot||0);
  R(-42,-110,84,110,18,'#DCEBF2',{lw:3.4});R(-30,-130,60,24,6,'#B58A4C',{lw:3});
  Ln(-26,-92,-26,-30,{lw:4,col:'#fff',noJit:true});
  const ex=o.exp||'normal';
  if(ex==='normal'){dot(-14,-66,5);dot(14,-66,5);}else{eye(-14,-66,ex);eye(14,-66,ex);}
  stroke(o.sad?[[-12,-40],[0,-46],[12,-40]]:[[-12,-44],[0,-36],[12,-44]],{lw:3});
  if(o.open){R(-30,-170,60,24,6,'#B58A4C',{lw:3,rot:0});}
  restore();
}
function huevos(x,y,n,t=0,seed=1,sc=1){
  for(let i=0;i<n;i++){const a=rnd(i+seed)*TAU,r=Math.sqrt(rnd(i*3+seed))*70*sc;
    E(x+Math.cos(a)*r*1.5,y+Math.sin(a)*r*.7,6*sc,8*sc,'#F4EBD0',{lw:1.8,amp:.3});}
}
function humano(x,y,s,o={}){ // científico de palito con bata
  X.stick(x,y,s,{smile:o.smile,sweat:o.sweat,arms:o.arms,hold:o.hold});
}
function mimic(x,y,s,o={}){ pulpo(x,y,s,o); }
function plato(x,y,s=1){save(x,y,s);E(0,0,90,22,'#fff',{lw:3});E(0,-8,66,16,'#F0A874',{lw:2.6});for(let i=0;i<5;i++)Ln(-40+i*20,-10,-34+i*20,-30,{lw:5,col:'#D9472B'});restore();}

module.exports={sea,bubbles,ink,pulpo,larva,pez,cangrejo,tiburon,delfin,foca,frasco,huevos,humano,plato,kelp,coral,rock,PUL,PULD};
