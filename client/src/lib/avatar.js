export default function Avatar(name = '', size = 64) {
  return `https://api.adorable.io/avatars/${size}/${name}.png`
}