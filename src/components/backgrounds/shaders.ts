/**
 * GLSL ES 1.00 (WebGL1) fragment shaders for the Capabilities card
 * backgrounds. Kept as plain strings rather than .glsl imports so no build
 * plugin is needed for them.
 *
 * Every shader shares this header: precision, standard uniforms, a hash/value
 * noise pair and an fbm built on top of it. `uQuality` (0.5 low, 0.75 medium,
 * 1.0 high) scales the fbm octave count so slower devices do less work per
 * pixel instead of rendering at a smaller size.
 */
const GLSL_COMMON = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;
uniform float uHover;
uniform float uQuality;

uniform vec3 uBaseNearBlack;
uniform vec3 uDeepNavy;
uniform vec3 uElectricBlue;
uniform vec3 uCyan;
uniform vec3 uOffWhite;
uniform vec3 uWarmOrange;
uniform vec3 uAmber;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

/* Max 5 octaves, but bails early on lower quality tiers via a runtime break
   rather than a second shader variant. */
float fbm(vec2 p, float octaves) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    if (float(i) >= octaves) break;
    v += amp * valueNoise(p);
    p *= 2.02;
    amp *= 0.52;
  }
  return v;
}

/* Fine per-pixel noise so color ramps dither instead of banding. */
float ditherNoise(vec2 fragCoord) {
  return (hash(fragCoord + uTime) - 0.5) / 255.0 * 10.0;
}
`;

/**
 * LOOK A: Liquid silk. A domain-warped fbm height field lit with a diffuse
 * term, a specular highlight and a fresnel rim, so it reads as glossy fluid
 * rather than flat noise. Flow drifts diagonally bottom-left to top-right;
 * hovering speeds the drift and lifts the brightness slightly.
 *
 * The normal is deliberately computed from a LOW-octave, wide-step version of
 * the height field (macroOctaves, eps ~0.03), separate from the higher-octave
 * field that drives color. Differentiating the full-detail noise at a
 * near-pixel step (the first version of this shader did exactly that) turns
 * value-noise's grid-aligned cell boundaries into the normal, which reads as
 * cracked glass / faceted "grid jelly" once specular is applied to it rather
 * than smooth flowing folds.
 */
export const liquidSilkFragment =
  GLSL_COMMON +
  /* glsl */ `
float pattern(vec2 p, float t, float octaves) {
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * 0.05, octaves),
    fbm(p + vec2(5.2, 1.3) - t * 0.045, octaves)
  );
  vec2 r = vec2(
    fbm(p + 1.8 * q + vec2(1.7, 9.2) + t * 0.03, octaves),
    fbm(p + 1.8 * q + vec2(8.3, 2.8) - t * 0.025, octaves)
  );
  return fbm(p + 2.2 * r, octaves);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 aspectUv = uv;
  aspectUv.x *= uResolution.x / uResolution.y;

  float speed = 1.0 + uHover * 0.4;
  /* Diagonal drift: flow direction is bottom-left -> top-right. */
  vec2 flow = aspectUv * 1.1 - vec2(uTime * 0.045, -uTime * 0.04) * speed;

  float macroOctaves = mix(2.0, 3.0, uQuality);
  float colorOctaves = mix(3.0, 4.5, uQuality);

  /* A step sized against the shape's own scale (flow is scaled by 1.1, so a
     fold spans roughly a unit), not against screen resolution, so this reads
     the field's slope rather than its per-texel jitter. */
  float eps = 0.03;
  float hC = pattern(flow, uTime * speed, macroOctaves);
  float hL = pattern(flow - vec2(eps, 0.0), uTime * speed, macroOctaves);
  float hR = pattern(flow + vec2(eps, 0.0), uTime * speed, macroOctaves);
  float hD = pattern(flow - vec2(0.0, eps), uTime * speed, macroOctaves);
  float hU = pattern(flow + vec2(0.0, eps), uTime * speed, macroOctaves);

  vec3 normal = normalize(vec3((hL - hR) / (2.0 * eps), (hD - hU) / (2.0 * eps), 2.4));
  vec3 lightDir = normalize(vec3(-0.5, 0.65, 0.7));
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  vec3 halfDir = normalize(lightDir + viewDir);

  float diff = max(dot(normal, lightDir), 0.0);
  float spec = pow(max(dot(normal, halfDir), 0.0), 24.0);
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);

  /* Higher-octave field, blended in for color texture only: it never
     touches the normal, so it adds oil-paint grain without fracturing the
     highlight. */
  float hDetail = pattern(flow * 1.6, uTime * speed * 0.8, colorOctaves);
  float h = mix(hC, hDetail, 0.35);

  vec3 col = mix(uBaseNearBlack, uDeepNavy, smoothstep(0.15, 0.55, h));
  col = mix(col, uElectricBlue, smoothstep(0.4, 0.78, h) * (0.35 + 0.65 * diff));
  col += uCyan * spec * (0.55 + 0.25 * uHover);
  col += uOffWhite * pow(spec, 2.5) * 0.45;
  col += uCyan * fresnel * 0.22;

  /* Rare warm glints: gated on a coarse, slowly-stepping cell grid rather
     than the specular field, so they read as a handful of sparse sparkles
     instead of scattering with every bright pixel. */
  vec2 glintCellId = floor(aspectUv * 5.0 + floor(uTime * 0.15));
  float glintPresence = step(0.93, hash(glintCellId));
  vec2 glintLocal = fract(aspectUv * 5.0) - 0.5;
  float glintFalloff = smoothstep(0.22, 0.0, length(glintLocal));
  col += mix(uWarmOrange, uAmber, 0.5) * glintPresence * glintFalloff * (0.5 + spec);

  /* Cheap depth-of-field stand-in: desaturate/flatten toward the edges
     instead of a true multi-sample blur, which a single fragment pass can't
     afford per card. */
  vec2 centered = uv - 0.5;
  float edge = smoothstep(0.35, 0.9, length(centered));
  col = mix(col, mix(uBaseNearBlack, uDeepNavy, 0.6), edge * 0.3);

  float vignette = smoothstep(1.05, 0.25, length(centered) * 1.35);
  col *= mix(0.8, 1.0, vignette);

  col *= 1.0 + uHover * 0.08;
  col += ditherNoise(gl_FragCoord.xy);

  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * LOOK E: Glowing ring. A bright arc (a torus seen close up, cropped by the
 * card), a wide bright-to-dim color sweep along its length, a thin inner
 * shadow band so it reads as a tube rather than a flat outline, and a soft
 * ambient bloom that lights the rest of the card instead of leaving it flat
 * black around a lone circle. A blurred, drifting dot grid sits underneath,
 * tinted by that same ambient glow. One pass, no second canvas layer.
 */
export const glowingRingFragment =
  GLSL_COMMON +
  /* glsl */ `
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv - 0.5;
  p.x *= uResolution.x / uResolution.y;

  float rot = uTime * (0.045 + uHover * 0.035);
  mat2 rotation = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
  vec2 c = rotation * (p - vec2(0.1, -0.05));
  float radius = 0.56;
  float ringDist = length(c) - radius;

  /* Ambient bloom: the ring is treated as a light source for the whole card,
     not just its own band, which is what reads as "glow" rather than "line". */
  float ambient = exp(-abs(ringDist) * 2.0) * (0.55 + 0.25 * uHover);
  vec3 col = mix(uBaseNearBlack, uDeepNavy, clamp(ambient, 0.0, 1.0));

  /* Blurred grid of dots, tinted by the ambient glow so they feel lit by the
     ring instead of pasted over a flat background. */
  float gridDensity = mix(6.0, 10.0, uQuality);
  vec2 gridUv = p * gridDensity + vec2(2.5, 1.8);
  vec2 cellId = floor(gridUv);
  vec2 cellUv = fract(gridUv) - 0.5;
  float rnd = hash(cellId);
  vec2 drift = vec2(sin(uTime * 0.045 + rnd * 6.28), cos(uTime * 0.038 + rnd * 6.28)) * 0.16;
  float dist = length(cellUv - drift);
  float dotMask = smoothstep(0.3, 0.0, dist) * mix(0.22, 0.55, rnd);
  vec3 dotColor = mix(uDeepNavy, uElectricBlue, 0.4 + 0.4 * ambient);
  col += dotColor * dotMask * (0.4 + ambient * 0.6);

  /* The ring band: bright-to-dim color sweep, a tight hot core only at the
     very peak (so it reads as blue/cyan neon rather than a white line), and
     a slightly darker inner band just inside it to suggest a tube curving
     away rather than a flat ring drawn on top. */
  float width = 0.05 + 0.01 * sin(uTime * 0.2);
  float core = smoothstep(0.022, -0.022, abs(ringDist) - width);
  float glow = exp(-abs(ringDist) * 6.0) * (0.65 + 0.45 * uHover);

  float innerBandDist = length(c) - (radius - width * 2.2);
  float innerShadow = exp(-abs(innerBandDist) * 12.0) * 0.4;
  col = mix(col, uBaseNearBlack, innerShadow);

  float angle = atan(c.y, c.x);
  float along = 0.5 + 0.5 * sin(angle * 1.0 + uTime * 0.1);
  vec3 ringColor = mix(uElectricBlue, uCyan, along);
  vec3 hotColor = mix(ringColor, uOffWhite, pow(core, 3.0) * 0.7);

  col += ringColor * glow * 1.1;
  col += hotColor * core * 1.7;

  float vignette = smoothstep(1.15, 0.3, length(p) * 1.2);
  col *= mix(0.82, 1.0, vignette);
  col += ditherNoise(gl_FragCoord.xy);

  gl_FragColor = vec4(col, 1.0);
}
`;
