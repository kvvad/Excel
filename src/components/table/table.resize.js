import {$} from '@core/dom';

export const resizeHandler = ($root, event) => {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizeable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  let valueX
  let valueY
  $resizer.css({
    opacity: 1,
  })

  document.onmousemove = e => {
    if (type === 'row') {
      const deltaY = Math.floor(e.pageY - coords.bottom)
      valueY = coords.height + deltaY
      $resizer.css({bottom: `${-deltaY}px`, right: '-2000px'})
    } else {
      const deltaX = Math.floor(e.pageX - coords.right)
      valueX = coords.width + deltaX
      $resizer.css({right: -deltaX +'px', bottom: '-2000px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({'width': `${valueX}px`})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(e => e.style.width = valueX + 'px')
    } else {
      $parent.css({'height': `${valueY}px`})
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}
