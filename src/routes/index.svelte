<script lang="ts">
    import Platform from "../scripts/Platform";
    import { simbuild, id, name } from "../stores/facility";
    import { platforms } from "../stores/platforms";
    import { trains } from "../stores/trains";
    import { currentTime, startTime } from "../stores/time";
    import MainTable from "../components/MainTable.svelte";

    import PubSub from '../scripts/pub_sub/PubSub'
    import OnTimeChanged from '../scripts/pub_sub/subscriber/time/OnTimeChanged'
    import OnMinuteChanged from '../scripts/pub_sub/subscriber/time/OnMinuteChanged'

    PubSub.subscribe(new OnTimeChanged())
    PubSub.subscribe(new OnMinuteChanged())
</script>

<button class="button is-primary">some text</button><br>

<span>simbuild: {$simbuild}</span><br>
<span>id: {$id}</span><br>
<span>name: {$name}</span><br>

<MainTable></MainTable>

<!-- {#if $startTime !== null}
    <span>{$currentTime.hour}:{$currentTime.minute}:{$currentTime.second}</span><br>
{/if}

{#each $platforms as platform, i}
    <span>{i}: {platform.name}</span><br>
{/each}

{#each $trains as { id, name, stops, details }}
    <span>
        {id}: {name}
        {#if details !== undefined}
            ({details.delay}, {details.from} - {details.to})
        {/if}

    </span><br>

    {#each stops as stop}
        <span>{stop.arrival} - {stop.departure}: {stop.platform.name}</span><br>
    {/each}
    <br>
{/each} -->