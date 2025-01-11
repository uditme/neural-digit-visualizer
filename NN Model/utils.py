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


def display_errors(model, X, y):
    f = model.predict(X)
    yhat = np.argmax(f, axis=1)
    doo = yhat != y[:, 0]
    idxs = np.where(yhat != y[:, 0])[0]
    if len(idxs) == 0:
        print("no errors found")
    else:
        cnt = min(8, len(idxs))
        fig, ax = plt.subplots(1, cnt, figsize=(5, 1.2))
        fig.tight_layout(
            pad=0.13, rect=[0, 0.03, 1, 0.80]  # type: ignore
        )  # [left, bottom, right, top]
        widgvis(fig)

        for i in range(cnt):
            j = idxs[i]
            X_reshaped = X[j].reshape((20, 20)).T

            # Display the image
            ax[i].imshow(X_reshaped, cmap="gray")

            # Predict using the Neural Network
            prediction = model.predict(X[j].reshape(1, 400))
            prediction_p = tf.nn.softmax(prediction)
            yhat = np.argmax(prediction_p)

            # Display the label above the image
            ax[i].set_title(f"{y[j,0]},{yhat}", fontsize=10)
            ax[i].set_axis_off()
            fig.suptitle("Label, yhat", fontsize=12)

    return len(idxs)
