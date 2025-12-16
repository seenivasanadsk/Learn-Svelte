const events = {}

export const eventBus = {
  on: function (shortcutKey, callable) {
    events[shortcutKey] = callable
  }
}