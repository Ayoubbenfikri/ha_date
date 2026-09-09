const screens = {
  welcome: document.getElementById("welcome"),
  planner: document.getElementById("planner"),
  final: document.getElementById("final"),
  kiss: document.getElementById("kiss"),
  result: document.getElementById("result")
};

const data = { date:"", time:"", food:"", loved:"", kiss:"" };

function show(name){
  Object.values(screens).forEach(s=>s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

function minDate(){
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0,10);
}
document.getElementById("date").min = minDate();

document.getElementById("yesBtn").onclick = () => show("planner");

const noBtn = document.getElementById("noBtn");
const noHint = document.getElementById("noHint");
let noCount = 0;
noBtn.onclick = () => {
  noCount++;
  const messages = [
    "Hmmm… la yak , mamragtich , chofi dik ah rah khdama 😏",
    "malki makathachmi khtari ah ",
    "wlah makthachmi😂",
    "Hafssa, had button ma kaykhdemch mzyan ",
    "Safi safi… daba khassk tgoli Ah ❤️"
  ];
  noHint.textContent = messages[Math.min(noCount-1,messages.length-1)];
  if(noCount >= 3){
    noBtn.style.position = "relative";
    noBtn.animate([{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300});
  }
};

document.querySelectorAll(".food").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".food").forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    data.food = btn.dataset.food;
  };
});

document.getElementById("nextBtn").onclick=()=>{
  data.date = document.getElementById("date").value;
  data.time = document.getElementById("time").value;
  const error = document.getElementById("error");
  if(!data.date || !data.time || !data.food){
    error.textContent = "Khassek tkhtari nhar, sa3a w chno bghiti naklo ❤️";
    return;
  }
  show("final");
};

document.getElementById("loveYes").onclick=()=>{
  data.loved = "Ah ❤️";
  show("kiss");
};
document.getElementById("loveNo").onclick=()=>{
  data.loved = "La ";
  show("kiss");
};

document.getElementById("kissYes").onclick=()=>{
  data.kiss = "na3tiha lahbibi 😘";
  finish();
};
document.getElementById("kissNo").onclick=()=>{
  data.kiss = "la, lah ymaskhak 😂";
  finish();
};

function formatDate(value){
  const [y,m,d]=value.split("-");
  return `${d}/${m}/${y}`;
}

function finish(){
  const icon = document.getElementById("resultIcon");
  const title = document.getElementById("resultTitle");
  const text = document.getElementById("resultText");
  if(data.loved === "Ah ❤️"){
    icon.textContent="💖";
    title.textContent="ta ana kanbghik alhbiba dyali , lah ykhalik liya  ❤️";
    text.textContent=`Date: ${formatDate(data.date)} à ${data.time} • ${data.food}`;
  }else{
    icon.textContent="";
    title.textContent="yak al bagra ";
    text.textContent=`Hafssa a choisi “La” pour la dernière question. Mais le date était prévu le ${formatDate(data.date)} à ${data.time}, avec ${data.food}.`;
  }
  show("result");
}

document.getElementById("whatsappBtn").onclick=()=>{
  const loved = data.loved === "Ah " ? "OUI " : "NON ";
  const msg =
` first Date 

Réponse pour sortir : OUI 

Jour : ${formatDate(data.date)}
Heure : ${data.time}
ach ghadi naklo  : ${data.food}

 “Wach katbghini o bagha tkamli hyatek m3aya ?”
Réponse : ${loved}

“3tini bousa”
Réponse : ${data.kiss}

`;

  window.open("https://wa.me/212784716998?text="+encodeURIComponent(msg),"_blank");
};

document.getElementById("restartBtn").onclick=()=>{
  // reset toutes les réponses pour recommencer depuis le début
  data.date = ""; data.time = ""; data.food = ""; data.loved = ""; data.kiss = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  document.querySelectorAll(".food").forEach(b=>b.classList.remove("selected"));
  document.getElementById("error").textContent = "";
  noCount = 0;
  noHint.textContent = "";
  show("welcome");
};

// Petite animation de cœurs
const hearts = document.querySelector(".hearts");
setInterval(()=>{
  const h=document.createElement("span");
  h.className="floating-heart";
  h.textContent=["❤️","💕","💗","✨"][Math.floor(Math.random()*4)];
  h.style.left=Math.random()*100+"%";
  h.style.fontSize=(12+Math.random()*18)+"px";
  h.style.animationDuration=(5+Math.random()*5)+"s";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),10000);
},900);
