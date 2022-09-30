import { Tooltip } from 'antd';

const HourCell = ({ hour, onRowClick }) => {
  return (
    <div id="hour-cell" key={hour} className="ui internally celled grid">
      <div className="row">
        <div id="grid-column-time" className="three wide column">
          <h3>{hour}</h3>
        </div>
        <div id="grid-column" className="thirteen wide column">
          <div className="ui internally celled grid">
            <Tooltip title="Click to add an event">
              <div
                id="half-hour-row"
                className="row"
                name={`${hour.split(':')[0]}-first`}
                onClick={onRowClick}
              >
                <p></p>
              </div>
            </Tooltip>
            <Tooltip title="Click to add an event">
              <div
                id="half-hour-row"
                className="row"
                name={`${hour.split(':')[0]}-second`}
                onClick={onRowClick}
              >
                <p></p>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourCell;