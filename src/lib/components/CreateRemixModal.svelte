<script lang="ts">
	interface RemixSettings {
		allowRemix: boolean;
		allowSystemPromptEdit: boolean;
		allowKnowledgeEdit: boolean;
	}

	interface Props {
		personaTitel: string;
		remixSettings: RemixSettings;
		isOpen: boolean;
		onClose: () => void;
	}

	let { personaTitel, remixSettings, isOpen, onClose }: Props = $props();

	let remixTitle = $state('');
	let remixDescription = $state('');
	let systemPrompt = $state('');
	let knowledgeFiles = $state('');

	function handleSubmit(e: Event) {
		e.preventDefault();
		alert(
			`Remix aangemaakt (wireframe):\nOrigineel: ${personaTitel}\nNieuwe titel: ${remixTitle}\nBeschrijving: ${remixDescription}\n${remixSettings.allowSystemPromptEdit ? `System Prompt: ${systemPrompt}\n` : ''}${remixSettings.allowKnowledgeEdit ? `Kennis: ${knowledgeFiles}` : ''}`
		);
		// Reset form
		remixTitle = '';
		remixDescription = '';
		systemPrompt = '';
		knowledgeFiles = '';
		onClose();
	}
</script>

{#if isOpen}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 bg-black bg-opacity-50"
		onclick={onClose}
		role="button"
		tabindex="0"
	></div>

	<!-- Modal -->
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
		<div
			class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
		>
			<!-- Header -->
			<div class="sticky top-0 border-b bg-white px-6 py-4">
				<div class="flex items-center justify-between">
					<div>
						<h2 class="text-xl font-semibold text-gray-900">Maak een Remix</h2>
						<p class="mt-1 text-sm text-gray-600">Gebaseerd op: {personaTitel}</p>
					</div>
					<button
						onclick={onClose}
						class="text-gray-400 hover:text-gray-600"
						aria-label="Sluiten"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				</div>
			</div>

			<!-- Form -->
			<form onsubmit={handleSubmit} class="p-6">
				<!-- Basic Info -->
				<div class="mb-6">
					<label for="remixTitle" class="mb-2 block text-sm font-medium text-gray-700">
						Titel van je remix *
					</label>
					<input
						id="remixTitle"
						type="text"
						bind:value={remixTitle}
						required
						class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Bijv: Patiënt gesprek oefenen - Diabetes"
					/>
				</div>

				<div class="mb-6">
					<label for="remixDescription" class="mb-2 block text-sm font-medium text-gray-700">
						Beschrijving *
					</label>
					<textarea
						id="remixDescription"
						bind:value={remixDescription}
						required
						rows="3"
						class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Beschrijf wat jouw remix anders maakt..."
					></textarea>
				</div>

				<!-- System Prompt -->
				{#if remixSettings.allowSystemPromptEdit}
					<div class="mb-6">
						<label for="systemPrompt" class="mb-2 block text-sm font-medium text-gray-700">
							<span class="flex items-center gap-2">
								<span class="rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-800">Prompt</span>
								<span>Aangepaste System Prompt</span>
							</span>
						</label>
						<textarea
							id="systemPrompt"
							bind:value={systemPrompt}
							rows="5"
							class="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Je kunt hier de system prompt aanpassen voor jouw specifieke use case..."
						></textarea>
						<p class="mt-1 text-xs text-gray-500">
							Wijzig de instructies voor de AI om het gedrag aan te passen.
						</p>
					</div>
				{/if}

				<!-- Knowledge Files -->
				{#if remixSettings.allowKnowledgeEdit}
					<div class="mb-6">
						<label for="knowledgeFiles" class="mb-2 block text-sm font-medium text-gray-700">
							<span class="flex items-center gap-2">
								<span class="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">Kennis</span>
								<span>Kennis & Bestanden</span>
							</span>
						</label>
						<div class="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
							<svg
								class="mx-auto h-12 w-12 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								></path>
							</svg>
							<p class="mt-2 text-sm text-gray-600">Sleep bestanden hierheen of klik om te uploaden</p>
							<p class="mt-1 text-xs text-gray-500">PDF, DOCX, TXT tot 10MB</p>
						</div>
						<textarea
							id="knowledgeFiles"
							bind:value={knowledgeFiles}
							rows="2"
							class="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Of beschrijf welke kennis je wilt toevoegen..."
						></textarea>
					</div>
				{/if}

				<!-- Permissions Note -->
				<div class="mb-6 rounded-lg bg-blue-50 p-4">
					<h4 class="font-semibold text-blue-900">Wat mag je aanpassen?</h4>
					<ul class="mt-2 space-y-1 text-sm text-blue-800">
						{#if remixSettings.allowSystemPromptEdit}
							<li class="flex items-center gap-2">
								<span>✓</span>
								<span>System Prompt bewerken</span>
							</li>
						{/if}
						{#if remixSettings.allowKnowledgeEdit}
							<li class="flex items-center gap-2">
								<span>✓</span>
								<span>Kennis en bestanden toevoegen</span>
							</li>
						{/if}
					</ul>
				</div>

				<!-- Buttons -->
				<div class="flex justify-end gap-3">
					<button
						type="button"
						onclick={onClose}
						class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Annuleer
					</button>
					<button
						type="submit"
						class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
					>
						Remix Maken
					</button>
				</div>

				<p class="mt-4 text-xs text-gray-500">
					⚠️ Dit is een wireframe. Geen echte remix functionaliteit.
				</p>
			</form>
		</div>
	</div>
{/if}
