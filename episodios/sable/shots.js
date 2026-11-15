const X=require('./lib');const Q=require('./extra');
const {W,H,C,seg,lerp,eo,eio,back,rnd,cl,E,R,P,Ln,dot,save,restore,text,board,chalk,sign,bubble,impact,speed,smear,splat,confetti,grave,heart,drop,stroke,table}=X;
const g=()=>X.g;
const {bg,smilo,cono,lobo,leon,bisonte,camello,perezoso,mamut,hueso,craneo,cartel,vitrina,huella,ground,nieve,above,copo,SY,SYD,TAR}=Q;
const pop=(t,a,d=.35)=>back(seg(t,a,a+d));
const on=(t,a,b=1e9)=>t>=a&&t<b;
const GY=900;
const baby=(x,y,s,o={})=>smilo(x,y,s,{baby:true,...o});
const xmark=(x,y,s,k)=>{if(k<=0)return;save(x,y,back(k)*s);Ln(-60,-60,60,60,{lw:14,col:C.RED});Ln(60,-60,-60,60,{lw:14,col:C.RED});restore();};
const lab=(s,x,y,size,t,a,col=C.OUT)=>text(s,x,y,size*pop(t,a),col,'Gochi','center',-.03,8,'#fff');
const POOLY=850;
function pool(t){// charca de brea (primer plano ya dibujado en el fondo)
  for(let i=0;i<5;i++){const k=(t*.5+i/5)%1;if(k>.7)continue;E(520+i*220,POOLY+60+(i%2)*30,14+k*10,8+k*6,null,{lw:2.4,col:'#5A504A',stroke:true});}}
function card(t,S){bg('hielo');ground();const k=pop(t,.15,.5);save(W/2,420,k,-.02);R(-560,-190,1120,380,18,'#F4EEDC',{lw:4});
  text('Capítulo '+S.ch,0,-105,64,SYD,'Patrick');text(S.title,0,40,S.title.length>16?96:126,C.OUT,'Gochi');restore();
  const x=lerp(-300,W+300,seg(t,0,S.D));
  smilo(x,GY+60,1.5,{baby:true,walk:t*10,exp:['normal','normal','normal','sweat','shock','sweat','love','chill'][S.ch-1],lips:S.ch===7});}
const SHOTS={
titulo(t,S){bg('hielo');ground();
  text('Nacer como un',W/2,170,110*pop(t,0),C.OUT,'Gochi','center',-.03,10,'#fff');
  text('TIGRE',W/2,340,230*pop(t,.3),SY,'Gochi','center',.02,14,C.OUT);
  text('DIENTES DE SABLE',W/2,500,140*pop(t,.6),SY,'Gochi','center',-.01,12,C.OUT);
  if(t>1.2){save(W/2+320,680,lerp(2.4,1,eo(seg(t,1.2,1.4))),-.12);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  smilo(340,GY+40,1.5*pop(t,.9),{exp:t>1.3?'sweat':'normal'});cono(1620,GY+20,1.6*pop(t,1.1),{});},
era(t,S){bg('hielo');ground();nieve(t,40);
  mamut(lerp(-200,420,eo(seg(t,0,3))),GY-10,1.1);bisonte(lerp(2100,1500,eo(seg(t,.3,3))),GY,1.1,{flip:true});perezoso(1000,GY-10,.9);
  lab('hace más de 10 000 años',W/2,130,76,t,.2);
  if(t>S.L(1)){const k=pop(t,S.L(1)+.1);smilo(1260,GY+60,1.5*k,{exp:'sweat'});cartel(1260,GY-420,'todos saben quién eres',pop(t,S.L(1)+.8),40);}},
nombre(t,S){bg('hielo');ground();
  smilo(560,GY+50,2,{exp:'normal'});
  cartel(560,GY-520,'Smilodon',pop(t,.3),52);
  text('¿tigre?',1380,330,110*pop(t,.5),C.OUT,'Gochi','center',-.03,8,'#fff');xmark(1380,330,1.6,seg(t,.9,1.3));
  if(t>S.L(1)){cartel(1380,520,'dientes de sable',pop(t,S.L(1)+.2),48);Ln(1180,540,760,GY-200,{lw:4,col:C.RED});cartel(1380,640,'crisis de identidad',pop(t,S.L(1)+1.2),44);}},
mama(t,S){bg('hielo');ground();nieve(t,30);
  smilo(660,GY+60,2.1,{lips:true,exp:'love'});baby(1280,GY+50,1.8,{flip:true,exp:t>S.L(1)?'sad':'happy'});
  if(on(t,.4,S.L(1)))heart(960,540,18);
  if(t>S.L(1)){cartel(960,170,'una familia con hambre',pop(t,S.L(1)+.2),52);for(let i=0;i<3;i++)text('…',1280+i*30,GY-330,60,C.OUT);}},
hermanos(t,S){bg('hielo');ground();
  const nm=['Tobías','Ramiro','Ulises','Tú'],xs=[360,760,1160,1560];
  for(let i=0;i<4;i++){baby(xs[i],GY+60,1.9*pop(t,.2+i*.3),{exp:i===3?'happy':'normal',flip:i>1});cartel(xs[i],GY-280,nm[i],pop(t,.5+i*.3),40);}
  if(t>S.L(1)){for(const i of[0,2])xmark(xs[i],GY-440,.6,seg(t,S.L(1)+1.2+i*.3,S.L(1)+1.5+i*.3));}},
fermin(t,S){bg('hielo');ground();nieve(t,30);
  baby(560,GY+60,1.9,{exp:t>S.L(1)?'happy':'normal'});
  cono(1400,GY+30,1.9*pop(t,.3),{});cartel(1400,GY-340,'Fermín',pop(t,S.L(0)+1.6),50);
  if(t>S.L(1)){heart(1000,GY-380,18);cartel(960,170,'el único que no opina de tus colmillos',pop(t,S.L(1)+.4),40);}},
tamano(t,S){bg('hielo');ground();
  smilo(620,GY+60,2.4,{exp:'normal'});
  save(1100,0,1);Ln(0,GY-330,0,GY+40,{lw:4,col:C.RED});Ln(-24,GY-330,24,GY-330,{lw:4,col:C.RED});Ln(-24,GY+40,24,GY+40,{lw:4,col:C.RED});restore();
  text('1 metro',1220,GY-170,76*pop(t,.3),C.OUT,'Gochi','center',-.03,8,'#fff');
  if(t>S.L(0)+.5)text('160 a 280 kg',W/2,150,90*pop(t,S.L(0)+.5),C.RED,'Gochi','center',-.02,8,'#fff');
  if(t>S.L(1)){cartel(1500,GY-420,'¿gatito?',pop(t,S.L(1)+.8),54);xmark(1500,GY-420,.7,seg(t,S.L(1)+1.6,S.L(1)+1.9));}},
bisonte(t,S){bg('hielo');ground();
  smilo(520,GY+60,2,{mouth:true,exp:'happy'});
  bisonte(1150,GY,1.1,{flip:false});cartel(1150,GY-330,'bisonte',pop(t,.3),42);
  if(t>S.L(1)){camello(1650,GY,1.1,{flip:true});cartel(1650,GY-440,'camello (sí, en América)',pop(t,S.L(1)+.2),38);}
  for(let i=0;i<3;i++){const k=(t*.8+i/3)%1;drop(700+i*0,GY-190+k*50,.9);}},
embosca(t,S){bg('hielo');ground();
  const leap=t>S.L(1)+.6;
  const bx=leap?1250:lerp(2100,1250,eo(seg(t,.2,S.L(1)+.6)));
  bisonte(bx,GY,1.1,{flip:true});
  if(!leap){X.bush(760,GY+20,420,260,X.C.BUSH[1],4);above(GY-50,()=>smilo(700,GY+20,1.5,{exp:'angry'}));}
  else{const p=seg(t,S.L(1)+.6,S.L(1)+1.5);smilo(lerp(700,1180,p),GY-Math.sin(p*Math.PI)*230,1.6,{mouth:true,exp:'angry',rot:-.2*(1-p)});
    impact('¡ZAS!',1000,420,seg(t,S.L(1)+1.5,S.L(1)+2.5));}
  if(!leap)text('pssst… espera…',960,150,70*pop(t,.4),C.OUT,'Gochi','center',-.03,8,'#fff');},
mordida(t,S){bg('hielo');ground();
  const b1=eo(seg(t,.3,1.4)),b2=eo(seg(t,.8,1.7));
  R(520,GY-340*b1,140,340*b1,6,'#C79A55',{lw:3.4});text('león',590,GY+40,44,C.OUT,'Patrick');text('3',590,GY-340*b1-34,50,C.OUT,'Gochi');
  R(900,GY-113*b2,140,113*b2,6,SY,{lw:3.4});text('tú',970,GY+40,44,C.OUT,'Patrick');text('1',970,GY-113*b2-34,50,C.OUT,'Gochi');
  text('fuerza de mordida',W/2,150,76*pop(t,.2),C.OUT,'Gochi','center',-.02,8,'#fff');
  smilo(1500,GY+60,1.5,{exp:t>S.L(1)?'sad':'normal'});
  if(t>S.L(1)){cartel(1500,GY-340,'fuerza de pastelito',pop(t,S.L(1)+.3),44);}},
fermin2(t,S){bg('hielo');ground();
  smilo(640,GY+60,2,{exp:'happy',hold(){X.E(150,-60+Math.sin(t*4)*6,34,22,'#C04A4A',{lw:3});X.E(160,-66,10,8,'#fff',{stroke:false});}});
  cono(1300,GY+30,1.9,{});
  if(t>S.L(1))bubble('...',1300,GY-320,60,-1);},
grupo(t,S){bg('hielo');ground();
  for(let i=0;i<3;i++)smilo(260+i*210,GY+60+(i%2)*20,1.2,{exp:'normal',flip:false});text('¿manada?',460,280,70*pop(t,.3),C.OUT,'Gochi');
  smilo(1560,GY+60,1.8,{exp:'normal',flip:true});text('¿solo?',1560,330,70*pop(t,.9),C.OUT,'Gochi');
  text('?',960,500,260*pop(t,.5),C.RED,'Gochi','center',.05,10,'#fff');
  if(t>S.L(1)){cartel(960,170,'invitaciones a fiestas: 0',pop(t,S.L(1)+.8),50);}},
ecuador(t,S){bg('hielo');ground();
  text('Ecuador',W/2,140,100*pop(t,.2),C.OUT,'Gochi','center',-.03,8,'#fff');
  baby(420,GY+60,1.5,{exp:'dead'});baby(720,GY+60,1.5,{exp:'dead',flip:true});cartel(570,GY-240,'dos hermanos de ~2 años',pop(t,.8),38);
  craneo(1300,GY+20,1.5);cartel(1300,GY-260,'su mamá',pop(t,S.L(0)+1.5),42);
  if(t>S.L(1))cartel(960,330,'¿familia? y final muy triste',pop(t,S.L(1)+.2),48);},
herido(t,S){bg('hielo');ground();
  smilo(640,GY+60,1.9,{sit:true,exp:'sad',band:true,hold(){R(40,-8,110,28,10,'#fff',{lw:3});}});
  cartel(640,GY-320,'cadera rota',pop(t,.3),42);
  const k=eo(seg(t,.3,S.L(1)+1));smilo(lerp(1900,1250,k),GY+60,1.8,{flip:true,exp:'happy',walk:t*8,hold(){hueso(-120,-100,1.1,.4);}});
  if(t>S.L(1)+1)cartel(1250,GY-320,'comida a domicilio',pop(t,S.L(1)+1),44);
  if(t>S.L(1))text('sobrevivió más de un año',W/2,150,70*pop(t,S.L(1)+.1),C.OUT,'Gochi','center',-.02,8,'#fff');},
tobias(t,S){bg('brea');
  above(POOLY,()=>bisonte(1200,POOLY+60,1.2,{exp:'shock'}));
  baby(lerp(200,520,eo(seg(t,.3,S.D*.6))),GY+60,1.8,{walk:t*8,exp:'happy'});
  text('Tobías',640,GY-330,56,C.OUT,'Gochi','center',-.03,8,'#fff');
  cartel(1000,320,'charca pegajosa y oscura',pop(t,S.L(1)),46);
  if(t>S.L(1)+1.5)lab('mala idea',W/2,160,100,t,S.L(1)+1.5,C.RED);},
brea(t,S){bg('brea');pool(t);
  above(POOLY,()=>camello(1250,POOLY+70,1.1,{}));
  sign(300,420,'La Brea',50,300);sign(300,520,'Los Ángeles',34,300);
  cartel(900,300,'asfalto natural',pop(t,.3),48);
  if(t>S.L(1)){lab('el que entra, no sale',W/2,160,90,t,S.L(1)+.2,C.RED);}},
lobos(t,S){bg('hielo');ground();
  lobo(lerp(-200,420,eo(seg(t,.2,1.2))),GY,1.4,{mouth:true});cartel(420,GY-340,'lobo terrible',pop(t,.8),42);
  leon(lerp(2200,1560,eo(seg(t,.2,1.2))),GY,1.5,{flip:true});cartel(1560,GY-380,'león americano',pop(t,.8),42);
  smilo(960,GY+60,1.7,{exp:'sweat'});
  if(t>S.L(1))text('mismas presas',W/2,160,90*pop(t,S.L(1)+.2),C.RED,'Gochi','center',-.02,8,'#fff');},
trampa(t,S){bg('brea');pool(t);
  above(POOLY,()=>bisonte(1000,POOLY+70,1.2,{exp:'shock'}));
  text('¡MUUU!',1000,520+Math.sin(t*12)*6,90,C.RED,'Gochi','center',-.03,8,'#fff');
  const k=eo(seg(t,.4,S.L(1)+2));
  lobo(lerp(-200,520,k),GY,1.3,{mouth:true});leon(lerp(2200,1620,k),GY,1.4,{flip:true});
  if(t>S.L(1)+2.2){above(POOLY,()=>{lobo(560,POOLY+30,1.3,{exp:'shock'});});cartel(960,200,'qué gran negocio',pop(t,S.L(1)+2.2),52);}},
tobias2(t,S){bg('brea');pool(t);
  above(POOLY,()=>bisonte(1380,POOLY+70,1.1,{exp:'shock'}));
  const p=seg(t,S.L(1)-.2,S.L(1)+2);const sink=p*220;const gone=t>S.L(1)+2.2;
  if(!gone)above(POOLY,()=>baby(lerp(300,820,eo(seg(t,.3,S.L(1)))),POOLY+40+sink,1.8,{walk:t*8,exp:p>0?'shock':'happy'}));
  else grave(300,GY+30,'Tobías');
  if(gone)lab('descansa',W/2,160,90,t,S.L(1)+2.2);},
estadistica(t,S){bg('hielo');ground();
  for(let i=0;i<10;i++){const x=300+(i%5)*300,y=330+Math.floor(i/5)*250;const k=pop(t,.2+i*.18);save(x,y,k);craneo(0,60,.9,{});if(i<9)text('x',0,-30,0,'#fff');restore();
    if(i<9&&t>S.L(0)+.6){save(x,y,k);E(0,0,10,10,C.RED,{lw:2});restore();}}
  text('9 de cada 10',W/2,130,96*pop(t,.2),C.RED,'Gochi','center',-.02,8,'#fff');
  if(t>S.L(1))cartel(W/2,900,'los comensales son el plato',pop(t,S.L(1)+.2),50);},
ulises(t,S){bg('hielo');ground();
  const gone=t>S.L(1)+1;
  if(!gone)baby(900,GY+40,1.8,{exp:'sweat'});
  X.bush(900,GY+20,420,200,X.C.BUSH[1],4);
  const k=eo(seg(t,.2,S.L(1)+.6));lobo(lerp(-200,500,k),GY+10,1.4,{mouth:t>S.L(1)});
  if(gone)grave(1500,GY+30,'Ulises');
  text('Ulises',900,GY-430,56,C.OUT,'Gochi','center',-.03,8,'#fff');},
fermin3(t,S){bg('hielo');ground();
  cono(1100,GY+30,2,{});
  const k=eo(seg(t,.2,S.L(0)+1));lobo(lerp(-200,620,k),GY+10,1.5,{});
  if(t>S.L(0)+1)for(let i=0;i<3;i++)Ln(760+i*0,GY-190+i*14,820,GY-170+i*10,{lw:3,col:C.OUT});
  baby(1700,GY+60,1.4,{flip:true,exp:'sweat'});
  if(t>S.L(1))cartel(1100,GY-380,'una roca con trabajo de oficina',pop(t,S.L(1)+.4),40);},
colmillos(t,S){bg('hielo');ground();
  smilo(560,GY+60,2.4,{mouth:true,exp:'angry'});
  save(1180,0,1);Ln(0,GY-180,0,GY-40,{lw:4,col:C.RED});Ln(-18,GY-180,18,GY-180,{lw:4,col:C.RED});Ln(-18,GY-40,18,GY-40,{lw:4,col:C.RED});restore();
  text('18 cm',1290,GY-110,76*pop(t,.3),C.RED,'Gochi','center',-.03,8,'#fff');
  if(t>S.L(1)){save(1500,GY-80,pop(t,S.L(1)+.1));R(-130,-14,140,28,5,'#C9C9C4',{lw:3});R(10,-20,120,40,10,'#7A5230',{lw:3});restore();cartel(1500,GY-170,'cuchillo de cocina',pop(t,S.L(1)+.4),38);}},
boca(t,S){bg('hielo');ground();
  const w1=60*pop(t,.3),w2=130*pop(t,.9);
  save(500,GY-250,1);P([[0,0],[360,-w1],[360,w1]],'#F6D9D9',{lw:3.4});text('león',230,w1+60,46,C.OUT,'Patrick');restore();
  save(1200,GY-250,1);P([[0,0],[360,-w2],[360,w2]],'#F6D9D9',{lw:3.4});text('tú',230,w2+60,46,C.OUT,'Patrick');restore();
  smilo(1000,GY+60,1.3,{mouth:true,exp:'chill'});
  if(t>S.L(1))lab('bostezar contigo: terror',W/2,140,76,t,S.L(1)+.2,C.RED);},
brazos(t,S){bg('hielo');ground();
  bisonte(1150,GY,1.1,{exp:'shock'});
  const k=eo(seg(t,.2,1.8));smilo(lerp(300,820,k),GY+40,1.9,{exp:'angry',walk:t*8});
  if(t>S.L(0)+1.2)text('1. abrazo',560,200,80*pop(t,S.L(0)+1.2),C.OUT,'Gochi','center',-.03,8,'#fff');
  if(t>S.L(1)){text('2. mordisco',1240,200,80*pop(t,S.L(1)+.1),C.RED,'Gochi','center',.03,8,'#fff');smilo(820,GY+40,1.9,{mouth:true,exp:'angry'});heart(1000,520,16);}},
fragil(t,S){bg('hielo');ground();
  hueso(1300,GY-20,2.2,.05);
  const bite=seg(t,.6,1.2);smilo(560,GY+60,2.2,{mouth:t<.9,exp:t>1?'shock':'normal'});
  if(t>1.1)impact('¡CRAC!',1000,440,seg(t,1.1,2.2));
  if(t>S.L(1)){cartel(960,170,'muerde el cuello, con cuidado',pop(t,S.L(1)+.2),50);}
  if(t>S.L(1)+1.2)smilo(1300,GY+60,1.5,{tie:true,flip:true,exp:'happy'});},
fermin4(t,S){bg('hielo');ground();
  const pk=Math.max(0,Math.sin(t*5));smilo(760+pk*30,GY+60,2,{exp:t>S.L(1)?'sweat':'happy'});
  cono(1450+(t>S.L(0)+.5?Math.min((t-S.L(0)-.5)*60,50):0),GY+40,1.8,{rot:pk*.05});
  if(t>S.L(0)+.5)impact('toc',1230,560,seg(t%1.2,0,.6),C.YEL,C.RED);
  if(t>S.L(1))cartel(960,170,'buen amigo',pop(t,S.L(1)+.4),56);},
dientes(t,S){bg('hielo');ground();
  baby(380,GY+60,1.9,{noFangs:true,exp:'happy'});cartel(380,GY-260,'dientes de leche',pop(t,.2),38);
  baby(960,GY+60,1.9,{exp:'normal'});cartel(960,GY-260,'12 a 19 meses: empiezan',pop(t,S.L(0)+.4),36);
  smilo(1560,GY+60,1.9,{exp:'angry'});if(t>S.L(1))cartel(1560,GY-440,'3 años: completos',pop(t,S.L(1)+.3),40);},
lento(t,S){bg('hielo');ground();
  smilo(560,GY+60,1.8,{lips:true,exp:'chill'});smilo(1000,GY+60,1.8,{flip:true,exp:'chill'});baby(780,GY+60,1.4,{exp:'happy'});
  save(1560,420,pop(t,.3));R(-130,-130,260,260,10,'#fff',{lw:4});text('3 años',0,-30,70,C.RED,'Gochi');text('de crianza',0,50,36,C.OUT,'Patrick');restore();
  if(t>S.L(1))cartel(1560,700,'león: 17 meses',pop(t,S.L(1)+.2),40);},
salto(t,S){bg('hielo');ground();nieve(t,30);
  perezoso(1450,GY-10,1.2);
  const j=S.L(0)+S.dur(0)*.7;
  let x=lerp(300,760,eo(seg(t,.3,j)));let y=GY+60,rot=0;
  if(t>j){const p=seg(t,j,j+.8);x=lerp(760,1060,p);y=GY+60-Math.sin(p*Math.PI)*230;rot=-.3*(1-p);}
  if(t>j+.8){const p=seg(t,j+.8,j+1.8);x=lerp(1060,860,p);rot=p*6.2;y=GY+60;}
  baby(x,y,1.7,{rot,exp:t>j?'shock':'angry',walk:t<j?t*14:0});
  if(t>j+.8)impact('¡PUM!',900,520,seg(t,j+.8,j+1.8));
  if(t>S.L(1)+1){copo(1000,GY-170,1.4);cartel(960,160,'un copo en la nariz',pop(t,S.L(1)+.8),50);}},
fermin5(t,S){bg('hielo');ground();
  cono(1000,GY+40,1.9,{});
  const j=t*1.4;baby(1000+Math.cos(j)*420,GY+60-Math.abs(Math.sin(j*2))*60,1.5,{walk:t*10,exp:'sweat',flip:Math.sin(j)>0});
  if(t>S.L(1))cartel(960,170,'entrenamiento cómodo (para él)',pop(t,S.L(1)+.2),48);},
cortejo(t,S){bg('hielo');ground();
  const bow=Math.sin(t*4)*.06;smilo(560,GY+60,2,{exp:'love',rot:bow});smilo(1380,GY+60,2,{flip:true,lips:true,exp:'chill'});
  for(let i=0;i<3;i++)heart(960+Math.sin(t*3+i)*50,GY-300-i*70-((t*40)%60),14+i*2);
  if(t>S.L(0)+1.2)cartel(960,170,'cartas de amor: 0',pop(t,S.L(0)+1.2),54);
  if(t>S.L(1))text('frotar colmillos: mala idea',W/2,300,70*pop(t,S.L(1)+.5),C.RED,'Gochi','center',-.02,8,'#fff');},
pareja(t,S){bg('hielo');ground();
  smilo(560,GY+60,2,{exp:'love'});smilo(1380,GY+60,2,{flip:true,lips:true,exp:'love'});
  Ln(380,GY-350,1560,GY-350,{lw:4,col:C.RED});
  cartel(960,GY-420,'mismo tamaño',pop(t,.4),46);
  heart(960,GY-200,24);if(t>S.L(1))cartel(960,170,'empate con colmillos',pop(t,S.L(1)),54);},
ramiro(t,S){bg('cueva');
  smilo(560,GY+40,1.7,{glasses:true,exp:'happy'});smilo(900,GY+40,1.7,{lips:true,exp:'happy'});
  for(let i=0;i<4;i++)baby(1240+i*130,GY+40,1.1,{exp:'happy',flip:i%2===0});
  cartel(560,GY-380,'Ramiro',pop(t,.3),44);
  if(t>S.L(1))cartel(960,170,'cueva con vista a las montañas',pop(t,S.L(1)+.2),48);},
cachorros(t,S){bg('hielo');ground();nieve(t,30);
  smilo(420,GY+60,1.7,{lips:true,exp:'love'});smilo(820,GY+60,1.7,{flip:true,exp:'love'});
  for(let i=0;i<3;i++)baby(1100+i*150,GY+60,1.2,{exp:'happy',flip:i%2===1});
  if(t>S.L(1)){const k=eo(seg(t,S.L(1)+.1,S.L(1)+3));lobo(lerp(2400,1750,k),GY+10,.9,{flip:true});}},
fin(t,S){bg('hielo');ground();
  mamut(500,GY-10,1,{});bisonte(1120,GY,.9,{});perezoso(1560,GY-10,.8,{});
  xmark(500,GY-270,1.6,seg(t,.8,1.1));xmark(1120,GY-200,1.4,seg(t,1.8,2.1));xmark(1560,GY-230,1.3,seg(t,2.8,3.1));
  lab('hace unos 10 000 años',W/2,130,76,t,.2);
  if(t>S.L(1)){smilo(1850,GY+60,1.2,{flip:true,sit:true,exp:'sad'});cartel(1650,GY-380,'plato vacío',pop(t,S.L(1)+.3),42);}},
labrea(t,S){bg('hielo');ground();
  for(let i=0;i<24;i++){const k=pop(t,.2+i*.07);craneo(120+(i%8)*240,560+Math.floor(i/8)*150+(i%3)*8,.55*k,{flip:i%2===0});}
  lab('166 000 huesos',W/2,130,110,t,.2,C.RED);
  if(t>S.L(1))cartel(W/2,880,'la colección más grande del mundo',pop(t,S.L(1)+.2),50);},
culpa(t,S){bg('hielo');ground();
  board(160,160,640,440);chalk('cambia el clima',200,260,50,seg(t,.3,1.5));chalk('se acaban tus presas',200,350,50,seg(t,1.5,3));chalk('colmillos: no cuentan',200,440,50,seg(t,3,4.5));
  smilo(1400,GY+60,1.9,{exp:'sad',sit:true});
  if(t>S.L(1)){E(1480,GY-100,70,24,'#fff',{lw:3});cartel(1480,GY-300,'ni dieciocho centímetros te salvan',pop(t,S.L(1)+.4),38);}},
fama(t,S){bg('museo');
  vitrina(300,300,560,520);craneo(580,760,2.2);cartel(580,260,'museos de todo el mundo',pop(t,.3),38);
  save(1400,520,pop(t,.5));R(-170,-220,340,440,10,'#2F3A5E',{lw:4});text('LA PELÍCULA',0,-150,44,'#fff','Patrick');smilo(0,170,1.2,{exp:'angry',mouth:true});restore();
  if(t>S.L(1)){text('tigre',1400,100,100*pop(t,S.L(1)+.2),C.OUT,'Gochi','center',-.03,8,'#fff');xmark(1400,100,1.4,seg(t,S.L(1)+1.2,S.L(1)+1.6));}},
cierre(t,S){bg('hielo');ground();
  smilo(960,GY+60,2.6,{exp:t>S.L(1)?'happy':'sad',crown:t>S.L(1),mouth:t>S.L(1)});
  if(t>S.L(1))confetti(t-S.L(1));
  if(t>S.L(1))text('18 cm de fama',W/2,190,120*pop(t,S.L(1)+.2),SY,'Gochi','center',-.03,12,C.OUT);},
adios(t,S){bg('museo');
  vitrina(660,300,600,520);cono(960,790,1.7,{});
  const k=pop(t,.3);save(960,845,k);R(-90,-20,180,40,4,'#fff',{lw:2.6});text('cono',0,0,30,C.OUT,'Patrick');restore();
  if(t>S.L(1))heart(1400,400,22);},
sub(t,S){bg('hielo');ground();
  text('SUSCRÍBETE',W/2,190,150*pop(t,.2),C.RED,'Gochi','center',-.03,12,'#fff');
  cono(560,GY+40,1.7,{exp:t>S.L(1)+1.2?'shock':'normal'});
  const k=eo(seg(t,S.L(1),S.L(1)+2.4));if(t>S.L(1)-.2)lobo(lerp(2300,1100,k),GY+10,1.5,{flip:true,mouth:k>.9});
  if(t>S.L(1)+2.4)impact('¡ÑAM!',900,520,seg(t,S.L(1)+2.4,S.L(1)+3.4));},
};
function drawShot(id,t,S){if(id.startsWith('cap'))return card(t,S);const f=SHOTS[id];if(!f)throw new Error('falta toma '+id);f(t,S);}
module.exports={drawShot};
