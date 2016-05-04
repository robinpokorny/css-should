export default function (property, arr) {
  return arr
    .map((obj) => obj[property])
    .filter((x) => !!x)
}
