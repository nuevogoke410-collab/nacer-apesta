// node render.js frames <id@fracción|segundos> ...  → prev/*.jpg
// node render.js chapter <n>                        → clips/chNN.mp4
const fs=require('fs'),{spawn}=require('child_process');
const {createCanvas}=require('@napi-rs/canvas');
const X=require('./lib');const {drawShot}=require('./shots');
const TL=require('./timeline.json');const G=require('./guion');
const {W,H}=X;const FPS=30,ANIM=12;
const cv=createCanvas(W,H),ctx=cv.getContext('2d');X.setCtx(ctx);
TL.forEach((s,i)=>{s.title=G[i].title;});
const END=TL[TL.length-1].end+1.5;
function S_for(s){return{ch:s.ch,title:s.title,D:s.end-s.start,L:k=>(s.lines[Math.min(k,s.lines.length-1)].start-s.start),dur:k=>s.lines[Math.min(k,s.lines.length-1)].dur};}
function shotAt(T){for(const s of TL)if(T<s.end)return s;return TL[TL.length-1];}
function wrap(txt,max){ctx.font='54px Patrick';const words=txt.split(' ');const lines=[];let cur='';for(const w of words){const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>max&&cur){lines.push(cur);cur=w;}else cur=t;}lines.push(cur);return lines;}
function subs(T,s){const l=s.lines.find(l=>T>=l.start-.05&&T<l.start+l.dur+.3);if(!l)return;
  const ls=wrap(l.txt,1500);ls.forEach((ln,i)=>{const y=H-70-(ls.length-1-i)*62;X.text(ln,W/2,y,54,'#FFFFFF','Patrick','center',0,10,'#1A0F06');});}
function frame(T){const s=shotAt(T);const lt=Math.floor((T-s.start)*ANIM)/ANIM;
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);
  drawShot(s.id,lt,S_for(s));ctx.setTransform(1,0,0,1,0,0);subs(T,s);}
const mode=process.argv[2];
if(mode==='frames'){fs.mkdirSync('prev',{recursive:true});for(const a of process.argv.slice(3)){let T;if(/^[a-z]/.test(a)){const [id,f]=a.split('@');const s=TL.find(x=>x.id===id);T=s.start+(s.end-s.start)*(+f||.6);}else T=+a;frame(T);fs.writeFileSync(`prev/${a}.jpg`,cv.toBuffer('image/jpeg',85));}}
if(mode==='chapter'){const ch=+process.argv[3];const shots=TL.filter(s=>s.ch===ch);const t0=shots[0].start,t1=ch===8?END:shots[shots.length-1].end;
  const n=Math.round((t1-t0)*FPS);const out=`clips/ch${String(ch).padStart(2,'0')}`;fs.mkdirSync('clips',{recursive:true});
  const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgba','-s',`${W}x${H}`,'-r',String(FPS),'-i','-','-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-r',String(FPS),out+'.tmp.mp4'],{stdio:['pipe','inherit','inherit']});
  let last=-1,buf=null;(async()=>{for(let i=0;i<n;i++){const T=t0+i/FPS;const key=Math.floor(T*ANIM);if(key!==last||!buf){frame(T);buf=Buffer.from(cv.data());last=key;}
      if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}ff.stdin.end();})();
  ff.on('close',c=>{if(c===0){fs.renameSync(out+'.tmp.mp4',out+'.mp4');console.log('ok',out,n,'frames');}else{console.error('ffmpeg falló',c);process.exit(1);}});}
