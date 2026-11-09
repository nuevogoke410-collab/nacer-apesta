// Personajes y fondos para "Nacer como un tiranosaurio rex apesta"
const X=require('./lib');
const {createCanvas}=require('@napi-rs/canvas');
const {W,H,C,TAU,rnd,lerp,E,R,P,Ln,dot,stroke,shape,save,restore,text,eye,lips,cl,seg,eo,drop,heart}=X;
const g=()=>X.g;
const REX='#B5793A', REXB='#EBD9A8', REXD='#7A4E22', ROCK='#9C9C94', ROCKD='#74746E', SAND='#C9A56B';

/* ---------- fondos del cretácico ---------- */
function fern(x,y,s=1){save(x,y,s);for(let i=-3;i<=3;i++){const a=i*.34;const L=110-Math.abs(i)*10;stroke([[0,0],[Math.sin(a)*L*.5,-L*.55],[Math.sin(a)*L,-L]],{lw:3.2,col:'#3F6332'});for(let k=1;k<5;k++){const px=Math.sin(a)*L*k/5,py=-L*k/5;E(px-8,py,9,4,'#5E8748',{rot:.6,lw:1.6});E(px+8,py,9,4,'#5E8748',{rot:-.6,lw:1.6});}}restore();}
function cycad(x,yb,h,seed,col='#4E7A3B'){
  P([[x-14,yb-h],[x+14,yb-h],[x+22,yb],[x-22,yb]],C.TR,{seed});
  for(let k=0;k<4;k++)Ln(x-16,yb-h*(.2+k*.2),x+16,yb-h*(.15+k*.2),{lw:2.2});
  for(let i=-4;i<=4;i++){const a=i*.42;const L=130;const tx=x+Math.sin(a)*L,ty=yb-h-Math.cos(a)*L*.5+Math.abs(i)*8;
    stroke([[x,yb-h],[x+Math.sin(a)*L*.5,yb-h-Math.cos(a)*L*.55],[tx,ty]],{lw:6,col});
    for(let k=1;k<5;k++){const px=lerp(x,tx,k/5),py=lerp(yb-h,ty,k/5)-Math.sin(k/5*Math.PI)*14;E(px,py+8,9,4,col,{rot:1.2,lw:1.4});}}
}
function volcano(x,yb,w,h,t=0){P([[x-w/2,yb],[x-w*.08,yb-h],[x+w*.08,yb-h],[x+w/2,yb]],'#7A5A3E',{seed:61});
  P([[x-w*.08,yb-h],[x+w*.08,yb-h],[x+w*.05,yb-h+22],[x-w*.05,yb-h+22]],'#D4542A',{lw:2.4});
  for(let i=0;i<4;i++){const k=(t*.15+i/4)%1;E(x+Math.sin(k*5+i)*30,yb-h-30-k*220,30+k*50,24+k*30,'rgba(160,160,155,'+(1-k).toFixed(2)+')',{lw:2.2});}}
function drawCret(kind){
  const gg=g();
  const sky={dia:'#FFF6DC',noche:'#1F2538',atardecer:'#F3B37A',meteoro:'#E8743A',rio:'#FFF6DC',badlands:'#FFF6DC',lluvia:'#CBD0CF',nido:'#FFF6DC',post:'#6B5A52'}[kind]||'#FFF6DC';
  gg.fillStyle=sky;gg.fillRect(0,0,W,H);
  if(kind==='museo'){gg.fillStyle='#F1E7D0';gg.fillRect(0,0,W,H);P([[-40,760],[W+40,750],[W+40,H+40],[-40,H+40]],'#B79A6A',{seed:7});
    for(let i=0;i<8;i++)R(80+i*240,20,6,100,2,'#555',{lw:2});
    R(60,140,260,380,6,'#fff',{lw:4});text('TIRANOSAURIO',190,200,40,C.OUT,'Patrick');text('12 m',190,300,90,C.RED,'Gochi');text('8 toneladas',190,380,36,C.OUT,'Patrick');
    return;}
  if(kind==='badlands'){
    P([[-40,520],[300,430],[520,440],[760,500],[1100,420],[1400,450],[W+40,500],[W+40,H+40],[-40,H+40]],SAND,{seed:81});
    for(let i=0;i<5;i++){const y=520+i*60;P([[-40,y],[W+40,y-12],[W+40,y+22],[-40,y+30]],i%2?'#B8895A':'#D9BB84',{seed:82+i,stroke:false});Ln(-40,y,W+40,y-12,{lw:2.4});}
    for(let i=0;i<3;i++)cycad(260+i*620,640,200,i+6,'#7C8B4F');
    gg.fillStyle=sky;return;}
  const night=kind==='noche',dusk=kind==='atardecer',met=kind==='meteoro',post=kind==='post';
  if(met){for(let i=0;i<6;i++){gg.fillStyle=['#F0A55A','#E8743A','#D8552E'][i%3];gg.fillRect(0,i*70,W,70);}}
  if(night){for(let i=0;i<40;i++)dot(rnd(i)*W,rnd(i+9)*300,2.4,'#F4EFC8');E(1560,200,56,56,'#F4EFC8');}
  if(dusk)E(960,430,170,170,'#F7D774');
  if(kind==='dia'||kind==='rio'||kind==='nido'||kind==='lluvia'){E(1620,170,70,70,'#F7D774');}
  volcano(300,470,500,260,0);volcano(1650,470,360,190,0);
  const dark=night?'#2E4A3A':null;
  X.bush(900,470,520,150,dark||C.BUSH[1],5);X.bush(1500,480,420,130,dark||C.BUSH[0],7);
  const ground=post?'#4A423D':night?'#2F3A2A':C.G2;
  if(kind==='rio'){P([[-40,520],[W*.5,512],[W+40,520],[W+40,700],[W*.5,706],[-40,700]],'#5E8FAE',{seed:9});for(let i=0;i<8;i++){const x=rnd(i+3)*W,y=550+rnd(i*2+1)*130;Ln(x,y,x+70+rnd(i)*60,y,{col:C.WATER2,lw:3});}
    P([[-40,700],[W*.5,692],[W+40,700],[W+40,H+40],[-40,H+40]],ground,{seed:10});}
  else P([[-40,500],[W*.3,492],[W*.6,505],[W+40,495],[W+40,H+40],[-40,H+40]],ground,{seed:11});
  [[160,560,380],[560,540,320],[1380,560,360],[1800,540,330]].forEach((t,i)=>cycad(t[0],t[1]+40,t[2],i*5+2,night?'#2E5A3A':post?'#5A5048':'#4E7A3B'));
  fern(300,640,1.2);fern(1500,620,1);fern(1000,600,.8);fern(1780,700,1.1);
  if(night||kind==='lluvia'||met||post){gg.fillStyle=night?'rgba(15,20,40,.4)':met?'rgba(120,30,10,.22)':post?'rgba(30,25,25,.25)':'rgba(120,130,130,.18)';gg.fillRect(0,0,W,H);}
}
const cache={};
function cret(kind='dia'){
  if(!cache[kind]){const cv=createCanvas(W,H);const prev=X.g;X.setCtx(cv.getContext('2d'));drawCret(kind);X.setCtx(prev);cache[kind]=cv;}
  X.g.drawImage(cache[kind],0,0);
}
function rainfall(t){for(let i=0;i<110;i++){const x=(rnd(i)*W+t*100)%W,y=(rnd(i*3)*H+t*900)%H;Ln(x,y,x-8,y+34,{lw:2.4,col:'#7C93A6',noJit:true});}}

/* ---------- tiranosaurio ---------- */
// origen = pies, mira a la derecha. o: exp, flip, rot, t, walk, baby, mouth (0..1 apertura), lips, hat, glasses, grad, crown, feathers, col, hold
function rex(x,y,s=1,o={}){
  const B=o.col||REX,ph=o.walk||0,bs=o.baby?.5:1,hs=o.baby?1.35:1;
  save(x,y,s*bs,o.rot||0,o.flip);
  // pata lejana
  const sw=Math.sin(ph)*18, sw2=Math.sin(ph+Math.PI)*18;
  R(-30+sw2,-60,30,58,10,REXD);P([[-30+sw2,0],[26+sw2,0],[34+sw2,-10],[26+sw2,-18],[-24+sw2,-18]],REXD);
  // cola
  P([[-60,-195],[-150,-185],[-250,-140],[-262,-125],[-240,-114],[-140,-112],[-50,-70]],B,{seed:91});
  P([[-250,-130],[-150,-125],[-60,-90],[-52,-72],[-140,-112],[-240,-114]],REXB,{seed:92,lw:2.2,amp:.5});
  // cuerpo
  P([[-95,-170],[-45,-218],[30,-230],[85,-195],[95,-135],[65,-62],[0,-48],[-70,-68],[-102,-120]],B,{seed:93});
  P([[-60,-70],[0,-52],[62,-66],[88,-120],[70,-140],[20,-100],[-30,-92]],REXB,{seed:94,lw:2.2,amp:.5});
  if(o.feathers)for(let i=0;i<9;i++){const fx=-80+i*17,fy=-206+Math.abs(i-4)*7;Ln(fx,fy,fx+3,fy-18,{lw:3});Ln(fx+5,fy,fx+12,fy-14,{lw:3});}
  else for(let i=0;i<4;i++)Ln(-60+i*36,-200+Math.abs(i-1.5)*8,-52+i*36,-178+Math.abs(i-1.5)*8,{lw:3,col:REXD});
  // pata cercana
  E(2,-92,44,60,B,{seed:95});R(-14,-50,32,50,10,B);P([[-20,-2],[40,-2],[50,-12],[38,-22],[-14,-22]].map(p=>[p[0]+sw,p[1]]),B);
  for(const cx of[34,44])Ln(cx+sw,-3,cx+sw+6,5,{lw:3});
  // brazo diminuto
  P([[62,-158],[96,-130],[110,-140],[102,-122],[88,-116],[58,-142]],B,{seed:96});Ln(104,-135,112,-128,{lw:2.6});
  // cuello
  P([[20,-228],[70,-236],[110,-290],[150,-262],[120,-196],[80,-150],[40,-170]],B,{seed:99});
  // cabeza
  save(95,-215,hs);
  const hx=-95,hy=215;
  save(hx,hy);
  P([[80,-232],[96,-290],[170,-302],[232,-278],[256,-250],[256,-232],[170,-222],[112,-214],[84,-205]].map(p=>p),B,{seed:97}); // cráneo/mandíbula sup
  const jaw=(o.mouth||0)*.55;
  save(118,-208,1,jaw);
  P([[-10,-6],[120,-14],[138,-8],[130,12],[40,22],[-10,14]],o.mouth>0?REXB:B,{seed:98,lw:3.2});
  if(o.mouth>.1){P([[10,-6],[120,-12],[124,-4],[30,12]],'#6A1010',{stroke:false});for(let i=0;i<5;i++)P([[22+i*20,-6],[32+i*20,-6],[27+i*20,6]],'#fff',{lw:1.4});}
  restore();
  if(o.mouth>.1){for(let i=0;i<6;i++)P([[126+i*20,-224],[138+i*20,-224],[132+i*20,-212]],'#fff',{lw:1.4});
    Ln(120,-206,246,-224,{lw:2.4});}
  else{for(let i=0;i<5;i++)P([[132+i*20,-226],[142+i*20,-226],[137+i*20,-216]],'#fff',{lw:1.2});}
  E(240,-262,6,5,REXD,{lw:1.4});
  dot(130,-262,0);
  const ex=o.exp||'normal';
  E(158,-262,14,13,B,{lw:2.6});
  if(ex==='normal'){dot(160,-262,5);}else eye(158,-262,ex);
  Ln(140,-280,180,-270,{lw:4,col:REXD});
  if(o.lips)lips(226,-232,.8);
  if(o.hat){P([[110,-292],[150,-300],[122,-376]],'#E86AA6');Ln(120,-318,140,-320,{col:C.YEL,lw:5});E(122,-380,10,10,C.YEL);}
  if(o.crown){P([[104,-292],[154,-300],[162,-336],[142,-318],[128,-344],[116,-318],[102,-338]],C.YEL);dot(128,-306,5,C.RED);}
  if(o.glasses){E(158,-262,20,18,null,{lw:3});E(210,-258,16,15,null,{lw:3});Ln(178,-262,194,-260,{lw:3});}
  if(o.grad){P([[98,-296],[150,-318],[204,-296],[150,-278]],'#2E2E2E');R(134,-296,32,16,3,'#2E2E2E');Ln(150,-300,190,-282,{col:C.YEL,lw:3});E(190,-278,5,6,C.YEL,{lw:2});}
  if(o.feathers)for(let i=0;i<4;i++)Ln(100+i*14,-292+i*3,104+i*14,-312+i*2,{lw:3});
  if(o.tongue){stroke([[200,-215],[230,-205],[250,-212]],{col:C.RED,lw:4});}
  restore();restore();
  if(o.hold)o.hold();
  restore();
}

/* ---------- Rufino: la piedra ---------- */
function rufino(x,y,s=1,o={}){
  save(x,y,s,o.rot||0);
  P([[-62,0],[-70,-40],[-46,-82],[0,-96],[44,-84],[68,-40],[62,0]],ROCK,{seed:51});
  P([[-30,-90],[-6,-100],[24,-92],[10,-78],[-18,-78]],'#6FA04E',{lw:2.4});
  Ln(-40,-30,-20,-50,{lw:2.2,col:ROCKD});Ln(30,-24,52,-46,{lw:2.2,col:ROCKD});
  const ex=o.exp||'normal';
  if(ex==='normal'){dot(-18,-52,4.6);dot(18,-52,4.6);}else{eye(-18,-52,ex);eye(18,-52,ex);}
  stroke(o.sad?[[-12,-30],[0,-38],[12,-30]]:[[-12,-36],[0,-28],[12,-36]],{lw:2.8});
  if(o.wave){const a=Math.sin((o.t||0)*8)*.5;Ln(62,-40,86,-70+a*18,{lw:4});}
  if(o.crack){Ln(-4,-96,6,-64,{lw:3});Ln(6,-64,-6,-40,{lw:3});}
  restore();
}

/* ---------- otros dinosaurios ---------- */
function tricera(x,y,s=1,o={}){
  save(x,y,s,o.rot||0,o.flip);const G='#7E92A0',D='#566878';
  R(-80+Math.sin(o.walk||0)*8,-60,32,60,10,D);R(50-Math.sin(o.walk||0)*8,-60,32,60,10,D);
  P([[-130,-130],[-90,-190],[0,-205],[90,-180],[130,-120],[110,-60],[0,-48],[-110,-60]],G,{seed:71});
  R(-60,-56,30,56,10,G);R(80,-56,30,56,10,G);
  P([[100,-150],[100,-250],[160,-290],[230,-250],[230,-150]].map(p=>[p[0]+20,p[1]+10]),'#B3563E',{seed:72});
  E(230,-210,64,44,G,{seed:73});
  P([[250,-206],[300,-190],[262,-166]],'#E8D7A8',{lw:2.6});
  P([[200,-244],[216,-312],[228,-246]],'#F4EAC9',{lw:2.8});P([[236,-240],[256,-306],[264,-238]],'#F4EAC9',{lw:2.8});
  const ex=o.exp||'normal';if(ex==='normal')dot(216,-226,5);else eye(216,-226,ex);
  Ln(196,-244,232,-238,{lw:4});
  restore();
}
function pico(x,y,s=1,o={}){ // dinosaurio de pico de pato
  save(x,y,s,o.rot||0,o.flip);const G='#8A9E5A',D='#5E7040';
  R(-28,-70,28,70,10,D);R(30,-70,28,70,10,D);
  P([[-60,-200],[-150,-170],[-250,-130],[-240,-112],[-130,-120],[-60,-80]],G,{seed:75});
  P([[-80,-210],[0,-250],[60,-220],[80,-130],[40,-60],[-40,-60],[-90,-120]],G,{seed:76});
  P([[40,-210],[70,-300],[130,-320],[170,-290],[210,-296],[210,-272],[160,-262],[120,-240],[80,-190]],G,{seed:77});
  P([[170,-292],[240,-296],[246,-276],[170,-264]],'#C9B96B',{lw:2.6});
  const ex=o.exp||'normal';if(ex==='normal')dot(134,-292,5);else eye(134,-292,ex);
  if(o.scar){Ln(-20,-190,10,-150,{lw:5,col:C.RED});}
  restore();
}
function meteor(x,y,s,t=0){save(x,y,s,-.5);
  P([[-400,-20],[-60,-40],[-60,40],[-400,20]].map(p=>[p[0]*2.2,p[1]]),'#F7D774',{stroke:false});
  E(0,0,70,60,'#E8743A',{lw:4});E(0,0,44,38,'#F7D774',{lw:3});
  for(let i=0;i<6;i++)E(-120-i*60,Math.sin(t*10+i)*20,30,20,'#E8743A',{lw:2.4});
  restore();}
function egg(x,y,s=1,o={}){save(x,y,s,o.rot||0);
  P([[0,-110],[40,-90],[56,-50],[40,-8],[0,0],[-40,-8],[-56,-50],[-40,-90]],'#F4EEDC',{seed:55});
  E(-12,-62,5,5,'#C9B98A',{lw:1.4});E(14,-40,7,7,'#C9B98A',{lw:1.4});E(6,-84,4,4,'#C9B98A',{lw:1.4});
  if(o.crack){Ln(-30,-60,-10,-72,{lw:3});Ln(-10,-72,4,-56,{lw:3});Ln(4,-56,22,-72,{lw:3});Ln(22,-72,36,-58,{lw:3});}
  restore();}
function nest(x,y,s=1){save(x,y,s);P([[-130,0],[-100,-34],[0,-48],[100,-34],[130,0]],'#8A6A44',{seed:57});
  for(let i=0;i<9;i++)Ln(-110+i*28,-12-(i%2)*12,-90+i*28,-30,{lw:2.6,col:REXD});restore();}
module.exports={cret,rex,rufino,tricera,pico,meteor,egg,nest,fern,cycad,volcano,rainfall,REX,REXB,REXD,ROCK,SAND};
