<script lang="ts">
	interface Props {
		personaTitel: string;
		isOpen: boolean;
		onClose: () => void;
	}

	let { personaTitel, isOpen, onClose }: Props = $props();

	let selectedReason = $state('');
	let additionalInfo = $state('');

	const reasons = [
		'Ongepaste inhoud',
		'Foutieve informatie',
		'Niet educatief',
		'Spam of misleidend',
		'Technische problemen',
		'Anders'
	];

	function handleSubmit(e: Event) {
		e.preventDefault();
		alert(
			`Rapportage verstuurd (wireframe):\nPersona: ${personaTitel}\nReden: ${selectedReason}\nToelichting: ${additionalInfo}`
		);
		// Reset form
		selectedReason = '';
		additionalInfo = '';
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
			class="w-full max-w-md rounded-lg bg-white shadow-xl"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
		>
			<!-- Header -->
			<div class="border-b px-6 py-4">
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold text-gray-900">Persona rapporteren</h2>
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
				<p class="mb-4 text-sm text-gray-600">
					Je rapporteert: <strong>{personaTitel}</strong>
				</p>

				<!-- Reason Selection -->
				<div class="mb-4">
					<label class="mb-2 block text-sm font-medium text-gray-700">
						Wat is de reden voor je rapportage?
					</label>
					<div class="space-y-2">
						{#each reasons as reason}
							<label class="flex items-center">
								<input
									type="radio"
									name="reason"
									value={reason}
									bind:group={selectedReason}
									class="mr-2 text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span class="text-sm text-gray-700">{reason}</span>
							</label>
						{/each}
					</div>
				</div>

				<!-- Additional Info -->
				<div class="mb-6">
					<label for="additionalInfo" class="mb-2 block text-sm font-medium text-gray-700">
						Aanvullende informatie (optioneel)
					</label>
					<textarea
						id="additionalInfo"
						bind:value={additionalInfo}
						rows="3"
						class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Geef meer details over je rapportage..."
					></textarea>
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
						disabled={!selectedReason}
						class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
					>
						Verstuur rapportage
					</button>
				</div>

				<p class="mt-4 text-xs text-gray-500">
					⚠️ Dit is een wireframe. Geen echte rapportage functionaliteit.
				</p>
			</form>
		</div>
	</div>
{/if}
