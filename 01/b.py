if __name__ == "__main__":
    fileInput = open("input.txt", "r")

    currentCalorieBlockSum = 0
    allCalorieBlocks = []

    for currentCalorieRow in fileInput:
        if (currentCalorieRow != "\n"):
            currentCalorieBlockSum += int(currentCalorieRow)
        else:
            allCalorieBlocks.append(currentCalorieBlockSum)
            currentCalorieBlockSum = 0

    allCalorieBlocks.sort()
    topThreeCalorieBlockSum = allCalorieBlocks[-1] + \
        allCalorieBlocks[-2]+allCalorieBlocks[-3]
    print(topThreeCalorieBlockSum)
