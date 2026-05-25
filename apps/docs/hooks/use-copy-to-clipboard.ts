"use client"

import * as React from "react"

type UseCopyToClipboardOptions = {
	/** Reset `isCopied` back to `false` after this delay in ms. Default 2000. */
	timeout?: number
}

/**
 * Tiny clipboard helper used by synced shadcn examples (notably the input
 * group with a copy button). Reports an `isCopied` flag that flips back
 * automatically after `timeout` ms.
 */
export function useCopyToClipboard({
	timeout = 2000,
}: UseCopyToClipboardOptions = {}) {
	const [isCopied, setIsCopied] = React.useState(false)

	const copyToClipboard = React.useCallback(
		async (value: string) => {
			if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
				return
			}
			try {
				await navigator.clipboard.writeText(value)
				setIsCopied(true)
				window.setTimeout(() => setIsCopied(false), timeout)
			} catch {
				// Silently ignore — copy is a nice-to-have in demos.
			}
		},
		[timeout]
	)

	return { isCopied, copyToClipboard }
}
