import { csv } from 'd3-request';
import React from 'react';

import {
  Label,
  LabelList,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Chart from './Chart';

export default class PollAggregationChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };

    csv(`${__webpack_public_path__}charts/approval_topline_adults.csv`, data =>
      this.setState({
        data: data
          .map(x => ({
            dop: +x.dop,
            disapprove_estimate: +x.disapprove_estimate,
            approve_estimate: +x.approve_estimate
          }))
          .sort((a, b) => a.dop - b.dop)
      })
    );
  }

  render() {
    let llIndex = 0;

    return this.state.data.length ? (
      <Chart>
        <label>Approval rating (aggregated)</label>
        <ResponsiveContainer height={400}>
          <LineChart data={this.state.data} margin={{ top: 10, right: 80, left: 0, bottom: 25 }}>
            <XAxis
              type="number"
              dataKey="dop"
              axisLine={false}
              ticks={[100, 200, 300, 365]}
              domain={[0, 365]}
            >
              <Label value="Number of days into presidency" offset={-15} position="insideBottom" />
            </XAxis>
            <YAxis
              width={40}
              axisLine={false}
              tickLine={false}
              ticks={[30, 40, 50, 60]}
              tickFormatter={x => `${x}%`}
              domain={[30, 60]}
            />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              labelFormatter={label => `Days : ${label}`}
              formatter={value => `${value.toFixed(1)}`}
            />
            <Line
              type="linear"
              dataKey="disapprove_estimate"
              name="Disapprove"
              unit="%"
              stroke="#FF6100"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="disapprove_estimate"
                position="right"
                fill="#FF6100"
                formatter={() => {
                  ++llIndex === this.state.data.length && (llIndex = 0);

                  return llIndex === 0 ? 'Disapprove' : null;
                }}
              />
            </Line>
            <Line
              type="linear"
              dataKey="approve_estimate"
              name="Approve"
              unit="%"
              stroke="#008255"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="approve_estimate"
                position="right"
                fill="#008255"
                formatter={() => {
                  ++llIndex === this.state.data.length && (llIndex = 0);

                  return llIndex === 0 ? 'Approve' : null;
                }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </Chart>
    ) : null;
  }
}
