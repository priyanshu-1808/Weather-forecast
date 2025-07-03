const apiKey = '397ecc8ade084d0b857114410250307';
const form = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherResult = document.getElementById('weatherResult');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const conditionText = document.getElementById('conditionText');
const weatherIcon = document.getElementById('weatherIcon');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (!location) return;

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather not found');
    const data = await res.json();

    cityName.textContent = data.location.name + ', ' + data.location.country;
    temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
    conditionText.textContent = data.current.condition.text;
    weatherIcon.src = `https:${data.current.condition.icon}`;
    weatherIcon.alt = data.current.condition.text;

    weatherResult.classList.remove('hidden');
  } catch (err) {
    alert('Could not fetch weather. Please try again.');
    weatherResult.classList.add('hidden');
  }
});
