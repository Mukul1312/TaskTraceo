export default function generatePastelColor() {
  const hue = Math.floor(Math.random() * 360); // Random hue
  const saturation = Math.floor(Math.random() * 30) + 70; // Random saturation (70-100)
  const lightness = Math.floor(Math.random() * 20) + 30; // Random lightness (30-50)
  const color = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";

  return color;
}
