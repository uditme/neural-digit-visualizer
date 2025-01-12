from flask import Flask, request, jsonify
from flask_cors import CORS

from utils import *

app = Flask(__name__)
CORS(app)

b1, W1, b2, W2, b3, W3 = load_weights()


@app.route("/process", methods=["POST"])
def process_data():
    data = request.json.get("array", [])  # type: ignore

    L1_prbs, L2_prbs, L3_prbs, nbr = model_computations(b1, W1, b2, W2, b3, W3, data)

    return jsonify(
        {
            "L1_prbs": f"{L1_prbs}",
            "L2_prbs": f"{L2_prbs}",
            "L3_prbs": f"{L3_prbs}",
            "nbr": f"{nbr}",
        }
    )


if __name__ == "__main__":
    app.run()
