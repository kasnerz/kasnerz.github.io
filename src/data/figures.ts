/*
 * Stickman artwork, as SVG markup injected into <g class="ink">.
 * Styling (stroke, fills, hover animations) lives in src/styles/figures.css.
 *
 * Classes used inside the markup:
 *   head   – the head circle         dot / solid – filled shapes
 *   thin / thick – stroke weights    ground – hidden in the header, where the card is the ground
 *   a-*    – parts animated on hover (see figures.css)
 * `data-o` + transform-origin marks the pivot of an animated part.
 */
import type { PageId } from "./nav";

const pivot = (x: number, y: number) =>
  `data-o style="transform-origin:${x}px ${y}px"`;

const rays = (cx: number, cy: number, r1: number, r2: number) =>
  Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const f = (v: number) => v.toFixed(1);
    return `M${f(cx + r1 * Math.cos(a))} ${f(cy + r1 * Math.sin(a))}L${f(cx + r2 * Math.cos(a))} ${f(cy + r2 * Math.sin(a))}`;
  }).join("");

/*
 * The research scenes loop: read the sheet in hand, lift it aside and let go, pull the
 * next one out of the pile, read that. The arm and the sheet turn together about the
 * shoulder, and the sheet turns back about the hand so it stays upright. A mask hides it
 * while it is inside the pile, so it seems to come out of it. At the letting go it is
 * swapped for a copy that recedes and fades, centred on `centre`; `k` scales its drift,
 * which is given in big-scene units.
 */
type Pt = [number, number];
const sift = (s: {
  pile: string;
  pileLines: string;
  mask: string;
  k: number;
  body: string;
  shoulder: Pt;
  arm: string;
  hand: Pt;
  centre: Pt;
  sheet: string;
  extra?: string;
}) => `
    <path d="${s.pile}"/>
    <path class="thin" d="${s.pileLines}"/>${s.extra ?? ""}${s.body}
    <g mask="url(#${s.mask})">
      <g class="a-sift" ${pivot(...s.shoulder)}>
        <g class="a-sift-hold" ${pivot(...s.hand)}>
          <g class="a-sift-show">${s.sheet}</g>
        </g>
      </g>
    </g>
    <g class="a-sift-away" style="--k:${s.k}">
      <g class="a-sift-recede" ${pivot(...s.centre)}>${s.sheet}</g>
    </g>
    <path class="a-sift" ${pivot(...s.shoulder)} d="${s.arm}"/>`;

/* Small figures, 48×48: navigation on every page. */
export const SMALL: Record<PageId, string> = {
  consulting: `
    <rect x="27" y="19.5" width="15" height="25.5" rx="1.5"/>
    <circle cx="34.5" cy="25.5" r="2"/>
    <path class="thin" d="M31 32H38M31 35.5H38"/>
    <g class="a-blink"><circle class="dot" cx="38.5" cy="40.5" r="0.9"/></g>
    <g class="a-quack" ${pivot(32, 18)}>
      <path class="solid" d="M42.2 18.2H33.5Q29.4 18.2 29.4 12.4Q32 14.9 35.4 14.3Q39 13.6 41.5 15Q42.7 16.4 42.2 18.2Z"/>
      <circle class="solid" cx="39.6" cy="11.6" r="3.2"/>
      <path class="thin" d="M42.7 11.3L44.3 12.1L42.7 12.8"/>
    </g>
    <circle class="head" cx="18.5" cy="13" r="4.5"/>
    <path d="M17.3 17.4L12 31M12 31L7 45M12 31L16.5 45M15.7 21.5L10 25L6.5 28.5"/>
    <path class="a-press" d="M15.7 21.5L22.5 25.5L31.5 25.5"/>`,
  teaching: `
    <g mask="url(#ko-teach-s)">
      <rect x="10" y="3" width="35" height="22" rx="1.5"/>
      <path class="thin" d="M31 9H41M31 14H41M31 19H37"/>
    </g>
    <circle class="head" cx="17" cy="17" r="4.5"/>
    <path d="M17 21.5V34M17 34L12 46M17 34L22 46M17 25L12 31L9 28"/>
    <path class="a-point" ${pivot(17, 25)} d="M17 25L23 21L29 13"/>`,
  projects: `
    <rect x="22" y="37" width="8" height="8" rx="1"/><rect x="30" y="37" width="8" height="8" rx="1"/><rect x="38" y="37" width="8" height="8" rx="1"/>
    <rect x="26" y="29" width="8" height="8" rx="1"/><rect x="34" y="29" width="8" height="8" rx="1"/>
    <circle class="head" cx="12" cy="14" r="4.5"/>
    <path d="M12 18.5V32M12 32L8 45M12 32L17 45"/>
    <g class="a-lift" ${pivot(12, 22)}>
      <path d="M12 22L21 15L30 15.5M12 23.5L22 20L30 19.5"/>
      <rect x="30" y="12" width="8" height="8" rx="1"/>
    </g>
    <path class="a-spark thin" d="M28 26l-2-2M44 26l2-2M36 24v-2.5"/>`,
  research: sift({
    pile: "M23 46L22.5 43L23.5 40L22 37L23 34L22.5 31L41 30.5L40.5 34L42 37L41 40L42.5 43L41.5 46Z",
    pileLines: "M22.5 43H42.5M23.5 40H41M22 37H42M23 34H40.5",
    mask: "ko-pile-s",
    k: 0.26,
    body: `
      <circle class="head" cx="13" cy="16" r="4.5"/>
      <path d="M13 20.5V33M13 33L8 46M13 33L18 46M13 24L8.5 28.5L12.5 32"/>`,
    shoulder: [13, 24],
    arm: "M13 24L20.2 20.1L25.3 13.8",
    hand: [25.3, 13.8],
    centre: [27.7, 19],
    sheet: `
      <path d="M23.7 13.8H29.5L31.7 16V24.3H23.7Z"/>
      <path class="thin" d="M25.7 18.3H29.7M25.7 21.3H29.7"/>`,
  }),
  blog: `
    <g mask="url(#ko-blog-s)">
      <rect x="10" y="3" width="28" height="17" rx="1.5"/>
      <path d="M10 20L5 27.5H43L38 20"/>
    </g>
    <circle class="head" cx="24" cy="23" r="4.5"/>
    <path d="M24 27.5V46M24 31L12.5 35M24 31L35.5 35"/>
    <path class="a-type" ${pivot(12.5, 35)} d="M12.5 35L15 25"/>
    <path class="a-type-r" ${pivot(35.5, 35)} d="M35.5 35L33 25"/>`,
  about: `
    <path d="M22 44L35 13L41 24L44 20.5L48 27"/>
    <path class="thin" d="M31.2 22L33.5 24L36 21.5L38.8 24"/>
    <path d="M35 13V5"/>
    <path class="solid a-flutter" ${pivot(35, 7)} d="M35 5L41 7L35 9Z"/>
    <rect class="solid" x="2.5" y="16" width="8" height="12" rx="2.5" transform="rotate(8 6.5 22)"/>
    <circle class="head" cx="15" cy="12" r="4.5"/>
    <path d="M14 16.5L12 30M13.6 20L18 26L21.5 27"/>
    <path class="a-leg1" ${pivot(12, 30)} d="M12 30L6 44"/>
    <path class="a-leg2" ${pivot(12, 30)} d="M12 30L19 44"/>`,
};

/*
 * Object-only icons, 24×24: the top bar. Each keeps just the key prop of its scene,
 * no stickman, so they read at small sizes next to a label. The exception is "about",
 * where the person is the subject: a plain waving stickman.
 */
export const PROPS: Record<PageId, string> = {
  consulting: `
    <rect x="2.5" y="1.5" width="9" height="4.5" rx="1"/>
    <path d="M7 6V8M7 8L10.5 11.5L7 15L3.5 11.5Z"/>
    <path d="M10.5 11.5H14.5M7 15V17.5"/>
    <rect x="14.5" y="9" width="7.5" height="5" rx="1"/>
    <rect class="thin" x="2.5" y="17.5" width="9" height="5" rx="1" stroke-dasharray="1.8 1.5"/>`,
  teaching: `
    <rect x="2.5" y="3" width="19" height="13" rx="1"/>
    <path class="thin" d="M9 7H18M9 10H18M9 13H15"/>
    <circle class="dot" cx="6" cy="7" r="1"/><circle class="dot" cx="6" cy="10" r="1"/><circle class="dot" cx="6" cy="13" r="1"/>
    <path d="M7.5 16L6 21M16.5 16L18 21"/>`,
  projects: `
    <rect x="3" y="15" width="6" height="6" rx="0.8"/><rect x="9" y="15" width="6" height="6" rx="0.8"/><rect x="15" y="15" width="6" height="6" rx="0.8"/>
    <rect x="6" y="9" width="6" height="6" rx="0.8"/><rect x="12" y="9" width="6" height="6" rx="0.8"/>
    <rect x="9" y="3" width="6" height="6" rx="0.8"/>`,
  research: `
    <path d="M3.5 21.5L3 19L4.5 16.5L3 14H20L21 16.5L20 19L21.5 21.5Z"/>
    <path class="thin" d="M3 19H20M4.5 16.5H21"/>
    <g transform="rotate(12 13 7.5)">
      <path d="M8.5 2H14.5L17 4.5V13H8.5Z"/>
      <path class="thin" d="M10.5 6.5H14.5M10.5 9.5H14.5"/>
    </g>`,
  blog: `
    <rect x="5" y="4.5" width="14" height="10.5" rx="1.5"/>
    <path d="M5 15L2.5 19H21.5L19 15"/>
    <path class="thin" d="M8 8H16M8 11.5H13"/>`,
  about: `
    <circle class="head" cx="12" cy="5" r="3"/>
    <path d="M12 8V15.5M12 15.5L8.5 22M12 15.5L15.5 22M12 10.5L7.5 9M12 10.5L16.5 9"/>
    <path class="a-wave" ${pivot(7.5, 9)} d="M7.5 9L5 4"/>
    <path class="a-wave" ${pivot(16.5, 9)} d="M16.5 9L19 4"/>`,
};

/*
 * Big scenes, 240 wide with the ground at y=215: subpage header art.
 * Their figures stand on the top edge of the content card.
 */
export const LARGE: Partial<Record<PageId, string>> = {
  consulting: `
    <path class="ground" d="M0 215H240"/>
    <g mask="url(#ko-cons-l)">
      <rect x="124" y="133" width="50" height="82" rx="4"/>
      <path class="thin" d="M136 196H162M136 201H162M136 206H162"/>
      <rect class="thin" x="134" y="165" width="30" height="7" rx="1.5"/>
      <rect class="thin" x="134" y="177" width="30" height="7" rx="1.5"/>
      <g class="a-blink"><circle class="dot" cx="165" cy="150" r="1.8"/></g>
    </g>
    <circle cx="149" cy="150" r="4.5"/>
    <g class="a-quack" ${pivot(146, 131.2)}>
      <g mask="url(#ko-duck-l)">
        <path class="solid" d="M146 131.2H155.75Q161.75 131.2 161.98 126.18Q161.75 123.4 158.75 123.03Q153.5 125.43 148.63 124.68Q145.63 124.15 143.38 122.65Q141.95 122.2 141.95 123.93Q142.1 128.05 143.75 129.93Q144.73 131.2 146 131.2Z"/>
        <circle class="solid" cx="157" cy="119.6" r="5.3"/>
      </g>
      <path class="solid" d="M161.8 119.6Q166.1 120 166.4 121.2Q165.8 122.4 161.8 122.2Z"/>
    </g>
    <circle class="head" cx="100" cy="113.7" r="9"/>
    <path d="M96.7 122.1L80 165M80 165L68 215M80 165L93 215M92.7 132.4L74 146L62 159"/>
    <path class="a-press" style="--dx:-5px" d="M92.7 132.4L114 145L143 150"/>`,
  teaching: `
    <path class="ground" d="M0 215H240"/>
    <g mask="url(#ko-teach-l)">
      <rect x="40" y="36" width="172" height="104" rx="3"/>
      <path d="M58 140L52 215M194 140L200 215"/>
      <path d="M118 58H176"/>
      <path class="thin" d="M128 80H196M128 98H188M128 116H172"/>
      <circle class="dot" cx="119" cy="80" r="2.4"/><circle class="dot" cx="119" cy="98" r="2.4"/><circle class="dot" cx="119" cy="116" r="2.4"/>
    </g>
    <circle class="head" cx="84" cy="110" r="9"/>
    <path d="M84 119V165M84 165L75 215M84 165L93 215M84 130L70 144L62 138"/>
    <path class="a-point" ${pivot(84, 130)} d="M84 130L98 118L108 98"/>`,
  projects: `
    <path class="ground" d="M0 215H240"/>
    <rect x="140" y="189" width="26" height="26" rx="2"/>
    <rect x="166" y="189" width="26" height="26" rx="2"/>
    <rect x="192" y="189" width="26" height="26" rx="2"/>
    <rect x="153" y="163" width="26" height="26" rx="2"/>
    <rect x="179" y="163" width="26" height="26" rx="2"/>
    <circle class="head" cx="112" cy="110" r="9"/>
    <path d="M112 119V165M112 165L103 215M112 165L121 215"/>
    <g class="a-lift" ${pivot(112, 129)}>
      <path d="M112 128L138 116L166 113M112 130L140 128L166 125"/>
      <rect x="166" y="106" width="26" height="26" rx="2"/>
    </g>
    <path class="thin a-spark" d="M160 157l-5-3M198 157l5-3M179 153v-5"/>`,
  research: sift({
    pile: "M105 215L103 207L108 199L107 191L102 183L105 175L109 167L106 159L175 158L172 167L176 175L179 183L174 191L173 199L178 207L175 215Z",
    pileLines:
      "M103 207H178M108 199H173M107 191H174M102 183H179M105 175H176M109 167H172",
    extra: `
      <path class="ground" d="M0 215H240"/>
      <path d="M179 183L192 178L196 187L177.5 191"/>`,
    mask: "ko-pile-l",
    k: 1,
    body: `
      <circle class="head" cx="70" cy="110" r="9"/>
      <path d="M70 119V165M70 165L61 215M70 165L79 215M70 130L54 147L67 160"/>`,
    shoulder: [70, 130],
    arm: "M70 130L97.6 115L117.5 90.7",
    hand: [117.5, 90.7],
    centre: [126.5, 110.7],
    sheet: `
      <path d="M111.5 90.7H133.5L141.5 98.7V130.7H111.5Z"/>
      <path class="thin" d="M133.5 90.7V98.7H141.5"/>
      <path d="M116.5 99.5H128.5"/>
      <path class="thin" d="M116.5 106H136.5M116.5 111.5H136.5M116.5 115.5V125.5H136.5M119 123L123.5 119L128 121L135 115.5"/>`,
  }),
  blog: `
    <path class="ground" d="M0 215H240"/>
    <path d="M58 172H90M64 172L60 215M84 172L88 215"/>
    <path d="M118 156H192M124 156V215M186 156V215"/>
    <path d="M126 156H160L170 116"/>
    <circle class="head" cx="90" cy="110" r="9"/>
    <path d="M88 119.5L78 168M78 168L104 170L102 215"/>
    <path class="a-type" ${pivot(84, 128)} d="M84 128L106 147L132 152"/>
    <path class="thin a-spark" d="M160 104l-4-5M170 101v-6M180 104l4-5"/>`,
  about: `
    <path d="M20 215L30 212L58 199L84 184L104 170L124 152L140 132L152 112L164 94L176 80L188 94L198 104L212 130L226 172L236 215"/>
    <path d="M176 80V58"/><path class="solid" d="M176 58L191 63L176 68Z"/>
    <circle cx="222" cy="44" r="8"/><path class="thin a-sun" ${pivot(222, 44)} d="${rays(222, 44, 12, 16)}"/>
    <rect class="solid" x="85" y="88" width="12" height="26" rx="3.5" transform="rotate(8 91 101)"/>
    <circle class="head" cx="106" cy="75" r="9"/>
    <path d="M98 128L103 84M102 93L111 108L118 111"/>
    <path class="a-leg1" ${pivot(98, 128)} d="M98 128L92 154L88 181"/>
    <path class="a-leg2" ${pivot(98, 128)} d="M98 128L106 148L108 166"/>`,
};

/*
 * Spot scenes, 200×160 with the ground at y=152: one beside each service on the
 * consulting page. Figures use the big scenes' proportions (head r=9, 46-unit torso).
 */
export const SPOTS = {
  talk: `
    <path d="M38 98V152M38 121H62M58 121V152"/>
    <path d="M162 98V152M162 121H138M142 121V152"/>
    <path d="M84 110H116M100 110V152"/>
    <path d="M88 110v-8h8v8M104 110v-8h8v8"/>
    <path class="thin a-steam" d="M92 98q-2.5-3.5 0-7M108 98q2.5-3.5 0-7"/>
    <circle class="head" cx="48" cy="63" r="9"/>
    <path d="M48 72V117M48 117H76V152M48 83L60 101L74 106"/>
    <path class="a-arm" ${pivot(48, 83)} d="M48 83L64 96L80 88"/>
    <circle class="head" cx="152" cy="63" r="9"/>
    <path d="M152 72V117M152 117H124V152M152 83L138 100L146 75"/>
    <path class="thin" d="M66 14H100Q108 14 108 22V30Q108 38 100 38H74L62 48L67 38Q60 37 60 30V22Q60 14 66 14Z"/>
    <g class="a-dots"><circle class="dot" cx="73" cy="26" r="2.3"/><circle class="dot" cx="84" cy="26" r="2.3"/><circle class="dot" cx="95" cy="26" r="2.3"/></g>
    <path d="M136 28q0-7 7-7t7 7q0 4.5-7 6.5v4"/><circle class="dot" cx="143" cy="45" r="1.9"/>`,
  strategy: `
    <rect x="120" y="10" width="32" height="18" rx="3"/>
    <path class="thin" d="M136 28V43M132.5 39.5L136 43L139.5 39.5"/>
    <path d="M136 45L151 59L136 73L121 59Z"/>
    <path class="thin" d="M151 59H164M160.5 55.5L164 59L160.5 62.5"/>
    <rect x="166" y="50" width="26" height="18" rx="3"/>
    <path class="thin" d="M136 73V88M132.5 84.5L136 88L139.5 84.5"/>
    <rect class="thin" x="120" y="90" width="32" height="20" rx="3" stroke-dasharray="4 4"/>
    <path class="thin" d="M136 110V125M132.5 121.5L136 125L139.5 121.5"/>
    <rect x="120" y="127" width="32" height="18" rx="3"/>
    <circle class="head" cx="46" cy="47" r="9"/>
    <path d="M46 56V102M46 102L37 152M46 102L55 152"/>
    <path d="M46 67L64 76L82 94M46 67L58 95L82 106"/>
    <rect class="a-slide" style="--dx:38px" x="82" y="90" width="32" height="20" rx="3"/>
    <path class="thin a-spark" d="M116 87l2-4M116 113l2 4"/>`,
  deploy: `
    <rect x="122" y="62" width="46" height="90" rx="3"/>
    <path class="thin" d="M122 84H168M122 106H168M122 128H168"/>
    <g class="a-blink"><circle class="dot" cx="130" cy="73" r="2"/><circle class="dot" cx="130" cy="95" r="2"/><circle class="dot" cx="130" cy="117" r="2"/><circle class="dot" cx="130" cy="139" r="2"/></g>
    <path class="thin" d="M138 73H160M138 95H160M138 117H160M138 139H160"/>
    <circle class="head" cx="74" cy="47" r="9"/>
    <path d="M74 56V102M74 102L65 152M74 102L83 152M74 67L62 84L70 100"/>
    <path d="M74 67L92 80L108 94"/>
    <path d="M108 91h9v7h-9z"/><path class="thin" d="M117 92.5h5M117 96.5h5"/>
    <path d="M108 96C92 104 104 140 70 146S24 150 10 150"/>
    <path class="thin a-spark" d="M110 84l-2-5M116 84l2-5"/>`,
  workshop: `
    <rect x="82" y="20" width="72" height="54" rx="2"/>
    <rect x="92" y="30" width="16" height="12" rx="1.5"/><rect x="128" y="30" width="16" height="12" rx="1.5"/>
    <path class="thin" d="M110 36H124M120 32.5l4 3.5l-4 3.5M92 54H144M92 62H130"/>
    <circle class="head" cx="176" cy="47" r="9"/>
    <path d="M176 56V102M176 102L167 152M176 102L185 152M176 67L188 84L186 100"/>
    <path class="a-point" ${pivot(176, 67)} d="M176 67L164 60L150 50"/>
    <circle class="head" cx="28" cy="116" r="9"/><path d="M12 152q0-26 16-26t16 26"/>
    <circle class="head" cx="64" cy="112" r="9"/><path d="M48 152q0-26 16-26t16 26"/>
    <path class="a-arm" ${pivot(77, 134)} d="M77 134L84 118L82 99"/>
    <circle class="head" cx="100" cy="116" r="9"/><path d="M84 152q0-26 16-26t16 26"/>`,
  upkeep: `
    <rect x="112" y="98" width="56" height="54" rx="3"/>
    <path class="thin" d="M112 116H168M112 134H168M128 107H160M128 125H160M128 143H160"/>
    <g class="a-blink"><circle class="dot" cx="120" cy="107" r="2"/><circle class="dot" cx="120" cy="125" r="2"/><circle class="dot" cx="120" cy="143" r="2"/></g>
    <g class="a-spin" ${pivot(140, 68)}>
      <path d="M127.2 65.7A13 13 0 0 1 146.5 56.7M144.2 50.7L146.5 56.7L140.2 57.7"/>
      <path d="M152.8 70.3A13 13 0 0 1 133.5 79.3M135.8 85.3L133.5 79.3L139.8 78.3"/>
    </g>
    <circle class="head" cx="64" cy="47" r="9"/>
    <path d="M64 56V102M64 102L55 152M64 102L73 152M64 67L52 84L58 100M64 67L80 80L94 72"/>
    <g class="a-arm" ${pivot(94, 72)}>
      <g transform="rotate(32 94 72)"><path d="M94 72V48M91 32.6A8 8 0 1 0 97 32.6V41H91Z"/></g>
    </g>`,
};

/*
 * The scenes are drawn at different heights. Each gets a scale and a horizontal centre
 * (in scene units) so that all of them come out about as tall as the consulting scene
 * (~155 units above the ground) and centred in their box.
 */
export const LARGE_FIT: Partial<Record<PageId, { scale: number; cx: number }>> =
  {
    consulting: { scale: 1.35, cx: 119 },
    teaching: { scale: 0.87, cx: 126 },
    projects: { scale: 1.36, cx: 160 },
    research: { scale: 1.2, cx: 125 },
    blog: { scale: 1.15, cx: 125 },
    about: { scale: 0.83, cx: 129 },
  };
