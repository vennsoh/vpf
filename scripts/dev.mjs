#!/usr/bin/env node
import { spawn } from "node:child_process"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envFile = path.join(__dirname, "..", ".env.local")

try {
	const contents = readFileSync(envFile, "utf-8")
	for (const line of contents.split("\n")) {
		const trimmed = line.trim()
		if (!trimmed || trimmed.startsWith("#")) continue
		const eq = trimmed.indexOf("=")
		if (eq === -1) continue
		const key = trimmed.slice(0, eq).trim()
		let value = trimmed.slice(eq + 1).trim()
		if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
			value = value.slice(1, -1)
		}
		if (process.env[key] === undefined) process.env[key] = value
	}
} catch (err) {
	if (err.code !== "ENOENT") throw err
}

const app = process.env.PORTLESS_APP ?? (process.env.PORT ? "web" : null)
const filter = app ? [`--filter=${app}`] : []
const child = spawn("turbo", ["dev", ...filter], { stdio: "inherit" })
child.on("exit", (code) => process.exit(code ?? 0))
