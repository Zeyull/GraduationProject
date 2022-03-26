import { getMonthRecent } from '@/utils/date';
import Konva from 'konva';
import { Stage, Layer, Rect, Text } from 'react-konva';
import styles from './index.less';

export default function CalendarCard() {
  const { year, date, monthNames, monthDays } = getMonthRecent(12);
  const colorMessageArr = [
    'rgb(201, 209, 217)',
    '#AFF0B5',
    '#7BE188',
    '#4CD263',
    '#008026',
  ];

  let xIndex = 30; // rect x坐标
  let yIndex = 5; // rect y坐标
  let flag = 0; // 过7换列
  const rectWidth = 14;
  const rectHeight = 14;
  const interval = 5; // 间隔

  let layer: any;
  let tooltip = new Konva.Label({
    x: 0,
    y: 0,
    name: 'tooltip',
  });
  tooltip.add(
    new Konva.Tag({
      fill: '#000',
      pointerDirection: 'down',
      pointerWidth: 5,
      pointerHeight: 5,
      lineJoin: 'round',
    }),
  );
  tooltip.add(
    new Konva.Text({
      text: '',
      fontFamily: 'PingFang-SC, Helvetica, Tahoma, Arial',
      fontSize: 12,
      padding: 5,
      fill: 'white',
    }),
  );
  const onMouseEnter = (e: any) => {
    if (Object.getPrototypeOf(e.target).className === 'Rect') {
      e.target.setAttrs({ scale: { x: 1.1, y: 1.1 } });
      // 设置tooltip
      let shapes = layer.find('.tooltip')[0];
      const attrs = e.target.attrs;
      let x = attrs.x + Math.floor(rectWidth / 2);
      let y = attrs.y;
      const tooltipText = attrs.name;
      const id = e.target._id;
      let pointerDirection = 'down';
      if (id < 50) {
        pointerDirection = 'left';
        y += Math.floor(rectWidth / 2);
      }
      if (id > 350) {
        pointerDirection = 'right';
        y += Math.floor(rectWidth / 2);
      }
      shapes.setAttrs({ x, y });
      shapes.children[0].setAttrs({ pointerDirection });
      shapes.children[1].setAttrs({ text: tooltipText });
    }
  };

  const onMouseLeave = (e: any) => {
    if (Object.getPrototypeOf(e.target).className === 'Rect') {
      e.target.setAttrs({ scale: { x: 1, y: 1 } });
      // 重制tooltip
      let shapes = layer.find('.tooltip')[0];
      shapes.setAttrs({ x: 0, y: 0 });
      shapes.children[0].setAttrs({ pointerDirection: 'down' });
      shapes.children[1].setAttrs({ text: '' });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.calendar}>
        <Stage width={1030} height={170}>
          <Layer
            ref={(ref) => {
              layer = ref;
              ref?.add(tooltip);
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Text text="Mon" x={0} y={(rectWidth + interval) * 2 + yIndex} />
            <Text text="Wed" x={0} y={(rectWidth + interval) * 4 + yIndex} />
            <Text text="Fri" x={0} y={(rectWidth + interval) * 6 + yIndex} />
            {monthDays.map((val, index) => {
              let num = index === monthDays.length - 1 ? date : val;
              let res = [];
              res.push(
                <Text
                  key={monthNames[index]}
                  text={monthNames[index]}
                  x={xIndex}
                  y={0}
                />,
              );
              for (let i = 0; i < num; i++) {
                yIndex += rectWidth + interval;
                res.push(
                  <ColoredRect
                    key={i}
                    x={xIndex}
                    y={yIndex}
                    color={i % index === 0 ? 'rgb(201, 209, 217)' : 'green'}
                    width={rectWidth}
                    height={rectHeight}
                    name={`x Submit on ${monthNames[index]} ${i + 1}, ${
                      year[index]
                    }`}
                  />,
                );
                flag++;
                if (flag === 7) {
                  yIndex = 5;
                  xIndex += rectWidth + interval;
                  flag = 0;
                }
              }
              return res;
            })}
          </Layer>
        </Stage>
      </div>
      <div className={styles.colorMessage}>
        <p>Less</p>
        <Stage width={(rectHeight + interval) * 6} height={rectHeight}>
          <Layer>
            {colorMessageArr.map((item, index) => {
              return (
                <Rect
                  key={index + item}
                  x={(rectHeight + interval) * index + rectHeight}
                  y={0}
                  width={rectWidth}
                  height={rectHeight}
                  fill={item}
                />
              );
            })}
          </Layer>
        </Stage>
        <p>More</p>
      </div>
    </div>
  );
}

function ColoredRect(props: {
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
  name: string;
}) {
  const { x, y, color, width, height, name } = props;
  return (
    <Rect
      scale={{ x: 1, y: 1 }}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color}
      shadowBlur={1}
      name={name}
    />
  );
}
