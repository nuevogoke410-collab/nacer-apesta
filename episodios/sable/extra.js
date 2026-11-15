// Personajes y fondos para "Nacer como un tigre dientes de sable apesta"
const X=require('./lib');
const {createCanvas}=require('@napi-rs/canvas');
const {W,H,C,TAU,rnd,lerp,E,R,P,Ln,dot,stroke,save,restore,text,eye,cl,seg,eo,back,heart}=X;
const SY='#D5A25A', SYD='#A8763A', SYB='#F2E3C0', TAR='#1E1A17', SNOW='#E4EDF3', SNOW2='#F4F8FA';
const cache={};
function cached(name,fn){
  if(!cache[name]){const cv=createCanvas(W,H);const prev=X.g;X.setCtx(cv.getContext('2d'));fn();X.setCtx(prev);cache[name]=cv;}
  X.g.drawImage(cache[name],0,0);
}
function mount(x,w,h,yb,seed){ // montaña con nieve
  P([[x-w/2,yb],[x-w*.1,yb-h],[x+w*.05,yb-h*.9],[x+w/2,yb]],'#B3C3CF',{seed});
  P([[x-w*.1,yb-h],[x+w*.05,yb-h*.9],[x+w*.14,yb-h*.62],[x,yb-h*.7],[x-w*.08,yb-h*.6],[x-w*.16,yb-h*.66]],'#fff',{seed:seed+1,lw:2.8});
}
function pino(x,yb,s,seed){
  save(x,yb,s);P([[-10,0],[10,0],[8,-60],[-8,-60]],C.TR,{seed});
  for(let i=0;i<3;i++){const y=-50-i*80,w=120-i*28;P([[-w,y],[w,y],[0,y-130]],'#3F5E42',{seed:seed+i+1});P([[-w*.52,y-52],[w*.52,y-52],[0,y-130],[0,y-120]],'#fff',{seed:seed+i+9,lw:2.4});}
  restore();
}
function hielo(){
  cached('hielo',()=>{const g=X.g;g.fillStyle='#fff';g.fillRect(0,0,W,H);
    mount(300,700,260,420,1);mount(980,880,330,420,5);mount(1620,760,280,420,9);
    P([[-40,410],[W*.4,400],[W+40,412],[W+40,H+40],[-40,H+40]],SNOW,{seed:12});
    for(let i=0;i<14;i++){const x=rnd(i+3)*W,y=470+rnd(i*3)*520;Ln(x,y,x+50+rnd(i)*50,y,{col:'#B5C8D4',lw:2.6});}
    pino(120,560,.9,3);pino(1800,540,.9,8);pino(420,470,.6,4);pino(1500,470,.6,6);});
}
function brea(){
  cached('brea',()=>{const g=X.g;g.fillStyle='#fff';g.fillRect(0,0,W,H);
    mount(500,900,240,420,2);mount(1500,900,260,420,7);
    P([[-40,410],[W*.4,400],[W+40,412],[W+40,H+40],[-40,H+40]],'#D9CFB2',{seed:13});
    for(let i=0;i<14;i++){const x=rnd(i+3)*W,y=470+rnd(i*3)*520;Ln(x,y,x+50+rnd(i)*50,y,{col:'#B5A67C',lw:2.6});}
    pino(110,560,.9,3);pino(1810,540,.9,8);
    E(1000,860,640,150,TAR,{seed:44});E(820,830,150,26,'#3B3430',{stroke:false});});
}
function cueva(){
  cached('cueva',()=>{const g=X.g;g.fillStyle='#4B3A2B';g.fillRect(0,0,W,H);
    P([[-40,H],[-40,200],[300,60],[960,20],[1620,60],[W+40,200],[W+40,H]],'#6A5340',{seed:15});
    P([[-40,880],[W+40,870],[W+40,H+40],[-40,H+40]],'#8E7658',{seed:16});
    P([[560,880],[620,380],[960,260],[1300,380],[1360,880]],'#E4EDF3',{seed:17,stroke:false});
    P([[620,880],[670,420],[960,320],[1250,420],[1300,880]],'#fff',{seed:18,stroke:false});
    pino(850,700,.55,5);pino(1090,690,.5,6);});
}
function noche(){
  cached('noche',()=>{hielo();const g=X.g;g.fillStyle='rgba(20,28,60,.62)';g.fillRect(0,0,W,H);E(1560,200,60,60,'#F4EFC8');for(let i=0;i<24;i++)dot(rnd(i)*W,60+rnd(i+9)*300,2.5,'#F4EFC8');});
}
function museo(){
  cached('museo',()=>{const g=X.g;g.fillStyle='#F1E7D0';g.fillRect(0,0,W,H);P([[-40,800],[W+40,790],[W+40,H+40],[-40,H+40]],'#B79A6A',{seed:7});
    for(let i=0;i<8;i++)R(80+i*240,20,6,100,2,'#555',{lw:2});});
}
function bg(k){
  if(k==='hielo')return hielo();if(k==='brea')return brea();if(k==='cueva')return cueva();
  if(k==='noche')return noche();if(k==='museo')return museo();X.bg(k);
}
function ground(){P([[-40,880],[W+40,872],[W+40,H+40],[-40,H+40]],SNOW2,{seed:77,stroke:false});Ln(-40,880,W+40,872,{lw:2.6,col:'#B5C8D4'});}
function nieve(t,n=70){for(let i=0;i<n;i++){const x=(rnd(i)*W+Math.sin(t*1.5+i)*30)%W,y=(rnd(i*3)*H+t*110*(.6+rnd(i*7)))%H;dot(x,y,3+rnd(i*5)*3,'#fff');X.g.beginPath();X.g.arc(x,y,4+rnd(i*5)*3,0,TAU);X.g.lineWidth=2;X.g.strokeStyle='#B5C8D4';X.g.stroke();}}
// dibuja solo lo que queda por encima de yline (se hunde en la brea)
function above(yline,fn){const g=X.g;g.save();g.beginPath();g.rect(0,0,W,yline);g.clip();fn();g.restore();}
/* ---------- smilodon ---------- */
// origen = pies, mira a la derecha. o: exp, flip, rot, baby, walk, sit, mouth, lips, crown, hat, glasses, grad, band, tie, hold, col, noFangs
function smilo(x,y,s=1,o={}){
  const b=o.baby;save(x,y,b?s*.62:s,o.rot||0,o.flip);const ph=o.walk||0;
  const Y=o.col||(b?'#E6C488':SY),D=b?'#BE8F55':SYD;
  if(!o.sit){const a=Math.sin(ph)*12;
    R(-78+a,-64,26,66,11,D);R(46-a,-64,26,66,11,D);
    R(-42-a,-64,26,66,11,Y);R(78+a,-64,26,66,11,Y);}
  else{E(-50,-16,44,20,D);E(70,-14,32,16,Y);}
  E(-108,-96,24,13,D,{rot:.5,lw:3});
  E(0,-100,104,54,Y,{seed:61});
  E(12,-80,72,28,SYB,{stroke:false});
  for(const sx of[-60,-30,0,30,56])Ln(sx,-146,sx+8,-122,{lw:3.2,col:D});
  // cabeza
  const hx=104,hy=-126;
  P([[hx-36,hy-34],[hx-18,hy-70],[hx,hy-40]],Y,{lw:3.2});P([[hx+4,hy-40],[hx+24,hy-70],[hx+40,hy-34]],Y,{lw:3.2});
  E(hx,hy,52,44,Y,{seed:62});
  E(hx+28,hy+12,32,22,SYB,{lw:3});
  E(hx+48,hy+2,7,5,'#6A3A3A',{lw:1.6});
  const open=o.mouth;
  if(open){P([[hx+10,hy+14],[hx+56,hy+16],[hx+54,hy+46],[hx+16,hy+42]],'#6A1010',{lw:2.6});}
  else Ln(hx+8,hy+20,hx+50,hy+20,{lw:2.8});
  if(!o.noFangs){
    P([[hx+12,hy+18],[hx+26,hy+19],[hx+17,hy+(open?76:62)]],'#fff',{lw:2.6});
    P([[hx+34,hy+19],[hx+48,hy+19],[hx+41,hy+(open?72:58)]],'#fff',{lw:2.6});}
  if(o.lips)X.lips(hx+34,hy+36,.5);
  eye(hx+16,hy-8,o.exp||'normal');
  if(o.hat){P([[hx-22,hy-34],[hx+22,hy-38],[hx,hy-100]],'#E86AA6');Ln(hx-10,hy-58,hx+10,hy-60,{col:C.YEL,lw:5});E(hx,hy-104,9,9,C.YEL);}
  if(o.crown){P([[hx-24,hy-34],[hx+26,hy-38],[hx+30,hy-74],[hx+14,hy-56],[hx+2,hy-82],[hx-10,hy-56],[hx-24,hy-72]],C.YEL);dot(hx+2,hy-48,5,C.RED);}
  if(o.glasses){E(hx+16,hy-8,17,15,null,{lw:3});E(hx+44,hy-6,12,11,null,{lw:3});Ln(hx+32,hy-8,hx+38,hy-7,{lw:3});}
  if(o.grad){P([[hx-38,hy-34],[hx+4,hy-54],[hx+46,hy-34],[hx+4,hy-18]],'#2E2E2E');R(hx-12,hy-34,32,16,3,'#2E2E2E');Ln(hx+4,hy-38,hx+34,hy-22,{col:C.YEL,lw:3});E(hx+34,hy-18,4,5,C.YEL,{lw:2});}
  if(o.band)P([[hx-40,hy-26],[hx+44,hy-22],[hx+44,hy-10],[hx-40,hy-14]],'#D9473A',{lw:2.6});
  if(o.tie)P([[hx-16,hy+34],[hx+4,hy+34],[hx,hy+46],[hx+12,hy+88],[hx-4,hy+98],[hx-14,hy+84],[hx-8,hy+46]],'#C03A3A',{lw:2.6});
  if(o.hold)o.hold();
  restore();
}
/* ---------- Fermín: el cono ---------- */
function cono(x,y,s=1,o={}){
  save(x,y,s,o.rot||0,o.flip);
  R(-46,-10,92,16,4,'#D8641A',{lw:3});
  P([[-34,-8],[34,-8],[16,-120],[-16,-120]],'#EE7A22',{seed:71});
  P([[-26,-50],[26,-50],[21,-78],[-21,-78]],'#fff',{lw:2.6});
  const ex=o.exp||'normal';
  if(ex==='normal'){E(-8,-98,8,8,'#fff',{lw:2.4});E(8,-98,8,8,'#fff',{lw:2.4});dot(-6,-98,3.2);dot(10,-98,3.2);}
  else{eye(-8,-98,ex);eye(8,-98,ex);}
  if(o.smile)stroke([[-7,-86],[0,-81],[7,-86]],{lw:2.6});else Ln(-6,-84,6,-84,{lw:2.6});
  restore();
}
/* ---------- otros animales ---------- */
function lobo(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);const G='#8A8A82',D='#5E5E58';
  stroke([[-84,-92],[-124,-70],[-140,-50]],{lw:18,col:D});stroke([[-84,-92],[-124,-70],[-140,-50]],{lw:10,col:G});
  for(const lx of[-64,-30,40,70])R(lx-10,-52,20,54,8,D);
  E(0,-92,98,46,G);E(10,-76,66,22,'#CFCFC6',{stroke:false});
  E(104,-120,40,34,G);R(122,-124,50,26,11,G);dot(168,-116,6);
  P([[84,-148],[100,-140],[98,-106]],D);P([[108,-150],[124,-142],[118,-110]],D);
  const ex=o.exp||'angry';eye(112,-130,ex);
  if(o.mouth){P([[124,-110],[172,-108],[164,-90],[130,-90]],'#6A1010',{lw:2.4});for(const tx of[134,148,162])P([[tx,-110],[tx+8,-110],[tx+4,-100]],'#fff',{lw:1.4});}
  restore();}
function leon(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);const L='#C79A55',D='#8F6A33';
  stroke([[-90,-100],[-130,-90],[-136,-56]],{lw:14,col:L});
  for(const lx of[-64,-30,40,70])R(lx-11,-56,22,58,9,D);
  E(0,-100,104,52,L);E(106,-124,56,50,'#9A6E34');E(106,-122,38,34,L);
  E(138,-112,18,13,SYB,{lw:2.4});dot(150,-118,4);
  eye(112,-132,o.exp||'angry');
  restore();}
function bisonte(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);const B='#5E3F26',D='#3F2A18';
  for(const lx of[-70,-34,40,76])R(lx-12,-70,24,72,9,D);
  E(0,-120,118,70,B);E(-30,-170,70,56,B);
  E(122,-110,44,40,B);R(140,-102,34,30,10,D);dot(150,-118,4);
  P([[110,-144],[100,-176],[122,-150]],'#E9D9B4',{lw:2.4});
  eye(120,-126,o.exp||'normal');
  Ln(-110,-100,-120,-70,{lw:6,col:D});
  restore();}
function camello(x,y,s=1,o={}){save(x,y,s,0,o.flip);const B='#C9A36A',D='#9A7842';
  for(const lx of[-60,-28,36,66])R(lx-8,-90,16,92,6,D);
  E(0,-150,86,44,B);E(-30,-200,28,34,B);E(30,-196,24,30,B);
  Ln(88,-160,116,-240,{lw:22,col:B});Ln(88,-160,116,-240,{lw:14,col:B});
  E(130,-246,26,18,B);dot(138,-250,3.6);
  restore();}
function perezoso(x,y,s=1,o={}){save(x,y,s,0,o.flip);const B='#7B5E3A',D='#4F3A22';
  R(-70,-74,36,76,12,D);R(34,-74,36,76,12,D);
  E(0,-150,104,86,B,{seed:81});
  E(94,-208,38,34,B);E(100,-204,26,22,'#C9B38A',{lw:2.4});dot(106,-210,4);
  Ln(-62,-4,-80,18,{lw:4});Ln(-50,-4,-52,20,{lw:4});Ln(-38,-4,-26,18,{lw:4});
  Ln(42,-4,24,18,{lw:4});Ln(54,-4,54,20,{lw:4});Ln(66,-4,84,18,{lw:4});
  restore();}
function mamut(x,y,s=1,o={}){save(x,y,s,0,o.flip);const B='#6B4526',D='#4A2E17';
  for(const lx of[-90,-40,50,100])R(lx-16,-90,32,92,10,D);
  E(0,-190,150,100,B,{seed:91});E(80,-250,70,70,B,{lw:3});
  E(150,-206,44,60,B,{rot:.2});
  stroke([[160,-170],[210,-120],[190,-60],[150,-50]],{lw:14,col:'#F0E6CE'});
  dot(130,-250,5);
  restore();}
function hueso(x,y,s=1,rot=0){save(x,y,s,rot);R(-50,-8,100,16,8,'#F0E6CE',{lw:2.8});E(-52,-10,14,12,'#F0E6CE',{lw:2.8});E(-52,10,14,12,'#F0E6CE',{lw:2.8});E(52,-10,14,12,'#F0E6CE',{lw:2.8});E(52,10,14,12,'#F0E6CE',{lw:2.8});restore();}
function craneo(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);
  E(0,-60,80,60,'#F0E6CE',{lw:3.4});R(20,-30,80,36,12,'#F0E6CE',{lw:3.4});
  P([[44,-6],[58,-6],[50,60]],'#fff',{lw:3});P([[70,-6],[84,-6],[78,56]],'#fff',{lw:3});
  E(0,-70,16,18,'#2A1708',{lw:1});E(40,-68,10,12,'#2A1708',{lw:1});
  restore();}
function cartel(x,y,txt,k,size=34){if(k<=0)return;X.g.font=`${size}px Patrick`;const w=X.g.measureText(txt).width+34;save(x,y,X.back(k));R(-w/2,-26,w,50,8,'#fff',{lw:2.6});text(txt,0,0,size,C.OUT,'Patrick');restore();}
function vitrina(x,y,w,h){R(x,y,w,h,8,'rgba(207,232,243,.55)',{lw:5});R(x-14,y+h,w+28,26,6,'#8E6034',{lw:4});}
function brazo(x,y,s=1,o={}){ // huella
  save(x,y,s);E(0,0,22,18,'#B5C8D4',{lw:2.4});for(const p of[[-22,-20],[-8,-30],[8,-30],[22,-20]])E(p[0],p[1],7,8,'#B5C8D4',{lw:2.4});restore();}
function grietas(){}
function copo(x,y,s=1){save(x,y,s);for(let i=0;i<3;i++){Ln(-14,0,14,0,{lw:3,noJit:true,col:'#8FB0C8'});X.g.rotate(Math.PI/3);}restore();}
module.exports={bg,smilo,cono,lobo,leon,bisonte,camello,perezoso,mamut,hueso,craneo,cartel,vitrina,huella:brazo,ground,nieve,above,copo,SY,SYD,TAR,SNOW};
