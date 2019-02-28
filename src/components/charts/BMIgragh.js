import React from "react";
import ReactDOM from "react-dom";
import echarts from "echarts";
import { yellow } from "ansi-colors";
class BarView extends React.Component {
  constructor(props){
      super(props)
      this.state={
          standard: 21.7
      }
  }
  getBase = ()=> {
    let base = []
    for(let i=0;i<101;i++){
        if(i%2===0){
          base.push(i)
        }
    }
    return base
  }
  getBMI = (base)=>{
    let standard = this.state.standard
    const ret = base.map(val=>100*Math.sqrt(val/standard))
    return ret;
  }
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".smoothchart"));
    // 绘制图表
    var options = {
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
        xAxis: [{
            data: this.getBase(),
            boundaryGap: false,
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
           
        },{
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

        }],
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
                data: [['70',170]],
                itemStyle:{
                    normal:{
                        color:'#0EC9EA'
                    }
                }
            },
            {
                name: '平均值',
                type: 'scatter',
                data: [['60',153]],
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
            {
            name: 'BMI',
            data: this.getBMI(this.getBase()),
            type: 'line',
            smooth: true,
            showSymbol: false,
            stack:'1',
            tooltip:{
                trigger:'none'
            },
            lineStyle:{
                normal:{
                    color:"#C8B933",
                }
            },

            markPoint: {
                symbol:'rect',
                symbolSize:[20,10],
                symbolOffset:['100%','-100%'],
                label: {
                    normal: {
                        show: true,
                        align: 'center',
                        color: '#C8B933',
                        fontWeight: 100,
                        formatter: '{b}',
                        fontSize: 20
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
        {
            name: 'BMI-large',
            data: this.getBMI(this.getBase()).slice(0,40),
            type: 'line',
            smooth: true,
            showSymbol: false,
            tooltip:{
                trigger:'none'
            },
            lineStyle:{
                normal:{
                    color:"#C8B933",
                    opacity: 0.4,
                    width:10
                }
            }
        },
        
        
    ]
    };
    myChart.setOption(options);

  }
    // 使用刚指定的配置项和数据显示图表。
    render() {
        return (<div className="smoothchart graph">{this.myChart}</div>);
      }
}
export default BarView;
