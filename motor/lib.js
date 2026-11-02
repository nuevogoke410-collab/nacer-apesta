// Dibujo a mano alzada: líneas finas y temblorosas, colores planos y apagados.
const {createCanvas,GlobalFonts}=require('@napi-rs/canvas');
GlobalFonts.registerFromPath(__dirname+'/node_modules/@fontsource/gochi-hand/files/gochi-hand-latin-400-normal.woff2','Gochi');
GlobalFonts.registerFromPath(__dirname+'/node_modules/@fontsource/patrick-hand/files/patrick-hand-latin-400-normal.woff2','Patrick');

const W=1920,H=1080,TAU=Math.PI*2;
const C={OUT:'#2A1708',SKY:'#FFFFFF',G:'#5D6F46',G2:'#687B4E',TR:'#4B2B12',TR2:'#5A3519',
  CAN:['#4E7A3B','#5E8748','#3F6332','#567E44'],BUSH:['#6A8C4A','#557542','#46603A','#5F7F45'],
  CAPY:'#A06B3B',CAPYD:'#744A24',CAPYS:'#86582F',WATER:'#5E8FAE',WATER2:'#8DB4CB',RED:'#D81414',
  PINK:'#E0379A',YEL:'#E9B530',JAG:'#E2A43C',CREAM:'#F1DFB0',SNK:'#E7B42C',SNKB:'#F2DB97',GRAY:'#8C8C86',BLUE:'#6FA8C8'};
let g; // contexto activo
const setCtx=c=>{g=c;};
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const seg=(t,a,b)=>cl((t-a)/(b-a));
const lerp=(a,b,k)=>a+(b-a)*k;
const eo=k=>1-Math.pow(1-k,3);
const eio=k=>k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
const back=k=>{if(k<=0)return 0;if(k>=1)return 1;const c=1.9;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2);};
const rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x);};

function lw(base=3.4){const m=g.getTransform();const s=Math.sqrt(m.a*m.a+m.b*m.b)||1;return base/s;}
function seedOf(p){return Math.round(p[0][0]*7.3+p[0][1]*3.1+p.length*13.7);}
function jit(pts,amp=1.5,seed){const s=seed??seedOf(pts);return pts.map((p,i)=>[p[0]+(rnd(s+i*1.7)-.5)*2*amp,p[1]+(rnd(s*1.3+i*2.9)-.5)*2*amp]);}
function trace(pts,closed=true){
  g.beginPath();const n=pts.length;
  if(!closed){g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<n-1;i++){const m=[(pts[i][0]+pts[i+1][0])/2,(pts[i][1]+pts[i+1][1])/2];g.quadraticCurveTo(pts[i][0],pts[i][1],m[0],m[1]);}g.lineTo(pts[n-1][0],pts[n-1][1]);return;}
  const m0=[(pts[n-1][0]+pts[0][0])/2,(pts[n-1][1]+pts[0][1])/2];g.moveTo(m0[0],m0[1]);
  for(let i=0;i<n;i++){const p=pts[i],q=pts[(i+1)%n];g.quadraticCurveTo(p[0],p[1],(p[0]+q[0])/2,(p[1]+q[1])/2);}g.closePath();
}
function shape(pts,fill,o={}){const p=o.noJit?pts:jit(pts,o.amp??1.4,o.seed);trace(p,true);if(fill){g.fillStyle=fill;g.fill();}if(o.stroke!==false){g.lineWidth=lw(o.lw??3.4);g.strokeStyle=o.col||C.OUT;g.lineJoin='round';g.stroke();}}
function stroke(pts,o={}){const p=o.noJit?pts:jit(pts,o.amp??1.2,o.seed);trace(p,false);g.lineWidth=lw(o.lw??3.4);g.strokeStyle=o.col||C.OUT;g.lineCap='round';g.lineJoin='round';g.stroke();}
function ellPts(cx,cy,rx,ry,rot=0,n){n=n||Math.max(14,Math.round((rx+ry)/9));const out=[];for(let i=0;i<n;i++){const a=i/n*TAU;const x=Math.cos(a)*rx,y=Math.sin(a)*ry;out.push([cx+x*Math.cos(rot)-y*Math.sin(rot),cy+x*Math.sin(rot)+y*Math.cos(rot)]);}return out;}
function rrPts(x,y,w,h,r){r=Math.min(r,w/2,h/2);const out=[];const step=14;const ln=(x1,y1,x2,y2)=>{const d=Math.hypot(x2-x1,y2-y1),n=Math.max(1,Math.round(d/step));for(let i=0;i<n;i++)out.push([lerp(x1,x2,i/n),lerp(y1,y2,i/n)]);};
  const arc=(cx,cy,a0)=>{for(let i=0;i<4;i++){const a=a0+i/4*Math.PI/2;out.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r]);}};
  ln(x+r,y,x+w-r,y);arc(x+w-r,y+r,-Math.PI/2);ln(x+w,y+r,x+w,y+h-r);arc(x+w-r,y+h-r,0);ln(x+w-r,y+h,x+r,y+h);arc(x+r,y+h-r,Math.PI/2);ln(x,y+h-r,x,y+r);arc(x+r,y+r,Math.PI);return out;}
const E=(cx,cy,rx,ry,fill,o={})=>shape(ellPts(cx,cy,rx,ry,o.rot||0),fill,o);
const R=(x,y,w,h,r,fill,o={})=>shape(rrPts(x,y,w,h,r),fill,o);
const P=(pts,fill,o={})=>{const out=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];const n=Math.max(1,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])/16));for(let k=0;k<n;k++)out.push([lerp(a[0],b[0],k/n),lerp(a[1],b[1],k/n)]);}shape(out,fill,o);};
const Ln=(x1,y1,x2,y2,o={})=>{const n=Math.max(2,Math.round(Math.hypot(x2-x1,y2-y1)/18));const pts=[];for(let i=0;i<=n;i++)pts.push([lerp(x1,x2,i/n),lerp(y1,y2,i/n)]);stroke(pts,o);};
const dot=(x,y,r,col=C.OUT)=>{g.beginPath();g.arc(x,y,r,0,TAU);g.fillStyle=col;g.fill();};
const curve=(pts,o)=>stroke(pts,o);
function save(x,y,s=1,rot=0,flip=false){g.save();g.translate(x,y);if(rot)g.rotate(rot);g.scale(flip?-s:s,s);}
const restore=()=>g.restore();
function text(s,x,y,size,col=C.OUT,font='Gochi',align='center',rot=0,outline=0,ocol='#fff'){if(size<2)return;if(font==='Gochi'&&/[z¿¡]/.test(s))font='Patrick';g.save();g.translate(x,y);g.rotate(rot);g.font=`${size}px ${font}`;g.textAlign=align;g.textBaseline='middle';if(outline){g.lineWidth=outline;g.strokeStyle=ocol;g.lineJoin='round';g.strokeText(s,0,0);}g.fillStyle=col;g.fillText(s,0,0);g.restore();}
function scribble(x,y,w,seed){const pts=[];const n=5;for(let i=0;i<=n;i++)pts.push([x+i*w/n,y+(i%2?-w*.12:w*.06)+(rnd(seed+i)-.5)*4]);stroke(pts,{lw:2.4,seed});}

/* ---------- fondos (en caché) ---------- */
const bgCache={};
function canopyBand(yBase,color,seed,amp=40,step=120,top=-20){const pts=[[-60,top]];
  for(let x=-60;x<W+60;){const w=step*(.7+rnd(seed+x)*.6),d=amp*(.6+rnd(seed*3+x)*.7),y0=yBase+(rnd(seed+x*.3)-.5)*amp*.6;
    for(let k=0;k<=8;k++){const a=k/8;pts.push([x+a*w,y0+Math.sin(a*Math.PI)*d]);}x+=w;}
  pts.push([W+60,top]);shape(pts,color,{seed,amp:1.2});}
function trunk(x,yTop,yBot,w,seed){const w2=w*1.25;P([[x-w/2,yTop],[x+w/2,yTop],[x+w2/2+rnd(seed)*8,yBot],[x-w2/2,yBot+4]],C.TR,{seed});
  for(let i=0;i<3;i++){const xx=x+(rnd(seed+i)-.5)*w*.6,y0=lerp(yTop,yBot,.2+rnd(seed*2+i)*.5);Ln(xx,y0,xx+(rnd(i+seed)-.5)*6,y0+40+rnd(seed+i*5)*60,{lw:2.2});}}
function bush(x,y,w,h,col,seed=1){const pts=[];const n=Math.max(4,Math.round(w/80));
  const cx=x,base=y;pts.push([x+w/2,base]);
  for(let i=0;i<n;i++){const a0=i/n*Math.PI,a1=(i+1)/n*Math.PI;const p0=[cx+Math.cos(a0)*w/2,base-Math.sin(a0)*h],p1=[cx+Math.cos(a1)*w/2,base-Math.sin(a1)*h];
    const nx=Math.cos((a0+a1)/2),ny=-Math.sin((a0+a1)/2);const bulge=Math.hypot(p1[0]-p0[0],p1[1]-p0[1])*.35*(.8+rnd(seed+i)*.5);
    for(let k=0;k<=6;k++){const t=k/6;const bx=lerp(p0[0],p1[0],t)+nx*Math.sin(t*Math.PI)*bulge,by=lerp(p0[1],p1[1],t)+ny*Math.sin(t*Math.PI)*bulge;pts.push([bx,by]);}}
  pts.push([x-w/2,base]);for(let k=1;k<8;k++)pts.push([x-w/2+k*w/8,base+4]);
  shape(pts,col,{seed,amp:1});
  for(let i=0;i<Math.max(2,Math.round(w/110));i++)scribble(x-w*.35+rnd(seed+i)*w*.6,y-h*.2-rnd(seed*3+i)*h*.5,28+rnd(i)*22,seed+i*9);}
function forest(o={}){
  const horizon=o.horizon??380;
  g.fillStyle=o.sky||C.SKY;g.fillRect(0,0,W,H);
  P([[-40,horizon+6],[W*.3,horizon-4],[W*.65,horizon+3],[W+40,horizon-6],[W+40,H+40],[-40,H+40]],o.ground||C.G,{seed:3});
  const tr=o.trees??[[90,70,470],[420,60,440],[640,72,500],[1340,90,520],[1720,80,470]];
  tr.forEach((t,i)=>trunk(t[0],60,t[2],t[1],i*11+5));
  const bs=o.bushes??[[200,450,260,110,1],[700,440,300,120,2],[1450,470,320,130,0],[1820,430,240,100,3],[60,880,420,240,1]];
  bs.forEach((b,i)=>bush(b[0],b[1],b[2],b[3],C.BUSH[b[4]%4],i*7+2));
  canopyBand(150,C.CAN[3],21,60,170);canopyBand(90,C.CAN[0],22,50,140);canopyBand(30,C.CAN[2],23,30,110,-30);
}
function water(x0,y0,x1,y1,seed=4){P([[x0,y0],[x1,y0-6],[x1,y1],[x0,y1]],C.WATER,{seed});for(let i=0;i<9;i++){const x=x0+40+rnd(seed+i)*(x1-x0-160),y=y0+30+rnd(seed*2+i)*(y1-y0-60);Ln(x,y,x+60+rnd(i)*50,y,{col:C.WATER2,lw:3});}}
function river(o={}){forest({trees:[[90,70,440],[420,60,420],[1500,90,450],[1780,80,430]],bushes:[[220,430,260,100,1],[1600,440,300,110,2]],...o});
  P([[-40,520],[600,505],[1200,512],[W+40,500],[W+40,690],[1200,700],[600,690],[-40,700]],C.WATER,{seed:9});
  for(let i=0;i<10;i++){const x=rnd(i+3)*W,y=540+rnd(i*2+1)*130;Ln(x,y,x+70+rnd(i)*60,y,{col:C.WATER2,lw:3});}
  P([[-40,690],[700,700],[1300,686],[W+40,694],[W+40,H+40],[-40,H+40]],C.G2,{seed:19});
  for(let i=0;i<14;i++){const x=rnd(i+11)*W,y=740+rnd(i*3)*300;Ln(x,y,x-6,y-16,{lw:2.4,col:'#3E5A2C'});Ln(x+4,y,x+10,y-18,{lw:2.4,col:'#3E5A2C'});}}
function meadow(){g.fillStyle=C.SKY;g.fillRect(0,0,W,H);
  for(let i=0;i<9;i++)bush(80+i*230,420,300,140+rnd(i)*50,C.CAN[i%4],i+40);
  P([[-40,410],[W*.4,400],[W+40,412],[W+40,H+40],[-40,H+40]],C.G2,{seed:12});
  for(let i=0;i<26;i++){const x=rnd(i+7)*W,y=470+rnd(i*3)*560;Ln(x,y,x-6,y-16,{lw:2.4,col:'#3E5A2C'});Ln(x+4,y,x+10,y-18,{lw:2.4,col:'#3E5A2C'});}}
function night(){forest({sky:'#1F2538',ground:'#2F3A2A'});g.fillStyle='rgba(15,20,40,.45)';g.fillRect(0,0,W,H);
  E(1560,250,60,60,'#F4EFC8');for(let i=0;i<20;i++){const x=rnd(i)*W,y=200+rnd(i+9)*120;dot(x,y,2.5,'#F4EFC8');}}
function dusk(){forest({sky:'#F3B37A',ground:'#59633F',trees:[[90,70,470],[1780,80,470]],bushes:[[60,880,420,240,1],[1850,860,380,220,2]]});g.save();g.beginPath();g.rect(0,0,W,382);g.clip();E(960,380,170,170,'#F7D774');g.restore();P([[-40,384],[W+40,380],[W+40,470],[-40,470]],'#59633F',{seed:31,stroke:false});Ln(-40,385,W+40,383);}
function onsen(){g.fillStyle='#E9E3D3';g.fillRect(0,0,W,H);
  for(let i=0;i<12;i++)R(i*170-20,170,22,330,4,'#8A6A44');R(-20,180,W+40,26,4,'#8A6A44');R(-20,330,W+40,22,4,'#8A6A44');
  canopyBand(90,C.CAN[1],51,50,160);P([[-40,500],[W+40,495],[W+40,H+40],[-40,H+40]],'#8E8B7E',{seed:52});
  for(let i=0;i<16;i++)E(60+i*125,540+(i%2)*14,64,34,i%2?'#A5A296':'#9A978A');}
function lake(o={}){forest({trees:[[90,70,400],[420,60,390],[1500,90,410],[1780,80,400]],bushes:[[220,400,260,100,1],[1600,410,300,110,2]],sky:o.sky,ground:o.ground});
  P([[-40,520],[700,510],[1300,516],[W+40,506],[W+40,H+40],[-40,H+40]],o.water||C.WATER,{seed:29});
  for(let i=0;i<16;i++){const x=rnd(i+5)*W,y=560+rnd(i*2+7)*480;Ln(x,y,x+70+rnd(i)*60,y,{col:o.w2||C.WATER2,lw:3});}}
function shore(){forest({trees:[[90,70,440],[420,60,420],[1340,90,450],[1780,80,430]],bushes:[[220,430,260,100,1],[1600,440,300,110,2]]});
  P([[900,H+40],[1060,560],[W+40,548],[W+40,H+40]],C.WATER,{seed:39});
  for(let i=0;i<10;i++){const x=1150+rnd(i+5)*700,y=600+rnd(i*2+7)*420;Ln(x,y,x+70,y,{col:C.WATER2,lw:3});}}
function bg(name){
  if(!bgCache[name]){const cv=createCanvas(W,H),c2=cv.getContext('2d');const prev=g;g=c2;
    ({bosque:()=>forest(),rio:()=>river(),pradera:meadow,noche:night,atardecer:dusk,termal:onsen,lluvia:()=>forest({sky:'#CBD0CF',ground:'#4F603E'}),agua:()=>lake(),orilla:shore,aguanoche:()=>{lake({sky:'#1F2538',ground:'#2F3A2A',water:'#2E4A63',w2:'#58789A'});g.fillStyle='rgba(15,20,40,.4)';g.fillRect(0,0,W,H);E(1560,250,60,60,'#F4EFC8');for(let i=0;i<20;i++)dot(rnd(i)*W,200+rnd(i+9)*120,2.5,'#F4EFC8');}})[name]();g=prev;bgCache[name]=cv;}
  g.drawImage(bgCache[name],0,0);
}

/* ---------- caras ---------- */
function eye(x,y,e,s=1){
  switch(e){
    case 'dead':Ln(x-8,y-8,x+8,y+8,{lw:4});Ln(x+8,y-8,x-8,y+8,{lw:4});break;
    case 'love':g.beginPath();const k=11;g.moveTo(x,y+k*.9);g.bezierCurveTo(x-k*1.6,y-k*.2,x-k*.8,y-k*1.3,x,y-k*.4);g.bezierCurveTo(x+k*.8,y-k*1.3,x+k*1.6,y-k*.2,x,y+k*.9);g.fillStyle=C.RED;g.fill();g.lineWidth=lw(2.5);g.strokeStyle=C.OUT;g.stroke();break;
    case 'shock':E(x,y,11,12,'#fff',{lw:2.6});dot(x+2,y,3.5);Ln(x-12,y-22,x+8,y-25,{lw:3.4});break;
    case 'happy':case 'chill':case 'zzz':stroke([[x-8,y+(e==='happy'?3:-2)],[x,y+(e==='happy'?-5:5)],[x+8,y+(e==='happy'?3:-2)]],{lw:3.4,noJit:true});break;
    default:E(x,y,7,7.5,C.OUT,{lw:1});
  }
  if(e==='angry')Ln(x-13,y-18,x+10,y-9,{lw:3.6});
  if(e==='sad')Ln(x-12,y-10,x+10,y-17,{lw:3.6});
  if(e==='sweat'){Ln(x-10,y-12,x+10,y-19,{lw:3.6});drop(x-28,y-26);}
}
function drop(x,y,s=1){shape([[x,y-13*s],[x+8*s,y],[x+6*s,y+7*s],[x,y+9*s],[x-6*s,y+7*s],[x-8*s,y]],'#9FD0EA',{lw:2.4,amp:.4});}
function heart(x,y,k,col=C.RED){g.beginPath();g.moveTo(x,y+k*.9);g.bezierCurveTo(x-k*1.6,y-k*.2,x-k*.8,y-k*1.3,x,y-k*.4);g.bezierCurveTo(x+k*.8,y-k*1.3,x+k*1.6,y-k*.2,x,y+k*.9);g.fillStyle=col;g.fill();g.lineWidth=lw(2.6);g.strokeStyle=C.OUT;g.stroke();}
function lips(x,y,s=1){shape([[x-18*s,y],[x-8*s,y-9*s],[x,y-4*s],[x+8*s,y-9*s],[x+18*s,y],[x+6*s,y+9*s],[x-6*s,y+9*s]],C.PINK,{lw:2.6,amp:.6});Ln(x-16*s,y+1,x+16*s,y+1,{lw:2,col:'#7A1050'});}

/* ---------- capibara (plantilla para cualquier mamífero) ---------- */
// origen en los pies, mirando a la derecha. Opciones: exp, flip, rot, walk, baby, lips, hat, crown, morillo, napkin, tie, tag,
// teeth, mouth('open'|'bark'|'sad'), glasses, goggles, band, grad, cucumber, towel, yuzu, flower, birds, mud, sit, col, hold()
function capy(x,y,s,o={}){
  save(x,y,s,o.rot||0,o.flip);
  const B=o.col||C.CAPY,D=C.CAPYD,S=C.CAPYS;const ph=o.walk||0;
  if(!o.noLegs&&!o.sit){R(-70+Math.sin(ph)*8,-30,26,34,9,D);R(36-Math.sin(ph)*8,-30,26,34,9,D);}
  if(o.sit){E(-46,-14,40,18,D);}
  shape([[-88,-60],[-80,-92],[-50,-108],[0,-112],[50,-104],[78,-80],[84,-48],[70,-22],[20,-14],[-40,-14],[-78,-24]],B,{seed:101});
  for(const f of[[-58,-96,-48,-86],[-26,-106,-20,-94],[6,-108,10,-96],[-70,-64,-60,-58]])Ln(f[0],f[1],f[2],f[3],{lw:2.4});
  if(o.mud){for(let i=0;i<6;i++)E(-60+rnd(i+3)*120,-90+rnd(i*7)*60,10+rnd(i)*10,7,'#5A3C1E',{lw:2});}
  if(o.napkin)P([[40,-78],[96,-70],[70,-20]],'#fff');
  if(o.tie){P([[60,-80],[76,-80],[72,-66],[84,-30],[68,-18],[58,-32],[66,-66]],'#C03A3A',{lw:2.6});}
  if(o.tag){g.save();g.scale(o.flip?-1:1,1);R(-46,-80,92,38,6,'#fff',{lw:2.6});text(o.tag,0,-60,28,C.OUT,'Patrick');g.restore();}
  g.save();g.translate(56,-84);g.rotate(o.headRot||0);const hs=o.baby?1.2:1;g.scale(hs,hs);
  shape([[-16,-34],[20,-46],[58,-40],[82,-22],[88,4],[80,24],[40,30],[-6,26],[-22,6]],B,{seed:102});
  shape([[54,-28],[80,-20],[88,4],[80,22],[56,24],[50,0]],S,{seed:103});
  E(2,-40,11,9,D);
  dot(74,-8,3.6);
  if(o.morillo)E(62,-30,o.morillo*.6,o.morillo*.45,'#6E4520');
  if(o.lips)lips(74,14,.9);
  else if(o.mouth==='open')E(66,16,10,8,'#6A1010',{lw:2.4});
  else if(o.mouth==='bark'){P([[52,10],[86,8],[78,30]],'#6A1010',{lw:2.4});}
  else if(o.mouth==='sad')stroke([[56,18],[64,13],[72,18]],{lw:2.6});
  else stroke([[56,14],[64,17],[72,14]],{lw:2.6});
  if(o.teeth){R(64,18,10,o.teeth,3,'#FFFDF2',{lw:2.4});R(74,18,10,o.teeth,3,'#FFFDF2',{lw:2.4});}
  eye(30,-12,o.exp||'normal');
  if(o.hat){P([[2,-42],[44,-46],[22,-118]],'#E86AA6');Ln(12,-66,32,-68,{col:C.YEL,lw:5});Ln(16,-90,28,-91,{col:C.YEL,lw:5});E(22,-120,10,10,C.YEL);}
  if(o.crown){P([[-4,-44],[46,-46],[52,-86],[34,-66],[22,-92],[10,-66],[-6,-86]],C.YEL);dot(22,-60,5,C.RED);}
  if(o.yuzu){E(22,-62,26,22,'#F0A126');E(24,-86,10,5,'#6B8A3A',{rot:-.4});}
  if(o.goggles){R(14,-24,34,22,8,'#9FD0EA',{lw:3});}
  if(o.glasses){E(30,-12,14,12,null,{lw:3});E(64,-14,12,11,null,{lw:3});Ln(44,-13,52,-13,{lw:3});}
  if(o.flower){E(-6,-50,10,10,C.PINK);dot(-6,-50,4,C.YEL);}
  if(o.band){P([[-14,-34],[80,-26],[80,-14],[-16,-22]],'#D9473A',{lw:2.6});}
  if(o.grad){P([[-20,-56],[30,-74],[80,-56],[30,-38]],'#2E2E2E');R(14,-50,32,16,3,'#2E2E2E');Ln(30,-56,62,-40,{col:C.YEL,lw:3});E(62,-36,5,6,C.YEL,{lw:2});}
  if(o.cucumber){E(30,-12,16,15,'#9CC46A',{lw:2.6});E(30,-12,9,8,'#D7EBB3',{lw:1.6});}
  if(o.towel){P([[-20,-38],[60,-50],[90,-34],[70,-22],[-10,-20]],'#F5F1E8');}
  if(o.birds)for(let i=0;i<o.birds;i++)bird(-10+i*34,-44-(i%2)*4,.7,o.t||0,i);
  g.restore();
  if(o.hold)o.hold();
  restore();
}

/* ---------- otros animales ---------- */
function bird(x,y,s,t=0,v=0,col=C.BLUE){save(x,y,s);Ln(-4,0,-6,-12,{lw:3});Ln(4,0,6,-12,{lw:3});E(0,-24,20,15,col);E(14,-38,12,12,col);P([[24,-40],[38,-36],[24,-32]],'#E99A2E',{lw:2.4});dot(18,-40,3);E(-6,-24+Math.sin(t*18+v)*4,13,7,'#4E86A8',{rot:-.4,lw:2.4});restore();}
function jagHead(x,y,s,o={}){const Y=o.col||C.JAG;save(x,y,s,0,o.flip);
  E(-40,-40,16,16,Y);E(40,-40,16,16,Y);dot(-40,-38,7);dot(40,-38,7);
  E(0,0,58,50,Y);
  if(!o.plain)for(const p of[[-34,-18],[34,-20],[-14,-36],[16,-37],[-44,12],[44,10],[-28,-38]]){E(p[0],p[1],6,5,C.OUT,{lw:1});}
  E(0,22,30,20,C.CREAM);P([[-9,8],[9,8],[0,18]],'#B0306A',{lw:2.4});
  if(o.exp==='chill'){for(const sx of[-1,1])stroke([[sx*20-8,-8],[sx*20,-2],[sx*20+8,-8]],{lw:3.4,noJit:true});}
  else for(const sx of[-1,1]){E(sx*20,-6,9,9,'#F2D35A',{lw:2.6});E(sx*20,-6,2.5,7,C.OUT,{lw:1});Ln(sx*36,-26,sx*9,-15,{lw:4});}
  if(o.mouth){R(-18,28,36,16,4,'#6A1010',{lw:2.6});for(const tx of[-10,0,10])P([[tx-4,28],[tx+4,28],[tx,36]],'#fff',{lw:1.4});}
  if(o.goggles){R(-36,-20,30,22,8,'#9FD0EA',{lw:3});R(6,-20,30,22,8,'#9FD0EA',{lw:3});Ln(-6,-10,6,-10,{lw:3});}
  restore();}
function jaguar(x,y,s,o={}){const Y=o.col||C.JAG,ph=o.run||0;save(x,y,s,o.rot||0,o.flip);
  stroke([[-90,-70],[-130,-80],[-150,-120],[-136,-150]],{lw:18});stroke([[-90,-70],[-130,-80],[-150,-120],[-136,-150]],{lw:10,col:Y});
  for(const l of[[-70,0],[-42,Math.PI],[44,.5],[70,Math.PI+.5]]){g.save();g.translate(l[0],-46);g.rotate(Math.sin(ph+l[1])*.4);R(-12,0,24,48,10,Y);g.restore();}
  E(0,-64,104,40,Y);
  if(!o.plain)for(const p of[[-56,-74],[-22,-82],[14,-70],[46,-82],[-66,-52],[-14,-54],[34,-52],[72,-66]])E(p[0],p[1],8,6,C.OUT,{lw:1});
  if(o.floaties){E(-40,-34,26,14,'#F07A2E');E(54,-34,26,14,'#F07A2E');}
  jagHead(108,-92,.8,{mouth:o.mouth,exp:o.exp,col:Y,plain:o.plain,goggles:o.goggles});
  restore();}
function caimanEyes(x,y,s,o={}){save(x,y,s,0,o.flip);const G='#56713A';
  R(-16,-8,150,24,12,G);E(126,-6,7,5,G);
  for(const ex of[0,36]){E(ex,-12,20,16,G);
    if(o.exp==='chill')stroke([[ex-8,-16],[ex,-10],[ex+8,-16]],{lw:3.4,noJit:true});
    else{E(ex,-15,10,10,'#E8D24A',{lw:2.4});Ln(ex,-23,ex,-7,{lw:3});Ln(ex-13,-32,ex+11,-22,{lw:3.6});}}
  restore();}
function snake(pts,wd=34,o={}){const col=o.col||C.SNK,belly=C.SNKB,n=pts.length;
  const L=[],Rt=[],B=[];for(let i=0;i<n;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)];let nx=-(b[1]-a[1]),ny=b[0]-a[0];const d=Math.hypot(nx,ny)||1;nx/=d;ny/=d;
    const w=wd*(o.tail!==false&&i<4?lerp(.25,1,i/4):1);L.push([pts[i][0]+nx*w,pts[i][1]+ny*w]);Rt.push([pts[i][0]-nx*w,pts[i][1]-ny*w]);B.push([pts[i][0]-nx*w*.35,pts[i][1]-ny*w*.35]);}
  shape(L.concat(Rt.slice().reverse()),col,{amp:1});
  shape(B.concat(Rt.slice().reverse()),belly,{amp:.6,lw:2.4});
  for(let i=1;i<n-1;i++)Ln(B[i][0],B[i][1],Rt[i][0],Rt[i][1],{lw:2,noJit:true});
  for(let i=2;i<n-1;i+=2){const p=pts[i],q=L[i];E(lerp(p[0],q[0],.5),lerp(p[1],q[1],.5),wd*.3,wd*.2,'#5A3511',{lw:1,rot:i});}
}
function path(fn,n=24){const out=[];for(let i=0;i<=n;i++)out.push(fn(i/n));return out;}
function snakeHead(x,y,s,o={}){save(x,y,s,o.rot||0,o.flip);shape([[-30,-10],[0,-40],[40,-44],[70,-26],[78,0],[60,14],[10,18],[-26,10]],C.SNK,{seed:301});dot(30,-24,o.exp==='dead'?0:7);if(o.exp==='dead'){Ln(22,-32,38,-16);Ln(38,-32,22,-16);}if(o.exp==='angry')Ln(18,-40,40,-32,{lw:4});if(o.lips)lips(64,8,.8);else Ln(50,8,76,4,{lw:2.6});if(o.tongue)stroke([[76,4],[96,8],[106,0]],{col:C.RED,lw:3});restore();}
function eagle(x,y,s,o={}){save(x,y,s,o.rot||0,o.flip);const Gr='#7D7D78',Dk='#3D3D3A';const f=Math.sin(o.t*12||0)*.25;
  for(const sd of[-1,1]){g.save();g.rotate(sd*f*.3);P([[-30,-20*sd],[-140,-90*sd-20],[-200,-60*sd-30],[-220,-10*sd-40],[-80,10*sd]].map(p=>[p[0]*.9,p[1]]),sd>0?Gr:Dk);g.restore();}
  E(0,0,80,40,'#ECEBE5');E(76,-22,34,30,Gr);P([[96,-28],[130,-14],[104,-4]],'#3A3A36',{lw:2.4});
  for(let i=0;i<4;i++)P([[50+i*8,-48],[42+i*8,-80],[60+i*8,-50]],Dk,{lw:2});
  dot(84,-28,5);Ln(70,-40,96,-34,{lw:4});
  for(const tx of[-10,20]){Ln(tx,36,tx+6,60,{lw:4});Ln(tx+6,60,tx+20,66,{lw:3});Ln(tx+6,60,tx-6,68,{lw:3});}
  restore();}
function monkey(x,y,s){save(x,y,s);E(0,-40,32,36,'#6B4A2E');E(0,-96,30,28,'#6B4A2E');E(0,-90,20,18,'#D9B98A');dot(-8,-96,4);dot(8,-96,4);stroke([[-6,-80],[0,-77],[6,-80]],{lw:2.4});E(-30,-100,10,10,'#D9B98A');E(30,-100,10,10,'#D9B98A');stroke([[28,-30],[70,-20],[80,-60]],{lw:6});restore();}
function turtle(x,y,s){save(x,y,s);R(-50,-20,30,24,8,'#7A8C4A');R(20,-20,30,24,8,'#7A8C4A');E(70,-36,22,18,'#8FA25A');dot(78,-40,4);E(0,-40,60,38,'#4F6B3A');Ln(-30,-60,30,-24,{lw:2.4});Ln(30,-60,-30,-24,{lw:2.4});restore();}
function coconut(x,y,s,o={}){save(x,y,s,o.rot||0);E(0,-44,46,44,'#6B4423');for(let i=0;i<4;i++)Ln(-30+i*18,-80,-26+i*18,-10,{lw:2,col:'#4A2C14'});E(-14,-50,9,9,'#fff',{lw:2.4});E(16,-50,9,9,'#fff',{lw:2.4});dot(-12,-50,3.5);dot(18,-50,3.5);restore();}
function stick(x,y,s,o={}){save(x,y,s,0,o.flip);const lw0=5.5;
  E(0,-170,32,32,'#fff',{lw:lw0});dot(-10,-174,4);dot(12,-174,4);
  if(o.smile)stroke([[-12,-158],[0,-150],[12,-158]],{lw:3.4});else stroke([[-10,-154],[-3,-158],[4,-152],[11,-156]],{lw:3.4});
  if(o.sweat)drop(-40,-192,1.1);
  Ln(0,-138,2,-64,{lw:lw0});
  const a=o.arms||[[-44,-100],[44,-100]];Ln(0,-118,a[0][0],a[0][1],{lw:lw0});Ln(0,-118,a[1][0],a[1][1],{lw:lw0});
  Ln(2,-64,-24,0,{lw:lw0});Ln(2,-64,26,0,{lw:lw0});
  if(o.hold)o.hold();
  restore();}

/* ---------- utilería y efectos ---------- */
function cake(x,y,t){E(x,y,74,14,'#fff');R(x-56,y-70,112,66,12,'#EE9CBF');R(x-60,y-82,120,22,11,'#fff');for(let i=0;i<6;i++)dot(x-40+i*16,y-36+(i%2)*14,4,['#6FA8C8',C.YEL,'#7FA34A'][i%3]);R(x-6,y-120,12,38,4,'#9FD0EA',{lw:2.6});E(x,y-132,7+Math.sin(t*30)*1.5,12,'#F0A126',{lw:2.6});}
function chair(x,y){R(x-80,y-200,18,205,4,'#A8743F');R(x+40,y-70,16,75,4,'#A8743F');R(x-84,y-82,140,18,4,'#A8743F');R(x-86,y-210,30,16,6,'#A8743F');}
function table(x,y,w=280){R(x,y,w,22,4,'#A8743F');R(x+20,y+20,18,90,4,'#8E6034');R(x+w-38,y+20,18,90,4,'#8E6034');}
function board(x,y,w,h,col='#3F5E3A'){R(x+30,y+h-10,14,240,3,'#A8743F');R(x+w-44,y+h-10,14,240,3,'#A8743F');R(x-10,y-10,w+20,h+20,8,'#A8743F');R(x,y,w,h,4,col);}
function chalk(s,x,y,size,k=1,col='#F2F2E8'){if(k<=0)return;g.save();g.font=`${size}px Patrick`;const w=g.measureText(s).width;g.beginPath();g.rect(x-2,y-size,w*k+6,size*2);g.clip();text(s,x,y,size,col,'Patrick','left');g.restore();}
function sign(x,y,txt,size=40,w){g.font=`${size}px Patrick`;w=w||g.measureText(txt).width+50;R(x-8,y,16,160,3,'#A8743F');R(x-w/2,y-size*.9,w,size*1.8,6,'#E9D9B4');text(txt,x,y,size,C.OUT,'Patrick');}
function bubble(s,x,y,size=44,tail=-1){g.font=`${size}px Patrick`;const w=g.measureText(s).width+44,h=size+30;
  const pts=rrPts(x-w/2,y-h/2,w,h,20);shape(pts,'#fff',{lw:3});P([[x+tail*14,y+h/2-4],[x+tail*40,y+h/2+30],[x+tail*44,y+h/2-4]],'#fff',{lw:3});g.fillStyle='#fff';g.fillRect(x+tail*14-(tail>0?0:30),y+h/2-8,30,8);text(s,x,y+2,size,C.OUT,'Patrick');}
function impact(s,x,y,k,col=C.YEL,tc=C.RED){if(k<=0||k>=1)return;const sc=back(cl(k*5))*(1+k*.1);save(x,y,sc,-.1);
  const pts=[];for(let i=0;i<20;i++){const a=i/20*TAU,r=i%2?80:140;pts.push([Math.cos(a)*r*1.4,Math.sin(a)*r]);}shape(pts,col,{lw:4,amp:3});text(s,0,6,86,tc,'Gochi','center',0,9,C.OUT);restore();}
function speed(cx,cy,seed){for(let i=0;i<50;i++){const a=rnd(i+seed)*TAU,r1=300+rnd(i*7+seed)*250;Ln(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1*.7,cx+Math.cos(a)*1500,cy+Math.sin(a)*1100,{lw:2+rnd(i*3)*4,noJit:true});}}
function smear(x,y,k,s=1,seed=1){if(k<=0)return;const e=eo(cl(k));save(x,y,s);for(let i=0;i<4;i++){const len=(120+rnd(seed+i)*120)*e,yy=(i-1.5)*22+rnd(seed*3+i)*10;const pts=[[-len/2,yy-9],[len/2,yy-14+rnd(i)*8],[len/2+10,yy],[len/2-6,yy+10],[-len/2,yy+8],[-len/2-12,yy]];shape(pts,C.RED,{stroke:false,amp:3});}restore();}
function splat(x,y,k,s=1,col=C.RED){if(k<=0)return;const e=eo(cl(k));save(x,y,s);E(0,0,90*e,24*e,col,{stroke:col!==C.RED,lw:3});for(let i=0;i<9;i++){const a=-Math.PI*rnd(i*5+2)-.1,d=e*(50+rnd(i)*100);E(Math.cos(a)*d*1.3,Math.sin(a)*d*.9+k*k*60,6+rnd(i*9)*10,6+rnd(i*9)*10,col,{stroke:col!==C.RED,lw:2.4});}restore();}
function confetti(t){const cs=[C.PINK,C.YEL,C.BLUE,'#7FA34A','#E77A2E'];for(let i=0;i<50;i++){const x=rnd(i)*W,y=-40+((t*(160+rnd(i*4)*160)+rnd(i*2)*1100)%1200);save(x+Math.sin(t*3+i)*20,y,1,t*4+i);R(-10,-6,20,12,2,cs[i%5],{lw:2,noJit:true});restore();}}
function flies(cx,cy,t,n=3){for(let i=0;i<n;i++){const a=t*6+i*2.1,x=cx+Math.cos(a)*60,y=cy+Math.sin(a*1.3)*26;dot(x,y,6);E(x-5,y-8,6,4,'#fff',{lw:1.8});E(x+5,y-8,6,4,'#fff',{lw:1.8});}}
function zzz(x,y,t){for(let i=0;i<3;i++){const k=(t*.5+i/3)%1;text('z',x+k*60,y-k*120,30+k*30,'#fff','Gochi','center',0,6,C.OUT);}}
function rain(t){for(let i=0;i<120;i++){const x=(rnd(i)*W+t*120)%W,y=(rnd(i*3)*H+t*900)%H;Ln(x,y,x-8,y+34,{lw:2.4,col:'#7C93A6',noJit:true});}}
function photo(x,y,lab,k,draw,rot=0){if(k<=0)return;save(x,y,back(k),rot);R(-80,-70,160,140,3,'#fff',{lw:3});g.save();g.beginPath();g.rect(-68,-60,136,100);g.clip();g.fillStyle='#DCE7D3';g.fillRect(-68,-60,136,100);draw();g.restore();R(-68,-60,136,100,2,null,{lw:2.4});text(lab,0,54,28,C.OUT,'Patrick');E(0,-70,9,9,C.RED,{lw:2.4});restore();}
function grave(x,y,name){P([[x-60,y],[x-60,y-140],[x-40,y-170],[x+40,y-170],[x+60,y-140],[x+60,y]],'#A8A69C');text('Q.E.P.D.',x,y-120,30,C.OUT,'Patrick');text(name,x,y-70,40,C.OUT,'Gochi');Ln(x+80,y,x+80,y-40,{col:'#3E5A2C'});E(x+80,y-48,12,12,C.PINK);dot(x+80,y-48,4,C.YEL);}

module.exports={path,W,H,TAU,C,setCtx,cl,seg,lerp,eo,eio,back,rnd,E,R,P,Ln,dot,curve,stroke,shape,save,restore,text,bg,bush,capy,bird,jagHead,jaguar,caimanEyes,snake,snakeHead,eagle,monkey,turtle,coconut,stick,cake,chair,table,board,chalk,sign,bubble,impact,speed,smear,splat,confetti,flies,zzz,rain,photo,grave,heart,drop,lips,water,eye,get g(){return g;}};
