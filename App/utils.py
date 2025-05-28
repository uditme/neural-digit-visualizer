import numpy as np
import json

import os
weights_path = os.path.join(os.path.dirname(__file__), "Weights")



def load_weights():
    with open(f"{weights_path}\\b1.txt", "r") as b1_f:
        b1_txt = json.load(b1_f)
    b1 = np.array(b1_txt)

    with open(f"{weights_path}\\W1.txt", "r") as W1_f:
        W1_txt = json.load(W1_f)
    W1 = np.array(W1_txt)

    with open(f"{weights_path}\\b2.txt", "r") as b2_f:
        b2_txt = json.load(b2_f)
    b2 = np.array(b2_txt)

    with open(f"{weights_path}\\W2.txt", "r") as W2_f:
        W2_txt = json.load(W2_f)
    W2 = np.array(W2_txt)

    with open(f"{weights_path}\\b3.txt", "r") as b3_f:
        b3_txt = json.load(b3_f)
    b3 = np.array(b3_txt)

    with open(f"{weights_path}\\W3.txt", "r") as W3_f:
        W3_txt = json.load(W3_f)
    W3 = np.array(W3_txt)

    return b1, W1, b2, W2, b3, W3


def softmax(z):
    ez = np.exp(z)
    sm = ez / np.sum(ez)
    return sm


def model_computations(b1, W1, b2, W2, b3, W3, image_of_nbr):
    L1_activations = np.zeros((20,))
    L2_activations = np.zeros((16,))
    L3_activations = np.zeros((11,))

    for i in range(20):
        w1_i = W1[:, i]
        z1_i = np.dot(image_of_nbr, w1_i) + b1[i]
        L1_activations[i] = np.maximum(0, z1_i)

    for i in range(16):
        w2_i = W2[:, i]
        z2_i = np.dot(L1_activations, w2_i) + b2[i]
        L2_activations[i] = np.maximum(0, z2_i)

    for i in range(11):
        w3_i = W3[:, i]
        z3_i = np.dot(L2_activations, w3_i) + b3[i]
        L3_activations[i] = z3_i

    L1_prbs = ", ".join(f"{p*100:2.2f}" for p in softmax(L1_activations))
    L2_prbs = ", ".join(f"{p*100:2.2f}" for p in softmax(L2_activations))
    L3_prbs = ", ".join(f"{p*100:2.2f}" for p in softmax(L3_activations))

    predicted_number = np.argmax(L3_activations)

    return L1_prbs, L2_prbs, L3_prbs, predicted_number
