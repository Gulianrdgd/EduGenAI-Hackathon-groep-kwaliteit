<script lang="ts">
	interface Review {
		naam: string;
		rol: string;
		rating: number;
		datum: string;
		comment: string;
	}

	interface Risico {
		risico: string;
		beschrijving: string;
		ernst: 'low' | 'medium' | 'high';
	}

	interface Props {
		persona: {
			id: string;
			titel: string;
			detailBeschrijving: {
				intro: string;
				watKanJe: string[];
				voorWie: string;
				notitie: string;
				overwegingen: string[];
			};
			reviews?: Review[];
			risicos?: {
				capabilities: Risico[];
				creator: Risico[];
				aiGenerated: Risico[];
			};
		};
	}

	let { persona }: Props = $props();

	function getSeverityColor(ernst: string): string {
		switch (ernst) {
			case 'high':
				return 'bg-red-100 text-red-800 border-red-200';
			case 'medium':
				return 'bg-orange-100 text-orange-800 border-orange-200';
			case 'low':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	}

	function getSeverityLabel(ernst: string): string {
		switch (ernst) {
			case 'high':
				return 'Hoog risico';
			case 'medium':
				return 'Gemiddeld risico';
			case 'low':
				return 'Laag risico';
			default:
				return 'Onbekend';
		}
	}

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' });
	}

	function renderStars(rating: number): string {
		return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
	}

	let activeTab = $state('beschrijving');

	const tabs = [
		{ id: 'beschrijving', label: 'Beschrijving' },
		{ id: 'remixes', label: 'Remixes' },
		{ id: 'reviews', label: 'Reviews' }
	];
</script>

<div class="rounded-lg bg-white shadow">
	<!-- Tab Headers -->
	<div class="border-b">
		<nav class="flex gap-8 px-6" aria-label="Tabs">
			{#each tabs as tab}
				<button
					class="border-b-2 py-4 text-sm font-medium transition {activeTab === tab.id
						? 'border-blue-600 text-blue-600'
						: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
					onclick={() => (activeTab = tab.id)}
				>
					{tab.label}
				</button>
			{/each}
		</nav>
	</div>

	<!-- Tab Content -->
	<div class="p-6">
		{#if activeTab === 'beschrijving'}
			<div class="prose max-w-none">
				<!-- Intro -->
				<p class="text-lg text-gray-700">{persona.detailBeschrijving.intro}</p>

				<!-- Wat kan je -->
				<div class="mt-6">
					<h3 class="text-xl font-semibold text-gray-900">Wat kan je ermee?</h3>
					<ul class="mt-3 space-y-2">
						{#each persona.detailBeschrijving.watKanJe as item}
							<li class="flex items-start gap-2">
								<span class="text-green-600">✓</span>
								<span class="text-gray-700">{item}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Voor wie -->
				<div class="mt-6">
					<h3 class="text-xl font-semibold text-gray-900">Voor wie?</h3>
					<p class="mt-2 text-gray-700">{persona.detailBeschrijving.voorWie}</p>
				</div>

				<!-- Notitie -->
				<div class="mt-6 rounded-lg bg-amber-50 p-4">
					<h4 class="font-semibold text-amber-900">Let op</h4>
					<p class="mt-1 text-sm text-amber-800">{persona.detailBeschrijving.notitie}</p>
				</div>

				<!-- Overwegingen -->
				<div class="mt-6">
					<h3 class="text-xl font-semibold text-gray-900">Overwegingen</h3>
					<ul class="mt-3 space-y-2">
						{#each persona.detailBeschrijving.overwegingen as overweging}
							<li class="flex items-start gap-2">
								<span class="text-gray-400">•</span>
								<span class="text-gray-700">{overweging}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Risico's -->
				{#if persona.risicos}
					<div class="mt-8">
						<h3 class="text-xl font-semibold text-gray-900">Risico's</h3>

						<!-- Capability Risks -->
						{#if persona.risicos.capabilities && persona.risicos.capabilities.length > 0}
							<div class="mt-4">
								<h4 class="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
									Capability risico's
								</h4>
								<div class="space-y-3">
									{#each persona.risicos.capabilities as risico}
										<div class="rounded-lg border p-4 {getSeverityColor(risico.ernst)}">
											<div class="flex items-start justify-between">
												<div class="flex-1">
													<div class="flex items-center gap-2">
														<span class="font-semibold">{risico.risico}</span>
														<span class="rounded-full bg-white px-2 py-0.5 text-xs font-medium">
															{getSeverityLabel(risico.ernst)}
														</span>
													</div>
													<p class="mt-1 text-sm">{risico.beschrijving}</p>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}

						<!-- Creator Risks -->
						{#if persona.risicos.creator && persona.risicos.creator.length > 0}
							<div class="mt-6">
								<h4 class="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
									Door maker gerapporteerde risico's
								</h4>
								<div class="space-y-3">
									{#each persona.risicos.creator as risico}
										<div class="rounded-lg border p-4 {getSeverityColor(risico.ernst)}">
											<div class="flex items-start justify-between">
												<div class="flex-1">
													<div class="flex items-center gap-2">
														<span class="font-semibold">{risico.risico}</span>
														<span class="rounded-full bg-white px-2 py-0.5 text-xs font-medium">
															{getSeverityLabel(risico.ernst)}
														</span>
													</div>
													<p class="mt-1 text-sm">{risico.beschrijving}</p>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}

						<!-- AI Generated Risks -->
						{#if persona.risicos.aiGenerated && persona.risicos.aiGenerated.length > 0}
							<div class="mt-6">
								<h4 class="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
									AI gedetecteerde risico's
								</h4>
								<div class="space-y-3">
									{#each persona.risicos.aiGenerated as risico}
										<div class="rounded-lg border p-4 {getSeverityColor(risico.ernst)}">
											<div class="flex items-start justify-between">
												<div class="flex-1">
													<div class="flex items-center gap-2">
														<span class="font-semibold">{risico.risico}</span>
														<span class="rounded-full bg-white px-2 py-0.5 text-xs font-medium">
															{getSeverityLabel(risico.ernst)}
														</span>
													</div>
													<p class="mt-1 text-sm">{risico.beschrijving}</p>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		{:else if activeTab === 'remixes'}
			<div class="py-12 text-center">
				<div class="text-6xl">🎨</div>
				<h3 class="mt-4 text-lg font-medium text-gray-900">Nog geen remixes</h3>
				<p class="mt-2 text-sm text-gray-600">
					Remixes van deze persona verschijnen hier wanneer ze zijn gemaakt.
				</p>
			</div>
		{:else if activeTab === 'reviews'}
			{#if persona.reviews && persona.reviews.length > 0}
				<div class="space-y-6">
					{#each persona.reviews as review}
						<div class="rounded-lg border border-gray-200 p-4">
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<div class="flex items-center gap-3">
										<h4 class="font-semibold text-gray-900">{review.naam}</h4>
										<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
											{review.rol}
										</span>
									</div>
									<div class="mt-1 flex items-center gap-2">
										<span class="text-yellow-500">{renderStars(review.rating)}</span>
										<span class="text-xs text-gray-500">{formatDate(review.datum)}</span>
									</div>
								</div>
							</div>
							<p class="mt-3 text-sm text-gray-700">{review.comment}</p>
						</div>
					{/each}
				</div>
			{:else}
				<div class="py-12 text-center">
					<div class="text-6xl">⭐</div>
					<h3 class="mt-4 text-lg font-medium text-gray-900">Nog geen reviews</h3>
					<p class="mt-2 text-sm text-gray-600">
						Reviews van studenten en docenten verschijnen hier.
					</p>
				</div>
			{/if}
		{/if}
	</div>
</div>
