// Replays an element's hover animation every time it's tapped or clicked.
// On touch screens there's no hover, so this is how the wiggle shows up there.
export function useTapReplay() {
  function replay(event: PointerEvent) {
    const el = event.currentTarget as HTMLElement
    el.style.animation = 'none'
    void el.offsetWidth // force a reflow so the browser forgets the old run
    el.style.animation = ''
  }

  return { replay }
}
