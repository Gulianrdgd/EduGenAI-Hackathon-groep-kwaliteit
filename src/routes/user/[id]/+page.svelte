<script lang="ts">
	import { page } from '$app/stores';
	import PersonaCard from '$lib/components/PersonaCard.svelte';
	import usersData from '$lib/data/users.json';
	import personasData from '$lib/data/personas.json';

	const userId = $page.params.id;

	// Find user
	const user = usersData.users.find((u) => u.id === userId);

	// Get all personas
	const allPersonas = [
		...personasData.populair,
		...personasData['voor-studenten'],
		...personasData['gedeeld-met-jou']
	];

	// Get personas created by this user
	const createdPersonas = user
		? allPersonas.filter((p) => user.createdPersonas.includes(p.id))
		: [];

	// Get personas used by this user
	const usingPersonas = user ? allPersonas.filter((p) => user.usingPersonas.includes(p.id)) : [];
</script>

{#if user}
	<div class="min-h-screen" style="background-color: #F5D9DC;">
		<!-- Header -->
		<header class="border-b bg-white shadow-sm">
			<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<a href="/" class="text-sm text-blue-600 hover:text-blue-800">← Terug naar overzicht</a>
			</div>
		</header>

		<!-- User Profile Header -->
		<div class="bg-white py-12 shadow-sm">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex flex-col items-center text-center md:flex-row md:text-left">
					<div class="mb-6 text-8xl md:mb-0 md:mr-8">{user.avatar}</div>
					<div class="flex-1">
						<h1 class="text-4xl font-bold text-gray-900">{user.naam}</h1>
						<p class="mt-2 text-xl text-gray-600">{user.functie}</p>
						<p class="mt-1 text-gray-500">{user.universiteit}</p>
						<p class="mt-4 max-w-2xl text-gray-700">{user.bio}</p>

						<!-- Stats -->
						<div class="mt-6 flex flex-wrap justify-center gap-6 md:justify-start">
							<div class="text-center">
								<div class="text-2xl font-bold text-blue-600">{createdPersonas.length}</div>
								<div class="text-sm text-gray-600">Persona's gemaakt</div>
							</div>
							<div class="text-center">
								<div class="text-2xl font-bold text-blue-600">{usingPersonas.length}</div>
								<div class="text-sm text-gray-600">Persona's in gebruik</div>
							</div>
						</div>

						<!-- Chat Button -->
						<div class="mt-6">
							<a
								href="/user/{user.id}/chat"
								class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
							>
								<span>💬</span>
								<span>Chat met mij</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<!-- Created Personas -->
			{#if createdPersonas.length > 0}
				<section class="mb-12">
					<h2 class="mb-6 text-2xl font-bold text-gray-900">Gemaakte persona's</h2>
					<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{#each createdPersonas as persona}
							<PersonaCard {persona} />
						{/each}
					</div>
				</section>
			{/if}

			<!-- Using Personas -->
			{#if usingPersonas.length > 0}
				<section class="mb-12">
					<h2 class="mb-6 text-2xl font-bold text-gray-900">Persona's in gebruik</h2>
					<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{#each usingPersonas as persona}
							<PersonaCard {persona} />
						{/each}
					</div>
				</section>
			{/if}

			{#if createdPersonas.length === 0 && usingPersonas.length === 0}
				<div class="py-12 text-center">
					<p class="text-gray-600">Deze gebruiker heeft nog geen persona's gemaakt of gebruikt.</p>
				</div>
			{/if}
		</main>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-gray-900">Gebruiker niet gevonden</h1>
			<a href="/" class="mt-4 inline-block text-blue-600 hover:text-blue-800">
				← Terug naar overzicht
			</a>
		</div>
	</div>
{/if}
