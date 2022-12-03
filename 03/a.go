package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

func main() {
	content, err := ioutil.ReadFile("C:/input.txt")
	if err != nil {
		fmt.Printf("Error reading the file.")
		return
	}

	lines := strings.Split(string(content), "\r\n")

	var allLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var allValueSum int

	for _, currentRow := range lines {
		var currentRowLenght = len(currentRow)
		firstHalf := currentRow[0 : currentRowLenght/2]
		secondHalf := currentRow[currentRowLenght/2:]

		var foundItem string

		for _, currentLetter := range firstHalf {
			if strings.Contains(secondHalf, string(currentLetter)) {
				foundItem = string(currentLetter)
			}
		}

		allValueSum += strings.Index(allLetters, foundItem) + 1
	}
	fmt.Printf("%#v\n", allValueSum)
}
