import ReactECharts, { EChartsReactProps } from 'echarts-for-react';

export default function Charts(props: EChartsReactProps) {
  const { option } = props;
  const chartsOption = option.options;
  const width = option.width;
  const height = option.height;

  return <ReactECharts style={{ height, width }} option={chartsOption} />;
}
