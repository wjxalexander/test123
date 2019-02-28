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
            min: 0,
            max: 100,
            corNum: 2,//缩放 修正常数
        }
        this.myChart = null;

    }
    sizeCalulate = props => {
        // 此处的Magic number是由设计图的大小推算出的线性关系，
        let radius = props * 10.63 + 26;
        return radius;
    }
    getScale = ()=>{
        let {max} = this.state;
        let {clientWidth,clientHeight} = this.chart
        return [max / clientWidth, max / clientHeight]
    }
    //获取x,y轴的放大缩小比列，得到缩小后的边界(图形边界)
    getItemradiusScale = (length,axisScale)=>{
         return [length * axisScale[0], length * axisScale[1]]
    }
    getRandomPos = (bound)=>{
        let {min,max} = this.state;
        let x = Math.floor(Math.random()*(max-2*bound[0])+bound[0]);
        let y = Math.floor(Math.random()*(max-2*bound[1])+bound[1]);
        return [x,y]
    }
    //圆与圆之间是否会冲突判定
    jugePos = (bound,index,datas,symbolSize,randomPos)=>{
        let x = randomPos[0]
        let y = randomPos[1]
        let {corNum} = this.state
        let Scale = this.getScale()[0];
        if (datas.length===0){
            return randomPos;
        }else if (datas.length===1){
            //这里的corNum为缩放修正，不然还是会有小点的重叠
          let radiusSum = corNum+(datas[0].symbolSize + symbolSize)/2 * Scale
          let prePosX = datas[0].value[0]
          let prePosY = datas[0].value[1]
          let distanceX = Math.abs(x-prePosX)
          let distanceY = Math.abs(y-prePosY)
          //计算两个圆心之间的位置
          let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
          // 递归调用，找到合适的distance为止
          return distance < radiusSum ? this.jugePos(bound,index,datas,symbolSize,this.getRandomPos(bound)) : randomPos
        }else{
          let radiusSum1 = corNum+(datas[0].symbolSize + symbolSize)/2 * Scale
          let prePosX1 = datas[0].value[0]
          let prePosY1 = datas[0].value[1]
          let distanceX1 = Math.abs(x-prePosX1)
          let distanceY1 = Math.abs(y-prePosY1)
          let distance1= Math.sqrt(distanceX1 * distanceX1 + distanceY1 * distanceY1)
          //第二个距离
          let radiusSum2 = corNum+(datas[1].symbolSize + symbolSize)/2 * Scale
          let prePosX2 = datas[1].value[0]
          let prePosY2 = datas[1].value[1]
          let distanceX2 = Math.abs(x-prePosX2)
          let distanceY2 = Math.abs(y-prePosY2)
          //计算两个圆心之间的位置
          let distance2 = Math.sqrt(distanceX2 * distanceX2 + distanceY2 * distanceY2)
          return (distance1 > radiusSum1 && distance2 > radiusSum2) ? randomPos:this.jugePos(bound,index,datas,symbolSize,this.getRandomPos(bound)) 
        }
    }
    componentDidMount() {
        this.myChart = echarts.init(this.chart)
        this.draw(this.props)
        window.addEventListener("resize", this.myChart.resize);
    }
    componentWillReceiveProps(newProps) {
        this.draw(newProps);
    }
    componentWillUnmount() {
        this.myChart.dispose();
        window.addEventListener("resize", this.myChart.resize);
    }
    draw = props => {
        let { fontSize, min, max } = this.state;
        let chartScale = this.getScale()
        let plantCap = [{
            name: '无',
        }, {
            name: '军烈属',
        }, 
        {
            name: '有待对象',
        },
    ];
        var datalist = [{
            opacity: .95,
            color: '#f467ce'
        }, {
            opacity: .88,
            color: '#7aabe2'
        }, 
        {
            opacity: .84,
            color: '#ff7123'
        },
    ];
        let datas = [];
        for (var i = 0; i < plantCap.length; i++) {
            let item = plantCap[i];
            let length = item.name.length
            let itemToStyle = datalist[i];
            //获取symbol的大小
            let symbolSize = this.sizeCalulate(length);
            //获取x,y轴的放大缩小比列，得到缩小后的边界
            let randomboundary = this.getItemradiusScale(symbolSize,chartScale);
            //产生一个随机值
            let randomPos = this.getRandomPos(randomboundary,datas,i,symbolSize);
            datas.push({
                name: item.name,
                value: this.jugePos(randomboundary,i,datas,symbolSize,randomPos),//判定随机值是否合格，不合格再产生随机值
                symbolSize: symbolSize,
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
                min: min,
                show: false,
                max: max,
                nameLocation: 'middle',
                nameGap: 5
            }],
            yAxis: [{
                gridIndex: 0,
                show: false,
                min: min,
                max: max,
                nameLocation: 'middle',
                nameGap: 30
            }],
            series: [{
                type: 'scatter',
                symbol: 'circle',
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
                <div style={{ width: '400px', height: '400px' }} ref={ref => (this.chart = ref)}></div>
            </div>)
    }
}