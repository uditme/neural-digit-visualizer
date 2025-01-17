def count_nbr_examples(file_path, feature):
    count = 0
    total = 0

    with open(file_path, "r") as f:
        for line in f:
            total += 1
            if line.startswith(str(feature)):
                count += 1

    return count, total


file_name = "y.txt"
file_path = f"C:\\Users\\Choaib ELMADI\\Documents\\D.I.F.Y\\4. Artificial Intelligence\\A. AI Projects\\Neural Digit Visualizer\\Data\\{file_name}"
feature = -1

for feature in [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]:
    if feature == -1:
        feature = 10

    count, total = count_nbr_examples(file_path, feature)
    print(
        f"{count:2.0f} training example(s) for feature {feature:2.0f}, total features is {total}"
    )
