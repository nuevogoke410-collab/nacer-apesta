const X=require('./lib');const Q=require('./extra');
const {W,H,C,seg,lerp,eo,eio,back,rnd,cl,E,R,P,Ln,dot,save,restore,text,chalk,sign,bubble,impact,speed,smear,splat,grave,heart,drop,stroke,stick,zzz}=X;
const {bg,pingu,guante,foca,orca,ave,huevo,pez,cartel,copo,ground,nieve,viento,above,SEA,SEA2,SEAD,BK,WH,YL}=Q;
const pop=(t,a,d=.35)=>back(seg(t,a,a+d));
const on=(t,a,b=1e9)=>t>=a&&t<b;
const GY=900, PY=935;
const baby=(x,y,s,o={})=>pingu(x,y,s,{baby:true,...o});
const xmark=(x,y,s,k)=>{if(k<=0)return;save(x,y,back(k)*s);Ln(-60,-60,60,60,{lw:14,col:C.RED});Ln(60,-60,-60,60,{lw:14,col:C.RED});restore();};
const lab=(s,x,y,size,t,a,col=C.OUT)=>text(s,x,y,size*pop(t,a),col,'Gochi','center',-.03,8,'#fff');
const wave=(y,t,col=SEA2)=>{for(let i=0;i<9;i++){const x=900+i*130+Math.sin(t*3+i)*10;Ln(x,y+Math.sin(t*4+i)*4,x+70,y+Math.sin(t*4+i)*4,{lw:3,col});}};
function card(t,S){bg('antartida');ground();const k=pop(t,.15,.5);save(W/2,420,k,-.02);R(-560,-190,1120,380,18,'#F4EEDC',{lw:4});
  text('Capítulo '+S.ch,0,-105,64,'#5A5A66','Patrick');text(S.title,0,40,S.title.length>16?96:126,C.OUT,'Gochi');restore();
  const x=lerp(-300,W+300,seg(t,0,S.D));
  baby(x,PY,1.7,{walk:t*10,exp:['normal','normal','sweat','sweat','shock','happy','love','chill'][S.ch-1],lips:S.ch===7});}
const SHOTS={
titulo(t,S){bg('antartida');ground();
  text('Nacer como un',W/2,150,110*pop(t,0),C.OUT,'Gochi','center',-.03,10,'#fff');
  text('PINGÜINO',W/2,320,220*pop(t,.3),BK,'Gochi','center',.02,14,'#fff');
  text('EMPERADOR',W/2,500,150*pop(t,.6),'#E87B2E','Gochi','center',-.01,12,C.OUT);
  if(t>1.2){save(W/2+360,700,lerp(2.4,1,eo(seg(t,1.2,1.4))),-.12);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  pingu(330,PY,1.5*pop(t,.9),{exp:t>1.3?'sweat':'normal'});guante(1640,PY-10,1.6*pop(t,1.1),{});},
antartida(t,S){bg('tormenta');ground();viento(t,36);nieve(t,40);
  const sh=Math.sin(t*50)*3;baby(960+sh,PY,2.3,{exp:'sweat'});
  lab('-20°',500,260,150,t,.2,'#3F6FA0');
  if(t>S.L(1)){lab('-50°',1420,300,170,t,S.L(1)+.1,C.RED);lab('200 km/h',W/2,150,100,t,S.L(1)+.9,C.OUT);}},
huevo(t,S){bg('antartida');ground();nieve(t,20);
  pingu(560,PY,2.1,{lips:true,exp:'chill'});huevo(1100,PY+10,2.2*pop(t,.4));
  text('400 g',1100,GY-200,80*pop(t,.7),C.OUT,'Gochi','center',-.03,8,'#fff');
  if(t>S.L(1)){for(let i=0;i<3;i++){X.g.globalAlpha=.4;huevo(1380+i*140,PY+10,1.4*pop(t,S.L(1)+.1+i*.15));X.g.globalAlpha=1;xmark(1380+i*140,GY-80,.6,seg(t,S.L(1)+.7+i*.2,S.L(1)+1+i*.2));}
    cartel(1500,GY-250,'repuestos: 0',pop(t,S.L(1)+.4),44);}},
mama(t,S){bg('antartida');ground();nieve(t,20);
  const pass=eo(seg(t,.4,1.6));const away=t>S.L(1);
  const mx=away?lerp(620,-300,eio(seg(t,S.L(1)+.2,S.L(1)+3.6))):620;
  pingu(mx,PY-(away?Math.abs(Math.sin(t*9))*8:0),2,{lips:true,flip:away,exp:away?'chill':'love',walk:away?t*9:0});
  pingu(1350,PY,2,{flip:true,exp:'shock',egg:pass>=1});
  if(pass<1)huevo(lerp(740,1230,pass),PY-40-Math.sin(pass*Math.PI)*80,1.6);
  if(away)cartel(960,200,'vuelve en 4 meses',pop(t,S.L(1)+1.2),52);},
papa(t,S){bg('antartida');ground();nieve(t,30);
  pingu(760,PY,2.4,{egg:true,exp:'chill'});
  cartel(760,GY-640,'incuba de pie, 2 meses',pop(t,.3),44);
  if(t>S.L(1)){const n=Math.min(100,Math.floor((t-S.L(1))*45));text('días sin comer: '+n+(n>=100?'+':''),1400,330,70,C.RED,'Gochi','center',.02,8,'#fff');
    R(1250,600,300,26,8,'#fff',{lw:3.4});E(1400,590,120,20,'#fff',{lw:3.4});text('plato vacío',1400,690,40,C.OUT,'Patrick');}},
aurelio(t,S){bg('antartida');ground();nieve(t,30);
  baby(560,PY,2,{exp:t>S.L(1)?'happy':'normal'});
  guante(1380,PY-10,2*pop(t,.3),{exp:'normal'});
  if(t>S.L(0)+.4)cartel(1380,GY-400,'un guante perdido',pop(t,S.L(0)+.4),44);
  if(t>S.L(1)){heart(960,520,18);cartel(960,170,'Aurelio',pop(t,S.L(1)+.1),70);}},
hermanos(t,S){bg('antartida');ground();
  const nm=['Wilfredo','Ambrosio','Ismael','Tú'],xs=[360,760,1160,1560];
  for(let i=0;i<4;i++){baby(xs[i],PY,2*pop(t,.2+i*.3),{exp:i===3?'happy':'normal',flip:i>1});cartel(xs[i],GY-320,nm[i],pop(t,.5+i*.3),40);}
  if(t>S.L(1))for(const i of[0,1])xmark(xs[i],GY-470,.6,seg(t,S.L(1)+1.8+i*.8,S.L(1)+2.1+i*.8));},
tamano(t,S){bg('antartida');ground();
  pingu(620,PY,2.1,{exp:'sweat'});
  Ln(1100,GY-390,1100,GY+40,{lw:4,col:C.RED});Ln(1076,GY-390,1124,GY-390,{lw:4,col:C.RED});Ln(1076,GY+40,1124,GY+40,{lw:4,col:C.RED});
  text('+1 metro',1250,GY-170,76*pop(t,.3),C.OUT,'Gochi','center',-.03,8,'#fff');
  if(t>S.L(0)+.5)text('25 a 40 kg',W/2,140,90*pop(t,S.L(0)+.5),C.RED,'Gochi','center',-.02,8,'#fff');
  if(t>S.L(1))cartel(1500,GY-450,'el más grande del mundo',pop(t,S.L(1)+.2),42);},
pez(t,S){bg('borde');ground();
  baby(380,PY,1.9,{exp:'sad'});
  pez(1500,700+Math.sin(t*3)*10,2.2,{});wave(780,t);
  Ln(560,GY-100,1300,GY-100,{lw:3,col:C.OUT});
  lab('comida',1500,560,70,t,.3);
  if(t>S.L(1)){cartel(960,170,'el mar está muy lejos',pop(t,S.L(1)+.2),56);text('...',560,GY-150,70,C.OUT);}},
leche(t,S){bg('antartida');ground();
  baby(520,PY,1.9,{exp:t>S.L(1)?'shock':'happy'});
  pingu(1250,PY,2.2,{flip:true,exp:'chill'});
  for(let i=0;i<5;i++){const k=(t*.8+i/5)%1;E(lerp(1110,640,k),GY-430+Math.sin(k*Math.PI)*-70+k*130,10,10,'#fff',{lw:2.4});}
  cartel(960,170,'leche de pingüino',pop(t,.4),60);
  if(t>S.L(1))cartel(960,320,'único menú',pop(t,S.L(1)+.3),48);},
mama2(t,S){bg('antartida');ground();
  const k=eo(seg(t,.2,1.6));
  pingu(lerp(-300,640,k),PY,2.1,{lips:true,exp:t>S.L(1)?'chill':'happy',walk:t<1.6?t*10:0});
  X.g.save();X.g.translate(0,0);if(t<S.L(1))E(lerp(-300,640,k)+20,GY-130,60,70,'#CDD8E0',{lw:2.4});X.g.restore();
  baby(1500,PY,1.9,{flip:true,exp:t>S.L(1)+1.2?'love':'normal'});
  if(t>S.L(1)){for(let i=0;i<4;i++){const p=cl((t-S.L(1)-.2-i*.25)/1.1);if(p>0&&p<1)pez(lerp(780,1380,p),GY-440+Math.sin(p*Math.PI)*-120+p*200,1.1,{rot:p*4});}}},
aurelio2(t,S){bg('antartida');ground();
  baby(620,PY,2,{exp:'happy',hold(){pez(150,-140+Math.sin(t*4)*6,1.1,{});}});
  guante(1300,PY-10,2,{});
  if(t>S.L(1))bubble('...',1300,GY-400,60,-1);},
colonia(t,S){bg('antartida');ground();
  for(let r=0;r<3;r++)for(let i=0;i<11;i++){const x=120+i*160+(r%2)*60,y=PY-120+r*60;const hi=(r*11+i);pingu(x,y,.9-.08*(2-r),{exp:['normal','shock','happy','chill'][hi%4],flip:hi%3===0});}
  for(let i=0;i<5;i++){const k=(t*.5+i/5)%1;stroke([[300+i*300,500],[320+i*300,460-k*30],[290+i*300,420-k*40],[310+i*300,380-k*50]],{lw:3,col:'#7FA34A'});}
  cartel(960,150,'todos huelen a pescado',pop(t,.3),52);
  if(t>S.L(1))cartel(960,260,'privacidad: 0',pop(t,S.L(1)+.4),52);},
huddle(t,S){bg('tormenta');ground();viento(t,40);
  const N=14,pts=[];for(let i=0;i<N;i++){const a=i/N*Math.PI*2+t*(t>S.L(1)?.7:0);pts.push([960+Math.cos(a)*470,760+Math.sin(a)*130,a]);}
  pts.sort((a,b)=>a[1]-b[1]);
  baby(960,720,1.2,{exp:'happy'});
  pts.forEach((p,i)=>pingu(p[0],p[1]+120,1.05,{flip:p[0]<960,exp:'chill'}));
  if(t>S.L(1)){const k=t-S.L(1);{X.g.beginPath();X.g.arc(960,370,70,k*2,k*2+4.6);X.g.lineWidth=12;X.g.strokeStyle=C.RED;X.g.stroke();}cartel(960,160,'turnos: adentro / afuera',pop(t,S.L(1)+.3),52);}
  else cartel(960,160,'bola gigante de pingüinos',pop(t,.4),52);},
voz(t,S){bg('antartida');ground();
  for(let i=0;i<9;i++)pingu(150+i*220,PY-250+(i%2)*40,.7,{exp:'normal',flip:i%2===0});
  pingu(500,PY,2,{lips:true,exp:'happy'});pingu(1420,PY,2,{flip:true,exp:'happy'});
  for(let i=0;i<3;i++){const k=(t*1.5+i/3)%1;X.g.globalAlpha=1-k;X.g.beginPath();X.g.arc(640,GY-250,60+k*120,-.9,.9);X.g.lineWidth=5;X.g.strokeStyle=C.OUT;X.g.stroke();X.g.beginPath();X.g.arc(1280,GY-250,60+k*120,Math.PI-.9,Math.PI+.9);X.g.stroke();X.g.globalAlpha=1;}
  text('¡IIIIII!',500,GY-560,60*pop(t,.3),C.RED,'Gochi','center',-.05,8,'#fff');text('¡IIIIII!',1420,GY-560,60*pop(t,.7),C.RED,'Gochi','center',.05,8,'#fff');
  if(t>S.L(1)){heart(960,GY-300,24);cartel(960,150,'se encuentran por la voz',pop(t,S.L(1)+.4),52);}},
creche(t,S){bg('antartida');ground();
  sign(960,150,'Guardería',70,520);
  for(let i=0;i<9;i++)baby(260+i*170,PY-((i%3)*40),1.2,{exp:['happy','normal','shock'][i%3],flip:i%2===0});
  const k=eo(seg(t,S.L(0)+.6,S.L(0)+3));pingu(lerp(300,-300,k),PY-300,.9,{flip:true,walk:t*9,exp:'chill'});
  if(t>S.L(1))cartel(960,330,'mil enanos y cero adultos',pop(t,S.L(1)+.3),52);},
wilfredo(t,S){bg('antartida');ground();
  for(let i=0;i<3;i++)baby(200+i*150,PY,1.4,{exp:'normal'});
  const go=eo(seg(t,.4,S.L(1)+.6));const hit=S.L(1)+1.1;const gone=t>hit+.8;
  if(!gone)baby(lerp(700,1250,go),PY-(t>hit?Math.min((t-hit)*400,300):0),1.8,{walk:t*8,exp:t>S.L(1)+.5?'shock':'happy'});
  if(t>S.L(1)+.4&&!gone){const p=seg(t,S.L(1)+.4,hit);ave(lerp(2100,1250,eo(p)),lerp(150,PY-280,eo(p)),1.2,{flip:true,t});}
  if(gone){grave(1250,PY+20,'Wilfredo');lab('descansa',W/2,160,90,t,hit+.8);}
  text('Wilfredo',1000,GY-460,52,C.OUT,'Gochi','center',-.03,8,'#fff');
  if(t<S.L(1))cartel(960,200,'solo 5 metros',pop(t,S.L(0)+1.5),56);},
skua(t,S){bg('antartida');ground();
  baby(960,PY,2,{exp:'sweat'});huevo(420,PY+10,1.6);
  ave(lerp(-200,700,eo(seg(t,.2,2))),300+Math.sin(t*5)*20,1.3,{t,col:'#8A8D8F'});cartel(700,160,'petrel gigante',pop(t,1.2),40);
  ave(lerp(2100,1500,eo(seg(t,.6,2.4))),420+Math.sin(t*5)*20,1.2,{t,flip:true,col:'#7A6A58'});cartel(1500,280,'págalo polar',pop(t,S.L(0)+1.4),40);
  if(t>S.L(1))cartel(960,GY-430,'gaviotas con mala educación',pop(t,S.L(1)+.5),44);},
ambrosio(t,S){bg('antartida');ground();
  const gone=t>S.L(1)+1.8;
  if(!gone)baby(760,PY,2,{exp:'chill',rot:-.15});
  if(!gone)zzz(760,GY-460,t);
  if(t>S.L(1)&&!gone){const p=seg(t,S.L(1),S.L(1)+1.6);ave(lerp(2100,900,eo(p)),lerp(180,PY-300,eo(p)),1.2,{flip:true,t,col:'#7A6A58'});}
  if(gone){grave(760,PY+20,'Ambrosio');lab('descansa',W/2,160,90,t,S.L(1)+1.8);}
  text('Ambrosio',760,GY-520,52,C.OUT,'Gochi','center',-.03,8,'#fff');},
foca(t,S){bg('borde');ground();
  const k=eo(seg(t,.2,1.2));foca(lerp(2300,1500,k),770,1.2,{flip:true,mouth:t>S.L(1)});wave(840,t);
  cartel(1500,520,'foca leopardo',pop(t,.8),44);
  text('15 al día',W/2,150,100*pop(t,.3),C.RED,'Gochi','center',-.02,8,'#fff');
  baby(300,PY,1.7,{exp:'sweat',band:true});cartel(300,GY-300,'enfermo',pop(t,S.L(1)+.1),40);
  if(t>S.L(1)){pingu(lerp(560,900,seg(t,S.L(1)+.5,S.L(1)+1.5)),PY,1.6,{exp:'chill',walk:t*14});cartel(700,GY-420,'sano: nada más rápido',pop(t,S.L(1)+1.2),40);}},
orca(t,S){bg('borde');ground();
  pingu(340,PY,1.8,{exp:'shock'});
  orca(lerp(2500,1480,eo(seg(t,.2,1.2))),770,.9,{flip:true,mouth:true});wave(850,t);
  text('ORCA',1250,300,130*pop(t,.6),BK,'Gochi','center',-.03,10,'#fff');
  if(t>S.L(1))cartel(960,170,'se llaman orcas. suficiente.',pop(t,S.L(1)+.2),52);},
borde(t,S){bg('borde');ground();
  const nm=6;for(let i=0;i<nm;i++){pingu(140+i*120,PY,1.5-(i%2)*.1,{exp:'sweat',flip:false});}
  wave(780,t);for(let i=0;i<2;i++){const ex=1100+i*400;E(ex,700+Math.sin(t*3+i)*5,16,10,'#6F7C80',{lw:2.4});dot(ex+4,698,3);}
  if(t>S.L(1)){text('fiu fiu',380,GY-560,60*pop(t,S.L(1)+.2),C.OUT,'Gochi','center',-.05,8,'#fff');text('fiu',380+Math.sin(t*3)*20,GY-640,40,C.OUT,'Patrick');}
  else cartel(960,160,'nadie quiere ser el primero',pop(t,.4),52);},
aurelio3(t,S){bg('borde');ground();
  guante(700,PY-10,2,{exp:t>S.L(1)?'shock':'normal'});
  const k=eo(seg(t,.2,1.2));const leave=t>S.L(1)+.8;
  foca(leave?lerp(1500,2300,eo(seg(t,S.L(1)+.8,S.L(1)+2.5))):lerp(2200,1350,k),PY-100,1.2,{flip:true,exp:leave?'sad':'angry',mouth:false});
  if(t>S.L(0)+.8&&!leave)for(let i=0;i<3;i++)Ln(900,GY-200+i*14,960,GY-190+i*10,{lw:3});
  if(t>S.L(1)+.4)cartel(700,GY-420,'es un guante',pop(t,S.L(1)+.4),44);},
bucear(t,S){bg('submarino');
  const p=eo(seg(t,.3,S.D*.8));const x=lerp(900,1500,p),y=lerp(230,900,p);
  pingu(x,y,1.2,{rot:2.5,exp:'happy',noFeet:true});
  for(let i=0;i<6;i++){const k=(t*.8+i/6)%1;E(x-60-k*30,y-k*180,6+i%3*2,6+i%3*2,'rgba(255,255,255,.5)',{lw:2});}
  Ln(200,130,200,980,{lw:5,col:'#fff'});for(let i=0;i<=5;i++){Ln(176,130+i*170,224,130+i*170,{lw:4,col:'#fff'});text(i*100+' m',330,130+i*170,40,'#fff','Patrick','center',0,6,C.OUT);}
  X.g.fillStyle='rgba(0,5,20,'+(.6*p)+')';X.g.fillRect(0,0,W,H);
  if(t>S.L(1))text('sin luz',W/2,170,100*pop(t,S.L(1)+.2),'#fff','Gochi','center',-.02,10,C.OUT);},
minutos(t,S){bg('submarino');
  pingu(1200,800+Math.sin(t*2)*8,1.2,{rot:1.8,exp:'chill',noFeet:true});
  save(500,420,1);E(0,0,150,150,'#fff',{lw:5});for(let i=0;i<12;i++){const a=i/12*Math.PI*2;Ln(Math.cos(a)*120,Math.sin(a)*120,Math.cos(a)*138,Math.sin(a)*138,{lw:4});}
  const a=t*.7;Ln(0,0,Math.cos(a)*100,Math.sin(a)*100,{lw:7,col:C.RED});dot(0,0,8);restore();
  text('casi 20 min',500,200,90*pop(t,.3),'#fff','Gochi','center',-.03,10,C.OUT);
  if(t>S.L(1)){stick(1700,470,.7,{sweat:true,smile:false});xmark(1700,300,.8,seg(t,S.L(1)+1.2,S.L(1)+1.6));cartel(1700,560,'humano: 2 min',pop(t,S.L(1)+.4),38);}},
plumas(t,S){bg('tormenta');ground();viento(t,30);
  pingu(960,PY,2.6,{exp:'chill'});
  cartel(430,GY-500,'plumas muy apretadas',pop(t,.3),42);Ln(640,GY-480,860,GY-420,{lw:4,col:C.RED});
  if(t>S.L(0)+1){cartel(1500,GY-300,'capa de grasa',pop(t,S.L(0)+1),42);Ln(1300,GY-280,1130,GY-250,{lw:4,col:C.RED});}
  if(t>S.L(1)){cartel(960,170,'no se vende en tiendas',pop(t,S.L(1)+.4),56);}},
tobogan(t,S){bg('antartida');ground();
  const p=eio(seg(t,.2,S.D*.85));const x=lerp(-200,2100,p);
  Ln(-60,PY+10,x,PY+10,{lw:4,col:'#B5C8D4'});
  pingu(x,PY-10,1.4,{rot:Math.PI/2,exp:'happy',noFeet:true,scarf:true});
  for(let i=0;i<6;i++)Ln(x-260-i*40,PY-90+i*16,x-120-i*40,PY-90+i*16,{lw:3,col:'#B5C8D4',noJit:true});
  pingu(300,PY-250,.7,{walk:t*8,exp:'sweat',flip:false});
  text('¡WIIII!',W/2,170,100*pop(t,.4),C.RED,'Gochi','center',-.03,8,'#fff');
  if(t>S.L(1))cartel(960,330,'más rápido que caminar',pop(t,S.L(1)+.3),52);},
aurelio4(t,S){bg('borde');ground();
  baby(360,PY,1.8,{exp:t>S.L(1)?'happy':'shock'});
  guante(1400,760+Math.sin(t*3)*8,2,{exp:'normal',rot:.1*Math.sin(t*2)});
  X.P([[890,800],[W+40,800],[W+40,H+40],[890,H+40]],'rgba(94,143,174,.65)',{stroke:false});wave(820,t,'#fff');
  if(t>S.L(1))cartel(1400,GY-330,'chaleco salvavidas',pop(t,S.L(1)+.4),48);},
plumon(t,S){bg('antartida');ground();
  baby(960,PY,3,{exp:'love'});
  for(let i=0;i<3;i++)heart(560+i*400,420-((t*50)%100),16+i*2);
  cartel(500,GY-480,'plumón gris',pop(t,.3),52);
  if(t>S.L(1)){ave(1650,300+Math.sin(t*5)*15,1,{flip:true,t,col:'#7A6A58'});cartel(1500,520,'fácil de comer',pop(t,S.L(1)+.3),48);}},
verano(t,S){bg('borde');ground();
  const j=S.L(1)+1.5;text('verano',W/2,150,100*pop(t,.2),'#E8A02E','Gochi','center',-.02,8,'#fff');
  for(let i=0;i<4;i++)Ln(300+i*130,GY-6,330+i*130+Math.sin(i)*20,GY+40,{lw:3.6});
  let x=620,y=PY,rot=0;
  if(t>j){const p=seg(t,j,j+.7);x=lerp(620,1500,p);y=lerp(PY,860,p)-Math.sin(p*Math.PI)*320;rot=p*.8;}
  if(t>j+.7){x=1500;y=900+Math.sin(t*3)*6;rot=0;}
  baby(x,y,1.7,{rot,exp:t>j+.7?'sweat':'shock'});
  X.P([[890,800],[W+40,800],[W+40,H+40],[890,H+40]],'rgba(94,143,174,.65)',{stroke:false});wave(820,t,'#fff');
  E(1100,790,18,10,'#6F7C80',{lw:2.4});dot(1106,788,3);
  if(t>j+.7){splat(1500,830,seg(t,j+.7,j+1.5),1.3,'#E6F4FA');impact('¡SPLASH!',1450,520,seg(t,j+.7,j+1.7),'#fff',C.BLUE);}},
aurelio5(t,S){bg('antartida');ground();
  guante(1000,PY-10,2,{});
  const j=t*1.4;baby(1000+Math.cos(j)*420,PY-Math.abs(Math.sin(j*2))*60,1.5,{walk:t*10,exp:'sweat',flip:Math.sin(j)>0});
  if(t>S.L(1))cartel(960,170,'entrenador muy callado',pop(t,S.L(1)+.2),52);},
cortejo(t,S){bg('antartida');ground();
  for(let i=0;i<6;i++)pingu(120+i*340,PY-260,.65,{exp:'love',flip:i%2===0,rot:Math.sin(t*3+i)*.06});
  pingu(560,PY,2.1,{exp:'love',rot:Math.sin(t*4)*.08});pingu(1380,PY,2.1,{flip:true,lips:true,exp:'chill'});
  for(let i=0;i<3;i++)heart(960+Math.sin(t*3+i)*50,GY-300-i*70-((t*40)%60),14+i*2);
  text('¡IIIIII!',560,GY-600,60,C.RED,'Gochi','center',-.05,8,'#fff');
  if(t>S.L(1))cartel(960,170,'una fiesta muy ruidosa',pop(t,S.L(1)+.3),54);},
camino(t,S){bg('antartida');ground();
  const p=seg(t,0,S.D);const x=lerp(100,1700,p);
  for(let i=0;i<14;i++){const fx=100+i*120;if(fx<x)E(fx,PY+10+(i%2)*14,10,6,'#B5C8D4',{lw:2});}
  pingu(x,PY,1.6,{walk:t*8,exp:'sweat',scarf:true});
  text('50 a +100 km',W/2,150,100*pop(t,.2),C.OUT,'Gochi','center',-.02,8,'#fff');
  if(t>S.L(1)){cartel(520,GY-450,'paradas: 0',pop(t,S.L(1)+.3),48);cartel(1000,GY-560,'baños: 0',pop(t,S.L(1)+.8),48);cartel(1450,GY-450,'señal: 0',pop(t,S.L(1)+1.3),48);}},
pareja(t,S){bg('antartida');ground();
  const sw=t>S.L(0)+1.2;
  pingu(520,PY,2,{exp:'love'});
  if(!sw)pingu(1380,PY,2,{flip:true,lips:true,exp:'love'});
  else{pingu(lerp(1380,2200,eio(seg(t,S.L(0)+1.2,S.L(0)+2.4))),PY,2,{flip:true,lips:true,exp:'sad'});pingu(lerp(2300,1380,eio(seg(t,S.L(0)+1.6,S.L(0)+2.8))),PY,2,{flip:true,lips:true,hat:true,exp:'love'});}
  heart(950,GY-260,24);text(sw?'año 2':'año 1',W/2,150,90,C.OUT,'Gochi','center',-.02,8,'#fff');
  if(t>S.L(1)){save(960,GY-80,pop(t,S.L(1)+.4));P([[-90,-20],[90,-30],[96,10],[-86,20]],'#C43A3A',{lw:3});R(40,0,34,100,6,'#C43A3A',{lw:3});restore();cartel(960,GY-300,'como las bufandas',pop(t,S.L(1)+.5),50);}},
ismael(t,S){bg('antartida');ground();
  const k=eo(seg(t,.2,1.5));
  baby(lerp(300,700,k),PY-(t>S.L(0)?0:0),1.7,{glasses:true,exp:'happy',walk:t*10});text('Ismael',lerp(300,700,k),GY-380,52,C.OUT,'Gochi','center',-.03,8,'#fff');
  if(t>S.L(0)+.5)ave(lerp(2100,1700,eo(seg(t,S.L(0)+.5,S.L(0)+2))),260,1,{flip:true,t,col:'#7A6A58'});
  if(t>S.L(1)){const q=pop(t,S.L(1)+.1);pingu(1000,PY,2*q,{glasses:true,exp:'love'});pingu(1500,PY,2*q,{flip:true,lips:true,exp:'love',egg:true});heart(1250,GY-420,22);text('laaa',1500,GY-620,60,C.RED,'Gochi','center',.05,8,'#fff');cartel(W/2,160,'qué suerte tiene el traidor',pop(t,S.L(1)+.5),52);}},
huevo2(t,S){bg('antartida');ground();nieve(t,20);
  const pass=eo(seg(t,.3,1.4));const away=t>S.L(1);
  const fx=away?lerp(620,-300,eio(seg(t,S.L(1)+.2,S.L(1)+3.4))):620;
  pingu(fx,PY,2,{lips:true,flip:away,exp:'chill',walk:away?t*9:0});
  pingu(1350,PY,2,{flip:true,exp:away?'sad':'shock',egg:pass>=1});
  if(pass<1)huevo(lerp(740,1230,pass),PY-40-Math.sin(pass*Math.PI)*80,1.6);
  if(away){text('grrr…',1350,GY-620,70*pop(t,S.L(1)+.5),C.RED,'Gochi','center',-.04,8,'#fff');cartel(960,170,'100+ días sin comer',pop(t,S.L(1)+.8),54);}},
vejez(t,S){bg('antartida');ground();
  const x=lerp(200,1500,seg(t,0,S.D));
  pingu(x,PY,2,{walk:t*3,glasses:true,exp:'chill',hold(){Ln(70,-120,70,0,{lw:8,col:'#8E6034'});Ln(70,-120,40,-130,{lw:8,col:'#8E6034'});}});
  cartel(960,170,'15 a 20 años',pop(t,.3),64);
  if(t>S.L(1))cartel(960,320,'igual de despacio que siempre',pop(t,S.L(1)+.5),48);},
hielo(t,S){bg('borde');
  const gap=Math.min(160,Math.max(0,(t-1)*30));
  P([[-40,872],[880-gap/2,868],[880-gap/2,H+40],[-40,H+40]],'#F4F8FA',{seed:81});
  P([[900+gap/2,868],[1300+gap/2,872],[1300+gap/2,H+40],[900+gap/2,H+40]],'#F4F8FA',{seed:82});
  baby(1100+gap/2,PY+4,1.8,{exp:'shock'});
  X.P([[1320,800],[W+40,800],[W+40,H+40],[1320,H+40]],'rgba(94,143,174,.7)',{stroke:false});wave(830,t,'#fff');
  cartel(960,170,'el hielo se derrite',pop(t,.4),60);
  if(t>S.L(1)){stick(300,PY-10,1.1,{sweat:true,hold(){R(46,-110,48,64,4,'#fff',{lw:3.4});Ln(54,-96,86,-96,{lw:2.4});Ln(54,-80,86,-80,{lw:2.4});}});cartel(300,GY-380,'científicos preocupados',pop(t,S.L(1)+.4),38);}},
fama(t,S){bg('noche');ground();
  for(let i=0;i<5;i++)baby(300+i*340,PY-280,.55*pop(t,.2+i*.15),{exp:'love'});
  pingu(960,PY,2.2,{exp:'chill',crown:true});
  cartel(1500,300,'documentales',pop(t,.4),44);cartel(400,300,'peluches',pop(t,.8),44);
  if(t>S.L(1)){stick(220,PY-10,1.1,{smile:true});bubble('¡qué lindo!',300,GY-460,48,1);stick(1700,PY-10,1.1,{sweat:true});bubble('yo ahí no vivo',1640,GY-460,44,-1);}},
cierre(t,S){bg('noche');ground();nieve(t,30);
  pingu(960,PY,2.4,{exp:t>S.L(1)?'chill':'sweat',crown:t>S.L(1)});
  if(t<S.L(1)){save(960,300,lerp(2.4,1,eo(seg(t,.2,.5))),-.06);R(-300,-90,600,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,170,C.RED,'Gochi');restore();}
  else{cartel(960,200,'el más grande del mundo',pop(t,S.L(1)+.3),60);cartel(960,310,'el mejor abrigado',pop(t,S.L(1)+1.2),52);}},
adios(t,S){bg('antartida');ground();nieve(t,60);
  guante(960,PY-10,2.4,{exp:'normal',smile:true});
  for(let i=0;i<5;i++)Ln(760+i*90,200,760+i*90,260,{lw:2,col:'#B5C8D4'});
  if(t>S.L(1))cartel(960,170,'nunca dijo nada',pop(t,S.L(1)+.2),64);},
sub(t,S){bg('antartida');ground();
  guante(700,PY-10,2.2,{exp:t>S.L(1)+1?'shock':'normal'});
  if(t>S.L(1)){foca(lerp(2300,1400,eo(seg(t,S.L(1),S.L(1)+2))),PY-100,1.3,{flip:true,exp:'angry',mouth:t>S.L(1)+1.8});}
  save(W/2,260,pop(t,.2));R(-300,-80,600,160,20,'#D81414',{lw:5});text('SUSCRÍBETE',0,6,100,'#fff','Gochi');restore();
  if(t>S.L(1)+1)text('¡AY!',700,GY-500,100,C.RED,'Gochi','center',-.05,8,'#fff');},
};
function drawShot(id,t,S){if(id.startsWith('cap'))return card(t,S);const f=SHOTS[id];if(!f)throw new Error('falta toma '+id);f(t,S);}
module.exports={drawShot};
