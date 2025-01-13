import os


def generate_training_data(folder_path, prefix, combined_file):
    dir_files = os.listdir(folder_path)

    files_to_combine = [f for f in dir_files if f.startswith(prefix)]
    files_to_combine.sort(reverse=True)

    if not files_to_combine:
        print(f"No files found with prefix '{prefix}'")
        return

    with open(combined_file, "w") as cf:
        for file_name in files_to_combine:
            file_path = os.path.join(folder_path, file_name)
            if os.path.exists(file_path):
                with open(file_path, "r") as f:
                    cf.write(f.read() + "\n")
                # print(f"File '{file_name}' added")
            else:
                print(f"File '{file_name}' does not exist")

    print(f"Done merging to '{combined_file}'")


folder_path = "C:\\Users\\Choaib ELMADI\\Downloads"

inputs_prefix = "x__"
inputs_combined_file = "C:\\Users\\Choaib ELMADI\\Documents\\D.I.F.Y\\4. Artificial Intelligence\\A. AI Projects\\Neural Digit Visualizer\\Data\\X.txt"
outputs_prefix = "y__"
outputs_combined_file = "C:\\Users\\Choaib ELMADI\\Documents\\D.I.F.Y\\4. Artificial Intelligence\\A. AI Projects\\Neural Digit Visualizer\\Data\\y.txt"

generate_training_data(folder_path, inputs_prefix, inputs_combined_file)
generate_training_data(folder_path, outputs_prefix, outputs_combined_file)
