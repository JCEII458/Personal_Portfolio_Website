"""
Generates the generic, clearly labelled technical illustrations used as
placeholders in the portfolio (public/images/illustrations/*.svg).

These are NOT drawings of real projects. Replace them with approved project
photographs, models, or sanitized drawings when available.

Usage:  python3 scripts/generate-illustrations.py
"""
import math
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "illustrations")
W, H = 1200, 750
NAVY, BLUE, ACCENT, MUTED, LINE, BG = "#10233F", "#2463A6", "#3B82C4", "#627187", "#DCE3EC", "#F4F7FB"
FONT = "font-family=\"Inter, Arial, Helvetica, sans-serif\""


def frame(title, body):
    grid = "".join(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}"/>' for x in range(0, W + 1, 40))
    grid += "".join(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}"/>' for y in range(0, H + 1, 40))
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img">
<title>{title} (illustrative)</title>
<rect width="{W}" height="{H}" fill="{BG}"/>
<g stroke="{LINE}" stroke-width="1" opacity="0.7">{grid}</g>
<rect x="24" y="24" width="{W-48}" height="{H-48}" fill="none" stroke="{NAVY}" stroke-width="1.5" opacity="0.35"/>
{body}
<g {FONT}>
  <rect x="{W-404}" y="{H-92}" width="380" height="68" fill="#FFFFFF" stroke="{NAVY}" stroke-width="1.5"/>
  <line x1="{W-404}" y1="{H-58}" x2="{W-24}" y2="{H-58}" stroke="{NAVY}" stroke-width="1"/>
  <text x="{W-390}" y="{H-69}" font-size="15" font-weight="700" fill="{NAVY}">{title.upper()}</text>
  <text x="{W-390}" y="{H-35}" font-size="12" fill="{MUTED}" letter-spacing="1.5">ILLUSTRATIVE · GENERIC · NOT TO SCALE</text>
</g>
</svg>'''


def text(x, y, s, size=14, fill=MUTED, anchor="start", weight=500):
    return f'<text x="{x}" y="{y}" {FONT} font-size="{size}" fill="{fill}" text-anchor="{anchor}" font-weight="{weight}">{s}</text>'


def dim(x1, y, x2, label):
    return (f'<g stroke="{MUTED}" stroke-width="1.2"><line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}"/>'
            f'<line x1="{x1}" y1="{y-8}" x2="{x1}" y2="{y+8}"/><line x1="{x2}" y1="{y-8}" x2="{x2}" y2="{y+8}"/></g>'
            + text((x1 + x2) / 2, y - 8, label, 13, MUTED, "middle"))


def hatch_ground(x1, x2, y):
    s = f'<line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="{NAVY}" stroke-width="2.5"/>'
    s += "".join(f'<line x1="{x}" y1="{y}" x2="{x-14}" y2="{y+14}" stroke="{MUTED}" stroke-width="1.2"/>' for x in range(int(x1) + 14, int(x2), 18))
    return s


def save(name, svg):
    with open(os.path.join(OUT, f"{name}.svg"), "w") as f:
        f.write(svg)


# 1. RC building frame
def rc_building():
    b = []
    xs = [250, 450, 650, 850]
    floors = [560, 400, 240]
    b.append(hatch_ground(160, 940, 560))
    for x in xs:
        b.append(f'<rect x="{x-12}" y="240" width="24" height="320" fill="#FFFFFF" stroke="{NAVY}" stroke-width="3"/>')
        b.append(f'<rect x="{x-50}" y="600" width="100" height="34" fill="#FFFFFF" stroke="{NAVY}" stroke-width="2.5"/>')
        b.append(f'<rect x="{x-14}" y="560" width="28" height="40" fill="#FFFFFF" stroke="{NAVY}" stroke-width="2"/>')
    for y in floors[1:]:
        b.append(f'<rect x="230" y="{y-18}" width="640" height="30" fill="#FFFFFF" stroke="{NAVY}" stroke-width="3"/>')
    for x1, x2 in zip(xs, xs[1:]):
        b.append(f'<line x1="{x1+14}" y1="430" x2="{x2-14}" y2="530" stroke="{ACCENT}" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.6"/>')
    # seismic arrow
    b.append(f'<g stroke="{BLUE}" stroke-width="3" fill="{BLUE}"><line x1="980" y1="230" x2="900" y2="230"/><path d="M900 222 L884 230 L900 238 Z"/>'
             f'<line x1="980" y1="390" x2="900" y2="390"/><path d="M900 382 L884 390 L900 398 Z"/></g>')
    b.append(text(990, 236, "F₂", 18, BLUE, weight=700) + text(990, 396, "F₁", 18, BLUE, weight=700))
    b.append(text(1000, 300, "Lateral seismic", 13) + text(1000, 318, "forces", 13))
    b.append(dim(250, 680, 450, "Bay") + dim(450, 680, 650, "Bay") + dim(650, 680, 850, "Bay"))
    for y, lab in [(240, "Roof"), (400, "2F"), (560, "GF")]:
        b.append(text(200, y + 5, lab, 13, NAVY, "end", 700))
    b.append(text(160, 110, "TWO-STOREY RC MOMENT FRAME — ELEVATION", 20, NAVY, weight=800))
    b.append(text(160, 138, "Columns, beams, slabs, and isolated footings", 15))
    return frame("RC frame elevation", "".join(b))


def beam_section():
    b = []
    x, y, w, h = 420, 150, 300, 460
    b.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#FFFFFF" stroke="{NAVY}" stroke-width="4"/>')
    b.append(f'<rect x="{x+40}" y="{y+40}" width="{w-80}" height="{h-80}" rx="14" fill="none" stroke="{BLUE}" stroke-width="3"/>')
    for cx in [x + 62, x + w / 2, x + w - 62]:
        b.append(f'<circle cx="{cx}" cy="{y+h-62}" r="15" fill="{NAVY}"/>')
    for cx in [x + 62, x + w - 62]:
        b.append(f'<circle cx="{cx}" cy="{y+62}" r="12" fill="{NAVY}"/>')
    b.append(dim(x, y + h + 50, x + w, "b"))
    b.append(f'<g stroke="{MUTED}" stroke-width="1.2"><line x1="{x-50}" y1="{y}" x2="{x-50}" y2="{y+h}"/><line x1="{x-58}" y1="{y}" x2="{x-42}" y2="{y}"/><line x1="{x-58}" y1="{y+h}" x2="{x-42}" y2="{y+h}"/></g>')
    b.append(text(x - 64, y + h / 2, "h", 15, MUTED, "end"))
    b.append(f'<line x1="{x+w-62}" y1="{y+h-62}" x2="880" y2="520" stroke="{MUTED}" stroke-width="1"/>' + text(890, 525, "Tension reinforcement", 15, NAVY, weight=600))
    b.append(f'<line x1="{x+w-62}" y1="{y+62}" x2="880" y2="230" stroke="{MUTED}" stroke-width="1"/>' + text(890, 235, "Compression bars", 15, NAVY, weight=600))
    b.append(f'<line x1="{x+w-40}" y1="{y+h/2}" x2="880" y2="380" stroke="{MUTED}" stroke-width="1"/>' + text(890, 385, "Closed stirrups (ties)", 15, NAVY, weight=600))
    b.append(text(120, 110, "RC BEAM — TYPICAL SECTION", 20, NAVY, weight=800) + text(120, 138, "Longitudinal bars, stirrups, and concrete cover", 15))
    return frame("RC beam section", "".join(b))


def girder_bridge():
    b = []
    b.append(f'<path d="M120 520 Q 330 520 420 600 Q 600 700 780 600 Q 870 520 1080 520" fill="#E3EDF8" stroke="none"/>')
    b.append(f'<path d="M420 600 Q 600 700 780 600" fill="none" stroke="{ACCENT}" stroke-width="2"/>')
    b.append(f'<path d="M455 625 Q 600 690 745 625" fill="none" stroke="{ACCENT}" stroke-width="1.5" stroke-dasharray="10 8"/>')
    b.append(text(600, 650, "Design flood level", 13, BLUE, "middle"))
    b.append(hatch_ground(120, 330, 520) + hatch_ground(870, 1080, 520))
    b.append(f'<rect x="150" y="360" width="900" height="34" fill="#FFFFFF" stroke="{NAVY}" stroke-width="3"/>')
    for gx in range(150, 1050, 450):
        b.append(f'<rect x="{gx}" y="394" width="450" height="48" fill="#FFFFFF" stroke="{NAVY}" stroke-width="2.5"/>')
    b.append(f'<path d="M230 442 L330 442 L330 560 L260 560 L230 520 Z" fill="#FFFFFF" stroke="{NAVY}" stroke-width="3"/>')
    b.append(f'<path d="M970 442 L870 442 L870 560 L940 560 L970 520 Z" fill="#FFFFFF" stroke="{NAVY}" stroke-width="3"/>')
    b.append(f'<rect x="575" y="442" width="50" height="210" fill="#FFFFFF" stroke="{NAVY}" stroke-width="3"/>')
    b.append(f'<rect x="530" y="652" width="140" height="30" fill="#FFFFFF" stroke="{NAVY}" stroke-width="2.5"/>')
    for x in [150, 1050]:
        b.append(f'<line x1="{x}" y1="330" x2="{x}" y2="360" stroke="{NAVY}" stroke-width="2"/>')
    b.append(f'<line x1="150" y1="335" x2="1050" y2="335" stroke="{NAVY}" stroke-width="2"/>')
    b.append(dim(150, 300, 600, "Span 1") + dim(600, 300, 1050, "Span 2"))
    b.append(text(280, 590, "Abutment", 13, NAVY, "middle", 600) + text(920, 590, "Abutment", 13, NAVY, "middle", 600) + text(690, 560, "Pier", 13, NAVY, "start", 600))
    b.append(text(120, 110, "TWO-SPAN RC DECK-GIRDER BRIDGE — ELEVATION", 20, NAVY, weight=800) + text(120, 138, "Superstructure, abutments, pier, and hydraulic clearance", 15))
    return frame("Girder bridge elevation", "".join(b))


def road_section():
    b = []
    b.append(hatch_ground(100, 1100, 470))
    b.append(f'<path d="M260 440 L600 420 L940 440 L940 470 L260 470 Z" fill="#FFFFFF" stroke="{NAVY}" stroke-width="3"/>')
    b.append(f'<path d="M260 470 L940 470 L960 500 L240 500 Z" fill="#EEF3F9" stroke="{NAVY}" stroke-width="2"/>')
    b.append(f'<path d="M180 450 L260 440 L260 470 L180 470 Z" fill="#FFFFFF" stroke="{NAVY}" stroke-width="2"/>')
    b.append(f'<path d="M1020 450 L940 440 L940 470 L1020 470 Z" fill="#FFFFFF" stroke="{NAVY}" stroke-width="2"/>')
    for x in [130, 1070]:
        b.append(f'<path d="M{x-40} 450 L{x-14} 500 L{x+14} 500 L{x+40} 450" fill="none" stroke="{BLUE}" stroke-width="3"/>')
    b.append(f'<line x1="600" y1="380" x2="600" y2="420" stroke="{MUTED}" stroke-width="1.5" stroke-dasharray="6 5"/>' + text(600, 370, "℄", 18, NAVY, "middle", 700))
    b.append(dim(260, 330, 600, "Carriageway") + dim(600, 330, 940, "Carriageway"))
    b.append(dim(180, 560, 260, "Shoulder") + dim(940, 560, 1020, "Shoulder"))
    b.append(text(600, 455, "Concrete pavement", 14, NAVY, "middle", 600) + text(600, 492, "Aggregate base course", 13, MUTED, "middle"))
    b.append(text(130, 530, "Side ditch", 13, BLUE, "middle", 600) + text(1070, 530, "Side ditch", 13, BLUE, "middle", 600))
    b.append(text(120, 110, "TYPICAL ROAD CROSS-SECTION", 20, NAVY, weight=800) + text(120, 138, "Two-lane concrete pavement with shoulders and side ditches", 15))
    return frame("Typical road section", "".join(b))


def port_wharf():
    b = []
    b.append(f'<rect x="60" y="430" width="1080" height="200" fill="#E3EDF8"/>')
    for y in [430, 470]:
        b.append(f'<path d="M60 {y} ' + " ".join(f"Q {x+30} {y-8} {x+60} {y}" for x in range(60, 1140, 60)) + f'" fill="none" stroke="{ACCENT}" stroke-width="1.8"/>')
    b.append(text(1100, 422, "MHHW", 12, BLUE, "end", 600) + text(1100, 498, "MLLW", 12, BLUE, "end", 600))
    b.append(f'<path d="M60 630 L1140 600" stroke="{NAVY}" stroke-width="2.5"/>')
    b.append(f'<rect x="260" y="320" width="700" height="50" fill="#FFFFFF" stroke="{NAVY}" stroke-width="3"/>')
    for px in range(300, 960, 110):
        b.append(f'<rect x="{px}" y="370" width="22" height="250" fill="#FFFFFF" stroke="{NAVY}" stroke-width="2.5"/>')
    b.append(f'<rect x="250" y="300" width="18" height="20" fill="{NAVY}"/><rect x="952" y="300" width="18" height="20" fill="{NAVY}"/>')
    b.append(f'<path d="M960 330 L1010 330 L1010 370 L960 370" fill="none" stroke="{BLUE}" stroke-width="3"/>' + text(1020, 356, "Fender", 13, BLUE, "start", 600))
    b.append(text(610, 351, "RC deck", 14, NAVY, "middle", 600) + text(330, 560, "Piles", 13, NAVY, "start", 600))
    b.append(text(120, 110, "PILE-SUPPORTED WHARF — SECTION", 20, NAVY, weight=800) + text(120, 138, "Marine exposure, tidal range, and durability considerations", 15))
    return frame("Wharf section", "".join(b))


def slope_protection():
    b = []
    b.append(f'<path d="M80 600 L560 600 L560 640 L80 640 Z" fill="#E3EDF8"/>')
    b.append(f'<path d="M80 560 ' + " ".join(f"Q {x+25} 552 {x+50} 560" for x in range(80, 560, 50)) + f'" fill="none" stroke="{ACCENT}" stroke-width="1.8"/>')
    b.append(text(100, 545, "Design water level", 13, BLUE, "start", 600))
    b.append(f'<path d="M560 640 L560 600 L620 600 L620 540 L680 540 L680 480 L740 480 L740 420 L800 420 L800 360 L860 360 L860 300 L1120 300 L1120 640 Z" fill="#FFFFFF" stroke="{NAVY}" stroke-width="3"/>')
    b.append(f'<path d="M490 640 L560 640 L560 700 L470 700 Z" fill="#FFFFFF" stroke="{NAVY}" stroke-width="3"/>')
    for i, (x, y) in enumerate([(620, 540), (680, 480), (740, 420), (800, 360)]):
        b.append(f'<line x1="{x+10}" y1="{y+30}" x2="{x+50}" y2="{y+30}" stroke="{BLUE}" stroke-width="3"/>')
    b.append(f'<path d="M870 300 L870 640" stroke="{MUTED}" stroke-width="1.2" stroke-dasharray="8 6"/>')
    b.append(text(990, 470, "Retained embankment", 14, NAVY, "middle", 600))
    b.append(text(515, 728, "Toe protection", 13, NAVY, "middle", 600))
    b.append(f'<line x1="770" y1="480" x2="960" y2="560" stroke="{MUTED}" stroke-width="1"/>' + text(965, 566, "Weepholes", 13, BLUE, "start", 600))
    b.append(text(120, 110, "STEPPED REVETMENT — CROSS-SECTION", 20, NAVY, weight=800) + text(120, 138, "Riverbank protection with toe scour protection and drainage", 15))
    return frame("Revetment section", "".join(b))


def evacuation_center():
    b = []
    b.append(hatch_ground(140, 1060, 580))
    for x in [220, 980]:
        b.append(f'<rect x="{x-14}" y="330" width="28" height="250" fill="#FFFFFF" stroke="{NAVY}" stroke-width="3"/>')
    for x in [410, 600, 790]:
        b.append(f'<rect x="{x-10}" y="350" width="20" height="230" fill="#FFFFFF" stroke="{NAVY}" stroke-width="2" opacity="0.5"/>')
    b.append(f'<line x1="200" y1="340" x2="1000" y2="340" stroke="{NAVY}" stroke-width="4"/>')
    b.append(f'<path d="M190 340 L600 200 L1010 340" fill="none" stroke="{NAVY}" stroke-width="4"/>')
    pts = []
    n = 8
    for i in range(1, n):
        x = 200 + i * 100
        ytop = 340 - (140 * (1 - abs(x - 600) / 400))
        pts.append((x, ytop))
        b.append(f'<line x1="{x}" y1="340" x2="{x}" y2="{ytop:.0f}" stroke="{BLUE}" stroke-width="2"/>')
    prev = (200, 340)
    for i, (x, y) in enumerate(pts):
        if x <= 600:
            b.append(f'<line x1="{x}" y1="{y:.0f}" x2="{x-100}" y2="340" stroke="{BLUE}" stroke-width="2"/>' if i > 0 else "")
        else:
            b.append(f'<line x1="{x-100}" y1="{(340 - (140 * (1 - abs(x-100 - 600) / 400))):.0f}" x2="{x}" y2="340" stroke="{BLUE}" stroke-width="2"/>')
    for x in [220, 980]:
        b.append(f'<rect x="{x-45}" y="600" width="90" height="30" fill="#FFFFFF" stroke="{NAVY}" stroke-width="2.5"/>')
    b.append(f'<g stroke="{BLUE}" stroke-width="2.5" fill="{BLUE}">' + "".join(f'<line x1="{x}" y1="180" x2="{x}" y2="130"/><path d="M{x-7} 138 L{x} 124 L{x+7} 138 Z"/>' for x in [380, 600, 820]) + '</g>')
    b.append(text(600, 112, "Wind uplift", 13, BLUE, "middle", 600))
    b.append(text(600, 470, "Multipurpose hall / evacuation space", 15, NAVY, "middle", 600))
    b.append(text(120, 110, "MULTIPURPOSE HALL", 20, NAVY, weight=800) + text(120, 138, "RC frame with long-span steel roof truss", 15))
    return frame("Evacuation center elevation", "".join(b))


def axes(x0, y0, x1, y1, xlabel, ylabel):
    s = f'<g stroke="{NAVY}" stroke-width="2"><line x1="{x0}" y1="{y0}" x2="{x1}" y2="{y0}"/><line x1="{x0}" y1="{y0}" x2="{x0}" y2="{y1}"/></g>'
    s += "".join(f'<line x1="{x0}" y1="{y}" x2="{x1}" y2="{y}" stroke="{LINE}" stroke-width="1.5"/>' for y in range(y0 - 80, y1, -80))
    s += text((x0 + x1) / 2, y0 + 50, xlabel, 15, NAVY, "middle", 600)
    s += f'<text x="{x0-50}" y="{(y0+y1)/2}" {FONT} font-size="15" fill="{NAVY}" font-weight="600" text-anchor="middle" transform="rotate(-90 {x0-50} {(y0+y1)/2})">{ylabel}</text>'
    return s


def polyline(points, color, width=3, dash=None):
    d = " ".join(f"{x:.1f},{y:.1f}" for x, y in points)
    da = f' stroke-dasharray="{dash}"' if dash else ""
    return f'<polyline points="{d}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linejoin="round" stroke-linecap="round"{da}/>'


def pushover():
    x0, y0, x1, y1 = 180, 620, 1060, 190
    b = [axes(x0, y0, x1, y1, "Roof displacement", "Base shear")]
    def curve(k, vy, du, scale_x):
        pts = []
        for i in range(0, 101):
            d = du * i / 100
            v = vy * (1 - math.exp(-k * d / vy))
            if d > 0.75 * du:
                v *= 1 - 0.6 * (d - 0.75 * du) / du
            pts.append((x0 + d * scale_x, y0 - v))
        return pts
    b.append(polyline(curve(3.0, 220, 260, 2.0), MUTED, 3, "10 7"))
    b.append(polyline(curve(3.6, 360, 400, 2.0), BLUE, 4))
    b.append(f'<line x1="760" y1="250" x2="800" y2="250" stroke="{BLUE}" stroke-width="4"/>' + text(810, 255, "Retrofitted (jacketed)", 15, NAVY, weight=600))
    b.append(f'<line x1="760" y1="285" x2="800" y2="285" stroke="{MUTED}" stroke-width="3" stroke-dasharray="10 7"/>' + text(810, 290, "Existing", 15, NAVY, weight=600))
    b.append(text(120, 110, "PUSHOVER CAPACITY CURVES — CONCEPT", 20, NAVY, weight=800) + text(120, 138, "Conceptual comparison only — not analysis results", 15))
    return frame("Capacity curves concept", "".join(b))


def ida():
    x0, y0, x1, y1 = 180, 620, 1060, 190
    b = [axes(x0, y0, x1, y1, "Maximum inter-storey drift ratio", "Intensity measure, Sa(T₁)")]
    colors = [BLUE, ACCENT, NAVY, "#5B8FC7", "#1F4E86", "#7FA8D6"]
    for i, (k, cap) in enumerate([(1.0, 330), (0.9, 280), (1.15, 370), (0.8, 250), (1.05, 310), (0.95, 395)]):
        pts = []
        for j in range(0, 60):
            im = cap * (1 - math.exp(-j / 14))
            drift = im / (k * 1.6) + (j / 59) ** 4 * 520
            pts.append((x0 + drift, y0 - im))
        pts = [p for p in pts if p[0] <= x1]
        b.append(polyline(pts, colors[i], 2.6))
    b.append(f'<line x1="{x0}" y1="{y0-330}" x2="{x1}" y2="{y0-330}" stroke="{MUTED}" stroke-width="1.2" stroke-dasharray="8 6"/>')
    b.append(text(x1 - 10, y0 - 340, "Curves flatten → collapse", 14, MUTED, "end", 600))
    b.append(text(120, 110, "INCREMENTAL DYNAMIC ANALYSIS — CONCEPT", 20, NAVY, weight=800) + text(120, 138, "One curve per ground motion record — conceptual only", 15))
    return frame("IDA curves concept", "".join(b))


def fragility():
    x0, y0, x1, y1 = 180, 620, 1060, 220
    b = [axes(x0, y0, x1, y1, "Intensity measure, Sa(T₁)", "Probability of collapse")]
    for p in [0, 0.5, 1.0]:
        y = y0 - p * (y0 - y1)
        b.append(text(x0 - 12, y + 5, f"{p:.1f}", 13, MUTED, "end"))
    def cdf(x, med, beta):
        return 0.5 * (1 + math.erf(math.log(x / med) / (beta * math.sqrt(2))))
    def curve(med, beta):
        return [(x0 + i * (x1 - x0) / 200, y0 - cdf(max(0.001, 3.0 * i / 200), med, beta) * (y0 - y1)) for i in range(1, 201)]
    b.append(polyline(curve(0.9, 0.45), MUTED, 3, "10 7"))
    b.append(polyline(curve(1.6, 0.42), BLUE, 4))
    ym = y0 - 0.5 * (y0 - y1)
    b.append(f'<line x1="{x0}" y1="{ym}" x2="{x1}" y2="{ym}" stroke="{MUTED}" stroke-width="1" stroke-dasharray="4 6"/>')
    b.append(f'<line x1="700" y1="560" x2="740" y2="560" stroke="{BLUE}" stroke-width="4"/>' + text(750, 565, "Retrofitted (concrete jacketing)", 15, NAVY, weight=600))
    b.append(f'<line x1="700" y1="590" x2="740" y2="590" stroke="{MUTED}" stroke-width="3" stroke-dasharray="10 7"/>' + text(750, 595, "Existing building", 15, NAVY, weight=600))
    b.append(text(120, 110, "COLLAPSE FRAGILITY CURVES — CONCEPT", 20, NAVY, weight=800) + text(120, 138, "Lognormal fragility functions — conceptual only, not results", 15))
    return frame("Fragility curves concept", "".join(b))


def workflow():
    b = []
    steps = [("Inputs", "Geometry, loads,\nmaterials"), ("Calculation", "Code-referenced\nchecks"), ("Verification", "Hand checks &\nworked examples"), ("Report", "Traceable\ncalculation sheet")]
    x = 130
    for i, (t, d) in enumerate(steps):
        b.append(f'<rect x="{x}" y="300" width="210" height="160" rx="12" fill="#FFFFFF" stroke="{NAVY if i != 1 else BLUE}" stroke-width="3"/>')
        b.append(text(x + 105, 285, f"0{i+1}", 14, MUTED, "middle", 700))
        b.append(text(x + 105, 350, t, 20, NAVY, "middle", 800))
        for j, line in enumerate(d.split("\n")):
            b.append(text(x + 105, 390 + j * 22, line, 15, MUTED, "middle"))
        if i < 3:
            b.append(f'<g stroke="{BLUE}" stroke-width="3" fill="{BLUE}"><line x1="{x+215}" y1="380" x2="{x+255}" y2="380"/><path d="M{x+255} 372 L{x+270} 380 L{x+255} 388 Z"/></g>')
        x += 270
    b.append(f'<path d="M775 470 Q 775 560 640 560 Q 505 560 505 470" fill="none" stroke="{ACCENT}" stroke-width="2.5" stroke-dasharray="8 6"/>')
    b.append(f'<path d="M497 478 L505 462 L513 478 Z" fill="{ACCENT}"/>')
    b.append(text(640, 585, "Iterate until checks agree", 14, BLUE, "middle", 600))
    b.append(text(120, 110, "ENGINEERING CALCULATION WORKFLOW", 20, NAVY, weight=800) + text(120, 138, "Spreadsheet and Python automation with transparent verification", 15))
    return frame("Calculation workflow", "".join(b))


def portrait():
    w, h = 800, 1000
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">
<title>Portrait placeholder</title>
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A3557"/><stop offset="1" stop-color="#10233F"/></linearGradient></defs>
<rect width="{w}" height="{h}" fill="url(#g)"/>
<g stroke="#FFFFFF" stroke-opacity="0.05">{"".join(f'<line x1="{x}" y1="0" x2="{x}" y2="{h}"/>' for x in range(0, w+1, 40))}{"".join(f'<line x1="0" y1="{y}" x2="{w}" y2="{y}"/>' for y in range(0, h+1, 40))}</g>
<circle cx="400" cy="400" r="150" fill="#2A4A72"/>
<path d="M130 1000 C 130 760 250 640 400 640 C 550 640 670 760 670 1000 Z" fill="#2A4A72"/>
<text x="400" y="880" font-family="Inter, Arial, sans-serif" font-size="26" fill="#A9CBEE" text-anchor="middle" letter-spacing="3">REPLACE WITH PROFESSIONAL PORTRAIT</text>
</svg>'''


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    save("rc-building-frame", rc_building())
    save("rc-beam-section", beam_section())
    save("girder-bridge", girder_bridge())
    save("road-cross-section", road_section())
    save("port-wharf", port_wharf())
    save("slope-protection", slope_protection())
    save("evacuation-center", evacuation_center())
    save("pushover-curve", pushover())
    save("ida-curves", ida())
    save("fragility-curve", fragility())
    save("automation-workflow", workflow())
    with open(os.path.join(OUT, "..", "portrait-placeholder.svg"), "w") as f:
        f.write(portrait())
    print("Illustrations written to", os.path.abspath(OUT))
