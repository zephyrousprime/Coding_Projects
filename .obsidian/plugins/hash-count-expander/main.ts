import {
	App,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import { Annotation } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

export const MAX_HASH_COUNT = 50;

/** Marks expansions so we do not recurse on our own dispatch. */
const TransactionUser = Annotation.define<boolean>();

export interface HashExpanderSettings {
	enableHashPrefix: boolean;
	enableHashSuffix: boolean;
	enableHashDouble: boolean;
}

export const DEFAULT_SETTINGS: HashExpanderSettings = {
	enableHashPrefix: true,
	enableHashSuffix: true,
	enableHashDouble: true,
};

function clampCount(raw: number): number | null {
	if (!Number.isFinite(raw) || raw < 1) return null;
	return Math.min(Math.round(raw), MAX_HASH_COUNT);
}

function hashes(count: number): string {
	return "#".repeat(count);
}

/** Try to expand a trigger ending at the cursor on the current line. */
export function matchHashTrigger(
	textBeforeCursor: string,
	settings: HashExpanderSettings
): { fromOffset: number; insert: string } | null {
	if (settings.enableHashDouble) {
		const double = textBeforeCursor.match(/(\d+)#(\d+)$/);
		if (double) {
			const count = clampCount(parseInt(`${double[1]}${double[2]}`, 10));
			if (count !== null) {
				return {
					fromOffset: textBeforeCursor.length - double[0].length,
					insert: hashes(count),
				};
			}
		}
	}

	if (settings.enableHashPrefix) {
		const prefix = textBeforeCursor.match(/#(\d+)$/);
		if (prefix) {
			const count = clampCount(parseInt(prefix[1], 10));
			if (count !== null) {
				return {
					fromOffset: textBeforeCursor.length - prefix[0].length,
					insert: hashes(count),
				};
			}
		}
	}

	if (settings.enableHashSuffix) {
		const suffix = textBeforeCursor.match(/(\d+)#$/);
		if (suffix) {
			const count = clampCount(parseInt(suffix[1], 10));
			if (count !== null) {
				return {
					fromOffset: textBeforeCursor.length - suffix[0].length,
					insert: hashes(count),
				};
			}
		}
	}

	return null;
}

export default class HashCountExpanderPlugin extends Plugin {
	settings: HashExpanderSettings = { ...DEFAULT_SETTINGS };

	async onload() {
		await this.loadSettings();

		const plugin = this;
		this.registerEditorExtension(
			EditorView.updateListener.of((update) => {
				if (!update.docChanged) return;

				const view = update.view;
				if (!view.hasFocus) return;

				for (const tr of update.transactions) {
					if (tr.annotation(TransactionUser)) return;
				}

				const pos = view.state.selection.main.head;
				const line = view.state.doc.lineAt(pos);
				const textBefore = line.text.slice(0, pos - line.from);
				const match = matchHashTrigger(textBefore, plugin.settings);
				if (!match) return;

				const from = line.from + match.fromOffset;
				const to = pos;

				view.dispatch({
					changes: { from, to, insert: match.insert },
					annotations: TransactionUser.of(true),
				});
			})
		);

		this.addSettingTab(new HashExpanderSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class HashExpanderSettingTab extends PluginSettingTab {
	plugin: HashCountExpanderPlugin;

	constructor(app: App, plugin: HashCountExpanderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "Hash Count Expander" });

		containerEl.createEl("p", {
			text: "Type a shortcut and it expands into that many # characters (maximum 50).",
		});

		new Setting(containerEl)
			.setName("# then number")
			.setDesc("Example: #4 becomes ####")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableHashPrefix)
					.onChange(async (value) => {
						this.plugin.settings.enableHashPrefix = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Number then #")
			.setDesc("Example: 4# becomes ####")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableHashSuffix)
					.onChange(async (value) => {
						this.plugin.settings.enableHashSuffix = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Number, #, number")
			.setDesc(
				"Example: 4#4 becomes 44 hashes (digits concatenated: 4 + 4 → 44). Does not block the “number then #” pattern until you type a digit after #."
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableHashDouble)
					.onChange(async (value) => {
						this.plugin.settings.enableHashDouble = value;
						await this.plugin.saveSettings();
					})
			);

		containerEl.createEl("h3", { text: "Examples" });
		const list = containerEl.createEl("ul");
		list.createEl("li", { text: "#4 → #### (4 hashes)" });
		list.createEl("li", { text: "4# → ####" });
		list.createEl("li", { text: "4#4 → 44 hashes" });
		list.createEl("li", { text: "1#9 → 19 hashes" });
		list.createEl("li", { text: "Counts above 50 are capped at 50" });
	}
}
