<script>
    export let yValues;
    export let xValues;

    import { afterUpdate, onMount } from 'svelte';
    let canvas;
    let myChart;
    import Chart from 'chart.js/auto';
    onMount(()=> {
        console.log(xValues,yValues)
        const ctx = canvas.getContext('2d');
        const x_values=[];
        const y_values=[];
        for(let i of xValues){
            x_values.push(i.name);
            y_values.push(yValues[i.id]||0.3);
        }
        console.log(x_values,y_values);
        const barColors = ["#E53945", "#EDAD49","#3376BD","#00798C","#52499C"];
        const config={
            type: "bar",
            data: {
                labels: x_values,
                datasets: [{backgroundColor: barColors,data: y_values}]
            },
            
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    text: "Live Vote Count"
                }
            },
        }
        // Initialize chart using default config set
        myChart = new Chart(ctx, config);
    });

    afterUpdate(()=>{
        console.log("afet");
        const x_values=[];
        const y_values=[];
        for(let i of xValues){
            x_values.push(i.name);
            //y_values.push(yValues[i.id]||Math.random() * (5 - 2) + 2);
            y_values.push(yValues[i.id]||0);
        }
        myChart.data.datasets[0].data=y_values;
        myChart.update();
    })
    

</script>
<div class="child">
<canvas bind:this={canvas}  style="width:100%;"></canvas>
</div>

<style>
.child {
  width: 50vw; 
  margin-left: calc((-50vw + 100%) / 2);
  margin-right: calc((-50vw + 100%) / 2);
  text-align: center;
}

</style>