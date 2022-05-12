import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import RatingsChart, {
  RatingsChartProps,
  RATINGS_CHART_TEST_ID,
} from './RatingsChart';

const baseProps: RatingsChartProps = {
  chartData: [],
};

describe('RatingsChart component', () => {
  it('should render', () => {
    render(<RatingsChart {...baseProps} />);
    const ratingsChartElement = screen.getByTestId(RATINGS_CHART_TEST_ID);

    expect(ratingsChartElement).toBeInTheDocument();
  });
});
