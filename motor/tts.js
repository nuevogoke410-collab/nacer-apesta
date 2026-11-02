const fs=require('fs'),{execFileSync}=require('child_process');
const G=require('./guion');
const PIPER='/tmp/voz/piper/piper', MODEL='/tmp/voz/carlfm/es-carlfm-x-low.onnx';
fs.mkdirSync('voz',{recursive:true});
const GAP=0.4, LEAD=0.5, TAIL=1.25;
let t=0, out=[];
G.forEach((s,i)=>{
  const shot={id:s.id,ch:s.ch,start:t,lines:[]};
  t+=LEAD;
  s.say.forEach((txt,j)=>{
    const f=`voz/${s.id}_${j}.wav`;
    if(!fs.existsSync(f)) execFileSync(PIPER,['-m',MODEL,'-f',f,'--length_scale','1.05','--sentence_silence','0.15'],{input:txt,stdio:['pipe','ignore','ignore']});
    const b=fs.readFileSync(f); const sr=b.readUInt32LE(24), bytes=b.length-44; const d=bytes/2/sr;
    shot.lines.push({txt,file:f,start:t,dur:d}); t+=d+GAP;
  });
  t+=TAIL-GAP; shot.end=t; out.push(shot);
});
fs.writeFileSync('timeline.json',JSON.stringify(out,null,1));
console.log('total',t.toFixed(1),'s =',(t/60).toFixed(2),'min');
