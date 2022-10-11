import Tooltip from '@mui/material/Tooltip';

const HourCell = ({ hour, onRowClick, selectedDate }) => {
  const [weekday, day, month, year] = selectedDate;
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
                name={`${day}-${month}-${year}-${hour.split(':')[0]}-first`}
                onClick={onRowClick}
              >
                <p></p>
              </div>
            </Tooltip>
            <Tooltip title="Click to add an event">
              <div
                id="half-hour-row"
                className="row"
                name={`${day}-${month}-${year}-${hour.split(':')[0]}-second`}
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
