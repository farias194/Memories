/**
 * Countdown timer custom element.
 *
 * Counts down to a target Unix timestamp (in seconds, store timezone) provided
 * through the `data-end-time` attribute and updates the unit values every second.
 *
 * Behavior on expiry:
 * - If the `data-hide-after-expiry` attribute is present, the whole section is
 *   removed from the page.
 * - Otherwise the timer units are hidden and the `[data-countdown-expired]`
 *   content (if any) is revealed.
 *
 * @example
 * <countdown-timer data-end-time="1766620800" data-hide-after-expiry>
 *   <div class="countdown-timer__units">
 *     <div class="countdown-timer__unit" data-countdown-unit="days">
 *       <span class="countdown-timer__value" data-countdown-value="days">00</span>
 *     </div>
 *   </div>
 * </countdown-timer>
 */
class CountdownTimer extends HTMLElement {
  /** @type {number|undefined} */
  #interval = undefined;

  /** @type {number} */
  #endTime = 0;

  /** @type {Map<string, HTMLElement>} */
  #values = new Map();

  /** @type {HTMLElement[]} */
  #units = [];

  connectedCallback() {
    const endTime = Number.parseInt(this.dataset.endTime, 10);

    if (!Number.isFinite(endTime) || endTime <= 0) return;

    this.#endTime = endTime * 1000;
    this.#units = Array.from(this.querySelectorAll('[data-countdown-unit]'));

    for (const unit of this.#units) {
      const value = unit.querySelector('[data-countdown-value]');

      if (value instanceof HTMLElement) {
        this.#values.set(unit.dataset.countdownUnit, value);
      }
    }

    this.#update();
    this.#interval = window.setInterval(() => this.#update(), 1000);
  }

  disconnectedCallback() {
    if (this.#interval !== undefined) {
      window.clearInterval(this.#interval);
      this.#interval = undefined;
    }
  }

  /**
   * Recomputes the remaining time and refreshes the displayed values.
   */
  #update() {
    const remaining = this.#endTime - Date.now();

    if (remaining <= 0) {
      this.#expire();
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const parts = {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };

    for (const [name, value] of Object.entries(parts)) {
      const element = this.#values.get(name);

      if (element) {
        element.textContent = name === 'days' ? `${value}` : String(value).padStart(2, '0');
      }
    }

    this.#syncSeparators();
  }

  /**
   * Handles the countdown reaching zero.
   */
  #expire() {
    if (this.#interval !== undefined) {
      window.clearInterval(this.#interval);
      this.#interval = undefined;
    }

    if (this.hasAttribute('data-hide-after-expiry')) {
      const section = this.closest('.shopify-section');
      (section ?? this).remove();
      return;
    }

    const units = this.querySelector('[data-countdown-units]');
    const expired = this.querySelector('[data-countdown-expired]');

    if (units instanceof HTMLElement) units.hidden = true;
    if (expired instanceof HTMLElement) expired.hidden = false;
  }

  /**
   * Hides separators that follow a hidden unit or the last visible unit, so a
   * trailing ":" never appears when units are toggled off in the editor.
   */
  #syncSeparators() {
    const visible = this.#units.filter((unit) => !unit.hidden);
    const lastVisible = visible[visible.length - 1];

    for (const unit of this.#units) {
      const separator = this.querySelector(
        `[data-countdown-separator="${unit.dataset.countdownUnit}"]`,
      );

      if (separator instanceof HTMLElement) {
        separator.hidden = unit.hidden || unit === lastVisible;
      }
    }
  }
}

if (!customElements.get('countdown-timer')) {
  customElements.define('countdown-timer', CountdownTimer);
}
