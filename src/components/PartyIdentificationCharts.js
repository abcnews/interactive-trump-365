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

function PartyIdentificationChart({ data = [], events = [], name = '' }) {
  let llIndex = 0;

  return data.length ? (
    <Chart>
      <label>{`Approval rating (${name})`}</label>
      <ResponsiveContainer height={400}>
        <LineChart data={data} margin={{ top: 10, right: 90, left: 0, bottom: 25 }}>
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
              dataKey="dem_app"
              name="Democrats"
              unit="%"
              stroke="#2E6FC9"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="dem_app"
                position="right"
                fill="#2E6FC9"
                formatter={() => {
                  ++llIndex === data.length && (llIndex = 0);

                  return llIndex === 0 ? 'Democrats' : null;
                }}
              />
            </Line>,
            <Line
              key="ind"
              type="linear"
              dataKey="ind_app"
              name="Independents"
              unit="%"
              stroke="#999"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="ind_app"
                position="right"
                fill="#999"
                formatter={() => {
                  ++llIndex === data.length && (llIndex = 0);

                  return llIndex === 0 ? 'Independents' : null;
                }}
              />
            </Line>,
            <Line
              key="rep"
              type="linear"
              dataKey="rep_app"
              name="Republicans"
              unit="%"
              stroke="#E03434"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="rep_app"
                position="right"
                fill="#E03434"
                formatter={() => {
                  ++llIndex === data.length && (llIndex = 0);

                  return llIndex === 0 ? 'Republicans' : null;
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

class PartyIdentificationCharts extends React.Component {
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
            { x: 45, y: 88, textLines: ['Revised travel', 'ban goes', 'into effect'] },
            { x: 97, y: 36, textLines: ['New tax plan', 'proposed'] },
            { x: 189, y: 82, textLines: ['Health care bill', 'defeated by', 'Sen. McCain'] },
            { x: 333, y: 77, textLines: ['Sweeping tax', 'bill passed'] }
          ]
        },
        {
          shortName: 'Obama',
          longName: 'Barack Obama',
          data: [],
          events: [
            {
              x: 29,
              y: 60,
              textLines: ['Economic stimulus', 'bill passed;', 'military presence in', 'Afghanistan doubled']
            },
            { x: 262, y: 83, textLines: ['Wins Nobel', 'peace prize'] }
          ]
        },
        {
          shortName: 'Bush Jr.',
          longName: 'George W. Bush',
          data: [],
          events: [
            { x: 47, y: 89, textLines: ['House of Reps.', 'passed Republican', 'tax plan'] },
            { x: 225, y: 27, textLines: ['9/11'] }
          ]
        },
        {
          shortName: 'Clinton',
          longName: 'Bill Clinton',
          data: [],
          events: [
            {
              x: 89,
              y: 81,
              textLines: [
                '75 people die in',
                'hostage stand-off ordered',
                'by US Attorney General',
                '(appointed by Clinton)'
              ]
            },
            {
              x: 180,
              y: 35,
              textLines: ['Gay soldiers allowed', 'to join US military', 'but prohibited from', 'serving openly']
            }
          ]
        }
      ]
    };

    csv(`${__webpack_public_path__}charts/trump_ratings.csv`, this.setPresidentData.bind(this, 0));
    csv(`${__webpack_public_path__}charts/approval_pid_obama.csv`, this.setPresidentData.bind(this, 1));
    csv(`${__webpack_public_path__}charts/approval_pid_bush.csv`, this.setPresidentData.bind(this, 2));
    csv(`${__webpack_public_path__}charts/approval_pid_clinton.csv`, this.setPresidentData.bind(this, 3));
  }

  setPresidentData(index, data) {
    const presidents = this.state.presidents;

    presidents[index].data = data
      .map(x => ({
        dop: +x.dop,
        rep_app: +x.rep_app,
        dem_app: +x.dem_app,
        ind_app: +x.ind_app
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
              <span>{president.shortName}</span>
            </button>
          ))}
        </Tabs>
        <PartyIdentificationChart
          data={this.state.presidents[this.state.activeIndex].data}
          events={this.state.presidents[this.state.activeIndex].events}
          name={this.state.presidents[this.state.activeIndex].shortName}
        />
      </div>
    );
  }
}

module.exports = PartyIdentificationCharts;
