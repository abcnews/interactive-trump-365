const { csv } = require('d3-request');
const React = require('react');
const {
  Label,
  LabelList,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} = require('recharts');
const Chart = require('./Chart');
const chartStyles = require('./Chart.scss');

class PartyApprovalChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };

    csv(`${__webpack_public_path__}charts/approval_pid_4.csv`, data =>
      this.setState({
        data: data
          .map(x => ({
            dop: +x.dop,
            inparty_app: +x.inparty_app,
            presName: x.presName
          }))
          .sort((a, b) => a.dop - b.dop)
      })
    );
  }

  render() {
    const clinton = this.state.data.filter(x => x.presName === 'Clinton');
    const bush = this.state.data.filter(x => x.presName === 'Bush Jr.');
    const obama = this.state.data.filter(x => x.presName === 'Obama');
    const trump = this.state.data.filter(x => x.presName === 'Trump');
    let llIndex = 0;

    return this.state.data.length ? (
      <Chart source="Gallup">
        <label>Approval rating within own party</label>
        <div className={chartStyles.layers}>
          <ResponsiveContainer height={400}>
            <LineChart data={clinton} margin={{ top: 10, right: 55, left: 0, bottom: 25 }}>
              <XAxis type="number" dataKey="dop" axisLine={false} ticks={[100, 200, 300, 365]} domain={[0, 365]}>
                <Label value="Number of days into presidency" offset={-15} position="insideBottom" />
              </XAxis>
              <YAxis
                width={40}
                axisLine={false}
                tickLine={false}
                ticks={[60, 70, 80, 90, 100]}
                tickFormatter={x => `${x}%`}
                domain={[60, 100]}
              />
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <Line
                type="linear"
                dataKey="inparty_app"
                name="Clinton"
                unit="%"
                stroke="#99B6BA"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey="inparty_app"
                  position="right"
                  fill="#637679"
                  formatter={() => {
                    ++llIndex === clinton.length && (llIndex = 0);

                    return llIndex === 0 ? 'Clinton' : null;
                  }}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer height={400}>
            <LineChart data={bush} margin={{ top: 10, right: 55, left: 0, bottom: 25 }}>
              <XAxis type="number" dataKey="dop" axisLine={false} tick={false} ticks={[]} domain={[0, 365]} />
              <YAxis width={40} axisLine={false} tick={false} ticks={[]} domain={[60, 100]} />
              <Line
                type="linear"
                dataKey="inparty_app"
                name="Bush Jr."
                unit="%"
                stroke="#99B6BA"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey="inparty_app"
                  position="right"
                  fill="#637679"
                  formatter={() => {
                    ++llIndex === bush.length && (llIndex = 0);

                    return llIndex === 0 ? 'Bush Jr.' : null;
                  }}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer height={400}>
            <LineChart data={obama} margin={{ top: 10, right: 55, left: 0, bottom: 25 }}>
              <XAxis type="number" dataKey="dop" axisLine={false} tick={false} ticks={[]} domain={[0, 365]} />
              <YAxis width={40} axisLine={false} tick={false} ticks={[]} domain={[60, 100]} />
              <Line
                type="linear"
                dataKey="inparty_app"
                name="Obama"
                unit="%"
                stroke="#99B6BA"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey="inparty_app"
                  position="right"
                  fill="#637679"
                  formatter={() => {
                    ++llIndex === obama.length && (llIndex = 0);

                    return llIndex === 0 ? 'Obama' : null;
                  }}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer height={400}>
            <LineChart data={trump} margin={{ top: 10, right: 55, left: 0, bottom: 25 }}>
              <XAxis type="number" dataKey="dop" axisLine={false} tick={false} ticks={[]} domain={[0, 365]} />
              <YAxis width={40} axisLine={false} tick={false} ticks={[]} domain={[60, 100]} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                labelFormatter={label => `Days : ${label}`}
                formatter={value => `${value.toFixed(1)}`}
              />
              <Line
                type="linear"
                dataKey="inparty_app"
                name="Trump"
                unit="%"
                stroke="#E03434"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey="inparty_app"
                  position="right"
                  fill="#E03434"
                  formatter={() => {
                    ++llIndex === trump.length && (llIndex = 0);

                    return llIndex === 0 ? 'Trump' : null;
                  }}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Chart>
    ) : null;
  }
}

module.exports = PartyApprovalChart;
