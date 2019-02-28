import React, { Component } from "react";
import echarts from "echarts";

export default class Line extends Component{
    constructor(props){
        super(props);
        this.state={
            data: this.props.data || null,
            standardBMI: 21.2,
            weight:null,
            BMIheight: null,
        }
        this.myChart = null;

    }
    // 构造体重数组
    getWeight = ()=>{
        if(this.state.weight) return;
        let base = []
        for(let i= 0;i<101;i++){
                base.push(i)
        }
        this.setState({weight:base})
    }
    //构造标准身高
    getBMI = (base)=>{
        if(!base) return; 
        let {standardBMI} = this.state;
        const ret = base.map(val=>100*Math.sqrt(val/standardBMI));
        return ret;
      }
    //转换散点数据
    transToString = (props) =>{
        let ret = props.slice();
        ret[0] = ret[0].toString();
        return ret;
    }

      componentWillMount(){
        this.getWeight();
      }

    componentDidMount() {
        this.getBMI(this.state.weight)
        this.myChart = echarts.init(this.chart)
        this.draw(this.props)
        window.addEventListener("resize",this.myChart.resize);
    }
    componentWillReceiveProps(newProps){
        this.draw(newProps);
    }
    componentWillUnmount(){
        this.myChart.dispose();
        window.addEventListener("resize",this.myChart.resize);
    }
    draw = props=>{
        const {weight} = this.state
        const {average,person} = this.state.data
        const option ={
            tooltip:{
                trigger:'item',
                show: true,
                formatter: function (params) {
                    if (params.value.length > 1) {
                        return (`
                        身高：${params.value[1]}cm <br/> 体重：${params.value[0]}kg
                        `)
                    }
                    else {
                        return params.seriesName + ' :<br/>'
                           + params.name + ' : '
                           + params.value + 'kg ';
                    }
                },
                backgroundColor: '#033439',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: 'transparent',
                        color:'transparent'
                     }
                }
              },
              grid:{
                right: '150',
                containLabel: true
            },
              legend: {
                data: ['平均值','身体指标'],
                left: 'right',
                orient: "vertical",
                left: "right",
                align: "left",
                top: "10%",
                textStyle:{
                    color:'white'
                }
    
            },
            xAxis: [
                {
                    data: this.state.weight,
                    boundaryGap: false,
                    
                },
                ,{
                type: 'value',
                boundaryGap: false,
                
            },
            {
                data: [0,25,50,75,100],
                gridIndex: 0,
                name: '体重（kg）',
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                },
                position:'bottom',
                boundaryGap: false,
                axisPointer:{
                    show:false,
                },
            }
        ],
            yAxis: {
                type: 'value',
                name: '身高（cm）',
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                },
                splitLine: {
                    show: false
                  },
            },
            series: [
                {
                    name: '身体指标',
                    type: 'scatter',    
                    data: [person],
                    itemStyle:{
                        normal:{
                            color:'#0EC9EA'
                        },
                        emphasis:{
                            borderColor: 'rgba(14,201,234,0.5)',
                            borderWidth: 5
                        }
                    }
                },
                {
                    name: '平均值',
                    type: 'scatter',
                    data: [average],
                    itemStyle:{
                        normal:{
                            color:'#FF1C57'
                        },
                        emphasis:{
                            borderColor: 'rgba(255,28,87,0.5)',
                            borderWidth: 5
                        }
                    },
                   
                },
                //细的BMI曲线
                {
                name: 'BMI',
                data: this.getBMI(weight),
                type: 'line',
                smooth: true,
                showSymbol: false,
                stack:'1',
                tooltip:{
                    trigger:'none'
                },
                lineStyle:{
                    normal:{
                        color:"#F0DC34",
                    }
                },
                // bmi标记
                markPoint: {
                    symbol:'rect',
                    symbolSize:[20,10],
                    symbolOffset:['100%','-100%'],
                    label: {
                        normal: {
                            show: true,
                            align: 'center',
                            color: '#F0DC34',
                            fontWeight: 'regular',
                            formatter: '{b}',
                            fontSize: 14
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'transparent'
                        }
                    },
                    data: [{
                        name: 'BMI',
                        coord: ['100', 210]
                    }]
                }
            },
            // 粗的bmi线
            {
                name: 'BMI-large',
                data: this.getBMI(weight).slice(0,95),
                type: 'line',
                smooth: true,
                showSymbol: false,
                tooltip:{
                    trigger:'none'
                },
                lineStyle:{
                    normal:{
                        color:"#F0DC34",
                        opacity: 0.4,
                        width:10
                    }
                }
            },
            
            
        ]
        }
        this.myChart.setOption(option)
    }
    render(){
        return (<div style={{width: '400px',height:'300px'}} ref={ref=>(this.chart=ref)}></div>)
    }
}