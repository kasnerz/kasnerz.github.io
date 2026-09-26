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

/* Small figures, 48×48: navigation on every page. */
export const SMALL: Record<PageId, string> = {
  consulting: `
    <circle class="head" cx="17" cy="13" r="4.5"/>
    <path d="M17 18V31M17 31L12 44M17 31L22 44M17 21L12 28L13 33"/>
    <path class="a-arm" ${pivot(17, 21)} d="M17 21L23 25L27 20"/>
    <rect x="27" y="3" width="17" height="11" rx="3.5"/><path d="M30.5 14L28.5 18.5L35 14"/>
    <g class="a-dots"><circle class="dot" cx="31.5" cy="8.5" r="1.1"/><circle class="dot" cx="35.5" cy="8.5" r="1.1"/><circle class="dot" cx="39.5" cy="8.5" r="1.1"/></g>`,
  blog: `
    <circle class="head" cx="20" cy="13" r="4.5"/>
    <path d="M19 18L16 31M16 31L12 44M16 31L21 44M28 31H46M44 31V44M30 31H39L42 20"/>
    <path class="a-type" ${pivot(18.5, 21)} d="M18.5 21L25 27L31 29"/>`,
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
  research: `
    <rect x="29" y="42" width="16" height="3" rx="1"/>
    <path d="M42 42V35Q42 27 33 26"/>
    <path class="thick" d="M29.5 10L34 25"/>
    <path d="M27 11L32 9M34 25L35 28M30 31H41"/>
    <path class="a-spark thin" d="M35.5 33.5v2.5M32 33l-1.5 2M39 33l1.5 2"/>
    <g class="a-peer">
      <circle class="head" cx="22" cy="13" r="4.5"/>
      <path d="M20.5 17L15 31M18.6 21.5L26 27L31 29.5M18.6 21.5L13 27"/>
    </g>
    <path d="M15 31L11 45M15 31L20 45"/>`,
  about: `
    <circle cx="36" cy="12" r="5"/>
    <path class="thin a-sun" ${pivot(36, 12)} d="${rays(36, 12, 7.5, 10)}"/>
    <rect class="solid" x="10.5" y="16" width="8" height="12" rx="2.5" transform="rotate(8 14.5 22)"/>
    <circle class="head" cx="23" cy="12" r="4.5"/>
    <path d="M22 16.5L20 30M21.6 20L26 26L29.5 27"/>
    <path class="a-leg1" ${pivot(20, 30)} d="M20 30L14 44"/>
    <path class="a-leg2" ${pivot(20, 30)} d="M20 30L27 44"/>`,
};

/*
 * Object-only icons, 24×24: the top bar. Each keeps just the key prop of its scene,
 * no stickman, so they read at small sizes next to a label.
 */
export const PROPS: Record<PageId, string> = {
  consulting: `
    <path d="M6.5 4H17.5A3.5 3.5 0 0 1 21 7.5V12.5A3.5 3.5 0 0 1 17.5 16H12.5L7 20V16H6.5A3.5 3.5 0 0 1 3 12.5V7.5A3.5 3.5 0 0 1 6.5 4Z"/>
    <circle class="dot" cx="8.5" cy="10" r="1.2"/><circle class="dot" cx="12" cy="10" r="1.2"/><circle class="dot" cx="15.5" cy="10" r="1.2"/>`,
  blog: `
    <rect x="5" y="4.5" width="14" height="10.5" rx="1.5"/>
    <path d="M5 15L2.5 19H21.5L19 15"/>
    <path class="thin" d="M8 8H16M8 11.5H13"/>`,
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
    <path d="M5 21H19M16 21V15.5Q16 10.5 10.8 10"/>
    <path class="thick" d="M7.8 3L10.6 10.6"/>
    <path d="M5.8 4.1L9.6 2.6M10.6 10.6L11.2 12.4M8 14.5H17"/>`,
  about: `
    <circle cx="12" cy="12" r="9.5"/>
    <path class="thin" d="M12 3.8V5.3M20.2 12H18.7M12 20.2V18.7M3.8 12H5.3"/>
    <g transform="rotate(40 12 12)">
      <path class="solid" d="M12 5.8L14.3 12H9.7Z"/>
      <path class="thin" d="M9.7 12L12 18.2L14.3 12Z"/>
    </g>`,
};

/*
 * Big scenes, 240 wide with the ground at y=215: subpage header art.
 * Their figures stand on the top edge of the content card.
 */
export const LARGE: Partial<Record<PageId, string>> = {
  consulting: `
    <path class="ground" d="M0 215H240"/>
    <path d="M120 215V160M96 160H144"/>
    <path d="M102 160v-8h9v8M111 153.5h2.5a2.2 2.2 0 0 1 0 4.4H111"/>
    <path d="M129 160v-8h9v8"/>
    <path class="thin" d="M106 147q-3-4 0-8M133 147q3-4 0-8"/>
    <circle class="head" cx="70" cy="110" r="9"/>
    <path d="M70 119V165M70 165L61 215M70 165L79 215M70 130L60 149L63 165M70 130L86 141L98 130"/>
    <path class="thin" d="M92 60H126Q134 60 134 68V76Q134 84 126 84H101L86 96L92 84Q84 84 84 76V68Q84 60 92 60Z"/>
    <circle class="dot" cx="99" cy="72" r="2.3"/><circle class="dot" cx="109" cy="72" r="2.3"/><circle class="dot" cx="119" cy="72" r="2.3"/>
    <circle class="head" cx="170" cy="110" r="9"/>
    <path d="M170 119V165M170 165L161 215M170 165L179 215M170 130L156 146L144 157M170 130L184 146L172 160"/>
    <path d="M171 75q0-7 7-7t7 7q0 4.5-7 6.5v4"/><circle class="dot" cx="178" cy="92" r="1.9"/>`,
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
    <path d="M84 119V165M84 165L75 215M84 165L93 215M84 130L98 118L108 98M84 130L70 144L62 138"/>`,
  projects: `
    <path class="ground" d="M0 215H240"/>
    <rect x="140" y="189" width="26" height="26" rx="2"/><text x="153" y="205.5">{ }</text>
    <rect x="166" y="189" width="26" height="26" rx="2"/><text x="179" y="205.5">01</text>
    <rect x="192" y="189" width="26" height="26" rx="2"/><text x="205" y="205.5">( )</text>
    <rect x="153" y="163" width="26" height="26" rx="2"/><text x="166" y="179.5">=&gt;</text>
    <rect x="179" y="163" width="26" height="26" rx="2"/><text x="192" y="179.5">[ ]</text>
    <circle class="head" cx="112" cy="110" r="9"/>
    <path d="M112 119V165M112 165L103 215M112 165L121 215"/>
    <path d="M112 128L138 116L166 113M112 130L140 128L166 125"/>
    <rect x="166" y="106" width="26" height="26" rx="2"/><text x="179" y="122.5">&lt;/&gt;</text>
    <path class="thin" d="M160 157l-5-3M198 157l5-3"/>`,
  research: `
    <path class="ground" d="M0 215H240"/>
    <g transform="translate(9 0)">
      <rect x="114" y="207" width="68" height="8" rx="2"/>
      <path d="M166 207V172Q166 136 128 132"/>
      <circle cx="166" cy="180" r="5"/>
      <path class="thick" d="M117 106L134 150"/>
      <path d="M110.4 108.4L123.6 103.6M134 150L137 159M114 163H174"/>
      <path class="thin" d="M126 160H148"/>
    </g>
    <circle class="head" cx="99" cy="113" r="9"/>
    <path d="M96 121L84 166M84 166L74 215M84 166L94 215M93.6 130L108 150L125 160M93.6 130L84 150L90 162"/>`,
  about: `
    <path d="M20 215L30 212L58 199L84 184L104 170L124 152L140 132L152 112L164 94L176 80L188 94L198 104L212 130L226 172L236 215"/>
    <path d="M176 80V58"/><path class="solid" d="M176 58L191 63L176 68Z"/>
    <circle cx="222" cy="44" r="8"/><path class="thin" d="${rays(222, 44, 12, 16)}"/>
    <rect class="solid" x="85" y="88" width="12" height="26" rx="3.5" transform="rotate(8 91 101)"/>
    <circle class="head" cx="106" cy="75" r="9"/>
    <path d="M98 128L103 84M102 93L111 108L118 111M98 128L92 154L88 181M98 128L106 148L108 166"/>`,
};
