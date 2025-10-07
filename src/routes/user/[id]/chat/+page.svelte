<script lang="ts">
	import { page } from '$app/stores';
	import usersData from '$lib/data/users.json';

	const userId = $page.params.id;

	// Find user
	const user = usersData.users.find((u) => u.id === userId);

	// Mock chat messages for wireframe
	let messages = $state([
		{
			role: 'assistant',
			content: `Hallo! Ik ben ${user?.naam}. Stel gerust je vraag en ik help je graag!`
		}
	]);

	let inputValue = $state('');

	function sendMessage() {
		if (!inputValue.trim()) return;

		// Add user message
		messages.push({ role: 'user', content: inputValue });

		// Simulate AI response (wireframe only)
		setTimeout(() => {
			messages.push({
				role: 'assistant',
				content: 'Dit is een wireframe versie. In de echte versie zou hier een response komen van de gebruiker.'
			});
		}, 500);

		inputValue = '';
	}
</script>

{#if user}
	<div class="flex h-screen flex-col bg-gray-50">
		<!-- Header -->
		<header class="border-b bg-white">
			<div class="mx-auto max-w-5xl px-4 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-4">
						<a
							href="/user/{user.id}"
							class="text-sm text-blue-600 hover:text-blue-800"
						>
							← Terug
						</a>
						<div class="flex items-center gap-3">
							<span class="text-3xl">{user.avatar}</span>
							<div>
								<h1 class="font-semibold text-gray-900">{user.naam}</h1>
								<p class="text-xs text-gray-500">{user.functie}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>

		<!-- Chat Messages -->
		<div class="flex-1 overflow-y-auto">
			<div class="mx-auto max-w-3xl px-4 py-6">
				{#each messages as message}
					<div class="mb-6 flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
						<div
							class="max-w-[80%] rounded-lg px-4 py-3 {message.role === 'user'
								? 'bg-blue-600 text-white'
								: 'bg-white shadow-sm'}"
						>
							{#if message.role === 'assistant'}
								<div class="mb-1 flex items-center gap-2">
									<span class="text-xl">{user.avatar}</span>
									<span class="text-xs font-semibold text-gray-600">{user.naam}</span>
								</div>
							{/if}
							<p class="text-sm {message.role === 'user' ? 'text-white' : 'text-gray-800'}">
								{message.content}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Input Area -->
		<div class="border-t bg-white">
			<div class="mx-auto max-w-3xl px-4 py-4">
				<form onsubmit={(e) => { e.preventDefault(); sendMessage(); }} class="flex gap-3">
					<input
						type="text"
						bind:value={inputValue}
						placeholder="Typ je bericht..."
						class="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						type="submit"
						class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
						disabled={!inputValue.trim()}
					>
						Verstuur
					</button>
				</form>
				<p class="mt-2 text-xs text-gray-500">
					⚠️ Dit is een wireframe versie. Geen echte chat-functionaliteit.
				</p>
			</div>
		</div>
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
