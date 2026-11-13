const X=require('./lib');const Q=require('./extra');
const {W,H,C,seg,lerp,eo,eio,back,rnd,cl,E,R,P,Ln,dot,save,restore,text,stick,board,chalk,sign,bubble,impact,speed,smear,splat,confetti,zzz,grave,heart,drop,stroke,table}=X;
const g=()=>X.g;
const {bg,dodo,bernabe,nido,huevo,marinero,barco,waves,rata,cerdo,perro,macaco,paloma,arbol,cartel,vitrina,piedra,libro,fruta,palm}=Q;
const pop=(t,a,d=.35)=>back(seg(t,a,a+d));
const on=(t,a,b=1e9)=>t>=a&&t<b;
const GY=900;
const baby=(x,y,s,o={})=>dodo(x,y,s,{baby:true,...o});
function xmark(x,y,s,k){if(k<=0)return;save(x,y,back(k)*s);Ln(-60,-60,60,60,{lw:14,col:C.RED});Ln(60,-60,-60,60,{lw:14,col:C.RED});restore();}
function ground(){P([[-40,GY-20],[W+40,GY-26],[W+40,H+40],[-40,H+40]],'#6E8452',{seed:77,stroke:false});}
function wide(x,y,kx,fn){save(x,y,1);g().scale(kx,1);fn();restore();}
function card(t,S){bg('isla');const k=pop(t,.15,.5);save(W/2,420,k,-.02);R(-560,-190,1120,380,18,'#F4EEDC',{lw:4});
  text('Capítulo '+S.ch,0,-105,64,'#6E6A62','Patrick');text(S.title,0,40,S.title.length>16?96:126,C.OUT,'Gochi');restore();
  const x=lerp(-300,W+300,seg(t,0,S.D));
  baby(x,GY+60,1.6,{walk:t*10,exp:['normal','normal','normal','sweat','shock','sweat','love','chill'][S.ch-1],lips:S.ch===7});}
const SHOTS={
titulo(t,S){bg('isla');
  text('Nacer como un',W/2,230,120*pop(t,0),C.OUT,'Gochi','center',-.03,10,'#fff');
  text('DODO',W/2,430,270*pop(t,.3),'#8F8A80','Gochi','center',.02,14,C.OUT);
  if(t>1.1){save(W/2+300,620,lerp(2.4,1,eo(seg(t,1.1,1.3))),-.12);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  dodo(380,GY+40,1.7*pop(t,.6),{exp:t>1.2?'sweat':'normal'});bernabe(1560,GY+20,1.3*pop(t,.9),{});},
isla(t,S){bg('playa');
  text('Isla Mauricio',W/2,150,100*pop(t,.2),C.OUT,'Gochi','center',-.02,8,'#fff');
  cartel(W/2,260,'océano Índico',pop(t,.5),40);
  dodo(560,GY+40,1.5,{exp:'happy',walk:0});
  if(t>S.L(1)){const k=pop(t,S.L(1)+.1);save(1450,720,k);R(-170,-70,340,120,14,'#fff',{lw:4});text('único lugar',0,-14,48,C.OUT,'Patrick');text('donde puedes nacer',0,30,34,C.OUT,'Patrick');restore();}
  if(t>S.L(1)+1.8)cartel(1450,600,'exclusivo… y pequeño',pop(t,S.L(1)+1.8),34);},
huevo(t,S){bg('isla');ground();
  nido(960,GY-10,1.9);huevo(960,GY-36,1.9,{rot:Math.sin(t*6)*.04*(t>S.L(1)?1:0)});
  cartel(560,520,'nido en el suelo',pop(t,.3),42);
  X.g.save();Ln(640,560,860,GY-50,{lw:4});X.g.restore();
  if(t>S.L(1)){text('¡tú!',1380,500,90*pop(t,S.L(1)+.1),C.RED,'Gochi','center',.05,8,'#fff');Ln(1300,540,1060,GY-110,{lw:5,col:C.RED});}},
mama(t,S){bg('isla');ground();
  dodo(700,GY+30,1.9,{lips:true,exp:t>S.L(1)?'shock':'love',sit:true});
  baby(1140,GY+20,1.5,{exp:'happy',flip:true});
  if(on(t,.4,S.L(1)))heart(900,520,18);
  if(t>S.L(1)){const k=seg(t,S.L(1)+.2,S.L(1)+2.8);rata(lerp(2100,1500,eo(k)),GY+10,1.1,{flip:true});cartel(1450,520,'a la vista de todos',pop(t,S.L(1)+1.5),38);}},
primos(t,S){bg('isla');ground();
  const nm=['Aniceto','Hilario','Cipriano','Tú'],xs=[420,820,1220,1620];
  for(let i=0;i<4;i++){baby(xs[i],GY+40,1.7*pop(t,.2+i*.3),{exp:i===3?'happy':'normal',flip:i>1});cartel(xs[i],GY-250,nm[i],pop(t,.5+i*.3),38);}
  if(t>S.L(1)+1.5)text('no van a durar',W/2,200,84*pop(t,S.L(1)+1.5),C.RED,'Gochi','center',-.03,8,'#fff');},
bernabe(t,S){bg('playa');
  const k=eo(seg(t,.2,2.2));bernabe(lerp(2100,1500,k),GY+40+Math.sin(t*3)*6,1.6,{rot:(1-k)*.5});
  baby(560,GY+60,1.7,{exp:t>S.L(1)?'love':'normal'});
  if(t>S.L(1))cartel(1500,GY-300,'Bernabé',pop(t,S.L(1)),50);
  if(t>S.L(1)+1)for(let i=0;i<3;i++)Ln(1480+i*30,GY-210,1470+i*30,GY-260,{lw:3,col:'#6A8E3A'});},
tamano(t,S){bg('isla');ground();
  dodo(620,GY+40,2.3);
  save(1000,0,1);Ln(0,GY-420,0,GY+40,{lw:4,col:C.RED});Ln(-24,GY-420,24,GY-420,{lw:4,col:C.RED});Ln(-24,GY+40,24,GY+40,{lw:4,col:C.RED});restore();
  text('1 metro',1100,GY-200,80*pop(t,.3),C.OUT,'Gochi','center',-.03,8,'#fff');
  perro(1560,GY+30,.95,{flip:true});cartel(1560,GY-190,'cocker spaniel',pop(t,.7),34);
  if(t>S.L(1)){const k=seg(t,S.L(1)+.3,S.L(1)+1.6);if(k<1){dodo(620,GY+40-Math.sin(k*Math.PI)*120,2.3,{exp:'shock'});}
    if(k>=1)impact('¡PUM!',620,600,seg(t,S.L(1)+1.6,S.L(1)+2.6));}},
fruta(t,S){bg('isla');ground();arbol(1500,GY,1.7);
  for(let i=0;i<4;i++){const s0=.4+i*.8,k=seg(t,s0,s0+.9);if(k>0&&k<1)fruta(1400+i*40,lerp(380,GY,k*k),1.4,['#E8793A','#D9472B','#E9B530','#7FA34A'][i]);else if(k>=1)fruta(1000+i*70,GY+20,1.1,['#E8793A','#D9472B','#E9B530','#7FA34A'][i]);}
  dodo(620,GY+40,1.9,{mouth:Math.sin(t*10)>0,exp:'happy',walk:0});
  if(t>S.L(1))cartel(660,GY-460,'restaurante: el suelo',pop(t,S.L(1)+.2),46);},
piedras(t,S){bg('isla');ground();
  dodo(760,GY+40,2,{mouth:t<3,exp:'normal'});
  for(let i=0;i<4;i++){const k=seg(t,.5+i*.5,1.2+i*.5);if(k>0&&k<1)Q.piedra(lerp(1300,980,k),lerp(GY-100,GY-380,Math.sin(k*Math.PI)*.8+k*.2),1.5);}
  save(760,GY-170,1);E(0,0,130,100,'rgba(255,255,255,.0)',{stroke:false});restore();
  cartel(1450,GY-380,'gastrolitos',pop(t,.4),46);
  if(t>S.L(1))sign(1560,GY-260,'dentista: desempleado',34,380);},
olfato(t,S){bg('isla');ground();
  dodo(700,GY+40,2,{exp:'normal'});
  for(let i=0;i<4;i++){const k=(t*.8+i/4)%1;X.g.globalAlpha=1-k;Ln(1120+k*150,GY-460+i*18,1180+k*150,GY-460+i*18,{lw:4});X.g.globalAlpha=1;}
  fruta(1700,GY+20,1.6);
  if(t>S.L(1)){for(let i=0;i<3;i++){const k=(t*.6+i/3)%1;X.E(1000+i*60,GY-500-k*80,40+i*10,26,`rgba(120,160,80,${.6-k*.4})`,{stroke:false});}text('tu mala suerte',1200,GY-640,64*pop(t,S.L(1)+.3),C.OUT,'Gochi','center',-.03,8,'#fff');}},
gordo(t,S){bg('isla');ground();
  wide(560,GY+40,1.35,()=>dodo(0,0,1.9,{exp:'happy'}));cartel(560,GY-420,'época seca: gordo',pop(t,.3),40);
  const k=pop(t,S.L(1)+.1);if(k>0){wide(1380,GY+40,.8,()=>dodo(0,0,1.9*k,{exp:'sweat'}));cartel(1380,GY-420,'lluvias: flaco',k,40);}
  if(t>S.L(1)+1.8)sign(960,GY-640,'entrenador: 0',36,300);},
bernabe2(t,S){bg('isla');ground();
  dodo(640,GY+40,1.9,{exp:'happy',walk:0,hold(){fruta(150,-170+Math.sin(t*4)*6,1.5);}});
  bernabe(1280,GY+30,1.7,{exp:'normal'});
  if(t>S.L(1)){bubble('...',1280,GY-300,60,-1);}},
territorio(t,S){bg('isla');ground();
  const b=Math.sin(t*9);dodo(700+b*20,GY+40,1.9,{exp:'angry',mouth:true});dodo(1220-b*20,GY+40,1.9,{exp:'angry',flip:true,mouth:true});
  if(Math.floor(t*3)%2===0)impact('¡PIC!',960,520,seg(t%.66,0,.5));
  if(t>S.L(1))text('puntería: 0',960,180,70*pop(t,S.L(1)+.2),C.OUT,'Gochi','center',-.03,8,'#fff');},
cerebro(t,S){bg('isla');ground();
  dodo(700,GY+40,2.1,{exp:'normal'});
  save(1300,430,pop(t,.3));E(0,0,230,150,'#fff',{lw:4});
  dot(-220,200,10,'#fff');dot(-250,240,6,'#fff');
  Q.paloma(0,60,1.6);text('cerebro de paloma',0,-100,46,C.OUT,'Patrick');restore();
  if(t>S.L(1))cartel(1560,GY-100,'ni genio ni tonto',pop(t,S.L(1)+.2),40);},
plumas(t,S){bg('isla');ground();
  dodo(960,GY+40,2.5,{exp:'normal',tie:t>S.L(1)+1});
  cartel(560,420,'alas diminutas',pop(t,.4),40);Ln(700,440,900,GY-250,{lw:3.4});
  cartel(430,640,'moñito de cola',pop(t,.9),40);Ln(560,640,800,GY-330,{lw:3.4});
  cartel(1560,360,'gris o café oscuro',pop(t,1.4),40);Ln(1430,380,1150,GY-410,{lw:3.4});
  if(t>S.L(1)+1)cartel(1560,640,'elegante para el luto',pop(t,S.L(1)+1),38);},
primos2(t,S){bg('playa');
  barco(1620,560,.55,{t});
  const nm=['Aniceto','Hilario','Cipriano','Tú'],xs=[320,620,920,1220];
  for(let i=0;i<4;i++){baby(xs[i],GY+50,1.6,{exp:i===2?'happy':'normal',flip:i===2||i===1});cartel(xs[i],GY-240,nm[i],1,34);}
  if(t>S.L(1))bubble('¡un barco!',920,GY-330,50,-1);},
tranquilo(t,S){bg('playa');
  const sc=lerp(.2,.9,seg(t,0,S.D));barco(1500,520,sc*.9,{t});
  dodo(lerp(200,1000,seg(t,0,S.D)),GY+50,1.9,{walk:t*6,exp:'happy'});
  if(t>S.L(1)){text('camina tranquilo',W/2,160,80*pop(t,S.L(1)+.1),C.OUT,'Gochi','center',-.03,8,'#fff');}},
barco(t,S){bg('playa');waves(580,t);
  const x=lerp(2100,1100,eo(seg(t,0,3)));barco(x,520,1.1,{t});
  text('1598',560,200,150*pop(t,.3),C.RED,'Gochi','center',-.04,10,'#fff');
  if(t>S.L(1)){marinero(1600,GY+30,1.1,{flip:true});dodo(560,GY+40,1.7,{walk:t*8,exp:'happy'});bubble('¡cena!',1480,GY-380,64,1);}},
walgh(t,S){bg('playa');
  marinero(1400,GY+30,1.4,{flip:true,mean:true});
  bubble('walghvogel',1180,380,64,1);
  if(t>S.L(0)+1.5){cartel(1180,500,'= pájaro asqueroso',pop(t,S.L(0)+1.5),44);}
  dodo(560,GY+40,1.8,{exp:t>S.L(0)+1.5?'sad':'normal'});
  if(t>S.L(1)){text('(y te comen igual)',960,170,64*pop(t,S.L(1)+.2),C.RED,'Gochi','center',-.02,8,'#fff');}},
aniceto(t,S){bg('playa');
  marinero(1500,GY+30,1.4,{flip:true});
  const k=seg(t,.2,S.L(1)+.5);const gone=t>S.L(1)+.8;
  if(!gone)baby(lerp(300,1180,k),GY+50,1.7,{walk:t*8,exp:'happy'});
  else grave(1180,GY+50,'Aniceto');
  cartel(960,GY-460,'Aniceto',1,40);},
ratas(t,S){bg('playa');waves(520,t);barco(520,500,1.1,{t});
  Ln(700,GY-260,1100,GY-40,{lw:12,col:'#8A6238'});
  const items=[[rata,.9,0],[cerdo,.9,.7],[perro,.9,1.4],[(x,y,s)=>macaco(x,y,s),1.3,2.1]];
  items.forEach((it,i)=>{const k=seg(t,.4+it[2]*.9,2.4+it[2]*.9);if(k>0)it[0](lerp(760,1150+i*230,eo(k)),lerp(GY-250,GY+20,eo(k)),it[1],{});});
  if(t>S.L(1))cartel(1350,420,'huevos en el suelo = menú',pop(t,S.L(1)+.4),44);},
cerdos(t,S){bg('isla');ground();
  nido(700,GY-10,1.9);const eaten=t>S.L(1)+.6;
  if(!eaten)huevo(700,GY-36,1.9);
  const k=eo(seg(t,.3,S.L(1)));cerdo(lerp(2100,1020,k),GY+30,1.5,{flip:true,mouth:eaten});
  if(eaten){text('ñam',780,GY-190,80,C.RED,'Gochi','center',.1,8,'#fff');cartel(700,GY-330,'un huevo menos',pop(t,S.L(1)+1.2),44);}},
cipriano(t,S){bg('isla');ground();
  save(700,GY,1);P([[-12,0],[12,0],[8,-460],[-8,-460]],C.TR,{seed:5});restore();
  baby(640,GY+40,1.7,{exp:'sweat',flip:false});
  const gone=t>S.L(1)+.8;
  if(!gone)marinero(1500,GY+30,1.3,{flip:true});else grave(1200,GY+30,'Cipriano');
  if(t>S.L(1)-1&&!gone)text('árbol muy delgado',1100,300,60,C.OUT,'Gochi','center',-.03,8,'#fff');},
super(t,S){bg('isla');ground();
  save(960,0,1);dodo(0,GY+40,2.1,{exp:'chill'});restore();
  impact('SIN MIEDO',960,420,seg(t,.2,2.2),C.YEL,C.RED);
  marinero(1560,GY+30,1.1,{flip:true,mean:true});
  if(t>S.L(1)){cartel(960,GY-520,'superpoder (que apesta)',pop(t,S.L(1)+.2),50);}},
vuelo(t,S){bg('playa');
  for(let i=0;i<3;i++){const k=seg(t,.2+i*.4,3.2+i*.4);if(k>0&&k<1)Q.paloma(lerp(-200,620,eo(k)),lerp(200,360,k)+Math.sin(t*10+i)*14,1.0);}
  text('hace unos 7 millones de años',W/2,130,64*pop(t,.2),C.OUT,'Gochi','center',-.02,8,'#fff');
  if(t>S.L(1)){dodo(1300,GY+40,1.8,{exp:'happy'});for(let i=0;i<3;i++)Ln(1280,GY-190,1280+i*40,GY-290,{lw:3});cartel(1300,GY-460,'ahorrar energía',pop(t,S.L(1)+.4),46);}},
pico(t,S){bg('isla');ground();
  const k=pop(t,.2);save(660,GY+40,1);dodo(0,0,2.5*k,{exp:'happy',mouth:Math.sin(t*5)>.6});restore();
  fruta(1500,GY+20,2.6);
  if(t>S.L(1)){impact('¡CRAC!',1400,520,seg(t,S.L(1)+.2,S.L(1)+1.4));cartel(960,200,'como arma: regular',pop(t,S.L(1)),48);cartel(960,280,'como estilo: inolvidable',pop(t,S.L(1)+1.5),48);}},
nicobar(t,S){bg('isla');ground();
  Q.paloma(520+Math.sin(t*3)*10,GY-280+Math.sin(t*5)*16,2.2);cartel(520,GY-640,'paloma de Nicobar',pop(t,.3),40);
  dodo(1380,GY+40,1.9,{exp:t>S.L(1)?'sad':'normal'});cartel(1380,GY-520,'tú',pop(t,.3),44);
  if(t>S.L(1))text('gracias por nada',960,200,76*pop(t,S.L(1)+.2),C.RED,'Gochi','center',-.03,8,'#fff');},
bernabe3(t,S){bg('playa');
  const pk=Math.max(0,Math.sin(t*5));dodo(760+pk*40,GY+40,1.9,{exp:t>S.L(1)?'sweat':'happy',mouth:false});
  bernabe(1500,GY+40,1.7,{exp:'normal',rot:pk*.05});
  if(t>S.L(0)+.5)impact('pic',1260,560,seg(t%1.2,0,.6),C.YEL,C.RED);
  if(t>S.L(1))cartel(960,200,'buen amigo',pop(t,S.L(1)+.4),56);},
practica(t,S){bg('isla');ground();
  X.bush(520,GY+10,360,220,X.C.BUSH[1],4);
  dodo(520+Math.sin(t*3)*5,GY-30,1.4,{exp:'sweat'});
  const k=eo(seg(t,.2,S.L(1)));rata(lerp(2000,980,k),GY+20,1.1,{flip:true});
  if(t>S.L(1))text('las ratas aprenden más rápido',W/2,170,64*pop(t,S.L(1)+.2),C.OUT,'Gochi','center',-.02,8,'#fff');},
huevos(t,S){bg('isla');ground();
  nido(760,GY-10,1.9);huevo(760,GY-36,1.9);
  dodo(520,GY+40,1.5,{exp:'angry',mouth:true});dodo(1000,GY+40,1.5,{exp:'angry',flip:true});
  const k=eo(seg(t,.4,S.L(1)+1.4));cerdo(lerp(2200,1500,k),GY+30,1.8,{flip:true,mouth:true});
  if(t>S.L(1)+1.5){bubble('pico pequeño',1000,GY-420,50,1);}},
corre(t,S){bg('isla');ground();
  const k=seg(t,0,S.D*.7);const fall=t>S.L(1)+1;
  dodo(lerp(300,1500,k),GY+40+Math.abs(Math.sin(t*14))*-18,1.8,{walk:t*18,exp:'shock',rot:fall?.6:0});
  perro(lerp(-200,1100,k),GY+30,1.5,{mouth:true});
  if(k>0.1)speed(960,500,Math.floor(t*10));
  if(fall)impact('¡PUM!',1500,650,seg(t,S.L(1)+1,S.L(1)+2));},
vida(t,S){bg('isla');ground();
  dodo(700,GY+40,2,{sit:true,exp:'normal'});
  for(let i=0;i<4;i++)text('?',1000+i*130,GY-380-Math.sin(t*3+i)*20,110*pop(t,.3+i*.3),C.RED,'Gochi');
  save(1500,GY-220,pop(t,.5));R(-110,-130,220,260,6,'#fff',{lw:3});text('REGISTRO',0,-70,36,C.OUT,'Patrick');text('(vacío)',0,10,40,C.OUT,'Patrick');restore();},
bernabe4(t,S){bg('playa');
  const a=t*1.4;dodo(1000+Math.cos(a)*420,GY+40-Math.abs(Math.sin(a*2))*30,1.5,{walk:t*10,exp:'sweat',flip:Math.sin(a)>0});
  bernabe(1000,GY+60,1.5,{exp:'chill'});
  if(t>S.L(1))cartel(960,200,'entrenamiento cómodo (para él)',pop(t,S.L(1)+.2),48);},
cortejo(t,S){bg('isla');ground();
  const bow=Math.sin(t*4)*.12;dodo(560,GY+40,1.9,{exp:'love',rot:bow,hold(){Q.fruta(0,0,0);}});
  dodo(1380,GY+40,1.9,{flip:true,lips:true,exp:'chill'});
  for(let i=0;i<3;i++)heart(960+Math.sin(t*3+i)*50,GY-300-i*70-((t*40)%60),14+i*2);
  if(t>S.L(0)+1.2)cartel(960,170,'cartas de amor: 0',pop(t,S.L(0)+1.2),54);},
pareja(t,S){bg('isla');ground();
  nido(960,GY-10,1.8);huevo(960,GY-36,1.8);
  dodo(560,GY+40,1.8,{exp:'love'});dodo(1360,GY+40,1.8,{flip:true,lips:true,exp:'love'});
  heart(960,GY-300,24);if(t>S.L(1))cartel(960,200,'familia pequeña, muchas ganas',pop(t,S.L(1)),46);},
hilario(t,S){bg('isla');
  P([[-40,GY-20],[W+40,GY-26],[W+40,H+40],[-40,H+40]],'#7C8F5E',{seed:11,stroke:false});
  save(1500,GY-40,1);R(-150,-220,300,220,8,'#E9D9B4',{lw:4});P([[-190,-220],[0,-340],[190,-220]],'#B3563E',{lw:4});R(-40,-120,80,120,6,'#8E6034');restore();
  dodo(560,GY+40,1.6,{exp:'happy',glasses:true});dodo(900,GY+40,1.6,{lips:true,exp:'happy'});
  cartel(560,GY-380,'Hilario',pop(t,.3),42);
  if(t>S.L(1))cartel(1500,GY-480,'vista a las nubes',pop(t,S.L(1)+.2),42);},
casa(t,S){bg('isla');ground();
  nido(960,GY-10,1.9);
  if(t<S.L(0)+1.2)huevo(960,GY-36,1.9,{rot:Math.sin(t*14)*.06,crack:t>S.L(0)});else baby(960,GY-30,1.4,{exp:'happy'});
  dodo(560,GY+40,1.7,{exp:'love'});dodo(1360,GY+40,1.7,{flip:true,lips:true,exp:'love'});
  if(t>S.L(1)){const k=eo(seg(t,S.L(1)+.1,S.L(1)+3));cerdo(lerp(2400,1860,k),GY+30,.9,{flip:true});}},
vejez(t,S){bg('atardecer');ground();
  for(let i=0;i<8;i++){const gone=t>1+i*.9+(i%3)*.2;if(!gone)dodo(180+i*230,GY+40+(i%2)*40,1.1,{exp:'normal',flip:i%2===1});else if(t<2+i*.9)xmark(180+i*230,GY-120,.6,1);}
  if(t>S.L(1))text('y los barcos siguen llegando',W/2,160,72*pop(t,S.L(1)+.2),C.OUT,'Gochi','center',-.02,8,'#fff');},
ultimo(t,S){bg('noche');ground();
  dodo(960,GY+30,2.2,{exp:'sad',sit:true});
  text('1662',W/2,190,190*pop(t,.3),'#F4EFC8','Gochi','center',-.03,12,C.OUT);
  if(t>S.L(1)){text('de 1598 a 1662',W/2,360,82*pop(t,S.L(1)+.2),'#fff','Gochi','center',0,10,C.OUT);cartel(W/2,440,'menos de cien años',pop(t,S.L(1)+1),44);}},
culpa(t,S){bg('isla');ground();
  board(160,160,620,420);chalk('humanos, caza',200,260,50,seg(t,.3,1.5));chalk('ratas, cerdos, macacos',200,350,50,seg(t,1.5,3));chalk('bosques talados',200,440,50,seg(t,3,4.5));
  if(t>S.L(1)){save(1500,GY-60,1);P([[-130,0],[-60,-420],[-20,-420]],'#8E6034',{lw:4});P([[130,0],[60,-420],[20,-420]],'#8E6034',{lw:4});R(-150,-440,300,260,6,'#fff',{lw:4});wide(0,-210,1.4,()=>dodo(0,0,.7,{exp:'normal'}));restore();cartel(1500,GY-560,'gordo, torpe y tonto',pop(t,S.L(1)+.5),40);}},
verdad(t,S){bg('isla');ground();
  save(520,GY-60,1);P([[-130,0],[-60,-420],[-20,-420]],'#8E6034',{lw:4});P([[130,0],[60,-420],[20,-420]],'#8E6034',{lw:4});R(-150,-440,300,260,6,'#fff',{lw:4});wide(0,-210,1.4,()=>dodo(0,0,.7,{exp:'normal'}));restore();
  xmark(520,GY-300,2.2,seg(t,.4,.8));
  dodo(1250,GY+40,2.1,{exp:'happy'});cartel(1250,GY-520,'ágil, delgado, adaptado',pop(t,S.L(0)+.5),44);
  if(t>S.L(1))text('lo tonto fue el trato',W/2,170,76*pop(t,S.L(1)+.2),C.RED,'Gochi','center',-.02,8,'#fff');},
fama(t,S){bg('museo');
  vitrina(300,300,560,520);dodo(580,720,1.6,{exp:'normal'});cartel(580,260,'Museo de Oxford',pop(t,.3),40);
  Q.libro(1250,500,1.3,'ALICIA');
  if(t>S.L(1)){cartel(1500,300,'muerto como un dodo',pop(t,S.L(1)+.2),48);}},
cierre(t,S){bg('isla');ground();
  dodo(960,GY+40,2.5,{exp:t>S.L(1)?'happy':'sad',crown:t>S.L(1)});
  if(t>S.L(1))confetti(t-S.L(1));
  if(t>S.L(1))text('DODO',W/2,200,170*pop(t,S.L(1)+.2),'#8F8A80','Gochi','center',-.03,12,C.OUT);},
adios(t,S){bg('museo');
  vitrina(660,300,600,520);bernabe(960,790,1.6,{exp:'normal'});
  const k=pop(t,.3);save(960,845,k);R(-90,-20,180,40,4,'#fff',{lw:2.6});text('bota',0,0,30,C.OUT,'Patrick');restore();
  if(t>S.L(1))heart(1400,400,22);},
sub(t,S){bg('playa');
  text('SUSCRÍBETE',W/2,190,150*pop(t,.2),C.RED,'Gochi','center',-.03,12,'#fff');
  bernabe(560,GY+40,1.6,{exp:t>S.L(1)+1.2?'shock':'normal'});
  const k=eo(seg(t,S.L(1),S.L(1)+2.4));if(t>S.L(1)-.2)cerdo(lerp(2300,1100,k),GY+30,1.6,{flip:true,mouth:k>.9});
  if(t>S.L(1)+2.4)impact('¡ÑAM!',900,520,seg(t,S.L(1)+2.4,S.L(1)+3.4));},
};
function drawShot(id,t,S){if(id.startsWith('cap'))return card(t,S);const f=SHOTS[id];if(!f)throw new Error('falta toma '+id);f(t,S);}
module.exports={drawShot};
