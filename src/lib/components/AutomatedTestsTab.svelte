<script lang="ts">
	import AutomatedTestsTab from './AutomatedTestsTab.svelte';

	const myPersonaTests = {
		examples: [
			{
				in: 'Wanneer ben je geboren?',
				expected_out: { contains: '1769' },
				runs: 100,
				correct: 99
			},
			{
				in: 'Hoe vaak was je keizer?',
				expected_out: { similar_to: 'twice' },
				runs: 100,
				correct: 90
			}
		]
	};
</script>

<AutomatedTestsTab {tests}=myPersonaTests />