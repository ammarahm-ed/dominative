import { PageBase, Frame } from '@nativescript/core'
import { named, makeView } from "./mixin.js"

export const makeFrame = named(
	'Frame', 'Frame', Frame,
	_ => class FrameElement extends makeView(_) {
		__dominative_onSetAttributeNS(ns, key, val) {
			if (ns) return
			if (key.toLowerCase() === "defaultpage" && val) {
				const page = new val()
				this.navigate({ create: () => page})
				return
			}
			super.__dominative_onSetAttributeNS(key, val)
		}

		__dominative_onInsertChild(child, ref) {
			if (!child.__dominative_isNative || (ref && !ref.__dominative_isNative)) return super.__dominative_onInsertChild(child, ref)

			if (child instanceof PageBase) {
				this.navigate({ create: () => child, clearHistory: true })
			}

			super.__dominative_onInsertChild(child, ref)
		}
	}
)

export default makeFrame.master()
