//#region lib/utils.ts
var e = (e) => e.classList.add("is-selected"), t = (e) => e.classList.remove("is-selected"), n = (e) => (e.classList.remove("is-focus"), e.blur()), r = (e) => (e.classList.add("is-focus"), e.focus()), i = (e, t = {}, n = "") => {
	let r = new CustomEvent(`Radio.${n}`, {
		bubbles: !1,
		cancelable: !0,
		detail: t
	});
	return e.dispatchEvent(r);
}, a = "aria-checked", o = class {
	el;
	$input = null;
	checked = !1;
	disabled = !1;
	constructor(e) {
		this.el = e;
		let t = this.el.querySelector("input[type=\"radio\"]");
		t && (this.$input = t, this.checked = JSON.parse(this.el.getAttribute(a)), this.disabled = this.$input.disabled);
	}
	init = () => this.initEvents();
	initEvents() {
		this.el.addEventListener("click", this.handleClick), this.el.addEventListener("focus", () => r(this.el)), this.el.addEventListener("blur", () => n(this.el));
	}
	handleClick = () => this.toggle();
	toggle() {
		return !this.disabled && !this.checked && (i(this.el, {}, "beforeActivate"), i(this.el, {
			element: this.el,
			value: this.$input.value
		}, "activate"));
	}
	deactivate() {
		return this.checked ? (this.checked = !1, t(this.el), this.el.setAttribute(a, "false"), this.el.setAttribute("tabindex", "-1"), n(this.el), this.$input.checked = !1, this.$input.removeAttribute("checked"), i(this.el, {
			element: this.el,
			value: this.$input.value
		}, "deactivate")) : !1;
	}
	activate(t = !0) {
		return !this.checked && (this.checked = !0, e(this.el), this.el.setAttribute(a, "true"), this.el.setAttribute("tabindex", "0"), t && r(this.el), this.$input.checked = !0, this.$input.setAttribute("checked", "true"), !0);
	}
	destroy() {
		this.el.removeEventListener("click", this.handleClick), this.el.removeEventListener("focus", () => r(this.el)), this.el.removeEventListener("blur", () => n(this.el));
	}
	disable() {
		this.el.setAttribute("tabindex", "-1"), this.el.setAttribute("aria-disabled", "true"), this.$input.disabled = !0;
	}
	enable() {
		this.$input.disabled = !1, this.el.setAttribute("aria-disabled", "false"), this.checked && this.el.setAttribute("tabindex", "0");
	}
}, s = {
	tagger: [],
	template: () => "",
	name: ""
}, c = class {
	el;
	radios = [];
	current = 0;
	options;
	elements = [];
	constructor(e, t = {}) {
		this.el = e, this.options = {
			...s,
			...t
		}, this.render();
	}
	init() {
		return this.elements = [...this.el.querySelectorAll("[role=radio]")], this.elements.forEach((e) => {
			let t = new o(e);
			return t.init(), this.radios.push(t), !0;
		}), this.initEvents(), !0;
	}
	initEvents() {
		this.radios.filter((e) => !1 === e.disabled).forEach((e, t) => e.el.addEventListener("Radio.beforeActivate", () => (this.setCurrent(t), this.deactivateAll(), e.activate()))), this.el.addEventListener("keydown", this.handleKeydown);
	}
	handleKeydown = (e) => {
		let t = e.key || e.code, n = this.radios.filter((e) => !1 === e.disabled), r = () => {
			e.preventDefault();
			let t = this.current + 1 > n.length - 1 ? 0 : this.current + 1;
			this.setCurrent(t), n[this.current].toggle();
		}, i = () => {
			e.preventDefault();
			let t = 0 > this.current - 1 ? n.length - 1 : this.current - 1;
			this.setCurrent(t), n[this.current].toggle();
		}, a = {
			ArrowUp: i,
			ArrowRight: r,
			ArrowDown: r,
			ArrowLeft: i,
			Home: () => {
				e.preventDefault(), this.setCurrent(0), n[0].toggle();
			},
			End: () => {
				e.preventDefault(), this.setCurrent(n.length - 1), n[n.length - 1].toggle();
			},
			default: () => !1
		};
		return (a[t] || a.default)();
	};
	deactivateAll = () => this.radios.forEach((e) => e.deactivate());
	render() {
		let { template: e, name: t } = this.options;
		this.options.tagger.forEach((n) => {
			this.el.insertAdjacentHTML("beforeend", e(n.label, n.value, n.selected, t));
		});
	}
	destroy() {
		this.el.removeEventListener("keydown", this.handleKeydown), this.radios.forEach((e) => e.destroy()), this.elements = [], this.radios = [];
	}
	setCurrent = (e = 0) => {
		this.current = e;
	};
};
//#endregion
export { c as default };
