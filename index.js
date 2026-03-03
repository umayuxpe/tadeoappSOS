const WHATSAPP_NUMBER = "51940900238";

const statusEl = document.getElementById("status");
const sosButton = document.getElementById("sosButton");

function openWhatsApp(message){
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.location.assign(url);
}

function getGeoPosition(){
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject();
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 0
    });
  });
}

sosButton.addEventListener("click", async () => {

  statusEl.textContent = "Obteniendo ubicación...";

  try{

    const pos = await getGeoPosition();

    const { latitude, longitude, accuracy } = pos.coords;

    const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    const precision = Math.round(accuracy);

    const message =
      `🌊 TADEO ALERTA - SOS 🛟

Necesito ayuda. Me encuentro en esta ubicación:
${mapsLink}

Precisión aprox.: ${precision} m`;

    statusEl.textContent = "Abriendo WhatsApp...";

    openWhatsApp(message);

  }catch{

    statusEl.textContent = "No se pudo obtener ubicación. Enviando sin GPS...";

    openWhatsApp(`🌊 TADEO ALERTA - SOS 🛟

Necesito ayuda.`);

  }

});
