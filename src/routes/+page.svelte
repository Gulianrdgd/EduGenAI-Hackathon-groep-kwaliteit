<script lang="ts">
	import PersonaCard from '$lib/components/PersonaCard.svelte';
	import personasData from '$lib/data/personas.json';

	const { populair, 'voor-studenten': voorStudenten, 'gedeeld-met-jou': gedeeldMetJou } = personasData;
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

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Popular Section -->
		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Populair</h2>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each populair as persona}
					<PersonaCard {persona} />
				{/each}
			</div>
		</section>

		<!-- Voor Studenten Section -->
		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Voor studenten</h2>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each voorStudenten as persona}
					<PersonaCard {persona} />
				{/each}
			</div>
		</section>

		<!-- Gedeeld met jou Section -->
		<section class="mb-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Gedeeld met jou</h2>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each gedeeldMetJou as persona}
					<PersonaCard {persona} />
				{/each}
			</div>
		</section>
	</main>
</div>
