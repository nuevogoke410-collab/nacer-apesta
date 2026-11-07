// Personajes y fondos para "Nacer como un titanoboa apesta"
const X=require('./lib');
const {createCanvas}=require('@napi-rs/canvas');
const {W,H,C,TAU,rnd,lerp,E,R,P,Ln,dot,stroke,shape,save,restore,text,eye,lips,cl,seg,eo,drop,heart}=X;
const g=()=>X.g;
const OUT=C.OUT;
const AN='#7C5A34', ANB='#E2CE9B', ANS='#3E2A14', SW='#4F7A63', SW2='#79A58C', MUD='#7A5C3A';

/* ---------- fondos de pantano ---------- */
function mangrove(x,yb,h,seed){
  const w=26+rnd(seed)*10;
  P([[x-w/2,yb-h],[x+w/2,yb-h],[x+w*.7,yb-30],[x-w*.7,yb-30]],C.TR,{seed});
  for(let k=-2;k<=2;k++){const sx=x+k*20;Ln(x+k*6,yb-40,sx+k*8,yb+6,{lw:5,col:C.TR2});}
  // lianas
  for(let k=0;k<3;k++){const lx=x-30+k*30;Ln(lx,0,lx+(rnd(seed+k)-.5)*20,120+rnd(seed*2+k)*180,{lw:3.2,col:'#3F6332'});}
}
function lilypad(x,y,s=1,flower=false){save(x,y,s);E(0,0,46,14,'#6FA04E');Ln(0,0,40,-6,{lw:2.4});if(flower){E(0,-12,10,12,C.PINK,{lw:2.4});E(-10,-8,8,10,'#F08AC2',{lw:2.2});E(10,-8,8,10,'#F08AC2',{lw:2.2});dot(0,-10,3.5,C.YEL);}restore();}
function reeds(x,y,s=1){save(x,y,s);for(let i=-2;i<=2;i++){Ln(i*9,0,i*14,-110-Math.abs(i)*-12,{lw:3.4});}R(-10,-130,12,40,5,'#6B4423',{lw:2.6});R(12,-118,12,34,5,'#6B4423',{lw:2.6});restore();}
function drawSwamp(kind){
  const gg=g();
  const sky={dia:'#FFF8E3',noche:'#1F2538',atardecer:'#F3B37A',lluvia:'#CBD0CF',orilla:'#FFF8E3',zoo:'#F1E7D0',cine:'#2A1F2E'}[kind];
  gg.fillStyle=sky;gg.fillRect(0,0,W,H);
  if(kind==='mina'){gg.fillStyle='#8A7458';gg.fillRect(0,0,W,H);
    for(let i=0;i<7;i++){const y=60+i*150;P([[-40,y],[W*.3,y-18],[W*.6,y+10],[W+40,y-12],[W+40,y+60],[W*.6,y+80],[W*.3,y+50],[-40,y+70]],i%2?'#2B2623':'#6B5740',{seed:90+i});}
    R(0,H-150,W,150,0,'#4D3F30',{lw:3.4});return;}
  if(kind==='museo'){gg.fillStyle='#F1E7D0';gg.fillRect(0,0,W,H);P([[-40,760],[W+40,750],[W+40,H+40],[-40,H+40]],'#B79A6A',{seed:7});
    R(60,120,300,380,6,'#fff',{lw:4});R(1560,120,300,380,6,'#fff',{lw:4});
    text('TITANOBOA',210,200,50,C.OUT,'Patrick');text('13 m',210,290,90,C.RED,'Gochi');text('1 tonelada',1710,200,44,C.OUT,'Patrick');text('Colombia',1710,290,60,C.OUT,'Gochi');
    for(let i=0;i<8;i++)R(380+i*140,20,6,90,2,'#555',{lw:2});return;}
  const night=kind==='noche',dusk=kind==='atardecer';
  if(night){for(let i=0;i<40;i++)dot(rnd(i)*W,rnd(i+9)*300,2.4,'#F4EFC8');E(1560,200,56,56,'#F4EFC8');}
  if(dusk)E(960,430,170,170,'#F7D774');
  X.bush(300,420,420,150,night?'#2E4A3A':C.BUSH[2],3);X.bush(1100,430,520,170,night?'#2E4A3A':C.BUSH[1],5);X.bush(1700,420,380,140,night?'#2E4A3A':C.BUSH[0],7);
  [[120,520,480],[520,500,450],[1480,520,470],[1800,500,430]].forEach((t,i)=>mangrove(t[0],t[1]+40,t[2],i*7+3));
  X.canopy&&0;
  // copas
  const cano=(y0,col,sd)=>{const pts=[[-60,-20]];for(let x=-60;x<W+60;){const w=150*(.7+rnd(sd+x)*.6),d=60*(.6+rnd(sd*3+x)*.7);for(let k=0;k<=8;k++){const a=k/8;pts.push([x+a*w,y0+Math.sin(a*Math.PI)*d]);}x+=w;}pts.push([W+60,-20]);P(pts,col,{seed:sd});};
  cano(110,night?'#26402F':C.CAN[3],21);cano(60,night?'#1F3626':C.CAN[0],22);
  if(kind==='orilla'){P([[-40,800],[700,790],[1000,H+40],[-40,H+40]],C.G2,{seed:12});
    P([[1000,H+40],[700,790],[W*.6,560],[W+40,550],[W+40,H+40]],SW,{seed:13});
  } else {
    P([[-40,560],[W*.5,552],[W+40,560],[W+40,H+40],[-40,H+40]],SW,{seed:11});
  }
  for(let i=0;i<14;i++){const x=rnd(i+4)*W,y=620+rnd(i*3+1)*400;if(kind==='orilla'&&x<900&&y>780)continue;Ln(x,y,x+70+rnd(i)*50,y,{col:SW2,lw:3});}
  lilypad(1560,640,1,true);lilypad(1250,720,.8);lilypad(1760,780,1.1);lilypad(1040,610,.7,true);
  reeds(60,600,1.2);reeds(1860,610,1.1);fern(300,640,1.2);fern(1500,600,1);fern(1000,590,.8);
  if(night||kind==='lluvia'){gg.fillStyle=night?'rgba(15,20,40,.4)':'rgba(120,130,130,.18)';gg.fillRect(0,0,W,H);}
}
function fern(x,y,s=1){save(x,y,s);for(let i=-3;i<=3;i++){const a=i*.34;const L=110-Math.abs(i)*10;stroke([[0,0],[Math.sin(a)*L*.5,-L*.55],[Math.sin(a)*L,-L]],{lw:3.2,col:'#3F6332'});for(let k=1;k<5;k++){const px=Math.sin(a)*L*k/5,py=-L*k/5;E(px-8,py,9,4,'#5E8748',{rot:.6,lw:1.6});E(px+8,py,9,4,'#5E8748',{rot:-.6,lw:1.6});}}restore();}
const cache={};
function swamp(kind='dia'){
  if(!cache[kind]){const cv=createCanvas(W,H);const prev=X.g;X.setCtx(cv.getContext('2d'));drawSwamp(kind);X.setCtx(prev);cache[kind]=cv;}
  X.g.drawImage(cache[kind],0,0);
}
// agua de primer plano que oculta el cuerpo: dibuja debajo de la línea y
function wfront(y,t=0,col=SW,c2=SW2){
  const pts=[[-40,H+40]];for(let x=-40;x<=W+40;x+=80)pts.push([x,y+Math.sin(x*.012+t*2.4)*6]);pts.push([W+40,H+40]);
  P(pts,col,{seed:78,amp:.8});
  for(let i=0;i<8;i++){const x=(rnd(i)*W*.9+Math.sin(t*2+i)*14),yy=y+40+rnd(i*5)*(H-y-60);Ln(x,yy,x+70,yy,{col:c2,lw:3});}
}
function rainfall(t){for(let i=0;i<110;i++){const x=(rnd(i)*W+t*100)%W,y=(rnd(i*3)*H+t*900)%H;Ln(x,y,x-8,y+34,{lw:2.4,col:'#7C93A6',noJit:true});}}

/* ---------- titanoboa ---------- */
// origen = base del cuerpo, cabeza a la derecha. o: exp, flip, rot, t, len, w (semiancho), amp, pts, lips, hat, glasses, grad, crown, mouth, tongue, baby, cola, bulge, col, hold
function bodyPts(L,N,amp,t,ph=0){const out=[];for(let i=0;i<=N;i++){const u=i/N;out.push([-L*(1-u),Math.sin(u*TAU*1.4+ph+t*2.6)*amp*(.25+.75*(1-u*.7))]);}return out;}
function anaco(x,y,s=1,o={}){
  const t=o.t||0,N=o.N||26,wd=o.w||(o.baby?20:30),L=o.len||(o.baby?170:430);
  const pts=o.pts||bodyPts(L,N,o.amp??16,t,o.ph||0);const n=pts.length;
  const B=o.col||AN;
  save(x,y,s,o.rot||0,o.flip);
  const Lp=[],Rp=[],Bp=[];
  for(let i=0;i<n;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)];let nx=-(b[1]-a[1]),ny=b[0]-a[0];const d=Math.hypot(nx,ny)||1;nx/=d;ny/=d;
    const u=i/(n-1);let w=wd*(u<.4?lerp(.12,1,eo(u/.4)):1);if(u>.93)w*=lerp(1,.82,(u-.93)/.07);
    if(o.bulge&&u>o.bulge[0]&&u<o.bulge[1])w*=1.35;
    Lp.push([pts[i][0]+nx*w,pts[i][1]+ny*w]);Rp.push([pts[i][0]-nx*w,pts[i][1]-ny*w]);Bp.push([pts[i][0]+nx*w*.3,pts[i][1]+ny*w*.3]);}
  shape(Lp.concat(Rp.slice().reverse()),B,{amp:.8,seed:41});
  shape(Bp.concat(Lp.slice().reverse()),ANB,{amp:.5,lw:2.2,seed:42});
  for(let i=3;i<n-3;i+=2){const p=pts[i],q=Rp[i];E(lerp(p[0],q[0],.45),lerp(p[1],q[1],.45),wd*.34,wd*.26,ANS,{lw:1.2,rot:i*.3});}
  const hp=pts[n-1],pp=pts[n-2],ang=Math.atan2(hp[1]-pp[1],hp[0]-pp[0]);
  save(hp[0],hp[1],wd/30,ang);
  // cabeza
  P([[-12,-26],[28,-30],[62,-18],[84,0],[80,16],[48,26],[6,28],[-14,18]],B,{seed:43,amp:.8});
  P([[10,10],[48,14],[80,14],[76,18],[46,26],[8,28]],ANB,{lw:2.2,amp:.4});
  if(o.mouth){P([[84,2],[130,-22],[128,22],[84,12]],'#6A1010',{lw:2.6});for(const tx of[96,108,118])P([[tx-3,-8+(tx-96)*-.5],[tx+3,-8+(tx-96)*-.5],[tx,0]],'#fff',{lw:1});}
  if(o.tongue){const tw=Math.sin(t*14)*5;stroke([[82,6],[106,8+tw],[124,4]],{col:C.RED,lw:3.4});Ln(124,4,138,-4+tw,{col:C.RED,lw:3});Ln(124,4,138,12+tw,{col:C.RED,lw:3});}
  dot(70,-4,2.6);
  // ojos arriba
  const ex=o.exp||'normal';
  E(28,-30,13,11,B,{lw:2.6});E(2,-28,11,10,B,{lw:2.4});
  if(ex==='normal'){dot(32,-31,5);dot(5,-29,4.4);}else{eye(31,-31,ex);eye(4,-29,ex);}
  if(o.lips)lips(70,16,.7);
  if(o.hat){P([[6,-34],[44,-36],[26,-100]],'#E86AA6');Ln(16,-58,34,-60,{col:C.YEL,lw:5});E(26,-102,9,9,C.YEL);}
  if(o.crown){P([[2,-36],[46,-38],[52,-72],[36,-54],[24,-78],[12,-54],[0,-70]],C.YEL);dot(24,-48,4,C.RED);}
  if(o.glasses){E(30,-31,16,15,null,{lw:3});E(4,-29,14,13,null,{lw:3});Ln(14,-30,18,-30,{lw:3});}
  if(o.grad){P([[-14,-44],[34,-62],[82,-44],[34,-28]],'#2E2E2E');R(20,-42,28,14,3,'#2E2E2E');Ln(34,-44,70,-30,{col:C.YEL,lw:3});}
  restore();
  if(o.hold)o.hold(pts);
  restore();
}
function ring(cx,cy,r,wd,t,o={}){ // titanoboa enroscada en círculo
  const pts=[];const turns=o.turns||2.2;for(let i=0;i<=40;i++){const u=i/40,a=-Math.PI*.6+u*TAU*turns;const rr=r*(1-u*.0)+u*(o.dr||0);pts.push([cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.4]);}
  return pts;}

/* ---------- Ramiro: el nenúfar ---------- */
function ramiro(x,y,s=1,o={}){
  save(x,y,s,o.rot||0);const sink=o.sink||0;
  E(0,0+sink,60,17,'#6FA04E');Ln(0,sink,52,-6+sink,{lw:2.4});
  E(0,-18+sink,50,15,'#7DB35A',{lw:2.6});
  const ex=o.exp||'normal',ey=-20+sink;
  if(ex==='normal'){dot(-16,ey,4.4);dot(16,ey,4.4);}else{eye(-16,ey,ex);eye(16,ey,ex);}
  stroke(o.sad?[[-12,ey+14],[0,ey+8],[12,ey+14]]:[[-12,ey+8],[0,ey+15],[12,ey+8]],{lw:2.8});
  if(!o.noFlower){for(let i=0;i<4;i++){const a=-.6+i*.4;E(Math.sin(a)*50,-34+sink-Math.cos(a)*22,12,5,'#7DB35A',{rot:a-1.2,lw:2});}stroke([[28,-26+sink],[40,-52+sink],[56,-58+sink],[60,-46+sink],[50,-44+sink]],{lw:3.4,col:'#3F6332'});}
  if(o.wave){const a=Math.sin((o.t||0)*8)*.5;Ln(50,-30+sink,76,-60+a*20+sink,{lw:4});E(80,-66+a*20+sink,11,13,'#6FA04E',{lw:2.4});}
  restore();
}

/* ---------- otros animales y gente ---------- */
function carbonemys(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);const G='#6B7A3E',D='#4D5A2A';
  for(const lx of[-70,40]){R(lx-18,-30,38,40,12,D,{lw:3});}
  P([[-120,-20],[-110,-90],[-60,-150],[20,-160],[90,-130],[130,-70],[134,-20]],G,{seed:61});
  for(const [px,py] of[[-60,-100],[0,-120],[60,-100],[-30,-60],[40,-60]])E(px,py,26,20,D,{lw:2});
  R(104,-86,76,40,16,D,{lw:3});E(166,-70,20,20,D);dot(172,-76,4);
  if(o.exp==='dead'){Ln(164,-82,180,-66,{lw:4});Ln(180,-82,164,-66,{lw:4});}
  else if(o.exp==='sweat'){drop(190,-110);}
  if(o.crack){Ln(-20,-150,0,-110,{lw:3.4});Ln(0,-110,-18,-90,{lw:3.4});}
  restore();}

function caiman(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);const G='#56713A',D='#3E5428';
  for(const lx of[-70,50]){R(lx-12,-30,26,38,10,D);}
  P([[-200,-26],[-120,-52],[-30,-60],[60,-56],[130,-44],[230,-40],[236,-18],[130,-10],[40,0],[-60,2],[-140,-4]],G,{seed:51});
  for(let i=0;i<8;i++)P([[-150+i*40,-54-i%2*3],[-136+i*40,-72],[-122+i*40,-54]],D,{lw:2});
  E(70,-66,14,12,G,{lw:2.6});
  if(o.exp==='sleep')stroke([[62,-66],[70,-60],[78,-66]],{lw:3,noJit:true});else{dot(72,-66,4.4);Ln(60,-78,82,-72,{lw:3.4});}
  if(o.mouth){P([[236,-30],[210,-6],[130,-4]],'#6A1010',{lw:2.4});for(const tx of[160,190,215])P([[tx-4,-10],[tx+4,-10],[tx,-1]],'#fff',{lw:1.2});}
  restore();}
function zorro(x,y,s=1,o={}){const ph=o.run||0,G='#B9783A';save(x,y,s,o.rot||0,o.flip);
  stroke([[-60,-50],[-100,-60],[-116,-36]],{lw:20,col:OUT});stroke([[-60,-50],[-100,-60],[-116,-36]],{lw:14,col:G});
  for(const l of[[-40,0],[-20,Math.PI],[30,.5],[48,Math.PI+.5]]){g().save();g().translate(l[0],-30);g().rotate(Math.sin(ph+l[1])*.4);R(-7,0,14,34,6,'#7A4A22');g().restore();}
  E(0,-46,66,26,G);
  P([[48,-76],[90,-80],[134,-54],[136,-42],[90,-36],[52,-44]],G,{seed:4});
  P([[56,-76],[60,-108],[78,-82]],G,{lw:2.6});P([[82,-80],[96,-106],[104,-80]],G,{lw:2.6});
  dot(130,-52,4);eye(92,-64,o.exp==='dead'?'dead':'angry');
  if(o.mouth){P([[90,-38],[134,-40],[112,-18]],'#6A1010',{lw:2.2});}
  restore();}
function lagarto(x,y,s=1,o={}){save(x,y,s,0,o.flip);const G='#3C3C30';
  stroke([[-60,-24],[-120,-14],[-170,-26]],{lw:18,col:OUT});stroke([[-60,-24],[-120,-14],[-170,-26]],{lw:12,col:G});
  for(const lx of[-30,40]){Ln(lx,-20,lx-10,0,{lw:8,col:G});}
  E(0,-30,66,22,G);for(let i=0;i<5;i++)dot(-40+i*22,-40+(i%2)*6,4,'#C9C9B8');
  E(76,-34,28,18,G);dot(86,-40,4,'#fff');dot(87,-40,2);
  if(o.mouth){P([[96,-32],[116,-30],[100,-18]],'#6A1010',{lw:2});}
  restore();}
function pajaro(x,y,s=1,o={}){ // caracara
  X.eagle(x,y,s,{t:o.t,flip:o.flip,rot:o.rot});}
function plantita(x,y,s=1){save(x,y,s);Ln(0,0,0,-40,{lw:4,col:'#3F6332'});E(-12,-44,14,8,'#6FA04E',{rot:.4,lw:2.4});E(12,-52,14,8,'#6FA04E',{rot:-.4,lw:2.4});restore();}
function pez(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);E(0,0,30,15,'#C7D4D8');P([[-26,0],[-48,-14],[-48,14]],'#9FB1B6',{lw:2.4});dot(16,-3,3);restore();}
function machete(x,y,s=1,rot=0){save(x,y,s,rot);R(-6,-8,12,50,3,'#6B4423',{lw:2.4});P([[-8,-8],[8,-8],[10,-110],[-4,-120]],'#B7BCC0',{lw:2.4});restore();}
function bota(x,y,s=1){save(x,y,s);P([[-26,-70],[10,-70],[12,-20],[48,-14],[50,10],[-28,10]],'#7A4A22',{lw:3});restore();}
function bulldozer(x,y,s=1,t=0){save(x,y,s);R(-110,-110,200,70,10,'#E9B530',{lw:3.4});R(-40,-170,100,60,10,'#E9B530',{lw:3.4});R(-30,-160,70,40,6,'#CFE8F3',{lw:2.6});
  R(-130,-40,260,40,20,'#555',{lw:3.4});for(let i=0;i<6;i++)dot(-100+i*40,-20,10,'#333');
  P([[110,-130],[170,-60],[170,-20],[110,-20]],'#9A9A92',{lw:3.4});
  X.stick(-6,-110,.35,{});restore();}
module.exports={carbonemys,hilario:ramiro,fern,swamp,wfront,rainfall,anaco,bodyPts,ring,ramiro,caiman,zorro,lagarto,pajaro,pez,machete,bota,bulldozer,plantita,lilypad,reeds,mangrove,AN,ANB,ANS,SW,SW2,MUD};
