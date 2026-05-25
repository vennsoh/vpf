import { nextJsConfig } from "@workspace/eslint-config/next-js"

/** @type {import("eslint").Linter.Config[]} */
export default [
	{
		ignores: [
			"components/examples/**",
			"components/blocks/**",
			"lib/registry.generated.ts",
		],
	},
	...nextJsConfig,
]
