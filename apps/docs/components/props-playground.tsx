"use client"

import * as React from "react"

import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/select"
import { Slider } from "@workspace/ui/components/slider"
import { Switch } from "@workspace/ui/components/switch"

export type SelectControl<TValue extends string = string> = {
	type: "select"
	label: string
	options: readonly TValue[]
	default: TValue
}

export type BooleanControl = {
	type: "boolean"
	label: string
	default: boolean
}

export type TextControl = {
	type: "text"
	label: string
	default: string
	placeholder?: string
}

export type NumberControl = {
	type: "number"
	label: string
	min?: number
	max?: number
	step?: number
	default: number
}

export type ControlDef =
	| SelectControl
	| BooleanControl
	| TextControl
	| NumberControl

export type ControlSchema = Record<string, ControlDef>

export type ValuesOf<TSchema extends ControlSchema> = {
	[K in keyof TSchema]: TSchema[K] extends SelectControl<infer V>
		? V
		: TSchema[K] extends BooleanControl
			? boolean
			: TSchema[K] extends TextControl
				? string
				: TSchema[K] extends NumberControl
					? number
					: never
}

function getDefaults<TSchema extends ControlSchema>(
	schema: TSchema
): ValuesOf<TSchema> {
	const out: Record<string, unknown> = {}
	for (const [key, def] of Object.entries(schema)) {
		out[key] = def.default
	}
	return out as ValuesOf<TSchema>
}

const PlaygroundContext = React.createContext<Record<string, unknown> | null>(
	null
)

/**
 * Read the current playground values from inside a child component.
 * The schema argument is only used for type inference.
 */
export function usePlaygroundValues<TSchema extends ControlSchema>(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_schema: TSchema
): ValuesOf<TSchema> {
	const ctx = React.useContext(PlaygroundContext)
	if (!ctx) {
		throw new Error(
			"usePlaygroundValues must be used inside a <PropsPlayground>"
		)
	}
	return ctx as ValuesOf<TSchema>
}

type PropsPlaygroundProps<TSchema extends ControlSchema> = {
	schema: TSchema
	children: React.ReactNode
}

export function PropsPlayground<TSchema extends ControlSchema>({
	schema,
	children,
}: PropsPlaygroundProps<TSchema>) {
	const [values, setValues] = React.useState<ValuesOf<TSchema>>(() =>
		getDefaults(schema)
	)

	const update = <K extends keyof TSchema>(
		key: K,
		value: ValuesOf<TSchema>[K]
	) => {
		setValues((prev) => ({ ...prev, [key]: value }))
	}

	return (
		<PlaygroundContext.Provider value={values as Record<string, unknown>}>
			<div className="grid gap-6 md:grid-cols-[1fr_280px]">
				<div className="flex min-h-[350px] items-center justify-center rounded-md border p-6">
					{children}
				</div>
				<div className="flex flex-col gap-4 rounded-md border p-4">
					<div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
						Props
					</div>
					{Object.entries(schema).map(([key, def]) => (
						<ControlRow
							key={key}
							name={key}
							def={def}
							value={values[key as keyof TSchema]}
							onChange={(v) =>
								update(
									key as keyof TSchema,
									v as ValuesOf<TSchema>[keyof TSchema]
								)
							}
						/>
					))}
				</div>
			</div>
		</PlaygroundContext.Provider>
	)
}

function ControlRow({
	name,
	def,
	value,
	onChange,
}: {
	name: string
	def: ControlDef
	value: unknown
	onChange: (value: unknown) => void
}) {
	const id = `playground-${name}`

	if (def.type === "select") {
		return (
			<div className="flex flex-col gap-1.5">
				<Label htmlFor={id} className="text-xs text-muted-foreground">
					{def.label}
				</Label>
				<Select
					value={value as string}
					onValueChange={(v) => {
						if (typeof v === "string") onChange(v)
					}}
				>
					<SelectTrigger id={id} className="w-full">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{def.options.map((opt) => (
							<SelectItem key={opt} value={opt}>
								{opt}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		)
	}

	if (def.type === "boolean") {
		return (
			<div className="flex items-center justify-between gap-2">
				<Label htmlFor={id} className="text-xs text-muted-foreground">
					{def.label}
				</Label>
				<Switch
					id={id}
					checked={value as boolean}
					onCheckedChange={(v) => onChange(Boolean(v))}
				/>
			</div>
		)
	}

	if (def.type === "text") {
		return (
			<div className="flex flex-col gap-1.5">
				<Label htmlFor={id} className="text-xs text-muted-foreground">
					{def.label}
				</Label>
				<Input
					id={id}
					value={value as string}
					placeholder={def.placeholder}
					onChange={(e) => onChange(e.target.value)}
				/>
			</div>
		)
	}

	// number
	const min = def.min ?? 0
	const max = def.max ?? 100
	const step = def.step ?? 1
	const num = typeof value === "number" ? value : Number(value ?? 0)
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-center justify-between">
				<Label htmlFor={id} className="text-xs text-muted-foreground">
					{def.label}
				</Label>
				<span className="font-mono text-xs text-muted-foreground">
					{num}
				</span>
			</div>
			<Slider
				id={id}
				min={min}
				max={max}
				step={step}
				value={[num]}
				onValueChange={(v) => {
					const next = Array.isArray(v) ? v[0] : v
					if (typeof next === "number") onChange(next)
				}}
			/>
		</div>
	)
}
