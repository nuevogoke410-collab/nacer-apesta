// Personajes y fondos de la era de hielo para "Nacer como un mamut lanudo apesta"
const X=require('./lib');
const {createCanvas}=require('@napi-rs/canvas');
const {W,H,C,TAU,rnd,lerp,E,R,P,Ln,dot,stroke,save,restore,text,eye,lips,cl,seg,eo,drop}=X;
const g=()=>X.g;
const OUT=C.OUT;
const MAM='#7B4B2A', MAMD='#58341B', MAML='#9A6B44';
const SNOW='#EAF0F4', SNOWD='#C5D3DC', ICE='#BFE0EE', PINEC='#46644A';

/* ---------- fondos ---------- */
function pine(x,yb,h,seed){
  Ln(x,yb,x,yb-h*.25,{lw:8,col:'#4B2B12'});
  for(let i=0;i<3;i++){const y=yb-h*.15-i*h*.27,w=h*(.36-i*.08);P([[x-w,y],[x+w,y],[x,y-h*.4]],PINEC,{seed:seed+i});
    P([[x-w*.45,y-h*.18],[x+w*.45,y-h*.18],[x,y-h*.4]],'#F4F8FA',{stroke:false});}
}
function mountains(col,y0,seed){
  const pts=[[-40,y0]];let x=-40,i=0;
  while(x<W+80){const w=260+rnd(seed+i)*220,hh=90+rnd(seed+i*3)*170;pts.push([x+w/2,y0-hh]);pts.push([x+w,y0]);x+=w;i++;}
  P(pts,col,{seed});
  // nieve en picos
  for(let k=1;k<pts.length-1;k+=2){const p=pts[k];P([[p[0]-34,p[1]+46],[p[0],p[1]],[p[0]+34,p[1]+46],[p[0]+8,p[1]+34],[p[0]-10,p[1]+50]],'#fff',{stroke:false});}
}
function drawTundra(kind){
  const gg=g();
  const sky={nieve:'#FFFFFF',ventisca:'#D9E0E4',noche:'#1F2742',estepa:'#FFFFFF',hielo:'#FFFFFF',atardecer:'#F6C089',museo:'#F1E7D0',lab:'#EDE8DA',isla:'#FFFFFF',verano:'#FFF4C9'}[kind];
  gg.fillStyle=sky;gg.fillRect(0,0,W,H);
  if(kind==='museo'||kind==='lab'){
    P([[-40,760],[W+40,750],[W+40,H+40],[-40,H+40]],kind==='museo'?'#B79A6A':'#C9BFA6',{seed:7});
    for(let i=0;i<6;i++)R(60+i*320,120,150,200,6,null,{lw:3,col:'#A8743F'});
    return;
  }
  const night=kind==='noche';
  if(night){for(let i=0;i<40;i++)dot(rnd(i)*W,rnd(i+9)*420,2+rnd(i+3)*2,'#F4EFC8');
    // aurora
    for(let k=0;k<3;k++){const pts=[];for(let i=0;i<=12;i++)pts.push([i*170-40,160+k*45+Math.sin(i*.8+k)*40]);
      stroke(pts,{lw:46,col:['#4FD39A','#7ADBC6','#7FA6F0'][k],noJit:true});}
    g().globalAlpha=1;
  }
  if(kind==='atardecer'){E(1500,430,150,150,'#F7D774');}
  if(kind==='verano'){E(1550,170,100,100,'#F7D774');for(let i=0;i<12;i++){const a=i/12*TAU;Ln(1550+Math.cos(a)*125,170+Math.sin(a)*125,1550+Math.cos(a)*165,170+Math.sin(a)*165,{lw:6,col:'#E9B530'});}}
  if(kind!=='estepa'&&kind!=='verano')mountains(night?'#3A4A70':(kind==='atardecer'?'#B68C86':'#B9C9D6'),470,11);
  else mountains('#C9D4A8',470,21);
  const gc={nieve:SNOW,ventisca:'#E3EAEE',noche:'#7C8CB0',estepa:'#B6BE86',hielo:SNOW,atardecer:'#E3C9B8',isla:SNOW,verano:'#C2B777'}[kind];
  P([[-40,480],[W*.3,470],[W*.65,480],[W+40,468],[W+40,H+40],[-40,H+40]],gc,{seed:5});
  for(let i=0;i<14;i++){const x=rnd(i+2)*W,y=520+rnd(i*3)*480;Ln(x,y,x+70,y+4,{col:kind==='estepa'||kind==='verano'?'#8A9460':SNOWD,lw:3});}
  if(kind==='estepa'||kind==='verano')for(let i=0;i<22;i++){const x=rnd(i+8)*W,y=540+rnd(i*5)*470;Ln(x,y,x-6,y-18,{lw:2.4,col:'#5E6B36'});Ln(x+4,y,x+10,y-20,{lw:2.4,col:'#5E6B36'});if(i%4===0)dot(x+10,y-22,5,i%8?'#E9B530':'#E0379A');}
  if(kind!=='hielo'){pine(110,560,300,3);pine(310,520,200,5);pine(1760,570,320,7);pine(1600,530,190,9);}
  if(kind==='hielo'){P([[-40,520],[W+40,510],[W+40,700],[-40,712]],ICE,{seed:21});for(let i=0;i<6;i++)Ln(100+i*330,560+(i%3)*50,230+i*330,560+(i%3)*50,{lw:3,col:'#FFFFFF'});}
  if(kind==='isla'){P([[-40,560],[W+40,550],[W+40,H+40],[-40,H+40]],'#6FA8C8',{seed:31});for(let i=0;i<10;i++)Ln(80+i*190,640+rnd(i)*340,180+i*190,640+rnd(i)*340,{lw:3,col:'#BFE0EE'});E(1450,620,330,70,SNOW);}
}
const cache={};
function tundra(kind='nieve'){
  if(!cache[kind]){const cv=createCanvas(W,H);const prev=X.g;X.setCtx(cv.getContext('2d'));drawTundra(kind);X.setCtx(prev);cache[kind]=cv;}
  X.g.drawImage(cache[kind],0,0);
}
function snowfall(t,n=70,seed=1,sp=120){
  for(let i=0;i<n;i++){const x=(rnd(i+seed)*W+Math.sin(t*1.5+i)*30)%W,y=(rnd(i*3+seed)*H+t*(sp+rnd(i)*80))%H;
    dot(x,y,3+rnd(i*7)*3,'#9DB4C4');}
}
function tuft(x,y,s=1,col='#6F8A3A'){save(x,y,s);for(let i=-2;i<=2;i++)Ln(i*7,0,i*11,-34-Math.abs(i)*-4,{lw:3.4,col:OUT});for(let i=-2;i<=2;i++)Ln(i*7,0,i*11,-34-Math.abs(i)*-4,{lw:2,col,noJit:true});restore();}

/* ---------- mamut ---------- */
// origen: centro de los pies, mira a la derecha.
// o: exp, flip, rot, walk, baby, lips, hat, crown, glasses, grad, scarf, trunk('down'|'up'|'wave'|'tangle'|'curl'), tuskK, t, col, hold, noTusk, snowcap, cane
function trunkPts(kind,t,k){
  const sw=Math.sin(t*3)*8;
  if(kind==='up')return [[212,-170],[250,-185],[286,-235],[276,-300],[250,-330]];
  if(kind==='wave')return [[212,-170],[250,-140+sw],[272,-90],[300,-70+sw*2],[330,-100-sw*2]];
  if(kind==='tangle')return [[212,-170],[260,-130],[220,-90+Math.sin(t*8)*10],[270,-60],[225,-40+Math.cos(t*6)*8],[262,-20]];
  if(kind==='curl')return [[212,-170],[252,-135],[268,-85],[245,-55],[222,-70]];
  if(kind==='point')return [[212,-170],[260,-175],[320,-170],[370,-165]];
  return [[212,-170],[244,-130+sw*.3],[256,-75],[249,-30],[231,-8]];
}
function mamut(x,y,s=1,o={}){
  const t=o.t||0,ph=o.walk||0,B=o.col||(o.baby?MAML:MAM),D=o.dk||(o.baby?MAM:MAMD);
  save(x,y,s,o.rot||0,o.flip);
  const leg=(lx,sw,col)=>{const dy=Math.max(0,Math.sin(sw))*12;R(lx-22,-80-dy,48,86,18,col);
    P([[lx-30,4],[lx-20,-12],[lx-8,6],[lx+2,-12],[lx+14,6],[lx+26,-10],[lx+32,4]],col,{lw:2.6});};
  leg(-120,ph,D);leg(60,ph+Math.PI,D);
  stroke([[-186,-140],[-204,-110],[-206,-80]],{lw:12*s,col:OUT,noJit:true});stroke([[-186,-140],[-204,-110],[-206,-80]],{lw:7*s,col:D,noJit:true});E(-206,-72,8,12,D,{lw:2.4});
  // falda de pelo
  const sk=[[-190,-90]];for(let i=0;i<=17;i++)sk.push([-186+i*20,-60+(i%2?44:10)+(rnd(i+3)-.5)*12]);sk.push([150,-90]);
  P(sk,D,{seed:61});
  // cuerpo
  P([[-192,-110],[-176,-196],[-114,-240],[-40,-268],[40,-254],[110,-222],[152,-150],[134,-80],[40,-56],[-90,-52],[-172,-70]],B,{seed:62});
  for(const f of[[-150,-170,-134,-134],[-100,-214,-90,-170],[-40,-246,-30,-196],[20,-236,28,-190],[-170,-110,-150,-84],[-90,-140,-84,-100],[10,-150,16,-108]])Ln(f[0],f[1],f[2],f[3],{lw:2.6});
  if(o.snowcap){const k=o.snowcap;P([[-110,-238],[-40,-266],[40,-252],[100,-222],[60,-228+(1-k)*20],[0,-236],[-60,-226],[-110,-224]],'#fff',{lw:2.6});}
  if(o.pack){R(-70,-250,80,56,10,'#C03A3A',{lw:3});Ln(-30,-240,-30,-204,{lw:7,col:'#fff'});Ln(-48,-222,-12,-222,{lw:7,col:'#fff'});}
  if(o.scarf){P([[96,-190],[160,-176],[166,-140],[110,-130]],'#C03A3A',{lw:2.6});P([[110,-132],[130,-132],[128,-84],[108,-86]],'#C03A3A',{lw:2.6});}
  leg(-60,ph+Math.PI,B);leg(120,ph,B);
  // cabeza
  g().save();if(o.baby){g().translate(150,-180);g().scale(1.22,1.22);g().translate(-150,180);}
  const tk=o.tuskK??1;
  if(!o.noTusk&&!o.baby){
    const tp=[[188,-132],[232*tk+(1-tk)*60,-96],[290*tk,-90+(tk>1?10:0)],[336*tk,-136],[342*tk,-188]].map((p,i)=>i?p:p);
    stroke(tp,{lw:20*s,col:OUT,noJit:true});stroke(tp,{lw:13*s,col:'#F6F1DE',noJit:true});
  }
  P([[92,-252],[140,-296],[186,-290],[226,-252],[232,-196],[214,-130],[170,-104],[124,-122],[96,-186]],B,{seed:63});
  // copete de pelo
  P([[110,-290],[134,-322],[150,-296],[170,-326],[186,-292],[206,-314],[214,-280]],D,{lw:2.6});
  E(124,-190,22,32,D,{lw:2.6});
  for(const f of[[150,-246,160,-226],[180,-262,188,-236],[205,-226,210,-206]])Ln(f[0],f[1],f[2],f[3],{lw:2.2});
  // trompa
  const tpts=o.trunkPts||trunkPts(o.trunk||'down',t,1);
  stroke(tpts,{lw:56*s*(o.baby?.85:1),col:OUT,noJit:true});stroke(tpts,{lw:46*s*(o.baby?.85:1),col:B,noJit:true});
  for(let i=1;i<tpts.length-1;i++){const p=tpts[i];Ln(p[0]-13,p[1]-4,p[0]+13,p[1]+4,{lw:2.2});}
  const ex=o.exp||'normal';
  if(ex==='normal')dot(190,-206,7);else eye(190,-206,ex);
  if(o.lips)lips(222,-128,.9);
  if(o.glasses){E(190,-206,19,19,null,{lw:3.2});Ln(171,-206,140,-210,{lw:3});}
  if(o.hat){P([[122,-290],[186,-290],[158,-390]],'#E86AA6');Ln(140,-326,170,-330,{col:C.YEL,lw:5});E(158,-392,10,10,C.YEL);}
  if(o.crown){P([[116,-292],[190,-292],[196,-346],[170,-318],[154,-352],[136,-318],[112,-346]],C.YEL);dot(154,-308,5,C.RED);}
  if(o.grad){P([[96,-300],[158,-326],[222,-300],[158,-276]],'#2E2E2E');R(130,-304,56,20,3,'#2E2E2E');Ln(158,-312,206,-280,{col:C.YEL,lw:3});}
  g().restore();
  if(o.hold)o.hold();
  restore();
}

/* ---------- Osvaldo: el témpano ---------- */
function osvaldo(x,y,s=1,o={}){
  const m=o.melt||0,h=(150)*(1-m*.7),w=110*(1+m*.5);
  save(x,y,s);
  if(m>0)E(0,0,w*1.2*(0.6+m),18+m*14,'#9FD0EA',{lw:2.6});
  R(-w/2,-h,w,h,22,'#CFE8F3',{lw:3.4});
  Ln(-w/2+16,-h+22,-w/2+16,-h+h*.5,{lw:5,col:'#fff',noJit:true});
  const ex=o.exp||'normal',ey=-h*.58;
  if(ex==='normal'){dot(-16,ey,5);dot(16,ey,5);}else{eye(-16,ey,ex);eye(16,ey,ex);}
  stroke(o.sad?[[-14,ey+30],[0,ey+22],[14,ey+30]]:[[-14,ey+24],[0,ey+32],[14,ey+24]],{lw:3});
  if(m>0.2)for(let i=0;i<3;i++)drop(-30+i*30,-h+8+((o.t||0)*40+i*30)%50,.8);
  if(o.wave){const a=Math.sin((o.t||0)*8)*.5;Ln(w/2,ey+30,w/2+34,ey+10+a*20,{lw:4});}
  restore();
}

/* ---------- depredadores y gente ---------- */
function leon(x,y,s=1,o={}){
  const ph=o.run||0;save(x,y,s,o.rot||0,o.flip);const Y='#D6A64E';
  stroke([[-96,-70],[-140,-80],[-158,-122],[-140,-150]],{lw:16,col:OUT});stroke([[-96,-70],[-140,-80],[-158,-122],[-140,-150]],{lw:10,col:Y});
  for(const l of[[-70,0],[-40,Math.PI],[44,.5],[70,Math.PI+.5]]){g().save();g().translate(l[0],-46);g().rotate(Math.sin(ph+l[1])*.4);R(-12,0,24,48,10,Y);g().restore();}
  E(0,-64,104,40,Y);
  E(110,-96,62,58,'#8A5A2B');
  E(116,-90,42,38,Y);E(120,-72,24,16,'#F1DFB0');P([[114,-86],[126,-86],[120,-78]],'#B0306A',{lw:2});
  if(o.mouth){R(104,-66,34,16,4,'#6A1010',{lw:2.4});for(const tx of[110,120,130])P([[tx-3,-66],[tx+3,-66],[tx,-58]],'#fff',{lw:1.2});}
  eye(112,-104,o.exp==='dead'?'dead':'angry');eye(136,-104,o.exp==='dead'?'dead':'angry');
  restore();
}
function lobo(x,y,s=1,o={}){
  const ph=o.run||0,G=o.col||'#8C8C86';save(x,y,s,o.rot||0,o.flip);
  stroke([[-70,-50],[-110,-62],[-126,-40]],{lw:16,col:OUT});stroke([[-70,-50],[-110,-62],[-126,-40]],{lw:10,col:G});
  for(const l of[[-46,0],[-24,Math.PI],[36,.5],[54,Math.PI+.5]]){g().save();g().translate(l[0],-34);g().rotate(Math.sin(ph+l[1])*.4);R(-8,0,16,38,7,G);g().restore();}
  E(0,-50,74,30,G);
  P([[56,-86],[100,-90],[148,-62],[150,-48],[100,-40],[60,-48]],G,{seed:3});
  P([[64,-86],[70,-116],[86,-90]],G,{lw:2.6});P([[92,-88],[104,-114],[112,-88]],G,{lw:2.6});
  dot(104,-72,4.4);dot(148,-60,4);
  if(o.mouth){P([[100,-46],[148,-48],[124,-24]],'#6A1010',{lw:2.2});}
  if(o.spots)for(const p of[[-30,-58],[10,-62],[-52,-44],[26,-44]])E(p[0],p[1],6,5,C.OUT,{lw:1});
  restore();
}
function caver(x,y,s=1,o={}){ // cavernícola de palitos con piel y lanza
  X.stick(x,y,s,{smile:o.smile,sweat:o.sweat,arms:o.arms||[[-40,-92],[56,-130]],hold:()=>{
    P([[-26,-130],[26,-130],[32,-70],[-32,-70]],'#8A5A2B',{lw:3});
    if(o.spear!==false){Ln(56,-130,86,-300,{lw:7,col:'#8A5A2B'});P([[78,-300],[94,-300],[86,-336]],'#8C8C86',{lw:2.4});}
  }});
}
function molar(x,y,s=1,col='#F6F1DE'){save(x,y,s);R(-46,-70,92,120,22,col,{lw:3.4});for(let i=0;i<4;i++)Ln(-30+i*20,-52,-30+i*20,26,{lw:2.4});Ln(-40,-20,40,-20,{lw:2.4});restore();}

module.exports={tundra,snowfall,tuft,mamut,osvaldo,leon,lobo,caver,molar,pine,MAM,MAMD,MAML,SNOW,ICE};
