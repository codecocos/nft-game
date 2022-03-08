import React from 'react'
// cards
import { parts } from '../parts/parts'
import _r1 from '../assets/images/rarity/_rarity_1.png'
import _r2 from '../assets/images/rarity/_rarity_2.png'
import _r3 from '../assets/images/rarity/_rarity_3.png'

const minRenderer = ({ min = null, size = 200, style }) => {
  if (!min) {
    return null;
  }

  let rarity = _r1;

  if (min.rarity >= 80) {
    rarity = _r2;
  }

  if (min.rarity >= 95) {
    rarity = _r3;
  }

  let dnaStr = String(min.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  let minDetails = {
    bg: dnaStr.substring(0, 2) % 5,
    mask: dnaStr.substring(2, 4) % 5,
    line: dnaStr.substring(4, 6) % 5,
    addon: dnaStr.substring(6, 8) % 5,
    addonMouth1: dnaStr.substring(8, 10) % 5,
    addonMouth2: dnaStr.substring(10, 12) % 5,
    addonMouth3: dnaStr.substring(12, 14) % 5,
    name: min.name,
  }

  const lipStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
        background: "blue",
        position: "relative",
        ...style,
      }}
    >
      <img alt={"bg"} src={parts.bg[minDetails.bg]} style={lipStyle} />
      <img alt={"mask"} src={parts.mask[minDetails.mask]} style={lipStyle} />
      <img alt={"line"} src={parts.line[minDetails.line]} style={lipStyle} />
      <img alt={"addon"} src={parts.addon[minDetails.addon]} style={lipStyle} />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth1[minDetails.addonMouth1]}
        style={lipStyle}
      />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth2[minDetails.addonMouth2]}
        style={lipStyle}
      />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth3[minDetails.addonMouth3]}
        style={lipStyle}
      />
      <img alt={"rarity"} src={rarity} style={lipStyle} />/
    </div>
  )

}


export default minRenderer