<script lang="ts">
	import { page } from '$app/stores';
	import PersonaTabs from '$lib/components/PersonaTabs.svelte';
	import ReportModal from '$lib/components/ReportModal.svelte';
	import AIActRequirementsModal from '$lib/components/AIActRequirementsModal.svelte';
	import personasData from '$lib/data/personas.json';
	import usersData from '$lib/data/users.json';

	const id = $page.params.id;

	// Find persona across all categories
	const allPersonas = [
		...personasData.populair,
		...personasData['voor-studenten'],
		...personasData['gedeeld-met-jou']
	];

	const persona = allPersonas.find((p) => p.id === id);

	// Find creator
	const creator =
		persona && persona.creatorId
			? usersData.users.find((u) => u.id === persona.creatorId)
			: null;

	// Report modal state
	let showReportModal = $state(false);

	// AI Act Requirements modal state
	let showRequirementsModal = $state(false);
	let requirementsAccepted = $state(false);

	if (!persona) {
		// Handle persona not found
		console.error('Persona not found:', id);
	}

	function handleStartChat() {
		if (persona?.aiActClassification?.riskLevel === 'high-risk' && !requirementsAccepted) {
			showRequirementsModal = true;
		} else {
			window.location.href = `/persona/${persona?.id}/chat`;
		}
	}
</script>

{#if persona}
	<div class="min-h-screen" style="background-color: #F5D9DC;">
		<!-- Header -->
		<header class="border-b bg-white shadow-sm">
			<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<div class="flex items-center justify-between">
					<div>
						<a href="/" class="text-sm text-blue-600 hover:text-blue-800">← Terug naar overzicht</a>
						<h1 class="mt-2 text-3xl font-bold text-gray-900">EduGenAI</h1>
					</div>
				</div>
			</div>
		</header>

		<!-- AI Act Warning Banner -->
		{#if persona.aiActClassification?.riskLevel === 'high-risk'}
			<div class="border-b border-red-200 bg-red-50">
				<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
					<div class="flex items-start gap-3">
						<div class="text-2xl">⚠️</div>
						<div class="flex-1">
							<h3 class="font-semibold text-red-900">High-Risk AI Systeem (EU AI Act)</h3>
							<p class="mt-1 text-sm text-red-800">
								{persona.aiActClassification.reasoning}
							</p>
							<button
								onclick={() => (showRequirementsModal = true)}
								class="mt-2 text-sm font-medium text-red-900 underline hover:text-red-700"
							>
								Bekijk vereisten →
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Persona Header -->
		<div class="bg-white py-8 shadow-sm">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex items-start gap-6">
					<div class="text-6xl">{persona.image}</div>
					<div class="flex-1">
						<h2 class="text-3xl font-bold text-gray-900">{persona.titel}</h2>
						<p class="mt-2 text-gray-600">{persona.beschrijving}</p>

						<!-- Creator -->
						{#if creator}
							<a
								href="/user/{creator.id}"
								class="mt-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
							>
								<span class="text-xl">{creator.avatar}</span>
								<span>Gemaakt door {creator.naam}</span>
							</a>
						{/if}

						<!-- Stats -->
						<div class="mt-4 flex items-center gap-6 text-sm text-gray-600">
							<div class="flex items-center gap-2">
								<span class="font-semibold">▶ {persona.uitvoeringen}</span>
								<span>uitvoeringen</span>
							</div>
							<div class="flex items-center gap-2">
								<span class="font-semibold">👨‍🎓 {persona.ratingStudenten}/5</span>
								<span>studenten</span>
							</div>
							<div class="flex items-center gap-2">
								<span class="font-semibold">👨‍🏫 {persona.ratingDocenten}/5</span>
								<span>onderwijsprofessionals</span>
							</div>
						</div>

						<!-- CTA Buttons -->
						<div class="mt-6 flex items-center gap-3">
							<button
								onclick={handleStartChat}
								class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
							>
								Start gesprek
							</button>
							<button
								class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
								onclick={() => (showReportModal = true)}
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
								</svg>
								<span>Rapporteer</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Tabs Content -->
		<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<PersonaTabs {persona} />
		</div>

		<!-- Report Modal -->
		<ReportModal
			personaTitel={persona.titel}
			isOpen={showReportModal}
			onClose={() => (showReportModal = false)}
		/>

		<!-- AI Act Requirements Modal -->
		{#if persona.aiActClassification?.riskLevel === 'high-risk'}
			<AIActRequirementsModal
				personaTitel={persona.titel}
				aiActClassification={persona.aiActClassification}
				isOpen={showRequirementsModal}
				onClose={() => (showRequirementsModal = false)}
				onAccept={() => (requirementsAccepted = true)}
			/>
		{/if}
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-gray-900">Persona niet gevonden</h1>
			<a href="/" class="mt-4 inline-block text-blue-600 hover:text-blue-800">
				← Terug naar overzicht
			</a>
		</div>
	</div>
{/if}
