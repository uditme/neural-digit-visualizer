def count_nbr_examples(file_path, feature):
    count = 0

    with open(file_path, "r") as f:
        for line in f:
            if line.startswith(str(feature)):
                count += 1

    return count


file_name = ""  # EMPTY IS DEFAULT
file_path = f"C:\\Users\\Choaib ELMADI\\Documents\\D.I.F.Y\\4. Artificial Intelligence\\A. AI Projects\\Neural Digit Visualizer\\Data\\y{file_name}.txt"
feature = 7

count = count_nbr_examples(file_path, feature)
print(f"{count} training example(s) for feature {feature}")
