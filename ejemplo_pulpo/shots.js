const X=require('./lib');const Q=require('./extra');
const {W,H,C,TAU,seg,lerp,eo,eio,back,rnd,cl,E,R,P,Ln,dot,save,restore,text,bubble,impact,speed,splat,heart,drop,zzz,grave,confetti,stick,flies,table,lips,eye,stroke,snake,snakeHead,path}=X;
const {sea,bubbles,ink,pulpo,larva,pez,cangrejo,tiburon,delfin,foca,frasco,huevos,plato,rock}=Q;
const g=()=>X.g;
const GY=930;
const pop=(t,a,d=.35)=>back(seg(t,a,a+d));
const on=(t,a,b=1e9)=>t>=a&&t<b;
const mix=(a,b,k)=>{const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const A=p(a),B=p(b);return '#'+A.map((v,i)=>Math.round(lerp(v,B[i],cl(k))).toString(16).padStart(2,'0')).join('');};
const eater=(t,tEat,y,flip=false)=>{const k=seg(t,tEat-.7,tEat+.7);if(k>0&&k<1)pez(lerp(flip?W+200:-200,flip?-200:W+200,k),y,1.5,{mouth:true,flip,t,col:'#6FA8C8'});};
function tag(s,x,y,size=40,rot=0){text(s,x,y,size,C.OUT,'Patrick','center',rot,8,'#fff');}
function arrowTo(x1,y1,x2,y2){Ln(x1,y1,x2,y2,{lw:4});const a=Math.atan2(y2-y1,x2-x1);Ln(x2,y2,x2-Math.cos(a-.5)*24,y2-Math.sin(a-.5)*24,{lw:4});Ln(x2,y2,x2-Math.cos(a+.5)*24,y2-Math.sin(a+.5)*24,{lw:4});}
function star(x,y,r,col=C.YEL){const pts=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;pts.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr]);}P(pts,col,{lw:3});}
function card(t,S){sea('mar');bubbles(t,6,3);const k=pop(t,.15,.5);save(W/2,400,k,-.02);R(-600,-190,1200,380,18,'#F4EEDC',{lw:4});
  text('Capítulo '+S.ch,0,-100,64,'#A8472F','Patrick');text(S.title,0,40,S.title.length>16?90:130,C.OUT,'Gochi');restore();
  pulpo(lerp(-300,W+300,seg(t,0,S.D)),GY+60,.8,{t,exp:['normal','normal','sweat','sweat','shock','angry','love','chill'][S.ch-1]});}
const SHOTS={
titulo(t,S){sea('mar');bubbles(t,10,1);
  text('Nacer como un',W/2,240,120*pop(t,0),C.OUT,'Gochi','center',-.03,10,'#fff');
  text('PULPO',W/2,430,250*pop(t,.3),Q.PUL,'Gochi','center',.02,14,C.OUT);
  if(t>1.1){save(W/2+260,620,lerp(2.4,1,eo(seg(t,1.1,1.3))),-.12);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  pulpo(1560,GY+30,.9*pop(t,.6),{t,exp:t>1.2?'sweat':'normal',flip:true});},
huevos(t,S){sea('mar');bubbles(t,6,1);const k=seg(t,S.L(1)-.2,S.L(1)+1.4);
  if(k<=0){const sc=pop(t,.2,.5);save(900,640,sc);E(0,0,150,190,'#F4EBD0',{lw:4});larva(0,90,3.4,t);restore();
    save(1480,830,pop(t,.9));E(0,0,24,10,'#fff',{lw:2.6});restore();tag('grano de arroz',1480,780,36);tag('tú',900,860,48);}
  else{huevos(960,720,Math.round(lerp(10,420,eo(k))),t,3,2.6);if(t>S.L(1)+.8)tag('x 50.000 hermanos',960,330,80*pop(t,S.L(1)+.8,.4));}},
madre(t,S){sea('mar');bubbles(t,5,2);const d=Math.min(30,1+Math.floor(seg(t,0,S.L(1))*30));
  rockCave();huevos(1380,860,90,t,2,2);
  pulpo(760,GY,1.5,{t,exp:t<S.L(1)?'sweat':'love'});
  if(t<S.L(1)){pez(1180,330+Math.sin(t*2)*10,1.3,{t});Ln(1100,250,1260,410,{lw:14,col:C.RED});Ln(1260,250,1100,410,{lw:14,col:C.RED});tag('Día '+d+' sin comer',1180,170,56);}
  else{heart(980,430,60*pop(t,S.L(1)+.1,.4));heart(1060,350,36*pop(t,S.L(1)+.4,.4));}},
eclosion(t,S){sea('mar');bubbles(t,8,4);const k=seg(t,.3,2.2);
  huevos(960,820,Math.round(lerp(160,30,k)),t,5,3);
  for(let i=0;i<26;i++){const a=rnd(i+2)*TAU;larva(lerp(960,rnd(i)*W,eo(k))+Math.sin(t*3+i)*14,lerp(780,150+rnd(i*4)*500,eo(k)),.8,t+i);}
  if(t>S.L(1)){const z=pop(t,S.L(1),.5);save(960,560,z);E(0,0,300,300,'#CFE6F0',{lw:5});larva(0,170,7,t);restore();tag('pocos milímetros',960,230,60);bubble('Hola',1380,380,50,-1);}},
adios(t,S){sea('mar');bubbles(t,4,6);rockCave();
  const fall=seg(t,S.L(0)+.8,S.L(0)+2);
  if(t<S.L(1)||true)pulpo(700,GY+fall*20,1.5,{t:t*(1-fall),exp:fall>.1?'dead':'sad',rot:fall*.7,wave:1-fall});
  if(t>S.L(1)){grave(1000,GY,'Mamá');}
  larva(1300,GY-200+Math.sin(t*2)*10,2.4,t);
  if(t>S.L(1))bubble('¿Mamá?',1300,GY-340,48,-1);},
plancton(t,S){sea('hondo');bubbles(t,10,7);
  for(let i=0;i<60;i++)dot((rnd(i)*W+t*20*(1+rnd(i*3)))%W,150+rnd(i*7)*700,2+rnd(i*9)*3,'#E9F3D9');
  larva(960,500+Math.sin(t*2)*20,3,t);
  if(t>S.L(1)){eater(t,S.L(1)+1.2,520);tag('comida',700,330,56*pop(t,S.L(1),.3));}
  if(t>S.L(2)){tag('...o va a ser comida',1200,330,56*pop(t,S.L(2),.3));}},
hermanos(t,S){sea('hondo');bubbles(t,8,8);
  const names=[['Brayan',480,360,S.L(1)+.9],['Yeison',1380,300,S.L(2)+.4],['Dayana',1000,640,S.L(2)+1.7]];
  for(const [n,x,y,te] of names){if(t<te){larva(x+Math.sin(t*2+x)*14,y+Math.sin(t*3+x)*8,2.2,t+x);tag(n,x,y-120,40);}else if(t<te+.8){tag('Q.E.P.D.',x,y,40);}
    eater(t,te,y,x>900);}
  larva(960,820+Math.sin(t*2)*8,2.6,t);if(t>S.L(2)+2)tag('tú',960,700,56);
  for(let i=0;i<8;i++)larva(150+i*230,150+rnd(i)*80+Math.sin(t+i)*10,1,t+i,{});},
caza(t,S){sea('mar');bubbles(t,5,9);
  pulpo(760,GY,1.4,{t,exp:t<S.L(1)?'sweat':'angry',mouth:t<S.L(1)?'open':null});
  if(t<S.L(1)){impact('GRRR',1250,420,seg(t,.3,S.L(1)-.3),C.YEL,C.RED);}
  else{const k=seg(t,S.L(1),S.L(1)+1.4);cangrejo(lerp(1560,1120,eo(k)),GY,1.1,{t,flip:true});
    for(let i=0;i<8;i++)text(''+(i+1),420+i*72,260-Math.abs(Math.sin(i))*0,56*pop(t,S.L(1)+.2+i*.18,.25),C.RED,'Gochi');tag('brazos',700,320,48*pop(t,S.L(1)+1.8));}},
ventosas(t,S){sea('mar');bubbles(t,4,10);
  const pts=[];for(let i=0;i<=12;i++)pts.push([-100+i*130,720-i*28+Math.sin(t*2+i)*14]);
  stroke(pts,{lw:150,col:C.OUT,noJit:true});stroke(pts,{lw:128,col:Q.PUL,noJit:true});
  for(let i=1;i<12;i++)E(pts[i][0],pts[i][1]+36,20,14,'#F3D2B8',{lw:2.6});
  cangrejo(1500,GY,1.2,{t,flip:true});
  if(t>S.L(1)){bubble('mmm... cangrejo',620,300,56,1);Ln(1180,500,1250,560,{lw:10,col:C.RED});}},
pico(t,S){sea('mar');bubbles(t,4,11);pulpo(760,GY,1.6,{t,exp:'angry',mouth:'open'});
  P([[760-14,GY-86*1.6-8],[760+14,GY-86*1.6-8],[760,GY-86*1.6+30]],'#2A2A2A',{lw:2.6});
  tag('pico',1000,430,70*pop(t,.4,.4));arrowTo(940,470,790,GY-130);
  const k=seg(t,S.L(1),S.L(1)+.8);E(1400,GY-30,110,70,'#E8DDC8',{lw:4});if(k>0){Ln(1330,GY-80,1450,GY+10,{lw:6});impact('¡CRAC!',1400,600,seg(t,S.L(1)+.3,S.L(1)+1.5));}},
noche(t,S){sea('noche');bubbles(t,6,12,'#9FD0EA');
  pez(500,520,1.3,{t:0,rot:.4,col:'#4F7FA0'});zzz(560,470,t);pez(1380,380,1.1,{t:0,rot:-.3,flip:true,col:'#4F7FA0'});zzz(1330,340,t+.5);
  pulpo(lerp(-200,1000,eio(seg(t,0,S.L(1)))),GY,1.2,{t,exp:'normal',look:6});
  if(t>S.L(1)){for(let i=0;i<9;i++){const a=pop(t,S.L(1)+.3+i*.1,.3);E(1100+(i%3)*50,640-Math.floor(i/3)*40,26*a,26*a,C.YEL,{lw:3});text('$',1100+(i%3)*50,640-Math.floor(i/3)*40,30*a,C.OUT,'Patrick');}tag('insomnio con buen sueldo',1250,430,44);}},
gerardo(t,S){sea('mar');bubbles(t,5,13);
  frasco(1300,GY,1.7*pop(t,.2,.5),{});pulpo(640,GY,1.3,{t,exp:t<S.L(1)?'shock':'love',look:8});
  if(t>S.L(1)){heart(980,430,46*pop(t,S.L(1)+.1,.4));heart(1060,360,30*pop(t,S.L(1)+.5,.4));bubble('...',1340,440,60,-1);}
  if(t>S.L(1)+2.6)tag('Gerardo',1300,GY-270,48);},
frasco(t,S){sea('lab');
  R(480,300,900,560,14,'#BFE0EE',{lw:5});R(480,300,900,70,0,'#E8F3F8',{lw:4});
  pulpo(940,820,1,{t,exp:'normal',look:-8});
  const lid=seg(t,S.L(1)+.4,S.L(1)+1.6);
  frasco(1500,GY,1.2,{});
  if(lid<=0){frasco(940,500,.7,{});}else{save(940,500+lid*0,.7);R(-42,-110,84,110,18,'#DCEBF2',{lw:3.4});restore();save(940+lid*160,340-lid*120+lid*lid*180,.7,lid*5);R(-30,-130,60,24,6,'#B58A4C',{lw:3});restore();}
  stick(220,GY,1.2,{smile:true});
  if(t>S.L(1)+1.6){frasco(1500,GY,2.2,{});bubble('¡Más difícil!',1500,420,48,-1);}},
cangrejo(t,S){sea('mar');bubbles(t,5,14);
  const k=eo(seg(t,0,1.2));cangrejo(lerp(2300,1380,k),GY,2.6,{t,flip:true});
  pulpo(540,GY,1.3,{t,exp:t<S.L(1)?'angry':'sweat'});
  if(t>S.L(1)){tag('caparazón',1300,250,52);tag('gelatina',560,250,52);Ln(560,300,560,430,{lw:4});}
  if(t>S.L(1)+1.8)impact('¡PLOP!',950,500,seg(t,S.L(1)+1.8,S.L(1)+3));},
corazones(t,S){sea('mar');bubbles(t,5,15);
  pulpo(700,GY,1.6,{t,exp:'sad',crown:t>S.L(1)});
  for(let i=0;i<3;i++)heart(700+(i-1)*70,GY-190*1.0+(i%2)*30,(28+Math.sin(t*8+i)*4)*pop(t,.3+i*.3,.3));
  if(t<S.L(1))tag('3 corazones',1180,300,64*pop(t,.3,.4));
  else{save(1300,640,pop(t,S.L(1)+.3));R(-120,-70,240,140,16,'#8A5A2B',{lw:4});text('$0',0,6,80,C.OUT,'Gochi');restore();flies(1300,540,t,4);tag('sangre azul',1180,300,64);}},
cerebros(t,S){sea('mar');bubbles(t,5,16);
  const ts=t<S.L(1)?t:t;pulpo(960,GY,1.6,{t:ts,exp:'sweat',wave:t>S.L(1)?2.6:1});
  const dots=[[960,GY-300]];for(let i=0;i<8;i++){const sd=i<4?-1:1,j=i<4?3-i:i-4;dots.push([960+sd*(30+j*40)*1.6,GY-40]);}
  dots.forEach((d,i)=>{const a=pop(t,.3+i*.22,.25);E(d[0],d[1],18*a,14*a,'#F09AB8',{lw:2.6});});
  tag('9 cerebros',1500,300,60*pop(t,.3,.4));
  if(t>S.L(1)){const w=['Izq.','Der.','¡No!','Arriba','Abajo','Sí','Quieto','Ya'];w.forEach((s,i)=>{const a=pop(t,S.L(1)+i*.25,.25);text(s,320+i*180,GY-440-(i%2)*70,40*a,C.RED,'Patrick');});}},
ojos(t,S){sea('mar');bubbles(t,4,17);
  save(560,520,pop(t,.2,.4));E(0,0,190,150,'#fff',{lw:5});E(10,0,70,70,'#C9A24E',{lw:4});R(-40,-16,100,32,8,C.OUT,{lw:2});restore();
  save(1360,520,pop(t,.9,.4));E(0,0,190,150,'#fff',{lw:5});E(0,0,72,72,'#5A7FA0',{lw:4});dot(0,0,34);restore();
  tag('pulpo',560,740,52);tag('humano',1360,740,52);text('=',960,520,140,C.RED,'Gochi');
  if(t>S.L(1))bubble('¿Y mis gracias?',960,250,56,-1);},
sinhuesos(t,S){sea('mar');bubbles(t,4,18);
  R(930,0,120,640,0,'#8C8C86',{lw:4});R(930,820,120,230,0,'#8C8C86',{lw:4});E(990,730,60,95,'#CFE6F0',{lw:4});
  const k=eio(seg(t,.4,S.L(1)+.5));const x=lerp(400,1560,k);const squeeze=1-.62*Math.exp(-Math.pow((x-990)/130,2));
  g().save();g().translate(x,GY);g().scale(squeeze,1);g().translate(-x,-GY);pulpo(x,GY,1.15,{t,exp:'sweat'});g().restore();
  if(t>S.L(1)+.6){tag('solo tu pico es duro',1300,260,52);}},
solitario(t,S){sea('noche');bubbles(t,4,19);
  rock(1000,GY+10,1100,560,'#5D5F66',3);E(1000,GY-180,200,170,'#10182A',{lw:0,stroke:false});
  pulpo(1000,GY-30,.95,{t,exp:'sad',wave:.4});
  if(t>S.L(1)){save(1560,420,pop(t,S.L(1),.4));R(-90,-150,180,300,24,'#2B2B3A',{lw:4});R(-76,-130,152,260,12,'#E9E3D3',{lw:2});text('Grupo',0,-60,40,C.OUT,'Patrick');text('0 msj',0,10,44,C.RED,'Patrick');restore();}
  if(t>S.L(2)){frasco(380,GY+10,1.2,{exp:'happy'});bubble('...',380,GY-210,46,1);}},
vecino(t,S){sea('mar');bubbles(t,4,20);
  pulpo(480,GY,1.1,{t,exp:'sweat',flip:false});
  const a=seg(t,S.L(1)+.6,S.L(1)+1.2);const bx=lerp(1500,700,eo(a));
  pulpo(bx,GY,1.6,{t,exp:t<S.L(1)+.6?'normal':'angry',flip:true,mouth:a>.5?'open':null});
  if(t<S.L(1)){tag('Opción 1: ignorarse',480,300,44);tag('Opción 2: cena',1400,300,44);}
  if(t>S.L(1)+1.2){impact('¡ÑAM!',600,520,seg(t,S.L(1)+1.2,S.L(1)+2.4));}},
lista(t,S){sea('arrecife');bubbles(t,5,21);
  pulpo(960,GY,1.2,{t,exp:'sweat'});
  const s0=S.L(0);const m=eo(seg(t,s0+.4,s0+1.2));foca(lerp(-300,300,m),GY-20,1.2,{});
  const sh=eo(seg(t,s0+1.2,s0+2));tiburon(lerp(W+300,1560,sh),300,1,{mouth:true,flip:true});
  const de=eo(seg(t,s0+2,s0+2.8));delfin(lerp(-300,420,de),300,1,{});
  const mo=eo(seg(t,s0+2.8,s0+3.6));snake(path(u=>[lerp(1900,1380,mo)+u*500,GY-30+Math.sin(u*8+t*4)*20],20),26,{col:'#7B8A45'});snakeHead(lerp(1900,1380,mo),GY-40,1.1,{exp:'angry',flip:true});
  if(t>S.L(1)){save(960,300,pop(t,S.L(1),.4));R(-300,-80,600,160,14,'#F4EEDC',{lw:5});text('MENÚ DEL DÍA',0,0,86,C.RED,'Gochi');restore();}},
humanos(t,S){sea('lab');
  const items=[['Ceviche',420],['Parrilla',960],['A la gallega',1500]];
  items.forEach(([n,x],i)=>{const a=pop(t,S.L(1)+i*.7,.35);if(a>0){save(x,700,a);plato(0,0,1.3);pulpo(0,-10,.35,{t,exp:'sad',wave:.5});restore();tag(n,x,820,46);}});
  stick(160,GY,1.1,{smile:true});stick(1780,GY,1.1,{smile:true});
  text('¿Quién me llamó inteligente?',960,200,0,C.OUT);},
tinta(t,S){sea('mar');bubbles(t,4,22);
  pulpo(480,GY,1.3,{t,exp:t>S.L(1)?'happy':'sweat'});
  const k=seg(t,S.L(1)+.2,S.L(1)+1.2);
  const sx=t<S.L(1)+1.4?lerp(W+300,1000,eo(seg(t,0,S.L(1)+1.2))):lerp(1000,1650,eio(seg(t,S.L(1)+1.4,S.L(1)+2.6)));
  tiburon(sx,380,.9,{mouth:true,flip:true,rot:t>S.L(1)+2.4?.35:0});
  ink(900,420,k,1.6);if(t>S.L(1)+2.4)impact('¡PUM!',1550,640,seg(t,S.L(1)+2.4,S.L(1)+3.6));},
brazo(t,S){sea('mar');bubbles(t,4,23);
  const bite=S.L(0)+.8;
  pulpo(620,GY,1.4,{t,exp:t<bite?'normal':'shock',arms:1});
  tiburon(lerp(W+200,1000,eo(seg(t,0,bite))),520,.9,{mouth:true,flip:true});
  if(t>bite){const pts=[];for(let i=0;i<=8;i++)pts.push([980+i*14,540+Math.sin(t*10+i)*20-i*8]);stroke(pts,{lw:36,col:C.OUT,noJit:true});stroke(pts,{lw:26,col:Q.PUL,noJit:true});}
  if(t>S.L(1)){tag('¡DRAMA!',620,330,90*pop(t,S.L(1),.3));const g1=seg(t,S.L(1)+.8,S.L(1)+2.5);const p2=[];for(let i=0;i<=6;i++)p2.push([700+i*22*g1,GY-30+i*3]);if(g1>0){stroke(p2,{lw:32,col:C.OUT,noJit:true});stroke(p2,{lw:24,col:'#E8A090',noJit:true});}}},
veneno(t,S){sea('arrecife');bubbles(t,4,24);
  const s=.6;pulpo(760,GY,s,{t,exp:'angry',col:'#E9B530',dk:'#B8861A',mouth:'open'});
  for(const p of[[-18,-110],[16,-130],[30,-96],[-30,-86]]){const a=pop(t,.4,.3);E(760+p[0]*s*1.7,GY+p[1]*s*1.7,8*a,8*a,null,{lw:3.4,col:'#2C6FD1',noJit:true});}
  if(t>S.L(1)){stick(1480,GY,1.1,{sweat:true});Ln(1456,GY-182,1472,GY-166,{lw:4});Ln(1472,GY-182,1456,GY-166,{lw:4});
    save(1480,GY-300,pop(t,S.L(1)+.4));E(0,0,40,34,'#fff',{lw:3});dot(-14,-4,7);dot(14,-4,7);R(-18,18,36,18,2,'#fff',{lw:3});restore();}
  tag('anillos azules',760,330,52);},
morena(t,S){sea('arrecife');bubbles(t,6,25);
  const x=lerp(250,1500,eio(seg(t,0,S.D)));
  for(let i=0;i<5;i++)Ln(x-260-i*30,GY-260+i*55,x-120-i*30,GY-260+i*55,{lw:4,col:'#7FA6BE',noJit:true});
  pulpo(x,GY,1.0,{t:t*3,exp:t>S.L(1)?'shock':'sweat',flip:false,wave:2});
  for(let i=0;i<4;i++)E(x-190-i*50,GY-120+Math.sin(t*20+i)*10,16-i*2,16-i*2,null,{lw:3,col:'#7FA6BE',noJit:true});
  snake(path(u=>[x-700+u*420+Math.sin(t*10)*8,GY-30+Math.sin(u*8+t*6)*26],20),30,{col:'#7B8A45'});snakeHead(x-290,GY-40,1.4,{exp:'angry',tongue:true});
  if(t>S.L(1))impact('¡PFFFT!',x-200,520,seg(t,S.L(1),S.L(1)+1.4),'#fff',C.BLUE);},
camufla(t,S){sea('arrecife');bubbles(t,4,26);
  const seq=[['#8C8C86','roca'],['#E0D0A4','arena'],['#4E7A3B','alga']];const ph=Math.min(2.999,t/ (S.D/3));const i=Math.floor(ph),f=ph-i;
  const prev=i===0?Q.PUL:seq[i-1][0];const col=mix(prev,seq[i][0],f*3);
  pulpo(960,GY,1.6,{t,exp:'normal',col,dk:mix(col,'#000000',.25)});
  tag(seq[i][1],960,300,80);},
dalton(t,S){sea('mar');bubbles(t,4,27);
  pulpo(760,GY,1.4,{t,exp:'normal',glasses:true,look:10});
  save(1280,520,pop(t,.3));E(0,0,150,110,'#C9A06B',{lw:4});E(60,10,24,24,'#fff',{lw:3});for(const [x,y,c] of[[-60,-30,'#D9473A'],[-10,-50,'#E9B530'],[50,-40,'#4E86C8'],[-70,30,'#4E7A3B'],[-20,34,'#9A72C9']])dot(x,y,18,c);restore();
  if(t>S.L(1)){save(1480,GY,pop(t,S.L(1)+.3));P([[-46,-190],[46,-190],[36,-110],[-36,-110]],C.YEL,{lw:4});R(-14,-110,28,60,2,C.YEL,{lw:4});R(-50,-50,100,30,4,'#8A5A2B',{lw:4});Ln(-46,-170,-76,-160,{lw:5});Ln(46,-170,76,-160,{lw:5});restore();confetti(t);}},
luz(t,S){sea('mar');
  for(let i=0;i<7;i++)P([[100+i*260,0],[160+i*260,0],[60+i*260-60,H],[-20+i*260-60,H]],'rgba(255,255,255,.28)',{stroke:false});
  bubbles(t,5,28);pulpo(960,GY,1.6,{t,exp:'happy'});
  const pts=[[-40,-120],[40,-150],[-80,-90],[90,-90],[0,-60],[-120,-30],[120,-30],[-60,-40]];
  pts.forEach((p,i)=>{const a=pop(t,.4+i*.18,.25);E(960+p[0]*1.6,GY+p[1]*1.6,13*a,11*a,'#fff',{lw:3});dot(960+p[0]*1.6,GY+p[1]*1.6,5*a);});
  if(t>S.L(1))tag('ojo gigante con patas',1500,330,54*pop(t,S.L(1),.3));},
imitar(t,S){sea('arrecife');bubbles(t,5,29);
  const ph=seg(t,S.L(0)+.6,S.L(0)+1.4);
  if(ph<1)pulpo(900,GY,1.3,{t,exp:'normal',col:Q.PUL});
  else{snake(path(u=>[500+u*800,GY-60+Math.sin(u*10+t*5)*30],20),34,{col:Q.PUL});snakeHead(1300,GY-70,1.3,{exp:'angry',tongue:true});}
  tag(ph<1?'pulpo':'¡serpiente!',900,300,70);
  if(t>S.L(1)){const a=eo(seg(t,S.L(1),S.L(1)+2));pez(lerp(1700,2300,a),520,1.2,{t,flip:false,col:'#6FA8C8'});if(a<.5)bubble('¡AAAH!',1700,400,56,1);}},
memoria(t,S){sea('mar');
  save(960,480,1);R(-300,-230,600,460,14,'#F4EEDC',{lw:5});
  const w=[[-300,-90,300,-90],[-200,-230,-200,100],[-100,-90,-100,230],[0,-230,0,100],[100,-90,100,230],[200,-230,200,100],[-300,100,200,100]];
  w.forEach(a=>Ln(a[0],a[1],a[2],a[3],{lw:6}));
  const k=seg(t,.3,S.L(1));const pp=[[-250,-160],[-150,-160],[-150,40],[-50,40],[-50,-160],[50,-160],[50,160],[150,160],[150,-40],[250,-40]];
  const n=k*(pp.length-1);const part=pp.slice(0,Math.floor(n)+1);if(n<pp.length-1){const f=n-Math.floor(n),a=pp[Math.floor(n)],b=pp[Math.floor(n)+1];part.push([lerp(a[0],b[0],f),lerp(a[1],b[1],f)]);}
  if(part.length>1)stroke(part,{lw:9,col:Q.PUL,noJit:true});restore();
  pulpo(300,GY,1,{t,exp:'happy'});
  if(t>S.L(1)){stick(1650,GY,1.2,{sweat:true});bubble('¿Por dónde?',1650,420,46,-1);}},
escape(t,S){sea('lab');
  R(560,340,800,520,10,'#BFE0EE',{lw:5});E(960,860,56,14,'#2B2B3A',{lw:3});
  const k=seg(t,S.L(1)+.2,S.L(1)+1.8);
  if(k<1)pulpo(960,lerp(840,1050,eo(k)),lerp(.9,.35,k)*1,{t,exp:'happy'});
  if(t>S.L(1)+.2)tag('puerta',960,930,50);
  if(t<S.L(1)){tag('¡adiós, acuario!',960,250,56);}else tag('desagüe = puerta',960,250,56);
  stick(300,GY,1.1,{smile:true});},
cueva(t,S){sea('mar');bubbles(t,4,30);
  save(900,GY,1);R(-110,-200,220,200,40,'#C93A3A',{lw:5});R(-110,-200,220,40,10,'#E5E5E5',{lw:4});text('CERVEZA',0,-100,46,'#fff','Patrick');restore();
  E(900,GY-30,40,30,'#10182A',{stroke:false});
  pulpo(900,GY+90,.22,{t,exp:'normal',look:6});
  rock(380,GY+30,380,200,'#8C8C86',4);save(1560,GY,1);E(0,-60,90,90,'#2B2B3A',{lw:5});E(0,-60,42,42,'#CFE6F0',{lw:4});restore();
  if(t>S.L(1)){tag('casa de lujo',900,420,70*pop(t,S.L(1),.3));for(let i=0;i<5;i++)star(640+i*80,340,28*pop(t,S.L(1)+.2+i*.15,.25));}},
coco(t,S){sea('mar');bubbles(t,4,31);
  const x=lerp(-300,W+300,seg(t,.2,S.D));const by=Math.abs(Math.sin(t*6))*14;
  pulpo(x,GY-by,1.0,{t:t*2,exp:'sweat',wave:2});
  P([[x-150,GY-200-by],[x-110,GY-300-by],[x,GY-340-by],[x+110,GY-300-by],[x+150,GY-200-by]],'#6B4423',{lw:4});
  for(let i=0;i<4;i++)Ln(x-90+i*60,GY-300-by,x-90+i*60,GY-210-by,{lw:2.4,col:'#4A2C14'});
  tag('MUDANZA',x,GY-380-by,44);
  if(t>S.L(1)){bubble('Otra vez de mudanza',x,GY-480,44,1);}},
juego(t,S){sea('mar');bubbles(t,4,32);
  const by=Math.abs(Math.sin(t*4))*140;pulpo(620,GY,1.3,{t,exp:t<S.L(1)?'happy':'angry'});
  if(t<S.L(1)){E(960+Math.sin(t*3)*200,GY-by-60,40,40,'#E9B530',{lw:4});}
  else{stick(1480,GY,1.4,{smile:true});const k=seg(t,S.L(1)+.5,S.L(1)+1.4);
    if(k>0&&k<1)for(let i=0;i<9;i++)dot(lerp(860,1470,k)+i*-26*(1-k),lerp(GY-250,GY-310,k)-Math.sin(k*Math.PI)*90+i*0,9,'#7FB5D8');
    if(k>=1)splat(1470,GY-310,seg(t,S.L(1)+1.4,S.L(1)+2),1,'#9FD0EA');}},
tamanos(t,S){sea('mar');bubbles(t,4,33);
  pulpo(380,GY,.25,{t,exp:'happy'});pulpo(900,GY,.85,{t,exp:'normal'});pulpo(1500,GY,1.4,{t,exp:'normal'});
  tag('unos centímetros',380,GY-80,36);tag('clase media',900,GY-320,44*pop(t,S.L(1)+.4,.3));tag('4 metros',1560,160,46);
  Ln(1160,GY+20,1960,GY+20,{lw:4});},
tiempo(t,S){sea('mar');
  save(700,520,1);E(0,0,230,230,'#fff',{lw:6});for(let i=0;i<12;i++){const a=i/12*TAU;Ln(Math.cos(a)*190,Math.sin(a)*190,Math.cos(a)*210,Math.sin(a)*210,{lw:4});}
  Ln(0,0,Math.cos(t*8)*150,Math.sin(t*8)*150,{lw:8});Ln(0,0,Math.cos(t*.7)*100,Math.sin(t*.7)*100,{lw:11});dot(0,0,12);restore();
  tag('1 a 2 años',700,820,60);
  if(t>S.L(1)){save(1450,420,pop(t,S.L(1),.4));R(-170,-120,340,240,10,'#F4EEDC',{lw:4});text('Hipoteca',0,-30,60,C.OUT,'Patrick');text('Deuda',0,50,60,C.OUT,'Patrick');restore();
    Ln(1280,300,1620,560,{lw:12,col:C.RED});pulpo(1460,GY,.6,{t,exp:'happy'});}},
gym(t,S){sea('mar');bubbles(t,4,34);
  const up=Math.abs(Math.sin(t*3))*110;pulpo(700,GY,1.4,{t,exp:'angry'});
  const by=GY-380-up;Ln(520,by,980,by,{lw:14});E(500,by,38,60,'#2B2B3A',{lw:4});E(1000,by,38,60,'#2B2B3A',{lw:4});E(470,by,24,44,'#555',{lw:3});E(1030,by,24,44,'#555',{lw:3});
  if(t>S.L(1)){save(1500,GY-120,pop(t,S.L(1),.4));R(-230,-60,460,120,10,'#E9D9B4',{lw:4});text('Barrio La Cueva',0,0,52,C.OUT,'Patrick');restore();Ln(1500,GY-60,1500,GY+30,{lw:12,col:'#A8743F'});}},
sueno(t,S){sea('noche');bubbles(t,5,35,'#9FD0EA');
  const col=mix('#D2705A','#6E88C9',(Math.sin(t*1.5)+1)/2);pulpo(620,GY,1.4,{t,exp:'zzz',col,dk:mix(col,'#000000',.3),wave:.4});zzz(760,GY-330,t);
  for(const [x,y,r] of[[860,GY-360,14],[940,GY-440,22],[1020,GY-540,32]])E(x,y,r,r,'#fff',{lw:3});
  save(1360,420,1);P([[-220,0],[-200,-100],[-100,-170],[40,-180],[170,-130],[230,-30],[160,60],[0,90],[-140,70]],'#fff',{lw:4});
  if(t>S.L(1)){frasco(0,40,.6,{exp:'happy'});Ln(-14,40,-60,60,{lw:5});Ln(14,40,60,60,{lw:5});Ln(-10,-0,-24,-14,{lw:0});}
  restore();},
macho(t,S){sea('arrecife');bubbles(t,4,36);
  pulpo(560,GY,1.3,{t,exp:'happy'});pulpo(1480,GY,1.3,{t,exp:'love',flip:true,lips:true});
  const arm=[[640,GY-60],[760,GY-150],[900,GY-130]];stroke(arm,{lw:34,col:C.OUT,noJit:true});stroke(arm,{lw:26,col:'#E9B530',noJit:true});
  tag('brazo especial',760,GY-320,44*pop(t,.4,.3));
  if(t>S.L(1)){const k=seg(t,S.L(1),S.L(1)+2);const x=lerp(900,1380,eio(k));save(x,GY-130-Math.sin(k*Math.PI)*60,1,k*3);R(-36,-30,72,60,6,'#F4EEDC',{lw:3.4});Ln(-36,0,36,0,{lw:4,col:C.RED});Ln(0,-30,0,30,{lw:4,col:C.RED});restore();
    if(t>S.L(1)+2){save(960,300,pop(t,S.L(1)+2,.4),-.06);R(-210,-50,420,100,6,null,{lw:6,col:C.RED});text('CERTIFICADO',0,4,66,C.RED,'Gochi');restore();}}},
cortejo(t,S){sea('arrecife');bubbles(t,4,37);
  const cols=['#E9B530','#D9473A','#4E86C8','#4E7A3B','#9A72C9','#E0618F'];const ci=Math.floor(t*3)%6;
  pulpo(560,GY,1.3,{t,exp:'happy',col:cols[ci],dk:mix(cols[ci],'#000000',.3)});
  pulpo(1480,GY,1.3,{t,exp:'normal',flip:true,lips:true});
  if(t>S.L(1)){save(1480,GY-420,pop(t,S.L(1),.4));R(-110,-60,220,120,10,'#F4EEDC',{lw:4});text('NO',0,6,90,C.RED,'Gochi');restore();
    bubble('...',560,GY-420,50,1);Ln(480,GY-470,640,GY-390,{lw:12,col:C.RED});}},
cena(t,S){sea('mar');bubbles(t,4,38);
  table(700,640,520);R(930,540,22,100,3,'#F4EEDC',{lw:3});E(941,525,9+Math.sin(t*20),16,'#F0A126',{lw:2.4});
  pulpo(480,GY,1.1,{t,exp:'happy'});pulpo(1480,GY,1.4,{t,exp:'angry',flip:true,lips:true,mouth:t>S.L(0)+1?'open':null});
  if(t>S.L(0)+1.4){impact('¡ÑAM!',960,380,seg(t,S.L(0)+1.4,S.L(0)+2.6));}
  if(t>S.L(1))tag('cuidado con la cena',960,230,56);},
murio(t,S){sea('mar');bubbles(t,3,39);
  const f=seg(t,.4,1.6);pulpo(760,GY+f*40,1.5,{t:t*(1-f),exp:f>.3?'dead':'happy',rot:f*1.2,wave:1-f});
  if(t>S.L(1)){const k=pop(t,S.L(1),.5);heart(1400,520,150*k);text('amor de mi vida',1400,520,34*k,'#fff','Patrick');
    save(1400,700,k,-.1);R(-170,-46,340,92,6,null,{lw:6,col:C.RED});text('LITERAL',0,4,64,C.RED,'Gochi');restore();}},
hembra(t,S){sea('mar');bubbles(t,4,40);rockCave();huevos(1380,860,100,t,2,2.2);
  const d=Math.min(160,1+Math.floor(seg(t,0,S.L(1))*160));
  pulpo(760,GY,1.5,{t,exp:t<S.L(1)?'sweat':'dead',rot:t<S.L(1)?0:.5,lips:true});
  if(t<S.L(1))tag('Día '+d+' sin comer',1000,250,56);
  else{grave(520,GY,'Mamá');for(let i=0;i<5;i++){Ln(400+i*34,GY-10,400+i*34,GY-70,{lw:4,col:'#4E7A3B'});E(400+i*34,GY-84,14,14,['#E0618F','#E9B530','#fff'][i%3],{lw:2.6});}
    tag('¡Feliz Día de la Madre!',1000,250,56*pop(t,S.L(1)+.2,.3));}},
ciclo(t,S){sea('mar');bubbles(t,4,41);
  const pos=[[960,260],[1360,540],[960,820],[560,540]];
  const ph=Math.floor(t/1.6)%4;
  for(let i=0;i<4;i++){const [x,y]=pos[i],hl=i===ph?1.2:1;save(x,y,hl);E(0,0,120,95,'#F4EEDC',{lw:4});
    if(i===0)huevos(0,0,18,t,3,.8);if(i===1)larva(0,30,2.4,t);if(i===2)pulpo(0,50,.32,{t,exp:'normal'});if(i===3)pez(0,0,.9,{mouth:true,t,col:'#6FA8C8'});restore();}
  for(let i=0;i<4;i++){const a=pos[i],b=pos[(i+1)%4];arrowTo(lerp(a[0],b[0],.32),lerp(a[1],b[1],.32),lerp(a[0],b[0],.68),lerp(a[1],b[1],.68));}
  tag('de nuevo',960,540,62);},
vejez(t,S){sea('mar');bubbles(t,4,42);
  pulpo(960,GY,1.4,{t,exp:'sad',glasses:true,col:'#B9A59A',dk:'#8A7A70',wave:.4,mouth:'sad'});Ln(1280,GY-260,1280,GY+10,{lw:9,col:'#8A5A2B'});Ln(1280,GY-260,1330,GY-230,{lw:9,col:'#8A5A2B'});
  ['viejo','hambre','amor'].forEach((s,i)=>{const a=pop(t,.4+i*.7,.3);tag(s,420+i*360,250,56*a);});
  if(t>S.L(1)){save(960,420,pop(t,S.L(1)+.2,.3),-.08);R(-90,-50,180,100,8,null,{lw:7,col:C.RED});text('NO',0,6,80,C.RED,'Gochi');restore();}},
paul(t,S){sea('mar');bubbles(t,4,43);
  tag('Mundial 2010',960,150,70*pop(t,.2,.4));
  pulpo(960,GY,1.1,{t,exp:'normal',look:t>S.L(1)?-10:10});
  for(const [x,c] of[[420,'#D9473A'],[1500,'#4E86C8']]){save(x,GY-60,1);R(-120,-90,240,150,8,'#E9D9B4',{lw:4});R(-90,-60,180,40,2,c,{lw:3});restore();}
  if(t>S.L(1)){const k=seg(t,S.L(1)+.6,S.L(1)+1.8);const pts=[[860,GY-80],[760,GY-120],[lerp(760,420,k),GY-120]];stroke(pts,{lw:26,col:C.OUT,noJit:true});stroke(pts,{lw:18,col:Q.PUL,noJit:true});}
  if(t>S.L(2)){grave(1700,GY,'Abuelo');confetti(t);bubble('¡Famoso!',960,430,54,-1);}},
pelicula(t,S){sea('mar');bubbles(t,5,44);
  stick(520,GY,1.3,{smile:true});E(520,GY-222,20,12,'#CFE6F0',{lw:3});
  pulpo(1100,GY,1.2,{t,exp:'love'});heart(820,GY-330,40*pop(t,.6,.4));
  if(t>S.L(1)){save(1500,330,pop(t,S.L(1),.4));R(-200,-120,400,240,10,'#F4EEDC',{lw:5});text('1 año',0,-10,100,C.RED,'Gochi');text('= toda una vida',0,70,40,C.OUT,'Patrick');restore();}},
cierre(t,S){sea('mar');bubbles(t,8,45);
  const k=pop(t,.2,.5);pulpo(960,GY,1.7*k,{t,exp:'love',wave:2});
  for(let i=0;i<8;i++){const a=pop(t,S.L(1)+i*.15,.3);heart(300+i*190,520-(i%2)*120-Math.sin(t*3+i)*10,32*a);}
  for(let i=0;i<3;i++)heart(960+(i-1)*60,GY-300+(i%2)*20,(20+Math.sin(t*8+i)*3)*k);
  if(t<S.L(1))tag('Nacer como un pulpo apesta',960,200,86);else tag('8 brazos para abrazar',960,200,70);},
adiosg(t,S){sea('noche');bubbles(t,5,46,'#9FD0EA');
  frasco(1400,GY,1.9,{exp:t>S.L(1)?'sad':'happy',sad:t>S.L(1)});
  Ln(1330,GY-110,1270,GY-180-Math.sin(t*8)*20,{lw:7});
  pulpo(lerp(900,-300,eio(seg(t,.6,S.D))),GY,1.1,{t:t*3,exp:'sad',flip:true});
  if(t>S.L(1)){heart(1400,GY-330,40*pop(t,S.L(1)+.3,.4));drop(1350,GY-110);}},
sub(t,S){sea('mar');bubbles(t,5,47);
  save(960,280,pop(t,.2,.5));R(-300,-80,600,160,24,C.RED,{lw:6});text('SUSCRIBIRSE',0,0,86,'#fff','Gochi');restore();
  save(1420,280,pop(t,.8,.4),Math.sin(t*10)*.2);P([[-30,40],[-26,-20],[0,-50],[26,-20],[30,40]],C.YEL,{lw:4});E(0,46,12,10,C.YEL,{lw:3});restore();
  frasco(1300,GY,1.8,{exp:t>S.L(1)?'shock':'normal'});
  const m=eo(seg(t,S.L(1)-.3,S.L(1)+1.5));
  snake(path(u=>[lerp(-400,780,m)+u*520,GY-50+Math.sin(u*8+t*4)*18],20),30,{col:'#7B8A45'});snakeHead(lerp(-400,780,m)+520,GY-60,1.5,{exp:'angry',tongue:true});
  if(t>S.L(1))bubble('¡Suscríbete!',1300,GY-360,56,-1);},
};
function rockCave(){rock(380,GY+30,520,300,'#8C8C86',4);}
function drawShot(id,t,S){if(id.startsWith('cap'))return card(t,S);const f=SHOTS[id];if(!f)throw new Error('falta toma '+id);f(t,S);}
module.exports={drawShot};
