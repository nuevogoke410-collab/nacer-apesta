const X=require('./lib');const Q=require('./extra');
const {W,H,C,seg,lerp,eo,eio,back,rnd,cl,E,R,P,Ln,dot,save,restore,text,stick,chair,board,chalk,sign,bubble,impact,speed,smear,splat,confetti,zzz,grave,heart,drop,stroke,table,shape}=X;
const g=()=>X.g;
const {sea,bubbles,mega,anselmo,tooth,tooth2,ballena,iceberg,termometro,cartel,vitrina,blanco,pez,delfin,kelp,coral,rock,ink,MEG}=Q;
const pop=(t,a,d=.35)=>back(seg(t,a,a+d));
const on=(t,a,b=1e9)=>t>=a&&t<b;
const GY=840;
const tint=(c)=>{g().fillStyle=c;g().fillRect(0,0,W,H);};
const baby=(x,y,s,o={})=>mega(x,y,s,{baby:true,...o});
function xmark(x,y,s,k){if(k<=0)return;save(x,y,back(k)*s);Ln(-60,-60,60,60,{lw:14,col:C.RED});Ln(60,-60,-60,60,{lw:14,col:C.RED});restore();}
function bus(x,y,s=1){save(x,y,s);R(-300,-200,600,190,26,'#E9B530',{lw:4});R(-300,-380,600,170,26,'#E9B530',{lw:4});for(let i=0;i<6;i++){R(-270+i*92,-170,70,64,8,'#CFE8F3',{lw:3});R(-270+i*92,-350,70,64,8,'#CFE8F3',{lw:3});}E(-190,-8,44,44,'#333',{lw:4});E(190,-8,44,44,'#333',{lw:4});restore();}
function car(x,y,s=1){save(x,y,s);R(-130,-60,260,60,16,'#D9472B',{lw:4});R(-70,-110,140,56,14,'#D9472B',{lw:4});R(-56,-100,52,38,6,'#CFE8F3',{lw:3});R(8,-100,52,38,6,'#CFE8F3',{lw:3});E(-80,0,28,28,'#333',{lw:4});E(80,0,28,28,'#333',{lw:4});restore();}
function cake(x,y,t){X.cake(x,y,t);}
function tshirt(x,y,s=1,txt=''){save(x,y,s);P([[-100,-120],[-50,-140],[-20,-120],[20,-120],[50,-140],[100,-120],[130,-50],[80,-30],[70,-60],[70,60],[-70,60],[-70,-60],[-80,-30],[-130,-50]],'#6FA8C8',{lw:4});if(txt)text(txt,0,-10,36,C.OUT,'Patrick');restore();}
function phone(x,y,s=1,txt='0'){save(x,y,s);R(-60,-100,120,200,16,'#2E2E2E',{lw:3.4});R(-50,-84,100,150,6,'#CFE8F3',{lw:2.4});text(txt,0,-30,80,C.RED,'Gochi');text('llamadas',0,20,26,C.OUT,'Patrick');dot(0,82,8,'#777');restore();}
function card(t,S){sea('mar');bubbles(t,6,S.ch);const k=pop(t,.15,.5);save(W/2,420,k,-.02);R(-560,-190,1120,380,18,'#F4EEDC',{lw:4});
  text('Capítulo '+S.ch,0,-105,64,Q.MEGD||'#5E6C77','Patrick');text(S.title,0,40,S.title.length>16?96:126,C.OUT,'Gochi');restore();
  const x=lerp(-300,W+300,seg(t,0,S.D));
  baby(x,880+Math.sin(t*3)*10,.8,{t,exp:['normal','normal','normal','sweat','shock','sweat','love','chill'][S.ch-1],lips:S.ch===7});}
const SHOTS={
titulo(t,S){sea('mar');bubbles(t,8,1);
  text('Nacer como un',W/2,200,120*pop(t,0),C.OUT,'Gochi','center',-.03,10,'#fff');
  text('MEGALODÓN',W/2,390,210*pop(t,.3),'#6E7F8C','Gochi','center',.02,14,C.OUT);
  if(t>1.1){save(W/2+420,610,lerp(2.4,1,eo(seg(t,1.1,1.3))),-.12);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  mega(520,800,1.0*pop(t,.6),{t,exp:t>1.2?'sweat':'normal'});},
epoca(t,S){sea('arrecife');bubbles(t,6,2);
  text('hace 15 millones de años',W/2,170,78*pop(t,.2),C.OUT,'Gochi','center',-.02,8,'#fff');
  baby(560,640+Math.sin(t*3)*8,1.3,{t,exp:t>S.L(1)+.5?'sweat':'happy'});
  if(on(t,.8,S.L(1)+1.5))cartel(1450,430,'GUARDERÍA',pop(t,.8),50);
  if(t>S.L(1)+1.5)cartel(1450,430,'CUARTO DE BAÑO',pop(t,S.L(1)+1.5),50);},
tamano(t,S){sea('mar');bubbles(t,6,3);
  save(1500,GY,1);R(-170,-90,340,90,18,'#B3563E',{lw:4});R(-170,-150,340,80,18,'#C9674C',{lw:4});R(-190,-110,40,110,14,'#B3563E',{lw:4});R(150,-110,40,110,14,'#B3563E',{lw:4});restore();
  cartel(1500,GY-250,'sofá',pop(t,.4),36);
  baby(760,640+Math.sin(t*3)*8,1.4,{t,exp:'happy'});text('2 a 4 metros',760,420,70*pop(t,.3),C.OUT,'Gochi','center',-.03,8,'#fff');
  if(t>S.L(1)){const k=pop(t,S.L(1)+.1,.5);mega(1500,300,1.7*k,{t,flip:true,col:'#6F7E8A'});mega(300,260,1.5*k,{t,col:'#6F7E8A'});cartel(960,230,'los vecinos',k,32);}},
mama(t,S){sea('mar');bubbles(t,6,4);const aw=S.L(0)+S.dur(0)*.6,away=t>aw;
  const mx=away?lerp(760,-700,eio(seg(t,aw,aw+3.5))):760;
  mega(mx,560,1.9,{lips:true,flip:away,exp:'chill',t:away?t:0});
  baby(1500,780,1.0,{flip:true,t,exp:away?(t>aw+2?'sad':'shock'):'love'});
  if(on(t,.3,aw))heart(1330,620,16);
  if(t>S.L(1)){const k=pop(t,S.L(1)+.2,.4);save(1500,380,k,.05);R(-130,-80,260,160,6,'#fff',{lw:3});text('NOTA:',0,-30,44,C.OUT,'Patrick');Ln(-90,20,90,20,{lw:2.4,col:'#bbb'});text('(vacía)',0,50,30,C.OUT,'Patrick');restore();}},
hermanos(t,S){tint('#E9B9B0');
  E(960,560,640,400,'#F4C7C0',{lw:5});text('mamá',960,190,60,C.OUT,'Gochi','center',-.02);
  const nm=['Wilfrido','Heriberto','Eustaquio','Tú'],xs=[640,880,1120,1360],ys=[520,640,500,620];
  for(let i=0;i<4;i++){const gone=i<3&&t>S.L(1)+.8+i*.9;if(gone)continue;
    mega(xs[i],ys[i],.55*pop(t,.2+i*.3),{t,exp:i===3?(t>S.L(1)?'happy':'normal'):(t>S.L(1)+.5?'shock':'normal'),mouth:i===3&&t>S.L(1)?.5+Math.sin(t*14)*.3:0});
    cartel(xs[i],ys[i]-130,nm[i],pop(t,.5+i*.3),30);}
  for(let i=0;i<3;i++)if(t>S.L(1)+.8+i*.9&&t<S.L(1)+1.8+i*.9)text('ñam',xs[i],ys[i]-60,70,C.RED,'Gochi','center',.1,8,'#fff');},
wilfrido(t,S){sea('arrecife');bubbles(t,6,5);
  const out=seg(t,S.L(0)+.2,S.L(0)+2.2);
  mega(lerp(900,1500,eo(out)),lerp(700,520,eo(out)),.65,{t,glasses:out>.5,exp:out>.5?'happy':'sweat'});
  coral(900,GY+20,1.5,'#E0618F');coral(1040,GY+30,1.2,'#E9A53A');
  cartel(1500,380,'Wilfrido',pop(t,S.L(0)+2),34);
  baby(380,640+Math.sin(t*3)*8,1.0,{t,exp:t>S.L(1)?'angry':'sweat'});},
anselmo(t,S){sea('mar');bubbles(t,6,6);
  baby(520,700+Math.sin(t*3)*8,1.2,{t,exp:t<S.L(0)+1?'sad':'love'});
  const dx=lerp(2100,1250,eo(seg(t,S.L(0)+.2,S.L(0)+2.4)));
  anselmo(dx,300+Math.sin(t*4)*10,1.5,{exp:'happy'});
  if(t>S.L(0)+2.4){cartel(1250,170,'Anselmo',pop(t,S.L(0)+2.4),36);}
  if(t>S.L(1)){heart(900,430,18);heart(1000,380,14);}},
cuna(t,S){sea('arrecife');bubbles(t,6,7);
  const bk=pop(t,.3);save(1450,420,bk,.1);R(-110,-80,220,160,8,'#E9D9B4',{lw:4});text('MANUAL',0,-10,50,C.OUT,'Patrick');restore();xmark(1450,420,1.5,seg(t,.8,1.1));
  baby(500,680+Math.sin(t*3)*8,1.2,{t,exp:'normal',mouth:t>S.L(1)?.5:0});
  if(t>S.L(1)){for(let i=0;i<3;i++){const k=seg(t,S.L(1)+i*.4,S.L(1)+i*.4+.8);if(k<1)pez(lerp(1000,640,k),700-i*60,.35,{t});}
    text('aplausos: 0',1300,820,70*pop(t,S.L(1)+1.2),C.OUT,'Gochi','center',-.04,8,'#fff');}},
carnivoro(t,S){sea('mar');bubbles(t,6,8);
  baby(520,640,1.4,{t,exp:t<S.L(1)?'angry':'happy',mouth:t>S.L(1)?.4:0});
  save(1300,780,pop(t,.3));E(0,0,150,32,'#fff',{lw:3.4});E(0,-14,120,24,'#7FB04E',{lw:3});for(let i=0;i<6;i++)Ln(-90+i*34,-20,-80+i*34,-44,{lw:2.4,col:'#3F6332'});restore();
  xmark(1300,740,2.3,seg(t,.8,1.1));text('algas: 0',1300,560,70,C.OUT,'Gochi','center',-.03,8,'#fff');
  if(t>S.L(1))cartel(1650,420,'ensalada = cena',pop(t,S.L(1)+.5),32);},
dientes(t,S){sea('hondo');bubbles(t,6,9);
  mega(500,560,1.5,{t,mouth:.6+Math.sin(t*5)*.1,exp:'happy'});
  const k=pop(t,.4);tooth2(1250,GY+20,2.0*k,0);tooth2(1620,GY+20,.56*k,0);
  cartel(1250,GY-290,'megalodón: 18 cm',k,32);cartel(1620,GY-120,'gran blanco: 5 cm',k,32);
  if(t>S.L(1)){text('envidia',1500,300,80*pop(t,S.L(1)+.2),C.RED,'Gochi','center',.05,10,'#fff');}},
cambio(t,S){sea('hondo');bubbles(t,6,10);
  baby(560,560,1.6,{t,mouth:.7,exp:'sweat'});
  for(let i=0;i<8;i++){const k=((t*.5+i/8)%1);tooth(760+i*30+Math.sin(i)*20,lerp(560,GY,k*k),.5,k*6+i);}
  if(t>S.L(1)){const k=pop(t,S.L(1)+.2);save(1500,GY-60,k);E(0,-30,40,30,'#B9B2A8',{lw:3});E(30,-70,10,10,'#B9B2A8',{lw:2.6});E(-10,-70,10,10,'#B9B2A8',{lw:2.6});dot(24,-40,3.5);R(-80,-190,160,60,8,'#fff',{lw:3});text('EN QUIEBRA',0,-160,34,C.RED,'Patrick');restore();}},
ballena(t,S){sea('hondo');bubbles(t,6,11);
  const hit=S.L(1)+.6;
  const bx=t<hit?lerp(1000,1300,seg(t,0,hit)):1300+seg(t,hit,hit+2)*500;
  ballena(bx,520,1.1,{exp:t>hit?'shock':'normal'});
  mega(lerp(120,900,eio(seg(t,0,hit))),560,1.1,{t,mouth:t>hit-.3&&t<hit+.8?1:.1,exp:'angry'});
  if(t>hit-.4)impact('¡ÑAM!',1000,300,seg(t,hit,hit+1.2));
  if(t>S.L(0)+1&&t<hit)cartel(1450,300,'primero la cola',pop(t,S.L(0)+1),34);},
huesos(t,S){sea('hondo');bubbles(t,5,12);
  P([[-40,GY],[W+40,GY-10],[W+40,H+40],[-40,H+40]],'#E0D0A4',{seed:3});
  for(let i=0;i<5;i++){const a=i*.12;stroke([[300+i*90,GY],[330+i*90,GY-230],[560+i*90,GY-300],[640+i*90,GY-60]].map(p=>p),{lw:20,col:C.OUT,noJit:true});stroke([[300+i*90,GY],[330+i*90,GY-230],[560+i*90,GY-300],[640+i*90,GY-60]],{lw:13,col:'#F4EEDC',noJit:true});}
  tooth(780,GY-250,1.6*pop(t,.5),-.6);
  cartel(1380,GY-380,'diente clavado',pop(t,.8),36);
  if(t>S.L(1)){const k=pop(t,S.L(1)+.2);save(1450,300,k,-.04);R(-260,-60,520,120,10,'#F4EEDC',{lw:4});text('DEDICATORIA',0,0,70,C.RED,'Gochi');restore();}},
delfines(t,S){sea('mar');bubbles(t,6,13);
  const hit=S.L(1)+.8;
  if(t<hit)delfin(lerp(2100,900,eo(seg(t,0,hit)))+Math.sin(t*6)*20,360+Math.sin(t*5)*60,.8,{flip:true});
  cartel(1500,230,'listo y veloz',pop(t,.5),32);
  mega(500,640,1.5,{t,mouth:t>hit-.4?.9:0,exp:t>hit?'happy':'angry'});
  if(t>hit)impact('¡ÑAM!',1000,420,seg(t,hit,hit+1.2));},
heriberto(t,S){sea('arrecife');bubbles(t,6,14);const hit=S.L(1)+1.2;
  baby(540,680,1.5,{t,exp:t<hit?'normal':'happy',mouth:t>hit-.5?.8:0});
  if(t<hit)pez(lerp(1900,1250,eo(seg(t,0,S.L(1)))),620+Math.sin(t*3)*14,.8,{t,flip:false});
  if(on(t,S.L(0)+.2,S.L(1)))bubble('¿Qué tal la comida?',1300,380,38,-1);
  if(t>hit){smear(1000,660,seg(t,hit,hit+.6),1.2,3);grave(1500,GY+10,'Pepe');}},
solo(t,S){sea('hondo');bubbles(t,5,15);
  save(1450,0,1);R(0,GY-200,300,22,4,'#A8743F');R(40,GY-180,18,180,4,'#8E6034');R(240,GY-180,18,180,4,'#8E6034');restore();
  for(let i=0;i<4;i++){const bx=1480+i*70,by=GY-420+Math.sin(t*2+i)*10;Ln(bx,by+50,bx,GY-200,{lw:2.4});E(bx,by,28,34,[C.PINK,C.YEL,C.BLUE,'#7FA34A'][i],{lw:3});}
  cake(1600,GY-200,t);sign(1450,GY-340,'FIESTA',50);
  mega(560,600,1.5,{t,hat:true,exp:'sad'});
  if(t>S.L(1)){save(1000,300,pop(t,S.L(1)+.2),.1);R(-90,-60,180,120,8,'#fff',{lw:3});text('✉',0,0,10,C.OUT);restore();xmark(1000,300,1.2,seg(t,S.L(1)+.6,S.L(1)+.9));}},
tamano2(t,S){sea('hondo');bubbles(t,5,16);
  mega(lerp(-300,2100,eio(seg(t,0,S.D))),520,2.2,{t,exp:'normal'});
  bus(420,GY+20,.8);cartel(420,GY-340,'autobús doble',pop(t,.4),32);
  text('15 a 18 metros',W/2,170,80*pop(t,.3),C.OUT,'Gochi','center',-.02,9,'#fff');},
esqueleto(t,S){sea('hondo');bubbles(t,5,17);
  mega(520,560,1.6,{t,exp:'happy'});
  const k=pop(t,.5);Ln(1140,380,880,500,{lw:4});cartel(1300,360,'cartílago, como tu nariz',k,34);
  if(t>S.L(1)){const kk=pop(t,S.L(1)+.1);for(let i=0;i<14;i++)tooth(1000+i*60,GY+20,.7*kk,0);text('fósiles: dientes',1400,GY-120,56*kk,C.OUT,'Gochi','center',-.02,8,'#fff');}},
velocidad(t,S){sea('mar');bubbles(t,5,18);
  mega(lerp(100,900,seg(t,0,S.D)),500,1.3,{t:t*.5,exp:'chill'});
  save(1500,380,pop(t,.3));R(-8,0,16,160,3,'#A8743F');E(0,-40,86,86,'#fff',{lw:9,col:C.RED});text('3',0,-40,80,C.OUT,'Gochi');text('km/h',0,28,28,C.OUT,'Patrick');restore();
  X.turtle(lerp(-200,2200,seg(t,S.L(1)-.5,S.D)),GY,1.5);
  if(t>S.L(1))cartel(900,GY-160,'tortuga',pop(t,S.L(1)+.2),32);},
mundo(t,S){tint('#CFE6F0');const K='#7FA05A';
  E(420,420,170,220,K,{lw:3.4});E(540,720,90,140,K,{lw:3.4});E(1000,380,110,120,K,{lw:3.4});E(1050,640,100,170,K,{lw:3.4});E(1450,420,300,160,K,{lw:3.4});E(1650,740,100,60,K,{lw:3.4});
  P([[300,950],[1700,950],[1650,1040],[350,1040]],'#fff',{lw:3.4});text('Antártida',W/2,995,40,C.OUT,'Patrick');
  [[420,360],[540,700],[1000,340],[1050,620],[1380,400],[1560,440],[1650,730]].forEach((p,i)=>tooth(p[0],p[1]+30,.8*pop(t,.3+i*.35),0));
  xmark(W/2,970,.9,seg(t,3,3.4));
  if(t>S.L(1)){text('¿alguien escribe?',W/2,180,70*pop(t,S.L(1)+.2),C.RED,'Gochi','center',-.03,9,'#fff');}},
anselmo2(t,S){sea('mar');bubbles(t,5,19);
  baby(520,680+Math.sin(t*3)*8,1.3,{t,exp:'love'});anselmo(1250,420+Math.sin(t*4)*10,1.5,{exp:'happy'});heart(900,480,16);
  if(t>S.L(1)){const fx=lerp(1900,1500,eo(seg(t,S.L(1),S.L(1)+1.2)));pez(fx,720,.7,{t,flip:true});bubble('¡Monstruo!',fx-30,590,36,1);}},
lista(t,S){sea('hondo');bubbles(t,5,20);
  baby(420,720,1.0,{t,exp:'shock'});
  mega(1200,450,2.0,{t,flip:true,mouth:.3,exp:'angry'});cartel(1250,170,'otros megalodones',pop(t,.4),38);
  if(t>S.L(1)){text('muy de familia',W/2,880,70*pop(t,S.L(1)+.2),C.OUT,'Gochi','center',-.03,9,'#fff');}},
eustaquio(t,S){sea('arrecife');bubbles(t,5,21);const hit=S.L(1)+.8;
  if(t<hit)baby(760,720,1.4,{t,exp:'sweat'});
  kelp(900,GY+20,70,3);cartel(1100,GY-200,'alga: 10 cm',pop(t,.4),32);
  if(t>S.L(0)){const k=eo(seg(t,S.L(0)+.5,hit));mega(lerp(2300,1100,k),560,1.9,{t,flip:true,mouth:k>.7?.9:0,exp:'angry'});}
  if(t>hit){impact('¡ÑAM!',800,450,seg(t,hit,hit+1.2));grave(560,GY+10,'Eustaquio');}},
adulto(t,S){sea('mar');bubbles(t,5,22);
  for(let i=0;i<6;i++){const k=eo(seg(t,.2+i*.2,2.5+i*.2));pez(lerp(300+i*250,i<3?-200:2100,k),300+i*90,.5,{t,flip:i<3});}
  mega(960,600,1.8,{t,crown:true,exp:'chill'});
  if(t>S.L(1)){text('el jefe',960,260,110*pop(t,S.L(1)+.1),C.RED,'Gochi','center',-.03,10,'#fff');}},
humanos(t,S){sea('mar');bubbles(t,5,23);
  mega(520,700,1.2,{t,exp:'chill'});
  const k=pop(t,.3);save(1300,300,k,-.04);R(-250,-120,500,240,12,'#F4EEDC',{lw:4});text('faltan',0,-60,50,C.OUT,'Patrick');text('15 millones',0,10,90,C.RED,'Gochi');text('de años',0,76,50,C.OUT,'Patrick');restore();
  if(t>S.L(1)){tshirt(1500,760,1.2*pop(t,S.L(1)+.1),'MEGA');xmark(1500,720,2,seg(t,S.L(1)+.7,S.L(1)+1));}},
peligro(t,S){sea('hondo');bubbles(t,5,24);tint('rgba(150,190,225,'+(0.1+0.25*seg(t,0,S.D)).toFixed(2)+')');
  for(let i=0;i<5;i++)iceberg(150+i*430,170,1.2);
  termometro(1700,640,1.2,1-seg(t,0,S.D)*.8);
  mega(700,620,1.6,{t,exp:'sweat'});text('brrr',700+Math.sin(t*40)*4,330,90,'#6FA8C8','Patrick','center',-.05,9,'#fff');},
super(t,S){sea('hondo');bubbles(t,5,25);
  mega(500,560,1.5+Math.sin(t*8)*.03,{t,mouth:.5+.4*Math.abs(Math.sin(t*3)),exp:'angry'});
  const k=eo(seg(t,.3,1.6));R(1200,GY-6,120,6,0,'#C9B98A',{lw:3});R(1480,GY-520*k,160,520*k,0,C.RED,{lw:4});
  text('humano',1260,GY+30,34,C.OUT,'Patrick');text('megalodón',1560,GY+30,34,C.OUT,'Patrick');text('1.317 N',1260,GY-40,32,C.OUT,'Patrick');text('108.000 a 182.000 N',1560,GY-520*k-30,34,C.RED,'Patrick');},
mandibula(t,S){sea('hondo');bubbles(t,5,26);
  mega(560,600,2.3,{t,mouth:1,exp:'normal'});
  const cx=lerp(1900,1160,eo(seg(t,.3,S.L(1)+1)));car(cx,GY+20,.7);
  text('casi 3 metros de ancho',W/2,160,70,C.OUT,'Gochi','center',-.02,9,'#fff');
  if(t>S.L(1)+.6){save(1500,380,pop(t,S.L(1)+.6),.05);E(0,0,70,70,null,{lw:12,col:C.RED});Ln(-50,-50,50,50,{lw:12,col:C.RED});text('no lo hagas',0,110,40,C.OUT,'Patrick');restore();}},
fosil(t,S){sea('museo');
  table(500,640,900);sign(300,420,'PIEDRAS MÁGICAS',46,520);
  for(let i=0;i<4;i++)tooth2(640+i*220,640,1.0*pop(t,.3+i*.2),(i-1.5)*.1);
  stick(1650,GY+30,1.3,{arms:[[-60,-120],[60,-140]],smile:true});
  if(t>S.L(0)+.4)cartel(1000,500,'lenguas de dragón',pop(t,S.L(0)+.4),40);
  if(t>S.L(1)){save(1000,250,pop(t,S.L(1)+.1),-.05);R(-300,-70,600,140,12,null,{lw:9,col:C.RED});text('SON MIS DIENTES',0,4,76,C.RED,'Gochi');restore();}},
lluvia(t,S){sea('hondo');bubbles(t,5,27);
  P([[-40,GY],[W+40,GY-10],[W+40,H+40],[-40,H+40]],'#E0D0A4',{seed:3});
  for(let i=0;i<24;i++){const k=((t*.35+rnd(i)*1)%1);tooth(80+rnd(i*3)*1760,lerp(-50,GY,k),.6+rnd(i)*.4,k*5+i);}
  for(let i=0;i<22;i++)tooth(100+i*82,GY+10+(i%2)*30,.5,0);
  if(t>S.L(1)){sign(1500,GY-250,'DIENTES SIN DUEÑO',44,620);}},
anselmo3(t,S){sea('mar');bubbles(t,5,28);const hit=S.L(0)+1.5;
  const bx=t<hit?lerp(300,820,eo(seg(t,S.L(0),hit))):820-seg(t,hit,hit+.5)*80;
  baby(bx,600,1.4,{t,mouth:t>hit-.4&&t<hit+.3?.9:.1,exp:t<hit?'love':'shock'});
  anselmo(1250+(t>hit?Math.sin(t*20)*8:0),520,1.6,{exp:'happy'});
  if(t>hit)impact('¡PLONC!',1100,330,seg(t,hit,hit+1.2));
  if(t>S.L(1)){const k=seg(t,S.L(1),S.L(1)+1.2);tooth(lerp(950,900,k),lerp(600,GY,k*k),1.2,k*6);if(k>.7)tooth(960,640,1.2*pop(t,S.L(1)+.9),0);}},
practica(t,S){sea('hondo');bubbles(t,5,29);const k=seg(t,0,S.D*.7);
  ballena(lerp(900,2100,eo(k)),460,.9,{exp:'shock'});
  baby(lerp(200,1100,eio(k)),640,1.1,{t,mouth:.8,exp:'angry'});
  if(t>S.L(1)){const kk=seg(t,S.L(1),S.L(1)+3);cartel(lerp(1000,1800,kk),300-kk*120,'orgullo',pop(t,S.L(1)),38);}},
pez(t,S){sea('arrecife');bubbles(t,5,30);
  baby(480,680,1.3,{t,mouth:t<S.L(1)?.8:0,exp:t<S.L(1)?'normal':'sad'});
  pez(lerp(900,2100,eo(seg(t,S.L(0)+.3,S.L(1)+1.5))),640+Math.sin(t*9)*20,.9,{t});
  if(t>S.L(1))bubble('ja ja ja',1500,460,40,-1);
  text('fracasos: 1',1400,200,70*pop(t,S.L(1)),C.RED,'Gochi','center',-.03,9,'#fff');},
emboscada(t,S){sea('hondo');bubbles(t,5,31);const up=seg(t,S.L(1)+.8,S.L(1)+2.4);
  rock(900,GY+10,100,60,'#8C8C86',2);
  mega(lerp(700,1200,eo(up)),lerp(GY-120,420,eo(up)),1.5,{t,rot:-up*.5,mouth:up>.6?.9:0,exp:'angry'});
  if(t<S.L(1))text('shhh',700,GY-300,80*pop(t,.3),C.OUT,'Gochi','center',.05,9,'#fff');
  pez(1500,400,.8,{t});
  if(t>S.L(1)+2.2)impact('¡ÑAM!',1300,300,seg(t,S.L(1)+2.2,S.L(1)+3.2));},
vida(t,S){sea('mar');bubbles(t,5,32);
  cake(560,GY,t);text('???',560,GY-300,120*pop(t,.3),C.RED,'Gochi','center',-.04,10,'#fff');
  mega(1250,600,1.3,{t,hat:true,exp:'happy'});
  if(t>S.L(1)){save(1650,300,pop(t,S.L(1)+.1),.1);R(-120,-90,240,180,6,'#F4EEDC',{lw:4});text('DIPLOMA',0,-20,40,C.OUT,'Patrick');restore();xmark(1650,300,1.5,seg(t,S.L(1)+.8,S.L(1)+1.1));}},
anselmo4(t,S){sea('mar');bubbles(t,5,33);
  const dx=1100+Math.sin(t*1.6)*400;
  anselmo(dx,380+Math.sin(t*4)*12,1.5,{exp:'happy'});
  const bx=cl(dx-330,200,1500);baby(bx,640,1.3,{t,exp:t>S.L(1)?'love':'normal'});
  if(t>S.L(1)){heart(bx+260,420,16);}},
cortejo(t,S){sea('arrecife');bubbles(t,5,34);
  mega(480,640,1.3,{t,exp:'love',flower:true});
  mega(1450,640,1.3,{t,flip:true,lips:true,exp:'chill'});
  for(let i=0;i<3;i++)heart(960,500-i*70,12+i*3+Math.sin(t*5+i)*2);
  if(t>S.L(0)+.5){save(960,230,pop(t,S.L(0)+.5),.05);R(-130,-80,260,160,6,'#fff',{lw:3});text('CARTAS:',0,-30,40,C.OUT,'Patrick');text('0',0,40,70,C.RED,'Gochi');restore();}},
crias(t,S){sea('mar');bubbles(t,5,35);const aw=S.L(1)-.5,away=t>aw;
  mega(away?lerp(1300,2300,eio(seg(t,aw,aw+3))):1300,560,1.7,{t,lips:true,flip:!away,exp:'chill'});
  mega(520,660,1.5,{t,exp:t>aw+1.5?'sad':'happy'});
  baby(900,820,.55,{t,exp:'happy'});
  if(t>S.L(0)+1)cartel(900,700,'aguas poco profundas',pop(t,S.L(0)+1),30);},
wilfrido2(t,S){sea('arrecife');bubbles(t,5,36);
  mega(420,640,1.1,{t,glasses:true,exp:'happy'});cartel(420,480,'Wilfrido',pop(t,.3),34);
  save(1500,GY,1);R(-190,-220,380,220,6,'#E0C79A',{lw:4});P([[-230,-220],[0,-360],[230,-220]],'#B3563E',{lw:4});R(-80,-140,160,140,6,'#CFE8F3',{lw:4});text('vista al mar',0,-80,26,C.OUT,'Patrick');restore();
  for(let i=0;i<18;i++){const k=pop(t,S.L(1)+i*.12);if(k>0)mega(760+(i%6)*100,380+Math.floor(i/6)*110+Math.sin(t*3+i)*6,.2*k,{t:t+i,exp:'happy'});}
  if(t>S.L(1)+1.5)text('18',1000,180,170*pop(t,S.L(1)+1.5),C.RED,'Gochi','center',-.03,12,'#fff');},
vejez(t,S){sea('hondo');bubbles(t,4,37);
  mega(lerp(300,900,seg(t,0,S.D)),600,1.6,{t:t*.3,glasses:true,exp:'sad'});
  sign(1600,GY-250,'JUBILACIÓN: 0',46,520);
  if(t>S.L(1)){P([[560,520],[640,490],[640,540]],'#fff',{lw:3});}},
frio(t,S){sea('hondo');bubbles(t,5,38);tint('rgba(150,190,225,.3)');
  for(let i=0;i<5;i++)iceberg(150+i*430,170,1.2);
  termometro(1750,700,1,.1);
  const k=eo(seg(t,S.L(1),S.L(1)+3));
  ballena(lerp(1000,2300,k),480,.9,{exp:'shock'});
  blanco(lerp(2000,1500,k),620,.8,{flip:true,mouth:true});blanco(lerp(2300,1700,k),380,.7,{flip:true,mouth:true});
  mega(420,640,1.3,{t,exp:'sweat'});
  if(t>S.L(1)+1.5)text('ballenas: 0',700,230,80*pop(t,S.L(1)+1.5),C.RED,'Gochi','center',-.03,10,'#fff');},
fin(t,S){sea('hondo');bubbles(t,4,39);
  P([[-40,GY],[W+40,GY-10],[W+40,H+40],[-40,H+40]],'#E0D0A4',{seed:3});
  const k=eo(seg(t,0,2.5));mega(560,lerp(300,GY-90,k),1.2,{t:0,rot:lerp(0,.35,k),exp:'dead'});
  if(t>S.L(1)){const kk=pop(t,S.L(1)+.1);save(1450,400,kk,-.03);R(-260,-170,520,300,12,'#2E2E3A',{lw:5});R(-236,-146,472,252,6,'#5E8FAE',{lw:3});text('¡MEGALODÓN REAL!',0,-60,40,'#fff','Patrick');mega(0,0,.4,{exp:'normal'});R(-60,130,120,40,4,'#555',{lw:3});restore();
    if(t>S.L(1)+1){save(1450,420,pop(t,S.L(1)+1),-.15);R(-210,-60,420,120,12,null,{lw:10,col:C.RED});text('FALSO',0,2,100,C.RED,'Gochi');restore();}}},
steno(t,S){sea('museo');
  board(160,180,740,360,'#3F5E3A');chalk('1667',230,300,110,seg(t,.4,1.4));
  chalk('lengua de dragón',230,420,56,seg(t,S.L(1)-.5,S.L(1)+.5));
  if(t>S.L(1)+.8){Ln(220,430,800,430,{lw:6,col:C.RED});chalk('diente',560,480,60,seg(t,S.L(1)+1,S.L(1)+1.8),'#F2D35A');}
  stick(1350,GY+30,1.5,{smile:true,arms:[[-60,-90],[70,-170]],hold:()=>tooth(78,-180,.8,0)});
  cartel(1350,360,'Nicolás Steno',pop(t,.4),36);
  tooth2(1700,GY-20,1.3*pop(t,S.L(1)),0);},
fama(t,S){sea('museo');
  save(360,420,pop(t,.2),-.03);R(-210,-290,420,580,8,'#223B58',{lw:5});mega(0,-30,.9,{t,mouth:.6,exp:'angry'});text('MEGALODÓN',0,-200,56,'#F2D35A','Patrick');restore();
  baby(1000,GY-110,.9,{t,exp:'happy'});cartel(1000,GY-270,'peluche',pop(t,.8),34);
  tshirt(1500,420,1.4*pop(t,1.1),'MEGA');
  if(t>S.L(1))phone(1700,780,1.1*pop(t,S.L(1)+.1),'0');},
cierre(t,S){sea('mar');bubbles(t,8,40);
  mega(960,600+Math.sin(t*2)*10,1.9,{t,crown:true,exp:t<S.L(1)?'sad':'chill'});
  if(t>S.L(1)){text('rey del mar',960,230,120*pop(t,S.L(1)+.1),C.RED,'Gochi','center',-.03,11,'#fff');confetti(t);}},
adios(t,S){sea('museo');
  vitrina(220,300,620,520);tooth2(530,800,2.8*pop(t,.2),0);cartel(530,860,'MEGALODÓN',pop(t,.4),30);
  vitrina(1100,500,520,320);anselmo(1360,800,2.2,{exp:'happy'});cartel(1360,870,'pato de hule',pop(t,S.L(0)+.5),30);
  if(t>S.L(1))heart(1360,430,18);},
sub(t,S){sea('mar');bubbles(t,6,41);
  anselmo(560,760+Math.sin(t*3)*10,2.0,{exp:t>S.L(1)?'shock':'happy'});
  text('SUSCRÍBETE',W/2,200,130*pop(t,.2),C.RED,'Gochi','center',-.03,12,'#fff');
  if(t>S.L(1)){const k=eo(seg(t,S.L(1)+.2,S.L(1)+2.2));blanco(lerp(2400,1100,k),640,1.3,{flip:true,mouth:true});}
  if(t>S.L(1)+2.4)impact('¡ÑAM!',900,420,seg(t,S.L(1)+2.4,S.L(1)+3.5));},
};
function drawShot(id,t,S){if(id.startsWith('cap'))return card(t,S);const f=SHOTS[id];if(!f)throw new Error('falta toma '+id);f(t,S);}
module.exports={drawShot};
