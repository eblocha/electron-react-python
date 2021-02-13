from flask import Flask, request, abort, jsonify

app = Flask(__name__)

@app.route("/",methods=["POST"])
def add():
    """Add two numbers sent by the client"""
    try:
        x = request.json.get("x")
        y = request.json.get("y")
        if x is None or y is None:
            return abort(400)
    except AttributeError:
        return abort(400)
    
    try:
        float(x)
        float(y)
    except ValueError:
        abort(400)

    return jsonify(value=x+y)

if __name__ == "__main__":
    app.run(debug=False,port=5000)