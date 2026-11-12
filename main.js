/* The Bass Coach: the lesson reel and the playable strings.
   No dependencies, no network requests, nothing stored. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- The reel: plays muted on a loop, with a pause button ---- */

  var video = document.querySelector('.reel__video');
  var toggle = document.querySelector('.reel__toggle');

  if (video && toggle) {
    var label = function () {
      var playing = !video.paused;
      toggle.textContent = playing ? 'Pause' : 'Play';
      toggle.setAttribute('aria-label', playing ? 'Pause the video' : 'Play the video');
    };

    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      if (video.paused) {
        var started = video.play();
        if (started && started.catch) started.catch(function () {});
      } else {
        video.pause();
      }
    });
    video.addEventListener('play', label);
    video.addEventListener('pause', label);

    if (!reduceMotion) {
      var autoplay = video.play();
      if (autoplay && autoplay.catch) autoplay.catch(function () {});
    }
    label();
  }

  /* ---- The strings: press one to hear it ---- */

  var strings = Array.prototype.slice.call(document.querySelectorAll('.string'));
  if (!strings.length) return;

  var REST = 'M0 20 L1000 20';
  var frames = new WeakMap();
  var audio = null;

  // A plucked note: the true pitch plus its octave, so it still speaks on phone speakers.
  function sound(freq) {
    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audio) audio = new AudioCtx();
    if (audio.state === 'suspended') audio.resume();

    var now = audio.currentTime;
    var out = audio.createGain();
    out.gain.setValueAtTime(0.0001, now);
    out.gain.exponentialRampToValueAtTime(0.4, now + 0.01);
    out.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    var tone = audio.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.setValueAtTime(1500, now);
    tone.frequency.exponentialRampToValueAtTime(300, now + 1.2);

    tone.connect(out);
    out.connect(audio.destination);

    [
      ['sine', freq, 0.9],
      ['triangle', freq * 2, 0.6],
      ['sawtooth', freq * 2, 0.16]
    ].forEach(function (part) {
      var osc = audio.createOscillator();
      var level = audio.createGain();
      osc.type = part[0];
      osc.frequency.value = part[1];
      level.gain.value = part[2];
      osc.connect(level);
      level.connect(tone);
      osc.start(now);
      osc.stop(now + 2.3);
    });
  }

  // Bend the string and let it settle.
  function pluck(el, strength) {
    if (reduceMotion) return;
    var path = el.querySelector('path');
    var speed = Number(el.getAttribute('data-speed')) || 50;
    var start = performance.now();

    cancelAnimationFrame(frames.get(el));
    el.classList.add('is-ringing');

    function frame(time) {
      var t = (time - start) / 1000;
      if (t > 1.6) {
        path.setAttribute('d', REST);
        el.classList.remove('is-ringing');
        return;
      }
      var bend = 13 * strength * Math.exp(-t * 2.8) * Math.sin(t * speed);
      path.setAttribute('d', 'M0 20 Q500 ' + (20 + bend * 2).toFixed(2) + ' 1000 20');
      frames.set(el, requestAnimationFrame(frame));
    }

    frames.set(el, requestAnimationFrame(frame));
  }

  strings.forEach(function (el) {
    el.addEventListener('click', function () {
      sound(Number(el.getAttribute('data-freq')));
      pluck(el, 1);
    });

    el.addEventListener('pointerenter', function (event) {
      if (event.pointerType === 'mouse') pluck(el, 0.45);
    });
  });

  // One silent strum, low B up to G, the first time the strings come into view.
  if ('IntersectionObserver' in window && !reduceMotion) {
    var watcher = new IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
      watcher.disconnect();
      strings.forEach(function (el, i) {
        setTimeout(function () { pluck(el, 0.8); }, 150 + i * 95);
      });
    }, { threshold: 0.6 });
    watcher.observe(strings[0]);
  }
})();
