if __name__ == "__main__":
    fileInput = open("input.txt", "r")

    maxCalorieSum = 0
    currentCalorieBlockSum = 0

    for currentCalorieRow in fileInput:
        if (currentCalorieRow != "\n"):
            currentCalorieBlockSum += int(currentCalorieRow)
        else:
            if (currentCalorieBlockSum > maxCalorieSum):
                maxCalorieSum = currentCalorieBlockSum
            currentCalorieBlockSum = 0
    print(maxCalorieSum)
