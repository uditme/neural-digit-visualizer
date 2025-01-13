import tensorflow as tf
import numpy as np


def generate_weights(file_names, array, is_2d=True):
    if is_2d:
        m, n = array.shape
    else:
        m = 1
        n = array.shape[0]

    weights_txt = ""

    for i in range(m):
        if i == 0 and is_2d:
            weights_txt += "["

        for j in range(n):
            if j == 0:
                weights_txt += "["

            if j in np.arange(n - 1):
                if is_2d:
                    weights_txt += f"{array[i, j]}, "
                else:
                    weights_txt += f"{array[j]}, "

            if j == n - 1:
                if is_2d:
                    weights_txt += f"{array[i, j]}]"
                else:
                    weights_txt += f"{array[j]}]"

                if i != m - 1:
                    weights_txt += ", "

        if i == m - 1 and is_2d:
            weights_txt += "]"

    for file_name in file_names:
        with open(file_name, "w") as file:
            file.write(weights_txt)


model_name = "ndv_model_285t__45ep.keras"
model_path = "C:\\Users\\Choaib ELMADI\\Documents\\D.I.F.Y\\4. Artificial Intelligence\\A. AI Projects\\Neural Digit Visualizer\\NN Model"
model = tf.keras.models.load_model(f"{model_path}\\{model_name}")  # type: ignore

[L1, L2, L3] = model.layers

W1, b1 = L1.get_weights()
W2, b2 = L2.get_weights()
W3, b3 = L3.get_weights()

file_path_nnm = "C:\\Users\\Choaib ELMADI\\Documents\\D.I.F.Y\\4. Artificial Intelligence\\A. AI Projects\\Neural Digit Visualizer\\NN Model\\Weights"
file_path_app = "C:\\Users\\Choaib ELMADI\\Documents\\D.I.F.Y\\4. Artificial Intelligence\\A. AI Projects\\Neural Digit Visualizer\\App\\Weights"

file_name = "W1.txt"
generate_weights([f"{file_path_nnm}\\{file_name}", f"{file_path_app}\\{file_name}"], W1)

file_name = "b1.txt"
generate_weights(
    [f"{file_path_nnm}\\{file_name}", f"{file_path_app}\\{file_name}"], b1, False
)

file_name = "W2.txt"
generate_weights([f"{file_path_nnm}\\{file_name}", f"{file_path_app}\\{file_name}"], W2)

file_name = "b2.txt"
generate_weights(
    [f"{file_path_nnm}\\{file_name}", f"{file_path_app}\\{file_name}"], b2, False
)

file_name = "W3.txt"
generate_weights([f"{file_path_nnm}\\{file_name}", f"{file_path_app}\\{file_name}"], W3)

file_name = "b3.txt"
generate_weights(
    [f"{file_path_nnm}\\{file_name}", f"{file_path_app}\\{file_name}"], b3, False
)
