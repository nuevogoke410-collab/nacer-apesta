const X=require('./lib');const Q=require('./extra');
const {W,H,C,seg,lerp,eo,eio,back,rnd,cl,E,R,P,Ln,dot,save,restore,text,stick,chair,board,chalk,sign,bubble,impact,speed,smear,splat,confetti,flies,zzz,grave,heart,drop,turtle,bird,caimanEyes,eagle,stroke,table}=X;
const g=()=>X.g;
const {swamp,wfront,rainfall,anaco,hilario,caiman,lagarto,pez,plantita,lilypad,reeds,carbonemys,fern,AN,ANB,ANS,SW,SW2}=Q;
const pop=(t,a,d=.35)=>back(seg(t,a,a+d));
const on=(t,a,b=1e9)=>t>=a&&t<b;
const GY=940;
function tag(x,y,txt,k,size=34){if(k<=0)return;g().font=`${size}px Patrick`;const w=g().measureText(txt).width+34;save(x,y,back(k));R(-w/2,-26,w,50,8,'#fff',{lw:2.6});text(txt,0,0,size,C.OUT,'Patrick');restore();}
function baby(x,y,s,o={}){anaco(x,y,s,{baby:true,len:170,w:20,...o});}
function termo(x,y,k,s=1){save(x,y,s);R(-22,-260,44,260,22,'#fff',{lw:4});E(0,6,40,40,C.RED,{lw:4});R(-12,-250*k,24,250*k,10,C.RED,{stroke:false});
  for(let i=0;i<5;i++)Ln(26,-60-i*45,50,-60-i*45,{lw:3});restore();}
function bus(x,y,s=1){save(x,y,s);R(-300,-200,600,190,26,'#E9B530',{lw:4});for(let i=0;i<6;i++)R(-270+i*92,-170,70,64,8,'#CFE8F3',{lw:3});R(-300,-80,600,14,0,'#7A5A1A',{lw:2});E(-190,-8,44,44,'#333',{lw:4});E(190,-8,44,44,'#333',{lw:4});restore();}
function card(t,S){swamp('dia');const k=pop(t,.15,.5);save(W/2,400,k,-.02);R(-560,-190,1120,380,18,'#F4EEDC',{lw:4});
  text('Capítulo '+S.ch,0,-105,64,ANS,'Patrick');text(S.title,0,40,S.title.length>16?96:126,C.OUT,'Gochi');restore();
  const x=lerp(-100,W+560,seg(t,0,S.D));
  anaco(x,860+Math.sin(t*4)*10,1,{t,exp:['normal','normal','normal','sweat','shock','sweat','love','chill'][S.ch-1],lips:S.ch===7});}
const SHOTS={
titulo(t,S){swamp('dia');
  text('Nacer como un',W/2,235,120*pop(t,0),C.OUT,'Gochi','center',-.03,10,'#fff');
  text('TITANOBOA',W/2,430,215*pop(t,.3),AN,'Gochi','center',.02,14,C.OUT);
  if(t>1.1){save(W/2+300,610,lerp(2.4,1,eo(seg(t,1.1,1.3))),-.12);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  anaco(1500,900,1,{t,exp:t>1.2?'sweat':'normal',len:600});},
epoca(t,S){swamp('dia');
  text('hace 60 millones de años',W/2,170,84*pop(t,.2),C.OUT,'Gochi','center',-.02,8,'#fff');
  const k=pop(t,S.L(1)+.1,.5);save(1300,520,k,.04);R(-290,-170,580,300,10,'#fff',{lw:4});R(-6,130,12,170,3,'#A8743F');text('SE BUSCA',0,-110,64,C.RED,'Gochi');text('bicho gigante',0,-30,60,C.OUT,'Gochi');text('sueldo: tortugas',0,50,40,C.OUT,'Patrick');restore();
  baby(600,880,2.2,{t,exp:t>S.L(1)+.6?'happy':'normal'});wfront(1010,t);},
calor(t,S){swamp('dia');
  const sx=1560,sy=210;E(sx,sy,90,90,'#F7D774');for(let i=0;i<12;i++){const a=i/12*6.283+t*.5;Ln(sx+Math.cos(a)*115,sy+Math.sin(a)*115,sx+Math.cos(a)*160,sy+Math.sin(a)*160,{lw:6,col:'#E9B530'});}
  termo(380,620,eo(seg(t,.2,2.2)),1.5);text('30 °C+',380,260,90*pop(t,.6),C.RED,'Gochi','center',-.05,8,'#fff');
  baby(1000,830,2,{t,exp:'sweat'});flies(1300,640,t,3);
  for(let i=0;i<4;i++){const p=((t*.5+i/4)%1);stroke([[1000+i*70-100,700-p*120],[1010+i*70-100,680-p*120],[1000+i*70-100,660-p*120]],{lw:3,col:'#B8C8CC',noJit:true});}
  wfront(1010,t);},
tamano0(t,S){swamp('dia');
  baby(560,850,2.2,{t,exp:t>S.L(1)?'happy':'sweat'});
  const k=pop(t,.3);save(1300,430,k,-.03);R(-330,-210,660,420,12,'#F4EEDC',{lw:4});text('CERTIFICADO DE NACIMIENTO',0,-150,36,C.OUT,'Patrick');
  text('Medida:',-120,-60,50,C.OUT,'Patrick');if(t>S.L(1)-.4)text('más o menos',70,50,80*pop(t,S.L(1)-.4),C.RED,'Gochi','center',-.04);
  Ln(-250,130,250,130,{lw:3});restore();
  if(t>S.L(0)+1.2)text('?',900,440,230*pop(t,S.L(0)+1.2),C.RED,'Gochi','center',.1,12,'#fff');wfront(1030,t);},
mama(t,S){swamp('dia');const away=t>S.L(1);
  const mx=away?lerp(1000,-800,eio(seg(t,S.L(1)+.4,S.L(1)+3.2))):1000;
  anaco(mx,820,1.7,{t,flip:true,lips:true,exp:'chill',len:520});
  baby(1500,850,1.8,{t,exp:away?(t>S.L(1)+2?'sad':'shock'):'love'});
  if(on(t,S.L(0)+.3,S.L(0)+2.6))heart(1380,700,16);
  if(on(t,S.L(1)+.1,S.L(1)+2.4))bubble('Suerte.',900,640,52,1);},
hermanos(t,S){swamp('dia');
  const nm=['Anselmo','Baldomero','Teodoro'],xs=[460,980,1500],ys=[780,860,780];
  for(let i=0;i<3;i++){baby(xs[i],ys[i],2*pop(t,.2+i*.5),{t:t+i,exp:t>S.L(1)?'sweat':'happy',len:150});tag(xs[i]-100,ys[i]-110,nm[i],pop(t,.5+i*.5));}
  wfront(1030,t);},
hilario(t,S){swamp('dia');
  baby(560,820,2.2,{t,exp:t<S.L(1)?'sad':'love'});
  const rx=lerp(2100,1300,eo(seg(t,S.L(0)+.4,S.L(0)+2.4)));
  hilario(rx,800,1.6,{exp:'happy',t});
  if(t>S.L(1)){heart(900,650,18);heart(1000,610,14);}},
piel(t,S){swamp('dia');
  const k=seg(t,0,S.D);
  if(t>S.L(0)+.8){anaco(lerp(900,330,eo(seg(t,S.L(0)+.8,S.L(1)+2))),780,lerp(1.5,1.4,k),{t,col:'#EEE6CC',len:300,exp:'dead',rot:-.15});}
  baby(1300,860,lerp(1.5,2.6,eo(k)),{t,exp:t>S.L(0)+1?'happy':'sweat'});
  wfront(1050,t);},

carnivoro(t,S){swamp('orilla');
  const k=pop(t,.3);save(560,780,k);E(0,0,130,26,'#fff',{lw:3});E(0,-14,100,20,'#6FA04E');Ln(-60,-12,60,-12,{lw:2});text('ENSALADA',0,-70,44,C.OUT,'Patrick');
  if(t>.8){Ln(-100,-120,100,40,{lw:12,col:C.RED,noJit:true});Ln(100,-120,-100,40,{lw:12,col:C.RED,noJit:true});}restore();
  if(t>S.L(1)){const p=seg(t,S.L(1),S.L(1)+3);pez(lerp(2000,1500,p),840+Math.sin(t*6)*18,1.3,{flip:true});baby(lerp(1000,1380,eo(p)),840,2.2,{t,exp:'angry',mouth:p>.6});}
  else baby(1100,850,2.2,{t,exp:'sad'});},
emboscada(t,S){swamp('dia');
  const a=S.L(1)+1.2,lunge=eo(seg(t,a,a+.35));
  const bx=lerp(2200,1350,eo(seg(t,S.L(1)-.5,S.L(1)+1.1)));
  const hx=lerp(700,1200,lunge);const hy=lerp(870,770,lunge);
  if(t<a+.2)pez(bx,800+Math.sin(t*5)*10,1.6,{flip:true});
  anaco(hx,hy,1.5,{t:t<a?t*.2:t,exp:t>a?'angry':'normal',len:500,amp:3,mouth:t>a&&t<a+1.2});
  wfront(860,t);
  if(t<S.L(1))flies(1100,600,t);
  impact('¡ÑAM!',1000,420,seg(t,a+.2,a+1.4));},
plato(t,S){swamp('dia');
  const tt=pop(t,.2,.5);carbonemys(1450,900,1.2*tt,{flip:true,exp:t>S.L(0)+1?'sweat':'normal'});
  if(t>S.L(1)){const k=pop(t,S.L(1),.4);table(880,830,520);R(1000,785,70,46,6,'#fff',{lw:2.6});tag(1140,720,'mesa de comedor',k,36);}
  wfront(960,t);
  anaco(lerp(400,640,eo(seg(t,0,S.L(1)))),840,1.3,{t,exp:'normal',len:480,amp:3,lips:true,
    hold:()=>{if(t>S.L(1)){Ln(70,-60,70,-10,{lw:4});Ln(60,-60,60,-40,{lw:3});Ln(80,-60,80,-40,{lw:3});Ln(100,-60,100,-10,{lw:4});P([[100,-60],[120,-60],[110,-10]],'#B7BCC0',{lw:2.4});}}});
  if(t>S.L(1))drop(820,780+Math.sin(t*10)*4,1.2);},
tortuga(t,S){swamp('dia');
  carbonemys(1350,900,1.5,{flip:true,crack:true,exp:'normal'});
  if(t>.8){const k=pop(t,.8);save(1220,720,k,-.3);R(-50,-16,100,32,8,'#F2C9A0',{lw:3});Ln(-14,-16,-14,16,{lw:2,col:'#C98'});Ln(14,-16,14,16,{lw:2,col:'#C98'});restore();}
  anaco(560,860,1.4,{t,len:420,exp:'sad',amp:3});
  if(t>S.L(1))bubble('Casi.',1500,560,52,-1);wfront(990,t);},
cocodrilo(t,S){swamp('dia');
  const k=pop(t,.3);caiman(1450,930,1.7,{mouth:false,flip:true});
  tag(1450,730,'el vecino: 4 m',k,38);
  save(900,990,1);R(-130,-26,260,46,6,'#B58A5A',{lw:3});text('BIENVENIDOS',0,-3,34,C.OUT,'Patrick');restore();
  anaco(lerp(300,700,eo(seg(t,0,S.L(1)))),850,1.3,{t,len:460,amp:3,exp:t>S.L(1)?'happy':'normal',mouth:t>S.L(1)});
  if(t>S.L(1)+.6)bubble('Usted primero.',1500,540,46,-1);wfront(1000,t);},
mandibula(t,S){swamp('dia');const k=seg(t,S.L(1),S.L(1)+3.5);
  const cx=lerp(1800,1250,eo(seg(t,S.L(1)-.3,S.L(1)+1)));
  if(t<S.L(1)+1.4)caiman(cx,880,.7,{flip:true});
  const bu=t>S.L(1)+1.3?[lerp(.9,.3,eo(seg(t,S.L(1)+1.3,S.L(1)+4)))-.12,lerp(.9,.3,eo(seg(t,S.L(1)+1.3,S.L(1)+4)))+.12]:null;
  anaco(1050,780,1.4,{t:t*.5,len:560,amp:10,mouth:t>S.L(0)+.4&&t<S.L(1)+1.5,exp:'normal',bulge:bu});
  wfront(900,t);
  if(t<S.L(1)){const kk=pop(t,S.L(0)+.5);text('se estiran',700,520,64*kk,C.RED,'Gochi','center',-.05,6,'#fff');}
  if(on(t,S.L(1)+1.4,S.L(1)+2.4))impact('¡GLUP!',900,420,seg(t,S.L(1)+1.4,S.L(1)+2.4));},
digerir(t,S){swamp('orilla');
  const sec=t>S.L(1);
  anaco(560,880,1.4,{t:t*.3,len:520,amp:6,exp:'chill',bulge:sec?null:[.45,.62]});
  zzz(700,820,t);
  save(1450,330,1);R(-190,-130,380,260,12,'#fff',{lw:4});R(-190,-130,380,56,12,C.RED,{lw:4});
  text(sec?'3 a 4 veces al año':'Día 1',0,-102,34,'#fff','Patrick');text(sec?'y nada más':'¡buffet!',0,10,70,C.OUT,'Gochi');restore();
  if(sec){save(1450,760,1);R(-110,-90,220,150,14,'#E86AA6',{lw:3.4});R(-40,-100,80,16,5,'#2A1708');text('AHORRO',0,0,44,'#fff','Patrick');restore();}},
anselmo(t,S){swamp('dia');
  const gulp=S.L(1)+1.2;
  hilario(1620,800,1.4,{exp:t>gulp?'shock':'normal',t});
  anaco(900,830,1.5,{t,len:520,amp:5,exp:'normal',mouth:t>gulp-.8&&t<gulp+.4,bulge:t>gulp+.4?[.8-seg(t,gulp+.4,gulp+3)*.4,.95-seg(t,gulp+.4,gulp+3)*.4]:null});
  if(t<gulp)baby(lerp(1500,1150,eo(seg(t,.3,gulp))),860,1.7,{t,exp:t>S.L(1)?'sweat':'happy',flip:true});
  if(t<gulp)tag(1250,720,'Anselmo',.5+.5*Math.min(1,t));
  wfront(960,t);impact('¡GLUP!',1000,400,seg(t,gulp,gulp+1.1));},

solo(t,S){swamp('dia');
  anaco(700,830,1.4,{t,len:500,exp:'sad'});
  save(1100,330,pop(t,.3));R(-230,-110,460,220,10,'#fff',{lw:4});text('AGENDA SOCIAL',0,-60,46,C.OUT,'Patrick');text('(vacía)',0,24,70,C.RED,'Gochi');restore();
  hilario(1580,850,1.4,{exp:'happy',t});if(t>S.L(1))bubble('...',1560,700,60,-1);},
tamano(t,S){swamp('orilla');
  const k=eio(seg(t,0,S.D*.6));
  bus(lerp(2300,1500,k),960,.7);
  anaco(lerp(1000,900,k),780,1.15,{t,len:900,amp:10,exp:'normal',lips:true});
  if(t>S.L(0)+.6){const kk=pop(t,S.L(0)+.6);text('13 m',560,220,110*kk,C.RED,'Gochi','center',-.05,8,'#fff');}
  if(t>S.L(1)){const kk=pop(t,S.L(1));text('1 tonelada',1100,200,90*kk,C.BLUE,'Gochi','center',.04,8,'#fff');text('autobús',1500,740,44*pop(t,S.L(1)+.8),C.OUT,'Patrick','center',0,6,'#fff');}},
anaconda(t,S){swamp('dia');
  anaco(760,780,1.1,{t,len:900,amp:8,exp:'normal',lips:true});
  anaco(1450,930,.9,{t,len:380,amp:6,col:'#6E8030',flip:true,exp:'normal'});
  tag(1500,780,'anaconda: 6,5 m',pop(t,.5),34);tag(600,560,'tú: 13 m',pop(t,S.L(1)),44);
  if(t>S.L(1)+1.8)bubble('Encantado, pequeña.',700,330,50,1);wfront(1040,t);},
agua(t,S){swamp('dia');
  anaco(900,790,1.3,{t,len:480,exp:'normal'});flies(700,650,t,4);flies(1100,630,t+3,3);
  if(t>S.L(1)){const k=seg(t,S.L(1),S.L(1)+1.2);caimanEyes(lerp(1900,1500,k),850,1);}
  wfront(960,t);
  const kk=pop(t,.4);R(1230,170,600,150,10,'#E9D9B4',{lw:4});text('SELVA TROPICAL',1530,215,52*kk,C.OUT,'Patrick');text('MÁS ANTIGUA',1530,275,52*kk,C.OUT,'Patrick');},
sangre(t,S){swamp('dia');
  const sx=1560,sy=210;E(sx,sy,90,90,'#F7D774');for(let i=0;i<12;i++){const a=i/12*6.283+t*.5;Ln(sx+Math.cos(a)*115,sy+Math.sin(a)*115,sx+Math.cos(a)*160,sy+Math.sin(a)*160,{lw:6,col:'#E9B530'});}
  R(300,780,1200,60,26,'#6B4423',{lw:3.4});
  anaco(1000,770,1.1,{t:0,len:420,amp:2,exp:'chill',glasses:true});zzz(1100,700,t);
  termo(260,760,eo(seg(t,.2,2)),1.3);if(t>S.L(1))text('gigante',700,480,100*pop(t,S.L(1)),C.RED,'Gochi','center',-.04,8,'#fff');},
lengua(t,S){swamp('dia');
  anaco(1000,800,1.5,{t,len:520,amp:6,exp:'normal',tongue:true});
  for(let i=0;i<14;i++){const p=((t*.6+i/14)%1);dot(lerp(1750,1320,p)+Math.sin(i)*30,800-Math.sin(i*2)*60*(1-p),4,'#9DB4C4');}
  if(t>S.L(1)){const k=eo(seg(t,S.L(1),S.L(1)+1.2));baby(lerp(2000,1500,k),880,1.3,{t,flip:true,exp:'sweat',hat:true});tag(1560,740,'tío Armando',k,32);}
  wfront(980,t);},

lista(t,S){swamp('orilla');
  baby(300,880,1.6,{t,exp:'sweat'});
  const cast=[[()=>eagle(900,640,.9,{t,flip:true}),.5],[()=>lagarto(1250,930,1.1,{flip:true}),1.6],[()=>caiman(1650,1030,.9,{flip:true,mouth:true}),2.8]];
  cast.forEach(([f,a])=>{if(t>a){const k=pop(t,a,.4);if(k>0.02)f();}});
  tag(700,470,'SOSPECHOSOS',pop(t,.2),52);},
baldomero(t,S){swamp('orilla');
  const hit=S.L(1)+.4;
  plantita(380,930,2.4);plantita(520,940,2);
  if(t<hit+.5)baby(450,930,1.6,{t,exp:t>S.L(0)?'happy':'normal'});
  if(on(t,S.L(0)+.5,hit)){const p=seg(t,S.L(0)+.5,hit);caiman(lerp(1900,560,eo(p)),1010,1.1,{flip:true,mouth:p>.8});}
  if(t>hit)grave(620,GY+30,'Baldomero');
  impact('¡ZAS!',900,420,seg(t,hit,hit+1.1));},
estadistica(t,S){swamp('orilla');
  board(260,120,1000,480);
  chalk('Fósiles de titanoboa: ~30',320,230,60,seg(t,.3,1.6));chalk('Casi todos adultos',320,340,60,seg(t,S.L(1)-.3,S.L(1)+1.5),'#F6C5C5');
  chalk('Bebés: ...',320,450,58,seg(t,S.L(1)+1.8,S.L(1)+3));
  for(let i=0;i<3;i++)anaco(1650,620+i*120,.55,{t:t+i,len:380,amp:3,flip:true});
  baby(1550,1000,1.3,{t,exp:'sweat'});text('?',1750,980,120*pop(t,S.L(1)+1),C.RED,'Gochi');},
adulto(t,S){swamp('dia');
  anaco(960,800,1.6,{t,len:700,amp:6,exp:'chill',glasses:true,lips:false});
  const p=seg(t,.3,S.D*.7);
  caiman(lerp(300,-500,eo(p)),950,.9,{});caiman(lerp(1700,2500,eo(p)),990,.9,{flip:true});
  if(t>S.L(1))text('¡Qué carrera!',960,260,90*pop(t,S.L(1)),C.RED,'Gochi','center',-.03,8,'#fff');wfront(1040,t);},
humanos(t,S){swamp('dia');
  const k=pop(t,.3);save(900,330,k);R(-330,-110,660,220,12,'#fff',{lw:4});text('faltan',0,-60,44,C.OUT,'Patrick');text('58.000.000 años',0,20,86,C.RED,'Gochi');restore();
  anaco(560,860,1.3,{t,len:430,exp:'happy'});
  const j=pop(t,S.L(1)-.2);save(1450,800,j);R(-70,-70,140,100,12,'#B58A5A',{lw:3.4});stroke([[-40,-70],[-40,-110],[40,-110],[40,-70]],{lw:6});Ln(-100,-110,100,40,{lw:12,col:C.RED,noJit:true});Ln(100,-110,-100,40,{lw:12,col:C.RED,noJit:true});restore();
  wfront(1010,t);},
quieto(t,S){swamp('dia');
  anaco(1000,860,1.3,{t:0,len:470,amp:2,exp:t>S.L(1)?'sweat':'normal'});
  reeds(760,900,1.6);reeds(1420,900,1.5);wfront(880,t);
  const p=seg(t,.5,S.D*.8);lagarto(lerp(2000,-200,p),960,1,{flip:true});
  if(t>S.L(1)){const k=pop(t,S.L(1)+.3);R(260,170,560,240,10,'#fff',{lw:3.4});text('Plan A: quedarte quieto',540,235,40*k,C.OUT,'Patrick');text('Plan B: quedarte quieto',540,300,40*pop(t,S.L(1)+1),C.OUT,'Patrick');text('Plan C: ver Plan A',540,365,40*pop(t,S.L(1)+1.8),C.OUT,'Patrick');}},

super(t,S){swamp('orilla');
  save(560,720,pop(t,.3));E(0,0,60,70,'#9FD0EA',{lw:3.4});R(-18,-90,36,40,5,'#fff',{lw:3});text('VENENO',0,10,26,C.OUT,'Patrick');Ln(-80,-80,80,80,{lw:12,col:C.RED,noJit:true});Ln(80,-80,-80,80,{lw:12,col:C.RED,noJit:true});restore();
  if(t>S.L(1)-.3)sign(1100,430,'TALLA: XXL',64);
  anaco(1450,900,1.1,{t,len:600,exp:'happy',lips:true});},
abrazo(t,S){swamp('dia');
  const br=Math.sin(t*2.6),sq=1-.15*(br>0?br:0)-.1*seg(t,0,S.D);
  carbonemys(900,930,1.4,{flip:false,exp:t>S.D-1.5?'dead':'sweat'});
  const pts=[];for(let i=0;i<=40;i++){const u=i/40,a=-1.2+u*Math.PI*5.2;pts.push([-20+Math.cos(a)*110*sq,-30-u*70+Math.sin(a)*24]);}
  anaco(900,930,1.5,{pts,w:14,exp:'angry'});
  text(br>0?'exhala':'inhala',1500,520,80,C.RED,'Gochi','center',.06,8,'#fff');
  wfront(1010,t);},
fuerza(t,S){swamp('orilla');
  const nap=t>S.L(1);
  const pts=[];for(let i=0;i<=30;i++){const u=i/30;pts.push(nap?[-500+u*500,Math.sin(u*5)*3]:[-420+u*400,-Math.pow(Math.max(0,u-.55)/.45,2)*320+Math.sin(u*6)*5]);}
  anaco(1050,900,1.2,{pts,w:30,exp:nap?'chill':'angry'});
  if(!nap){const hx=1050-20,hy=900-320*1.2+20;save(hx+60,hy-90,1);Ln(-70,0,70,0,{lw:10});E(-80,0,24,40,'#555',{lw:3});E(80,0,24,40,'#555',{lw:3});restore();text('100% músculo',500,500,70*pop(t,.4),C.RED,'Gochi','center',-.05,8,'#fff');}
  else zzz(1150,820,t);},
hilario2(t,S){swamp('dia');
  const s=seg(t,S.L(1),S.L(1)+4);
  hilario(1200,780,1.7,{exp:t>S.L(1)?'shock':'happy',sink:eo(s)*70,t});
  const pts=[];for(let i=0;i<=30;i++){const u=i/30,a=-2+u*Math.PI*4.5;pts.push([Math.cos(a)*(105-u*10),-u*40+Math.sin(a)*22]);}
  anaco(1200,820+eo(s)*60,1.3,{pts,w:20,exp:'love',lips:true});
  if(t<S.L(1)+.8){heart(1000,640,18);heart(1400,610,14);}
  wfront(900+eo(s)*40,t);if(t>S.L(1)+1)for(let i=0;i<4;i++)E(1200+i*20,880-((t*80+i*40)%100),6,6,null,{lw:2.4,col:'#DDEFF2'});},

practica(t,S){swamp('dia');
  const a=S.L(0)+1.3,l=eo(seg(t,a,a+.3));const away=seg(t,a+.2,a+1.6);
  pez(1250+away*700,810-away*200,1.4,{flip:false});
  const hx=lerp(700,1150,l);
  anaco(hx,lerp(870,830,l)+(t>a+.35?30:0),1.4,{t:t<a?0:t,len:470,amp:3,exp:t>a+.4?'sad':'normal'});
  wfront(880,t);
  if(t>a+.5)bubble('Auch.',700,640,50,1);},
crece(t,S){swamp('dia');
  [[0,.45,'año 1',800,620],[1,.85,'año 5',860,690],[2,1.3,'año 10',920,780]].forEach(([i,s,l,y,ty])=>{const k=pop(t,.4+i*1.2);anaco(1000,y,s*k,{t:t+i,len:430,exp:'normal'});tag(260,ty,l,k,40);});
  wfront(1040,t);},
tronco(t,S){swamp('dia');
  anaco(1000,860,1.5,{t:0,len:600,amp:1,exp:'chill'});
  const p=eo(seg(t,.3,S.L(1)+1.5));turtle(lerp(400,900,p),lerp(920,800,seg(t,S.L(1)-1,S.L(1)+1.5)),1.2);
  if(t>S.L(1)+1.8)bubble('Qué descaro.',1300,640,50,-1);wfront(1030,t);},
madurez(t,S){swamp('orilla');
  for(let i=0;i<3;i++)chair(400+i*170,GY+30);
  anaco(1300,860,1.2,{t,len:420,grad:true,exp:'happy'});
  hilario(1650,880,1.2,{wave:true,t,exp:'happy'});
  text('¿? años',1100,330,100*pop(t,.4),AN,'Gochi','center',-.04,8,C.OUT);
  if(t>S.L(1))text('(silencio)',640,660,50,C.GRAY,'Patrick');},
hilario3(t,S){swamp('lluvia');rainfall(t);
  hilario(1300,780,1.6,{exp:t<S.L(1)?'shock':'happy',sink:t<S.L(1)?40:5,t});
  const pts=[];for(let i=0;i<=24;i++){const u=i/24;pts.push([-420+u*420,Math.sin(u*5+t*3)*8-u*u*30]);}
  anaco(1300,t<S.L(1)?900:860,1.3,{pts,w:26,exp:t<S.L(1)?'normal':'happy'});
  wfront(940,t);},

olor(t,S){swamp('dia');
  anaco(1450,830,1.6,{t,len:520,lips:true,exp:'chill',flip:true});
  for(let i=0;i<6;i++){const p=((t*.5+i/6)%1);const x=1250-p*700;Ln(x,700-Math.sin(i*2)*40,x+60,690-Math.sin(i*2)*40,{lw:4,col:'#E0379A',noJit:true});}
  for(let i=0;i<3;i++){const x=lerp(-300,200+i*210,eo(seg(t,.3+i*.2,2.2)));anaco(x,880-(i%2)*60,.8,{t:t+i,len:300,exp:'love'});}
  if(t>S.L(1)){const k=pop(t,S.L(1)+.2);save(620,520,k,-.05);R(-220,-60,440,120,12,'#fff',{lw:3.4});text('Sin cartas',0,0,64,C.RED,'Gochi');restore();}
  wfront(1040,t);},
crias(t,S){swamp('dia');
  anaco(700,820,1.7,{t,len:480,lips:true,exp:'sad'});
  if(t<S.L(1)){save(1400,420,pop(t,.3));E(0,0,110,140,'#fff',{lw:4});text('huevos',0,0,52,C.OUT,'Patrick');Ln(-130,-150,130,150,{lw:12,col:C.RED,noJit:true});Ln(130,-150,-130,150,{lw:12,col:C.RED,noJit:true});restore();}
  else{for(let i=0;i<24;i++){const p=eo(seg(t,S.L(1)+i*.06,S.L(1)+2.2+i*.05));const a=i*2.4;baby(1000+Math.cos(a)*lerp(60,880,p),860+Math.sin(a)*lerp(10,200,p),.45*p,{t:t+i,len:150});}
    const k=pop(t,S.L(1)+1.5);save(1550,330,k);R(-170,-120,340,240,28,'#222',{lw:4});R(-140,-90,280,150,6,'#CFE8F3',{lw:3});text('Llamadas',0,-60,38,C.OUT,'Patrick');text('0',0,10,90,C.RED,'Gochi');restore();}
  wfront(1050,t);},
teodoro(t,S){swamp('orilla');
  anaco(1000,880,1.3,{t,len:440,glasses:true,exp:'happy'});
  tag(960,700,'Teodoro',pop(t,.2),38);
  anaco(1450,900,1.3,{t,len:440,lips:true,exp:'love',flip:true});
  for(let i=0;i<40;i++){const r=Math.floor(i/10),c=i%10;const p=pop(t,S.L(1)+.1+i*.05,.25);baby(150+c*110,260+r*95,.4*p,{t:t+i,len:150});}
  text('40',1450,300,170*pop(t,S.L(1)+1.6),C.RED,'Gochi','center',.05,12,'#fff');},

vejez(t,S){swamp('atardecer');
  anaco(900,860,1.4,{t:0,len:500,amp:3,exp:'chill',glasses:true,hold:()=>{Ln(60,0,40,90,{lw:6,col:'#8A5A2B'});Ln(40,90,80,90,{lw:5,col:'#8A5A2B'});}});
  hilario(1500,880,1.3,{exp:'sad',t});zzz(1050,780,t);
  wfront(1020,t);},
extincion(t,S){swamp('lluvia');
  const k=seg(t,0,S.D*.8);
  termo(300,780,1-.65*eo(k),1.5);text(Math.round(lerp(34,20,eo(k)))+' °C',300,300,80,C.BLUE,'Gochi','center',-.04,8,'#fff');
  const pw=lerp(300,70,k);E(1000,940,pw*2,pw*.3,SW,{lw:3});
  anaco(1000,925,.9,{t,len:360,exp:'sweat',amp:3});
  if(t>S.L(1))text('sin calor, no hay gigantes',960,200,62*pop(t,S.L(1)),C.RED,'Gochi','center',-.03,8,'#fff');
  if(t>.5)text('brrr',1500,640,70*(.5+.5*Math.sin(t*20)),C.BLUE,'Gochi','center',.1,6,'#fff');},
mina(t,S){const L1=t>S.L(1);
  if(!L1){swamp('mina');
    for(let i=0;i<9;i++){const x=300+i*150;E(x,760+Math.sin(i)*10,50,34,'#E8DDC2',{lw:3.4});R(x-18,745,36,30,10,'#E8DDC2',{lw:3});E(x,726,16,12,'#E8DDC2',{lw:3});}
    stick(1600,950,1.3,{arms:[[-40,-92],[70,-150]],hold:()=>{Ln(70,-150,110,-210,{lw:8,col:'#6B4423'});P([[84,-230],[150,-200],[116,-190]],'#9A9A92',{lw:3});}});
    text('2009',800,260,140*pop(t,S.L(0)+.5),C.RED,'Gochi','center',-.03,10,'#fff');}
  else{swamp('museo');
    const k=pop(t,S.L(1)+.2,.5);
    anaco(960,860,1.2*k,{t:0,len:700,amp:20,exp:'chill',glasses:true});
    tag(960,300,'MODELO A TAMAÑO REAL',k,44);confetti(t);}
},
fama(t,S){swamp('dia');confetti(t);
  R(760,820,280,260,6,'#E9B530',{lw:4});text('1',900,930,150,C.OUT,'Gochi');R(480,900,280,180,6,'#C9C9C0',{lw:4});R(1040,940,260,140,6,'#B87A45',{lw:4});
  const pts=[];for(let i=0;i<=40;i++){const u=i/40,a=u*Math.PI*5;pts.push([Math.cos(a)*(90-u*18),-u*100+Math.sin(a)*22]);}
  anaco(900,820,1.3,{pts,w:20,exp:'happy',crown:true});
  hilario(1180,930,.9,{exp:'happy',wave:true,t});
  if(t>S.L(1))text('La más grande',900,380,90*pop(t,S.L(1)),C.RED,'Gochi','center',-.03,8,'#fff');},
cierre(t,S){swamp('dia');
  const sec=t>S.L(1);
  anaco(900,830,1.5,{t,len:560,exp:sec?'chill':'sweat'});
  wfront(990,t);
  if(!sec){save(W/2+300,520,lerp(2.4,1,eo(seg(t,.3,.5))),-.1);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  else{sign(1500,620,'TALLA: ENORME',54);}},
adios(t,S){swamp('atardecer');
  hilario(1500,830,1.7,{wave:true,exp:'happy',t});
  const p=seg(t,S.L(0)+.5,S.D);anaco(lerp(900,-500,eo(p)),880,1.4,{t,len:480,flip:true,exp:'happy'});
  if(t>S.L(1)+1.5){const k=pop(t,S.L(1)+1.5);caimanEyes(1700,850,1.3*k);}
  wfront(1020,t);},
sub(t,S){swamp('orilla');
  const k=pop(t,.2,.5);save(960,230,k,-.02);R(-330,-70,660,140,24,C.RED,{lw:6});text('SUSCRÍBETE',0,6,100,'#fff','Gochi');restore();
  hilario(1450,820,1.6,{exp:t>S.L(1)+.8?'shock':'happy',t,wave:t<S.L(1)});
  const j=seg(t,S.L(1)+.2,S.L(1)+3.2);caiman(lerp(-300,1050,eo(j)),GY+60-Math.sin(j*Math.PI)*60,1.3,{mouth:j>.7});
  baby(1000,1010,1.2,{t,exp:'sweat'});
  impact('¡ÑAM!',1150,520,seg(t,S.L(1)+3,S.L(1)+4.4));},
};
function drawShot(id,t,S){if(id.startsWith('cap'))return card(t,S);const f=SHOTS[id];if(!f)throw new Error('falta toma '+id);f(t,S);}
module.exports={drawShot};
