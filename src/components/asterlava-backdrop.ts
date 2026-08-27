// The provided backdrop is a self-contained Three.js scene with dynamic geometry.
// Keep its runtime behavior intact while the typed React wrapper owns the app boundary.
// @ts-nocheck

/**
 * Asterlava backdrop — two people, and the evidence network between them.
 *
 * A reusable, framework-agnostic Three.js scene: point-cloud human busts
 * (generated procedurally, no model files) plus a claim/document "evidence
 * network" that periodically lights up as a claim resolves. Monochrome by
 * design — every color defaults to neutral graphite/white, with exactly one
 * warm accent that only appears at the instant a claim resolves. Color
 * carries meaning here; it isn't ambient brand decoration.
 *
 * Usage (plain HTML / any bundler):
 *
 *   import { mountAsterlavaBackdrop } from './asterlava-backdrop.js';
 *   const host = document.getElementById('backdrop');
 *   const backdrop = mountAsterlavaBackdrop(host);
 *   // ...later, if the host element is ever removed:
 *   backdrop.destroy();
 *
 * Requires `three` as a peer dependency (r150+; built against 0.160.0).
 * In a plain HTML page with no bundler, import map "three" to a vendored
 * copy or an ES-module CDN build, e.g.:
 *   <script type="importmap">
 *     { "imports": { "three": "https://unpkg.com/three@0.160.0/build/three.module.js" } }
 *   </script>
 *
 * @param {HTMLElement} host - element the canvas is appended into. Should be
 *   positioned (e.g. `position:relative` or `fixed`) and sized by your CSS —
 *   the scene renders at host.clientWidth x host.clientHeight and resizes
 *   with it.
 * @param {Object} [options]
 * @param {Object} [options.colors] - override any of: ambient, pale, doc,
 *   resolve, eye (hex strings), edge, dust, pulseLine (hex numbers).
 * @param {number} [options.claimCount=11] - number of "claim" nodes.
 * @param {number} [options.docCount=6] - number of "document" nodes.
 * @param {boolean} [options.scrollDriven=true] - if true, the camera pushes
 *   into the network and the two figures recede as `window` scrolls (0 to
 *   document height). Set false for a static, non-scrolling container.
 * @param {boolean} [options.interactive=true] - if true, the scene tilts
 *   toward the mouse cursor.
 * @param {boolean} [options.highDetail] - force high/low particle counts
 *   instead of auto-detecting from window width (<760px = low).
 * @returns {{ destroy: () => void }}
 */
export function mountAsterlavaBackdrop(host, options = {}) {
  return init(host, options);
}

function init(host, options) {
  // Late-bound import so this file has no hard dependency at parse time —
  // callers on older bundlers can still statically analyze the import above.
  const THREE = options.THREE || globalThis.__ASTERLAVA_THREE__;
  if (!THREE) {
    throw new Error(
      "mountAsterlavaBackdrop: pass { THREE } in options, or `import * as THREE from 'three'` " +
      "and set globalThis.__ASTERLAVA_THREE__ = THREE before calling it."
    );
  }

  const RM = options.respectReducedMotion !== false &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollDriven = options.scrollDriven !== false;
  const interactive = options.interactive !== false;

  const col = Object.assign({
    ambient: "#e8eaed",   // bust base tint + traveling pulse dot
    pale: "#e3e6e9",      // claim nodes, lighter half of the bust gradient
    doc: "#888c92",       // document nodes
    resolve: "#b8862c",   // the ONE deliberate accent — the resolve flash
    eye: "#eef1f4",       // brightest point on the face
    edge: 0x3a3d42,       // static claim->document edges
    dust: 0x74787d,       // ambient drifting particles
    pulseLine: 0xe8eaed,  // claim -> document -> listener travel line
  }, options.colors || {});

  const nClaim = options.claimCount ?? 11;
  const nDoc = options.docCount ?? 6;

  const TEAL = new THREE.Color(col.ambient);
  const PALE = new THREE.Color(col.pale);
  const DOCC = new THREE.Color(col.doc);
  const WARM = new THREE.Color(col.resolve);
  const EYE = new THREE.Color(col.eye);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(host.clientWidth, host.clientHeight);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 200);
  camera.position.set(0, 0.35, 12.4);

  const world = new THREE.Group();
  scene.add(world);

  function bustPositions(n) {
    const P = [];
    const nHead = Math.floor(n * 0.62), nNeck = Math.floor(n * 0.08), nSh = n - nHead - nNeck;
    const GA = Math.PI * (1 + Math.sqrt(5));

    for (let i = 0; i < nHead; i++) {
      const t = (i + 0.5) / nHead;
      const phi = Math.acos(1 - 2 * t), th = GA * i;
      let x = Math.sin(phi) * Math.cos(th), y = Math.cos(phi), z = Math.sin(phi) * Math.sin(th);
      y *= 1.16; x *= 0.79; z *= 0.90;
      if (y < 0) { const k = 1 - 0.40 * Math.pow(-y, 1.55); x *= k; z *= k; }
      if (y < -0.40) z += 0.20 * (-y - 0.40);
      const nose = Math.exp(-(Math.pow(x / 0.15, 2) + Math.pow((y + 0.04) / 0.17, 2)));
      if (z > 0.25) z += 0.34 * nose;
      const brow = Math.exp(-(Math.pow(x / 0.42, 2) + Math.pow((y - 0.27) / 0.09, 2)));
      if (z > 0.3) z += 0.09 * brow;
      if (z < -0.45) z *= 0.90;
      P.push(x, y + 1.28, z);
    }
    for (let i = 0; i < nNeck; i++) {
      const a = Math.random() * Math.PI * 2, r = 0.30 + Math.random() * 0.05;
      P.push(Math.cos(a) * r, 0.30 + Math.random() * 0.42, Math.sin(a) * r * 0.9);
    }
    for (let i = 0; i < nSh; i++) {
      const t = (i + 0.5) / nSh;
      const phi = Math.acos(1 - 2 * t), th = GA * i;
      let x = Math.sin(phi) * Math.cos(th), y = Math.cos(phi), z = Math.sin(phi) * Math.sin(th);
      x *= 1.72; y = Math.abs(y) * 0.62; z *= 0.72;
      P.push(x, y - 0.34, z);
    }
    return P;
  }

  const densityHigh = options.particleDensity?.high ?? 6000;
  const densityLow = options.particleDensity?.low ?? 2600;
  const dustHigh = options.dustDensity?.high ?? 520;
  const dustLow = options.dustDensity?.low ?? 260;
  const highDetail = options.highDetail ?? window.innerWidth >= 760;

  function makeBust(side) {
    const n = highDetail ? densityHigh : densityLow;
    const pos = bustPositions(n);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    const c = [];
    for (let i = 0; i < pos.length; i += 3) {
      const px = pos[i], py = pos[i + 1] - 1.28, pz = pos[i + 2];
      let cc = PALE.clone().lerp(TEAL, Math.random() * 0.5 + (pos[i + 1] > 1.0 ? 0.12 : 0));
      if (pz > 0.35) {
        const eye = Math.max(
          Math.exp(-(Math.pow((px + 0.31) / 0.115, 2) + Math.pow((py - 0.16) / 0.062, 2))),
          Math.exp(-(Math.pow((px - 0.31) / 0.115, 2) + Math.pow((py - 0.16) / 0.062, 2)))
        );
        if (eye > 0.30) cc = EYE.clone().multiplyScalar(1.5);
      }
      c.push(cc.r, cc.g, cc.b);
    }
    g.setAttribute("color", new THREE.Float32BufferAttribute(c, 3));
    const m = new THREE.PointsMaterial({
      size: 0.028, vertexColors: true, transparent: true, opacity: 0.93,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
    });
    const pts = new THREE.Points(g, m);
    pts.position.x = side * 3.40;
    pts.position.y = -0.55;
    pts.scale.setScalar(1.10);
    pts.rotation.y = side < 0 ? 0.80 : -0.80;
    return pts;
  }

  const left = makeBust(-1), right = makeBust(1);
  world.add(left, right);

  const CLAIMS = [], DOCS = [];
  for (let i = 0; i < nClaim; i++) {
    CLAIMS.push(new THREE.Vector3(
      (Math.random() - 0.5) * 4.2,
      0.75 + Math.random() * 1.9,
      (Math.random() - 0.5) * 2.4
    ));
  }
  for (let i = 0; i < nDoc; i++) {
    DOCS.push(new THREE.Vector3(-2.5 + i * (5 / Math.max(1, nDoc - 1)) + (Math.random() - 0.5) * 0.3, -1.85, (Math.random() - 0.5) * 1.6));
  }

  function nodeCloud(list, color, size) {
    const g = new THREE.BufferGeometry();
    const p = [];
    list.forEach(v => p.push(v.x, v.y, v.z));
    g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
    const m = new THREE.PointsMaterial({
      size, color, transparent: true, opacity: 0.95, depthWrite: false,
      blending: THREE.AdditiveBlending, sizeAttenuation: true
    });
    return new THREE.Points(g, m);
  }
  const claimPts = nodeCloud(CLAIMS, PALE, 0.11);
  const docPts = nodeCloud(DOCS, DOCC, 0.15);
  world.add(claimPts, docPts);

  const baseEdges = [];
  CLAIMS.forEach(c => {
    let best = 0, bd = 1e9;
    DOCS.forEach((d, i) => { const dd = c.distanceTo(d); if (dd < bd) { bd = dd; best = i; } });
    baseEdges.push([c, DOCS[best]]);
  });
  const eg = new THREE.BufferGeometry();
  const ep = [];
  baseEdges.forEach(([a, b]) => ep.push(a.x, a.y, a.z, b.x, b.y, b.z));
  eg.setAttribute("position", new THREE.Float32BufferAttribute(ep, 3));
  const em = new THREE.LineBasicMaterial({ color: col.edge, transparent: true, opacity: 0.30, blending: THREE.AdditiveBlending, depthWrite: false });
  world.add(new THREE.LineSegments(eg, em));

  const dustN = highDetail ? dustHigh : dustLow;
  const dg = new THREE.BufferGeometry(), dp = [];
  for (let i = 0; i < dustN; i++) dp.push((Math.random() - 0.5) * 17, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 8);
  dg.setAttribute("position", new THREE.Float32BufferAttribute(dp, 3));
  const dust = new THREE.Points(dg, new THREE.PointsMaterial({
    size: 0.026, color: col.dust, transparent: true, opacity: 0.5,
    depthWrite: false, blending: THREE.AdditiveBlending
  }));
  world.add(dust);

  const active = [];
  const pulseGeo = new THREE.SphereGeometry(0.075, 10, 10);

  function spawn() {
    const ci = (Math.random() * CLAIMS.length) | 0;
    const c = CLAIMS[ci];
    let best = 0, bd = 1e9;
    DOCS.forEach((d, i) => { const dd = c.distanceTo(d); if (dd < bd) { bd = dd; best = i; } });
    const d = DOCS[best];
    const listener = (Math.random() < 0.5 ? left : right).position.clone().add(new THREE.Vector3(0, 1.3, 0));

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(
      [c.x, c.y, c.z, d.x, d.y, d.z, d.x, d.y, d.z, listener.x, listener.y, listener.z], 3));
    const lineMat = new THREE.LineBasicMaterial({ color: col.pulseLine, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    const line = new THREE.LineSegments(lineGeo, lineMat);
    world.add(line);

    const mat = new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false });
    const pulse = new THREE.Mesh(pulseGeo, mat);
    pulse.position.copy(c);
    world.add(pulse);

    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12),
      new THREE.MeshBasicMaterial({ color: WARM, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.position.copy(d);
    world.add(halo);

    active.push({ t: 0, c, d, listener, line, lineMat, pulse, mat, halo });
  }

  let cool = 26;
  function stepEvents() {
    if (!RM && --cool <= 0) { spawn(); cool = 46 + Math.random() * 66; }
    for (let i = active.length - 1; i >= 0; i--) {
      const a = active[i];
      a.t += 0.0072;
      const t = a.t;
      if (t < 0.45) {
        const k = t / 0.45;
        a.pulse.position.lerpVectors(a.c, a.d, k);
        a.lineMat.opacity = 0.75 * Math.sin(k * Math.PI);
        a.mat.opacity = 1;
      } else if (t < 0.62) {
        const k = (t - 0.45) / 0.17;
        a.halo.material.opacity = Math.sin(k * Math.PI) * 0.9;
        a.halo.scale.setScalar(1 + k * 0.9);
        a.pulse.position.copy(a.d);
        a.lineMat.opacity = 0.4;
      } else if (t < 1) {
        const k = (t - 0.62) / 0.38;
        a.pulse.position.lerpVectors(a.d, a.listener, k);
        a.mat.opacity = 1 - k * 0.85;
        a.lineMat.opacity = 0.5 * (1 - k);
        a.halo.material.opacity *= 0.9;
      } else {
        world.remove(a.line, a.pulse, a.halo);
        a.line.geometry.dispose(); a.lineMat.dispose();
        a.mat.dispose(); a.halo.geometry.dispose(); a.halo.material.dispose();
        active.splice(i, 1);
      }
    }
  }

  let mx = 0, my = 0, tx = 0, ty = 0, T = 0;
  const onMouseMove = (e) => {
    tx = (e.clientX / window.innerWidth - 0.5);
    ty = (e.clientY / window.innerHeight - 0.5);
  };
  const onResize = () => {
    renderer.setSize(host.clientWidth, host.clientHeight);
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
  };
  if (interactive) window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", onResize);

  let visible = true;
  const io = new IntersectionObserver(es => es.forEach(e => (visible = e.isIntersecting)), { threshold: 0.02 });
  io.observe(host);

  let scrollP = 0, scrollTarget = 0;
  const readScroll = () => {
    if (!scrollDriven) return;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollTarget = Math.min(1, Math.max(0, window.scrollY / max));
  };
  if (scrollDriven) {
    window.addEventListener("scroll", readScroll, { passive: true });
    readScroll();
  }

  let raf = 0;
  function frame() {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    T += 1;
    mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
    scrollP += (scrollTarget - scrollP) * 0.06;

    const hero = Math.max(0, 1 - scrollP / 0.16);
    const faceOp = 0.10 + 0.83 * hero;
    left.material.opacity = faceOp;
    right.material.opacity = faceOp;
    left.position.x = -3.40 - scrollP * 3.4;
    right.position.x = 3.40 + scrollP * 3.4;

    camera.position.z = 12.4 - scrollP * 4.6;
    camera.position.y = 0.35 + scrollP * 1.1;

    world.rotation.y = Math.sin(T * 0.0016) * 0.16 + mx * 0.42 + scrollP * 0.85;
    world.rotation.x = -my * 0.20 + scrollP * 0.16;
    dust.rotation.y += 0.0004;
    claimPts.material.opacity = 0.75 + 0.25 * Math.sin(T * 0.02);
    stepEvents();
    renderer.render(scene, camera);
  }
  spawn();
  frame();

  host.dataset.asterlavaBackdropReady = "1";

  return {
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      if (interactive) window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (scrollDriven) window.removeEventListener("scroll", readScroll);
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      delete host.dataset.asterlavaBackdropReady;
    }
  };
}
