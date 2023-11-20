<template>
<div>
    <highcharts class="init" :options="chartOptions" ref="chart"></highcharts>
</div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: function () {
                return [
                    ['A', 20],
                    ['B', 80]
                ];
            }
        }
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    type: 'pie',
                    backgroundColor: 'rgba(0,0,0,0)',
                    margin: [-50, 0, 0, 0],
                    height: 171,
                    options3d: {
                        enabled: true,
                        alpha: 55,
                        beta: 0,
                    }
                },
                colors: [
                    '#62F4FF',
                    '#3D7FFF',
                    '#AA57E5',
                    '#FFB77E',
                    '#FF5050',
                    '#3DC5FF',
                    '#FFD700',
                    '#FF85A2',
                    '#A4DBE8',
                    '#7FFF00'
                ],
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 75,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '',
                    data: this.data
                }]

            }
        };
    }
};
</script>

<style scoped>
</style>
