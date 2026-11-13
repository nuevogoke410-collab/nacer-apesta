// Personajes y fondos para "Nacer como un dodo apesta"
const X=require('./lib');
const {createCanvas}=require('@napi-rs/canvas');
const {W,H,C,TAU,rnd,lerp,E,R,P,Ln,dot,stroke,save,restore,text,eye,cl,seg,eo,back,heart}=X;
const DOD='#8F8A80', DODD='#6E6A62', DODB='#BDB6A6', BEAK='#D9B94A', BEAKG='#A5A851', BOT='#6B4A2E';
const cache={};
function cached(name,fn){
  if(!cache[name]){const cv=createCanvas(W,H);const prev=X.g;X.setCtx(cv.getContext('2d'));fn();X.setCtx(prev);cache[name]=cv;}
  X.g.drawImage(cache[name],0,0);
}
function palm(x,yb,s,seed){ // palmera simple
  Ln(x,yb,x+30*s,yb-260*s,{lw:14});Ln(x,yb,x+30*s,yb-260*s,{lw:8,col:'#8A6238'});
  for(let i=0;i<6;i++){const a=-Math.PI/2+(i-2.5)*.55;const tx=x+30*s+Math.cos(a)*150*s,ty=yb-260*s+Math.sin(a)*100*s+50*s;
    P([[x+30*s,yb-260*s],[(x+30*s+tx)/2,ty-40*s],[tx,ty],[(x+30*s+tx)/2,ty-10*s]],C.CAN[i%4],{seed:seed+i});}
}
function playa(){ // cielo, mar, arena
  cached('playa',()=>{const g=X.g;g.fillStyle='#fff';g.fillRect(0,0,W,H);
    P([[-40,330],[W+40,326],[W+40,520],[-40,524]],C.WATER,{seed:61});
    for(let i=0;i<10;i++){const x=rnd(i+3)*W,y=350+rnd(i*2+1)*150;Ln(x,y,x+80+rnd(i)*50,y,{col:C.WATER2,lw:3});}
    P([[-40,520],[W*.5,510],[W+40,522],[W+40,H+40],[-40,H+40]],'#E6D6A8',{seed:62});
    for(let i=0;i<22;i++){const x=rnd(i+9)*W,y=580+rnd(i*3)*440;Ln(x,y,x+14,y,{lw:2.4,col:'#B7A672'});}
    palm(120,640,1.1,3);palm(1800,620,1,9);});
}
function isla(){ // selva de Mauricio
  cached('isla',()=>{X.bg('bosque');palm(300,470,.9,5);palm(1550,470,.9,12);});
}
function museo(){
  cached('museo',()=>{const g=X.g;g.fillStyle='#F1E7D0';g.fillRect(0,0,W,H);P([[-40,800],[W+40,790],[W+40,H+40],[-40,H+40]],'#B79A6A',{seed:7});
    for(let i=0;i<8;i++)R(80+i*240,20,6,100,2,'#555',{lw:2});});
}
function bg(k){
  if(k==='playa')return playa();if(k==='isla')return isla();if(k==='museo')return museo();
  X.bg(k);
}
/* ---------- dodo ---------- */
// origen = pies, mira a la derecha. o: exp, t, flip, rot, baby, walk, mouth, lips, hat, crown, glasses, grad, tie, hold, sit
function dodo(x,y,s=1,o={}){
  const b=o.baby;save(x,y,b?s*.62:s,o.rot||0,o.flip);const ph=o.walk||0;
  const B=b?'#C9C3B4':DOD, BD=b?'#A59F90':DODD, BB=b?'#E8E2D2':DODB;
  // patas
  if(!o.sit){Ln(-18,-34,-18+Math.sin(ph)*10,0,{lw:7,col:BEAK});Ln(24,-34,24-Math.sin(ph)*10,0,{lw:7,col:BEAK});
    Ln(-18+Math.sin(ph)*10,0,-4+Math.sin(ph)*10,2,{lw:6,col:BEAK});Ln(24-Math.sin(ph)*10,0,38-Math.sin(ph)*10,2,{lw:6,col:BEAK});}
  // cola (moñito)
  for(let i=0;i<3;i++)E(-74-i*4,-104-i*14+(i%2)*6,16,9,BD,{rot:-.7+i*.5,lw:2.6});
  // cuerpo
  const by=o.sit?-52:-86;
  E(0,by,76,62,B,{seed:41});E(10,by+18,52,38,BB,{stroke:false});
  // ala diminuta
  E(-14,by-6,26,15,BD,{rot:.35,lw:2.6});
  // cuello y cabeza
  E(52,by-48,26,34,B,{rot:.5,lw:3});
  const hx=70,hy=by-72;
  E(hx,hy,34,30,B,{seed:43});
  // pico
  P([[hx+22,hy-14],[hx+78,hy-10],[hx+96,hy+10],[hx+88,hy+28],[hx+74,hy+14],[hx+22,hy+10]],BEAK,{seed:44});
  P([[hx+22,hy-14],[hx+78,hy-10],[hx+90,hy],[hx+50,hy-2]],BEAKG,{stroke:false});
  Ln(hx+30,hy+8,hx+72,hy+10,{lw:2.4});
  if(o.mouth){P([[hx+28,hy+10],[hx+76,hy+12],[hx+70,hy+30],[hx+34,hy+26]],'#6A1010',{lw:2.4});}
  eye(hx+10,hy-8,o.exp||'normal');
  if(o.lips)X.lips(hx+60,hy+16,.6);
  if(o.hat){P([[hx-14,hy-26],[hx+26,hy-30],[hx+6,hy-92]],'#E86AA6');Ln(hx-2,hy-52,hx+16,hy-54,{col:C.YEL,lw:5});E(hx+6,hy-96,9,9,C.YEL);}
  if(o.crown){P([[hx-14,hy-26],[hx+30,hy-30],[hx+34,hy-64],[hx+18,hy-48],[hx+6,hy-70],[hx-6,hy-48],[hx-16,hy-62]],C.YEL);dot(hx+8,hy-40,5,C.RED);}
  if(o.glasses){E(hx+10,hy-8,16,15,null,{lw:3});E(hx+44,hy-6,12,11,null,{lw:3});Ln(hx+26,hy-8,hx+32,hy-7,{lw:3});}
  if(o.grad){P([[hx-30,hy-30],[hx+10,hy-48],[hx+50,hy-30],[hx+10,hy-14]],'#2E2E2E');R(hx-4,hy-30,28,14,3,'#2E2E2E');Ln(hx+10,hy-34,hx+38,hy-20,{col:C.YEL,lw:3});E(hx+38,hy-16,4,5,C.YEL,{lw:2});}
  if(o.tie)P([[hx-4,hy+28],[hx+14,hy+28],[hx+10,hy+40],[hx+22,hy+78],[hx+6,hy+88],[hx-4,hy+74],[hx+2,hy+40]],'#C03A3A',{lw:2.6});
  if(o.band)P([[hx-30,hy-20],[hx+40,hy-18],[hx+40,hy-6],[hx-30,hy-8]],'#D9473A',{lw:2.6});
  if(o.hold)o.hold();
  restore();
}
/* ---------- Bernabé: la bota ---------- */
function bernabe(x,y,s=1,o={}){
  save(x,y,s,o.rot||0,o.flip);
  P([[-34,-118],[34,-118],[36,-40],[84,-30],[90,0],[-38,0]],BOT,{seed:51});
  R(-38,-130,76,26,6,'#4A3018',{lw:3});
  P([[-38,-14],[90,-14],[90,0],[-38,0]],'#3A2412',{lw:2.4});
  const ex=o.exp||'normal';
  if(ex==='normal'){E(-8,-84,9,9,'#fff',{lw:2.4});E(16,-84,9,9,'#fff',{lw:2.4});dot(-6,-84,3.5);dot(18,-84,3.5);}
  else{eye(-8,-84,ex);eye(16,-84,ex);}
  if(o.smile)stroke([[-10,-60],[4,-52],[18,-60]],{lw:3});else Ln(-8,-58,16,-58,{lw:3});
  if(o.lace)for(let i=0;i<3;i++)Ln(-22,-110+i*0,22,-110,{lw:2});
  restore();
}
/* ---------- huevo, nido ---------- */
function nido(x,y,s=1){save(x,y,s);E(0,0,120,34,'#B8934E',{lw:3.4});for(let i=0;i<9;i++)Ln(-100+i*24,4,-90+i*24,-20,{lw:2.4,col:'#7A5F2A'});restore();}
function huevo(x,y,s=1,o={}){save(x,y,s,o.rot||0);E(0,-34,28,38,'#F5EEDA',{lw:3.4});if(!o.plain){dot(-8,-44,3,'#CFC6A4');dot(10,-26,3.4,'#CFC6A4');dot(-4,-18,2.6,'#CFC6A4');}
  if(o.crack){Ln(-14,-34,-4,-42,{lw:2.6});Ln(-4,-42,4,-32,{lw:2.6});Ln(4,-32,14,-42,{lw:2.6});}restore();}
/* ---------- humanos y barco ---------- */
function marinero(x,y,s=1,o={}){
  X.stick(x,y,s,{smile:!o.mean,flip:o.flip,arms:o.arms,hold(){
    // sombrero tricornio y barba
    P([[-44,-188],[44,-188],[28,-214],[-28,-214]],'#2E2E2E',{lw:3.4});Ln(-46,-188,46,-188,{lw:5});
    P([[-18,-146],[18,-146],[10,-122],[-10,-122]],'#6B4A2E',{lw:2.6});
    for(let i=0;i<4;i++)Ln(-60,-110+i*18,60,-110+i*18,{lw:5,col:'#4C6FA8'});
    if(o.hold)o.hold();}});
}
function barco(x,y,s=1,o={}){
  save(x,y+Math.sin((o.t||0)*2)*6,s,0,o.flip);
  P([[-260,-60],[260,-60],[200,20],[-190,20]],'#7A5230',{lw:4});
  Ln(0,-60,0,-340,{lw:8,col:'#4A3018'});
  P([[-10,-320],[-170,-300],[-150,-120],[-10,-110]],'#fff',{lw:3.4});
  P([[10,-320],[170,-300],[150,-120],[10,-110]],'#fff',{lw:3.4});
  P([[0,-340],[60,-326],[0,-312]],C.RED,{lw:2.6});
  for(let i=0;i<4;i++)E(-150+i*90,-30,12,12,'#2E2E2E',{lw:2.4});
  restore();
}
function waves(y,t){for(let i=0;i<8;i++){const x=(i*260+t*40)%(W+200)-100;Ln(x,y+(i%3)*14,x+120,y+(i%3)*14,{col:C.WATER2,lw:4});}}
/* ---------- animales invasores ---------- */
function rata(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);
  stroke([[-70,-26],[-110,-40],[-130,-10]],{lw:5});
  E(0,-34,64,32,'#7B7872');
  P([[48,-52],[110,-34],[50,-8]],'#8C8984');dot(110,-34,5);
  E(40,-64,12,12,'#E8B7B3',{lw:2.4});
  dot(80,-42,4.6);
  Ln(60,-30,38,-24,{lw:2});Ln(60,-26,40,-14,{lw:2});
  Ln(-20,-6,-24,0,{lw:5});Ln(30,-6,34,0,{lw:5});
  restore();}
function cerdo(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);
  for(const lx of[-60,-30,40,70])R(lx-8,-40,16,42,6,'#E7A5AA');
  E(0,-90,100,62,'#F0B5BA');
  stroke([[-98,-96],[-116,-110],[-104,-124],[-120,-130]],{lw:5});
  E(98,-100,50,46,'#F0B5BA');
  E(138,-92,24,20,'#E58E96');dot(132,-92,3.4);dot(146,-92,3.4);
  P([[90,-136],[112,-150],[116,-124]],'#E58E96');
  const ex=o.exp||'normal';eye(96,-108,ex==='normal'?'angry':ex);
  if(o.mouth)R(116,-72,34,16,4,'#6A1010',{lw:2.4});
  restore();}
function perro(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);const Dg='#B98550';
  stroke([[-80,-90],[-110,-120]],{lw:10,col:Dg});stroke([[-80,-90],[-110,-120]],{lw:5,col:Dg});
  for(const lx of[-60,-26,36,64])R(lx-9,-44,18,46,7,Dg);
  E(0,-86,90,40,Dg);
  E(92,-112,34,30,Dg);R(110,-110,44,24,10,Dg);dot(150,-108,5);
  P([[76,-136],[94,-128],[92,-96]],'#7A5230');
  dot(100,-120,4.4);
  if(o.mouth)R(116,-96,34,12,4,'#6A1010',{lw:2.2});
  restore();}
function macaco(x,y,s=1,o={}){X.monkey(x,y,s);}
function paloma(x,y,s=1,o={}){save(x,y,s,0,o.flip);
  Ln(-4,0,-6,-18,{lw:4,col:'#C03A3A'});Ln(8,0,10,-18,{lw:4,col:'#C03A3A'});
  E(0,-44,34,26,'#3F6C7A');E(26,-70,17,15,'#2F5A67');P([[40,-72],[56,-68],[40,-62]],'#E8D6A8',{lw:2.4});dot(30,-74,3.5);
  E(-4,-46,22,12,'#5A9AA5',{rot:-.3,lw:2.4});
  for(let i=0;i<3;i++)Ln(-30-i*5,-44+i*4,-52-i*5,-44+i*4,{lw:5,col:'#fff'});
  restore();}
function arbol(x,yb,s=1){X.save(x,yb,s);X.P([[-14,0],[14,0],[10,-200],[-10,-200]],C.TR,{seed:3});E(0,-250,90,70,C.CAN[0]);E(-50,-220,50,40,C.CAN[2]);E(56,-224,50,40,C.CAN[1]);X.restore();}
function cartel(x,y,txt,k,size=34){if(k<=0)return;X.g.font=`${size}px Patrick`;const w=X.g.measureText(txt).width+34;save(x,y,X.back(k));R(-w/2,-26,w,50,8,'#fff',{lw:2.6});text(txt,0,0,size,C.OUT,'Patrick');restore();}
function vitrina(x,y,w,h){R(x,y,w,h,8,'rgba(207,232,243,.55)',{lw:5});R(x-14,y+h,w+28,26,6,'#8E6034',{lw:4});}
function piedra(x,y,s=1){save(x,y,s);E(0,-12,22,14,'#9A9A92',{lw:2.6});restore();}
function libro(x,y,s=1,t='ALICIA'){save(x,y,s);R(-90,-120,180,240,8,'#3F6C9A',{lw:4});R(-76,-100,152,70,4,'#E9D9B4',{lw:2.6});text(t,0,-64,38,C.OUT,'Patrick');restore();}
function fruta(x,y,s=1,col='#E8793A'){save(x,y,s);E(0,-18,20,20,col,{lw:2.6});P([[0,-38],[10,-48],[6,-34]],'#5E8748',{lw:2});restore();}
module.exports={bg,dodo,bernabe,nido,huevo,marinero,barco,waves,rata,cerdo,perro,macaco,paloma,arbol,cartel,vitrina,piedra,libro,fruta,palm,DOD,BOT};
