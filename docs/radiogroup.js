//#region lib/utils.ts
var e = (e) => e.classList.add("is-selected"), t = (e) => e.classList.remove("is-selected"), n = (e) => (e.classList.remove("is-focus"), e.blur()), r = (e) => (e.classList.add("is-focus"), e.focus()), i = (e, t = {}, n = "") => {
	let r = new CustomEvent(`Radio.${n}`, {
		bubbles: !1,
		cancelable: !0,
		detail: t
	});
	return e.dispatchEvent(r);
}, a = "aria-checked", o = class {
	$el;
	$input = null;
	checked = !1;
	disabled = !1;
	constructor(e) {
		this.$el = e, this.$input = this.$el.querySelector("input[type=\"radio\"]"), this.checked = this.$el.getAttribute(a) === "true" || !0 === this.$input?.checked, this.disabled = this.$el.getAttribute("aria-disabled") === "true" || !0 === this.$input?.disabled;
	}
	init = () => this.initEvents();
	initEvents() {
		this.$el.addEventListener("click", this.handleClick), this.$el.addEventListener("focus", this.handleFocus), this.$el.addEventListener("blur", this.handleBlur);
	}
	handleClick = () => this.toggle();
	handleFocus = () => r(this.$el);
	handleBlur = () => n(this.$el);
	toggle() {
		return !this.disabled && !this.checked && (i(this.$el, {}, "beforeActivate"), i(this.$el, {
			element: this.$el,
			value: this.$input?.value
		}, "activate"));
	}
	deactivate() {
		return this.checked ? (this.checked = !1, t(this.$el), this.$el.setAttribute(a, "false"), this.$el.setAttribute("tabindex", "-1"), n(this.$el), this.$input && (this.$input.checked = !1, this.$input.removeAttribute("checked")), i(this.$el, {
			element: this.$el,
			value: this.$input?.value
		}, "deactivate")) : !1;
	}
	activate(t = !0) {
		return !this.checked && (this.checked = !0, e(this.$el), this.$el.setAttribute(a, "true"), this.$el.setAttribute("tabindex", "0"), t && r(this.$el), this.$input && (this.$input.checked = !0, this.$input.setAttribute("checked", "true")), !0);
	}
	destroy() {
		this.$el.removeEventListener("click", this.handleClick), this.$el.removeEventListener("focus", this.handleFocus), this.$el.removeEventListener("blur", this.handleBlur);
	}
	disable() {
		this.disabled = !0, this.$el.setAttribute("tabindex", "-1"), this.$el.setAttribute("aria-disabled", "true"), this.$input && (this.$input.disabled = !0);
	}
	enable() {
		this.disabled = !1, this.$el.setAttribute("aria-disabled", "false"), this.$input && (this.$input.disabled = !1), this.checked && this.$el.setAttribute("tabindex", "0");
	}
}, s = {
	tagger: [],
	template: () => "",
	name: ""
}, c = class {
	$el;
	radios = [];
	current = 0;
	options;
	elements = [];
	constructor(e, t = {}) {
		this.$el = e, this.options = {
			...s,
			...t
		}, this.render();
	}
	init() {
		return this.elements = [...this.$el.querySelectorAll("[role=radio]")], this.elements.forEach((e) => {
			let t = new o(e);
			return t.init(), this.radios.push(t), !0;
		}), this.initEvents(), !0;
	}
	initEvents() {
		this.radios.filter((e) => !1 === e.disabled).forEach((e) => e.$el.addEventListener("Radio.beforeActivate", this.handleBeforeActivate)), this.$el.addEventListener("keydown", this.handleKeydown);
	}
	handleBeforeActivate = (e) => {
		let t = this.radios.filter((e) => !1 === e.disabled), n = t.findIndex((t) => t.$el === e.currentTarget);
		return n !== -1 && (this.setCurrent(n), this.deactivateAll(), t[n].activate());
	};
	handleKeydown = (e) => {
		let t = e.target?.closest("[role=radio]");
		if (!t) return !1;
		let { key: n } = e, r = this.radios.filter((e) => !1 === e.disabled), i = r.findIndex((e) => e.$el === t);
		if (r.length === 0) return !1;
		i !== -1 && this.setCurrent(i);
		let a = () => {
			e.preventDefault();
			let t = this.current + 1 > r.length - 1 ? 0 : this.current + 1;
			this.setCurrent(t), r[this.current].toggle();
		}, o = () => {
			e.preventDefault();
			let t = 0 > this.current - 1 ? r.length - 1 : this.current - 1;
			this.setCurrent(t), r[this.current].toggle();
		}, s = {
			" ": () => (e.preventDefault(), (r.find((e) => e.$el === document.activeElement) ?? r[this.current]).toggle()),
			ArrowUp: o,
			ArrowRight: a,
			ArrowDown: a,
			ArrowLeft: o,
			Home: () => {
				e.preventDefault(), this.setCurrent(0), r[0].toggle();
			},
			End: () => {
				e.preventDefault(), this.setCurrent(r.length - 1), r[r.length - 1].toggle();
			},
			default: () => !1
		};
		return (s[n] ?? s.default)();
	};
	deactivateAll = () => this.radios.forEach((e) => e.deactivate());
	render() {
		let { template: e, name: t } = this.options;
		this.options.tagger.forEach((n) => {
			this.$el.insertAdjacentHTML("beforeend", e(n.label, n.value, n.selected, t));
		});
	}
	destroy() {
		this.$el.removeEventListener("keydown", this.handleKeydown), this.radios.forEach((e) => {
			e.$el.removeEventListener("Radio.beforeActivate", this.handleBeforeActivate), e.destroy();
		}), this.elements = [], this.radios = [];
	}
	setCurrent = (e = 0) => {
		this.current = e;
	};
};
//#endregion
export { c as default };
