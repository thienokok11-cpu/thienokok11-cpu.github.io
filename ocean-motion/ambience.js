// Nhạc và tùy chọn giao diện; chuyển động nhân vật vẫn dùng CSS3.
const audio=document.querySelector('#sea-music'),button=document.querySelector('#music-toggle'),statusText=document.querySelector('#music-status');
const read=(key,fallback)=>{try{return localStorage.getItem(key)??fallback}catch{return fallback}};
const save=(key,value)=>{try{localStorage.setItem(key,value)}catch{}};
const scene=document.querySelector('#ocean-scene'),color=document.querySelector('#page-color'),volume=document.querySelector('#music-volume');
function setScene(value){document.body.dataset.ocean=value;scene.value=value;save('ocean-scene',value)}
function setColor(value){color.value=value;document.documentElement.style.setProperty('--paper',value);const rgb=value.slice(1).match(/../g).map(v=>parseInt(v,16));const dark=(rgb[0]*.299+rgb[1]*.587+rgb[2]*.114)<140;document.documentElement.style.setProperty('--ink',dark?'#eefaf8':'#103b42');document.documentElement.style.setProperty('--muted',dark?'#c4dbd8':'#657a7c');save('ocean-color',value)}
setScene(read('ocean-scene','tropical'));setColor(read('ocean-color','#f6f7f2'));volume.value=read('ocean-volume','0.3');audio.volume=Number(volume.value);
scene.addEventListener('change',()=>setScene(scene.value));color.addEventListener('input',()=>setColor(color.value));document.querySelector('#reset-color').addEventListener('click',()=>setColor('#f6f7f2'));volume.addEventListener('input',()=>{audio.volume=Number(volume.value);save('ocean-volume',volume.value)});
let wanted=read('ocean-music','on')!=='off';audio.autoplay=wanted;
async function play(){try{await audio.play()}catch{statusText.textContent='Nhấn Bật nhạc biển để bắt đầu.'}}
audio.addEventListener('play',()=>{button.textContent='Tắt nhạc biển';button.setAttribute('aria-pressed','true');statusText.textContent='Đang phát · Sóng êm · Nhạc không lời'});
audio.addEventListener('pause',()=>{button.textContent='Bật nhạc biển';button.setAttribute('aria-pressed','false');statusText.textContent='Nhạc đã tạm dừng'});
audio.addEventListener('error',()=>{statusText.textContent='Không tải được nhạc. Hãy kiểm tra tệp assets/sea-music.wav.'});
button.addEventListener('click',()=>{wanted=audio.paused;save('ocean-music',wanted?'on':'off');if(wanted)play();else audio.pause()});
document.addEventListener('pointerdown',e=>{if(wanted&&audio.paused&&!e.target.closest('#music-toggle'))play()},{once:true});
if(wanted)play();else audio.pause();
