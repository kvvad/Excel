export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error(`No $root provided fo Dom listener`)
    }
    this.$root = $root
  }
}
