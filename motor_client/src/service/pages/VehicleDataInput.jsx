import React from 'react';

function VehicleDataInput() {
    return (
        <div className="container">
            <h1>Enter Vehicle Data</h1>
            <form id="vehicleForm" method="post">
                
                <div className="form-group">
                    <label htmlFor="engineTemp">Engine Temperature</label>
                    <input type="text" id="engineTemp" name="engineTemp" placeholder="Enter engine temperature" />
                </div>
                <div className="form-group">
                    <label htmlFor="oilPressure">Oil Pressure</label>
                    <input type="text" id="oilPressure" name="oilPressure" placeholder="Enter oil pressure" />
                </div>
                <div className="form-group">
                    <label htmlFor="coolantLevel">Coolant Level</label>
                    <input type="text" id="coolantLevel" name="coolantLevel" placeholder="Enter coolant level" />
                </div>
                <div className="form-group">
                    <label htmlFor="oxygenSensor">Oxygen Sensor</label>
                    <input type="text" id="oxygenSensor" name="oxygenSensor" placeholder="Enter oxygen sensor value" />
                </div>
                <div className="form-group">
                    <label htmlFor="fuelEfficiency">Fuel Efficiency</label>
                    <input type="text" id="fuelEfficiency" name="fuelEfficiency" placeholder="Enter fuel efficiency" />
                </div>
                <div className="form-group">
                    <label htmlFor="mileage">Mileage</label>
                    <input type="text" id="mileage" name="mileage" placeholder="Enter mileage" />
                </div>
                <div className="form-group">
                    <label htmlFor="vehicleAge">Vehicle Age</label>
                    <input type="text" id="vehicleAge" name="vehicleAge" placeholder="Enter vehicle age" />
                </div>
                <div className="form-group">
                    <label htmlFor="rpm">RPM</label>
                    <input type="text" id="rpm" name="rpm" placeholder="Enter RPM" />
                </div>
                <div className="form-group">
                    <label htmlFor="vehicleSpeed">Vehicle Speed</label>
                    <input type="text" id="vehicleSpeed" name="vehicleSpeed" placeholder="Enter vehicle speed" />
                </div>
                <div className="form-group">
                    <label htmlFor="altitude">Altitude</label>
                    <input type="text" id="altitude" name="altitude" placeholder="Enter altitude" />
                </div>
                <div className="form-group">
                    <label htmlFor="co2Emissions">CO2 Emissions</label>
                    <input type="text" id="co2Emissions" name="co2Emissions" placeholder="Enter CO2 emissions" />
                </div>
                
                <button type="submit"  style={{color:'wheat'}}className="btn">Submit</button>
             
            </form>
        </div>
    );
}

export default VehicleDataInput;
