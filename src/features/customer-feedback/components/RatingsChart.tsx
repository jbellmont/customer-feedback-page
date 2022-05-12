import {BarChart, XAxis, YAxis, Tooltip, Bar} from 'recharts';

import {
  googleLightGrey,
  ratingStarYellow,
} from '../../../shared/styles/colours';

export enum RatingsLabel {
  FIVE_STAR = '5 star',
  FOUR_STAR = '4 star',
  THREE_STAR = '3 star',
  TWO_STAR = '2 star',
  ONE_STAR = '1 star',
}

export interface RatingsChartData {
  name: RatingsLabel;
  ratings: number;
}

export interface RatingsChartProps {
  chartData: RatingsChartData[];
}

export const RATINGS_CHART_TEST_ID = 'ratings-chart-test-id';

const RatingsChart = ({chartData}: RatingsChartProps) => {
  return (
    <div data-testid={RATINGS_CHART_TEST_ID}>
      <BarChart
        data={chartData}
        height={300}
        layout="vertical"
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        width={600}
      >
        <XAxis
          allowDecimals={false}
          tick={{fontFamily: 'roboto'}}
          type="number"
        />
        <YAxis dataKey="name" tick={{fontFamily: 'roboto'}} type="category" />
        <Tooltip cursor={{fill: googleLightGrey, strokeWidth: 2}} />
        <Bar dataKey="ratings" fill={ratingStarYellow} />
      </BarChart>
    </div>
  );
};

export default RatingsChart;
