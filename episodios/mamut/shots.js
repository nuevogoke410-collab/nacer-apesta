const X=require('./lib');const Q=require('./extra');
const {W,H,C,TAU,seg,lerp,eo,eio,back,rnd,cl,E,R,P,Ln,dot,save,restore,text,bubble,impact,speed,splat,smear,heart,drop,zzz,grave,confetti,stick,flies,lips,eye,stroke,cake,sign}=X;
const {tundra,snowfall,tuft,mamut,osvaldo,leon,lobo,caver,molar,pine}=Q;
const g=()=>X.g;
const GY=930;
const pop=(t,a,d=.35)=>back(seg(t,a,a+d));
const on=(t,a,b=1e9)=>t>=a&&t<b;
const mix=(a,b,k)=>{const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const A=p(a),B=p(b);return '#'+A.map((v,i)=>Math.round(lerp(v,B[i],cl(k))).toString(16).padStart(2,'0')).join('');};
function tag(s,x,y,size=40,rot=0){text(s,x,y,size,C.OUT,'Patrick','center',rot,8,'#fff');}
function arrowTo(x1,y1,x2,y2){Ln(x1,y1,x2,y2,{lw:4});const a=Math.atan2(y2-y1,x2-x1);Ln(x2,y2,x2-Math.cos(a-.5)*24,y2-Math.sin(a-.5)*24,{lw:4});Ln(x2,y2,x2-Math.cos(a+.5)*24,y2-Math.sin(a+.5)*24,{lw:4});}
function pile(x,y,k,s=1){ // montón de pasto
  for(let i=0;i<Math.round(14*k);i++)tuft(x+(rnd(i+3)-.5)*220*s,y-rnd(i*5)*70*s+20,1.1*s);}
function grass(x,y,s=1){tuft(x,y,s);tuft(x+30*s,y+6,s*.9);tuft(x-30*s,y+4,s*.8);}
function card(t,S){tundra('nieve');snowfall(t,30,5);const k=pop(t,.15,.5);save(W/2,400,k,-.02);R(-600,-190,1200,380,18,'#F4EEDC',{lw:4});
  text('Capítulo '+S.ch,0,-100,64,Q.MAMD,'Patrick');text(S.title,0,40,S.title.length>16?90:130,C.OUT,'Gochi');restore();
  mamut(lerp(-500,W+600,seg(t,0,S.D)),GY+60,.8,{walk:t*10,t,exp:['normal','normal','sweat','sweat','shock','angry','love','chill'][S.ch-1]});}
const clock=(x,y,r,a)=>{E(x,y,r,r,'#fff',{lw:4});for(let i=0;i<12;i++){const q=i/12*TAU;Ln(x+Math.cos(q)*r*.82,y+Math.sin(q)*r*.82,x+Math.cos(q)*r*.94,y+Math.sin(q)*r*.94,{lw:3});}Ln(x,y,x+Math.cos(a-1.57)*r*.7,y+Math.sin(a-1.57)*r*.7,{lw:6});Ln(x,y,x+Math.cos(a/12-1.57)*r*.45,y+Math.sin(a/12-1.57)*r*.45,{lw:7});};

const SHOTS={
titulo(t,S){tundra('nieve');snowfall(t,50,1);
  text('Nacer como un',W/2-200,190,110*pop(t,0),C.OUT,'Gochi','center',-.03,10,'#fff');
  text('MAMUT',W/2-200,370,230*pop(t,.3),Q.MAM,'Gochi','center',.02,14,C.OUT);
  text('LANUDO',W/2-200,540,150*pop(t,.55),Q.MAML,'Gochi','center',-.02,12,C.OUT);
  if(t>1.2){save(W/2-210,720,lerp(2.4,1,eo(seg(t,1.2,1.4))),-.1);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  mamut(1500,GY+30,1.0*pop(t,.6),{flip:true,t,exp:t>1.3?'sweat':'normal'});},

/* ---------- CAPÍTULO 1 ---------- */
embarazo(t,S){tundra('nieve');snowfall(t,40,2);
  const m=Math.min(22,1+Math.floor(seg(t,0,S.L(1)+.5)*22));
  mamut(700,GY,1.5,{lips:true,walk:t*3,exp:t<S.L(1)?'sweat':'sad',t});
  save(1520,430,pop(t,.2,.4));R(-170,-140,340,280,16,'#fff',{lw:4});R(-170,-140,340,66,12,C.RED,{lw:4});text('Mes',0,-108,46,'#fff','Patrick');text(''+m,0,26,140,C.OUT,'Gochi');restore();
  if(t>S.L(1)+.8)bubble('¿Ya?',1000,300,56,-1);},
nace(t,S){tundra('estepa');
  mamut(560,GY,1.8,{lips:true,exp:'love',t,flip:false});
  const k=pop(t,S.L(0)+.2,.5);
  mamut(1300,GY,.8*k,{baby:true,flip:true,exp:t<S.L(1)?'happy':'shock',t,trunk:t>S.L(1)?'tangle':'down'});
  if(t>S.L(0)+1.2){tag('90 kg',1300,300,70*pop(t,S.L(0)+1.2,.3));arrowTo(1300,350,1300,470);}
  if(t>S.L(1)+.8)bubble('¿Y esto qué es?',1480,560,44,-1);},
trompa(t,S){tundra('nieve');snowfall(t,30,3);
  const fall=seg(t,S.L(1)+.2,S.L(1)+.7);
  mamut(840,GY+fall*30,1.7,{baby:true,trunk:'tangle',t,exp:fall>0?'dead':'sweat',rot:fall*.9,walk:t*4*(1-fall)});
  if(fall>=1){impact('¡PLAF!',1200,500,seg(t,S.L(1)+.7,S.L(1)+1.8));}
  if(t<S.L(1))tag('trompa con vida propia',1300,300,56*pop(t,.3,.3));},
leche(t,S){tundra('estepa');
  mamut(640,GY,1.9,{lips:true,exp:'love',t});
  mamut(880,GY,.72,{baby:true,exp:'happy',t});
  heart(760,330,30*pop(t,.3,.4));
  ['restaurante','abrigo','guardaespaldas'].forEach((s,i)=>{if(t>S.L(1)+.2+i*.9)tag(s,1430,300+i*100,56*pop(t,S.L(1)+.2+i*.9,.3));});},
caca(t,S){tundra('estepa');
  const away=eo(seg(t,0,S.L(1)));
  mamut(lerp(560,780,away),GY,1.5,{lips:true,walk:t*5,t,exp:'chill'});
  E(1000,GY-8,80,26,'#5A3C1E',{lw:3});E(1000,GY-30,56,24,'#5A3C1E',{lw:3});E(1000,GY-50,32,20,'#5A3C1E',{lw:3});
  flies(1000,GY-110,t,4);
  mamut(1380,GY,.8,{baby:true,flip:true,exp:t<S.L(1)?'sweat':'love',t,trunk:'curl'});
  if(t>S.L(1)){tag('bacterias',1000,450,60*pop(t,S.L(1),.3));for(let i=0;i<6;i++)dot(900+i*40,520+Math.sin(t*5+i)*8,6,'#7FA34A');}},
hermanos(t,S){tundra('nieve');snowfall(t,30,4);
  const sibs=[['Fulgencio',420,{crown:true},S.L(0)+.3],['Wilfrido',860,{glasses:true},S.L(0)+1.4],['Eustaquio',1280,{hat:true},S.L(0)+2.4]];
  for(const [n,x,o,te] of sibs){const k=pop(t,te-.3,.4);mamut(x,GY,.9*k,{...o,t,exp:'normal',trunk:'wave'});if(t>te)tag(n,x+60,270,48*pop(t,te,.3));}
  mamut(1700,GY,.55*pop(t,.2,.4),{baby:true,flip:true,t,exp:'sweat'});tag('tú',1650,610,44);
  if(t>S.L(1)+.5)bubble('Suerte.',860,200,52,1);},

/* ---------- CAPÍTULO 2 ---------- */
pasto(t,S){tundra('estepa');
  grass(300,GY+10,1.4);grass(1500,GY,1.6);grass(1650,GY+30,1.2);grass(1100,GY+40,1.3);
  mamut(720,GY,1.6,{trunk:'wave',t,exp:'happy'});
  if(t>S.L(1)){sign(1560,300,'VEGETARIANO',54);tag('colmillos de 2 m',1160,420,48*pop(t,S.L(1)+.5,.3));arrowTo(1100,450,1000,630);}},
cantidad(t,S){tundra('estepa');
  const kg=Math.round(180*seg(t,.2,S.L(1)+.6));
  pile(560,GY-10,seg(t,0,S.L(1)+1),2);
  text(kg+' kg',560,330,110,C.OUT,'Gochi','center',0,10,'#fff');
  mamut(1380,GY,1.4,{flip:true,trunk:'wave',t,exp:'happy'});
  if(t>S.L(1)){save(1000,540,pop(t,S.L(1),.4));clock(0,0,110,(t-S.L(1))*14);restore();tag('20 horas',1000,380,64*pop(t,S.L(1)+.3,.3));}},
osvaldo(t,S){tundra('nieve');snowfall(t,30,6);
  osvaldo(1300,GY,1.7*pop(t,.2,.5),{exp:'normal',t});
  mamut(620,GY,1.4,{t,exp:t<S.L(1)?'shock':'love'});
  if(t>S.L(1)){heart(960,430,46*pop(t,S.L(1)+.1,.4));heart(1040,360,30*pop(t,S.L(1)+.5,.4));}
  if(t>S.L(1)+2.4)tag('Osvaldo',1300,GY-340,52);},
nieve(t,S){tundra('nieve');
  const k=seg(t,.2,S.D-.5);const mx=lerp(300,1500,k);
  for(let i=0;i<14;i++){const gx=300+i*90;if(gx<mx-220)grass(gx,GY+30,.9);}
  for(let i=0;i<8;i++){const sx=mx+160+i*110;if(sx<1900)E(sx,GY+20,70,30,'#fff',{lw:3});}
  mamut(mx,GY,1.5,{trunk:'down',t,walk:t*8,exp:'angry'});
  for(let i=0;i<8;i++){const p=((t*2+i/8)%1);E(mx+420+p*140,GY-20-Math.sin(p*Math.PI)*160,10+rnd(i)*8,10,'#fff',{lw:2.4});}
  if(t>S.L(1)){sign(1560,260,'RESTAURANTE',54);Ln(1380,300,1740,330,{lw:12,col:C.RED});tag('sin mesero',1560,420,50*pop(t,S.L(1)+.6,.3));}},
muelas(t,S){tundra('nieve');
  for(let i=0;i<6;i++){const te=.3+i*.55,k=pop(t,te,.3);molar(250+i*285,640,1.2*k,mix('#F6F1DE','#B79A6A',i/5));if(t>te)tag(''+(i+1),250+i*285,430,50);}
  if(t>S.L(1)+.4){Ln(1670-70,560,1670+70,720,{lw:16,col:C.RED});Ln(1670+70,560,1670-70,720,{lw:16,col:C.RED});tag('la última',1670,860,60*pop(t,S.L(1)+.4,.3));}},
wilfrido(t,S){tundra('estepa');
  const grab=S.L(0)+1.2;
  if(t<grab)pile(700,GY-10,1,2);
  const wx=t<grab?lerp(2200,980,eo(seg(t,0,grab))):lerp(980,2300,eo(seg(t,grab,grab+2)));
  mamut(wx,GY,1.3,{flip:t<grab,glasses:true,trunk:t<grab?'down':'up',t,walk:t*12,exp:t<grab?'angry':'happy'});
  if(t>=grab){tuft(wx+330,GY-380,2);}
  mamut(400,GY,.8,{baby:true,t,exp:t<grab?'happy':'sad'});
  if(t>grab+.8)tag('Wilfrido',900,300,64*pop(t,grab+.8,.3));},

/* ---------- CAPÍTULO 3 ---------- */
matriarca(t,S){tundra('nieve');snowfall(t,30,7);
  const sp=40;
  [[200,.8],[560,.9],[900,1.0],[1330,1.25]].forEach(([x,s],i)=>{const lead=i===3;mamut(x+Math.sin(t*2)*4,GY+(i%2)*10,s,{walk:t*5+i,t,crown:lead,glasses:lead,lips:lead,trunk:'down'});});
  if(t>.5)tag('abuela',1520,230,64*pop(t,.5,.3));
  if(t>S.L(1))bubble('Aquí mando yo.',1000,200,52,1);},
machos(t,S){tundra('nieve');snowfall(t,30,8);
  [[300,1.5,true],[620,1.1,false]].forEach(([x,s,l],i)=>mamut(x,GY,s,{lips:l,trunk:t>.5?'up':'down',t,exp:l?'chill':'sad'}));
  const k=eio(seg(t,S.L(1)-.5,S.D));
  mamut(lerp(1000,2000,k),GY,1.2,{walk:t*8,t,exp:'sad',hold:()=>{Ln(160,-300,210,-340,{lw:6,col:'#8A5A2B'});E(230,-340,40,34,'#C9B28A',{lw:3});}});
  if(t>S.L(1)+.4)bubble('Adiós, hijo.',420,260,50,1);
  if(on(t,S.L(0)+1,S.L(0)+3))tag('ya eres grande',1150,300,52);},
tamano(t,S){tundra('nieve');
  mamut(800,GY,1.7,{t,exp:'normal'});
  caver(260,GY,.9,{smile:true,spear:false});
  const k=seg(t,.3,S.L(1)-.2);const top=GY-470*k;
  Ln(1560,GY,1560,top,{lw:6});Ln(1530,GY,1590,GY,{lw:6});Ln(1530,top,1590,top,{lw:6});
  tag(k>.99?'3,5 m':'...',1700,lerp(GY,top,.5),70);
  if(t>S.L(1)){const b=pop(t,S.L(1),.4);save(960,GY+45,b);R(-480,-20,960,30,8,'#8E6034',{lw:4});restore();tag('8 toneladas',1100,300,76*pop(t,S.L(1)+.5,.3));}},
colmillos(t,S){tundra('nieve');
  const big=seg(t,S.L(1)-1.2,S.L(1)-.2);
  const hit=S.L(1)+.8;
  pine(1340,GY+10,560,4);
  const turn=seg(t,hit-.5,hit);
  mamut(560+turn*40,GY,1.5,{tuskK:lerp(1,1.45,big),t,exp:t>hit?'sweat':'normal',rot:t>hit?-.05:0});
  tag(big>.5?'récord: 4 m':'2,5 m',900,260,64);
  if(t>hit)impact('¡TOC!',1150,400,seg(t,hit,hit+1.2));},
circulo(t,S){tundra('nieve');snowfall(t,40,9,200);
  lobo(110,GY-20,1.1,{mouth:true,run:0});
  const ang=[0,1,2,3,4,5].map(i=>i/6*TAU);
  const items=ang.map((a,i)=>({x:1000+Math.cos(a)*470,y:GY-130+Math.sin(a)*130,f:Math.cos(a)<0,s:.62+Math.sin(a)*.14}));
  items.sort((a,b)=>a.y-b.y).forEach((it,i)=>mamut(it.x,it.y,it.s,{flip:!it.f?false:true,t,exp:'angry',trunk:'up'}));
  mamut(1000,GY-110,.5,{baby:true,t,exp:t>S.L(1)?'love':'sweat'});
  if(t>S.L(1)+.3)heart(1000,GY-380,30*pop(t,S.L(1)+.3,.4));},

/* ---------- CAPÍTULO 4 ---------- */
lista(t,S){tundra('nieve');snowfall(t,30,10);
  sign(960,150,'BUFFET',80);
  const d=[['lobos',lobo,300,{mouth:true}],['hienas',lobo,720,{mouth:true,col:'#C8A15C',spots:true}],['leones',leon,1200,{mouth:true}]];
  d.forEach(([n,f,x,o],i)=>{const te=.4+i*1.0;const k=pop(t,te,.3);f(x,GY,1.15*k,{...o,flip:false});if(t>te)tag(n,x+20,GY-230,52);});
  E(1730,GY+14,150,34,'#fff',{lw:3});mamut(1730,GY+6,.5,{baby:true,flip:true,exp:'sweat',t});
  if(t>S.L(1))Ln(1600,GY-40,1860,GY-40,{lw:1,col:'#fff'});},
adultos(t,S){tundra('nieve');snowfall(t,30,11);
  if(t<S.L(1)){mamut(1000,GY,1.9,{t,exp:'angry',trunk:'up',rot:Math.sin(t*6)*.01});
    leon(260,GY,.7,{run:t*18,flip:true,exp:'angry',mouth:false});tag('mmm... mejor no',420,440,44);}
  else{g().fillStyle='rgba(20,28,50,.8)';g().fillRect(0,0,W,H);
    for(let i=0;i<8;i++){const ex=100+rnd(i+4)*1700,ey=200+rnd(i*3)*500;dot(ex,ey,9,'#F2D35A');dot(ex+40,ey,9,'#F2D35A');}
    mamut(960,GY,.9,{baby:true,exp:'sad',t});}},
fulgencio(t,S){
  if(t<S.L(1)){tundra('nieve');const hit=.8;
    if(t<hit+.1)mamut(1300,GY,1.1,{crown:true,flip:true,exp:'normal',t});
    if(t>hit)smear(1300,GY,seg(t,hit,hit+.6),1.4,3);
    if(t>hit-.4&&t<hit+.6){const p=seg(t,hit-.4,hit);leon(lerp(400,1260,p),GY-Math.sin(p*Math.PI)*200,1.2,{mouth:true,run:t*16});}
    impact('¡ZAS!',1000,420,seg(t,hit,hit+1.2));
    if(t>hit+1.4)grave(1300,GY,'Fulgencio');}
  else{tundra('nieve');const tt=t-S.L(1);
    P([[1100,GY+40],[1500,GY+40],[1360,GY+190],[1240,GY+190]],'#2B3A55',{lw:4});
    const f=seg(tt,.8,2.2);
    mamut(lerp(500,1230,eo(seg(tt,0,.9))),GY+f*400,1.1,{hat:true,exp:f>0?'shock':'normal',rot:f*.6,t});
    if(tt>.9)impact('¡AAAH!',900,420,seg(tt,.9,2.2),'#fff',C.BLUE);
    if(tt>2.6)grave(1300,GY,'Eustaquio');}},
humanos(t,S){tundra('nieve');snowfall(t,25,12);
  E(960,GY+30,300,60,'#2B3A55',{lw:4});
  mamut(960,GY-10,1.3,{exp:'sweat',t,trunk:'up'});
  caver(300,GY,1.0,{smile:true});caver(540,GY,.9,{});caver(1480,GY,1.0,{smile:true});caver(1700,GY,.95,{});
  ['cena','casa','herramienta'].forEach((s,i)=>{const te=S.L(1)+.3+i*.9;if(t>te)tag(s,500+i*460,260,68*pop(t,te,.3));});},
casa(t,S){tundra('nieve');
  for(let i=0;i<7;i++){const a=Math.PI+i/6*Math.PI;stroke([[960+Math.cos(a)*300,GY],[960+Math.cos(a)*300,GY-200],[960+Math.cos(a)*120,GY-Math.sin(-a)*340]],{lw:10,col:'#F6F1DE',noJit:true});}
  caver(960,GY,.8,{smile:true,spear:false});
  Ln(560,GY-420,1360,GY-440,{lw:5});for(let i=0;i<5;i++)P([[600+i*150,GY-420],[680+i*150,GY-424],[640+i*150,GY-370]],i%2?C.RED:C.YEL,{lw:2.4});
  if(t>.5)tag('INAUGURACIÓN',960,GY-480,60*pop(t,.5,.3));
  mamut(1650,GY,1.0,{flip:true,exp:'sad',t});
  if(t>S.L(1))bubble('¿Y mi invitación?',1500,380,44,-1);},
patada(t,S){if(t>S.L(1)){const sh=(rnd(Math.floor(t*20))-.5)*14;g().setTransform(1,0,0,1,sh,sh*.6);}tundra('nieve');
  const hit=S.L(0)+2.2;
  const lx=t<hit?lerp(2100,1240,eo(seg(t,.2,hit-.2))):1240+(t-hit)*900;
  const ly=t<hit?GY:GY-Math.sin(seg(t,hit,hit+1.4)*Math.PI)*500;
  lobo(lx,ly,1.1,{flip:true,mouth:true,run:t<hit?t*18:0,rot:t>hit?(t-hit)*5:0});
  mamut(640,GY,1.6,{exp:'angry',t,rot:on(t,hit-.2,hit+.5)?-.05:0});
  if(t>hit)impact('¡PUM!',1000,420,seg(t,hit,hit+1.4));
},

/* ---------- CAPÍTULO 5 ---------- */
pelo(t,S){tundra('nieve');snowfall(t,25,13);
  mamut(640,GY,1.7,{t,exp:'happy'});
  tag('pelo: 90 cm',300,330,60*pop(t,.3,.3));arrowTo(300,370,330,GY-110);
  Ln(130,GY-40,130,GY-190,{lw:6});Ln(110,GY-40,150,GY-40,{lw:6});Ln(110,GY-190,150,GY-190,{lw:6});
  if(t>S.L(1)){tag('lana suave',1200,300,60*pop(t,S.L(1),.3));arrowTo(1160,340,900,GY-300);}},
grasa(t,S){tundra('nieve');
  const L=[['pelo',Q.MAMD,70],['lana',Q.MAML,50],['grasa',C.YEL,140],['piel',C.PINK,34]];let y=300;
  L.forEach(([n,col,h],i)=>{const te=.2+i*(S.D*.18);const k=pop(t,te,.4);save(780,y+h/2,k);R(-300,-h/2,600,h,10,col,{lw:3.4});restore();
    if(t>te)tag(n,1330,y+h/2,48);y+=h+4;});
  if(t>S.L(1)){const k=pop(t,S.L(1),.4);Ln(450,300+70+50+4,450,300+70+50+4+140,{lw:6});tag('10 cm',350,300+70+50+4+70,60*k);}},
orejas(t,S){tundra('nieve');snowfall(t,30,14,200);
  mamut(560,GY,2.3,{t,exp:'normal'});
  tag('oreja miniatura',1250,200,56*pop(t,.4,.3));arrowTo(1180,235,880,470);
  const k=pop(t,S.L(1)-.5,.4);save(1640,500,k);E(0,0,200,260,'#9A9A94',{lw:4});E(0,0,150,200,'#B8B8B2',{lw:2.6,stroke:false});restore();tag('elefante',1640,820,50*k);
  if(t>S.L(1)+.4)tag('mamut',900,740,0);},
joroba(t,S){tundra('nieve');
  const x=lerp(200,1000,eo(seg(t,0,S.D)));
  mamut(x+400,GY,1.7,{walk:t*6,pack:true,t,exp:'chill'});
  if(t>.4){E(x+400-40*1.7,GY-250*1.7,120,66,null,{lw:5,col:C.RED});}
  if(t>S.L(1)-.3)tag('mochila de emergencias',1300,260,56*pop(t,S.L(1)-.3,.3));},
sangre(t,S){tundra('nieve');snowfall(t,25,15);
  const k=pop(t,.3,.5);save(560,560,k*3.2);P([[0,-60],[24,-24],[26,0],[16,22],[0,28],[-16,22],[-26,0],[-24,-24]],C.RED,{lw:3});restore();
  tag('hemoglobina',560,860,60*pop(t,.6,.3));
  R(1180,260,70,540,35,'#fff',{lw:5});const lvl=seg(t,S.L(1),S.L(1)+1.5);R(1190,780-(60+220*lvl),50,60+220*lvl,25,C.RED,{lw:3});
  if(t>S.L(1))tag('bajo cero',1215,200,56);
  mamut(1620,GY,.9,{flip:true,t,exp:'love'});},
verano(t,S){tundra('verano');
  mamut(780,GY,1.6,{t,exp:'sweat',hold:()=>{E(260,-40,50,50,'#F4D88A',{lw:3});Ln(260,-40,260,-4,{lw:4});}});
  for(let i=0;i<5;i++)drop(300+i*90+Math.sin(t*3+i)*10,GY-560+((t*120+i*60)%240),1.2);
  flies(1300,GY-200,t,5);Q.osvaldo(1500,GY,1.2,{melt:.85,t,exp:'sad'});
  if(t>S.L(1))bubble('...',900,180,60,1);},

/* ---------- CAPÍTULO 6 ---------- */
trompa2(t,S){tundra('estepa');
  if(t<S.L(1)){mamut(560,GY,1.5,{baby:true,trunk:'up',t,exp:'happy'});
    const tx=560+250*1.5*1.0,ty=GY-330*1.5;
    for(let i=0;i<14;i++){const u=((t*1.2+i/14)%1);E(tx+u*520,ty-170*Math.sin(u*Math.PI*.55)+u*u*330,9,9,'#7FB6D8',{lw:2.4});}
    ['nariz','mano','manguera','pajilla'].forEach((s,i)=>{if(t>.3+i*.9)tag(s,1450,260+i*92,56*pop(t,.3+i*.9,.3));});}
  else{mamut(360,GY,1.1,{baby:true,t,exp:'love',trunk:'curl'});
    const k=pop(t,S.L(1),.4);save(1240,520,k);R(-420,-300,840,600,24,'#fff',{lw:5});
    E(-90,0,34,120,Q.MAML,{rot:.35,lw:4});E(90,0,34,120,Q.MAML,{rot:-.35,lw:4});
    Ln(0,10,0,150,{lw:7,col:'#5E8748'});for(let i=0;i<5;i++)E(Math.cos(i/5*TAU)*28,-30+Math.sin(i/5*TAU)*28,20,20,C.PINK,{lw:2.6});dot(0,-30,12,C.YEL);restore();
    if(t>S.L(1)+.6)tag('dedos',1240,260,64*pop(t,S.L(1)+.6,.3));}},
camino(t,S){tundra('nieve');snowfall(t,50,16,200);
  for(let i=0;i<5;i++){const px=((i*620-t*260)%3100+3100)%3100-300;pine(px,GY-80-(i%2)*40,360+(i%3)*60,i+30);}
  mamut(1250+Math.sin(t*2)*5,GY,1.3,{walk:t*8,t,exp:'chill'});
  mamut(680,GY,.8,{baby:true,walk:t*8+1,t,exp:'sweat'});
  const km=Math.round(seg(t,0,S.D)*14);tag(km+' km',300,200,70);},
hielo(t,S){tundra('hielo');
  const tc=S.L(1)+.3;
  const bx=t<tc?lerp(200,1000,seg(t,0,tc)):1000;
  const sink=seg(t,tc,tc+.5);
  if(t>S.L(0)+1.4){const q=seg(t,S.L(0)+1.4,tc);const pts=[[1000,640],[950,600],[1040,580],[990,540]];stroke(pts.slice(0,Math.max(2,Math.ceil(q*4))),{lw:5,col:'#fff',noJit:true});}
  mamut(bx,640+sink*70,1.0,{baby:true,t,walk:t<tc?t*4:0,exp:t<tc?'sweat':'dead',rot:sink*.4});
  if(t>=tc){P([[880,640],[1140,630],[1160,720],[860,730]],'#3E6F90',{lw:3});splat(1010,640,seg(t,tc,tc+1),1.6,'#E6F4FA');impact('¡CRAC!',1000,400,seg(t,tc,tc+1.4),'#fff',C.BLUE);}
  if(t<tc)tag('hielo delgado',1500,420,56);},
sesenta(t,S){tundra('atardecer');
  const yrs=Math.round(60*seg(t,.2,S.L(1)+.6));
  mamut(620,GY,1.6,{col:'#9A9A94',dk:'#6E6E68',hat:true,t,exp:'happy'});
  cake(1380,GY,t);
  tag(yrs+' años',1380,360,80);},
sueno(t,S){tundra('noche');snowfall(t,50,17,100);
  mamut(800,GY,1.6,{snowcap:seg(t,0,S.D),t,exp:'zzz'});zzz(1160,GY-420,t);},
derrite(t,S){tundra('verano');
  const m=t<S.L(1)?seg(t,0,S.L(1))*.8:.8;
  osvaldo(1250,GY,1.7,{melt:m,t,exp:'sad'});
  mamut(580,GY,1.5,{t,exp:t<S.L(1)?'sad':'love'});
  if(t>S.L(1)+.3){const k=pop(t,S.L(1)+.3,.4);save(1250,GY-220,k);P([[-190,0],[-120,-90],[0,-120],[120,-90],[190,0]],C.RED,{lw:3});Ln(0,-120,0,200,{lw:6});restore();heart(1250,GY-420,30*k);}},

/* ---------- CAPÍTULO 7 ---------- */
musth(t,S){tundra('estepa');
  const calm=t>S.L(1);
  mamut(740,GY,1.7,{t,exp:calm?'happy':'angry',crown:calm,trunk:calm?'up':'down'});
  if(!calm){for(let i=0;i<4;i++){const u=(t*.8+i/4)%1;stroke([[400+i*70,GY-100-u*300],[420+i*70,GY-140-u*300],[400+i*70,GY-180-u*300]],{lw:6,col:'#7FA34A'});}flies(560,GY-420,t,4);bubble('¡GRRR!',1300,360,60,-1);}
  else{for(let i=0;i<5;i++)heart(420+i*180,GY-480-((t*60+i*40)%140),24+(i%2)*10);bubble('¿Soy irresistible?',1400,360,50,-1);}},
pelea(t,S){tundra('nieve');
  const hit=1.4;
  const post=t>hit?seg(t,hit,hit+1):0;
  const ax=t<hit?lerp(300,820,eo(seg(t,0,hit))):lerp(820,1100,eo(post));
  const bx=t<hit?lerp(1700,1180,eo(seg(t,0,hit))):lerp(1180,1700+(t>S.L(1)?600:0),eo(seg(t,hit,hit+3)));
  mamut(ax,GY,1.1,{t,exp:'angry',walk:t<hit?t*10:0});
  mamut(bx,GY,1.1,{flip:true,t,exp:t<hit?'angry':'sad',walk:t>S.L(1)?t*6:0});
  if(t>hit)impact('¡CLONC!',960,380,seg(t,hit,hit+1.4));
  if(t>S.L(1)+.5)tag('solo a casa',1300,420,52);},
cortejo(t,S){tundra('estepa');
  mamut(380,GY,1.4,{crown:false,happy:1,t,exp:'happy',hold:()=>{for(let i=0;i<4;i++)E(260+i*0+Math.sin(i)*20,-40+i*10,22,22,[C.PINK,C.YEL,'#fff','#E86AA6'][i],{lw:2.6});}});
  [[1000,1.2],[1350,1.2],[1700,1.2]].forEach(([x,s],i)=>{mamut(x,GY,s*.85,{flip:true,lips:true,t,exp:t>S.L(1)+i*.5?'sad':'normal'});
    if(t>S.L(1)+.3+i*.5){save(x-60,GY-480,pop(t,S.L(1)+.3+i*.5,.3));R(-50,-60,100,120,8,'#fff',{lw:3});text(['3','2','4'][i],0,6,90,C.RED,'Gochi');restore();}});
  if(t<S.L(1)){tag('el jurado decide',1250,260,56);}},
papa(t,S){tundra('nieve');snowfall(t,25,18);
  mamut(420,GY,1.4,{lips:true,t,exp:'sad'});mamut(780,GY,.7,{baby:true,t,exp:'sad',trunk:'up'});
  const go=eio(seg(t,S.L(0)+.6,S.D));
  mamut(lerp(1200,2300,go),GY,1.4,{walk:t*8,t,exp:'chill',hold:()=>{R(120,-300,80,70,8,'#C9B28A',{lw:3});}});
  if(t>S.L(1)&&go<.6)bubble('Voy por pan.',1300,300,56,-1);},
hembra(t,S){tundra('nieve');snowfall(t,25,19);
  mamut(1250,GY,1.5,{lips:true,flip:true,exp:'sweat',t});
  [[560,.8],[760,.6],[920,.45]].forEach(([x,s],i)=>mamut(x,GY,s,{baby:true,flip:true,t:t+i,exp:'happy',trunk:'wave'}));
  sign(300,260,'VACACIONES: 0',54);
  if(t>S.L(1)){mamut(430,GY,.3*pop(t,S.L(1),.4),{baby:true,flip:true,t,exp:'shock'});}},
ciclo(t,S){tundra('estepa');confetti(t);
  grave(300,GY,'Fulgencio');
  mamut(780,GY,1.6,{lips:true,exp:'love',t});
  mamut(1180,GY,.8*pop(t,.3,.5),{baby:true,flip:true,exp:'happy',t});
  if(t>S.L(1)){sign(1180,200,'Fulgencio II',54);}
  heart(980,300,30*pop(t,.8,.4));},

/* ---------- CAPÍTULO 8 ---------- */
vejez(t,S){tundra('atardecer');snowfall(t,25,20,60);
  mamut(760,GY,1.6,{col:'#9A9A94',dk:'#6E6E68',t,exp:'sad',hold:()=>{Ln(160,-110,168,0,{lw:8,col:'#8A5A2B'});Ln(150,-110,176,-120,{lw:8,col:'#8A5A2B'});}});
  if(t>S.L(1)){sign(1500,300,'DENTISTA',60);Ln(1360,260,1640,420,{lw:14,col:C.RED});Ln(1640,260,1360,420,{lw:14,col:C.RED});}},
ladron(t,S){tundra('estepa');
  pile(560,GY-10,1,3);
  mamut(1100,GY,1.7,{flip:true,glasses:true,crown:true,t,exp:'happy',trunk:'up'});
  if(t>.6)tag('Wilfrido',1100,230,64*pop(t,.6,.3));
  if(t>S.L(1))bubble('ja ja ja',1250,330,56,1);
  mamut(1750,GY,.5,{baby:true,flip:true,exp:'sad',t});},
lyuba(t,S){tundra('museo');
  const k=pop(t,.3,.5);save(960,520,k);R(-300,-230,600,460,18,'#CFE8F3',{lw:5});
  mamut(0,170,.9,{baby:true,rot:-.1,exp:'zzz',t});
  g().globalAlpha=.4;R(-300,-230,600,460,18,'#fff',{stroke:false});g().globalAlpha=1;restore();
  R(660,790,600,110,8,'#F4EEDC',{lw:4});text('LYUBA',960,822,52,C.OUT,'Gochi');text('1 mes de edad',960,868,34,C.OUT,'Patrick');
  caver(300,GY+30,.8,{smile:true,spear:false});caver(1560,GY+30,.9,{smile:true,spear:false});
  for(let i=0;i<3;i++)if(Math.sin(t*9+i*2)>.85){const px=[360,1500,1700][i];X.P([[px,400],[px+20,380],[px+60,400],[px+20,420]],'#FFF7A8',{lw:2});}
  if(t>S.L(1)+1)tag('famosa',960,260,70*pop(t,S.L(1)+1,.3));},
piramides(t,S){tundra('isla');
  E(450,640,350,60,'#E6CF8E',{lw:3});P([[200,640],[450,380],[700,640]],'#E6CF8E',{lw:4});P([[450,380],[700,640],[600,640]],'#D2B677',{lw:2,stroke:false});
  tag('Egipto',450,720,56*pop(t,.3,.3));
  mamut(1450,640,.9,{flip:true,t,exp:t>S.L(1)?'happy':'normal'});
  tag('isla Wrangel',1450,770,56*pop(t,S.L(0)+.2,.3));
  if(t>S.L(1))tag('mismo tiempo',960,200,70*pop(t,S.L(1),.3));},
culpa(t,S){tundra('lab');
  R(260,200,1400,560,12,'#3F5E3A',{lw:5});
  const d=S.dur(1)/3;
  const cs=[['CLIMA',()=>{for(let i=0;i<3;i++){const a=i/3*Math.PI;Ln(Math.cos(a)*60,Math.sin(a)*60,-Math.cos(a)*60,-Math.sin(a)*60,{lw:6,col:'#9FD0EA'});}}],['HUMANOS',()=>stick(0,60,.4,{smile:true})],['LOS DOS',()=>{for(let i=0;i<3;i++){const a=i/3*Math.PI;Ln(-40+Math.cos(a)*50,Math.sin(a)*50,-40-Math.cos(a)*50,-Math.sin(a)*50,{lw:6,col:'#9FD0EA'});}stick(60,60,.4,{});}]];
  cs.forEach(([n,fn],i)=>{const te=S.L(1)+i*d,k=pop(t,te,.4);save(520+i*440,480,k);R(-170,-200,340,400,12,'#F4EEDC',{lw:4});text(n,0,-150,50,C.OUT,'Gochi');save(0,20,1);fn();restore();restore();});
  if(t<S.L(1))text('?',960,500,360*pop(t,.3,.4),C.RED,'Gochi');},
revivir(t,S){tundra('lab');
  sign(960,150,'PROYECTO MAMUT',64);
  stick(260,GY,1.0,{smile:true});stick(1660,GY,1.0,{smile:true,sweat:true});
  const k=pop(t,.4,.5);save(960,720,k);R(-210,-210,420,420,30,'#DCEBF2',{lw:5});restore();
  mamut(960,830,.52*k,{baby:true,t,exp:'sweat'});
  g().globalAlpha=.3;R(750,510,420,420,30,'#fff',{stroke:false});g().globalAlpha=1;
  if(t>S.L(1)+.4)bubble('¿Alguien preguntó?',1330,520,48,-1);},
cierre(t,S){tundra('ventisca');snowfall(t,90,21,180);
  mamut(820,GY,1.7,{scarf:true,hat:t>S.L(1),t,exp:t>S.L(1)?'love':'chill'});
  if(t>.3){save(1560,230,lerp(2.4,1,eo(seg(t,.3,.5))),-.1);R(-260,-90,520,180,12,null,{lw:9,col:C.RED});text('APESTA',0,6,160,C.RED,'Gochi');restore();}
  if(t>S.L(1)){heart(500,360,30*pop(t,S.L(1),.4));heart(1200,300,24*pop(t,S.L(1)+.4,.4));tag('abrigado',1500,560,60*pop(t,S.L(1)+.6,.3));}},
adiosg(t,S){tundra('atardecer');
  const m=t>S.L(1)?.35*seg(t,S.L(1),S.D):0;
  osvaldo(1250,GY,1.9,{wave:true,t,exp:'love',melt:m,sad:m>.1});
  mamut(lerp(700,-500,eo(seg(t,0,S.D-.5))),GY,1.3,{flip:true,walk:t*8,scarf:true,t,exp:'sad'});},
sub(t,S){tundra('nieve');snowfall(t,30,22);
  osvaldo(760,GY,2,{exp:'shock',t});
  const lk=eo(seg(t,S.L(1)-.2,S.L(1)+2.2));
  leon(lerp(2300,1180,lk),GY,1.4,{flip:true,mouth:true,run:t*16*(lk<1?1:0)});
  const b=pop(t,.2,.5);save(960,330,b);R(-300,-70,600,140,70,C.RED,{lw:6});text('SUSCRIBIRSE',0,6,76,'#fff','Gochi');restore();
  if(t>S.L(1)+2.2)impact('¡ÑAM!',960,520,seg(t,S.L(1)+2.2,S.L(1)+3.2));},
};
const OUT_=C.OUT;
function drawShot(id,t,S){g().setTransform(1,0,0,1,0,0);if(id.startsWith('cap'))return card(t,S);const f=SHOTS[id];if(!f)throw new Error('falta toma '+id);f(t,S);}
module.exports={drawShot,SHOTS};
