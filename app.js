const qS = el => document.querySelector(el);
const cE = el => document.createElement(el);

const createEl = (type, cls = null, textContent = null, parent = null, ...attrs) => {
  const element = cE(type);
  element.className = cls
  element.textContent = textContent;
  attrs.length > 0 ? attrs.forEach(attr => element.setAttribute(attr?.name, attr?.value)) : '';
  element
  parent?.appendChild(element);
  return element;
};

const showWhatever = (obj) => {
  const wrapEl = createEl('div', 'wrapShowEl', null, mainEl);
  const backgroundVideo = createEl('video', 'backgroundVideo', null, wrapEl, { name: 'autoplay' }, { name: 'loop' }, { name: 'mute' });
  const sourceVideo = createEl('source', 'sourceVideo', null, backgroundVideo, { name: 'src', value: selectVideo(obj) });
  const titleCity = createEl('h1', 'titleCity', `${obj.location.name}`, wrapEl);
  const iconWeather = createEl('img', 'iconWeather', null, wrapEl, { name: 'src', value: selectIcon(obj) }, { name: 'alt', value: obj.current.condition.text });
  const wrapInfo = createEl('div', 'wrapInfo', null, wrapEl);
  const labelTemperature = createEl('h2', 'labelTemperature', 'temepratura', wrapInfo);
  const temperature = createEl('h2', 'temperature', `${obj.current.temp_c}°`, wrapInfo);
  const labelFeelsLike = createEl('h2', 'labelFeelsLike', 'percepita', wrapInfo);
  const feelsLike = createEl('h2', 'feelsLike', `${obj.current.feelslike_c}°`, wrapInfo);

  return wrapEl;
}

const selectIcon = (obj) => {
  if (obj.current.condition.code === 1003 || obj.current.condition.code === 1006) {
    return './src/icons/cloud.png';
  } else if (obj.current.condition.code === 1000) {
    return './src/icons/clear.png';
  } else if (obj.current.condition.code === 1240 || obj.current.condition.code === 1183) {
    return './src/icons/rain.png';
  } else if (obj.current.condition.code === 1276) {
    return './src/icons/storm.png';
  } else {
    return './src/icons/clear.png';
  }
}

const selectVideo = (obj) => {
  if (obj.current.condition.code === 1003 || obj.current.condition.code === 1006) {
    return './src/background/cloud.mp4';
  } else if (obj.current.condition.code === 1000) {
    return './src/background/clear.mp4';
  } else if (obj.current.condition.code === 1240 || obj.current.condition.code === 1183) {
    return './src/background/rain1.mp4';
  } else if (obj.current.condition.code === 1276) {
    return './src/background/storm.mp4';
  } else {
    return './src/background/clear.mp4';
  }
}

const callApiWeather = async (city) => {
  const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
  const data = await res.json();
  return data
}

const mainEl = qS('.main');
const body = qS('body');
const API_KEY = '7a657347e36b4bd8ae0125525232205';
const inputCity = qS('.input-city');

callApiWeather('palermo').then(data => showWhatever(data));

inputCity.addEventListener('change', (e) => {
  if (e.target.value === '') {
    mainEl.textContent = '';
    callApiWeather('palermo').then(data => showWhatever(data));
  } else {
    mainEl.textContent = '';
    callApiWeather(`${e.target.value}`).then(data => showWhatever(data));
  }
});