var COURSES=[
{id:"en",name:"Ingliz tili",ic:"🇬🇧",lessons:[
{t:"Salomlashish",q:[["“Hello” tarjimasi?",["Salom","Xayr","Rahmat"],0],["“Thank you” tarjimasi?",["Iltimos","Rahmat","Kechirasiz"],1],["“Good morning” tarjimasi?",["Xayrli tun","Xayrli tong","Xayrli kech"],1]]},
{t:"Raqamlar",q:[["“Three” bu?",["2","3","4"],1],["“Five” bu?",["5","6","7"],0],["“Ten” bu?",["9","10","11"],1]]}]},
{id:"ma",name:"Matematika",ic:"➗",lessons:[
{t:"Qoʻshish",q:[["7 + 8 = ?",["14","15","16"],1],["12 + 9 = ?",["21","22","20"],0],["25 + 25 = ?",["50","45","55"],0]]},
{t:"Koʻpaytirish",q:[["6 × 7 = ?",["42","36","48"],0],["9 × 8 = ?",["72","81","64"],0],["12 × 5 = ?",["50","60","70"],1]]}]},
{id:"pr",name:"Dasturlash",ic:"💻",lessons:[
{t:"HTML asoslari",q:[["Sahifa sarlavhasi uchun qaysi teg?",["<h1>","<p>","<img>"],0],["Havola yaratish tegi?",["<a>","<div>","<ul>"],0],["HTML nima?",["Sahifa tuzilish tili","Rasm formati","Brauzer nomi"],0]]},
{t:"JavaScript",q:[["Oʻzgaruvchi eʼlon qilish?",["let x = 5","x := 5","var: x"],0],["console.log nima qiladi?",["Konsolga chiqaradi","Faylni oʻchiradi","Sahifani yopadi"],0],["JavaScript qayerda ishlaydi?",["Brauzerda","Faqat kalkulyatorda","Faqat televizorda"],0]]}]},
{id:"sc",name:"Fan (Science)",ic:"🔬",lessons:[
{t:"Quyosh tizimi",q:[["Eng katta sayyora?",["Yer","Yupiter","Mars"],1],["Qizil sayyora qaysi?",["Mars","Venera","Saturn"],0],["Yer Quyosh atrofida necha kunda aylanadi?",["30","365","100"],1]]},
{t:"Suv",q:[["Suv formulasi?",["CO2","H2O","O2"],1],["Suv necha °C da qaynaydi?",["50","100","150"],1],["Suv qanday holatlarda boʻladi?",["Faqat suyuq","Qattiq, suyuq, gaz","Faqat gaz"],1]]}]}
];
var ACH=[
["first","🌱","Birinchi qadam","Birinchi darsni tugat",function(s){return cnt(s)>=1}],
["xp100","⚡","100 XP","100 XP to‘pla",function(s){return s.xp>=100}],
["st3","🔥","3 kunlik streak","3 kun ketma-ket o‘rgan",function(s){return s.streak>=3}],
["five","📚","Bilimdon","5 ta dars tugat",function(s){return cnt(s)>=5}],
["lv3","🏆","3-daraja","3-darajaga ko‘taril",function(s){return lvl(s)>=3}],
["perf","💎","Mukammal","Darsni xatosiz tugat",function(s){return s.perfect>0}]
];
var BOTS=[["Aziza",420],["Jasur",310],["Madina",260],["Bobur",190],["Dilnoza",120]];
var S=load();S.ob=S.ob||{a:{},i:0,started:false,done:false};
function load(){try{var d=JSON.parse(localStorage.getItem("learningai"));if(d)return d}catch(e){}
return{name:"Foydalanuvchi",xp:0,streak:0,last:"",done:{},perfect:0,snd:true,vol:0.5,ob:{a:{},i:0,started:false,done:false}}}
function save(){try{localStorage.setItem("learningai",JSON.stringify(S))}catch(e){}}
function cnt(s){return Object.keys(s.done).length}
function lvl(s){return Math.floor(s.xp/100)+1}
function today(d){return(d||new Date()).toISOString().slice(0,10)}
var AC=null;
function tone(f,d,t,delay){
if(!S.snd)return;
try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();
var o=AC.createOscillator(),g=AC.createGain(),st=AC.currentTime+(delay||0);
o.type=t||"sine";o.frequency.value=f;g.gain.setValueAtTime(S.vol*0.3,st);g.gain.exponentialRampToValueAtTime(0.001,st+d);
o.connect(g);g.connect(AC.destination);o.start(st);o.stop(st+d)}catch(e){}}
var SND={
click:function(){tone(520,.07,"square")},
ok:function(){tone(660,.12);tone(880,.2,"sine",.1)},
no:function(){tone(180,.3,"sawtooth")},
done:function(){[523,659,784,1047].forEach(function(f,i){tone(f,.2,"triangle",i*.12)})},
xp:function(){tone(1200,.08);tone(1600,.12,"sine",.08)},
lvl:function(){[392,523,659,784,1047].forEach(function(f,i){tone(f,.25,"square",i*.1)})}};
function toast(t){var e=document.createElement("div");e.className="toast";e.textContent=t;document.body.appendChild(e);setTimeout(function(){e.remove()},2200)}
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e}
var view="home",course=0,L=null;
var TABS=[["home","🏠","Bosh sahifa"],["courses","📖","Kurslar"],["board","🏅","Reyting"],["ach","🎖️","Yutuqlar"],["chat","🤖","AI yordamchi"],["me","👤","Profil"]];
function go(v){SND.click();view=v;L=null;render()}
function unlocked(c,i){return i===0||S.done[COURSES[c].id+(i-1)]}
function topbar(){
var t=el("div","top");
t.appendChild(el("div","chip","🔥 "+S.streak+" kun"));
t.appendChild(el("div","chip","⚡ "+S.xp+" XP"));
t.appendChild(el("div","chip","⭐ "+lvl(S)+"-daraja"));
return t}
function render(){
if(!S.ob.done){onb();return}
var nav=document.getElementById("nav");nav.style.display="";nav.textContent="";
nav.appendChild(el("div","logo","LEARNING AI"));
TABS.forEach(function(t){var b=el("button",view===t[0]?"on":"");b.appendChild(el("span","",t[1]));b.appendChild(el("span","",t[2]));b.onclick=function(){go(t[0])};nav.appendChild(b)});
var m=document.getElementById("main");m.textContent="";
if(L){lesson(m);return}
m.appendChild(topbar());
({home:home,courses:courses,board:board,ach:ach,chat:chat,me:me})[view](m);
window.scrollTo(0,0)}
function prog(c){var n=0;COURSES[c].lessons.forEach(function(x,i){if(S.done[COURSES[c].id+i])n++});return Math.round(n/COURSES[c].lessons.length*100)}
function home(m){
var c=COURSES[course];
var tabs=el("div","top");
COURSES.forEach(function(x,i){var b=el("button","chip",x.ic+" "+x.name);if(i===course)b.style.borderColor="var(--g)";b.onclick=function(){SND.click();course=i;render()};tabs.appendChild(b)});
m.appendChild(tabs);
var card=el("div","card");
card.appendChild(el("h2","",c.ic+" "+c.name));
var bar=el("div","bar");bar.appendChild(el("i"));bar.firstChild.style.width=prog(course)+"%";
card.appendChild(bar);card.appendChild(el("p","",prog(course)+"% bajarildi")).style.color="var(--mu)";
m.appendChild(card);
var p=el("div","path");
c.lessons.forEach(function(ls,i){
var ok=unlocked(course,i),dn=S.done[c.id+i];
var b=el("button","node"+(dn?" done":ok?"":" lock"),dn?"✓":ok?"★":"🔒");
b.onclick=function(){if(!ok){SND.no();toast("Avval oldingi darsni tugat");return}SND.click();start(i)};
p.appendChild(b);p.appendChild(el("div","",ls.t)).style.fontWeight="800"});
m.appendChild(p)}
function courses(m){
var g=el("div","grid");
COURSES.forEach(function(c,i){
var k=el("div","card");k.appendChild(el("div","",c.ic)).style.fontSize="40px";
k.appendChild(el("h2","",c.name));
var bar=el("div","bar");bar.appendChild(el("i"));bar.firstChild.style.width=prog(i)+"%";k.appendChild(bar);
k.appendChild(el("p","",c.lessons.length+" ta dars · "+prog(i)+"%")).style.color="var(--mu)";
var b=el("button","btn","Boshlash");b.onclick=function(){SND.click();course=i;view="home";render()};k.appendChild(b);g.appendChild(k)});
m.appendChild(g)}
function start(i){L={i:i,n:0,ok:0,sel:null};render()}
function lesson(m){
var c=COURSES[course],ls=c.lessons[L.i],q=ls.q[L.n];
var top=el("div","top");
var x=el("button","chip","✕");x.onclick=function(){go("home")};top.appendChild(x);
var bar=el("div","bar");bar.style.flex="1";bar.style.alignSelf="center";bar.appendChild(el("i"));bar.firstChild.style.width=(L.n/ls.q.length*100)+"%";top.appendChild(bar);
m.appendChild(top);
m.appendChild(el("h2","",q[0]));
var opts=[];
q[1].forEach(function(o,j){
var b=el("button","opt",o);opts.push(b);
b.onclick=function(){
if(L.sel!==null)return;
L.sel=j;var good=j===q[2];
if(good){L.ok++;S.xp+=10;SND.ok();setTimeout(SND.xp,250)}else SND.no();
b.classList.add(good?"ok":"no");opts[q[2]].classList.add("ok");
var f=el("div","fb "+(good?"ok":"no"),good?"To‘g‘ri! +10 XP":"Noto‘g‘ri. To‘g‘ri javob: "+q[1][q[2]]);
m.appendChild(f);
var nb=el("button","btn","Davom etish");nb.onclick=next;m.appendChild(nb);save()};
m.appendChild(b)})}
function next(){
SND.click();
var ls=COURSES[course].lessons[L.i];
L.n++;L.sel=null;
if(L.n<ls.q.length){render();return}
finish()}
function finish(){
var c=COURSES[course],before=lvl(S),perfect=L.ok===c.lessons[L.i].q.length;
var first=!S.done[c.id+L.i];
S.done[c.id+L.i]=true;
var bonus=first?20:5;S.xp+=bonus+(perfect?10:0);
if(perfect)S.perfect++;
var t=today(),y=today(new Date(Date.now()-864e5));
if(S.last!==t){S.streak=(S.last===y)?S.streak+1:1;S.last=t}
save();SND.done();
var res={ok:L.ok,tot:c.lessons[L.i].q.length,xp:bonus+(perfect?10:0)};
L=null;
var m=document.getElementById("main");m.textContent="";
var k=el("div","card");k.style.textAlign="center";
k.appendChild(el("div","","🎉")).style.fontSize="60px";
k.appendChild(el("h2","","Dars tugadi!"));
k.appendChild(el("p","",res.ok+"/"+res.tot+" to‘g‘ri · +"+res.xp+" XP"));
var b=el("button","btn","Davom etish");b.onclick=function(){go("home")};k.appendChild(b);
m.appendChild(k);
setTimeout(SND.xp,500);
if(lvl(S)>before)setTimeout(function(){SND.lvl();toast("🎊 Yangi daraja: "+lvl(S))},900);
ACH.forEach(function(a){if(a[4](S)&&!(S.ach||{})[a[0]]){S.ach=S.ach||{};S.ach[a[0]]=1;save();setTimeout(function(){toast("🎖️ Yutuq: "+a[2])},1600)}})}
function board(m){
var all=BOTS.concat([[S.name+" (siz)",S.xp]]).sort(function(a,b){return b[1]-a[1]});
var k=el("div","card");k.appendChild(el("h2","","🏅 Haftalik reyting"));
all.forEach(function(u,i){var r=el("div","row");r.appendChild(el("b","",(i+1)+"."));r.appendChild(el("div","ava",u[0][0]));var n=el("div","",u[0]);n.style.flex="1";if(u[0].indexOf("(siz)")>0)n.style.color="var(--y)";r.appendChild(n);r.appendChild(el("b","",u[1]+" XP"));k.appendChild(r)});
m.appendChild(k)}
function ach(m){
var g=el("div","grid");
ACH.forEach(function(a){var got=a[4](S);var k=el("div","card"+(got?"":" lock-a"));k.appendChild(el("div","",a[1])).style.fontSize="38px";k.appendChild(el("h2","",a[2]));k.appendChild(el("p","",a[3])).style.color="var(--mu)";g.appendChild(k)});
m.appendChild(g)}
function me(m){
var k=el("div","card");
k.appendChild(el("h2","","👤 Profil"));
var inp=el("input");inp.type="text";inp.value=S.name;inp.maxLength=20;
inp.onchange=function(){S.name=inp.value.trim()||"Foydalanuvchi";save()};
k.appendChild(inp);
var st=el("p","","Daraja: "+lvl(S)+" · XP: "+S.xp+" · Streak: "+S.streak+" kun · Tugatilgan darslar: "+cnt(S));k.appendChild(st);
var bar=el("div","bar");bar.appendChild(el("i"));bar.firstChild.style.width=(S.xp%100)+"%";k.appendChild(bar);
k.appendChild(el("p","",(100-S.xp%100)+" XP keyingi darajagacha")).style.color="var(--mu)";
m.appendChild(k);
var s=el("div","card");s.appendChild(el("h2","","🔊 Ovoz sozlamalari"));
var t=el("button","btn "+(S.snd?"":"y"),S.snd?"Ovoz: YOQILGAN":"Ovoz: Oʻchirilgan");
t.onclick=function(){S.snd=!S.snd;save();SND.click();render()};s.appendChild(t);
var r=el("input");r.type="range";r.min=0;r.max=1;r.step=0.05;r.value=S.vol;r.style.cssText="display:block;width:100%;margin-top:14px";
r.onchange=function(){S.vol=parseFloat(r.value);save();SND.xp()};s.appendChild(r);
m.appendChild(s);
var pk=el("div","card");pk.appendChild(el("h2","","🎯 My learning plan"));plan(pk);
var eb=el("button","btn y","Edit my answers");eb.onclick=function(){SND.click();S.ob.done=false;S.ob.i=0;S.ob.started=true;save();render()};pk.appendChild(eb);m.appendChild(pk);
var d=el("button","btn b","Progressni tozalash");d.style.marginBottom="20px";d.onclick=function(){if(confirm("Barcha progress oʻchadi. Davom etasizmi?")){localStorage.removeItem("learningai");S=load();render()}};
m.appendChild(d)}
function reply(q){
q=q.toLowerCase();
if(/salom|assalom|hello/.test(q))return"Salom! Men LEARNING AI yordamchisiman. Qaysi fan bo‘yicha yordam kerak?";
if(/xp|ball/.test(q))return"XP har bir to‘g‘ri javob uchun (+10) va dars tugatganda beriladi. Har 100 XP — yangi daraja!";
if(/streak|kun/.test(q))return"Streak — ketma-ket necha kun dars qilganingiz. Har kuni kamida 1 ta dars tugating!";
if(/ingliz|english/.test(q))return"Ingliz tilida har kuni 5–10 ta yangi so‘z yod oling va ularni gapda ishlating.";
if(/matem|hisob/.test(q))return"Matematikada avval jadvalni yaxshi bilib oling, so‘ng misollarni tez-tez ishlang.";
if(/dastur|html|js|javascript/.test(q))return"Dasturlashni kichik loyihalar bilan o‘rganing: avval HTML, keyin CSS, so‘ng JavaScript.";
if(/fan|science|fizika|kimyo/.test(q))return"Fanni tushunish uchun “nega?” deb so‘rang va kichik tajribalar qiling.";
if(/maslahat|qanday o.rgan/.test(q))return"Maslahat: kuniga 15 daqiqa, har kuni. Katta, lekin kamdan-kam o‘qishdan ko‘ra shu yaxshiroq.";
return"Bu savolga hozircha aniq javobim yo‘q. XP, streak yoki kurslar haqida so‘rab ko‘ring. Keyinchalik haqiqiy AI ulanadi."}
var MSGS=[["b","Salom! Menga o‘qish bo‘yicha savol bering 🙂"]];
function chat(m){
var k=el("div","card");k.appendChild(el("h2","","🤖 AI yordamchi"));
var box=el("div","chat");
MSGS.forEach(function(x){box.appendChild(el("div","m"+(x[0]==="u"?" u":""),x[1]))});
k.appendChild(box);
var inp=el("input");inp.type="text";inp.placeholder="Savolingizni yozing...";
function send(){var v=inp.value.trim();if(!v)return;SND.click();MSGS.push(["u",v]);MSGS.push(["b",reply(v)]);render()}
inp.onkeydown=function(e){if(e.key==="Enter")send()};
k.appendChild(inp);
var b=el("button","btn","Yuborish");b.style.marginTop="10px";b.onclick=send;k.appendChild(b);
m.appendChild(k);box.scrollTop=box.scrollHeight}
/* ===== ONBOARDING ===== */
var SUBJ=["➗ Mathematics","🇬🇧 English Language","💻 Programming","🔬 Science"];
var SCL=["Not at all","A little","Somewhat","Confident","Very confident"];
var INT=["Not interested","A little","Interested","Very interested","I love it"];
var CAN=["Yes, easily","Mostly","A little","Not yet"];
var CATS=[
["About You","👤",[
["Where did you hear about LEARNING AI?",["YouTube","TikTok","Instagram","Telegram","Google","Friends","Family","School","Website","Other"]],
["What is your main reason for using LEARNING AI?",["Improve my skills","School or exams","Career","Fun and curiosity","Study abroad","Build a habit"]],
["What is your age group?",["Under 13","13–17","18–24","25–34","35–44","45+"]],
["What is your current education level?",["Primary school","Secondary school","High school","College","University","Self-taught"]],
["What is your main learning goal?",["Pass exams","Get a better job","Learn a new skill","Study abroad","Personal growth","Build projects"],1],
["What motivates you to learn?",["XP and rewards","Daily streaks","Competing with friends","Achievements","Curiosity","Family and teachers"],1,1],
["Do you prefer studying alone or with others?",["Alone","With friends","With a teacher","A mix of both"],0,1],
["Which device do you use most often?",["Phone","Laptop","Desktop computer","Tablet"]],
["When do you usually study?",["Morning","Afternoon","Evening","Late night","It varies"]],
["How long have you been interested in learning?",["Just starting","Under 6 months","6–12 months","1–3 years","More than 3 years"],0,1]]],
["Subjects","📚",[
["Which subject do you want to learn first?",SUBJ],
["Which other subjects interest you?",SUBJ,1,1],
["Why did you choose these subjects?",["School needs","Career","Interest","Exams","Daily life","Challenge myself"],1],
["Which subject is currently the most difficult for you?",SUBJ.concat(["None"])],
["Which subject are you already good at?",SUBJ.concat(["None yet"]),0,1],
["How confident are you in Mathematics?",SCL],
["How confident are you in English?",SCL],
["How interested are you in Programming?",INT],
["How interested are you in Science?",INT],
["What do you want to achieve in your chosen subjects in 3 months?",["Finish a full course","Pass an exam","Build a project","Speak confidently","Keep a 30-day streak","Top the leaderboard"],1]]],
["Language Level","🗣️",[
["Which language do you want to learn?",["English","Russian","Turkish","German","Korean","Other"]],
["How well do you currently know this language?",["Complete beginner","Beginner (A1)","Elementary (A2)","Intermediate (B1)","Upper Intermediate (B2)","Advanced (C1)","Proficient (C2)","I don’t know my level","I understand but cannot speak well","I can speak but need more practice"]],
["Can you understand simple sentences?",CAN],
["Can you introduce yourself?",CAN],
["Can you understand conversations?",CAN],
["How good is your grammar?",["Very weak","Weak","Average","Good","Excellent"]],
["How large is your vocabulary?",["Very small","Small","Medium","Large","Very large"]],
["Can you write in this language?",CAN],
["What is your biggest difficulty?",["Speaking","Listening","Reading","Writing","Grammar","Vocabulary","Pronunciation"],1,1],
["What language level do you want to reach?",["A1","A2","B1","B2","C1","C2"]]]],
["Study Time","⏰",[
["How much time per day can you spend learning?",["10–15 minutes","30 minutes","1 hour","2 hours","3 hours","4 hours","5 hours","6 hours","More than 6 hours","It changes every day"]],
["How many days per week do you want to study?",["1–2 days","3 days","4 days","5 days","6 days","Every day"]],
["What time do you prefer studying?",["Early morning","Morning","Afternoon","Evening","Night"]],
["Do you prefer short or long lessons?",["Short (5 min)","Medium (15 min)","Long (30+ min)","A mix"]],
["How many lessons would you like per day?",["1","2","3","4–5","6 or more"]],
["Do you want daily reminders?",["Yes, every day","Only on study days","No reminders"],0,1],
["What daily streak goal would you like?",["3 days","7 days","14 days","30 days","100 days"]],
["Do you prefer learning in the morning or evening?",["Morning","Evening","No preference"],0,1],
["How much time can you spend on homework?",["None","15 minutes","30 minutes","1 hour","2+ hours"],0,1],
["What is your weekly learning target?",["2 lessons","5 lessons","10 lessons","20 lessons","30+ lessons"]]]]
];
var INTRO=["Great! Let’s get to know you better!","Awesome! Let’s continue!","Perfect! Here’s your next question!","Excellent! Keep going!","Nice one! Next up:","You’re doing great!","Fantastic! Almost there!","Wonderful! Let’s keep moving!","Cool! Here’s another one!","Super! Let’s go on!"];
var QS=[];CATS.forEach(function(c,ci){c[2].forEach(function(q){QS.push({c:ci,t:q[0],o:q[1],m:q[2],p:q[3]})})});
var ORDER=[10,11,20,21,30,31];
function onb(){
document.getElementById("nav").style.display="none";
var m=document.getElementById("main");m.textContent="";
var w=el("div","fade");w.style.cssText="max-width:640px;margin:0 auto";m.appendChild(w);
if(!S.ob.started)welcome(w);else if(S.ob.i>=ORDER.length)results(w);else question(w);
window.scrollTo(0,0)}
function welcome(w){
var k=el("div","card");k.style.cssText="text-align:center;padding:40px 20px;margin-top:8vh";
k.appendChild(el("div","","🎓")).style.fontSize="72px";
k.appendChild(el("h2","","Welcome to LEARNING AI! 🎉")).style.fontSize="28px";
k.appendChild(el("p","","Let’s personalize your learning journey.")).style.color="var(--mu)";
var b=el("button","btn","OK, LET’S START");b.onclick=function(){SND.click();S.ob.started=true;save();render()};
k.appendChild(b);w.appendChild(k)}
function question(w){
var o=S.ob,pos=o.i,id=ORDER[pos],q=QS[id],c=CATS[q.c];
var h=el("div","top");h.appendChild(el("div","chip",c[1]+" "+c[0]));h.appendChild(el("div","chip","Question "+(pos+1)+" of "+ORDER.length));w.appendChild(h);
var bar=el("div","bar");bar.appendChild(el("i"));bar.firstChild.style.width=(pos/ORDER.length*100)+"%";w.appendChild(bar);
w.appendChild(el("p","",INTRO[pos%INTRO.length])).style.cssText="color:var(--y);font-weight:800;margin:18px 0 6px";
w.appendChild(el("h2","",q.t));
var hint=el("p","",q.m?"Select all that apply":q.p?"Optional question":"Choose one answer");hint.style.color="var(--mu)";w.appendChild(hint);
var og=el("div","og"),btns=[];w.appendChild(og);
var act=el("div","ob-act");
var bk=el("button","btn g2","Back");bk.onclick=function(){SND.click();if(pos>0)o.i--;else o.started=false;save();render()};
var nx=el("button","btn",pos===ORDER.length-1?"Finish":"Continue");
nx.onclick=function(){SND.click();o.i++;save();render()};
function upd(){var a=o.a[id]||[];btns.forEach(function(b,j){b.className="opt"+(a.indexOf(j)>-1?" ok":"")});var off=!(q.p||a.length);nx.disabled=off;nx.style.opacity=off?.4:1}
q.o.forEach(function(t,j){
var b=el("button","opt",t);btns.push(b);
b.onclick=function(){SND.click();var a=(o.a[id]||[]).slice(),k=a.indexOf(j);
if(q.m){if(k>-1)a.splice(k,1);else a.push(j)}else a=[j];
o.a[id]=a;save();upd()};
og.appendChild(b)});
act.appendChild(bk);
if(q.p){var sk=el("button","btn g2","Skip");sk.onclick=function(){SND.click();o.a[id]=[];o.i++;save();render()};act.appendChild(sk)}
act.appendChild(nx);w.appendChild(act);upd()}
function plan(k){
var A=function(id){return S.ob.a[id]||[]};
var T=function(id){return A(id).map(function(j){return QS[id].o[j]})};
var first=T(10)[0]||SUBJ[0];
var subs=[first].concat(T(11).filter(function(x){return x!==first}));
var n=[2,3,4,5,6,7][A(31)[0]]||3;
var D=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
var P={2:[0,3],3:[0,2,4],4:[0,2,4,5],5:[0,1,2,3,4],6:[0,1,2,3,4,5],7:[0,1,2,3,4,5,6]}[n].map(function(i){return D[i]}).join(", ");
var rows=[["🎯 Recommended first subject",first],["📚 Selected subjects",subs.join(", ")],["🗣️ Current language level",(T(20)[0]||"—")+" · "+(T(21)[0]||"—")],["🏁 Target language level",T(29)[0]||"—"],["⏱️ Daily study time",T(30)[0]||"—"],["📅 Weekly schedule",P+" · "+(T(32)[0]||"anytime")],["🔥 Streak goal",T(36)[0]||"—"],["⭐ Personal goals",T(4).concat(T(19)).join(", ")||"—"]];
rows.filter(function(r){return r[1]!=="—"}).forEach(function(r){var d=el("div","pl");d.appendChild(el("b","",r[0]));d.appendChild(el("span","",r[1]));k.appendChild(d)});
return first}
function results(w){
var k=el("div","card");
k.appendChild(el("div","","🚀")).style.fontSize="56px";
k.appendChild(el("h2","","Your personalized learning plan"));
var first=plan(k);w.appendChild(k);
var act=el("div","ob-act");
var bk=el("button","btn g2","Back");bk.onclick=function(){SND.click();S.ob.i=ORDER.length-1;save();render()};
var go2=el("button","btn","START MY LEARNING JOURNEY");
go2.onclick=function(){var f=first.toLowerCase();course=f.indexOf("math")>-1?1:f.indexOf("program")>-1?2:f.indexOf("science")>-1?3:0;S.ob.done=true;view="home";save();SND.done();render()};
act.appendChild(bk);act.appendChild(go2);w.appendChild(act)}
render();
