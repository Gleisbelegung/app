<script lang="ts">
    import { platforms } from "../stores/platforms";
    import { trains } from "../stores/trains";
    import { currentTime, startTime } from "../stores/time";
    import { Duration, DateTime } from 'luxon';
    import IdFormatter from '../scripts/common/IdFormatter';
    import PubSub from '../scripts/pub_sub/PubSub';
    import OnMinuteChanged from '../scripts/pub_sub//subscriber/time/OnMinuteChanged';

    var timePerRow: DateTime;
    $: timePerRow = $startTime;

    function getTime() {
        timePerRow = timePerRow.plus(Duration.fromMillis(1000 * 60))

        return timePerRow.toFormat("HH:mm")
    }

    PubSub.subscribe(new OnMinuteChanged((data) => {
        console.log("minute changed " + data.toMillis())
    }))
</script>

<table class="table is-striped is-hoverable is-bordered">
    <thead>
        <th></th>
        {#each $platforms as platform}
            <th>
                <span>{platform.name}</span>
            </th>
        {/each}
    </thead>
    <tbody>
        {#if $startTime !== null && timePerRow !== null}
            {#each {length: 60} as _, i}
                <!-- {timePerRow = timePerRow.plus(Duration.fromMillis(1000 * 60))} -->
                <tr>
                    <td>
                        {getTime()}
                    </td>
                    {#each $platforms as platform}
                        <td>
                            <span id="{IdFormatter.timePlatformId(timePerRow, platform)}"></span>
                        </td>
                    {/each}
                </tr>
            {/each}
        {/if}
    </tbody>
</table>