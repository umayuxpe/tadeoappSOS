<script>

const DESTINATION="+51999134777";
const PHONE=DESTINATION.replace(/\D/g,"");

const sosButton=document.getElementById("sosButton");
const statusEl=document.getElementById("status");
const preview=document.getElementById("preview");
const sendPanel=document.getElementById("sendPanel");

let lastMessage="";

function getCurrentDateTime(){
return new Date().toLocaleString("es-PE");
}

function buildAlertMessage(lat,lng,accuracy){

const link=`https://www.google.com/maps?q=${lat},${lng}`;
const precision=Math.round(accuracy||0);
const timestamp=getCurrentDateTime();

return `🌊 TADEO ALERTA - SOS 🛟

Necesito ayuda urgente.

📍 Ubicación:
${link}

🧭 Coordenadas: ${lat.toFixed(6)}, ${lng.toFixed(6)}
🎯 Precisión GPS: ${precision} m
🕒 Fecha y hora: ${timestamp}`;
}

function buildFallbackMessage(){
return `🌊 TADEO ALERTA - SOS 🛟

Necesito ayuda urgente.

🕒 Fecha y hora: ${getCurrentDateTime()}
No se pudo obtener la ubicación GPS.`;
}

function getLocation(){
return new Promise((resolve,reject)=>{

if(!navigator.geolocation){
reject();
return;
}

navigator.geolocation.getCurrentPosition(resolve,reject,{
enableHighAccuracy:true,
timeout:10000
});

});
}

function openWhatsApp(message){
const url=`https://api.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(message)}`;
window.location.href=url;
}

function openSMS(message){
const url=`sms:${PHONE}?body=${encodeURIComponent(message)}`;
window.location.href=url;
}

sosButton.addEventListener("click",async()=>{

statusEl.textContent="Obteniendo ubicación...";

try{

const pos=await getLocation();

const lat=pos.coords.latitude;
const lng=pos.coords.longitude;
const acc=pos.coords.accuracy;

lastMessage=buildAlertMessage(lat,lng,acc);

}
catch{

lastMessage=buildFallbackMessage();

}

preview.textContent=lastMessage;
preview.classList.add("active");
sendPanel.classList.add("active");

statusEl.textContent="Alerta preparada. Elige cómo enviarla.";

});

document.getElementById("sendWhatsAppBtn").onclick=()=>{
openWhatsApp(lastMessage);
};

document.getElementById("sendSmsBtn").onclick=()=>{
openSMS(lastMessage);
};

</script>