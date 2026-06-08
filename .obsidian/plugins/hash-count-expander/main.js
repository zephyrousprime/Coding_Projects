"use strict";

const obsidian = require("obsidian");

const MAX_HASH_COUNT = 50;

const DEFAULT_SETTINGS = {
	enableHashPrefix: true, // #4
	enableHashSuffix: true, // 4#
	enableHashDouble: true, // 4#4 -> 44
};

function clampCount(raw) {
	if (!Number.isFinite(raw) || raw < 1) return null;
	return Math.min(Math.round(raw), MAX_HASH_COUNT);
}

function hashes(count) {
	return "#".repeat(count);
}

function matchHashTrigger(textBeforeCursor, settings) {
	if (settings.enableHashDouble) {
		const dbl = textBeforeCursor.match(/(\d+)#(\d+)$/);
		if (dbl) {
			const count = clampCount(parseInt(`${dbl[1]}${dbl[2]}`, 10));
			if (count !== null) {
				return {
					fromOffset: textBeforeCursor.length - dbl[0].length,
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

class HashExpanderSettingTab extends obsidian.PluginSettingTab {
	constructor(app, plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "Hash Count Expander" });
		containerEl.createEl("p", {
			text: "Type a shortcut and it expands into that many # characters (max 50).",
		});

		new obsidian.Setting(containerEl)
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

		new obsidian.Setting(containerEl)
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

		new obsidian.Setting(containerEl)
			.setName("Number, #, number")
			.setDesc("Example: 4#4 becomes 44 hashes")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableHashDouble)
					.onChange(async (value) => {
						this.plugin.settings.enableHashDouble = value;
						await this.plugin.saveSettings();
					})
			);
	}
}

module.exports = class HashCountExpanderPlugin extends obsidian.Plugin {
	async onload() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		this._isApplying = false;

		this.registerEvent(
			this.app.workspace.on("editor-change", (editor) => {
				if (this._isApplying) return;

				const cursor = editor.getCursor();
				const lineText = editor.getLine(cursor.line);
				const before = lineText.slice(0, cursor.ch);
				const match = matchHashTrigger(before, this.settings);
				if (!match) return;

				const from = { line: cursor.line, ch: match.fromOffset };
				const to = { line: cursor.line, ch: cursor.ch };

				this._isApplying = true;
				editor.replaceRange(match.insert, from, to);
				this._isApplying = false;
			})
		);

		this.addSettingTab(new HashExpanderSettingTab(this.app, this));
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
};
