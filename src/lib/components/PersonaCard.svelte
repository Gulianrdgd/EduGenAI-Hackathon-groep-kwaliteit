<script lang="ts">
	import usersData from '$lib/data/users.json';
	import ReportModal from './ReportModal.svelte';

	interface Props {
		persona: {
			id: string;
			titel: string;
			beschrijving: string;
			categorie: string;
			uitvoeringen: string;
			ratingStudenten: number;
			ratingDocenten: number;
			image: string;
			gedeeldDoor?: string;
			creatorId?: string;
		};
	}

	let { persona }: Props = $props();

	// Find creator
	const creator = persona.creatorId
		? usersData.users.find((u) => u.id === persona.creatorId)
		: null;

	// Report modal state
	let showReportModal = $state(false);
</script>

<a
	href="/persona/{persona.id}"
	class="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
>
	<div class="mb-4 flex items-start justify-between">
		<div class="text-4xl">{persona.image}</div>
		<div class="flex items-start gap-2">
			{#if persona.gedeeldDoor}
				<span class="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">
					Gedeeld door {persona.gedeeldDoor}
				</span>
			{/if}
			<button
				class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
				onclick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					showReportModal = true;
				}}
				title="Rapporteer deze persona"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
				</svg>
			</button>
		</div>
	</div>

	<h3 class="mb-2 text-lg font-semibold text-gray-900">{persona.titel}</h3>
	<p class="mb-2 text-sm text-gray-600">{persona.beschrijving}</p>

	{#if creator}
		<a
			href="/user/{creator.id}"
			class="mb-3 inline-flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600"
			onclick={(e) => e.stopPropagation()}
		>
			<span>{creator.avatar}</span>
			<span>Door {creator.naam}</span>
		</a>
	{/if}

	<div class="flex items-center gap-4 text-xs text-gray-500">
		<div class="flex items-center gap-1">
			<span>▶</span>
			<span>{persona.uitvoeringen}</span>
		</div>
		<div class="flex items-center gap-1">
			<span>👨‍🎓 {persona.ratingStudenten}/5</span>
		</div>
		<div class="flex items-center gap-1">
			<span>👨‍🏫 {persona.ratingDocenten}/5</span>
		</div>
	</div>

	<div class="mt-4">
		<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">{persona.categorie}</span>
	</div>
</a>

<ReportModal
	personaTitel={persona.titel}
	isOpen={showReportModal}
	onClose={() => (showReportModal = false)}
/>
