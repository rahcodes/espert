<script lang="ts">
	import * as tf from '@tensorflow/tfjs';
	import { onMount } from 'svelte';
	import {
		normalizeSpeed,
		normalizeViscosity,
		normalizeFlowrate,
		denormalizeHead
	} from '$lib/norms';

	let speed = $state<number>(2400);
	let viscosity = $state<number>(107);
	let flowrate = $state<number>(1976);

	let model = $state<tf.GraphModel>();

	let predictedHead = $derived.by(async () => {
		if (model === undefined) return -1;

		const speedNorm = normalizeSpeed(speed);
		const visNorm = normalizeViscosity(viscosity);
		const flowNorm = normalizeFlowrate(flowrate);

		const inputTensor = tf.tensor([[speedNorm, visNorm, flowNorm]]);

		const predTensor = await model.predictAsync(inputTensor);
		const predArray = await predTensor.array();

		return denormalizeHead(predArray[0]);
	});

	onMount(async () => {
		model = await tf.loadGraphModel('models/tfjs_mlp/model.json');
	});

	async function predictNewHead() {
		const speedNorm = normalizeSpeed(speed);
		const visNorm = normalizeViscosity(viscosity);
		const flowNorm = normalizeFlowrate(flowrate);

		const inputTensor = tf.tensor([[speedNorm, visNorm, flowNorm]]);

		const predTensor = await model!.predictAsync(inputTensor);
		const predArray = await predTensor.array();

		return denormalizeHead(predArray[0]);
	}
</script>

<svelte:head>
	<title>ESPert - Predict ESP head with AI.</title>
	<meta name="description" content="ESPert is an experimental AI model to predict head of ESP TE2700">
</svelte:head>

<div class="w-full flex justify-center">
	<main class="w-full max-w-2xl mt-10 px-4">
		<h2 class="text-3xl">Head Prediction for ESP</h2>
		<p class="text-sm text-gray-500">Predict head of ESP TE2700 using AI.</p>

		<div class="flex flex-col mt-10 gap-8">
			<div class="flex flex-col gap-2">
				<label for="speed">Motor Speed (rpm)</label>
				<div class="flex w-full items-center">
					<input
						class="flex-1 slider"
						type="range"
						name="speed"
						id="speed"
						min="1800"
						max="3500"
						bind:value={speed}
					/>
					<input
						class="border w-20 h-12 text-center rounded-lg ml-4 outline-none focus:border-2 focus:border-black"
						type="number"
						name="speed_n"
						id="speed_n"
						min="1800"
						max="3500"
						bind:value={speed}
					/>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<label for="viscosity">Viscosity (cP)</label>
				<div class="flex w-full items-center">
					<input
						class="flex-1 slider"
						type="range"
						name="viscosity"
						id="viscosity"
						min="25"
						max="520"
						bind:value={viscosity}
					/>
					<input
						class="border w-20 h-12 text-center rounded-lg ml-4 outline-none focus:border-2 focus:border-black"
						type="number"
						name="viscosity_n"
						id="viscosity_n"
						min="25"
						max="520"
						bind:value={viscosity}
					/>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<label for="viscosity">Flowrate (bpd)</label>
				<div class="flex w-full items-center">
					<input
						class="flex-1 slider"
						type="range"
						name="flowrate"
						id="flowrate"
						min="593"
						max="3625"
						bind:value={flowrate}
					/>
					<input
						class="border w-20 h-12 text-center rounded-lg ml-4 outline-none focus:border-2 focus:border-black"
						type="number"
						name="flowrate_n"
						id="flowrate_n"
						min="593"
						max="3625"
						bind:value={flowrate}
					/>
				</div>
			</div>
		</div>

		<div class="mt-14 mb-16 text-center flex flex-col gap-4">
			<p class="text-gray-500">Predicted Head</p>
			{#await predictedHead}
			<p class="text-5xl">--</p>
			{:then result}
				<p class="text-5xl">{result.toFixed(2)} ft</p>
			{/await}
			<p class="text-gray-500 text-sm">This is experimental. Do not use in production.</p>
		</div>
	</main>
</div>
