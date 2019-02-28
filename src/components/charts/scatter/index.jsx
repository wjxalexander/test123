import React, { Component } from "react";
import echarts from "echarts";
import style from './style.css'
export default class Line extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || null,
            fontSize: 14,
            maxRadius: 40,
        }
        this.myChart = null;

    }
    sizeCalulate = props => {
        // 此处的Magic number是由设计图的大小推算出的线性关系，
        let radius = props * 10.63 + 26;
        return radius;
    }
    getPosBoundary = props => {
        let { widthBoundary, heightBoundary } = this.getBoundary()
        let { maxRadius } = this.state
        return ({
            safeXboundary: [maxRadius, widthBoundary - maxRadius],
            safeYboundary: [maxRadius, heightBoundary - maxRadius]
        })
    }
    getBoundary = () => {
        let widthBoundary = this.chart.clientWidth;
        let heightBoundary = this.chart.clientHeight;
        return (
            {
                widthBoundary: widthBoundary,
                heightBoundary: heightBoundary
            })
    }
    getRandomPosition = (props) => {
        console.log(props)
        let { safeXboundary, safeYboundary } = props
        let x = Math.random() * (safeXboundary[1] - safeXboundary[0]) + safeXboundary[0];
        let y = Math.random() * (safeYboundary[1] - safeYboundary[0]) + safeYboundary[0];
        console.log([x,y])
        return([x,y])
    }

    componentDidMount() {
        this.myChart = echarts.init(this.chart)
        this.draw(this.props)
        window.addEventListener("resize", this.myChart.resize);
        this.getBoundary()
        console.log(this.getPosBoundary())

    }
    componentWillReceiveProps(newProps) {
        this.draw(newProps);
    }
    componentWillUnmount() {
        this.myChart.dispose();
        window.addEventListener("resize", this.myChart.resize);
    }
    draw = props => {
        let { fontSize } = this.state
        let plantCap = [{
            name: '无',
        }, {
            name: '军烈属',
        }, {
            name: '有待对象',
        },];
        var datalist = [{
            symbolSize: 120,
            opacity: .95,
            color: '#f467ce'
        }, {
            symbolSize: 95,
            opacity: .88,
            color: '#7aabe2'
        }, {
            symbolSize: 90,
            opacity: .84,
            color: '#ff7123'
        },];
        var datas = [];
        for (var i = 0; i < plantCap.length; i++) {
            let item = plantCap[i];
            let length = item.name.length
            let itemToStyle = datalist[i];
            datas.push({
                name: item.name,
                value: [40, 40],
                symbolSize: this.sizeCalulate(length),
                label: {
                    normal: {
                        textStyle: {
                            fontSize: fontSize
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: itemToStyle.color,
                        opacity: itemToStyle.opacity
                    }
                },
            })
        }
        const option = {
            grid: {
                show: false,
                top: 10,
                bottom: 10
            },
            xAxis: [{
                gridIndex: 0,
                type: 'value',
                show: false,
                min: 0,
                max: 100,
                nameLocation: 'middle',
                nameGap: 5
            }],
            yAxis: [{
                gridIndex: 0,
                min: 0,
                show: false,
                max: 100,
                nameLocation: 'middle',
                nameGap: 30
            }],
            series: [{
                type: 'scatter',
                symbol: 'circle',
                symbolSize: 120,
                label: {
                    normal: {
                        show: true,
                        formatter: '{b}',
                        color: '#fff',
                        textStyle: {
                            fontSize: '40'
                        }
                    },
                },
                itemStyle: {
                    normal: {
                        color: '#00acea'
                    }
                },
                data: datas
            }]
        }
        this.myChart.setOption(option)

    }
    render() {
        return (
            <div className='hello'>
                <div style={{ width: '400px', height: '300px' }} ref={ref => (this.chart = ref)}></div>
            </div>)
    }
}