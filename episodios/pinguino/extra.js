// Personajes y fondos para "Nacer como un pingüino emperador apesta"
const X=require('./lib');
const {createCanvas}=require('@napi-rs/canvas');
const {W,H,C,TAU,rnd,lerp,E,R,P,Ln,dot,stroke,save,restore,text,eye,cl,seg,eo,back,heart}=X;
const BK='#2B2B33', BKL='#3D3D48', WH='#F6F4EC', YL='#F0B33A', GR='#A9ABAE', GRD='#7C7E84', SNOW='#E4EDF3', SNOW2='#F4F8FA', SEA='#5E8FAE', SEA2='#8DB4CB', SEAD='#2F5470';
const cache={};
function cached(name,fn){
  if(!cache[name]){const cv=createCanvas(W,H);const prev=X.g;X.setCtx(cv.getContext('2d'));fn();X.setCtx(prev);cache[name]=cv;}
  X.g.drawImage(cache[name],0,0);
}
function berg(x,yb,w,h,seed){P([[x-w/2,yb],[x-w*.3,yb-h*.7],[x-w*.05,yb-h],[x+w*.2,yb-h*.8],[x+w/2,yb]],'#D5E6F0',{seed});P([[x-w*.05,yb-h],[x+w*.2,yb-h*.8],[x+w*.28,yb-h*.4],[x+w*.05,yb-h*.55]],'#fff',{seed:seed+1,lw:2.6});}
function antartida(){cached('antartida',()=>{const g=X.g;g.fillStyle='#fff';g.fillRect(0,0,W,H);
  berg(300,420,700,230,1);berg(1000,420,900,300,5);berg(1650,420,760,240,9);
  P([[-40,410],[W*.4,400],[W+40,412],[W+40,H+40],[-40,H+40]],SNOW,{seed:12});
  for(let i=0;i<14;i++){const x=rnd(i+3)*W,y=470+rnd(i*3)*520;Ln(x,y,x+50+rnd(i)*50,y,{col:'#B5C8D4',lw:2.6});}});}
function tormenta(){cached('tormenta',()=>{antartida();const g=X.g;g.fillStyle='rgba(150,165,180,.55)';g.fillRect(0,0,W,H);});}
function borde(){cached('borde',()=>{const g=X.g;g.fillStyle='#fff';g.fillRect(0,0,W,H);
  berg(260,420,600,200,2);berg(1500,420,800,260,7);
  P([[-40,410],[W,412],[W+40,H+40],[-40,H+40]],SEA,{seed:21});
  for(let i=0;i<10;i++){const x=900+rnd(i+5)*1000,y=470+rnd(i*2+7)*500;Ln(x,y,x+70,y,{col:SEA2,lw:3});}
  P([[-40,410],[W*.4,400],[1020,420],[880,H+40],[-40,H+40]],SNOW,{seed:22});
  P([[-40,880],[900,872],[880,H+40],[-40,H+40]],SNOW2,{seed:23,stroke:false});});}
function submarino(){cached('submarino',()=>{const g=X.g;const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#6FA3C2');gr.addColorStop(1,'#1C3A52');g.fillStyle=gr;g.fillRect(0,0,W,H);
  for(let i=0;i<12;i++){const x=rnd(i+2)*W,y=60+rnd(i*3)*900;Ln(x,y,x+80+rnd(i)*60,y,{col:'rgba(255,255,255,.25)',lw:3});}
  P([[-40,110],[W*.3,100],[W*.7,115],[W+40,104],[W+40,60],[-40,60]],'#E4EDF3',{seed:31});});}
function noche(){cached('noche',()=>{antartida();const g=X.g;g.fillStyle='rgba(20,28,60,.62)';g.fillRect(0,0,W,H);
  for(let k=0;k<3;k++){const gr=['rgba(90,230,160,.45)','rgba(120,200,255,.4)','rgba(190,120,255,.35)'][k];g.fillStyle=gr;g.beginPath();g.moveTo(0,160+k*40);for(let x=0;x<=W;x+=60)g.lineTo(x,150+k*45+Math.sin(x/200+k)*50);g.lineTo(W,260+k*45);for(let x=W;x>=0;x-=60)g.lineTo(x,250+k*45+Math.sin(x/230+k)*40);g.fill();}
  for(let i=0;i<24;i++)dot(rnd(i)*W,40+rnd(i+9)*300,2.5,'#F4EFC8');});}
function museo(){cached('museo',()=>{const g=X.g;g.fillStyle='#F1E7D0';g.fillRect(0,0,W,H);P([[-40,800],[W+40,790],[W+40,H+40],[-40,H+40]],'#B79A6A',{seed:7});for(let i=0;i<8;i++)R(80+i*240,20,6,100,2,'#555',{lw:2});});}
function bg(k){
  if(k==='antartida')return antartida();if(k==='tormenta')return tormenta();if(k==='borde')return borde();
  if(k==='submarino')return submarino();if(k==='noche')return noche();if(k==='museo')return museo();X.bg(k);
}
function ground(){P([[-40,880],[W+40,872],[W+40,H+40],[-40,H+40]],SNOW2,{seed:77,stroke:false});Ln(-40,880,W+40,872,{lw:2.6,col:'#B5C8D4'});}
function nieve(t,n=70){const g=X.g;for(let i=0;i<n;i++){const x=(rnd(i)*W+Math.sin(t*1.5+i)*30)%W,y=(rnd(i*3)*H+t*110*(.6+rnd(i*7)))%H;dot(x,y,3+rnd(i*5)*3,'#fff');g.beginPath();g.arc(x,y,4+rnd(i*5)*3,0,TAU);g.lineWidth=2;g.strokeStyle='#B5C8D4';g.stroke();}}
function viento(t,n=40){for(let i=0;i<n;i++){const x=((rnd(i)*W*1.4)-t*1500*(.5+rnd(i*7)))%(W*1.4);const xx=x<0?x+W*1.4:x;const y=rnd(i*3)*H;Ln(xx-200,y,xx,y+rnd(i*5)*10,{lw:2.6,col:'rgba(255,255,255,.9)',noJit:true});}}
function above(yline,fn){const g=X.g;g.save();g.beginPath();g.rect(0,0,W,yline);g.clip();fn();g.restore();}
/* ---------- pingüino ---------- */
// origen = pies, mira a la derecha. o: baby, exp, flip, rot, walk, lips, hat, glasses, band, grad, tie, scarf, egg, hold, noFeet, wing(rad)
function pingu(x,y,s=1,o={}){
  const b=o.baby;save(x,y,b?s*.7:s,o.rot||0,o.flip);const ph=o.walk||0;
  const BODY=b?'#9C9EA3':BK,BELLY=b?'#C4C6CA':WH,a=Math.sin(ph)*5;
  if(!o.noFeet){E(-16+a,-6,24,10,YL,{lw:3});E(30-a,-6,24,10,YL,{lw:3});}
  // aleta trasera
  g_wing(-46,-130,o.wing??.3,BODY,-1);
  E(0,-118,66,102,BODY,{seed:81});
  E(14,-110,46,86,BELLY,{stroke:false,seed:83});
  if(b){for(let i=0;i<9;i++){const px=-50+rnd(i+2)*100,py=-190+rnd(i*3)*150;Ln(px,py,px+(rnd(i)-.5)*10,py+8,{lw:2,col:'#7C7E84'});}}
  if(!b)E(18,-190,26,12,YL,{stroke:false,rot:.2});
  // cabeza
  const hx=18,hy=-218;
  E(hx,hy,44,40,b?'#6B6C72':BK,{seed:84});
  if(b){E(hx+10,hy+4,32,28,WH,{stroke:false});}
  else{P([[hx-4,hy+22],[hx+28,hy+26],[hx+34,hy+54],[hx+6,hy+60]],YL,{lw:2.4,amp:.6});}
  // pico
  P([[hx+32,hy+2],[hx+78,hy+12],[hx+34,hy+22]],'#E87B2E',{lw:2.8,amp:.6});Ln(hx+34,hy+12,hx+72,hy+12,{lw:2,col:'#9A4A18',noJit:true});
  if(b)E(hx+22,hy-6,12,10,'#fff',{stroke:false});
  eye(hx+22,hy-8,o.exp||'normal');
  if(o.lips)X.lips(hx+46,hy+26,.5);
  // aleta delantera
  g_wing(44,-132,o.wing2??-.3,BODY,1);
  if(o.egg){E(18,-20,24,30,'#F4F0E6',{lw:3});P([[-20,-36],[56,-36],[48,-4],[-12,-4]],b?'#C4C6CA':WH,{lw:2.4});}
  if(o.scarf){P([[-34,-186],[52,-190],[56,-168],[-30,-164]],'#C43A3A',{lw:2.6});P([[28,-170],[48,-166],[50,-110],[34,-112]],'#C43A3A',{lw:2.6});}
  if(o.tie)P([[8,-176],[28,-176],[24,-164],[34,-120],[18,-110],[6,-122],[14,-164]],'#C03A3A',{lw:2.6});
  if(o.hat){P([[hx-22,hy-34],[hx+22,hy-38],[hx,hy-100]],'#E86AA6');Ln(hx-10,hy-58,hx+10,hy-60,{col:C.YEL,lw:5});E(hx,hy-104,9,9,C.YEL);}
  if(o.crown){P([[hx-24,hy-34],[hx+26,hy-38],[hx+30,hy-74],[hx+14,hy-56],[hx+2,hy-82],[hx-10,hy-56],[hx-24,hy-72]],C.YEL);}
  if(o.glasses){E(hx+22,hy-8,16,14,null,{lw:3});E(hx+52,hy+8,10,9,null,{lw:3});}
  if(o.band)P([[hx-40,hy-22],[hx+44,hy-18],[hx+44,hy-6],[hx-40,hy-10]],'#D9473A',{lw:2.6});
  if(o.hold)o.hold();
  restore();
}
function g_wing(x,y,rot,col,side){save(x,y,1,rot);E(side*6,40,18,52,col,{lw:3.2});restore();}
/* ---------- Aurelio: el guante rojo ---------- */
function guante(x,y,s=1,o={}){
  save(x,y,s,o.rot||0,o.flip);const RD='#D23A3A';
  for(const f of[[-24,-118,56],[-6,-132,72],[14,-126,66],[32,-108,50]])R(f[0]-9,f[1],20,f[2],9,RD,{lw:3});
  P([[-34,-84],[-34,-20],[38,-20],[38,-84]],RD,{lw:3});
  R(-40,-40,84,18,4,'#F6F4EC',{lw:3});
  R(34,-66,40,18,9,RD,{lw:3});
  const ex=o.exp||'normal';
  if(ex==='normal'){E(-12,-62,9,9,'#fff',{lw:2.4});E(14,-62,9,9,'#fff',{lw:2.4});dot(-10,-62,3.4);dot(16,-62,3.4);}
  else{eye(-12,-62,ex);eye(14,-62,ex);}
  if(o.smile)stroke([[-6,-46],[2,-41],[10,-46]],{lw:2.6});
  restore();
}
/* ---------- depredadores ---------- */
function foca(x,y,s=1,o={}){ // foca leopardo, mira a la derecha
  save(x,y,s,o.rot||0,o.flip);const B='#6F7C80',L='#B9C2C4';
  P([[-190,-30],[-130,-76],[-30,-100],[70,-96],[130,-82],[150,-30],[60,-10],[-70,-8]],B,{seed:41});
  P([[-90,-30],[40,-40],[110,-34],[60,-12],[-70,-12]],L,{stroke:false});
  P([[-190,-30],[-240,-50],[-250,-10],[-230,-4]],B,{lw:3});
  for(const p of[[-100,-70],[-40,-84],[20,-86],[80,-78],[-70,-50],[0,-62],[60,-58]])dot(p[0],p[1],5,'#3C4548');
  E(150,-64,52,38,B,{seed:42});E(180,-50,36,24,L,{lw:3});dot(200,-60,6);
  if(o.mouth){P([[160,-56],[212,-62],[208,-30],[170,-28]],'#8A1818',{lw:2.6});for(const tx of[172,186,200])P([[tx,-58],[tx+8,-58],[tx+4,-46]],'#fff',{lw:1.4});}
  eye(150,-76,o.exp||'angry');
  R(40,-18,60,22,10,B,{lw:3});
  restore();}
function orca(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);
  P([[-260,-20],[-200,-90],[-80,-130],[100,-120],[230,-70],[250,0],[140,50],[-60,60],[-200,40]],'#26262C',{seed:51});
  P([[-80,10],[60,6],[200,-4],[140,50],[-60,60]],'#F6F4EC',{stroke:false});
  P([[-30,-124],[10,-210],[60,-120]],'#26262C',{lw:3});
  P([[-260,-20],[-330,-80],[-330,40]],'#26262C',{lw:3});
  E(130,-50,26,14,'#F6F4EC',{lw:2.4,rot:.2});dot(138,-50,5);
  if(o.mouth){P([[170,-6],[252,-4],[240,40],[180,34]],'#8A1818',{lw:2.6});for(const tx of[190,206,222,238])P([[tx,-6],[tx+10,-6],[tx+5,6]],'#fff',{lw:1.4});}
  restore();}
function ave(x,y,s=1,o={}){ // petrel gigante / págalo. mira a la derecha
  save(x,y,s,o.rot||0,o.flip);const B=o.col||'#7A6A58',D='#4E4235',f=Math.sin((o.t||0)*14)*.5;
  for(const sd of[-1,1]){X.g.save();X.g.translate(-6,-10);X.g.rotate(sd*f*.5-(sd<0?.1:0));P([[0,0],[-70,-70*sd-10],[-170,-60*sd-20],[-190,-10*sd],[-60,20]].map(p=>[p[0]*.8,p[1]]),sd>0?B:D,{lw:3});X.g.restore();}
  E(0,0,70,34,B,{seed:61});E(56,-14,26,22,B);
  P([[74,-20],[112,-6],[96,6],[74,-2]],'#E4B33A',{lw:2.4,amp:.5});P([[100,-6],[112,-6],[102,10]],'#B88A20',{lw:2});
  eye(60,-20,o.exp||'angry');
  restore();}
function huevo(x,y,s=1,o={}){save(x,y,s,o.rot||0);E(0,-34,28,36,'#F4F0E6',{lw:3});if(o.crack){Ln(-8,-50,0,-38,{lw:2.4});Ln(0,-38,8,-52,{lw:2.4});Ln(8,-52,14,-40,{lw:2.4});}restore();}
function pez(x,y,s=1,o={}){save(x,y,s,o.rot||0,o.flip);E(0,0,36,18,'#8FB0C8',{lw:2.8});P([[-34,0],[-56,-16],[-56,16]],'#8FB0C8',{lw:2.8});dot(18,-4,3.4);restore();}
function cartel(x,y,txt,k,size=34){if(k<=0)return;X.g.font=`${size}px Patrick`;const w=X.g.measureText(txt).width+34;save(x,y,X.back(k));R(-w/2,-26,w,50,8,'#fff',{lw:2.6});text(txt,0,0,size,C.OUT,'Patrick');restore();}
function copo(x,y,s=1){save(x,y,s);for(let i=0;i<3;i++){Ln(-14,0,14,0,{lw:3,noJit:true,col:'#8FB0C8'});X.g.rotate(Math.PI/3);}restore();}
module.exports={bg,pingu,guante,foca,orca,ave,huevo,pez,cartel,copo,ground,nieve,viento,above,SEA,SEA2,SEAD,BK,WH,YL,SNOW,SNOW2};
