import React, { useState, useEffect } from "react";
// import Spinner from "./Spinner";

const Inputs = () => {
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);

    const sendRequest = () => {
        if (x !== null && y != null) {
            setLoading(true)
            fetch(
                "http://localhost:5000",
                {
                    method: "POST",
                    body: JSON.stringify({ x: x, y: y }),
                    headers: {
                        "Content-type": "application/json"
                    }
                }
            )
                .then(sum => sum.json())
                .then(sum => {
                    setValue(sum.value)
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }

    }


    return (
        <div className="container">
            <form onSubmit={sendRequest}>
                <div className="row my-5">
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="First Number"
                            aria-label="First Number"
                            value={x}
                            onChange={e => setX(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Second Number"
                            aria-label="Second Number"
                            value={y}
                            onChange={e => setY(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary" disabled={loading} onClick={sendRequest}>
                            Add
                        </button>
                    </div>
                </div>
            </form>
            <div>
                {value !== null ? `The sum is ${value}` : null}
            </div>
        </div>
    )
};

export default Inputs