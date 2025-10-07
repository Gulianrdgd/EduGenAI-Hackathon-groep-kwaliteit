<script lang="ts">
	interface AIActClassification {
		riskLevel: 'low-risk' | 'high-risk';
		reasoning: string;
		requirements: string[];
		requirementsMetDate?: string;
	}

	interface Props {
		personaTitel: string;
		aiActClassification: AIActClassification;
		isOpen: boolean;
		onClose: () => void;
		onAccept: () => void;
	}

	let { personaTitel, aiActClassification, isOpen, onClose, onAccept }: Props = $props();

	let allChecked = $state(false);
	let checkedItems = $state<boolean[]>(
		new Array(aiActClassification.requirements.length).fill(false)
	);

	$effect(() => {
		allChecked = checkedItems.every((item) => item);
	});

	function handleAccept() {
		if (allChecked) {
			onAccept();
			onClose();
		}
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
			<div class="border-b bg-red-50 px-6 py-4">
				<div class="flex items-start gap-3">
					<div class="text-3xl">⚠️</div>
					<div class="flex-1">
						<h2 class="text-xl font-semibold text-red-900">High-Risk AI Systeem</h2>
						<p class="mt-1 text-sm text-red-800">
							Conform EU AI Act voor: <strong>{personaTitel}</strong>
						</p>
					</div>
					<button
						onclick={onClose}
						class="text-red-600 hover:text-red-800"
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

			<!-- Content -->
			<div class="p-6">
				<!-- Reasoning -->
				<div class="mb-6 rounded-lg bg-gray-50 p-4">
					<h3 class="font-semibold text-gray-900">Waarom High-Risk?</h3>
					<p class="mt-2 text-sm text-gray-700">{aiActClassification.reasoning}</p>
				</div>

				<!-- Requirements -->
				<div class="mb-6">
					<h3 class="mb-4 font-semibold text-gray-900">Vereisten EU AI Act</h3>
					<p class="mb-4 text-sm text-gray-600">
						Bevestig dat aan onderstaande vereisten wordt voldaan voordat je dit systeem gebruikt:
					</p>

					<div class="space-y-3">
						{#each aiActClassification.requirements as requirement, i}
							<label class="flex items-start gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 cursor-pointer">
								<input
									type="checkbox"
									bind:checked={checkedItems[i]}
									class="mt-0.5 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span class="text-sm text-gray-700">{requirement}</span>
							</label>
						{/each}
					</div>
				</div>

				<!-- Compliance Date -->
				{#if aiActClassification.requirementsMetDate}
					<div class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
						<div class="flex items-center gap-2">
							<span class="text-green-600">✓</span>
							<span class="text-sm font-medium text-green-900">
								Compliance status: Voldoet vanaf {new Date(
									aiActClassification.requirementsMetDate
								).toLocaleDateString('nl-NL')}
							</span>
						</div>
					</div>
				{/if}

				<!-- Warning -->
				<div class="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
					<h4 class="font-semibold text-amber-900">Let op</h4>
					<p class="mt-1 text-sm text-amber-800">
						Door verder te gaan bevestig je dat je bewust bent van de risico's en verantwoordelijkheden
						bij het gebruik van dit high-risk AI systeem. Het niet naleven van deze vereisten kan
						leiden tot boetes onder de EU AI Act.
					</p>
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
						onclick={handleAccept}
						disabled={!allChecked}
						class="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Ik begrijp het en ga akkoord
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
