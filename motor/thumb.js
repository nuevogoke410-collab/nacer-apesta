const fs=require('fs');const {createCanvas}=require('@napi-rs/canvas');
const X=require('./lib');const Q=require('./extra');const {W,H,C,E,R,P,Ln,text,save,restore}=X;
const cv=createCanvas(W,H),ctx=cv.getContext('2d');X.setCtx(ctx);
Q.sea('mar');
// fondo más llamativo: franja amarilla detrás del texto
R(60,80,1100,520,30,'rgba(255,248,214,0.92)',{lw:6});
text('Nacer como un',610,190,130,C.OUT,'Gochi','center',-.02);
text('PULPO',610,370,250,Q.PUL,'Gochi','center',.01,16,C.OUT);
save(640,540,1,-.1);R(-310,-90,620,180,14,null,{lw:10,col:C.RED});text('APESTA',0,6,170,C.RED,'Gochi');restore();
Q.pulpo(1500,1010,1.75,{t:0.6,exp:'sweat',mouth:'open'});
Q.larva(1180,720,2.2,0.3);Q.larva(1260,640,1.6,1.1);
const out=createCanvas(1280,720),o=out.getContext('2d');o.drawImage(cv,0,0,1280,720);
fs.writeFileSync('miniatura.jpg',out.toBuffer('image/jpeg',90));
