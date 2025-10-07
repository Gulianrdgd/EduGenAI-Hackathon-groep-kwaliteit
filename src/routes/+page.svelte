<script lang="ts">
	import PersonaCard from '$lib/components/PersonaCard.svelte';
	import personasData from '$lib/data/personas.json';

	const { populair, 'voor-studenten': voorStudenten, 'gedeeld-met-jou': gedeeldMetJou } = personasData;

	// Filter state
	let selectedRiskLevels = $state<string[]>([]);
	let selectedLiteracyLevels = $state<string[]>([]);

	// Filter function
	function filterPersona(persona: any) {
		const riskMatch = selectedRiskLevels.length === 0 ||
			selectedRiskLevels.includes(persona.aiActClassification?.riskLevel || '');

		const literacyMatch = selectedLiteracyLevels.length === 0 ||
			selectedLiteracyLevels.includes(persona.aiLiteracyLevel || '');

		return riskMatch && literacyMatch;
	}

	// Toggle filter
	function toggleFilter(type: 'risk' | 'literacy', value: string) {
		if (type === 'risk') {
			if (selectedRiskLevels.includes(value)) {
				selectedRiskLevels = selectedRiskLevels.filter(v => v !== value);
			} else {
				selectedRiskLevels = [...selectedRiskLevels, value];
			}
		} else {
			if (selectedLiteracyLevels.includes(value)) {
				selectedLiteracyLevels = selectedLiteracyLevels.filter(v => v !== value);
			} else {
				selectedLiteracyLevels = [...selectedLiteracyLevels, value];
			}
		}
	}

	// Clear all filters
	function clearFilters() {
		selectedRiskLevels = [];
		selectedLiteracyLevels = [];
	}

	// Apply filters to all sections
	let filteredPopulair = $derived(populair.filter(filterPersona));
	let filteredVoorStudenten = $derived(voorStudenten.filter(filterPersona));
	let filteredGedeeldMetJou = $derived(gedeeldMetJou.filter(filterPersona));
</script>

<div class="min-h-screen" style="background-color: #F5D9DC;">
	<!-- Header -->
	<header class="border-b bg-white shadow-sm">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold text-gray-900">EduGenAI</h1>
					<p class="mt-1 text-sm text-gray-600">Ontdek persona's voor je studie</p>
				</div>
				<div class="flex gap-4">
					<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
						+ Nieuwe Persona
					</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Filters -->
	<div class="border-b bg-white">
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex flex-wrap items-center gap-4">
				<span class="text-sm font-medium text-gray-700">Filters:</span>

				<!-- Risk Level Filters -->
				<div class="flex items-center gap-2">
					<span class="text-xs text-gray-600">AI Act Risico:</span>
					<button
						onclick={() => toggleFilter('risk', 'low-risk')}
						class="rounded-full px-3 py-1 text-xs font-medium transition {selectedRiskLevels.includes('low-risk') ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'}"
					>
						✓ Low-Risk
					</button>
					<button
						onclick={() => toggleFilter('risk', 'high-risk')}
						class="rounded-full px-3 py-1 text-xs font-medium transition {selectedRiskLevels.includes('high-risk') ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800 hover:bg-red-200'}"
					>
						⚠️ High-Risk
					</button>
				</div>

				<div class="h-4 w-px bg-gray-300"></div>

				<!-- Literacy Level Filters -->
				<div class="flex items-center gap-2">
					<span class="text-xs text-gray-600">AI Geletterdheid:</span>
					<button
						onclick={() => toggleFilter('literacy', 'beginner')}
						class="rounded-full px-3 py-1 text-xs font-medium transition {selectedLiteracyLevels.includes('beginner') ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}"
					>
						Beginner
					</button>
					<button
						onclick={() => toggleFilter('literacy', 'intermediate')}
						class="rounded-full px-3 py-1 text-xs font-medium transition {selectedLiteracyLevels.includes('intermediate') ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}"
					>
						Gemiddeld
					</button>
					<button
						onclick={() => toggleFilter('literacy', 'advanced')}
						class="rounded-full px-3 py-1 text-xs font-medium transition {selectedLiteracyLevels.includes('advanced') ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}"
					>
						Gevorderd
					</button>
				</div>

				<!-- Clear Filters -->
				{#if selectedRiskLevels.length > 0 || selectedLiteracyLevels.length > 0}
					<button
						onclick={clearFilters}
						class="ml-auto text-xs text-gray-600 underline hover:text-gray-900"
					>
						Wis alle filters
					</button>
				{/if}
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Popular Section -->
		{#if filteredPopulair.length > 0}
			<section class="mb-12">
				<h2 class="mb-6 text-2xl font-bold text-gray-900">Populair</h2>
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each filteredPopulair as persona}
						<PersonaCard {persona} />
					{/each}
				</div>
			</section>
		{/if}

		<!-- Voor Studenten Section -->
		{#if filteredVoorStudenten.length > 0}
			<section class="mb-12">
				<h2 class="mb-6 text-2xl font-bold text-gray-900">Voor studenten</h2>
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each filteredVoorStudenten as persona}
						<PersonaCard {persona} />
					{/each}
				</div>
			</section>
		{/if}

		<!-- Gedeeld met jou Section -->
		{#if filteredGedeeldMetJou.length > 0}
			<section class="mb-12">
				<h2 class="mb-6 text-2xl font-bold text-gray-900">Gedeeld met jou</h2>
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each filteredGedeeldMetJou as persona}
						<PersonaCard {persona} />
					{/each}
				</div>
			</section>
		{/if}

		<!-- No Results Message -->
		{#if filteredPopulair.length === 0 && filteredVoorStudenten.length === 0 && filteredGedeeldMetJou.length === 0}
			<div class="flex flex-col items-center justify-center py-12 text-center">
				<div class="text-6xl mb-4">🔍</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">Geen persona's gevonden</h3>
				<p class="text-gray-600 mb-4">Probeer andere filters of wis de huidige filters.</p>
				<button
					onclick={clearFilters}
					class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
				>
					Wis alle filters
				</button>
			</div>
		{/if}
	</main>
</div>
