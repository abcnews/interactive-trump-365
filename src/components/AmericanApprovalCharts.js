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
  ResponsiveContainer,
  ReferenceDot
} = require('recharts');
const Chart = require('./Chart');
const ReferenceDotLabel = require('./ReferenceDotLabel');
const Tabs = require('./Tabs');

function AmericanApprovalChart({ data = [], events = [], name = '' }) {
  let llIndex = 0;

  return data.length ? (
    <Chart source="Gallup">
      <label>{`Approval rating (${name})`}</label>
      <ResponsiveContainer height={400}>
        <LineChart data={data} margin={{ top: 10, right: 75, left: 0, bottom: 25 }}>
          {[
            <XAxis key="x" type="number" dataKey="dop" axisLine={false} ticks={[100, 200, 300, 365]} domain={[0, 365]}>
              <Label value="Number of days into presidency" offset={-15} position="insideBottom" />
            </XAxis>,
            <YAxis
              key="y"
              width={40}
              axisLine={false}
              tickLine={false}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={x => `${x}%`}
              domain={[0, 100]}
            />,
            <CartesianGrid key="grid" vertical={false} strokeDasharray="3 3" />,
            <Tooltip
              key="tooltip"
              cursor={{ strokeDasharray: '3 3' }}
              labelFormatter={label => `Days : ${label}`}
              formatter={value => `${value.toFixed(1)}`}
            />,
            <Line
              key="dem"
              type="linear"
              dataKey="approve"
              name="Approve"
              unit="%"
              stroke="#008255"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="approve"
                position="right"
                fill="#008255"
                formatter={() => {
                  ++llIndex === data.length && (llIndex = 0);

                  return llIndex === 0 ? 'Approve' : null;
                }}
              />
            </Line>,
            <Line
              key="ind"
              type="linear"
              dataKey="dk"
              name="Unsure"
              unit="%"
              stroke="#99B6BA"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="dk"
                position="right"
                fill="#637679"
                formatter={() => {
                  ++llIndex === data.length && (llIndex = 0);

                  return llIndex === 0 ? 'Unsure' : null;
                }}
              />
            </Line>,
            <Line
              key="rep"
              type="linear"
              dataKey="disapprove"
              name="Disapprove"
              unit="%"
              stroke="#FF6100"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="disapprove"
                position="right"
                fill="#FF6100"
                formatter={() => {
                  ++llIndex === data.length && (llIndex = 0);

                  return llIndex === 0 ? 'Disapprove' : null;
                }}
              />
            </Line>
          ].concat(
            events.map((event, index) => (
              <ReferenceDot
                key={`event_${index}`}
                x={event.x}
                y={event.y}
                r={0}
                fill="#000"
                stroke="none"
                label={({ viewBox }) => <ReferenceDotLabel x={viewBox.x} y={viewBox.y} textLines={event.textLines} />}
              />
            ))
          )}
        </LineChart>
      </ResponsiveContainer>
    </Chart>
  ) : null;
}

class AmericanApprovalCharts extends React.Component {
  constructor(props) {
    super(props);

    this.setPresident = this.setPresident.bind(this);

    this.state = {
      activeIndex: 0,
      presidents: [
        {
          shortName: 'Trump',
          longName: 'Donald Trump',
          data: [],
          events: [
            { x: 45, y: 40, textLines: ['Revised travel', 'ban goes', 'into effect'] },
            { x: 189, y: 37, textLines: ['Health care', 'bill defeated'] },
            { x: 333, y: 55, textLines: ['Sweeping tax', 'bill passed'] }
          ]
        },
        {
          shortName: 'Obama',
          longName: 'Barack Obama',
          data: [],
          events: [{ x: 262, y: 38, textLines: ['Wins Nobel', 'peace prize'] }]
        },
        {
          shortName: 'Bush Jr.',
          longName: 'George W. Bush',
          data: [],
          events: [{ x: 225, y: 51, textLines: ['9/11'] }]
        },
        {
          shortName: 'Clinton',
          longName: 'Bill Clinton',
          data: [],
          events: [
            {
              x: 180,
              y: 41,
              textLines: ['‘Donʼt ask, donʼt tellʼ policy']
            }
          ]
        }
      ]
    };

    csv(`${__webpack_public_path__}charts/trump_365.csv`, this.setPresidentData.bind(this, 0));
    csv(`${__webpack_public_path__}charts/Obama_365.csv`, this.setPresidentData.bind(this, 1));
    csv(`${__webpack_public_path__}charts/bush_365.csv`, this.setPresidentData.bind(this, 2));
    csv(`${__webpack_public_path__}charts/clinton_365.csv`, this.setPresidentData.bind(this, 3));
  }

  setPresidentData(index, data) {
    const presidents = this.state.presidents;

    presidents[index].data = data
      .filter(x => x.dop)
      .map(x => ({
        dop: +x.dop,
        approve: +x.approve,
        disapprove: +x.disapprove,
        dk: +x.dk
      }))
      .sort((a, b) => a.dop - b.dop);

    this.setState({ presidents });
  }

  setPresident(e) {
    this.setState({ activeIndex: +e.target.getAttribute('data-index') });
  }

  render() {
    return (
      <div>
        <Tabs>
          {this.state.presidents.map((president, index) => (
            <button
              key={president.longName}
              onClick={this.setPresident}
              data-index={index}
              disabled={this.state.activeIndex === index}
              data-long-name={president.longName}
            >
              <span data-index={index}>{president.shortName}</span>
            </button>
          ))}
        </Tabs>
        <AmericanApprovalChart
          data={this.state.presidents[this.state.activeIndex].data}
          events={this.state.presidents[this.state.activeIndex].events}
          name={this.state.presidents[this.state.activeIndex].shortName}
        />
      </div>
    );
  }
}

module.exports = AmericanApprovalCharts;
