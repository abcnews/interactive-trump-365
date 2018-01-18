const React = require('react');
const styles = require('./ReferenceDotLabel.scss');

function ReferenceDotLabel({ textLines, x, y }) {
  return (
    <g className={styles.label} transform={`translate(${x} ${y})`}>
      <line x1={1} y1={4} x2={6} y2={18} />
      <text y="30" x="0" textAnchor="middle">
        {textLines.map((text, index) => (
          <tspan key={`part_${index}`} x="6" dy={index > 0 ? 14 : 0}>
            {text}
          </tspan>
        ))}
      </text>
      <text y="30" x="0" textAnchor="middle">
        {textLines.map((text, index) => (
          <tspan key={`part_${index}`} x="6" dy={index > 0 ? 14 : 0}>
            {text}
          </tspan>
        ))}
      </text>
    </g>
  );
}

module.exports = ReferenceDotLabel;
