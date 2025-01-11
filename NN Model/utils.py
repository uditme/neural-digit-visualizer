import numpy as np
import matplotlib.pyplot as plt  # type: ignore

import tensorflow as tf  # type: ignore
from tensorflow.keras.models import Sequential  # type: ignore
from tensorflow.keras.layers import Dense  # type: ignore
from tensorflow.keras.activations import linear, relu, sigmoid  # type: ignore


def load_data():
    X = np.loadtxt("../Data/X.txt", delimiter=",")
    y = np.loadtxt("../Data/y.txt", delimiter=",")
    return X, y


def display_digit(X):
    fig, ax = plt.subplots(1, 1, figsize=(1, 1))
    X_reshaped = X.reshape((20, 20))
    ax.imshow(X_reshaped, cmap="gray")
    plt.show()


def plot_loss_tf(history):
    fig, ax = plt.subplots(1, 1, figsize=(4, 3))
    ax.plot(history.history["loss"], label="loss")
    ax.set_ylim([0, 2])  # type: ignore
    ax.set_xlabel("Epoch")
    ax.set_ylabel("loss (cost)")
    ax.legend()
    ax.grid(True)
    plt.show()


def display_errors(model, X, y, enable=False):
    f = model.predict(X)
    yhat = np.argmax(f, axis=1)
    idxs = np.where(yhat != y)[0]

    if len(idxs) != 0:
        cnt = len(idxs)

        if enable:
            fig, ax = plt.subplots(1, cnt, figsize=(cnt * 2, cnt))
            fig.tight_layout(pad=1)

        for i in range(cnt):
            j = idxs[i]
            print(f"Predicted: {np.argmax(f[j])}, Actual: {y[j]}")

            if enable:
                X_reshaped = X[j].reshape((20, 20))
                ax[i].imshow(X_reshaped, cmap="gray")
                ax[i].set_title(f"A: {y[j]}, P: {np.argmax(f[j])}", fontsize=10)
                ax[i].set_axis_off()

    return len(idxs)
