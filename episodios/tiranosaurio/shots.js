const X=require('./lib');const Q=require('./extra');
const {W,H,C,seg,lerp,eo,eio,back,rnd,cl,E,R,P,Ln,dot,save,restore,text,stick,chair,board,chalk,sign,bubble,impact,speed,smear,splat,confetti,flies,zzz,grave,heart,drop,bird,stroke,table,shape}=X;
const g=()=>X.g;
const {cret,rex,rufino,tricera,pico,meteor,egg,nest,fern,cycad,rainfall,REX,REXB,REXD,ROCK}=Q;
const pop=(t,a,d=.35)=>back(seg(t,a,a+d));
const on=(t,a,b=1e9)=>t>=a&&t<b;
const GY=940;
function tag(x,y,txt,k,size=34){if(k<=0)return;g().font=`${size}px Patrick`;const w=g().measureText(txt).width+34;save(x,y,back(k));R(-w/2,-26,w,50,8,'#fff',{lw:2.6});text(txt,0,0,size,C.OUT,'Patrick');restore();}
const baby=(x,y,s,o={})=>rex(x,y,s,{baby:true,...o});
function bus(x,y,s=1){save(x,y,s);R(-300,-200,600,190,26,'#E9B530',{lw:4});for(let i=0;i<6;i++)R(-270+i*92,-170,70,64,8,'#CFE8F3',{lw:3});R(-300,-80,600,14,0,'#7A5A1A',{lw:2});E(-190,-8,44,44,'#333',{lw:4});E(190,-8,44,44,'#333',{lw:4});restore();}
function banana(x,y,s=1,rot=0){save(x,y,s,rot);P([[-60,0],[-30,24],[30,24],[64,-10],[70,-30],[56,-26],[24,0],[-30,4]],'#F2D23C',{lw:3,seed:5});dot(68,-30,5,'#6B4423');restore();}
function tooth(x,y,s=1,rot=0){save(x,y,s,rot);P([[-14,0],[14,0],[6,-50],[0,-62],[-6,-50]],'#fff',{lw:3});restore();}
function bone(x,y,s=1,rot=0,brk=0){save(x,y,s,rot);if(!brk){R(-90,-12,180,24,10,'#F4EEDC',{lw:3});for(const sx of[-1,1]){E(sx*98,-14,18,18,'#F4EEDC',{lw:3});E(sx*98,14,18,18,'#F4EEDC',{lw:3});}}
 else{save(-brk*30,-brk*20,1,-brk*.4);R(-90,-12,92,24,10,'#F4EEDC',{lw:3});E(-98,-14,18,18,'#F4EEDC',{lw:3});E(-98,14,18,18,'#F4EEDC',{lw:3});restore();save(brk*30,brk*20,1,brk*.4);R(-2,-12,92,24,10,'#F4EEDC',{lw:3});E(98,-14,18,18,'#F4EEDC',{lw:3});E(98,14,18,18,'#F4EEDC',{lw:3});restore();}restore();}
function skull(x,y,s=1,rot=0){save(x,y,s,rot);P([[-100,-20],[-80,-90],[10,-110],[100,-80],[140,-50],[140,-20],[60,-10],[-20,0]],'#F4EEDC',{lw:3.4,seed:8});
 E(-10,-60,24,22,C.OUT,{lw:2});for(let i=0;i<6;i++)P([[20+i*20,-14],[32+i*20,-14],[26+i*20,6]],'#fff',{lw:2});P([[-60,0],[130,-8],[110,26],[-40,30]],'#F4EEDC',{lw:3});restore();}
function bandage(x,y,w,h,rot=0){save(x,y,1,rot);R(-w/2,-h/2,w,h,6,'#fff',{lw:3});for(let i=-2;i<=2;i++)Ln(i*w/6,-h/2,i*w/6+8,h/2,{lw:2});restore();}
function cane(x,y,s=1){save(x,y,s);stroke([[0,0],[0,-140],[26,-160],[44,-140]],{lw:9,col:'#8E6034'});stroke([[0,0],[0,-140],[26,-160],[44,-140]],{lw:4,col:'#A8743F',noJit:true});restore();}
function phone(x,y,s=1,txt='0'){save(x,y,s);R(-60,-100,120,200,16,'#2E2E2E',{lw:3.4});R(-50,-84,100,150,6,'#CFE8F3',{lw:2.4});text(txt,0,-30,80,C.RED,'Gochi');text('llamadas',0,20,26,C.OUT,'Patrick');dot(0,82,8,'#777');restore();}
function xmark(x,y,s,k){if(k<=0)return;save(x,y,back(k)*s);Ln(-60,-60,60,60,{lw:14,col:C.RED});Ln(60,-60,-60,60,{lw:14,col:C.RED});restore();}
function card(t,S){cret('dia');const k=pop(t,.15,.5);save(W/2,400,k,-.02);R(-560,-190,1120,380,18,'#F4EEDC',{lw:4});
  text('Capítulo '+S.ch,0,-105,64,REXD,'Patrick');text(S.title,0,40,S.title.length>16?96:126,C.OUT,'Gochi');restore();
  const x=lerp(-300,W+300,seg(t,0,S.D));
  baby(x,GY+20,2.1,{walk:t*10,exp:['normal','normal','normal','sweat','shock','sweat','love','chill'][S.ch-1],lips:S.ch===7,feathers:S.ch===1});}
const SHOTS={
titulo(t,S){cret('dia');
  text('Nacer como un',W/2,200,110*pop(t,0),C.OUT,'Gochi','center',-.03,10,'#fff');
  text('TIRANOSAURIO REX',W/2,380,190*pop(t,.3),REX,'Gochi','center',.02,14,C.OUT);
  if(t>1.1){save(W/2+450,620,lerp(2.4,1,eo(seg(t,1.1,1.3))),-.12);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  rex(1450,GY+20,1.15,{flip:true,exp:t>1.2?'sweat':'normal',walk:0});},
epoca(t,S){cret('dia');
  text('hace 68 millones de años',W/2,150,80*pop(t,.2),C.OUT,'Gochi','center',-.02,8,'#fff');
  const wk=t*5;tricera(lerp(1900,1500,eo(seg(t,0,4))),640,.45,{flip:true,walk:wk});pico(lerp(-100,300,eo(seg(t,0,4))),640,.45,{walk:wk});
  baby(620,GY,2.3,{exp:t>S.L(1)+.5?'sweat':'happy',feathers:true});
  if(t>S.L(1)){const k=seg(t,S.L(1),S.L(1)+4);meteor(lerp(1700,1450,k),lerp(50,230,k),.3,t);tag(1450,330,'próximamente',pop(t,S.L(1)+.8),38);}},
huevo(t,S){cret('dia');nest(960,GY,1.8);
  const wob=Math.sin(t*14)*.08*(t<S.L(1)?1:0);egg(960,GY-30,1.7,{rot:wob,crack:t>1.2});
  if(t>.6)text('?',1300,420,240*pop(t,.6),C.RED,'Gochi','center',.12,12,'#fff');
  if(t>S.L(1)){const k=pop(t,S.L(1)+.1,.5);save(420,520,k,-.04);R(-250,-130,500,260,10,'#F4EEDC',{lw:4});text('ORIGEN',0,-70,56,C.OUT,'Patrick');text('misterio',0,30,100,C.RED,'Gochi','center',-.04);restore();}},
mama(t,S){cret('dia');const aw=S.L(0)+S.dur(0)*.6;const away=t>aw;
  const mx=away?lerp(900,-800,eio(seg(t,aw,aw+3.5))):900;
  rex(mx,GY,1.15,{lips:true,flip:away,exp:'chill',walk:away?t*9:0});
  baby(1500,GY,2.1,{flip:true,exp:away?(t>aw+2?'sad':'shock'):'love',feathers:true});
  if(on(t,.3,aw))heart(1330,720,16);
  if(t>S.L(1)){const k=pop(t,S.L(1)+.2,.4);save(1500,430,k,.05);R(-130,-80,260,160,6,'#fff',{lw:3});text('NOTA:',0,-30,44,C.OUT,'Patrick');Ln(-90,20,90,20,{lw:2.4,col:'#bbb'});text('(vacía)',0,50,30,C.OUT,'Patrick');restore();flies(1500,520,t,2);}},
plumas(t,S){cret('dia');
  baby(560,GY,2.4,{feathers:true,exp:t>S.L(1)?'sweat':'happy'});
  const k=pop(t,S.L(0)+.4,.4);save(1350,600,k);E(0,0,60,56,'#F2D35A',{lw:3.4});P([[40,-6],[84,0],[40,12]],'#E99A2E',{lw:2.6});dot(14,-14,5);restore();tag(1350,490,'pollito gigante',k,34);
  if(t>S.L(1)){const sh=Math.sin(t*40)*4;text('brrr',560+sh,360,90,'#6FA8C8','Gochi','center',-.05,8,'#fff');}
  if(t>S.L(0))text('?',900,420,180*pop(t,S.L(0)+1),C.RED,'Gochi','center',.1,10,'#fff');},
hermanos(t,S){cret('dia');
  const nm=['Ambrosio','Hermenegildo','Casimiro'],xs=[330,930,1530],ys=[GY-20,GY+10,GY-20];
  for(let i=0;i<3;i++){baby(xs[i],ys[i],1.5*pop(t,.2+i*.5),{exp:t>S.L(1)?'sweat':'happy',feathers:true});tag(xs[i]+80,ys[i]-210,nm[i],pop(t,.5+i*.5),32);}},
rufino(t,S){cret('dia');
  baby(560,GY,2.3,{exp:t<S.L(1)?'sad':'love',feathers:true});
  const rx=lerp(2100,1250,eo(seg(t,S.L(0)+.4,S.L(0)+2.6)));
  rufino(rx,GY,1.6,{exp:'happy',wave:true,t});
  if(t>S.L(1)){heart(900,650,18);heart(1000,610,14);}
  if(t>S.L(0)+2.6)tag(1250,610,'Rufino',pop(t,S.L(0)+2.6),36);},

carnivoro(t,S){cret('dia');
  baby(560,GY,2.3,{exp:t<S.L(1)?'angry':'happy',mouth:t>S.L(1)?.4:0});
  save(1280,780,pop(t,.3));E(0,0,150,32,'#fff',{lw:3.4});E(0,-14,120,24,'#7FB04E',{lw:3});for(let i=0;i<6;i++)Ln(-90+i*34,-20,-80+i*34,-40,{lw:2.4,col:'#3F6332'});
  restore();xmark(1280,740,2.3,seg(t,.8,1.1));text('ensalada: 0',1280,590,64,C.OUT,'Gochi','center',-.03,8,'#fff');
  if(t>S.L(1)){pico(1560,720,.5,{exp:'happy'});tag(1560,420,'verdura',pop(t,S.L(1)+.5),36);}},
dientes(t,S){cret('dia');
  rex(560,GY+30,1.6,{mouth:.5+Math.sin(t*5)*.1,exp:'happy'});
  const k=pop(t,.4);banana(1500,520,1.5*k,.2);tooth(1500,800,1.5*k,0);tag(1500,430,'diente = plátano',k,34);
  if(t>S.L(1)){const kk=pop(t,S.L(1)+.1);save(1080,350,kk,.15);R(-8,-6,16,150,5,'#E86AA6',{lw:3});R(-26,-40,52,40,5,'#fff',{lw:3});for(let i=0;i<5;i++)Ln(-20+i*10,-40,-20+i*10,-54,{lw:2});restore();xmark(1080,420,1.6,seg(t,S.L(1)+.5,S.L(1)+.8));}},
triceratops(t,S){cret('dia');
  rex(480,GY+10,1.2,{mouth:.3,exp:'angry',walk:t*5});
  const hit=S.L(1)+1.6;
  if(t<hit)tricera(1450,GY-10,.95,{flip:false,exp:'angry'});
  if(t>S.L(1)){const k=pop(t,S.L(1)+.1,.4);save(1000,300,k);R(-230,-100,460,200,10,'#fff',{lw:4});text('Escudo y cuernos: 1',0,-36,38,C.OUT,'Patrick');text('Hambre: 10',0,34,56,C.RED,'Gochi');restore();}
  if(t>hit){impact('¡ÑAM!',1100,520,seg(t,hit,hit+1.2));smear(1450,GY-60,seg(t,hit,hit+.6),1.2,7);}},
curadas(t,S){cret('dia');
  const go=t>S.L(1);const px=go?lerp(900,2200,eio(seg(t,S.L(1)+.3,S.L(1)+3))):900;
  pico(px,GY-20,1,{scar:true,exp:go?'happy':'normal',walk:go?t*9:0});
  save(880,540,pop(t,.5));E(0,0,60,34,'#F4C7C0',{lw:2.6});for(let i=0;i<5;i++)P([[-40+i*20,-10],[-30+i*20,-10],[-35+i*20,6]],'#fff',{lw:1.4});restore();
  tag(880,430,'mordida cicatrizada',pop(t,.7),32);
  if(go){bubble('Recuerdo de un T. rex',900,400,40,1);}},
carrona(t,S){cret('dia');
  rex(980,GY,1.3,{exp:'chill',mouth:.25});
  const k=pop(t,S.L(1)-.2);stick(300,GY-20,1.2,{arms:[[-50,-90],[60,-140]],smile:false});bubble('cazador',360,560,46,1);
  stick(1700,GY-20,1.2,{arms:[[-60,-140],[50,-90]]});bubble('carroñero',1620,560,46,-1);
  if(t>S.L(1))text('=',980,420,200*pop(t,S.L(1)),C.RED,'Gochi','center',0,12,'#fff');},
ambrosio(t,S){cret('dia');const hit=S.L(1)+1.2;
  rex(560,GY+10,1.2,{exp:t<hit?'normal':'happy',mouth:t>hit-.5?.5:0});
  if(t<hit)baby(lerp(1900,1350,eo(seg(t,0,S.L(1)))),GY+10,2.1,{flip:true,exp:'happy',feathers:true});
  if(t<hit)tag(1500,520,'Ambrosio',pop(t,.3),32);
  if(on(t,S.L(0)+.2,S.L(1)))bubble('¿Qué tal tu día?',1450,380,40,1);
  if(t>hit){smear(1000,GY-20,seg(t,hit,hit+.6),1.4,3);grave(1500,GY,'Ambrosio');}},

manada(t,S){cret('dia');
  R(1100,GY-200,300,22,4,'#A8743F');R(1140,GY-180,18,180,4,'#8E6034');R(1340,GY-180,18,180,4,'#8E6034');
  sign(1700,GY-330,'FIESTA',60);
  for(let i=0;i<4;i++){const bx=1150+i*80,by=GY-380+Math.sin(t*2+i)*10;Ln(bx,by+50,bx,GY-200,{lw:2.4});E(bx,by,28,34,[C.PINK,C.YEL,C.BLUE,'#7FA34A'][i],{lw:3});}
  X.cake(1250,GY-200,t);
  rex(520,GY+10,1.25,{hat:true,exp:t>S.L(1)?'sad':'normal',mouth:0});
  const rx=((t*180)%2400)-200;save(rx,GY+60,1,t*8);E(0,0,36,36,'#B8975A',{lw:3});Ln(-20,-10,20,10,{lw:2.4});Ln(-18,12,18,-14,{lw:2.4});restore();
  if(t>S.L(1))text('invitaciones: 0',960,250,70*pop(t,S.L(1)),C.OUT,'Gochi','center',-.03,8,'#fff');},
tamano(t,S){cret('dia');
  bus(600,GY-10,1.1);rex(1230,GY,1.15,{flip:true,exp:'angry',mouth:.2});
  const k=eo(seg(t,.4,2));Ln(300,360,300+k*1330,360,{lw:6,col:C.RED});Ln(300,340,300,380,{lw:6});Ln(300+k*1330,340,300+k*1330,380,{lw:6});
  text('12 m',960,290,100*pop(t,1.6),C.RED,'Gochi','center',0,8,'#fff');
  if(t>S.L(1))text('5 a 8 toneladas',960,150,90*pop(t,S.L(1)),C.OUT,'Gochi','center',-.02,10,'#fff');},
crece(t,S){cret('dia');
  const k=eo(seg(t,0,S.D*.9));rex(560,GY,lerp(.55,1.4,k),{exp:k>.5?'happy':'normal',mouth:.1});
  text(Math.round(k*1800+2)+' kg',1450,330,110,C.OUT,'Gochi','center',.02,10,'#fff');text('+2 kg al día',1450,440,60,C.RED,'Gochi','center',-.03,8,'#fff');
  save(1450,GY-10);R(-100,-40,200,50,10,'#CFE8F3',{lw:3.4});E(0,-30,30,16,'#fff',{lw:2.4});Ln(0,-30,k*24-12,-34,{lw:3,col:C.RED});
  if(t>S.L(1)){drop(-70,-70);drop(70,-80);text('¡auxilio!',0,-90,40,C.OUT,'Patrick');}restore();},
brazos(t,S){cret('dia');
  rex(700,GY+10,1.55,{exp:'normal',mouth:0,hold:()=>{
    if(t<S.L(1)){tag(250,-60,'brazo: 1 m',pop(t,.4),30);Ln(100,-30,120,-120,{lw:3,col:C.RED});}
    else{const p=Math.sin((t-S.L(1))*5)*.5+.5;P([[100,-150],[120+p*40,-210],[138+p*40,-222],[134+p*40,-200]],REX,{seed:4});}}});
  if(t>S.L(1)){tag(1500,500,'no llega a la nariz',pop(t,S.L(1)+.3),34);text('?',1100,300,160,C.RED,'Gochi','center',.1,10,'#fff');}
  else tag(1500,500,'200 kg cada uno',pop(t,S.L(0)+1.2),34);},
vista(t,S){cret('dia');
  rex(560,GY,1.2,{exp:'happy'});
  pico(1550,GY-40,.7,{exp:'dead',rot:.2});flies(1500,600,t,3);
  if(t>S.L(0)+.5){const k=seg(t,S.L(0)+.5,S.L(0)+1.5);P([[760,640],[1500,560],[1500,720]],'rgba(247,215,116,'+(.25*k)+')',{stroke:false});}
  if(t>S.L(1)-.5){for(let i=0;i<3;i++){const k=((t*.7+i/3)%1);stroke([[820+k*600,700-i*30],[860+k*600,680-i*30],[900+k*600,700-i*30],[940+k*600,680-i*30]],{lw:3,col:'#8FB06A',noJit:true});}
    tag(1000,420,'olfato: nivel dios',pop(t,S.L(1)-.2),34);}},
rufino2(t,S){cret('atardecer');
  rex(520,GY+10,1.2,{exp:'chill',mouth:0});rufino(1400,GY,1.7,{exp:'chill'});
  if(t>S.L(1)){heart(900,640,18);heart(1000,600,14);}},

lista(t,S){cret('dia');
  baby(960,GY,2,{exp:'sweat',feathers:true});
  const nm=['primo','tío','vecino'];
  for(let i=0;i<3;i++){const k=pop(t,S.L(1)+.2+i*.6);const x=i===1?960:(i===0?200:1720);const y=i===1?420:GY;
    if(k>0){rex(x,y-60*(1-k)+(i===1?0:0),i===1?.7:.85,{flip:i===2,mouth:.4,exp:'angry'});tag(x,y-340,nm[i],k,30);}}
},
hermenegildo(t,S){cret('dia');const hit=S.L(1)+.8;
  fern(960,GY+30,.5);
  if(t<hit)baby(960,GY,2.2,{exp:t>S.L(0)+1?'happy':'sweat',feathers:true});
  tag(960,GY-420,'helecho: 10 cm',pop(t,.5),32);
  if(t>hit-.6)rex(lerp(2000,1250,eo(seg(t,hit-.6,hit))),GY,1.2,{flip:true,mouth:.5,exp:'angry'});
  if(t>hit){smear(960,GY-80,seg(t,hit,hit+.5),1.5,4);grave(360,GY,'Hermenegildo');}},
adulto(t,S){cret('dia');
  rex(960,GY+10,1.4,{crown:true,exp:'happy',mouth:0});
  const fl=seg(t,0,3);pico(lerp(500,-300,fl),GY-100,.5,{flip:true,walk:t*10});tricera(lerp(1500,2300,fl),GY-100,.4,{walk:t*10});
  if(t>S.L(1))confetti(t);text('JEFE',960,200,150*pop(t,.5),C.RED,'Gochi','center',-.03,12,'#fff');},
peleas(t,S){cret('dia');const hit=S.L(0)+1.5;
  rex(560,GY,1.05,{mouth:.5,exp:'angry'});rex(1380,GY,1.05,{flip:true,mouth:.5,exp:'angry',walk:0});
  if(t>hit)impact('¡CRAC!',960,420,seg(t,hit,hit+1.3));
  if(t>S.L(1)){const k=pop(t,S.L(1)+.1);bandage(1050,520,90,36,.4);bandage(380,520,90,36,-.3);text('familia',960,250,100*k,C.OUT,'Gochi','center',-.03,10,'#fff');}},
humanos(t,S){cret('dia');
  rex(520,GY+10,1.2,{exp:t>S.L(1)?'happy':'normal'});
  sign(1360,430,'HUMANOS: 0',58);
  if(t>S.L(1)){const k=pop(t,S.L(1)+.1);save(1550,640,k,.05);P([[-90,-80],[-50,-100],[-20,-80],[20,-80],[50,-100],[90,-80],[70,-30],[50,-40],[50,90],[-50,90],[-50,-40],[-70,-30]],'#6FA8C8',{lw:3.4});text('T. REX',0,0,40,'#fff','Patrick');restore();xmark(1550,640,1.6,seg(t,S.L(1)+.6,S.L(1)+.9));}},
sue(t,S){cret('dia');
  rex(780,GY+10,1.4,{exp:'sweat',mouth:.1,hold:()=>{bandage(110,-110,150,40,.3);bandage(200,-205,130,36,.1);}});
  tag(1500,520,'Sue',pop(t,.3),44);
  if(t>S.L(1)){const k=pop(t,S.L(1)+.2);save(1420,720,k*2);E(0,0,14,9,C.OUT);for(let i=0;i<3;i++){Ln(-6+i*6,-6,-10+i*10,-18,{lw:2});Ln(-6+i*6,6,-10+i*10,18,{lw:2});}restore();tag(1420,610,'parásito',k,30);}},

super(t,S){cret('dia');const hit=S.L(0)+2;
  rex(520,GY,1.45,{mouth:t<hit?.55:0,exp:'angry'});
  bone(1180,GY-240,1,.05,t>hit?seg(t,hit,hit+.8):0);
  if(t>hit)impact('¡CRAC!',1180,400,seg(t,hit,hit+1.3));
  const n=Math.round(57000*eo(seg(t,.3,S.L(1)+1)));text(n.toLocaleString('es-ES')+' newtons',1350,230,90,C.RED,'Gochi','center',-.02,10,'#fff');},
caca(t,S){cret('dia');
  stick(520,GY-10,1.3,{smile:true,arms:[[-50,-100],[110,-150]],hold:()=>{E(130,-160,30,30,null,{lw:5});Ln(150,-140,180,-110,{lw:7});}});
  const k=pop(t,.3);save(1100,GY-30,k*1.8);for(let i=0;i<4;i++)E(0,-i*26,70-i*16,22,'#6B4423',{lw:3});for(let i=0;i<5;i++){save(-40+i*22,-30-(i%3)*18,1,i);R(-12,-4,24,8,3,'#F4EEDC',{lw:1.6});restore();}restore();
  tag(1100,600,'caca de T. rex',k,30);
  if(t>S.L(1))bubble('¡Con orgullo!',620,420,44,-1);},
rugido(t,S){cret('dia');const sneeze=t>S.L(1);
  rex(560,GY+10,1.4,{mouth:sneeze?.1:.6+Math.sin(t*9)*.1,exp:sneeze?'sad':'angry',hold:()=>{if(sneeze){R(30,-250,90,28,10,'#C03A3A',{lw:3});}}});
  if(!sneeze){text('¡UAAARGH!',1300,380,130*pop(t,.3),C.RED,'Gochi','center',-.05,12,'#fff');tag(1300,490,'en las películas',pop(t,.6),32);for(let i=0;i<3;i++){const k=((t*.8+i/3)%1);stroke([[900+k*100,500-i*30],[960+k*100,480-i*30],[900+k*100,460-i*30]],{lw:4,noJit:true});}}
  else{text('bruuum... achís',1300,380,100*pop(t,S.L(1)),'#6FA8C8','Gochi','center',-.03,10,'#fff');tag(1300,490,'en la vida real',pop(t,S.L(1)+.3),32);}},
rufino3(t,S){cret('dia');const hit=S.L(0)+2.2;
  rufino(1350,GY,1.7,{exp:t>hit&&t<hit+1.5?'shock':'normal'});
  const lunge=t<hit?eo(seg(t,S.L(0)+1,hit)):1-seg(t,hit,hit+.8);
  baby(lerp(420,780,lunge),GY,2.4,{mouth:t<hit?.55:.1,exp:t>hit?'sad':'happy',feathers:true});
  if(t>hit){impact('¡TOC!',1100,500,seg(t,hit,hit+1.1));const k=seg(t,hit,hit+1.4);tooth(lerp(1000,600,k),lerp(700,500,k)+Math.sin(k*3.14)*-200+k*k*300,1,k*8);}
  if(t>S.L(1)){tag(780,500,'diente nuevo',pop(t,S.L(1)),34);for(let i=0;i<4;i++)Ln(1000+i*10,620,1010+i*10,640,{lw:3,col:C.YEL});}},

practica(t,S){cret('dia');
  const run=eo(seg(t,.3,S.L(1)+1.5));const fall=t>S.L(1)+1.5;
  pico(lerp(900,2300,eo(seg(t,.3,S.L(1)+2.5))),GY-20,.8,{walk:t*14});
  if(!fall)baby(lerp(300,1500,run),GY,2.3,{walk:t*14,mouth:.4,exp:'angry',feathers:true});
  else{baby(1480,GY+10,2.3,{rot:.5,exp:'dead',feathers:true});text('uf',1480,560,100*pop(t,S.L(1)+1.6),C.OUT,'Gochi','center',.1,10,'#fff');}},
correr(t,S){cret('dia');
  const x=lerp(100,1500,seg(t,0,S.D));
  if(t<S.L(1))rex(x,GY,1.1,{walk:t*8,exp:'sweat',mouth:.2});else rex(560,GY,1.1,{exp:'sweat'});
  if(t<S.L(1)){sign(960,260,'20 km/h',70);}
  if(t>S.L(1)){sign(1500,330,'GIMNASIO',54);xmark(1500,380,1.2,seg(t,S.L(1)+.5,S.L(1)+.8));pico(1100,GY-20,.7,{exp:'happy'});tag(1100,600,'presa sin gym',pop(t,S.L(1)+.9),30);}},
emboscada(t,S){cret('dia');const hit=S.L(1)+1.8;
  fern(560,GY+30,.55);
  const px=lerp(2000,1500,eo(seg(t,0,hit)));if(t<hit+.3)pico(px,GY-20,.9,{flip:true,exp:'normal',walk:t*8});
  const jump=t>hit?seg(t,hit,hit+.5):0;
  rex(lerp(560,1200,jump),GY-Math.sin(jump*3.14)*80,1.25,{mouth:t>hit?.55:0,exp:t>hit?'angry':'happy'});
  fern(560,GY+60,.45);
  if(on(t,.6,hit))bubble('shhh',560,360,50,1);
  if(t>hit)impact('¡ÑAM!',1400,480,seg(t,hit,hit+1.2));},
veintiocho(t,S){cret('dia');
  rex(560,GY+10,1.3,{glasses:true,exp:'chill',hold:()=>cane(250,0,1.1)});
  X.cake(1400,GY-30,t);text('28',1400,GY-250,120*pop(t,.4),C.RED,'Gochi','center',.03,10,'#fff');
  confetti(t);
  if(t>S.L(1)){const k=pop(t,S.L(1)+.1);sign(960,260,'GRADUACIÓN',54);xmark(960,300,1.3,seg(t,S.L(1)+.7,S.L(1)+1));}},
rufino4(t,S){cret('lluvia');rainfall(t);
  const roll=t<S.L(1)?seg(t,.3,S.L(1)):1;
  if(t<S.L(1)){rufino(lerp(1700,300,eo(roll)),GY+10,1.5,{rot:-roll*12,exp:'shock'});}
  else{const k=seg(t,S.L(1),S.D);rufino(lerp(500,1250,eo(k)),GY+10-Math.sin(k*3.14)*20,1.5,{exp:'happy'});rex(lerp(200,950,eo(k)),GY+10,1.2,{exp:'chill',walk:t*6});if(t>S.L(1)+2)heart(1000,600,16);}},

cortejo(t,S){cret('atardecer');
  rex(500,GY,1.2,{exp:'love',mouth:.1,walk:Math.sin(t*6)*3,hold:()=>{E(250,-215,12,12,C.PINK,{lw:2.4});dot(250,-215,4,C.YEL);}});
  rex(1440,GY,1.2,{flip:true,lips:true,exp:'chill'});
  heart(920,500,16+Math.sin(t*6)*3);
  if(t>S.L(1)){const k=pop(t,S.L(1)+.1);save(960,320,k);R(-120,-70,240,140,8,'#fff',{lw:3});text('carta de amor',0,-10,34,C.OUT,'Patrick');restore();xmark(960,320,1.6,seg(t,S.L(1)+.7,S.L(1)+1));}},
brazos2(t,S){cret('atardecer');
  rex(560,GY,1.35,{exp:t>S.L(1)?'sweat':'love',hold:()=>{const k=Math.sin(t*3)*8;P([[100,-150],[160+k,-170],[176+k,-160],[170+k,-146],[100,-134]],REX,{seed:6});}});
  rex(1500,GY,1.35,{flip:true,lips:true,exp:'normal'});
  if(t>S.L(1)){text('...',1000,400,120,C.OUT,'Gochi');tag(1000,500,'pobre pareja',pop(t,S.L(1)+.2),34);}},
crias(t,S){cret('dia');nest(960,GY,1.8);
  const h=S.L(1);
  for(let i=0;i<3;i++){const x=840+i*120;if(t<h+.3)egg(x,GY-30,1.1,{crack:t>h-1,rot:Math.sin(t*12+i)*.05});
    else{const k=seg(t,h+.3,S.D);baby(lerp(x,i===0?-200:i===1?960:2200,eo(k)),GY-20+Math.abs(Math.sin(t*10+i))*-8,1.5,{flip:i===0,walk:t*10,exp:'happy',feathers:true});}}
  if(t>S.L(0))phone(300,GY-120,1,'0');},
casimiro(t,S){cret('dia');
  save(1700,GY-20,1.3);P([[-110,0],[-110,-120],[0,-200],[110,-120],[110,0]],'#E9D9B4',{lw:4});R(-24,-84,48,84,4,'#A8743F');R(-86,-100,40,40,3,'#CFE8F3');R(46,-100,40,40,3,'#CFE8F3');restore();
  rex(260,GY,.95,{exp:'love',glasses:true});rex(640,GY,.95,{lips:true,exp:'happy'});
  const n=Math.floor(18*seg(t,S.L(1)-.5,S.L(1)+3));
  for(let i=0;i<n;i++){const row=Math.floor(i/6),col=i%6;baby(1000+col*80+row*20,GY+30-row*70-20,.8,{flip:true,exp:'happy',feathers:true});}
  tag(1200,500,'18 hijos',pop(t,S.L(1)+.5),40);tag(260,420,'Casimiro',pop(t,.4),34);},

vejez(t,S){cret('atardecer');
  rex(lerp(300,1000,seg(t,0,S.D)),GY,1.3,{glasses:true,exp:'sad',walk:t*3,mouth:0,hold:()=>{cane(300,0,1.1);bandage(90,-120,60,24,.5);}});
  if(t>S.L(1)){sign(1600,400,'JUBILACIÓN',48);xmark(1600,440,1.3,seg(t,S.L(1)+.4,S.L(1)+.7));}},
meteorito(t,S){cret('meteoro');
  const k=seg(t,0,S.L(1)+1);meteor(lerp(300,1300,k),lerp(50,520,k),lerp(.4,1.4,k),t);
  const fl=seg(t,S.L(1)+1,S.L(1)+1.4)*(1-seg(t,S.L(1)+1.4,S.L(1)+3));
  rex(1500,GY,1.2,{flip:true,exp:'shock',mouth:.3});pico(300,GY-60,.5,{walk:t*10});
  if(fl>0){g().fillStyle='rgba(255,255,255,'+(fl<1?fl:1)+')';g().fillRect(0,0,W,H);}
  if(t>S.L(1)+1.2)impact('¡BUM!',960,520,seg(t,S.L(1)+1.2,S.L(1)+2.4));},
hallazgo(t,S){cret('badlands');
  skull(1250,GY-10,1.5,-.05);E(1250,GY-10,260,40,'#C9A56B',{stroke:false});
  stick(560,GY-20,1.3,{smile:true,arms:[[-40,-100],[90,-70]],hold:()=>{Ln(90,-70,130,-40,{lw:5});E(140,-34,14,6,C.RED,{lw:2});}});
  tag(600,380,'Susan Hendrickson',pop(t,.4),34);tag(960,200,'Dakota del Sur, 1990',pop(t,S.L(1)-.2),44);
  if(t>S.L(1)+.8){const k=pop(t,S.L(1)+.8);save(1250,500,k);R(-80,-36,160,72,6,'#fff',{lw:3});text('SUE',0,4,54,C.RED,'Gochi');restore();}},
venta(t,S){cret('museo');
  skull(1450,GY-20,1.1);R(1300,GY-10,300,40,6,'#8E6034');
  stick(500,GY,1.4,{arms:[[-40,-100],[70,-190]],hold:()=>{R(70,-210,70,24,4,'#8E6034',{lw:3});}});
  const n=Math.round(8000000*eo(seg(t,.3,S.L(1)-.5)));text('$'+n.toLocaleString('es-ES')+'+',960,300,120,C.RED,'Gochi','center',-.02,12,'#fff');
  if(t>S.L(1))bubble('¡Vendido!',560,540,56,1);},
fama(t,S){cret('museo');
  rex(900,GY+10,1.2,{crown:true,exp:'happy'});
  save(1650,GY-200,pop(t,.4));R(-100,-130,200,260,8,'#E8743A',{lw:4});text('T-REX',0,-70,60,'#fff','Gochi');text('cereal',0,0,40,'#fff','Patrick');E(0,70,40,30,REX,{lw:3});restore();
  if(t>S.L(1)){const k=pop(t,S.L(1)+.1);phone(260,640,1.2*k,'0');}},
cierre(t,S){cret('atardecer');
  text('Nacer como un tiranosaurio rex apesta.',W/2,230,80*pop(t,.2),C.OUT,'Gochi','center',-.02,10,'#fff');
  rex(960,GY+10,1.5,{crown:t>S.L(1),exp:t>S.L(1)?'happy':'sweat'});
  if(t>S.L(1))text('Pero al menos eres el rey',W/2,350,90*pop(t,S.L(1)),C.RED,'Gochi','center',.02,10,'#fff');},
adios(t,S){cret('museo');
  save(1000,GY-60,1);R(-260,-420,520,420,6,'rgba(207,232,243,.55)',{lw:5});restore();
  rufino(1000,GY-70,1.4,{exp:'chill',wave:t>S.L(1)+1,t});
  sign(1000,GY-12,'ROCA',44);
  rex(380,GY+10,1.0,{exp:'happy'});
  if(t>S.L(1))heart(700,640,16);},
sub(t,S){cret('dia');
  rufino(560,GY,1.8,{exp:t>S.L(1)?'shock':'normal',wave:t<S.L(1),t});
  text('SUSCRÍBETE',W/2,200,130*pop(t,.2),C.RED,'Gochi','center',-.03,12,'#fff');
  if(t>S.L(1)){const k=eo(seg(t,S.L(1)+.2,S.L(1)+2.2));rex(lerp(2300,1250,k),GY,1.5,{flip:true,mouth:.6,exp:'angry',walk:t*6});}
  if(t>S.L(1)+2.4){impact('¡ÑAM!',900,520,seg(t,S.L(1)+2.4,S.L(1)+3.5));}},
};
function drawShot(id,t,S){if(id.startsWith('cap'))return card(t,S);const f=SHOTS[id];if(!f)throw new Error('falta toma '+id);f(t,S);}
module.exports={drawShot};
