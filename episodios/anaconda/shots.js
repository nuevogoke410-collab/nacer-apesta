const X=require('./lib');const Q=require('./extra');
const {W,H,C,seg,lerp,eo,eio,back,rnd,cl,E,R,P,Ln,dot,save,restore,text,capy,stick,chair,board,chalk,sign,bubble,impact,speed,smear,splat,confetti,flies,zzz,grave,heart,drop,turtle,bird,jaguar,jagHead,caimanEyes,eagle}=X;
const g=()=>X.g;
const {swamp,wfront,rainfall,anaco,ramiro,caiman,zorro,lagarto,pez,machete,bota,bulldozer,plantita,lilypad,reeds,AN,ANB,ANS,SW,SW2}=Q;
const pop=(t,a,d=.35)=>back(seg(t,a,a+d));
const on=(t,a,b=1e9)=>t>=a&&t<b;
const GY=940;
function nametag(x,y,s,k){if(k<=0)return;save(x,y,back(k));R(-s*.5-20,-26,s+40,46,8,'#fff',{lw:2.6});text(s>0&&typeof s==='number'?'':'',0,0,10);restore();}
function tag(x,y,txt,k,size=34){if(k<=0)return;g().font=`${size}px Patrick`;const w=g().measureText(txt).width+34;save(x,y,back(k));R(-w/2,-26,w,50,8,'#fff',{lw:2.6});text(txt,0,0,size,C.OUT,'Patrick');restore();}
function baby(x,y,s,o={}){anaco(x,y,s,{baby:true,len:170,w:20,...o});}
function card(t,S){swamp('dia');const k=pop(t,.15,.5);save(W/2,400,k,-.02);R(-560,-190,1120,380,18,'#F4EEDC',{lw:4});
  text('Capítulo '+S.ch,0,-105,64,ANS,'Patrick');text(S.title,0,40,S.title.length>16?96:126,C.OUT,'Gochi');restore();
  const x=lerp(-100,W+560,seg(t,0,S.D));
  anaco(x,860+Math.sin(t*4)*10,1,{t,exp:['normal','normal','normal','sweat','shock','sweat','love','chill'][S.ch-1],lips:S.ch===7});}
const SHOTS={
titulo(t,S){swamp('dia');
  text('Nacer como un',W/2,235,120*pop(t,0),C.OUT,'Gochi','center',-.03,10,'#fff');
  text('ANACONDA',W/2,430,230*pop(t,.3),AN,'Gochi','center',.02,14,C.OUT);
  if(t>1.1){save(W/2+300,610,lerp(2.4,1,eo(seg(t,1.1,1.3))),-.12);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  anaco(1500,900,1,{t,exp:t>1.2?'sweat':'normal',len:560});},
embarazo(t,S){swamp('dia');
  anaco(780,800,1.3,{t,len:430,lips:true,bulge:[.35,.8],exp:'sweat'});
  if(t>S.L(1)){const k=seg(t,S.L(1),S.L(1)+S.dur(1)*.8);for(let i=0;i<28;i++){if(k<i/28)continue;const r=Math.floor(i/7),c=i%7;const p=pop(t,S.L(1)+i/28*S.dur(1)*.8,.25);
      baby(1100+c*115+(r%2)*40,640+r*78,.5*p,{t:t*1.3+i,exp:i%5===0?'shock':'normal'});}
    text('× 40',1700,520,110*pop(t,S.L(1)+1,.4),C.RED,'Gochi','center',.05,10,'#fff');}
  wfront(1010,t);},
nace(t,S){swamp('dia');
  baby(900,780,2.6*pop(t,.2),{t,exp:t>S.L(1)?'happy':'normal'});
  if(t>S.L(0)+.6){const k=pop(t,S.L(0)+.6,.4);Ln(420,930,1400,930,{lw:5});for(let i=0;i<=7;i++)Ln(420+i*140,930,420+i*140,i%7?960:985,{lw:4});text('70 cm',1130,1000,60*k,C.RED,'Gochi');}
  if(t>S.L(1))text('¡gratis!',1500,640,80*pop(t,S.L(1),.4),C.BLUE,'Gochi','center',.08,8,C.OUT);
  wfront(1060,t);},
mama(t,S){swamp('dia');const away=t>S.L(1);
  const mx=away?lerp(1000,-700,eio(seg(t,S.L(1)+.4,S.L(1)+3.2))):1000;
  anaco(mx,820,1.7,{t,flip:true,lips:true,exp:'chill'});
  baby(1500,850,1.8,{t,exp:away?(t>S.L(1)+2?'sad':'shock'):'love'});
  if(on(t,S.L(0)+.3,S.L(0)+2.6)){heart(1380,700,16);}
  if(on(t,S.L(1)+.1,S.L(1)+2.4))bubble('Suerte.',900,640,52,1);},
hermanos(t,S){swamp('dia');
  const nm=['Casimiro','Serafín','Rufino'],xs=[460,980,1500],ys=[780,860,780];
  for(let i=0;i<3;i++){baby(xs[i],ys[i],2*pop(t,.2+i*.5),{t:t+i,exp:t>S.L(1)?'sweat':'happy',len:150});tag(xs[i]-100,ys[i]-110,nm[i],pop(t,.5+i*.5));}
  wfront(1030,t);},
ramiro(t,S){swamp('dia');
  baby(560,820,2.2,{t,exp:t<S.L(1)?'sad':'love'});
  const rx=lerp(2100,1300,eo(seg(t,S.L(0)+.4,S.L(0)+2.4)));
  ramiro(rx,800,1.6,{exp:'happy',t});
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
ojos(t,S){swamp('dia');
  const up=t>S.L(1);const y=up?lerp(870,790,eo(seg(t,S.L(1),S.L(1)+.8))):870;
  anaco(1000,y,1.5,{t,exp:up?'angry':'normal',len:500,amp:3});
  wfront(860,t);
  if(!up){const k=pop(t,.4);text('ojos',700,610,64*k,C.RED,'Gochi','center',-.1,6,'#fff');Ln(750,650,980,780,{lw:4,col:C.RED});text('nariz',1330,640,64*k,C.RED,'Gochi','center',.1,6,'#fff');Ln(1300,680,1090,800,{lw:4,col:C.RED});}},
emboscada(t,S){swamp('dia');
  const a=S.L(1)+1.2,lunge=eo(seg(t,a,a+.35)),back_=seg(t,a+1.2,a+2.5);
  const bx=lerp(2200,1350,eo(seg(t,S.L(1)-.5,S.L(1)+1.1)));
  const hx=lerp(700,1200,lunge)-lerp(0,500,back_)*0;const hy=lerp(870,770,lunge);
  if(t<a+.2){bird(bx,810,1.6,t,0,'#C9A24A');}
  anaco(hx,hy,1.5,{t:t<a?t*.2:t,exp:t>a?'angry':'normal',len:500,amp:3,mouth:t>a&&t<a+1.2});
  wfront(860+(t>a?-0:0),t);
  if(t<S.L(1))flies(1100,600,t);
  impact('¡ÑAM!',1000,420,seg(t,a+.2,a+1.4));
  if(t>a+.3&&t<a+1.8)for(let i=0;i<6;i++){const p=seg(t,a+.3,a+1.8);Ln(1250+Math.cos(i*1.3)*60*p,740-p*60+Math.sin(i*1.3)*40*p,1262+Math.cos(i*1.3)*80*p,730-p*60+Math.sin(i*1.3)*60*p,{lw:3,col:'#C9A24A'});}},
plato(t,S){swamp('dia');
  capy(1350,880,1.5,{exp:t>S.L(0)+1?'sweat':'normal',napkin:t>S.L(1)});wfront(850,t);
  anaco(lerp(500,800,eo(seg(t,0,S.L(1)))),840,1.3,{t,exp:'normal',len:480,amp:3,lips:true,
    hold:()=>{if(t>S.L(1)){Ln(70,-60,70,-10,{lw:4});Ln(60,-60,60,-40,{lw:3});Ln(80,-60,80,-40,{lw:3});Ln(100,-60,100,-10,{lw:4});P([[100,-60],[120,-60],[110,-10]],'#B7BCC0',{lw:2.4});}}});
  if(t>S.L(1))drop(1020,780+Math.sin(t*10)*4,1.2);},
mandibula(t,S){swamp('dia');const k=seg(t,S.L(1),S.L(1)+3.5);
  const cx=lerp(1800,1250,eo(seg(t,S.L(1)-.3,S.L(1)+1)));
  if(t<S.L(1)+1.4)capy(cx,820,.7,{flip:true,exp:'shock'});
  const bu=t>S.L(1)+1.3?[lerp(.9,.3,eo(seg(t,S.L(1)+1.3,S.L(1)+4)))-.12,lerp(.9,.3,eo(seg(t,S.L(1)+1.3,S.L(1)+4)))+.12]:null;
  anaco(1050,780,1.4,{t:t*.5,len:560,amp:10,mouth:t>S.L(0)+.4&&t<S.L(1)+1.5,exp:'normal',bulge:bu});
  wfront(900,t);
  if(t<S.L(1)){const kk=pop(t,S.L(0)+.5);text('no está soldada',700,520,60*kk,C.RED,'Gochi','center',-.05,6,'#fff');}
  if(on(t,S.L(1)+1.4,S.L(1)+2.4))impact('¡GLUP!',900,420,seg(t,S.L(1)+1.4,S.L(1)+2.4));},
digerir(t,S){swamp('orilla');
  const sec=t>S.L(1);
  anaco(560,880,1.4,{t:t*.3,len:520,amp:6,exp:'chill',bulge:sec?null:[.45,.62]});
  zzz(700,820,t);
  save(1450,330,1);R(-190,-130,380,260,12,'#fff',{lw:4});R(-190,-130,380,56,12,C.RED,{lw:4});
  text(sec?'3 meses después':'Día 1',0,-102,38,'#fff','Patrick');text(sec?'sin comer':'¡buffet!',0,10,70,C.OUT,'Gochi');restore();
  if(sec){save(1450,760,1);R(-110,-90,220,150,14,'#E86AA6',{lw:3.4});R(-40,-100,80,16,5,'#2A1708');text('AHORRO',0,0,44,'#fff','Patrick');restore();}},
casimiro(t,S){swamp('dia');
  const gulp=S.L(1)+1.2;
  ramiro(1620,800,1.4,{exp:t>gulp?'shock':'normal',t});
  anaco(900,830,1.5,{t,len:520,amp:5,exp:'normal',mouth:t>gulp-.8&&t<gulp+.4,bulge:t>gulp+.4?[.8-seg(t,gulp+.4,gulp+3)*.4,.95-seg(t,gulp+.4,gulp+3)*.4]:null});
  if(t<gulp)baby(lerp(1500,1150,eo(seg(t,.3,gulp))),860,1.7,{t,exp:t>S.L(1)?'sweat':'happy',flip:true});
  if(t<gulp)tag(1250,720,'Casimiro',.5+.5*Math.min(1,t));
  wfront(960,t);impact('¡GLUP!',1000,400,seg(t,gulp,gulp+1.1));},

solo(t,S){swamp('dia');
  anaco(700,830,1.4,{t,len:500,exp:'sad'});
  save(1100,330,pop(t,.3));R(-230,-110,460,220,10,'#fff',{lw:4});text('AGENDA SOCIAL',0,-60,46,C.OUT,'Patrick');text('(vacía)',0,24,70,C.RED,'Gochi');restore();
  ramiro(1580,850,1.4,{exp:'happy',t});if(t>S.L(1))bubble('...',1560,700,60,-1);},
tamano(t,S){swamp('orilla');
  const k=eio(seg(t,0,S.D*.7));
  anaco(lerp(900,1500,k),840,1.2,{t,len:820,amp:10,exp:'normal',lips:true});
  save(1650,720,1);R(-120,-240,240,340,6,'#B7BCC0',{lw:4});Ln(0,-240,0,100,{lw:4});text('ASCENSOR',0,-270,36,C.OUT,'Patrick');restore();
  if(t>S.L(0)+.6){const kk=pop(t,S.L(0)+.6);text('8 m',560,240,110*kk,C.RED,'Gochi','center',-.05,8,'#fff');}
  if(t>S.L(1)){const kk=pop(t,S.L(1));text('250 kg',960,240,110*kk,C.BLUE,'Gochi','center',.04,8,'#fff');text('No cabe',1650,520,60*pop(t,S.L(1)+.8),C.RED,'Gochi','center',.1,6,'#fff');}},
machos(t,S){swamp('dia');
  anaco(760,820,1.7,{t,len:520,lips:true,exp:'angry'});
  anaco(1620,850,.75,{t,len:380,exp:t>S.L(1)?'sweat':'normal',flip:true});
  tag(1320,640,'3 m',pop(t,.5));tag(480,560,'8 m',pop(t,.8),40);
  if(t>S.L(1))bubble('Sí, cariño.',1560,690,50,1);},
agua(t,S){swamp('dia');
  anaco(900,790,1.3,{t,len:480,exp:'normal'});flies(700,650,t,4);flies(1100,630,t+3,3);
  if(t>S.L(1)){const k=seg(t,S.L(1),S.L(1)+1.2);caimanEyes(lerp(1900,1500,eo(k)),850,1);}
  wfront(960,t);
  const kk=pop(t,.4);R(1300,170,520,150,10,'#E9D9B4',{lw:4});text('AMAZONÍA',1560,215,56*kk,C.OUT,'Patrick');text('Y ORINOCO',1560,275,56*kk,C.OUT,'Patrick');},
sol(t,S){swamp('dia');
  const sx=1560,sy=210;E(sx,sy,90,90,'#F7D774');for(let i=0;i<12;i++){const a=i/12*6.283+t*.5;Ln(sx+Math.cos(a)*115,sy+Math.sin(a)*115,sx+Math.cos(a)*160,sy+Math.sin(a)*160,{lw:6,col:'#E9B530'});}
  R(300,780,1200,60,26,'#6B4423',{lw:3.4});
  anaco(1000,770,1.1,{t:0,len:420,amp:2,exp:'chill',glasses:true});
  zzz(1100,700,t);
  if(t>S.L(1))bubble('Qué relajado te ves.',700,560,48,1);},
lengua(t,S){swamp('dia');
  anaco(1000,800,1.5,{t,len:520,amp:6,exp:'normal',tongue:true});
  for(let i=0;i<14;i++){const p=((t*.6+i/14)%1);dot(lerp(1750,1320,p)+Math.sin(i)*30,800-Math.sin(i*2)*60*(1-p),4,'#9DB4C4');}
  if(t>S.L(1)){const k=eo(seg(t,S.L(1),S.L(1)+1.2));baby(lerp(2000,1500,k),880,1.3,{t,flip:true,exp:'sweat',hat:true});tag(1560,740,'tío Armando',k,32);}
  wfront(980,t);},
lista(t,S){swamp('orilla');
  baby(300,880,1.6,{t,exp:'sweat'});
  const cast=[[()=>eagle(900,640,.9,{t,flip:true}),.5],[()=>lagarto(1100,930,1.1,{flip:true}),1.4],[()=>zorro(1400,960,1.1,{flip:true}),2.3],[()=>caiman(1700,1030,.8,{flip:true,mouth:true}),3.2]];
  cast.forEach(([f,a])=>{if(t>a){const k=pop(t,a,.4);if(k>0.02){g().save();g().globalAlpha=1;f();g().restore();}}});
  tag(600,520,'MENÚ',pop(t,.2),56);},
serafin(t,S){swamp('orilla');
  const hit=S.L(1)+.4;
  plantita(380,930,2.4);plantita(520,940,2);
  if(t<hit+.5)baby(450,930,1.6,{t,exp:t>S.L(0)?'happy':'normal'});
  if(on(t,S.L(0)+.5,hit)){const p=seg(t,S.L(0)+.5,hit);eagle(lerp(1700,520,eo(p)),lerp(120,820,eo(p)),.9,{t,flip:true});}
  if(t>hit)grave(620,GY+30,'Serafín');
  impact('¡ZAS!',900,420,seg(t,hit,hit+1.1));},
estadistica(t,S){swamp('orilla');
  board(260,120,1000,480);
  chalk('Crías marcadas: 4',320,230,64,seg(t,.3,1.6));chalk('Devoradas en un mes: 2',320,340,64,seg(t,S.L(1)-.3,S.L(1)+1.5),'#F6C5C5');
  chalk('Supervivencia: ...',320,450,58,seg(t,S.L(1)+1.8,S.L(1)+3));
  for(let i=0;i<4;i++){const dead=i<2&&t>S.L(1)+1;baby(1450+i*0,640+i*95,1.5,{t:t+i,exp:dead?'dead':'sweat',len:150});}
  if(t>S.L(1)+1){Ln(1100,600,1500,640,{lw:0});}},
caiman(t,S){swamp('dia');
  const p=seg(t,0,S.D);
  baby(lerp(500,1150,p),840,1.7,{t:t*2,exp:'sweat'});
  caiman(lerp(-100,640,p),900,1.4,{mouth:true});
  if(t>S.L(1)){const k=pop(t,S.L(1)+.2);save(1500,420,k,.1);R(-230,-70,460,130,10,'#fff',{lw:3.4});text('Mala suerte',0,-5,70,C.RED,'Gochi');restore();}
  wfront(985,t);},
jaguar(t,S){swamp('orilla');
  const hit=1.3;
  if(t<hit){const p=seg(t,0,hit);jaguar(lerp(100,800,p),GY-Math.sin(p*Math.PI)*100,1.2,{mouth:true,exp:'angry'});anaco(1500,860,1.2,{t,len:500,exp:'angry',mouth:true});}
  else{jaguar(980,980,1.2,{exp:'dead',rot:.3,mouth:false});anaco(1500,900,1.2,{t:0,len:460,amp:0,exp:'dead',rot:-.02});
    for(let i=0;i<3;i++)bird(1000+i*100+Math.cos(t*3+i)*30,500+Math.sin(t*3+i)*20,.7,t,i);}
  impact('¡ZAS!',1000,420,seg(t,hit,hit+1.2));},
humanos(t,S){swamp('orilla');
  X.stick(400,980,1.2,{sweat:false,arms:[[-40,-92],[60,-130]],hold:()=>{machete(66,-130,.8,.3);}});
  const k=pop(t,S.L(1)-.3);bota(820,990,1.6*k);text('bota de serpiente',820,730,36*k,C.OUT,'Patrick');
  anaco(1450,860,1.2,{t,len:420,exp:'sad'});
  bush_(1100,980);},
quieto(t,S){swamp('dia');
  anaco(1000,860,1.3,{t:0,len:470,amp:2,exp:t>S.L(1)?'sweat':'normal'});
  reeds(760,900,1.6);reeds(1420,900,1.5);wfront(880,t);
  const p=seg(t,.5,S.D*.8);bird(lerp(2000,-200,p),815,1.3,t,0,'#C9A24A');
  if(t>S.L(1)){const k=pop(t,S.L(1)+.3);R(260,170,560,240,10,'#fff',{lw:3.4});text('Plan A: quedarte quieto',540,235,40*k,C.OUT,'Patrick');text('Plan B: quedarte quieto',540,300,40*pop(t,S.L(1)+1),C.OUT,'Patrick');text('Plan C: ver Plan A',540,365,40*pop(t,S.L(1)+1.8),C.OUT,'Patrick');}},

veneno(t,S){swamp('orilla');
  save(560,720,pop(t,.3));E(0,0,60,70,'#9FD0EA',{lw:3.4});R(-18,-90,36,40,5,'#fff',{lw:3});text('☠'.replace('☠','VENENO'),0,10,26,C.OUT,'Patrick');Ln(-80,-80,80,80,{lw:12,col:C.RED,noJit:true});Ln(80,-80,-80,80,{lw:12,col:C.RED,noJit:true});restore();
  if(t>S.L(1)-.3){sign(1100,430,'ABRAZOS GRATIS',58);}
  anaco(1450,900,1.3,{t,len:470,exp:'happy',lips:true});
  if(t>S.L(1)+1)capy(1000,GY+40,1.2,{exp:'shock',flip:true});},
abrazo(t,S){swamp('dia');
  const br=Math.sin(t*2.6),sq=1-.15*(br>0?br:0)-.1*seg(t,0,S.D);
  capy(1000,900,1.7,{exp:t>S.D-1.5?'dead':'sweat',flip:true,napkin:false});
  const pts=[];for(let i=0;i<=40;i++){const u=i/40,a=-1.2+u*Math.PI*5.2;pts.push([Math.cos(a)*150*sq,-30-u*150+Math.sin(a)*34]);}
  anaco(1000,900,1.5,{pts,w:22,exp:'angry',lips:false});
  text(br>0?'exhala':'inhala',1500,520,80,C.RED,'Gochi','center',.06,8,'#fff');
  wfront(1000,t);},
agua2(t,S){swamp('dia');
  anaco(900,820,1.5,{t,len:480,exp:'chill'});
  g().fillStyle='rgba(79,122,99,.72)';g().fillRect(0,700,W,H);
  for(let i=0;i<10;i++){const p=((t*.4+i/10)%1);E(300+rnd(i)*1300+Math.sin(t*3+i)*12,1000-p*320,6+rnd(i+3)*9,6+rnd(i+3)*9,null,{lw:2.4,col:'#DDEFF2',noJit:true});}
  const mm=Math.floor(seg(t,0,S.D)*10);R(1450,150,360,150,12,'#222',{lw:4});text(`0:${String(mm).padStart(2,'0')}`.replace(':0',':0'),1630,225,90,'#7CFF9A','Patrick');text('minutos bajo el agua',1630,330,32,C.OUT,'Patrick');},
fuerza(t,S){swamp('orilla');
  const nap=t>S.L(1);
  const pts=[];for(let i=0;i<=30;i++){const u=i/30;pts.push(nap?[-500+u*500,Math.sin(u*5)*3]:[-420+u*400,-Math.pow(Math.max(0,u-.55)/.45,2)*320+Math.sin(u*6)*5]);}
  anaco(1050,nap?900:900,1.2,{pts,w:30,exp:nap?'chill':'angry'});
  if(!nap){const hx=1050-20,hy=900-320*1.2+20;save(hx+60,hy-90,1);Ln(-70,0,70,0,{lw:10});E(-80,0,24,40,'#555',{lw:3});E(80,0,24,40,'#555',{lw:3});restore();text('100% músculo',500,500,70*pop(t,.4),C.RED,'Gochi','center',-.05,8,'#fff');}
  else{zzz(1150,820,t);}},
ramiro2(t,S){swamp('dia');
  const s=seg(t,S.L(1),S.L(1)+4);
  ramiro(1200,780,1.7,{exp:t>S.L(1)?'shock':'happy',sink:eo(s)*70,t});
  const pts=[];for(let i=0;i<=30;i++){const u=i/30,a=-2+u*Math.PI*4.5;pts.push([Math.cos(a)*(105-u*10),-u*40+Math.sin(a)*22]);}
  anaco(1200,820+eo(s)*60,1.3,{pts,w:20,exp:'love',lips:true});
  if(t<S.L(1)+.8){heart(1000,640,18);heart(1400,610,14);}
  wfront(900+eo(s)*40,t);if(t>S.L(1)+1)for(let i=0;i<4;i++)E(1200+i*20,880-((t*80+i*40)%100),6,6,null,{lw:2.4,col:'#DDEFF2'});},

practica(t,S){swamp('dia');
  const a=S.L(0)+1.3,l=eo(seg(t,a,a+.3));const away=seg(t,a+.2,a+1.6);
  bird(1250,810-away*600,1.4,t,0,'#C9A24A');
  const hx=lerp(700,1150,l);
  anaco(hx,lerp(870,830,l)+(t>a+.35?30:0),1.4,{t:t<a?0:t,len:470,amp:3,exp:t>a+.4?'sad':'normal'});
  wfront(880,t);
  if(t>a+.5)bubble('Auch.',700,640,50,1);},
crece(t,S){swamp('dia');
  [[0,.45,'año 1',800,620],[1,.85,'año 5',860,690],[2,1.3,'año 10',920,780]].forEach(([i,s,l,y,ty])=>{const k=pop(t,.4+i*1.2);anaco(1000,y*1+ (i*0),s*k,{t:t+i,len:430,exp:'normal'});tag(260,ty,l,k,40);});
  wfront(1040,t);},
tronco(t,S){swamp('dia');
  anaco(1000,860,1.5,{t:0,len:600,amp:1,exp:'chill'});
  const p=eo(seg(t,.3,S.L(1)+1.5));turtle(lerp(400,900,p),lerp(920,800,seg(t,S.L(1)-1,S.L(1)+1.5)),1.2);
  if(t>S.L(1)+1.8)bubble('Qué descaro.',1300,640,50,-1);wfront(1030,t);},
madurez(t,S){swamp('orilla');
  for(let i=0;i<3;i++)chair(400+i*170,GY+30);
  anaco(1300,860,1.2,{t,len:420,grad:true,exp:'happy',lips:false});
  ramiro(1650,880,1.2,{wave:true,t,exp:'happy'});
  text('3-4 años',1100,330,100*pop(t,.4),AN,'Gochi','center',-.04,8,C.OUT);
  if(t>S.L(1))text('(silencio)',640,660,50,C.GRAY,'Patrick');},
diez(t,S){const z=t>S.L(1);
  if(!z){swamp('dia');anaco(1000,830,1.4,{t,len:480,exp:'normal'});text('10 años',1500,300,110*pop(t,.4),C.RED,'Gochi','center',.05,8,'#fff');wfront(1040,t);}
  else{swamp('zoo');anaco(900,860,1.3,{t,len:480,exp:'chill',crown:true,amp:6});text('30 años',1000,300,100*pop(t,S.L(1)+.2),C.BLUE,'Gochi','center',-.03,8,'#fff');}},
ramiro3(t,S){swamp('lluvia');rainfall(t);
  const sink=Math.max(0,50-seg(t,S.L(1)-.5,S.L(1)+.6)*50);
  ramiro(1300,780+0,1.6,{exp:sink>20?'shock':'happy',sink:t<S.L(1)?40:5,t});
  const pts=[];for(let i=0;i<=24;i++){const u=i/24;pts.push([-420+u*420,-Math.sin(u*Math.PI)*0+Math.sin(u*5+t*3)*8-u*u*30]);}
  anaco(1300,t<S.L(1)?900:860,1.3,{pts,w:26,exp:t<S.L(1)?'normal':'happy',rot:0});
  wfront(940,t);},

olor(t,S){swamp('dia');
  anaco(1450,830,1.6,{t,len:520,lips:true,exp:'chill',flip:true});
  for(let i=0;i<6;i++){const p=((t*.5+i/6)%1);const x=1250-p*700;Ln(x,700-Math.sin(i*2)*40,x+60,690-Math.sin(i*2)*40,{lw:4,col:'#E0379A',noJit:true});}
  for(let i=0;i<4;i++){const x=lerp(-300,200+i*190,eo(seg(t,.3+i*.2,2.2)));anaco(x,880-(i%2)*60,.8,{t:t+i,len:300,exp:'love'});}
  if(t>S.L(1)){const k=pop(t,S.L(1)+.2);save(620,520,k,-.05);R(-220,-60,440,120,12,'#fff',{lw:3.4});text('Domicilio -20%',0,0,56,C.RED,'Gochi');restore();}
  wfront(1040,t);},
bola(t,S){swamp('dia');
  const cx=960,cy=800;
  anaco(cx,cy,1.6,{pts:path24(cx*0,0,r=>1),w:34});
  for(let i=0;i<11;i++){const r=90+i*14,a0=i*.9+t*.3*(i%2?1:-1);const pts=[];for(let k=0;k<=26;k++){const a=a0+k/26*4.6;pts.push([Math.cos(a)*r*1.5,Math.sin(a)*r*.62]);}
    const m=anaco(cx,cy,1,{pts,w:15,exp:i%3===0?'love':'normal',N:26});}
  text('12 machos',1560,360,90*pop(t,.3),C.RED,'Gochi','center',.05,8,'#fff');
  if(t>S.L(1)){const k=pop(t,S.L(1));save(1560,520,k);R(-240,-50,480,100,10,'#fff',{lw:3.4});text('2 a 4 semanas',0,0,56,C.OUT,'Patrick');restore();}},
hembra(t,S){swamp('dia');
  anaco(560,830,1.7,{t,len:520,lips:true,exp:'angry'});
  const hit=t>S.L(1)+.4;
  for(let i=0;i<3;i++){const x=lerp(2100,1250+i*210,eo(seg(t,.3+i*.2,1.6)));anaco(x,i===2?900:840,.62,{t:t+i,len:300,flip:true,exp:i===2&&t>S.L(1)?'sweat':'happy'});}
  if(t<S.L(1))bubble('Tú no.',820,630,56,-1);else{bubble('Y tú, el almuerzo.',860,630,48,-1);}
  wfront(1050,t);},
crias(t,S){swamp('dia');
  anaco(760,820,1.7,{t,len:480,lips:true,exp:'sad',bulge:t<S.L(1)?[.4,.85]:null});
  if(t<S.L(1))text('7 meses',1300,330,100*pop(t,.3),C.RED,'Gochi','center',.04,8,'#fff');
  else{for(let i=0;i<24;i++){const p=eo(seg(t,S.L(1)+i*.06,S.L(1)+2.2+i*.05));const a=i*2.4;baby(1000+Math.cos(a)*lerp(60,880,p),860+Math.sin(a)*lerp(10,200,p),.45*p,{t:t+i,len:150});}
    const k=pop(t,S.L(1)+1.5);save(1550,330,k);R(-170,-120,340,240,28,'#222',{lw:4});R(-140,-90,280,150,6,'#CFE8F3',{lw:3});text('Llamadas',0,-60,38,C.OUT,'Patrick');text('0',0,10,90,C.RED,'Gochi');restore();}
  wfront(1050,t);},
rufino(t,S){swamp('orilla');
  anaco(1000,880,1.3,{t,len:440,glasses:true,hat:false,exp:'happy',flip:false});
  tag(960,700,'Rufino',pop(t,.2),38);
  anaco(1450,900,1.3,{t,len:440,lips:true,exp:'love',flip:true});
  for(let i=0;i<32;i++){const r=Math.floor(i/8),c=i%8;const p=pop(t,S.L(1)+.1+i*.05,.25);baby(150+c*135,300+r*.01+r*110,.45*p,{t:t+i,len:150});}
  text('32',1450,300,170*pop(t,S.L(1)+1.6),C.RED,'Gochi','center',.05,12,'#fff');},

vejez(t,S){swamp('atardecer');
  anaco(900,860,1.4,{t:0,len:500,amp:3,exp:'chill',glasses:true,hold:()=>{Ln(60,0,40,90,{lw:6,col:'#8A5A2B'});Ln(40,90,80,90,{lw:5,col:'#8A5A2B'});}});
  ramiro(1500,880,1.3,{exp:'sad',t});zzz(1050,780,t);
  wfront(1020,t);},
pelicula(t,S){swamp('cine');
  g().save();g().beginPath();g().rect(190,100,1540,600);g().clip();g().fillStyle='#3B2A3C';g().fillRect(190,100,1540,600);anaco(900+Math.sin(t*3)*20,520,1.15,{t,len:640,mouth:true,tongue:true,exp:'angry',amp:30});g().restore();
  text('GRAN ANACONDA ASESINA',960,170,60,'#fff','Patrick','center',0,6,'#000');
  anaco(1000,960,.7,{t,len:360,exp:'sad',amp:3,glasses:true});
  if(t>S.L(1)-.3)bubble('Yo no hice eso.',700,820,50,1);},
amenazas(t,S){swamp('orilla');
  const k=seg(t,0,S.D);
  bulldozer(lerp(1950,1150,eo(seg(t,.3,S.D*.8))),900,1.5,t);
  const pw=lerp(300,90,k);E(480,940,pw*1.6,pw*.34,SW,{lw:3});
  anaco(480,930,.7,{t,len:300,exp:'sweat',amp:3});
  sign(1560,260,'SE VENDE',60);
  if(t>S.L(1))text('sin agua, no hay anaconda',900,260,60*pop(t,S.L(1)),C.RED,'Gochi','center',-.03,8,'#fff');},
fama(t,S){swamp('dia');confetti(t);
  R(760,820,280,260,6,'#E9B530',{lw:4});text('1',900,930,150,C.OUT,'Gochi');R(480,900,280,180,6,'#C9C9C0',{lw:4});R(1040,940,260,140,6,'#B87A45',{lw:4});
  const pts=[];for(let i=0;i<=40;i++){const u=i/40,a=u*Math.PI*5;pts.push([Math.cos(a)*(90-u*18),-u*100+Math.sin(a)*22]);}
  anaco(900,820,1.3,{pts,w:20,exp:'happy',crown:true});
  ramiro(1180,930,.9,{exp:'happy',wave:true,t});
  if(t>S.L(1))text('La más pesada',900,380,90*pop(t,S.L(1)),C.RED,'Gochi','center',-.03,8,'#fff');},
cierre(t,S){swamp('dia');
  const sec=t>S.L(1);
  anaco(900,830,1.5,{t,len:500,exp:sec?'chill':'sweat'});
  wfront(990,t);
  if(!sec){save(W/2+300,520,lerp(2.4,1,eo(seg(t,.3,.5))),-.1);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  else{sign(1500,620,'NADAR: GRATIS',54);}},
adios(t,S){swamp('atardecer');
  ramiro(1500,830,1.7,{wave:true,exp:'happy',t});
  const p=seg(t,S.L(0)+.5,S.D);anaco(lerp(900,-500,eo(p)),880,1.4,{t,len:480,flip:true,exp:'happy'});
  if(t>S.L(1)+1.5){const k=pop(t,S.L(1)+1.5);jagHead(1850,720,1.2*k,{});}
  wfront(1020,t);},
sub(t,S){swamp('orilla');
  const k=pop(t,.2,.5);save(960,230,k,-.02);R(-330,-70,660,140,24,C.RED,{lw:6});text('SUSCRÍBETE',0,6,100,'#fff','Gochi');restore();
  ramiro(1450,820,1.6,{exp:t>S.L(1)+.8?'shock':'happy',t,wave:t<S.L(1)});
  const j=seg(t,S.L(1)+.2,S.L(1)+3.2);jaguar(lerp(-200,1100,eo(j)),GY-Math.sin(j*Math.PI)*60,1.2,{run:t*14,mouth:j>.7,exp:'angry'});
  baby(1000,1000,1.2,{t,exp:'sweat'});
  impact('¡ÑAM!',1150,520,seg(t,S.L(1)+3,S.L(1)+4.4));},
};
function bush_(x,y){X.bush(x,y,300,120,C.BUSH[1],5);}
function path24(){const a=[];for(let i=0;i<=40;i++){const u=i/40,an=u*Math.PI*6;a.push([Math.cos(an)*(70-u*30),-u*10+Math.sin(an)*26]);}return a;}
function drawShot(id,t,S){if(id.startsWith('cap'))return card(t,S);const f=SHOTS[id];if(!f)throw new Error('falta toma '+id);f(t,S);}
module.exports={drawShot};
